// $(document).keypress(function(event){
//   console.log(event.key);
// });
var cvs=document.querySelector("#mainbox");
var ctx=cvs.getContext("2d");
var snakeW=30;
var snakeH=30;
var l=4;
var snake=[];
var x1=null,y1=null;
var interval=null;
var lastKey=null;
var score=0;
var speed=170;
for(var i=0;i<l;i++)
snake.push({x:i,y:0});


function snakeGenerate(){
  for(var i=0;i<snake.length;i++){
    ctx.fillStyle="black";
    ctx.fillRect((snake[i].x)*snakeW,(snake[i].y)*snakeH,snakeW,snakeH);
    ctx.strokeStyle="lightslategray";
    ctx.strokeRect((snake[i].x)*snakeW,(snake[i].y)*snakeH,snakeW,snakeH);
  }
}
// var r=0;
function snakeMoveR(){

  var a=snake[snake.length-1].x;
  var b=snake[snake.length-1].y;

  ctx.clearRect(snake[0].x*snakeW,snake[0].y*snakeH,snakeW,snakeH);
  check2(a+1,b);
  snake.push({x:(a+1),y:b});
  snake.shift();

    ctx.fillStyle="black";
    ctx.fillRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    ctx.strokeStyle="lightslategray";
    ctx.strokeRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    check();

}

function snakeMoveD(){

  var a=snake[snake.length-1].x;
  var b=snake[snake.length-1].y;

  ctx.clearRect(snake[0].x*snakeW,snake[0].y*snakeH,snakeW,snakeH);
check2(a,b+1);
  snake.push({x:a,y:b+1});
  snake.shift();

    ctx.fillStyle="black";
    ctx.fillRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    ctx.strokeStyle="lightslategray";
    ctx.strokeRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    check();

}

function snakeMoveU(){

  var a=snake[snake.length-1].x;
  var b=snake[snake.length-1].y;

  ctx.clearRect(snake[0].x*snakeW,snake[0].y*snakeH,snakeW,snakeH);
    check2(a,b-1);
  snake.push({x:a,y:b-1});
  snake.shift();

    ctx.fillStyle="black";
    ctx.fillRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    ctx.strokeStyle="lightslategray";
    ctx.strokeRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    check();

}

function snakeMoveL(){

  var a=snake[snake.length-1].x;
  var b=snake[snake.length-1].y;

  ctx.clearRect(snake[0].x*snakeW,snake[0].y*snakeH,snakeW,snakeH);
  check2(a-1,b);
  snake.push({x:a-1,y:b});
  snake.shift();

    ctx.fillStyle="black";
    ctx.fillRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    ctx.strokeStyle="lightslategray";
    ctx.strokeRect((snake[snake.length-1].x)*snakeW,(snake[snake.length-1].y)*snakeH,snakeW,snakeH);
    check();

}


function foodGenerate(){
  ctx.fillStyle="green";
  x1=Math.floor(Math.random()*39);
  y1=Math.floor(Math.random()*19);
  ctx.fillRect(x1*snakeW,y1*snakeH,snakeW,snakeH);
}

function playMovementSound(){
  var audio= new Audio("sounds/green.mp3");
  audio.play();
}
foodGenerate();
snakeGenerate();

$(document).on("keypress",function(event){
  console.log(event.key);
  playMovementSound();
   move(event.key);
});


function move(k){

  switch (k) {
    case "a":
     if(lastKey!=="d"){
      clearInterval(interval);
      interval=setInterval(snakeMoveL,speed);

      lastKey=k;
    }
      break;
    case "w":
     if(lastKey!=="s"){
       clearInterval(interval);
       interval= setInterval(snakeMoveU,speed);
       lastKey=k;
    }
     break;
  case "d":
  if(lastKey!=="a"){
       clearInterval(interval);
       interval=setInterval(snakeMoveR,speed);
       lastKey=k;
     }
    break;
  case "s":
  if(lastKey!=="w"){
        clearInterval(interval);
       interval= setInterval(snakeMoveD,speed);
       lastKey=k;
     }
   break;
  }
}

function check(){
  if(x1===snake[snake.length-1].x&&y1===snake[snake.length-1].y){
      var audio= new Audio("sounds/yellow.mp3");
      audio.play();
  snake.push({x:x1,y:y1});
  score++;

  $("h1").text("score "+score)
  snakeGenerate();
  foodGenerate();
  }
if(snake[snake.length-1].x===40||snake[snake.length-1].x<0||snake[snake.length-1].y<0||snake[snake.length-1].y===20){
  var audio= new Audio("sounds/wrong.mp3");
  $("body").css("background-color","red");
  $("h2").addClass("score");
  $("h2").text("score "+score);
  $("h1").addClass("gover");
  $("h1").text("GAME-OVER BANTAI");
  setTimeout(function () {
    $("h1").text("Refresh to play again");
  }, 1500);
  audio.play();
    clearInterval(interval);
}
}

function check2(p,q){
  var s=0;
 for(var i=0;i<snake.length;i++){
   if(snake[i].x===p&&snake[i].y===q)
    s=1;
 }
  if(s){
    var audio= new Audio("sounds/wrong.mp3");
    $("body").css("background-color","red");
    $("h2").addClass("score");
    $("h2").text("score "+score);
    $("h1").addClass("gover");
    $("h1").text("GAME-OVER BANTAI");
    setTimeout(function () {
      $("h1").text("Refresh to play again");
    }, 2000);
    audio.play();
      clearInterval(interval);
  }
  }
