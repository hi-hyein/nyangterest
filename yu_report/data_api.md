## **data.go.kr**

### **진행 절차**

1. 회원 가입
2. 오픈 API - 활용신청 - 개발계정 신청 - 자동승인
3. 일반 인증키 발급
4. 요청변수 샘플데이터로 요청,응답 확인완료
5. 동물보호관리시스템\_OpenAPI활용가이드 다운로드 및 리딩

### **진행중 이슈**

-   4/12 금요일 개발계정 신청 후 4/15 오전까지도 SERVICE KEY IS NOT REGISTERED ERROR 메세지가 나옴

### **해결과정 및 원인**

#### 해결과정

1. 정보공유 게시판 FAQ페이지에서 해당 에러 메세지 내용 확인 - 서비스 신청(승인), 인증키 발급(재발급 포함)하는 경우 해당 정보가 기관 서버로 동기화되지 않아
   발생할 수 있으며, 동기화는 약 1시간 소요될 수 있다고 했으나 며칠이 지나도 에러 발생

2. Q&A페이지에서 내가 이용하려는 서비스 키워드 검색 후 문의글 등록

#### 에러 원인

-   피드백- 기관서버와 인증정보 동기화 지연으로 에러 발생 확인

### **서비스정보 요약**

1. 서비스 유형 : REST
2. 활용기간: 2019-04-12 ~ 2021-04-12
3. End Point: http://openapi.animal.go.kr:80/openapi/service/rest/abandonmentPublicSrvc?_wadl&type=xml
4. 데이터포맷: 표준은 XML이고 미리보기시 XML로 확인, 샘플데이터로는 JSON파일도 다운로드 가능
5. 참고문서: 동물보호관리시스템\_OpenAPI활용가이드.docx
6. 일일 트래픽: 각 1000
7. 요청변수 (항목명, 항목설명)
    - bgnde 유기날짜(검색 시작일)(YYYYMMDD)
    - endde 유기날짜(검색 종료일)(YYYYMMDD)
    - upkind 축종코드 - 고양이: 422400
    - kind 품종코드
    - upr_cd 시도코드
    - org_cd 시군구코드
    - care_reg_no 보호소코드
    - state 상태 - 전체 : null(빈값) - 공고중 : notice - 보호중 : protect
    - pageNo 페이지 번호
    - numOfRows 페이지당 보여줄 개수
    - neuter_yn 중성화여부
8. 출력결과
    - noticeEdt 공고종료일 (YYYYMMDD)
    - popfile Image
    - processState 상태
    - sexCd 성별 M : 수컷 F : 암컷 Q : 미상
    - neuterYn 중성화여부 Y : 예 N : 아니오 U : 미상
    - specialMark 특징
    - careNm 보호소이름
    - careTel 보호소전화번호
    - careAddr 보호장소
    - orgNm 관할기관
    - chargeNm 담당자
    - officetel 담당자연락처
    - noticeComment 특이사항
    - numOfRows 한페이지 결과수
    - pageNo 페이지 번호
    - totalCount 전체 결과 수
    - resultCode 결과코드
    - resultMsg 결과메세지
    - desertionNo 유기번호
    - filename Thumbnail Image
    - happenDt 접수일 (YYYYMMDD)
    - happenPlace 발견장소
    - kindCd 품종
    - colorCd 색상
    - age 나이
    - weight 체중
    - noticeNo 공고번호
    - noticeSdt 공고시작일 (YYYYMMDD)
9. 샘플코드 - Nodejs

```javascript
/* NodeJs 샘플 코드 */

var request = require("request");

var url =
	"http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic";
var queryParams =
	"?" + encodeURIComponent("ServiceKey") + "=서비스키"; /* Service Key*/
queryParams +=
	"&" +
	encodeURIComponent("bgnde") +
	"=" +
	encodeURIComponent("20140601"); /* 유기날짜 (검색 시작일) (YYYYMMDD) */
queryParams +=
	"&" +
	encodeURIComponent("endde") +
	"=" +
	encodeURIComponent("20140630"); /* 유기날짜 (검색 종료일) (YYYYMMDD) */
queryParams +=
	"&" +
	encodeURIComponent("upkind") +
	"=" +
	encodeURIComponent(
		"417000"
	); /* 축종코드 - 개 : 417000 - 고양이 : 422400 - 기타 : 429900 */
queryParams +=
	"&" +
	encodeURIComponent("kind") +
	"=" +
	encodeURIComponent(""); /* 품종코드 (품종 조회 OPEN API 참조) */
queryParams +=
	"&" +
	encodeURIComponent("upr_cd") +
	"=" +
	encodeURIComponent(""); /* 시도코드 (시도 조회 OPEN API 참조) */
queryParams +=
	"&" +
	encodeURIComponent("org_cd") +
	"=" +
	encodeURIComponent(""); /* 시군구코드 (시군구 조회 OPEN API 참조) */
queryParams +=
	"&" +
	encodeURIComponent("care_reg_no") +
	"=" +
	encodeURIComponent(""); /* 보호소번호 (보호소 조회 OPEN API 참조) */
queryParams +=
	"&" +
	encodeURIComponent("state") +
	"=" +
	encodeURIComponent(
		"notice"
	); /* 상태 - 전체 : null(빈값) - 공고중 : notice - 보호중 : protect */
queryParams +=
	"&" +
	encodeURIComponent("pageNo") +
	"=" +
	encodeURIComponent("1"); /* 페이지 번호 */
queryParams +=
	"&" +
	encodeURIComponent("numOfRows") +
	"=" +
	encodeURIComponent("10"); /* 페이지당 보여줄 개수 */
queryParams +=
	"&" +
	encodeURIComponent("neuter_yn") +
	"=" +
	encodeURIComponent("Y"); /* 중성화여부 */

request(
	{
		url: url + queryParams,
		method: "GET"
	},
	function(error, response, body) {
		//console.log('Status', response.statusCode);
		//console.log('Headers', JSON.stringify(response.headers));
		//console.log('Reponse received', body);
	}
);
```

10. 활용목적: 웹사이트개발
11. 라이센스표시: 저작자표시

※ 인증키는 보안상 기재하지 않음
