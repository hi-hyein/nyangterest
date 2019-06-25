### Docker 튜토리얼 

[동빈나 도커(Docker) 활용 및 배포 자동화 실전 초급](https://www.youtube.com/watch?v=HbKCxBFT2wk&list=PLRx0vPvlEmdChjc6N3JnLaX-Gihh5pHcx)

* CMD 관리자권한으로 실행

<pre>
cd {pem경로}

ssh -i "aws_pw.pem" ubuntu@ec2-52-79-228-93.ap-northeast-2.compute.amazonaws.com 
</pre>

* 접속후 현재 위치 확인
<pre>pwd</pre>

* 파이썬 파이프 설치
<pre>sudo apt-get install python3-pip</pre>

#### jupyter notebook설치 (GUI환경)
sudo pip3 install notebook

python3

from notebook.auth import passwd

* 비밀번호 설정후 해쉬값
<pre>'sha1:b4afbb8f0594:1c1562191165a598b6a60af7d55f5aa0263c44d1'</pre>

* 주피터 환경설정 파일 생성
<pre>
jupyter notebook --generate-config

sudo vim /home/ubuntu/.jupyter/jupyter_notebook.config.py
</pre>

* 제일 하단에 추가
<pre>
	c = get_config()
	c.NotebookApp.password = u'sha1:b4afbb8f0594:1c1562191165a598b6a60af7d55f5aa0263c44d1'
	c.NotebookApp.ip = '172.31.31.147'
	c.NotebookApp.notebook_dir = '/'
</pre>

* 주피터 노트북 실행
<pre>sudo jupyter-notebook --allow-root</pre>

* aws console 보안그룹 인바운드 규칙 port 8888허용
![]()

* http://52.79.228.93:8888/ 접속


* 항상 실행

<pre>bg
[1]+ sudo jupyter-notebook --allow-root &
disown -h
</pre>

* 현재 실행중인 8888 pid확인
<pre>sudo netstat -nap | grep 8888</pre>

* 주피터 노트북 종료
<pre>sudo kill -9 28423</pre>


#### 사설인증서 생성

* https 적용
<pre>
mkdir ssl
cd ssl
</pre>

* 개인키와 공개키 생성
<pre> 
sudo openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout "cert.key" -out "cert.pem" -batch 

Generating a 1024 bit RSA private key
................+++++
...............................+++++
writing new private key to 'cert.key'
</pre>

* 환경설정 파일 수정
<pre> 
c.NotebookApp.certfile = u'/home/ubuntu/ssl/cert.pem'
c.NotebookApp.keyfile = u'/home/ubuntu/ssl/cert.key'
</pre>

* 주피터 노트북 다시 실행

https://52.79.228.93:8888

* 주피터 노트북 시스템서비스 등록

* 서비스파일 작성
<pre> sudo vim /etc/systemd/system/jupyter.service </pre>


```
[Unit]
Description=Jupyter Notebook Server

[Service]
Type=simple
User=ubuntu
ExecStart=/usr/bin/sudo /usr/local/bin/jupyter-notebook --allow-root --config=/home/ubuntu/.jupyter/jupyter_notebook_config.py

[Install]
WantedBy=multi-user.target
```

* 데몬 재로드
<pre> sudo systemctl daemon-reload </pre>

* 주피터 가능한 상태로
<pre>sudo systemctl enable jupyter</pre>

* 항상 주피터 서버 시작
<pre>sudo systemctl start jupyter</pre>

* 실행중인 주피터 서비스 확인
<pre>sudo systemctl status jupyter</pre>

* 재시작
<pre>sudo systemctl restart jupyter</pre>

#### docker설치

(https://docs.docker.com/install/linux/docker-ce/ubuntu/)

<pre> sudo apt-get update
Install packages to allow apt to use a repository over HTTPS:

sudo apt-get install \
 apt-transport-https \
 ca-certificates \
 curl \
 software-properties-common
Add Docker’s official GPG key:

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt-get update

sudo apt-cache policy docker-ce

sudo apt-get install docker-ce

sudo docker images</pre>

* 헬로우월드 실행
<pre>  
sudo docker pull hello-world

sudo docker run hello-world
</pre>

* 실행중인 도커 확인
<pre>sudo docker ps -a</pre>

* 도커 컨테이너 삭제 (삭제하여도 이미지는 남아서 언제든 다시 실행 가능함)
<pre>sudo docker rm {container id}</pre>

<pre>  
cd home/ubuntu
mkdir example
cd example
sudo vim Dockefile
</pre>

```
FROM ubuntu:18.04
MAINTAINER Yoonu Cho <tomorrowcho@gmail.com>

    RUN apt-get update
    RUN apt-get install -y apache2 # Install Apache web server (Only 'yes')

    EXPOSE 80

    CMD ["apachectl", "-D","FOREGROUND"]
```	

* 도커 빌드 
<pre>sudo docker build -t example . </pre>

* 도커 실행
<pre>sudo docker run -p 80:80 example</pre>

* 보안그룹 인바운드규칙 HTTP 80 추가

#### PHP 개발환경 구축

<pre>

sudo docker rm -f `sudo docker ps -a -q`

cd home/ubuntu/example

sudo docker run -p 80:80 -v /home/ubuntu/example/html:/var/www/html example

sudo docker images

cd /home/ubuntu/example/html
</pre>

* php설치 Dockerfile 추가설정

```
FROM ubuntu:18.04
MAINTAINER Yoonu Cho <tomorrowcho@gmail.com>

    # Avoiding user interaction with tzdata
    ENV DEBIAN_FRONTEND=noninteractive

    RUN apt-get update
    RUN apt-get install -y apache2 # Install Apache web server (Only 'yes')
    RUN apt-get install -y software-properties-common
    RUN add-apt-repository ppa:ondrej/php # For Installing PHP 5.6
    RUN apt-get update
    RUN apt-get install -y php5.6

    EXPOSE 80

    CMD ["apachectl", "-D","FOREGROUND"]
```
<pre>sudo docker images</pre>

#### MYSQL 컨테이너 생성

* 컨테이너 , 이미지 모두 삭제

<pre>sudo docker rm -f `sudo docker ps -a -q`

sudo docker rmi -f `sudo docker images`</pre>

* mysql 설치 시뮬
<pre>
sudo docker run -d -p 9876:3306 -e MYSQL_ROOT_PASSWORD=password mysql:5.6
</pre>

* mysql 이미지 실행
<pre>sudo docker exec -it cf7878896acd /bin/bash</pre>

<pre>
mysql>  CREATE DATABASE TEST;

mysql>  SHOW DATABASES;

mysql>  exit
</pre>

* 실행 도커 컨테이너 id확인
<pre>sudo docker ps -a</pre>

* ip address 확인
<pre>sudo docker inspect container id </pre>

* mysql 설치
<pre>sudo apt install mysql-client-core-5.7</pre>

* mysql 접속
<pre>

mysql -u root -p --host 172.17.0.2 --port 3306 

or 

mysql -u root -p --host 172.17.0.1 --port 9876

</pre>

<pre>mysql> use mysql;</pre>

* 유저 비밀번호 생성 
mysql> CREATE USER 'test'@'%' IDENTIFIED BY 'password';

* 해당유저에게 권한
mysql> GRANT ALL PRIVILEGES ON *.* TO 'test'@'%';

* 외부에서 권한 설정
mysql> FLUSH PRIVILEGES;

* 종료
exit
</pre>

* 재시작
<pre >sudo docker restart container id </pre>

* HeidiSQL 설정 및 실행

	* 호스트명 /IP : 52.79.228.93
	* 사용자: test
	* 암호: password
	* 포트: 9876
	* 열기
	* 쿼리 버전확인: SELECT VERSION();

#### PHP 컨테이너와 MySQL 컨테이너 연동해보기

<pre>
sudo vim Dockerfile 추가 # Connect PHP & MySQL
RUN apt-get install -y php5.6-mysql 
</pre>

* 다시 빌드
<pre>sudo docker build -t example .</pre>

* 서버실행
<pre>sudo docker run -p 80:80 -v /home/ubuntu/example/html:/var/www/html example</pre>

* example폴더 접근
<pre> cd example </pre>
* index.php 수정
주피터 노트북에서 직접 편집 가능
```
<?php
	$conn = mysqli_connect(
				'52.79.228.93',
				'test',
				'password',
				'TEST',
				'9876'
	);
	if(mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: ". mysqli_connect_error();
	}
    $sql = "SELECT VERSION()";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    print_r($row["VERSION()"]);
?>
```


#### AWS RDS 설정시 데이터베이스 구축

```
<?php
	$conn = mysqli_connect(
				'docker-mysql-test.cqn96a5xogpk.ap-northeast-2.rds.amazonaws.com',
				'user',
				'password',
				'TEST',
				'3306'
	);
	if(mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: ". mysqli_connect_error();
	}
    $sql = "SELECT VERSION()";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    print_r($row["VERSION()"]);
   
?>
```

* 기존 mysql 컨테이너 삭제
<pre>docker rm -f 컨테이너 id</pre>

#### 깃허브 배포
* 프로젝트 생성 및 aws 환경에 클론
<pre>git clone https://github.com/yoonucho/Docker-Practice.git

cd Docker-Practice
sudo vim Dockerfile 
</pre>

* 빈파일 생성후 주피터에서 추가
Dockerfile, index.php example내의 파일 모두 복사 후 깃 커밋 및 푸시


#### DockerHub와 GitHub 연동하기

* dockerhub 회원가입
레파지토리 생성후 github Docker-Practice 연결 저장및 빌드 클릭

* 기존 서버에서 docker 모든 컨테이너 지우기
 <pre>docker rm -f `sudo docker ps -a -q`</pre>

* 기존 서버에서 docker 모든이미지 지우기
<pre>docker rmi -f `docker images`</pre>

* Docker-Practice폴더에서 Project 폴더생성
<pre>
mkdir Project
index.php 위치이동
mv index.php ./Project/index.php
</pre>

* git 커밋 및 푸시

#### README 파일 생성

* README.md

<pre>
Docker 실전 연습 예제입니다.
Installation
cd /home
git clone https://github.com/yoonucho/Docker-Practice.git
cd Docker-Practice
Run
# Login For Private Docer Repository
docker login
docker pull tomorrowcho/docker-practice
docker run -p 80:80 -v /home/Docker-Practice/Project:/var/www/html  tomorrowcho/docker-practice
</pre>

#### 사용자 입장에서 README 따라서 설치해보기

* 기존 Docker-Practice폴더 삭제
<pre> rm -r -f Docker-Practice </pre>

