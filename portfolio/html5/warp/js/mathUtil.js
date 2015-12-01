


// 두점 사이의 거리 
Math.getDistance = function(x2, x , y2 , y){
	return Math.sqrt(Math.pow( (x2 - x), 2) + Math.pow(y2 - y, 2));
;}


/*  웹 브라우져 상에서 각도는 위 아래 좌표가 반댕미  */ 
// 두점 사이의 각도 (라디안값)
Math.getRadians = function(x2, x , y2 , y){
	return -1 * Math.atan2(y2 - y, x2 - x);
;}

// 두점 사이의 각도 ( 360 기준)
Math.getDegrees = function(x2, x , y2 , y){
	return -1 *  Math.degrees(Math.atan2(y2 - y, x2 - x));
;}


// 각도를 라디안으로 변경 
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


// 라디안을 각도로 변경 
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};