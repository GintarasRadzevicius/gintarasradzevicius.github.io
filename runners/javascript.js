"use strict";

let runnersMarginLeft = [10, 10, 10, 10, 10];
let bstartButtonWasPressed = false;
let finishLineCoord = document.getElementById('FinishLineSvg').getBoundingClientRect();
let finishLineLeftCorner = finishLineCoord.left - 30;
console.log('finishLineLeftCorner: ' + finishLineLeftCorner);
let keepMoving = true;
let winner;

function startButton() {
    // resetRunners();
    moveAllRunners();

}

function showWinner() {
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

async function moveAllRunners() {
    while (keepMoving) {
        moveRunner(1);
        moveRunner(2);
        moveRunner(3);
        moveRunner(4);
        moveRunner(5);
        await sleep(10);
    }
    showWinner();
    scale();
}

function scale() {
    document.getElementById("runner" + winner).style.transition = "all 3s";
    document.getElementById("runner" + winner).style.transform = "rotate(0)";
    document.getElementById("runnerContainer" + winner).style.margin = "0 auto";
    document.getElementById("runnerContainer" + winner).style.transform = "scale(5)";


}

function moveRunner(runnerNo) {
    let randomInt = getRandomInt(2);
    if (!randomInt) {return;}
    
    let runnerPos = runnersMarginLeft[runnerNo-1] = runnersMarginLeft[runnerNo - 1] + randomInt;
    let runnerId = 'runner' + runnerNo;
    let runnerContainerId = 'runnerContainer' + runnerNo;
    let runnersRightCorner = document.getElementById(runnerContainerId).offsetLeft + 80; //79 is runners width including borders 75+2+2

    document.getElementById(runnerContainerId).style.marginLeft = runnerPos + 'px';
    document.getElementById(runnerId).style.transform = 'rotate(' + runnerPos + 'deg)';

    checkFinishLine(runnersRightCorner, runnerNo);
}

function checkFinishLine(runnersRightCorner, runnerNo) {
    if (runnersRightCorner >= finishLineLeftCorner) {
        runnersRightCorner = finishLineLeftCorner ;
        keepMoving = false;
        bstartButtonWasPressed = true;
        winner = runnerNo;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetRunners() {
    keepMoving = true;
    runnersMarginLeft = [10, 10, 10, 10, 10];

    document.getElementById('runnerContainer1').style.marginLeft = '10 px';
    document.getElementById('runner1').style.transform = 'rotate(0 deg)';
    document.getElementById('runnerContainer2').style.marginLeft = '10 px';
    document.getElementById('runner2').style.transform = 'rotate(0 deg)';
    document.getElementById('runnerContainer3').style.marginLeft = '10 px';
    document.getElementById('runner3').style.transform = 'rotate(0 deg)';
    document.getElementById('runnerContainer4').style.marginLeft = '10 px';
    document.getElementById('runner4').style.transform = 'rotate(0 deg)';
    document.getElementById('runnerContainer5').style.marginLeft = '10 px';
    document.getElementById('runner5').style.transform = 'rotate(0 deg)';
}