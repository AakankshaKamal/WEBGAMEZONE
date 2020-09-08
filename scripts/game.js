const cvs=document.getElementById("canvas");
const ctx=cvs.getContext("2d");
const foodimg=new Image();
foodimg.src="images/cupa.png";
const ground=new Image();
ground.src="images/backg.jpg";
function change(){

let towidth=document.getElementById("widthc").value;
let tohright=document.getElementById("heightc").value;
cvs.width = towidth;
cvs.height = tohright;

}
//snake
const { width, height } = cvs.getBoundingClientRect();

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(0, width);
ctx.stroke();
const box=40 ;
let snake=[];
snake[0]={
	x:9*box,
	y:10*box

}
function reloadf()
{
	document.location.reload();
	  document.getElementById("start").disabled = false;

}
let colors=["#2BEF0FFF","#F50920FF","#FFFF66FF","#36ED11FF","#FF6A00FF","#0C0AF4FF","#0BF396FF"];
const dead=new Audio();
dead.src="audio/you lose.wav";

let dx=1;
let dy=2;

let food={
	x:Math.floor(Math.random()*10+1)*box,
	y:Math.floor(Math.random()*10+3)*box
}
let score=0;

let d="";

document.addEventListener("keydown",direction);
function direction(event)
{
	let key=event.keyCode;
	if(key==37 && d!="RIGHT")
		d="LEFT";
	if(key==38 && d!="DOWN")
		d="UP";
	if(key==39 && d!="LEFT")
		d="RIGHT";
	if(key==40 && d!="UP")
		d="DOWN";

}
let game;
function collision(head,array)
{
	for(let i=0;i<array.length;i++)
	{
		if(head.x==array[i].x && head.y ==array[i].y)
		{
			return true;
		}
	}
	return false;
}

function draw() {
	
 	ctx.drawImage(ground,0,0,width,height);
for(let i=0;i<snake.length;i++)
{
	ctx.fillStyle=(i==0)?"pink":colors[Math.floor(Math.random()*(colors.length)+1)];
	ctx.fillRect(snake[i].x,snake[i].y,box,box);
ctx.strokeStyle="red";
ctx.strokeRect(snake[i].x,snake[i].y,box,box);


}
ctx.drawImage(foodimg,food.x,food.y,box,box);

let snakeX=snake[0].x;
let snakeY=snake[0].y;
if(d=="LEFT") snakeX-=box;
if(d=="UP") snakeY-=box;
if(d=="RIGHT") snakeX+=box;
if(d=="DOWN") snakeY+=box;
if(snakeX==food.x && snakeY==food.y)
{advanceSnake();
	score++;
	 food={
	x:Math.floor(Math.random()*10+1)*box,
	y:Math.floor(Math.random()*10+3)*box}


}
else
{
	snake.pop();
}
let newHead={
	x:snakeX,
	y:snakeY
}


if(snakeX<0||snakeX>width-14||snakeY<2*box||snakeY>height-10 ||collision(newHead,snake))
{
	clearInterval(game);
	dead.play();
}



snake.unshift(newHead);

ctx.fillStyle="red";
ctx.font="42px Sans Serif";


 ctx.fillText("Score : "+score,2*box,1.3*box);

 }
 function Start() {


  game=setInterval(draw,100);
  document.getElementById("start").disabled = true;

}
 function advanceSnake() {
const head= {x: snake[0].x+ dx, y: snake[0].y+ dy};
snake.unshift(head);
snake.pop();
      }
 
 


