## 상단 필터박스 셀렉트박스로 검색하기 구현

### 내가 생각한 구현 방법

* 이미 서버측에서 요청받은 전체 데이터가 프론트에서 
* 불러와서 리스트로 보여지고 있으니 여기에서 추출하자.
* 백엔드측에 추가되는 변수를 추가하자.
* UI구현때 추가로 필요한 변수는  시도,시군구, 보호소이름, 품종, 상태, 중성화여부
* 우선 상태를 넣어보자.
* listStore에서 loadList함수를 재활용하면 되지 않을까
* 백엔드에 상태값을 null로 선언한다.
* 프론트엔드에서 받아들일 변수도 선언해야겠지
* 그런데 옵션은 어디서 받아오면 되려나?


### 내가 잘못 생각한 부분 및 진행 과정

1. 내가 받아온 전체데이터에는 옵션에 대한 정보가 없다 ;ㅁ;?
2. 다시 공공데이터 동물보호관리시스템_OpenAPI활용가이드를 보고 받아올수 있는 데이터 경로가 다름을 깨달음.
	* 예시: 시도 검색하려면 
	
	http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sido?ServiceKey="서비스키"_type=json

	* 시군구 예시 서울특별시 
	http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sigungu?upr_cd=6110000&ServiceKey="서비스키"_type=json

   * 상태를 검색하려면
상태
 - 전체 : null(빈값)
 - 공고중 : notice
 - 보호중 : protect

3. 내맘대로 되는게 하나도 없네 기존 백엔드 코드에서 state를 변수로만 정하면 될줄 알았는데 파라미터로 받아와서 url로 연결해야 프론트에서 보여질거 같다.
