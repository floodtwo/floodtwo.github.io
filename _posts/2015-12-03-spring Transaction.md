---
author: floodtwo
layout: post
title:  "Spring(egov) + myBatis 환경시 트랜잭선 설정 방법 "
date:   2015-12-03 12:00
comments: true
category: Spring egovframe
tags: 
- Spring
- egovframe
---

# Spring(egov)+ myBatis 환경시 트랜잭선 설정 방법 

기본적으로 전자 정부 프레임 워크에서는 트랜잭션 설정은 되어 있다.

context-transaction.xml을 확인 해보면 아래와 같이

    <bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    	  <property name="dataSource" ref="dataSource"/>
    	</bean>
    	
    	<tx:advice id="txAdvice" transaction-manager="txManager">
    		<tx:attributes>
    			<tx:method name="*" rollback-for="Exception"/>
    		</tx:attributes>
    	</tx:advice>
        
    	<aop:config>
    		<aop:pointcut id="requiredTx"
    			expression="execution(* egovframework.rte..*Impl.*(..))"/>
    		<aop:advisor advice-ref="txAdvice"
    			pointcut-ref="requiredTx" />
    	</aop:config>

.
처럼 impl 하단의 파일은 먹도록 동작 되어 있으나 동작 하지 않았다 =-=?? 뭐지??

@transactional 붙여도 소용없었다.

따로 한 작업은 iBatis -> myBatis로 변경하고 또 

로그를 볼수 잇도록 

   <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
        <property name="driverClassName" value="net.sf.log4jdbc.DriverSpy"/>
        <property name="url" value="jdbc:log4jdbc:postgresql://localhost:5432/XXXX"/> 
        <property name="username" value="XXXX"/>
        <property name="password" value="XXXXXX"/>
    </bean>

로 변경 하였는데 이것 때문인가 싶어서 조사를 해본 결과 

context-sqlMap에 아래와 같이 내용을 추가 하여야지만 트랜잭션이 동작을 한다. 


	<!-- SqlSession setup for MyBatis Database Layer -->
 	<bean id="sqlSession" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource" />
		<property name="mapperLocations" value="classpath:/egovframework/sqlmap/rte/*/*/*.xml" />
		<!-- 추가 START -->
		<property name="transactionFactory">
		    <bean class="org.apache.ibatis.transaction.managed.ManagedTransactionFactory" />
		</property>  
		<!-- 추가 E N D -->
	</bean>

DB 접속할때 transactionFactory을 주입 시켜야지만 동작 한다.. 아 어렵다 =-=..

