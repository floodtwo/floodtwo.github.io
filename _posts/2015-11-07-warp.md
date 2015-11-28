---
layout: post
title:  javascript (Radian / degress)  각도 및 거리 
date:   2015-11-07 13:02
categories: javascript
tags: javascript
---
# JAVASCRIPT 각도 관련 자료
 
자바 스크립트 각도는 기존에 쓰던 360 기존이 아니라 라디안 기준으로 되어 있어서
 
자바스크립트로 처음 각도관련 계산 하면 맨붕이 온다.. T^T

그래서 자료를 찾다 보니 아래의 곳이 가장 정리가 잘되어 있어서 참고 자료로 하고

    http://yangpro.github.io/play-with-canvas-trigonometry/

JAVASCRIPT로 각도 및 거리  관련 함수를 만들어 보았다 

    // 두점 사이의 거리 
    Math.getLength = function(x2, x , y2 , y){
    	return Math.sqrt(Math.pow( (x2 - x), 2) + Math.pow(y2 - y, 2));
    ;}
    
    /*  웹 브라우져 상에서 각도는 위 아래 좌표가 반댕미  */ 
    // 두점 사이의 각도 (라디안값)
    Math.getRadians = function(x2, x , y2 , y){
    	return Math.atan2(y2 - y, x2 - x);
    ;}
    
    // 두점 사이의 각도 ( 360 기준)
    Math.getDegrees = function(x2, x , y2 , y){
    	return Math.degrees(Math.atan2(y2 - y, x2 - x));
    ;}

    // 각도를 라디안으로 변경 
    Math.radians = function(degrees) {
      return degrees * Math.PI / 180;
    };

    // 라디안을 각도로 변경 
    Math.degrees = function(radians) {
      return radians * 180 / Math.PI;
    };
