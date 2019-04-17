## **회원관리**

### **회원가입**

#### 회원가입 인증방식 및 필요한 라이브러리

1. 메일 주소 기반으로 인증 처리

    - 라이브러리 - nodemailer, passport+passport-local,Sendgrid
    - 기본 프로세스 
       1. 회원가입 요청 (이용약관, 개인정보 처리방침 동의요청 )
       2. 토큰키 생성, DB저장 
	   3. 가입시 기재한 이메일로 인증메일 발송 
	   4. DB에 저장한 값체크 일치할경우 활성화 
	   5. 회원가입 완료 및 로그인 완료

2. 기존 SNS계정으로 인증 처리 (OAuth: 보안의 수준이 어느정도 검증된 사이트의 API를 이용한 인증)

    - 각 SNS 개발자센터 등록

        ```
        구글 https://developers.google.com/

        네이버 https://developers.naver.com/main/

        카카오 https://developers.kakao.com/

        페이스북  https://developers.facebook.com/
        ```

    - 라이브러리 - passport + passport-snsname( passport-google-oauth, passport-facebook, passport-twitter, passport-kakao, passport-naver 라이브러리가 있음 )

    - 기본 프로세스 
     	1. SNS계정 접근요청 
     	2. 해당 SNS계정측에서 요청이 검증되면 access token을 제공 
     	3. 인증 완료 후 로그인 완료

### 회원정보 (검색중)

1. 개인 정보들을 DB에 잘 암호화 처리해서 저장하기, encryption decryption

암호화해주는 수학공식 = 단방향 해시함수
암호화된 패스워드 = 다이제스트
BKDF2나 bcrypt와 같이 널리 알려진 방법(Adaptive Key Derivation Functions)들을 사용
(임시작성)
