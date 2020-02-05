# 로컬 -> 로컬에서의 cors 에러

이전 공공포털 API 작업을 진행하면서 `cors`에러로 인해 어려움을 격은적이 있었다.
[190501_cors.md](190501_cors.md)

간단하게 cors에러에 대해 설명하자면 
어떤 출처(origin)에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용하는 것을 제한하는 브라우저의 보안 방식이다.
이 때 다른 출처와 같은 출처를 구분하는 기준은 URI의 `프로토콜` `호스트` `포트` 가 같은가 이다.

**cors 제외**
- `<img>` 태그로 다른 도메인의 이미지 파일을 가져오거나
- `<link>` 태그로 다른 도메인의 CSS를 가져오거나
- `<script>` 태그로 다른 도메인의 javascript를 가져오는 것
- 그 외에도 `<video> <audio> <object> <embed> <applet> `태그 

script에서 XMLHttpRequest나 Fetch API를 사용해 다른 출처에 리소스를 요청할 때 적용된다.

## 이슈
```javascript
function getXMLHttpRequest() {
    if (window.ActiveXObject){
        try{
            return new ActiveXObject('Msxml2.XMLHTTP')
        } catch(e){
            try{
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e1){return urll;}
        }
    } else if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    } else {
        return null;
    }
}

var httpRequest = null;

function processEvent () {
    httpRequest = getXMLHttpRequest();
    httpRequest.onreadystatechange = callbackFunction;
    httpRequest.open('GET','down.jpg', true);
    httpRequest.send(null)
}

function callbackFunction(){
 if(httpRequest.readyState == 1 || httpRequest.readyState == 2 || httpRequest.readyState == 3) {
     console.log('작업중')
 }else if (httpRequest.readyState == 4) {
     if (httpRequest.status == 200){
        console.log('작업완료')
     }else {
        alert('문제발생:' + httpRequest.status);
     }
 }
}
```
그저 내 로컬에 있는 `down.jpg`이미지를 가져와서 응답을 받으면 처리하는 스크립트였는데 `같은 로컬`이기때문에 당연히 잘 될것같았던 코드가
`cors`에러를 뱉어냈다. `cors`는 다른 출처에 리소스를 요청할 때 적용되는데, 나는 같은 로컬인데?! 왜지! 당황스러웠지만 이유는 빨리 찾았다.

```
< 에러 내용 >
Access to script at 'file:///Users/heny/Desktop/test/down.jpg' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
```

## 에러 해석
같은 경로의 자원을 요청하는데 에러 메세지엔 origin, 즉 출처가 `null` 로 넘어온 script에 대한 접근이 CORS 정책에 따라 제한되었다고 나와있다.
즉 `file:///Users/heny/Desktop/test/index.html > file:///Users/heny/Desktop/test/down.jpg` 으로 요청한게 아니라
`file:///Users/heny/Desktop/test/down.jpg > null/test/down.jpg`로 요청한게 되어 cors에러가 발생한것이다.

웹브라우저에서 로컬파일의 접근을 막기위해 이 방법을 사용한다고 한다.

## 해결방법
1. 서버에 올리기
2. vscode에서 라이브 서버 플러그인 돌리기(로컬서버)
3. npm으로 http-server 설치하여 로컬 서버 돌리기

위 방법은 모두 `서버`를 사용하는 것이다.
아무리 로컬에서 로컬로 접근하는 거라도 웹브라우저에서는 로컬로 접근할시 cors에러를 생성해 Origin(출처)를 null로 바꿔 접근을 못하게 하니
로컬이 아닌 `서버`를 사용해서 같은 `프로토콜`,`호스트`,`포트` 로 접근하는게 해결방법이다.