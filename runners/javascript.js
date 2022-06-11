"use strict";

let runnersMarginLeft = [10, 10, 10, 10, 10];
let bstartButtonWasPressed = false;
let finishLineCoord = document.getElementById('FinishLineSvg').getBoundingClientRect();
let finishLineLeftCorner = finishLineCoord.left - 30;
console.log('finishLineLeftCorner: ' + finishLineLeftCorner);
let winner = 0;
let interval;
let runnersRightCorner = 0;

function startButton() {
    activateResetButton();
    interval = setInterval(moveAllRunners,5);
}

function activateResetButton() {
    document.getElementById('buttonStart').style.display = 'none';
    document.getElementById('buttonReset').style.display = 'block';
    document.getElementById('menuLine').style.backgroundColor = '#D62246';
}

function moveAllRunners() {
        for (let index = 1; index < 6; index++) {
            moveRunner(index);
            checkFinishLine(runnersRightCorner, index);
            if (winner) {
                clearInterval(interval);
                console.log('winner: ' + winner);
                showWinner();
            }
        }
}

function showWinner() {
    let pictureSrc;
    switch (winner) {
        case 1:
            pictureSrc= 'Images/rabbit.jpg';
            break;
        case 2:
            pictureSrc= 'Images/Dog1.jpg';
            break;
        case 3:
            pictureSrc= 'Images/cat.jpg';
            break;
        case 4:
            pictureSrc= 'Images/horse.jpg';
            break;
        case 5:
            pictureSrc= 'Images/dog2.jpg';
            break;
                                            
        default:
            break;
    }
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
    document.getElementById('winnerOverlay').style.display = 'block';
    document.getElementById('winner').src = pictureSrc;
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb');

    start();
    stop();

 


}

function scale() {
    document.getElementById("runner" + winner).style.margin = "0";
    document.getElementById("runnerContainer" + winner).style.margin = "0";
    document.getElementById("runner" + winner).style.position = 'absolute';
    document.getElementById("runner" + winner).style.top = '50%';
    document.getElementById("runner" + winner).style.left = '50%';
    document.getElementById("runner" + winner).style.transform = 'translate(-50%, -50%)';
}

function moveRunner(runnerNo) {
    let randomInt = getRandomInt(2);

    if (!randomInt) {return;}

    let runnerPos = runnersMarginLeft[runnerNo-1] = runnersMarginLeft[runnerNo - 1] + randomInt;
    let runnerId = 'runner' + runnerNo;
    let runnerContainerId = 'runnerContainer' + runnerNo;

    runnersRightCorner = document.getElementById(runnerContainerId).offsetLeft + 80; //79 is runners width including borders 75+2+2

    document.getElementById(runnerContainerId).style.marginLeft = runnerPos + 'px';
    document.getElementById(runnerId).style.transform = 'rotate(' + runnerPos + 'deg)';
}

function checkFinishLine(runnersRightCorner, runnerNo) {
    if (runnersRightCorner >= finishLineLeftCorner) {
        runnersRightCorner = finishLineLeftCorner ;
        // keepMoving = false;
        bstartButtonWasPressed = true;
        if (!winner) {  //without it maybe because of setinteval there are several winners
            winner = runnerNo;
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function resetButton() {
    winner = 0;
    
    document.getElementById('buttonReset').style.display = 'none';
    document.getElementById('buttonStart').style.display = 'block';
    document.getElementById('menuLine').style.backgroundColor = '#4CAF50';

    clearInterval(interval);

    for (let index = 1; index < 6; index++) {
        resetRunner(index);
    }
}

function resetRunner(runnerNo) {
    let runnerPos = runnersMarginLeft[runnerNo-1] = 10;
    let runnerId = 'runner' + runnerNo;
    let runnerContainerId = 'runnerContainer' + runnerNo;
    runnersRightCorner = document.getElementById(runnerContainerId).offsetLeft + 80; //79 is runners width including borders 75+2+2

    document.getElementById(runnerContainerId).style.marginLeft = runnerPos + 'px';
    document.getElementById(runnerId).style.transform = 'rotate(0)';
}



// *************************************************************************************************
// *************************************************************************************************
// *************************************************************************************************



 // for starting the confetti 

const start = () => {
    setTimeout(function() {
        confetti.start()
    }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti 

const stop = () => {
    setTimeout(function() {
        confetti.stop()
    }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
// after this here we are calling both the function so it works


// if you dont want to make it stop and make it infinite you can just remove the stop function 😊
