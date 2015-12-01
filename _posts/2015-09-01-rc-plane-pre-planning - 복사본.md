---
author: floodtwo
layout: post
title:  "Spring multiFileUpload/ Download"
date:   2015-11-27 21:05
comments: true
category: Spring
tags: 
- Spring
---

# 멀티 업로드 

스프링에서 제공하는 멀티 업로드를 이용

### context-properties.xml 에 아래의 Bean을 추가 
	<!-- 멀티파일 업로드 -->
	<bean id="multipartResolver"
		class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>
		