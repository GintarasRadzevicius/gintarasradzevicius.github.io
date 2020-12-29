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

var startX = 0;
var startY = 0;
var time;

function processTouchStart(ev){
  ev.preventDefault();
  startX = ev.changedTouches[0].pageX;
  startY = ev.changedTouches[0].pageY;

  date = new Date();
  time = date.getTime();

}

var firstXMove = 0;
var firstYMove = 0;
var date;
var endY = 0;

function processTouchMove(ev){
  console.log('ppppppppppppppppppppppp');
  ev.preventDefault();

  date = new Date();
  let timeNew = date.getTime();
  if(timeNew - time < 500){return;}
  endY = ev.changedTouches[0].pageY;

  if(startY < endY){
    rotateCubeDown();
  } else{
    rotateCubeUp();
  }
  
  date = new Date();
  time = date.getTime();
}

var rotateXDegree = 0;

function rotateCubeUp(){
  rotateXDegree += 90;
  document.querySelector('.cube').style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree + 'deg)';
}

function rotateCubeDown(){
  rotateXDegree -= 90;
  document.querySelector('.cube').style.transform = 'rotate3d(0.1,1,0,-20deg) rotateX(' + rotateXDegree + 'deg)';
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
  ev.preventDefault();
  firstXMove = 0;
  firstYMove = 0;
  if(startY < endY){
    rotateCubeDown();

  } else{
    rotateCubeUp();
  }
}

// http://www.javascriptkit.com/javatutors/touchevents.shtml
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
