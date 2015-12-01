
var Warp = function(canvas, num, frameRate) {
 var WarpArr = new Array();
 var stage = document.getElementById(canvas);
 var ctx = stage.getContext("2d");

// 입력된 갯수 만큼 별을 생성
// Create Stars from order input
 for (var i = 0; i < num; i++){
	WarpArr[i] = new warps(stage, ctx);
}

// 동작을 위한 워프 카운트
var warpCnt = 0; 

 this.play = setInterval(function() {
	ctx.clearRect(0, 0, stage.width, stage.height);
	
	var grd = ctx.createRadialGradient(500,250,100,500,250,2000);
	grd.addColorStop(0,"black");
	grd.addColorStop(1,"white");
	// Fill with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(0,0,1000,500);

	// 워프 동작 끝 
	if(warpCnt == 400){
		for (var i = 0; i < num; i++) {
				WarpArr[i].endWarp();
				WarpArr[i].render();
			}
	// 워프 역동작 끝 		
	}else if(warpCnt == 420){
		for (var i = 0; i < num; i++) {
				WarpArr[i].reverseLineEnd();
				WarpArr[i].render();
			}
			
	//  워프 역동작 
	}else if(warpCnt > 400 && warpCnt < 420 ){
		for (var i = 0; i < num; i++) {
			WarpArr[i].reverseLine();
		}
		
		//  워프 시작 
	}else if(warpCnt > 300 && warpCnt < 400 ){
		for (var i = 0; i < num; i++) {
			WarpArr[i].update();	
			if(WarpArr[i].warpYN == 1){
				WarpArr[i].render();
			}else{
				if(warpCnt < 350 ){
					WarpArr[i].startWarp();
				}else{
					WarpArr[i].slowWarp();
				}
			}
		}
	//  일반동작 
	}else {
		for (var i = 0; i < num; i++) {
			WarpArr[i].init();	
			WarpArr[i].update();	
			WarpArr[i].render();
		}
	}
	
	if (warpCnt == 500){
		warpCnt = 0;
	}
		
	warpCnt++;
	
 }, 1000 / frameRate); 
}


// 각각의 별을 생성 
var warps = function(canvas, ctx, x, y, size, spd, acc) {
	
	this.canvas = canvas;
	this.ctx = ctx;
	
	this.x = canvas.width * Math.random();
	this.y = canvas.height * Math.random();
	this.size = 2 * Math.random();
	this.spd = 5 * Math.random() + 1;
	//  워프대상 
	this.warpYN =  Math.round(Math.random());
	this.warpCount =  0;
	this.alpha =  Math.random();
	this.acc = 0.2;
	
	
	// 각도 계산
	this.radian   = Math.getRadians ( this.x ,canvas.width /2,  this.y , canvas.height /2);
	
	// 화면을 벗어 나면 초기화 
	this.init = function(){
		if( this.x < 0 ||  this.x  > canvas.width ||
			this.y < 0 ||  this.y  > canvas.height){
			this.x = canvas.width /2;
			this.y = canvas.height /2;
			this.radian = 2 * Math.PI * Math.random();
			this.size = 0.2 * Math.random() +1 ;
			this.spd = 5 * Math.random() + 1;
			this.warpCount = 0;
		}
	}


	this.update = function() {
		// 근거리에서는 가속 
		var distance = Math.getDistance( this.x ,canvas.width /2,  this.y , canvas.height /2);
		//var acc = 0.2;

		//acc += ( ( 100 - distance ) /100 )  ;  -- 이렇게 하면 겁나 멌있는거 나옴 ㅋㅋ 
		// 근거리에서는 가속 
		if(this.acc < 0.2){
			this.acc += 0.01;
		}else if(distance < 50 ){
			this.acc = 0.2 +  ( ( 50 - distance ) /50 )* 1 ;
		}else{
			this.acc = 0.2;
		}
		
		this.x += Math.cos(  this.radian  )* this.spd * this.acc;
		this.y += Math.sin ( this.radian * -1 )*this.spd * this.acc;  // 브라우져는 반대로 계산 
	}

	this.render = function() {
		// 점 그리기 
		this.ctx.beginPath();
		this.ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		this.ctx.arc(this.x, this.y, this.size , 0, 2 * Math.PI, true);
		this.ctx.fill();
	}
	
	// 워프 시작시 선이 길어지는 표현 
	this.startWarp = function() {
		this.warpCount++;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo( this.x +  Math.cos(this.radian) * this.warpCount * 10,
						 this.y + Math.sin(this.radian*-1 ) * this.warpCount * 10);
		this.ctx.lineWidth = this.size * 2 ;
		this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		this.ctx.stroke();
	}
	
	// 종료시 선이 짧이 지는 표현 
	this.slowWarp = function() {
		
		this.ctx.beginPath();
		
		this.x = this.x +  Math.cos(this.radian) * 10;
		this.y = this.y +  Math.sin(this.radian * -1) * 10;
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo( this.x +  Math.cos(this.radian) * this.warpCount * 10,
						 this.y + Math.sin(this.radian*-1 ) * this.warpCount * 10);
						 						 
		this.ctx.lineWidth = this.size * 2 ;
		this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		this.ctx.stroke();
	}
	
	// 워프 종료
	this.endWarp = function() {
			// 사라진 별들을 위치 재 셋팅 : 약간 진행된 위치로 이동 
		if( this.x < 0 ||  this.x  > canvas.width ||
			this.y < 0 ||  this.y  > canvas.height){
			
			this.radian = 2 * Math.PI * Math.random();
			this.size = 0.2 * Math.random() +1 ;
			this.spd = 5 * Math.random() + 1;
			this.warpCount = 0;
			
			this.x = canvas.width /2;
			this.y = canvas.height /2;
			
			this.x += Math.cos(  this.radian  )* this.spd * 10;
			this.y += Math.sin ( this.radian * -1 )*this.spd * 10;  // 브라우져는 반대로 계산 
			
		}
	}
	// 워프 종료후 잠시 역전되는 현상 line	
	this.reverseLine = function() {
		this.warpCount++;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo( this.x +  Math.cos(this.radian) * this.warpCount * -1,
						 this.y + Math.sin(this.radian*-1 ) * this.warpCount * -1	);
		this.ctx.lineWidth = this.size * 2 ;
		this.ctx.strokeStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		this.ctx.stroke();
		
	}	
	
	// 방향 역전 
	this.reverseLineEnd = function() {
		this.acc = -0.3;

		this.x = this.x +  Math.cos(this.radian) * this.warpCount * -1;
		this.y =  this.y + Math.sin(this.radian*-1 ) * this.warpCount * -1;
				this.warpCount = 0;
	}
}
 

