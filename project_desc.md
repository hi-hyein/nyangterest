### **프로젝트명** 가제- 냥터레스트(nyangterest)

### **깃헙계정** https://github.com/henyy1004/nyangterest

### **만들려는 주제는?**

-   저희 둘다 고양이를 좋아해서 유기묘 관련 앱을 제작하기로 결정하였습니다.

-   사용자가 등록한 게시물이 핀터레스트 리스트형식으로 보여지고 삭제/수정이 가능하도록
    구현하고자 합니다.

-   필요한 데이터는 공공데이터포털(data.go.kr)에서 전국동물보호센터정보표준데이터 , 동물보호관리시스템 유기동물 조회 서비스에서 제공받을 계획입니다.

-   비슷한 앱 사례로는 냥이를 부탁해라는 iOS앱과 이미 유명한 포인핸드 등이 있습니다.

-   지도는 전국 유기동물 보호센터의 위치정보를 표시할 계획입니다!(유기묘만 취급하는 보호센터는 거의 없기때문입니다.)

### **벤치마킹 사이트 목록**

-   핀터레스트 : https://www.pinterest.co.kr/
-   포인핸드: http://pawinhand.kr/
-   호갱노노: https://hogangnono.com/

### **대략적 기술 스택**

-   프론트엔드 : React

-   백엔드 : node.js

-   DBMS(DB관리툴): SQL - MYSQL

-   배포는? 우선은 로컬 환경에서 진행 (추후에 배포계획이 있음)

-   미들웨어 : express 또는 koa

-   상태관리 라이브러리 : Redux ,Context API,Hook

-   캐시툴: Varnish? https://d2.naver.com/helloworld/352076

    -   사례 https://tenor.com/ gif 이미지가 나오는데 속도가 엄청 빠릅니다!

*   진행 단계

    1. 1단계 레이아웃 잡기 https://ovenapp.io/ (반응형) - UI 라이브러리 사용

    2. 2단계 회원가입 시스템 이용약관 구축

    3. 3단계 게시물 등록 시스템 구축 (유기동물 실종/목격/보호 게시글, 삭제/수정기능)

    4. 4단계 게시물 검색 시스템 구축
