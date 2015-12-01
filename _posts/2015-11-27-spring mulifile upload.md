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

끝 업로드는 별고 아니였음 ...

# 파일 다운로드 

### dispatcher-servlet.xml 에 아래의 bean을 추가 

	<!-- 파일 다운로드 -->
	<bean id="fileDownloadView" class="egovframework.rte.cmmn.FileDownloadView" />
	<bean id="downloadViewResolver"
		class="org.springframework.web.servlet.view.BeanNameViewResolver">
		<property name="order" value="0" />
	</bean>

설명을 보니 order 에 값을 0을 지정(맨처음 처리하겠습니다.) 하면 될줄 알았는데
실제로 안됬다.. 이것때문에 한 2시만 시간 날렸다 =-=...
혹시 계속 fileDownloadView 의 뷰가 호출 되지 않는다면은 같은 파일에서 
다른 bean들과의 설정에서 충돌 때문에 그럴것이다. (난 걍 다지웠음 =-=)

### 호출 하기 위한 url 설정 

    <a href="/fileDownload.do?fileName=663c64dc4a35422bb6227746b8b23293.jpg">다운로드</a>

### controller

	@RequestMapping("/fileDownload.do")
	public ModelAndView download(HttpServletRequest request) throws Exception {
		File downloadFile = new File("c:\\" + request.getParameter("fileName"));
		return new ModelAndView("fileDownloadView", "downloadFile", downloadFile);
	}  

위에서 설정한 fileDownloadView 을 호출 한다. 

### downloadView 

    public class FileDownloadView  extends AbstractView {
    	public FileDownloadView() {
    		setContentType("application/download; charset=utf-8");
    	}
    
    	@Override
    	protected void renderMergedOutputModel(
    			Map<String, Object> model,
    			HttpServletRequest request, 
    			HttpServletResponse response) throws Exception {
    		
    		System.out.println( "renderMergedOutputModel");
    		
    		
    		File file = (File)model.get("downloadFile");
    		
    		
    		
    		System.out.println( request.getParameter("fileName"));
    		
    		response.setContentType(getContentType());
    		response.setContentLength((int)file.length());
    		
    		String userAgent = request.getHeader("User-Agent");
    		boolean ie = userAgent.indexOf("MSIE") > -1;
    		String fileName = null;
    		
    		if(ie) {
    			fileName = URLEncoder.encode(file.getName(), "utf-8");
    		} else {
    			fileName = new String(file.getName().getBytes("utf-8"), "iso-8859-1");
    		}
    		
    		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
    		response.setHeader("Content-Transfer-Encoding", "binary");
    		
    		OutputStream out = response.getOutputStream();
    		FileInputStream fis = null;
    		
    		try {
    			fis = new FileInputStream(file);
    			FileCopyUtils.copy(fis, out);
    		} finally {
    			if(fis != null) {
    				try {
    					fis.close();
    				} catch(IOException ioe) {}
    			}
    		}
    		out.flush();
    	}
    }
    
bean 설정때문에 고생했지만은 T^T 다운로드 잘된다 +_+ 후후훗 ㅋㅋ







