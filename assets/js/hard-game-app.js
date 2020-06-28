let computerSequence = []; //The sequence generated by computer
let playerSequence = []; //The sequence entered by player
let indexOfFlashingArrow; //The flash of which direction is in play
let level;
let score;
let highScore;
let isCorrect; //is the sequence entered correct?
let isComputerTurn;
let intervalId; //Interval Id
let soundMadeOnFlash = true;
let hasWon; //if player reaches level 20
let displayHighScore;
let hasLost; //if player presses an incorrect arrow

const turnCounter = document.querySelector("#level");
const upArrow = document.querySelector("#upArrow");
const leftArrow = document.querySelector("#leftArrow");
const rightArrow = document.querySelector("#rightArrow");
const upleftArrow = document.querySelector("#upleftArrow");
const uprightArrow = document.querySelector("#uprightArrow");
const startButtonModal = document.querySelector("#startGame");
const currentScore = document.querySelector("#scoreCount");
const currentHighScore = document.querySelector("#highScore");

//Button press to start game

beginButton();

function beginButton() {
    startButtonModal.addEventListener("click", () => {
        play();
    });
}

//Game play at the start
function play() {
    hasWon = false;
    hasLost = [];
    computerSequence = [];
    playerSequence = [];
    indexOfFlashingArrow = 0;
    intervalId = 0;
    level = 1;
    score = 0;

    //Highscore saved on local storage
    if (score > highScore) {
        highScore = score;
        localStorage.setItem(displayHighScore, highScore);
    }

    turnCounter.innerHTML = 1;
    currentScore.innerHTML = 0;
    currentHighScore.innerHTML = highScore;
    isCorrect = true;
    for (var i = 0; i < 20; i++) {
        computerSequence.push(Math.floor(Math.random() * 5) + 1);
    }
    isComputerTurn = true;

    intervalId = setInterval(gameTurn, 500);
}
//Game turn sequence of event and outputs
function gameTurn() {
    on = false;

    if (indexOfFlashingArrow == level) {
        clearInterval(intervalId);
        isComputerTurn = false;
        clearColor();
        on = true;
    }

    if (isComputerTurn) {
        clearColor();
        setTimeout(() => {
            if (computerSequence[indexOfFlashingArrow] == 1) upArrowF();
            if (computerSequence[indexOfFlashingArrow] == 2) leftArrowF();
            if (computerSequence[indexOfFlashingArrow] == 3) rightArrowF();
            if (computerSequence[indexOfFlashingArrow] == 4) upleftArrowF();
            if (computerSequence[indexOfFlashingArrow] == 5) uprightArrowF();
            indexOfFlashingArrow++;
        }, 100);
    }
}
//Function for Up arrow
function upArrowF() {
    if (soundMadeOnFlash) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    soundMadeOnFlash = true;
    upArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for upleft arrow
function upleftArrowF() {
    if (soundMadeOnFlash) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    soundMadeOnFlash = true;
    upleftArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for upright arrow
function uprightArrowF() {
    if (soundMadeOnFlash) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    soundMadeOnFlash = true;
    uprightArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for left arrow
function leftArrowF() {
    if (soundMadeOnFlash) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    soundMadeOnFlash = true;
    leftArrow.style.backgroundColor = "darkSlateBlue";
}
//Function for right arrow
function rightArrowF() {
    if (soundMadeOnFlash) {
        let audio = document.getElementById("upAudio");
        audio.play();
    }
    soundMadeOnFlash = true;
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
        playerSequence.push(1);
        check();
        upArrowF();
        if (!hasWon) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

upleftArrow.addEventListener("click", () => {
    if (on) {
        playerSequence.push(4);
        check();
        upleftArrowF();
        if (!hasWon) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

uprightArrow.addEventListener("click", () => {
    if (on) {
        playerSequence.push(5);
        check();
        uprightArrowF();
        if (!hasWon) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

leftArrow.addEventListener("click", () => {
    if (on) {
        playerSequence.push(2);
        check();
        leftArrowF();
        if (!hasWon) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

rightArrow.addEventListener("click", () => {
    if (on) {
        playerSequence.push(3);
        check();
        rightArrowF();
        if (!hasWon) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
});

//To check if user is correct or not
function check() {
    if (playerSequence[playerSequence.length - 1] !== computerSequence[playerSequence.length - 1]) isCorrect = false;

    if (playerSequence.length == 5 && isCorrect) {
        winGame();
    }

    if (isCorrect == false) {
        flashColor();

        setTimeout(() => {
            turnCounter.innerHTML = level;
            clearColor();
        }, 1000);
        gameover();
        soundMadeOnFlash = false;
    }

    if (level == playerSequence.length && isCorrect && !hasWon) {
        level++;
        score = score + 10;
        playerSequence = [];
        isComputerTurn = true;
        indexOfFlashingArrow = 0;
        turnCounter.innerHTML = level;
        currentScore.innerHTML = score;
        intervalId = setInterval(gameTurn, 600);
    }

    //Saving highscore to local storage and get item
    if (score > highScore) {
        highScore = score;
        currentHighScore.innerHTML = highScore;
    }

    function highScoreShow() {
        modal.classList.toggle("show-modal");
    }
}

let scoreSave = localStorage.getItem(displayHighScore);
if (scoreSave == null) {
    highScore = 0;
} else {
    highScore = parseInt(scoreSave);
}

//hasWon game function
function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    swal({ title: "YOU WIN!", text: "YOU ARE NO LONGER REALLY LOST IN THE DARK", button: false, timer: 3000 });
    hasWon = true;
}

//Gameover function

function gameover() {
    turnCounter.innerHTML = "!";
    swal({ title: "GAME OVER!", text: "YOU ARE REALLY LOST IN THE DARK", button: false, timer: 3000 });
    hasLost = true;
}
