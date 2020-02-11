## 상단필터 개선

### 개선한 부분

#### 기본 리스트 나올때 URL과 날짜 검색시 URL분리

* 기본 리스트 loadList() 실행시 스크롤링시 무한 스크롤 

* 검색 리스트 searchList() 실행시 전체 리스트 무한 스크롤없이 보여주기


#### 상단필터 성별, 중성화, 나이 등 검색어기능 개선 


### 개선하고 싶은 부분 그리고 고민들..

1. 검색후 무한스크롤 기능을 넣어야 할지 말지 고민

2. 로고 클릭했을때 새로고침기능이 필요할거 같다.
   
3. 오늘날짜와 종료일날짜가 동일할경우, 즉 종료일을 변경하지 않았을때를 인식하여 
시작일을 선택했을때 리셋을 하게 하는 로직을 만들어야 하지 않을까?

4. 검색시 속도개선(리스트가 3초안에는 전부 나와야 하지 않나? 캐시 라이브러리 아니면 lazy loading)

5. 검색어 입력시 하단에 자동 검색어 나오게 하기 (AutoComplete)

6. 검색어 안내 메뉴얼 UI 

7. UI UX 개선 (리스트 팝업창 등)

8. 기본리스트를 스크롤링하다가 품종을 선택하게 된다면? 전체데이터에서 필터링처리를 해야 

	아니면 날짜 검색을 클릭안하고 품종이나 검색어를 입력하려고 하면 경고창을 띄운다?


##  API 서비스키 환경변수 저장

* dotenv 라이브러리 설치
  

### 참고사이트

(https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings)

(https://velog.io/@public_danuel/process-env-on-node-js)

(https://velog.io/@ground4ekd/nodejs-dotenv)

(https://velog.io/@suseodd/Heroku%EC%97%90-.env%ED%8C%8C%EC%9D%BC-%EC%A0%81%EC%9A%A9-20k621f03d)








 