
# 미팅 기록

## 리뷰 문서

- [https://github.com/henyy1004/nyangterest/blob/master/yu_report/yu_200209_Search%26env.md](https://github.com/henyy1004/nyangterest/blob/master/yu_report/yu_200209_Search%26env.md)

## Filter 기능에 대한 생각

- 무한 스크롤 기능 vs filter 기능 => 이건 왜 충돌이 나서 힘들게 됐을까요?
  - 무한 스크롤: 정해져 있는 페이지 번호의 갯수(72개) 만큼만 가져와야 하니까 => 여기서는 filter 기능이 동작 안함. 왜? 다른 페이지의 list는 아직 안가져왔으니까요
  - filter 기능: 전체 목록을 가져온 후에 filter를 건다(front에서의 로직으로) => 여기서 페이지 번호로 나눠서 가져오지 않았으므로 무한 스크롤 기능을 사용할 수 없다 => 그래서 그냥 무한 스크롤 기능을 빼자
- filter를 하던 안하던 list를 보여주는 건 똑같은데 왜? 무한 스크롤 기능이 되고 안되고의 차이를 둘까?

## backend 부분에 페이지 기능과 filter 기능이 동작하게 하자

- 기존
  - 전체 list 가져오는 url
  - filter 걸린 list 가져오는 url
- 변경
  - 전체 list 가져오는 url ? filter parameter를 받음

## backend 로직의 흐름

1. 전체 목록의 갯수를 얻어오는 API 호출, totalCount
2. totalCount 만큼의 전체 목록을 가져옴
3. (Option) filter parameter 대로 filter 로직을 구현, filteredList 구함
4. filteredList에서 numOfRows에 해당하는 72개의 list를 return

## 품종 코드 가져오기

- select box에 object 형태로 넣을 때 value 값을 코드 값으로 넣고
- select 이벤트할 때 받아오면
- 그걸 가지고 backend api 호출할 때 code 값을 paramter로 전달

## debugging 해보기

- break point, step over or into

## 얘기할 것
  
- front, back 이걸 굳이 구분해서 힘을 줘야 할까?
- 필요하다고 생각되는 부분에 집중을 하고 맞는 방향으로 구현
- 지금은 front 쪽에서만 해결하려고 너무 많은 에너지를 쏟고 있어요
- 오늘 얘기한 부분을 잘 이해해 보시고 해결해 가셨으면 합니다.
  - 중간에 이해 안되면 issue에 올려주세요! => 한꺼번에 하고 2주 후에 짠! 하고 보여주지 마시고요.