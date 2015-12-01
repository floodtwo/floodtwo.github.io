
// 
var Space= function(canvas, num, frameRate) {
 var spaceArr = new Array();
 var stage = document.getElementById(canvas);
 var ctx = stage.getContext("2d");

 for (var i = 0; i < num; i++){
  spaceArr[i] = new spaces(stage, ctx);
 }
 var x = stage.width / 2 ;
 var y = stage.height / 2 ;
 var w = 1 * Math.random() + 1;
 var h = 15 * Math.random() + 5;
 var c = Math.random() * 2;
 var lineLength = Math.random() * 150;

 this.play = setInterval(function() {
  ctx.clearRect(0, 0, stage.width, stage.height);

  
  
var grd = ctx.createRadialGradient(500,250,100,500,250,3000);
grd.addColorStop(0,"black");
grd.addColorStop(1,"white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,1000,500);
  
  for (var i = 0; i < num; i++) {
   spaceArr[i].render();
  }
 

/*
   ctx.beginPath();
   ctx.fillStyle = "#f00";
   ctx.moveTo(x,y);
   ctx.lineTo(  x + Math.cos (  Math.PI * c  ) * lineLength , y + Math.sin (  Math.PI * c  ) * lineLength  );
   ctx.stroke();
   x = x + Math.cos (  Math.PI * c  ) * 3 ;
   y = y + Math.sin (  Math.PI * c  ) * 3;
*/
 }, 1000 / frameRate);
};
var spaces = function(canvas, ctx, startPointX, startPointY, lineWidth, lineLength, spd, acc, waitCount, where) {
 
 this.startPointX = startPointX;
 this.startPointY = startPointY;
 this.lineWidth = lineWidth;
 this.lineLength = lineLength;
 this.spd = spd;
 this.acc = acc;
 this.ctx = ctx;
 this.waitCount = waitCount;
 this.canvas = canvas;
 this.where = where;
 if (this.startPointX === undefined){
  this.startPointX = stage.width / 2 ;
 }
 if (this.startPointY === undefined){
  this.startPointY = stage.height / 2 ;
 }
 if (this.lineWidth === undefined){
  this.lineWidth =  Math.random() * 7 ;
 }
 if (this.lineLength === undefined){
  this.lineLength = Math.random() * 150;
 }
 if (this.spd === undefined){
  this.spd = 1 * Math.random();
 }
 if (this.acc === undefined){
  this.acc = Math.random()   + 1;
 }
 if(this.waitCount === undefined){
  this.waitCount  = 2000 * Math.random() ;
 }
 if(this.where === undefined){
  this.where  = Math.random() * 2;
 }
 
 this.render = function(){
  if( this.waitCount > 0 ){
   this.waitCount = this.waitCount -1;
  }else{
   this.ctx.beginPath();
   this.ctx.moveTo(this.startPointX, this.startPointY);
   this.ctx.lineTo(  this.startPointX + Math.cos (  Math.PI * this.where  ) * this.lineLength , this.startPointY + Math.sin (  Math.PI * this.where  ) * this.lineLength  );
   this.ctx.lineWidth = this.lineWidth;
   this.ctx.strokeStyle = '#fff';
   this.ctx.stroke();
   
   this.acc = this.acc + 0.05;
   
   this.startPointX = this.startPointX + Math.cos (  Math.PI * this.where  ) * 3  * (this.acc   );
   this.startPointY = this.startPointY + Math.sin (  Math.PI * this.where ) * 3 *  (this.acc   ) ;
  }
 }
};
 
 

 
  /* 원이 움직이는 함수 OK
   ctx.beginPath();
   ctx.fillStyle = "rgb(52, 152, 219)";
   ctx.arc(  stage.width / 2 + x , stage.height/2 + y , 20, 0, 2  * Math.PI);
   x = x + Math.cos (  Math.PI * c  ) * 3 ;
   y = y + Math.sin (  Math.PI * c  ) * 3;
   ctx.fill();
  */
   /* 선이 움직이는 함수 ok
  var x = stage.width / 2 ;
 var y = stage.height / 2 ;
 var w = 1 * Math.random() + 1;
 var h = 15 * Math.random() + 5;
 var c = Math.random() * 2;
 var lineLength = Math.random() * 150;
 
   ctx.beginPath();
   ctx.fillStyle = "#f00";
   ctx.moveTo(x,y);
   ctx.lineTo(  x + Math.cos (  Math.PI * c  ) * lineLength , y + Math.sin (  Math.PI * c  ) * lineLength  );
   ctx.stroke();
   x = x + Math.cos (  Math.PI * c  ) * 3 ;
   y = y + Math.sin (  Math.PI * c  ) * 3;
   */