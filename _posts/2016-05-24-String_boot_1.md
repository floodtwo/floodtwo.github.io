---
author: floodtwo
layout: post
title:  "String Boot 시작 "
date:   2016-05-24 16:00
comments: true
category: String Boot 
tags: 
- String Boot

---

# String Boot 시작 ( with STS)

참고 : http://millky.com/@origoni/post/1100

최초에 이클립스 마켓플레이스에서 STS를 다운 받는다 


![alt tag](http://floodtwo.github.io/images/sts/sts1.png)

다운이 완료되면은( 첨에는 겁나 오래걸린다 ㅡㅡ)

File -> New Project  에서 Spring Starter Project를 실행 한다. 

![alt tag](http://floodtwo.github.io/images/sts/sts2.png)

실행후 자신이 원하는 디펜던시를 선택 ( 이거 추후에 추가/변경 안되나 =-=?)

![alt tag](http://floodtwo.github.io/images/sts/sts3.png)

그리고 Spring Boot App 을 실행 하면 

![alt tag](http://floodtwo.github.io/images/sts/sts4.png)

에러가 발생 하네요 =-=

> 오류: 기본 클래스 com.sb1.Springboot1Application을(를) 찾거나 로드할 수 없습니다.

이클립스에서 자바 설정에 이상이 있어서 자바를 새로 잡아주고.. 다시 실행 하면

에러가 발생 하네요

>org.springframework.beans.factory.BeanCreationException: Error creating bean with >name 'org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration$JdbcTe>mplateConfiguration': 

DB 연동에서 문제가 생긴거 같아서. 구글링 한결과 

application.properties 파일에 아래의 내용을 추가 (postgresql 환경)

> spring.datasource.driverClassName=org.postgresql.Driver
> spring.datasource.url=localhost:5432 
> spring.datasource.username=postgres 
> spring.datasource.password=1234

이제 에러는 안나니 간단한 컨트롤러를 추가해서 테스트 실행

>package com.millky.blog;
>
>import org.springframework.web.bind.annotation.RequestMapping;
>import org.springframework.web.bind.annotation.RestController;
>
>@RestController
>public class HelloRestController {
>	@RequestMapping("/")
>	public String index() {
>		return "helloworld!";
>	}
>}

추가후 http://localhost:8080/ 를 실행 시키면 

![alt tag](http://floodtwo.github.io/images/sts/sts5.png)

잘 되는것을 확인 할수가 잇다 ^^
( 근데 이거 웹서버 뭘 쓰는거지 =-=??? )



