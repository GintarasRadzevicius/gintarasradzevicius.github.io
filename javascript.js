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

firstFillCubeNumbers();


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

var arrRotateXDegree = [0,0,0,0,0];
var arrSideCounter = [1,1,1,1,1,1];
var activeCube = 0;

function rotateCubeUp(){
  switch (targetElement) {
    case 'cube1':
      arrRotateXDegree[0] += 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[0] + 'deg)';
      countFrontSideAndCubeIdentification(0, "up");
      break;
      
    case 'cube2':
      arrRotateXDegree[1] += 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[1] + 'deg)';
      countFrontSideAndCubeIdentification(1, "up");
      break;

    case 'cube3':
      arrRotateXDegree[2] += 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[2] + 'deg)';
      countFrontSideAndCubeIdentification(2, "up");
      break;

    default:
      break;
  }
}

function rotateCubeDown(){

  switch (targetElement) {

    case 'cube1':
      arrRotateXDegree[0] -= 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[0] + 'deg)';
      
      countFrontSideAndCubeIdentification(0, "down");
      daysCubeFillNumbers("cube1");
      break;
      
    case 'cube2':
      arrRotateXDegree[1] -= 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[1] + 'deg)';
      
      countFrontSideAndCubeIdentification(1, "down");
      daysCubeFillNumbers("cube2");
      break;

    case 'cube3':
      arrRotateXDegree[2] -= 90;
      document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[2] + 'deg)';
      
      countFrontSideAndCubeIdentification(2, "down");
      daysCubeFillNumbers("cube3");
      break;

    default:
      break;
  }

}

function countFrontSideAndCubeIdentification(cube, rotation){

  switch(rotation){

    case "up":
      if (arrSideCounter[cube] == 1) {arrSideCounter[cube] = 5;}
      arrSideCounter[cube] -= 1;
      break;

    case "down":
      if (arrSideCounter[cube] == 4) {arrSideCounter[cube] = 0;}
      arrSideCounter[cube] += 1;
      break;
  }

  activeCube = cube + 1;

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

/***********************************************************cube numbers start*******************************************************/
var maxDaysInMonth;

function daysCubeFillNumbers(cubeId){

  
  // let month = getMonth();
  // maxDaysInMonth = getDaysfromMonthAndYear(monthNumber, yearNumber);


  // if(dayNumber == maxDaysInMonth){dayNumber = 0};
  // document.getElementsByClassName("cubeSideTopText")[0].innerText = 1 + dayNumber;

  // if(dayNumber == maxDaysInMonth){dayNumber = -1};
  // document.getElementsByClassName("cubeSideBackText")[0].innerText = 2 + dayNumber;

  // if(dayNumber == maxDaysInMonth){dayNumber = -4};
  // document.getElementsByClassName("cubeSideRightText")[0].innerText = maxDaysInMonth;

  // let monthNumberForCube = Number(document.getElementsByClassName(sourceClassName)[0].children[1].children[1].innerText);

  // if(dayNumber == 1){

  //   if(monthNumberForCube == 1){
  //     dayNumber == 31 + 1;
  //   } else{
  //     let yearNumberForCube = Number(document.getElementsByClassName(sourceClassName)[0].children[2].children[1].innerText) - 1;
  //     maxDaysInMonth = getDaysfromMonthAndYear(monthNumberForCube - 1, yearNumberForCube);
  //     dayNumber = maxDaysInMonth + 1;
  //   }
    
  // };
  // document.getElementsByClassName("cubeSideBottomText")[0].innerText = dayNumber - 1;

}

function getMonth(){
  let side;
  switch(ac){
    case 1:
      side = "front"
      break;

    case 2:
      side = "top"
      break;

    case 3:
      side = "back"
      break;

    case 4:
      side = "bottom"
      break;
   
  }





}

function firstFillCubeNumbers(){

  let dayFromTag = document.getElementById("cube1");
  dayFromTag.firstElementChild.innerText = dayNumber;
  
  let monthFromTag = document.getElementById("cube2");
  monthFromTag.firstElementChild.innerText = monthNumber;
  
  let yearFromTag = document.getElementById("cube3");
  yearFromTag.firstElementChild.innerText = yearNumber;
  
  let dayToTag = document.getElementById("cube4");
  dayToTag.firstElementChild.innerText = dayNumber;
  
  let monthToTag = document.getElementById("cube5");
  monthToTag.firstElementChild.innerText = monthNumber;
  
  let yearToTag = document.getElementById("cube6");
  yearToTag.firstElementChild.innerText = yearNumber;
}

function getDaysfromMonthAndYear(month, year){

  var isLeapYear = isLeapYearCheck(year);

  switch(month){

    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;

    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
  
    case 2:
      
    if (isLeapYear){
      return 29;

    }else{
      return 28;
    }
  }
}

function isLeapYearCheck(year){
  if (year % 4 == 0){

    if(year % 100 == 0 && year % 400 != 0){
      return false;
    }

    return true;

  } else {
    return false;
  }

  // if (year == 2020){
  //   return true;
  // }
  // let dummyYear = year;
  // if (year > 2020){

  //   while(dummyYear >= 2020){
  //     dummyYear = dummyYear - 4;
  //     if (dummyYear == 2020){
  //       return true;
  //     }
  //   }

  // }else{
  //   while(dummyYear <= 2020){
  //     dummyYear = Number(dummyYear) + 4;
  //     if (dummyYear == 2020){
  //       return true;
  //     }
  //   }
  // }

  // return false;

}





/***********************************************************cube numbers end*******************************************************/
