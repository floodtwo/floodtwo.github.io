// 비 내리는 애니메이션 환경 설정 함수 - canvas 와, 비의 양, 초당 프레임 수를 매개변수로 받음
var Rain = function(canvas, num, frameRate) {
	var rainArr = new Array();
	var stage = document.getElementById(canvas);
	var ctx = stage.getContext("2d");

	for (var i = 0; i < num; i++)
		rainArr[i] = new rains(stage, ctx);
	
	
	this.play = setInterval(function() {
		ctx.clearRect(0, 0, stage.width, stage.height);
		for (var i = 0; i < num; i++) {
			rainArr[i].render();
			rainArr[i].update();
		}
	}, 1000 / frameRate);
};

// 비 객체 속성 설정 함수 - canvas 및 위치, 속도, 가속도 값등을 매개변수로 받음
var rains = function(canvas, ctx, x, y, w, h, spd, acc) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.spd = spd;
	this.acc = acc;
	this.ctx = ctx;
	this.crash = false;
	this.canvas = canvas;

	this.r = new Array();
	this.a = new Array();
	this.xx = new Array();
	this.yy = new Array();
	this.alpha = new Array();

	if (this.x === undefined)
		this.x = this.canvas.width * Math.random();
	if (this.y === undefined)
		this.y = -(this.canvas.height * Math.random());
	if (this.w === undefined)
		this.w = 1 * Math.random() + 1;
	if (this.h === undefined)
		this.h = 15 * Math.random() + 5;
	if (this.spd === undefined)
		this.spd = 1 * Math.random();
	if (this.acc === undefined)
		this.acc = 1 * Math.random() / 10;

	// 비가 내리는 애니메이션 속성 할당 함수
	this.update = function() {
		if (!this.crash) {
			this.y += this.spd;
			this.spd += this.acc + 0.03;

			if (this.y + (this.spd + this.acc + 0.03) >= this.canvas.height - 20) {
				this.y = this.canvas.height;
				this.crash = true;
				for (var i = 0; i < 10; i++) {	
					this.r[i] = 2 * Math.random();
					this.a[i] = -180 * Math.random();
					this.xx[i] = this.x;
					this.yy[i] = this.y - 20;
					this.alpha[i] = 1;
				}
			}
		}
	}

	// 비가 내리는 애니메이션 그리는 함수
	this.render = function() {
		if (!this.crash) {
			this.ctx.beginPath();
			this.ctx.fillStyle = "#3498db";
			this.ctx.fillRect(this.x, this.y, this.w, this.h);
			this.ctx.fill();
		}
		else {
			for (var i = 0; i < (this.w * this.h) / 2; i++) {
				var rand = 3 * Math.random() + 1;
				this.xx[i] += Math.cos(this.a[i] * Math.PI / 180) * rand;
				this.yy[i] += Math.sin(this.a[i] * Math.PI / 180) * rand;

				this.ctx.beginPath();
				this.ctx.fillStyle = "rgba(52, 152, 219, " + this.alpha[i] + ")";
				this.ctx.arc(this.xx[i], this.yy[i], this.r[i], 0, 2 * Math.PI, true);
				this.ctx.fill();
				
				this.yy[i] += this.spd / 100;
				this.alpha[i] -= 0.06;

				if (this.alpha[i] <= 0)
					this.clear();
			}
		}
	}

	// 비 객체의 순환을 위한 재설정
	this.clear = function() {
		this.x = this.canvas.width * Math.random();
		this.y = -(this.canvas.height * Math.random());
		this.spd = 0;
		this.acc = 0.3 * Math.random();
		this.crash = false;
	}

};