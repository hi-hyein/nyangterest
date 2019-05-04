# 😼nyangterest

🐱😻유기묘를 위한 검색/등록 기능이 추가된 앱만들기 프로젝트😻🐱

## 개발 환경
* **Database** : mysql(version은 cloud service 셋팅 후 기록예정)
* **Framewrok** : Node.js(>=10.13.0) / React
* **Language** : javaScrip

## Open API
* [공공데이터포털](https://www.data.go.kr/) > **동물보호관리시스템 유기동물 조회 서비스**에서 받아온 Data 사용 중 

* [API Guide](https://github.com/henyy1004/nyangterest/blob/master/yu_report/data_api.md)


## 시작하기
 
### 1. 저장소 클론
~~~sh
git clone https://github.com/henyy1004/nyangterest.git
~~~
### 2. node.js 설치(>=10.13.0)
https://nodejs.org/ko/

### 3. 모듈 설치 & 실행

~~~sh
cd packages/backend
npm install
npm start
~~~

~~~sh
cd packages/frontend
npm install
npm start
~~~

## 작업 브랜치
* Workflow: Feature Branch Workflow 기능별 브렌치를 만들어 작업합니다.
  + 참고사이트: https://lhy.kr/git-workflow
* Branch Name은 `feature/이름스펠링-기능`으로 만듭니다. ex)feature/hy-search
* Master로 머지전 `Pull request(PR)`를 통하여 확인 후 진행합니다.

## License
MIT