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
		
### 테스트용 JS 구현 
    <form name="uploadForm" method="post" enctype="multipart/form-data" action="/uploadfile.do">
        <input type="file" name="upFile">
        <input type="file" name="upFile">
        <input type="file" name="upFile">
        <input type="submit" value="aa"> 
    </form>
upfile 이라는 이름으로 동시에 3개를 업로드 할수 있는 multifile upload를 구현 
		
### Controller에서 처리 

	@RequestMapping(value = "/uploadfile.do")
	public Map fileupload(HttpServletRequest request, HttpServletResponse response)  {
		Map returnMap = new HashMap();
		try {
			MultipartHttpServletRequest multipartRequest =  (MultipartHttpServletRequest)request;  //다중파일 업로드
			List<MultipartFile> files = multipartRequest.getFiles("upFile"); // upfile 이라는 이름으로 파일을 수신
			for(int i = 0 ; i < files.size(); i++){
				MultipartFile mf = (MultipartFile) files.get(i);
				String u = UUID.randomUUID().toString().replaceAll("-", "");  // 파일 암호화및 중복 처리 대응 
				File ff = new File("c:\\"+ u );
				mf.transferTo(ff);                                          // 파일을 서버로 복사 
			}
		} catch (Exception e) {
			returnMap.put("msg", "err");
		}
		return returnMap;
	}		