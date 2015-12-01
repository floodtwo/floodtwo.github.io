var _pieceHeight ;
// 조각 갯수 
var _pieceCount = 533;

var _img;
var _canvas;
var _stage;
var _pieces ={};


// 초기화 함수 - 이미지 로드
function init(){

 _img = new Image();
 _img.addEventListener('load',onImage,false);
 _img.src = "img/mke.jpg";

}


// 이미지 로드되면 퍼즐 이미지로 설정하는 함수 - 이미지 자르고 캔버스 셋팅 및 퍼즐 초기화
function onImage(e){


 _pieceHeight = Math.floor(_img.height / _pieceCount);
 setCanvas();
}

// 캔버스 설정 
function setCanvas(){
 _canvas = document.getElementById('canvas');
 _stage = _canvas.getContext('2d');
 _canvas.width = _img.width;
 _canvas.height = _img.height;
 _canvas.style.border = "1px solid black";
 initPuzzle();
}

// 이미지 분리 및 배열작성 후 draw
function initPuzzle(){
 _pieces = [];

 for(var x = 0 ; x < _pieceCount ; x++ ){
   var piece = {} ;
    piece.y = _pieceHeight * x;
    piece.speed = Math.random()*5 + 10;
    piece.x = 500;
    piece.moveCount = 0;

    _pieces.push(piece );
     
   _stage.drawImage(_img, 0, _pieceHeight * x, _canvas.width ,  _pieceHeight  , 500, _pieceHeight * x, _canvas.width / 3 , _pieceHeight   );
 }

 setTimeout(moveImage,2000);
}

// 이미지가 이동 
function moveImage(){

 
 this.play = setInterval(function() {
  _stage.clearRect(0, 0, _canvas.width, _canvas.height);
 
  
  for(var x = 0 ; x < _pieceCount ; x++ ){
   var piece = _pieces[x];
   piece.x =  piece.x - piece.speed;

   if(piece.moveCount != 5){
    if(piece.x < 0){
     piece.x  = 0;
     piece.moveCount++;
     piece.speed = piece.speed * -1;
    }else if (piece.x >500 ){
    
     piece.moveCount++;
     piece.x  = 500;
     piece.speed = piece.speed * -1;
    }
   }else{
    if (piece.x >250 ){
     piece.x  = 250;
     piece.speed = 0;
    }
   }

   _stage.drawImage(_img, 0,  piece.y , _canvas.width ,  _pieceHeight  , piece.x, _pieceHeight * x, _canvas.width / 3 , _pieceHeight   );
  }
 }, 1000 / 60);

}
