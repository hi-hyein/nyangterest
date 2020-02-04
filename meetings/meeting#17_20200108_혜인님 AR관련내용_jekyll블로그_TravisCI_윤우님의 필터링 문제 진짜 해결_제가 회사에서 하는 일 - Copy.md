
# 미팅 기록

## AR에대해서 - AR 콘텐츠 회사 면접

- PTC Vuforia, Google ARCore, Apple ARKit
- 마인크래프트 AR
- WebAR: AR.js, AFrame.js, Three.js로 3D 그래픽 랜더링 해봤다 정도 얘기하고 실제 해봤다면 아주 좋습니다.

## Github blog에 대한 이야기

- [https://github.com/henyy1004/nyangterest/blob/master/hi_report/191215_jekyll.md#%EC%9A%94%EC%A6%98-%EC%9E%AC%EB%AF%B8%EB%B6%99%EC%9D%B8-%EC%9E%91%EC%97%85](https://github.com/henyy1004/nyangterest/blob/master/hi_report/191215_jekyll.md#%EC%9A%94%EC%A6%98-%EC%9E%AC%EB%AF%B8%EB%B6%99%EC%9D%B8-%EC%9E%91%EC%97%85)
- Jekyll 해보면서 ruby도 하고 문제점을 찾고 개선하고 공부한 부분은 매우 좋습니다.
- 정말 필요해서, 그리고 재밌어서 하신거라면 칭찬해드리고 싶네요

## TravisCI

- 보통 jenkins 쓰는데 Travis CI 하실 줄 몰랐습니다.
- 그런데도 CI를 해보기 위해 역시 문제점을 찾고 해결해 나가려는 과정은 꽤나 좋습니다.
- 앞으로 이렇게 뭔가 해보고 정리하고 하는 일들이 많아지면 좋겠네요.

## Github page

- 그런데... 사실 빌드를 따로 할 필요가 없었고 그걸 repository에서 관리하지 않아도 됩니다.
- Repository 안에 Settings를 살펴보면 github page를 여는 옵션이 있고, 이걸 활성화 하면 빌드하고 배포한 후에 페이지 호스팅까지 해줍니다!

## 윤우님의 필터 기능의 문제 다시 파악

- 잘못 알고 있었던 것: Server에서 유기동물 데이터 API 호출할 때, numOfRows 파라미터의 값 대로 (numOfRows=72) 데이터를 가져오고 있었음
  - 저는 날짜 지정한 것 만큼의 전체 데이터를 가져왔다고 생각하고 있었습니다.
- 그리고 계속 front-end 쪽만 의심하고 있었죠.
- 게다가 여태까지 잘못된 거라고 생각하고 있던건 사실 다 의도대로 동작한 것들이었네요.
  - 처음부터 데이터는 72개 뿐이었으므로 ㅜㅜ

## 해결 방안

- 서버에서 요청 받으면 처음에 numOfRows=1의 파라미터로 API를 호출한다.
- 거기에서 totalCount의 값만 얻어온다.
- 다시 API를 호출할 때 numOfRows=totalCount로 한다. => 그러면 모든 데이터를 다 가져올 수 있다
- 이 결과를 client에 준다. => 분명히 잘 될수 밖에 없는 것 같습니다.

## 제가 회사에서 하는 일

- 안넣을까 하다가 메모장에 또 열심히 적어놨는데 안넣으면 아쉬워서 그냥 넣어봤어요
- H 프로젝트 클라이언트 개발 vs 버넥트 리모트 홀로렌즈 v1.4 Solution 제품 개발 이죠

## 같은것

- Unity
- C#

## 다른건?

- OS: iOS - Windows
- 중요 SDK: ARKit - WebRTC
- Device: iPad - Hololens
- 직군: SI 프로젝트 단기 개발 + 요구사항 충족 + 속도가 중요 vs 솔루션 제품 버전업 지속적인 통합개발 + 고객 요구사항 (언젠가) 반영 + 나중에 똥치우는 일 안겪으려면 진짜 잘만들어야 함
- 같이 일하는 사람들: Unity C# 개발자, PM(Project manager) 정도 vs PM(Product manager), 서버, 프론트엔드, 퍼블리셔, 안드로이드 기반 클라이언트, devops 엔지니어 등 솔루션 제품군에서 필요한 사람들과 협업
