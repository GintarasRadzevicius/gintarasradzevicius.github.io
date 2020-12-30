"use strict";

/*
Notes:
1. Calculation does not include last day.
*/

// *****For future*****
// if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
//   var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//   x = touch.pageX;
//   y = touch.pageY;
// } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
//   x = e.clientX;
//   y = e.clientY;
// }
// *****For future*****




var yearNumber = new Date().getFullYear();
var monthNumber = (new Date().getMonth()) + 1;
var dayNumber = new Date().getDate();

let dayFromTag = document.getElementById("cube1");
dayFromTag.firstElementChild.innerText = dayNumber;

let monthFromTag = document.getElementById("cube2");
monthFromTag.firstElementChild.innerText = monthNumber;

let yearFromTag = document.getElementById("cube3");
yearFromTag.firstElementChild.innerText = yearNumber;



// window.ontouchstart = function(event){                              /*For Iphone !!!!!!!!!!!!!!! not updated*/ 

//   let cubeDayFrom = document.getElementById("cube1").firstElementChild;
//   let cubeMonthFrom = document.getElementById("cube2").firstElementChild;
//   let cubeYearFrom = document.getElementById("cube3").firstElementChild;
//   console.log(event.target.className);

//   switch (event.target) {
//     case cubeDayFrom:
//       document.querySelector('.cube').style.transform =
//       // 'rotateX(' + 90 + 'deg)'+
//       'rotateY(0deg)' +
//       'rotateX(90deg)' +
//       'rotateZ(20deg)';
//       break;
//     case cubeMonthFrom:
//       animationHideModal(modalDay);
//       break;
//     case cubeYearFrom:
//       animationHideModal(modalDay);
//       break;
//   }


// }

let arrContainers = document.getElementsByClassName('container');
let fromContainer1 = arrContainers[0];
let fromContainer2 = arrContainers[1];
let fromContainer3 = arrContainers[2];

fromContainer1.addEventListener('touchmove', processTouchMove, false);
fromContainer1.addEventListener('touchstart', processTouchStart, false);
fromContainer1.addEventListener('touchend', processTouchEnd, false);

fromContainer2.addEventListener('touchmove', processTouchMove, false);
fromContainer2.addEventListener('touchstart', processTouchStart, false);
fromContainer2.addEventListener('touchend', processTouchEnd, false);

fromContainer3.addEventListener('touchmove', processTouchMove, false);
fromContainer3.addEventListener('touchstart', processTouchStart, false);
fromContainer3.addEventListener('touchend', processTouchEnd, false);



var startY = 0;
var fingerPressTime;
var time;
var endY;
var targetElement;

function processTouchStart(ev){
  // console.dir(ev.target);

  ev.preventDefault();
  identifyWhichCube(ev);

  startY = ev.changedTouches[0].pageY;
  endY = startY;

  date = new Date();
  time = date.getTime();
  fingerPressTime = time;
}

function identifyWhichCube(ev){ //sita vieta taisyti
  targetElement = ev.targetTouches[0].target;

  switch (targetElement.className) {
    case 'container':
    case 'cubeContainer':
    case 'cube':
      let i = 0;

      while (targetElement.className != 'cube') {
        targetElement = targetElement.children[0];
        i++;
        if (i == 5) {alert('ERROR in identifyWhichCube -> while (targetElement.className != cube)');}
      }
    
      break;

    default:
      let j = 0;
      while (targetElement.className != 'cube') {
        targetElement = targetElement.parentElement;
        j++;
        if (j == 5) {alert('ERROR in identifyWhichCube -> DEFAULT while (targetElement.className != cube)');}
      }
      break;
    }


  if (targetElement.className != 'cube') {alert('error in identifyWhichCube -> container');}
  targetElement = targetElement.id;
}

var date;
var timeNew;
var distance = 0;

function processTouchMove(ev){
  ev.preventDefault();

  date = new Date();
  timeNew = date.getTime();

  endY = ev.changedTouches[0].pageY;

  if(timeNew - time < 500){return;}

  console.log('startY: '  + startY);
  console.log('endY: '  + endY);
  console.log(' ');

  if(startY < endY){
    distance = distance + endY - startY;
    console.log('distance: '  + distance);
    console.log(' ');

    if(distance < 30){return;}     //to limit rotations
    rotateCubeDown();

  } else{
    distance = distance + startY - endY;
    console.log('distance else: '  + distance);
    console.log(' ');

    if(distance < 30){return;}     //to limit rotations
    rotateCubeUp();
  }
  
  distance = 0;
  startY = ev.changedTouches[0].pageY;

  date = new Date();
  time = date.getTime();
}

var rotateXDegree = [0,0,0,0,0];

function rotateCubeUp(){
  switch (targetElement) {
    case 'cube1':
      rotateXDegree[0] += 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree[0] + 'deg)';
      break;
      
    case 'cube2':
      rotateXDegree[1] += 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree[1] + 'deg)';
      break;

    case 'cube3':
      rotateXDegree[2] += 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree[2] + 'deg)';
      break;

    default:
      break;
  }
}

function rotateCubeDown(){
  switch (targetElement) {
    case 'cube1':
      rotateXDegree[0] -= 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree[0] + 'deg)';
      break;
      
    case 'cube2':
      rotateXDegree[1] -= 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree[1] + 'deg)';
      break;

    case 'cube3':
      rotateXDegree[2] -= 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree[2] + 'deg)';
      break;

    default:
      break;
  }
}

// function processTouchStart(ev){
//   console.log(" ");

//   ev.preventDefault();
//   for (var i=0; i < ev.changedTouches.length; i++) {
//     console.log(ev.changedTouches[i].pageX);
//     console.log(ev.changedTouches[i].pageY);
//   }
// }


function processTouchEnd(ev){
  console.log('startY: '  + startY);
  console.log('endY: '  + endY);

  if(timeNew - fingerPressTime >= 500){return;}
  ev.preventDefault();

  if(startY < endY){
    rotateCubeDown();

  } else if(startY > endY){
    rotateCubeUp();

  } else{                       //when startY = endY
    return;
  }
}

// http://www.javascriptkit.com/javatutors/touchevents.shtml
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
