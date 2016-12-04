window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var w = window.innerWidth, h = window.outerHeight;
canvas.width = w;
canvas.height = h;

var circles = 60;
var circle_array = [];

function init(){
  ctx.fillStyle = "#100d04";
  ctx.rect(this.x,this.y,w,h);
  ctx.fill();
  for(var i=0;i<circles;i++){
    var c = new circle();
    circle_array.push(c);
  }
  var d = new Date();
  var day = d.getDate();
  var days_to_go = 25 - day;
  if(d.getMonth() != 11){
    days_to_go = -1;
  }
  if(days_to_go == 0){
    // IT'S CHRISTMAS
    document.getElementById("no").innerHTML = "X";
    document.getElementById("days").innerHTML = "CHRISTMAS";
    document.getElementById("days").style.left = "-webkit-calc(50% - 240px)";
    document.getElementById("text").innerHTML = "IS HERE";
    document.getElementById("text").style.left = "-webkit-calc(50% - 40px)";
  }
  else if(days_to_go < 0){
    // IT'S CHRISTMAS
    document.getElementById("no").innerHTML = "X";
    document.getElementById("days").innerHTML = "CHRISTMAS";
    document.getElementById("days").style.left = "-webkit-calc(50% - 240px)";
    document.getElementById("text").innerHTML = "HAS PAST, COME BACK NEXT YEAR";
    document.getElementById("text").style.left = "-webkit-calc(50% - 240px)";
  }
  else{
    document.getElementById("no").innerHTML = ""+days_to_go+"";
  }
}

function circle(){
  this.x = Math.random()*w;
  this.y = Math.random()*h;
  this.r = 0;
  this.r_max = Math.floor(Math.random() * 55)+15;
  this.opacity = Math.floor(Math.random() * 1)+0.2;
  this.draw = function(){
    ctx.fillStyle = "hsla(48,97%,59%,"+this.opacity+")";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r, 0, Math.PI*2, false);
    ctx.fill();
  }
}

function drawscene(){
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.rect(0,0,w,h);
  ctx.fill();
  for(var i=0;i<circle_array.length;i++){
    if(circle_array[i].r>=circle_array[i].r_max){
      if(circle_array[i].opacity<0.01){
        circle_array[i] = new circle();
      }
      else{
        circle_array[i].opacity -= 0.01;
      }
    }
    else{
      circle_array[i].r += Math.random()*0.3;
    }
    circle_array[i].draw();
  }
}

function animloop() {
  drawscene();
  requestAnimFrame(animloop); 
}
init();
animloop();