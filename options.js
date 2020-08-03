

const options = document.querySelector(".options");



// SELECT BUTTONS
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const playBtn = document.querySelector(".play");

// GAME OVER ELEMENT
const gameOverElement = document.querySelector(".gameover");

const player = new Object;
let OPPONENT;

//     const dead2=new Audio();

// dead2.src="audio/MENU.wav";
// dead2.play();
oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.friend = "X";

    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.friend = "O";

    switchActive(oBtn, xBtn);
});
 
computerBtn.addEventListener("click", function(){
    OPPONENT = "computer";
    document.getElementById("demo").innerHTML ="hola you are playing with ..............  "+OPPONENT;
     switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function(){
    OPPONENT = "friend";
    document.getElementById("demo").innerHTML ="hola you are playing with ..............  "+OPPONENT;
    switchActive(computerBtn, friendBtn);
});

playBtn.addEventListener("click", function(){
    if( !OPPONENT){
        computerBtn.style.backgroundColor = "red";
        friendBtn.style.backgroundColor = "red";
        return;
    }

    if( !player.man ){
        oBtn.style.backgroundColor = "red";
        xBtn.style.backgroundColor = "red";
        return;
    }
    
    init(player, OPPONENT);
    options.classList.add("hide");
});

function switchActive(off,on){
	document.getElementById("demo").innerHTML ="..............  "+OPPONENT;
    off.classList.remove("active");
    on.classList.add("active");
}

