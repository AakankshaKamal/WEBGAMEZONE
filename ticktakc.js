function init(player,OPPONENT)
{
	const canvas=document.getElementById("cvs");
	const ctx=canvas.getContext("2d");
	let board=[];
	const COLUMN =3;
	const ROW=3;
	const SPACE_SIZE=150;
	let gamedata=new Array(9);
	let currentplayer=player.man;
	const ximage=new Image();
	ximage.src="images/cross.png";
	const oimage=new Image();
	oimage.src="images/tick.png";
//all the possible combination
const dead=new Audio();
	const dead2=new Audio();

dead2.src="audio/MENU.wav";
dead.src="audio/ton.wav";
dead.pause();
dead2.pause();
	const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let GAMEOVER=false;

function drawBoard(){
        // WE give every space a unique id
        // So we know exactly where to put the player's move on the gameData Array
        let id = 0;
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                id++;

                // draw the spaces
                ctx.strokeStyle = "#F50";
                ctx.strokeRect(i * SPACE_SIZE, j * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
            }
        }
    }
    drawBoard();

    canvas.addEventListener("click",function(event){
    	if(GAMEOVER) return;

    	let X=event.clientX-canvas.getBoundingClientRect().x;
    	let Y=event.clientY-canvas.getBoundingClientRect().y;
    	let i=Math.floor(X/SPACE_SIZE);
    	let j=Math.floor(Y/SPACE_SIZE);
    	let id=board[j][i];
    	ctx.strokeStyle = "#000";
    	ctx.lineWidth=5;
    	ctx.fillStyle = "#FF0000";
    	//ctx.fillRect(i* SPACE_SIZE, j * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE)
    	document.getElementById("demo").innerHTML ="X ="+i+", Y ="+j+"ID : "+id;
                ctx.strokeRect(i * SPACE_SIZE, j * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);


                if(gamedata[id]) {
                	document.getElementById("status").innerHTML ="ALREADY SELECTED";

                	return;

                }

  gamedata[id]=currentplayer;
  drawonboard(currentplayer,i,j);
  if(isWinner(gamedata,currentplayer))
  {showGameOVer(currentplayer);
  	GAMEOVER=true;

  	return;

  }
  if(isTie(gamedata))
  {
  	showGameOVer("tie");
  	GAMEOVER=true;
  	return;
  }


if(OPPONENT=="computer")
{console.log('HI 2');
	//ai use
let id=minimax(gamedata,player.computer).id;
gamedata[id]=player.computer;
let space=getIJ(id);
drawonboard(player.computer,space.i,space.j);
if(isWinner(gamedata,player.computer))
{
	showGameOVer(player.computer);
	GAMEOVER=true;
	return;
}
if(isTie(gamedata))
{
	showGameOVer("tie");
	GAMEOVER=true;
	return;
}

}
else
{
	currentplayer=(currentplayer==player.man)?player.friend:player.man;
}
document.getElementById("status").innerHTML="CHANCE"+currentplayer;


    });


function drawonboard(player, i, j){
        //let img = player == "X" ? ximage : oimage;

        // the x,y positon of the image are the x,y of the clicked space
       // ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
 console.log("draw part"+"i :"+i+"j;"+j);

 if (player=="X")
   {dead.play();
   	ctx.fillStyle = "#FF0000";

   }
else if(OPPONENT=="computer")
{
ctx.fillStyle = "#2E28D6FF";
}
else
{
ctx.fillStyle = "#50EF0F";

}
ctx.fillRect(i* SPACE_SIZE+10, j * SPACE_SIZE+10, SPACE_SIZE-20, SPACE_SIZE-20);



    }
    function minimax(gameData,PLAYER)
    {
      if(isWinner(gameData,player.computer))
      	return {evaluation :+10};
      if(isWinner(gameData,player.man))
      	return {evaluation:-10};
      if(isTie(gameData))
      	return {evaluation:0};


      let EMPTYSpaces=getEmptySpaces(gameData);
      let moves=[];
      for(let i=0;i<EMPTYSpaces.length;i++)
      {
      	let id=EMPTYSpaces[i];
      	let backup=gameData[id];
      	gameData[id]=PLAYER;
      	let move={};
      	move.id=id;
      	if(PLAYER==player.computer)
      	{
      		move.evaluation=minimax(gameData,player.man).evaluation;

      	}
      	else
      		{move.evaluation=minimax(gameData,player.computer).evaluation;
}

      
      gameData[id]=backup;
      moves.push(move);
  }
  let bestmove;
  if(PLAYER==player.computer)
  {
  	let be=-Infinity;
  	for(let i=0;i<moves.length;i++)
  	{
  		if( moves[i].evaluation >be ){
                    be = moves[i].evaluation;
                    bestMove = moves[i];
                }
  	}
  }else{
            // MINIMIZER
            let bestEvaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;



    }
function isTie(gameData)
{
	let isBoardfill=true;
	for(let i=0;i<gameData.length;i++)
	{
		isBoardfill=gameData[i]&&isBoardfill;
	}
	if(isBoardfill)
		return true;
	return false;
}
function getEmptySpaces(gameData)
{
	let Empty=[];
	for(let id=0;id<gamedata.length;id++)
	{
		if(!gamedata[id]) Empty.push(id);
	}
	return Empty;
}
function getIJ(id)
{
	for(let i=0;i<board.length; i++)
	{
		for(let j=0;j<board[i].length;j++)
		{
			if(board[i][j]==id) return {i:j,j:i};
		}
	}
}

 function isWinner(gameData, player){
        for(let i = 0; i < COMBOS.length; i++){
            let won = true;

            for(let j = 0; j < COMBOS[i].length; j++){
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }

            if(won){
            

                return true;
            }
        }
        return false;
    }

    function showGameOVer(PLAYER)
    {
    	dead2.play();
    	document.getElementById("status").innerHTML ="";
    	let message="";
    	if(PLAYER=="tie")
    		{
    			gameOverElement.innerHTML='<h1>TIE</h1>';
    			gameOverElement.classList.remove("hide");


    		}
else{
if(PLAYER==player.man&&OPPONENT=="computer")
{
	message+="YOU WIN ";}
	else if(OPPONENT=="computer")
{		message+="YOU LOST";
}
else if(PLAYER==player.man)
{ message+="PLAYER 1 WINS";}
else
message+="PLAYER 2  WINS ";


    	gameOverElement.innerHTML='<h1>'+message+'</h1>';

    
    	
    	gameOverElement.classList.remove("hide");


    }}
}
function reloadf()
{
	document.location.reload();
	

}


