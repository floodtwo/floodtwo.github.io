---
layout: post
title:  Spring json 설정 
date:   2015-11-27 21:00
categories: Spring
tags: spring egov
---

# Spring 에서 Json으로 통신 

동시에 몇가지 설정을 동시에 해서 조금 틀릴수도 있지만 정리 

### pom.xml 에 아래의 dependency를 추가 

    <!-- json 설정  -->
    		<dependency>
    			<groupId>org.codehaus.jackson</groupId>
    			<artifactId>jackson-mapper-asl</artifactId>
    			<version>1.9.13</version>
    		</dependency>
    <!-- json 설정  -->
    
설정후에 maven install 수행 
    
### egov-com-servlet 에서 아래의 코드를 추가     

    <bean class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
			<property name="mediaTypes">
				<map>
					<entry key="json" value="application/json" />
				</map>
			</property>

			<property name="defaultViews">
				<list>
					<bean
						class="org.springframework.web.servlet.view.json.MappingJacksonJsonView">
						<property name="prefixJson" value="false" />
					</bean>
				</list>
			</property>
		</bean>

하면 json으로 전송할 준비가 되는것 같다.
(여기서 설정이 잘못되면 모든 통신이 json으로 처리되어 html 처리를 못하는 경우도 생긴다 =-=)

### ajax 형태로 요청및 수신 

    var login = function() {
    
    	var request = {
    		email : $('#email').val() , 
    		password : $('#password').val()
    	};
    
    	$('#inputJson').text( JSON.stringify(request)); 
    	
    	$.ajax(
    	{
    		type : 'POST', // Http Request Method로 POST로 지정
    		url : '/userLogin.json', // 서버 요청 주소
    		contentType : 'application/json;charset=UTF-8', // 서버 요청시 전송할 데이터가 UTF-8 형식의 JSON 객체임을 명시
    		data : JSON.stringify(request), // JavaScript 객체를 JSON 객체로 변환하여 서버 요청시 전송
    		dataType : 'json', // 서버로부터 응답받을 데이터가 JSON 객체임을 명시하여 수작업 없이 응답 데이터를 JavaScript 객체로 획득
    		success : function(response) {
    			$('#outputJson').text( JSON.stringify(response)   ); 
    		}
    	})
    }

## Controler 에서어 대응
    @RequestMapping(value = "/getUserAlert.json")
    	public Map getUserAlert(@RequestBody Map<Object, Object> inputMap )  {
    		Map returnMap = new HashMap();
    		try {
    
    			System.out.println(inputMap.get("userid"));
    			returnMap.put("msg", "OK");
    		} catch (Exception e) {
    			returnMap.put("msg", "err");
    			LOGGER.error("Login Error ", e);
    		}
    		return returnMap;
    	}

데이터를 송신할때  String이 아닌 list 혹은 map으로도 되는것 같은데
조금더 조사를 해봐야 될것 같다. 



