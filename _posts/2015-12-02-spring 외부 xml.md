---
author: floodtwo
layout: post
title:  "Spring에서 변수를 외부 xml에 설정하는 방법  "
date:   2015-12-02 12:00
comments: true
category: Spring
tags: 
- Spring
---

# Spring에서 변수를 외부 xml에 설정하는 방법 

### 파일생성 
먼저 원하는 곳에 값을 조회할 xml을 생성 한다.  (통상 ApplicationContext.xml 라고 명칭한다.)

![alt tag](http://floodtwo.github.io/images/15_1202_1.png)


### 파일 작성  
아래와같이 파일을 작성한다. 

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:p="http://www.springframework.org/schema/p"
        xmlns:util="http://www.springframework.org/schema/util"
        xmlns:task="http://www.springframework.org/schema/task"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
                http://www.springframework.org/schema/aop 
                http://www.springframework.org/schema/aop/spring-aop-3.1.xsd
                http://www.springframework.org/schema/context 
                http://www.springframework.org/schema/context/spring-context-3.1.xsd
                http://www.springframework.org/schema/util 
                http://www.springframework.org/schema/util/spring-util-3.1.xsd
                http://www.springframework.org/schema/task 
                http://www.springframework.org/schema/task/spring-task-3.1.xsd">  

    	<!-- upload 경로  -->
    	<bean id="attach" class="java.lang.String">
        	<constructor-arg value="C:\eclipse\attachFile\"/> 
    	</bean>
    </beans>
    
### java단에서 내용 호출 

    @RequestMapping("/fileDownload.do")
    	public ModelAndView download(HttpServletRequest request) throws Exception {
    	    // 파일을 호출 
    		AbstractApplicationContext context = new ClassPathXmlApplicationContext("ApplicationContext.xml");
    		// 파일 내용을 호출 
    		File downloadFile = new File("c:\\" + request.getParameter("fileName"));
    		return new ModelAndView("fileDownloadView", "downloadFile", downloadFile);
    	}   
ClassPathXmlApplicationContext는 classpath에 설정하는 방법이며 절대경로로 xml의 위치를 지정하는 방법도 있다.

위와 같이 셋팅 하면 잘 될것 같으나 xml의 위치를 찾지 못한다고 에러가 날것이다 

그럴 경우 이클립스 셋팅 방법 

### xml 경로 추가 
프로젝트 -> 마우스 오른쪽 클릭 -> properties -> javabuild path로 이동 후 Add Folder를 이용하여 추가 

![alt tag](http://floodtwo.github.io/images/15_1202_2.png)

