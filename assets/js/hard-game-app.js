let orderGeneratedSequence = []; //order of sequence generated by computer
let playerOrder = []; //order entered by player
let arrowflash; //the flash of which direction is in play
let level; //level
let score; //score
let scoreHigh; //highscore
let correct; //if sequence is correct
let compTurn; //the computers turn
let intervalId; //time in between turns
let noise = true; //sounds made when flashing and being pressed
let win; //if player reaches level 20
let displayHighScore; //display highscore
let lose; //if player presses an incorrect arrow
let savename; // to save the players name to highscore board 
let savescore; // to save the players highscore 

const turnCounter = document.querySelector("#level");
const upArrow = document.querySelector("#upArrow"); 
const leftArrow = document.querySelector("#leftArrow"); 
const rightArrow = document.querySelector("#rightArrow"); 
const upleftArrow = document.querySelector("#upleftArrow"); 
const uprightArrow = document.querySelector("#uprightArrow"); 
const startButtonModal = document.querySelector("#startGame");
const currentScore = document.querySelector("#scoreCount");
const currentHighScore = document.querySelector("#highScore");

// button press to start game

beginButton();

function beginButton() {
    startButtonModal.addEventListener("click", () => {
        play();
    });
}

//Game play at its start
function play() {
    win = false;
    lose = [];
    orderGeneratedSequence = [];
    playerOrder = [];
    arrowflash = 0;
    intervalId = 0;
    level = 1;
    score = 0;

    //Highscore saved on local storage
    if (score > scoreHigh) {
        scoreHigh = score;
        localStorage.setItem(displayHighScore, scoreHigh);
    }

    turnCounter.innerHTML = 1;
    currentScore.innerHTML = 0;
    currentHighScore.innerHTML = scoreHigh;
    correct = true;
    for (var i = 0; i < 20; i++) {
        orderGeneratedSequence.push(Math.floor(Math.random() * 5) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 500);
}
//Game turn sequence of event and outputs
function gameTurn() {
    on = false;

    if (arrowflash == level) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (orderGeneratedSequence[arrowflash] == 1) upArrowF();
            if (orderGeneratedSequence[arrowflash] == 2) leftArrowF();
            if (orderGeneratedSequence[arrowflash] == 3) rightArrowF();
            if (orderGeneratedSequence[arrowflash] == 4) upleftArrowF();
            if (orderGeneratedSequence[arrowflash] == 5) uprightArrowF();
            arrowflash++;
        }, 100);
    }
}
//Function for up arrow
function upArrowF() {
    if (noise) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    noise = true;
    upArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for upleft arrow
function upleftArrowF() {
    if (noise) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    noise = true;
    upleftArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for upright arrow
function uprightArrowF() {
    if (noise) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    noise = true;
    uprightArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for left arrow
function leftArrowF() {
    if (noise) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    noise = true;
    leftArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for right arrow
function rightArrowF() {
    if (noise) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    noise = true;
    rightArrow.style.backgroundColor = "darkSlateBlue";
}
//To reset after flashcolor
function clearColor() {
    upArrow.style.backgroundColor = "transparent";
    upleftArrow.style.backgroundColor = "transparent";
    uprightArrow.style.backgroundColor = "transparent";
    leftArrow.style.backgroundColor = "transparent";
    rightArrow.style.backgroundColor = "transparent";
}
//To show user that arrow is active
function flashColor() {
    upArrow.style.backgroundColor = "darkSlateBlue";
    upleftArrow.style.backgroundColor = "darkSlateBlue";
    uprightArrow.style.backgroundColor = "darkSlateBlue";
    leftArrow.style.backgroundColor = "darkSlateBlue";
    rightArrow.style.backgroundColor = "darkSlateBlue";
}

//to listen for user input
upArrow.addEventListener("click", () => {
    if (on) {
        playerOrder.push(1);
        check();
        upArrowF();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

upleftArrow.addEventListener("click", () => {
    if (on) {
        playerOrder.push(4);
        check();
        upleftArrowF();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

uprightArrow.addEventListener("click", () => {
    if (on) {
        playerOrder.push(5);
        check();
        uprightArrowF();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

leftArrow.addEventListener("click", () => {
    if (on) {
        playerOrder.push(2);
        check();
        leftArrowF();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

rightArrow.addEventListener("click", () => {
    if (on) {
        playerOrder.push(3);
        check();
        rightArrowF();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

//To check if user is correct or not
function check() {
    if (playerOrder[playerOrder.length - 1] !== orderGeneratedSequence[playerOrder.length - 1]) correct = false;

    if (playerOrder.length == 5 && correct) {
        winGame();
    }

    if (correct == false) {
        flashColor();

        setTimeout(() => {
            turnCounter.innerHTML = level;
            clearColor();
        }, 1000);
        gameover();
        noise = false;
    }

    if (level == playerOrder.length && correct && !win) {
        level++;
        score = score + 10;
        playerOrder = [];
        compTurn = true;
        arrowflash = 0;
        turnCounter.innerHTML = level;
        currentScore.innerHTML = score;
        intervalId = setInterval(gameTurn, 600);
    }

    //Saving highscore to local storage and get item
    if (score > scoreHigh) {
        scoreHigh = score;
        currentHighScore.innerHTML = scoreHigh;
    }

    function highScoreShow() {
        modal.classList.toggle("show-modal");
    }
}

let scoreSave = localStorage.getItem(displayHighScore);
if (scoreSave == null) {
    scoreHigh = 0;
} else {
    scoreHigh = parseInt(scoreSave);
}

//Saving high score to highscore leader board

let saveHighScore = "#saveHighScore";
localStorage.getElementById = "displayHighScore";
localStorage.getElementById = "name";
localStorage.setItem("name", savename);
localStorage.setItem("saveHighScore", savescore);

//Win game function
function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    swal({ title: "YOU WIN!", text: "YOU ARE NO LONGER REALLY LOST IN THE DARK", button: false, timer: 3000 });
    win = true;
}

//Gameover function

function gameover() {
    turnCounter.innerHTML = "!";
    swal({ title: "GAME OVER!", text: "YOU ARE REALLY LOST IN THE DARK", button: false, timer: 3000 });
    lose = true;
}