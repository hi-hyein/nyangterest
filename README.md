# 😼nyangterest

🐱😻유기묘 리스트를 제공, 검색이 가능한 앱만들기 프로젝트😻🐱

[![냥터레스트](https://user-images.githubusercontent.com/2981954/81968524-75bf1680-9657-11ea-8d84-0217b4246347.gif)](https://www.youtube.com/watch?v=Jg1u7te4EYI&feature=emb_logo)
                                                                                                                           
## 개발 환경
* **Database** : mysql(>=8.0) - **host**: nyangterest.ca2yj31zk4ar.ap-northeast-2.rds.amazonaws.com  **version**:2.0 
* **Framewrok** : Node.js(>=10.13.0), Express / React
* **Language** : javaScript
* **상세기술스택** : https://stackshare.io/yoonucho/nyangterest

## Open API
* [공공데이터포털](https://www.data.go.kr/) > **동물보호관리시스템 유기동물 조회 서비스**에서 받아온 Data 사용 중 

* [API Guide](https://github.com/henyy1004/nyangterest/blob/master/yu_report/data_api.md)

## UI 목업
* [UI 목업 페이지](https://ovenapp.io/view/RfCRiRftSohiUwxP7J0IRjbMWjqkNPgs#5fW72)

## 시작하기
 
### 1. 저장소 클론
~~~sh
git clone https://github.com/henyy1004/nyangterest.git
~~~
### 2. node.js 설치(>=10.13.0)
https://nodejs.org/ko/

### 3. yarn 설치 
https://classic.yarnpkg.com/en/docs/install#windows-stable

### 4. 모듈 설치 & 실행 (반드시 npm과 yarn install을 같이 병행해야 합니다.)

~~~sh
cd packages/backend
npm install
yarn install
~~~

~~~sh
cd packages/frontend
npm install
yarn install
~~~

~~~sh
cd nyangterest
npm install
yarn install 
npm run dev or yarn dev
~~~

## 작업 브랜치
* Workflow: Feature Branch Workflow 기능별 브렌치를 만들어 작업합니다.
  + 참고사이트: https://lhy.kr/git-workflow
* Branch Name은 `feature/이름스펠링-기능`으로 만듭니다. ex)feature/hy-search
* Master로 머지전 `Pull request(PR)`를 통하여 확인 후 진행합니다.

## 협업 문서
* https://github.com/henyy1004/nyangterest/tree/master/collaboration_report

## 작업영역

### 정혜인

* 헤더
* 로그인 (passport.js)
* 로그아웃 (passport.js)
* 회원가입
* 회원탈퇴
* 비밀번호 찾기

### 조윤우

* 메인컨텐츠 (유기묘 리스트) 
* 상세팝업
* 상단검색 필터
* 이용약관, 개인정보 처리방침 
* 이용툴팁 


## 프로젝트 진행시 작성 문서와 projects(칸반스타일)

### 정혜인

* 문서 : https://github.com/henyy1004/nyangterest/tree/master/hi_report
* projects : https://github.com/henyy1004/nyangterest/projects/2

### 조윤우

* 문서(was) : https://github.com/henyy1004/nyangterest/tree/master/yu_report 
* 문서(now) : https://github.com/henyy1004/nyangterest/wiki   
* projects : https://github.com/henyy1004/nyangterest/projects/1


## License
MIT
