"use strict";

let runnersMarginLeft = [10, 10, 10, 10, 10];
let bstartButtonWasPressed = false;
let finishLineCoord = document.getElementById('FinishLineSvg').getBoundingClientRect();
let finishLineLeftCorner = finishLineCoord.left - 30;
console.log('finishLineLeftCorner: ' + finishLineLeftCorner);
// let keepMoving = true;
let winner = 0;
let interval;
let runnersRightCorner = 0;

function startButton() {
    // resetRunners();
    activateResetButton();
    interval = setInterval(moveAllRunners,5);

    // showWinner();

}

function activateResetButton() {
    document.getElementById('buttonStart').style.display = 'none';
    document.getElementById('buttonReset').style.display = 'block';
}

function moveAllRunners() {
    // while (keepMoving) {
        for (let index = 1; index < 6; index++) {
            moveRunner(index);
            checkFinishLine(runnersRightCorner, index);
            if (winner) {
                clearInterval(interval);
                console.log('winner: ' + winner);
            }
        }

        // await sleep(2);
    // }
    // scale();
}

function showWinner() {
    console.log('winner: ' + winner);

    switch (winner) {
        case 1:
            console.log('Winner is: rabbit')
            break;
        case 2:
            console.log('Winner is: dog1')
        
            break;
        case 3:
            console.log('Winner is: cat')
    
            break;
        case 4:
            console.log('Winner is: horse')
    
            break;
        case 5:
            console.log('Winner is: dog2')
    
            break;
                                            
        default:
            break;
    }
    
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetButton() {
    document.getElementById('buttonReset').style.display = 'none';
    document.getElementById('buttonStart').style.display = 'block';

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
