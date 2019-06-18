## **ec2 환경설정**

### **ubuntu 명령어**

#### nginx

1. 패키지 설치: apt-get install nginx
2. 패키지 완전 삭제: apt-get purge nginx nginx-common nginx-full

#### 폴더 관리

1. 폴더 생성: mkdir 폴더이름
2. 폴더 삭제: rmdir 폴더이름
    - 내부에 하위 폴더,파일 있는경우: rm -rf 폴더이름

### pm2

1. 모듈 설치:" npm install -g pm2
2. pm2 ecosystem
3. 옵션 삭제: pm2 delete ecosystem

### Docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/

SET UP THE REPOSITORY
Update the apt package index:

$ sudo apt-get update
Install packages to allow apt to use a repository over HTTPS:

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
Add Docker’s official GPG key:

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
   
$ sudo apt-get update

$ sudo apt-cache policy docker-ce

$ sudo apt-get install docker-ce 

$ sudo docker images

$  sudo docker pull hello-world

$ sudo docker run hello-world

실행중인 도커 확인
$ sudo docker ps -a

도커 삭제
$ sudo docker rm {container id}

삭제하여도 이미지는 남아서 언제든 다시 실행 가능함

cd home/ubuntu
ubuntu@ip-172-31-24-105:~$ mkdir example
ubuntu@ip-172-31-24-105:~$ cd example
ubuntu@ip-172-31-24-105:~/example$ sudo vim Dockefile
	FROM ubuntu:18.04
	MAINTAINER Yoonu Cho <tomorrowcho@gmail.com>

	RUN apt-get update 
	RUN apt-get install -y apache2 # Install Apache web server (Only 'yes')

	EXPOSE 80

	CMD ["apachectl", "-D","FOREGROUND"]


ubuntu@ip-172-31-24-105:~/example$ ls
Dockefile
ubuntu@ip-172-31-24-105:~/example$ sudo docker build -t example .

ubuntu@ip-172-31-31-147:~/example$ sudo docker run -p 80:80 example

보안그룹 인바운드규칙 HTTP 80 추가

 sudo docker rm -f `sudo docker ps -a -q`

cd home/ubuntu/example

sudo docker run -p 80:80 -v /home/ubuntu/example/html:/var/www/html example

 sudo docker images

cd /home/ubuntu/example/html

php설치 Dockerfile 추가설정
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

sudo docker images

필요없는 none 이미지 삭제
rmi -f image id

 sudo vim index.php






