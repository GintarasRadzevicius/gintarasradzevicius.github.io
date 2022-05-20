"use strict";

const speed = 10; //ms
const movingDistance = 10;
let currentTime;
let lastRenderTime = Date.now() - 1;
let element1Distance = 0;
let element2Distance = 0;
let element3Distance = 0;
let secondsSinceLastRender;

function main(){
    if (bElementsCanMove()) {
        moveAllElements();

    }
    
    // window.requestAnimationFrame(main);
}

// window.requestAnimationFrame(main);

function moveAllElements() {
    element1Distance = element1Distance + Math.floor(Math.random() * 10) + 1;
    moveElement('runner1', element1Distance);
    element2Distance = element2Distance + Math.floor(Math.random() * 10) + 1;
    moveElement('runner2', element2Distance);
    element3Distance = element3Distance + Math.floor(Math.random() * 10) + 1;
    moveElement('runner3', element3Distance);
}

function bElementsCanMove() {
    currentTime = Date.now();

    secondsSinceLastRender = (currentTime - lastRenderTime);

    if (secondsSinceLastRender < speed) {return false;}

    lastRenderTime = currentTime;
    return true;
}

function moveElement(element, distance) {
    // distance = distance + movingDistance;

    document.getElementById(element).style.bottom = distance + "px";
    
}
// let runner1Pos = 11;
// let runner2Pos = 11;
// let runner3Pos = 11;
// let runner4Pos = 11;
// let runner5Pos = 11;

let runnersPos = [11, 11, 11, 11, 11];

let distanceToRun = 0;
let keepMoving = true;

function StartButton() {
    let offsetLeft = document.getElementById('FinishLineSvg').offsetLeft;
    distanceToRun = offsetLeft - 80;

    do {
        moveAllRunners();
    } while (keepMoving);

console.log('Finish');
    // for (let i = 11; i < distanceToRun; i++) {
    //     document.getElementById('runner1').style.marginLeft = i + 'px';
    //     document.getElementById('runner1').style.transform = 'rotate(' + i + 'deg)';
    // }

}

function moveAllRunners() {
    moveRunner(1);
    moveRunner(2);
    moveRunner(3);
    moveRunner(4);
    moveRunner(5);
}

function moveRunner(runnerNo) {
    let randomInt = getRandomInt(3);
    console.log('randomInt: ' + randomInt);

    if (randomInt) { //when not zero
        randomInt = getRandomInt(3);
        console.log('randomInt2: ' + randomInt);
        if (!randomInt) {return;}   //when 0
    }else{
        return;
    }
    
    runnersPos[runnerNo-1] = runnersPos[runnerNo - 1] + randomInt;
    let runnerPos = runnersPos[runnerNo-1];
    let runnerId = 'runner' + runnerNo;
    
    // document.getElementById(runnerId).style.marginLeft = runnerPos + 'px';
    // document.getElementById(runnerId).style.transform = 'rotate(' + runnerPos + 'deg)';
    // sleepSync(500);

    document.getElementById(runnerId).style.marginLeft = runnerPos + 'px';
    // sleepSync(500);
    document.getElementById(runnerId).style.transform = 'rotate(' + runnerPos + 'deg)';

    // console.log('runner: ' + runnerId + ' position - ' + runnerPos);
    // console.log('distanceToRun: ' + distanceToRun);

    if (runnerPos >= distanceToRun) {keepMoving = false;}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



const sleepSync = (ms) => {
    const end = new Date().getTime() + ms;
    while (new Date().getTime() < end) { /* do nothing */ }
  }