# 가입한 이메일 / 비밀번호 찾기

## 가입한 이메일 찾기
### 과정
- 가입한 이메일을 입력받아 서버로 보낸다
- 서버에서 DB조회 후 찾는다
- 있으면 true, 없으면 false 상태를 프론트로 보낸다
- 프론트에서는 아이디 유무 정보를 알려준다

## 비밀번호 찾기
### 과정
- 가입한 이메일을 입력받아 서버로 보낸다
- 서버에서 DB조회 후 임시비밀번호를 만들어 password에 저장시킨다
- 만들어진 임시비밀번호를 사용자 이메일로 전송한다

## 문제
- ~~서버에서 프론트로 json의 데이터를 보내는데 프론트에서 json데이터를 console.log로 찍었더니 undefind라고 나왔다. 데이터를 못받아오는 줄 알았는데 서버상태는 정상이고 통신은 잘 되고있었다!
json을 다른 변수에 담아서 찍어보니 잘 나와서 해결되었다....~~
    - 이 문제는 잘못된 문제같다. 다시 시도해보니 json단독으로도 잘 출력된다. ㅎㅎ;;;;
    - 
- **서브쿼리**
    쿼리문을 사용하며 쿼리안에 쿼리문을 쓸때가 있었는데 `쿼리안에 쿼리`란 키워드로 검색을 막 해봤더니 `서브쿼리`가 나왔다.
    다만 내가 쓴 쿼리문 안에 쿼리문은 `서브쿼리`와는 개념이 달랐다.
    쿼리문이 끝나고 수행될 함수안에 새로운 쿼리문을 넣었던 것 뿐이고 (정말 단순한 쿼리 중첩?) `서브쿼리`는 아래 개념을 참고하자!

    >쿼리안에 있는 또 다른 쿼리를 의미한다.
    >쓰이는 위치에 따라 3가지 종류로 나뉜다.

  - **SELECT :  스칼라서브쿼리 (Scalar subqueries)**
    ```bash
    SELECT * FROM EMPLOYEES A 
    WHERE A.DEPRTMENT_ID=(SELECT B.DEPRTMENT_ID FROM DEPRTMENT B)
    ```
    A테이블에서 A테이블의 DEPRTMENT_ID와 B테이블의 DEPRTMENT_ID가 일치하는 데이터를 출력하라
  - **FROM : 인라인뷰 (inline views)**
    ```bash
    SELECT 
    ```
  - **WHERE절 : 중첩서브쿼리 (nested subqueries)**
    ```bash
    SELECT 
    ```
    (출력 데이터가 여러개의 row일때는 `WHERE A IN B` 를 해줘야함)
- **JOIN**
    서브쿼리 개념을 다시 잡으며 JOIN의 개념도 같이 정리
   > 두개의 다른 테이블을 결합해서 새로운 테이블을 출력
   ```bash
   SELECT * FROM TableA A LEFT JOIN TableB B ON A.key = B.key 
   ```
   테이블A의 key와 테이블B의 key가 같은 테이블B의 데이터를 테이블 A데이터와 결합하여 출력하라

- 쿼리를 `promise`로 처리하는 법도 있다 (https://codeburst.io/node-js-mysql-and-promises-4c3be599909b)
- 쿼리를 `async/await`으로 처리하는 법도 있다 (https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628)


## 작업 외
- 작업을 할 때 파일을 항상 나누는데 DB를 사용할때마다 DB연결작업 코드를 작성해야하는 불편함이 있어서 찾아보았는데 async/await작업으로 mysql모듈을 만들어 간단하게 작업해주는 방법이 있었다 추후 작업해봐야지 
(https://mayajuni.github.io/2016/07/12/typescript-nodejs-mysql/)

- promise, async/awaitㅇㅔ 관련된 강의영상을 많이 보았는데 예외처리가 많이 중요한것 같은 생각이 들었다 그리고 예외처리는 어떤 기능하나를 만들때 그때그때 처리하는게 좋을 것 같다.(빨리 까먹는 나같은 사람은 특히)