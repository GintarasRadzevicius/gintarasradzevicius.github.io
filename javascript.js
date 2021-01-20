'use strict';

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

var arrCube_1_ElRef = [];
var arrCube_2_ElRef = [];
var arrCube_3_ElRef = [];
var arrCube_4_ElRef = [];
var arrCube_5_ElRef = [];
var arrCube_6_ElRef = [];

firstFillCubeNumbers();


// window.ontouchstart = function(event){                              /*For Iphone !!!!!!!!!!!!!!! not updated*/ 

//   let cubeDayFrom = document.getElementById('cube1').firstElementChild;
//   let cubeMonthFrom = document.getElementById('cube2').firstElementChild;
//   let cubeYearFrom = document.getElementById('cube3').firstElementChild;
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
//    }
// }

let arrContainers = document.getElementsByClassName('container');
let fromContainer1 = arrContainers[0];
let fromContainer2 = arrContainers[1];
let fromContainer3 = arrContainers[2];
let fromContainer4 = arrContainers[3];
let fromContainer5 = arrContainers[4];
let fromContainer6 = arrContainers[5];

fromContainer1.addEventListener('touchmove', processTouchMove, false);
fromContainer1.addEventListener('touchstart', processTouchStart, false);
fromContainer1.addEventListener('touchend', processTouchEnd, false);

fromContainer2.addEventListener('touchmove', processTouchMove, false);
fromContainer2.addEventListener('touchstart', processTouchStart, false);
fromContainer2.addEventListener('touchend', processTouchEnd, false);

fromContainer3.addEventListener('touchmove', processTouchMove, false);
fromContainer3.addEventListener('touchstart', processTouchStart, false);
fromContainer3.addEventListener('touchend', processTouchEnd, false);

fromContainer4.addEventListener('touchmove', processTouchMove, false);
fromContainer4.addEventListener('touchstart', processTouchStart, false);
fromContainer4.addEventListener('touchend', processTouchEnd, false);

fromContainer5.addEventListener('touchmove', processTouchMove, false);
fromContainer5.addEventListener('touchstart', processTouchStart, false);
fromContainer5.addEventListener('touchend', processTouchEnd, false);

fromContainer6.addEventListener('touchmove', processTouchMove, false);
fromContainer6.addEventListener('touchstart', processTouchStart, false);
fromContainer6.addEventListener('touchend', processTouchEnd, false);


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

var arrRotateXDegree = [0,0,0,0,0,0];
var arrSideCounter = [0,0,0,0,0,0];
var arrCubeSidesClasses = ['cubeSideFrontText', 'cubeSideTopText', 'cubeSideBackText', 'cubeSideBottomText'];

function rotateCubeUp(){
  let cubeNo = Number(targetElement[4]) - 1;
  //**********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!********bandom !!!!!!!!!!!!!!*/
  arrRotateXDegree[cubeNo] += 90;

switch (cubeNo) {
  case 0:
  case 1:
  case 2:
    document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[cubeNo] + 'deg)';
  break;

  case 3:
  case 4:
  case 5:
    document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,18deg) rotateX(' + arrRotateXDegree[cubeNo] + 'deg)';
  break;
  }

  changeNumbersUp(cubeNo);

  //**********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!********bandom !!!!!!!!!!!!!!*/
 

  // switch (targetElement) {
  //   case 'cube1':
  //     arrRotateXDegree[cubeNo] += 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[cubeNo] + 'deg)';
      
  //     changeNumbersUp(cubeNo);

  //   break;

  //   case 'cube4':

  //     arrRotateXDegree[cubeNo] += 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,18deg) rotateX(' + arrRotateXDegree[cubeNo] + 'deg)';
      
  //     changeNumbersUp(cubeNo);
  //     break;
      
  //   case 'cube2':
  //   case 'cube5':
  //     arrRotateXDegree[1] += 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[1] + 'deg)';
      
  //     changeNumbersUp(cubeNo);
  //     break;

  //   case 'cube3':
  //   case 'cube6':
  //     arrRotateXDegree[2] += 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[2] + 'deg)';

  //     changeNumbersUp(cubeNo);
  //     break;

  //   default:
  //     break;





  // }
}

function rotateCubeDown(){
  let cubeNo = Number(targetElement[4]) - 1;
  //**********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!********bandom !!!!!!!!!!!!!!*/
  arrRotateXDegree[cubeNo] -= 90;

switch (cubeNo) {
  case 0:
  case 1:
  case 2:
    document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[cubeNo] + 'deg)';
  break;

  case 3:
  case 4:
  case 5:
    document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,18deg) rotateX(' + arrRotateXDegree[cubeNo] + 'deg)';
  break;
  }

  changeNumbersDown(cubeNo);







  // switch (targetElement) {

  //   case 'cube1':
  //     arrRotateXDegree[0] -= 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[0] + 'deg)';
      
  //     changeNumbersDown(0);

  //     break;
      
  //   case 'cube2':
  //     arrRotateXDegree[1] -= 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[1] + 'deg)';
      
  //     changeNumbersDown(1);
  //     break;

  //   case 'cube3':
  //     arrRotateXDegree[2] -= 90;
  //     document.getElementById(targetElement).style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[2] + 'deg)';
      
  //     changeNumbersDown(2);
  //     break;

  //   default:
  //     break;
  // }
}

function findFrontAfterChange(cube, rotation){

  switch(rotation){

    case 'up':
      if (arrSideCounter[cube] == 0) {arrSideCounter[cube] = 4;}
      arrSideCounter[cube] -= 1;
      break;

    case 'down':
      if (arrSideCounter[cube] == 3) {arrSideCounter[cube] = -1;}
      arrSideCounter[cube] += 1;
      break;
  }

}

// function processTouchStart(ev){
//   console.log(' ');

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
var maxDays;
var day;
var month;
var year;

function changeNumbersUp(cubeNumber){ //nebaigta!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  var activeFrontClassDay;
  var activeFrontClassMonth;
  var activeFrontClassYear;
  var cubeDayId;
  var cubeMonthId;
  var cubeYearId;

  switch(cubeNumber){
    case 0:
    case 3:
      activeFrontClassDay = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      activeFrontClassMonth = arrCubeSidesClasses[arrSideCounter[cubeNumber + 1]];
      activeFrontClassYear = arrCubeSidesClasses[arrSideCounter[cubeNumber + 2]];
      
      cubeDayId = 'cube' + (cubeNumber + 1);
      cubeMonthId = 'cube' + (cubeNumber + 2);
      cubeYearId = 'cube' + (cubeNumber + 3);
      
  
      findFrontAfterChange(cubeNumber, 'up');

      activeFrontClassDay = arrCubeSidesClasses[arrSideCounter[cubeNumber]];

      if(day == 1){
        maxDays = getDaysfromMonthAndYear(month, year);
        day = maxDays;
      } else{
        day--;
      }

      document.getElementById(cubeDayId).getElementsByClassName(activeFrontClassDay)[0].innerText = day;

      break;


    case 1:
    case 4:
      activeFrontClassMonth = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      cubeMonthId = 'cube' + (cubeNumber + 1);

      findFrontAfterChange(cubeNumber, 'up');

      activeFrontClassMonth = arrCubeSidesClasses[arrSideCounter[cubeNumber]];

      if(month == 1){
        month = 12;
      } else{
        month--;
      }
      document.getElementById(cubeMonthId).getElementsByClassName(activeFrontClassMonth)[0].innerText = month;

      break;


    case 2:
    case 5:
      activeFrontClassYear = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      cubeYearId = 'cube' + (cubeNumber + 1);

      findFrontAfterChange(cubeNumber, 'up');

      activeFrontClassYear = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      
      year--;

      document.getElementById(cubeYearId).getElementsByClassName(activeFrontClassYear)[0].innerText = year;

      break;
    }
}

function changeNumbersDown(cubeNumber){

  var activeFrontClassDay;
  var activeFrontClassMonth;
  var activeFrontClassYear;
  var cubeDayId;
  var cubeMonthId;
  var cubeYearId;

  switch(cubeNumber){
    case 0:
    case 3:
      activeFrontClassDay = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      activeFrontClassMonth = arrCubeSidesClasses[arrSideCounter[cubeNumber + 1]];
      activeFrontClassYear = arrCubeSidesClasses[arrSideCounter[cubeNumber + 2]];
      
      cubeDayId = 'cube' + (cubeNumber + 1);
      cubeMonthId = 'cube' + (cubeNumber + 2);
      cubeYearId = 'cube' + (cubeNumber + 3);
      
      maxDays = getDaysfromMonthAndYear(month, year);
  
      findFrontAfterChange(cubeNumber, 'down');

      activeFrontClassDay = arrCubeSidesClasses[arrSideCounter[cubeNumber]];

      if(day == maxDays){
        day = 1;
      } else{
        day = 1 + day;
      }
        document.getElementById(cubeDayId).getElementsByClassName(activeFrontClassDay)[0].innerText = day;

      break;


    case 1:
    case 4:
      activeFrontClassMonth = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      cubeMonthId = 'cube' + (cubeNumber + 1);

      findFrontAfterChange(cubeNumber, 'down');

      activeFrontClassMonth = arrCubeSidesClasses[arrSideCounter[cubeNumber]];

      if(month == 12){
        month = 1;
      } else{
        month++;
      }
      document.getElementById(cubeMonthId).getElementsByClassName(activeFrontClassMonth)[0].innerText = month;

      break;


    case 2:
    case 5:
      activeFrontClassYear = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
      cubeYearId = 'cube' + (cubeNumber + 1);

      findFrontAfterChange(cubeNumber, 'down');

      activeFrontClassYear = arrCubeSidesClasses[arrSideCounter[cubeNumber]];

      year++;
      document.getElementById(cubeYearId).getElementsByClassName(activeFrontClassYear)[0].innerText = year;

      break;
    }
}

function getDomElements(){
  arrCube_1_ElRef[0] = document.getElementById('cube1').getElementsByClassName('cubeSideFrontText')[0];
  arrCube_1_ElRef[1] = document.getElementById('cube1').getElementsByClassName('cubeSideTopText')[0];
  arrCube_1_ElRef[2] = document.getElementById('cube1').getElementsByClassName('cubeSideBackText')[0];
  arrCube_1_ElRef[3] = document.getElementById('cube1').getElementsByClassName('cubeSideBottomText')[0];
  
  arrCube_2_ElRef[0] = document.getElementById('cube2').getElementsByClassName('cubeSideFrontText')[0];
  arrCube_2_ElRef[1] = document.getElementById('cube2').getElementsByClassName('cubeSideTopText')[0];
  arrCube_2_ElRef[2] = document.getElementById('cube2').getElementsByClassName('cubeSideBackText')[0];
  arrCube_2_ElRef[3] = document.getElementById('cube2').getElementsByClassName('cubeSideBottomText')[0];

  arrCube_3_ElRef[0] = document.getElementById('cube3').getElementsByClassName('cubeSideFrontText')[0];
  arrCube_3_ElRef[1] = document.getElementById('cube3').getElementsByClassName('cubeSideTopText')[0];
  arrCube_3_ElRef[2] = document.getElementById('cube3').getElementsByClassName('cubeSideBackText')[0];
  arrCube_3_ElRef[3] = document.getElementById('cube3').getElementsByClassName('cubeSideBottomText')[0];

  arrCube_4_ElRef[0] = document.getElementById('cube4').getElementsByClassName('cubeSideFrontText')[0];
  arrCube_4_ElRef[1] = document.getElementById('cube4').getElementsByClassName('cubeSideTopText')[0];
  arrCube_4_ElRef[2] = document.getElementById('cube4').getElementsByClassName('cubeSideBackText')[0];
  arrCube_4_ElRef[3] = document.getElementById('cube4').getElementsByClassName('cubeSideBottomText')[0];

  arrCube_5_ElRef[0] = document.getElementById('cube5').getElementsByClassName('cubeSideFrontText')[0];
  arrCube_5_ElRef[1] = document.getElementById('cube5').getElementsByClassName('cubeSideTopText')[0];
  arrCube_5_ElRef[2] = document.getElementById('cube5').getElementsByClassName('cubeSideBackText')[0];
  arrCube_5_ElRef[3] = document.getElementById('cube5').getElementsByClassName('cubeSideBottomText')[0];

  arrCube_6_ElRef[0] = document.getElementById('cube6').getElementsByClassName('cubeSideFrontText')[0];
  arrCube_6_ElRef[1] = document.getElementById('cube6').getElementsByClassName('cubeSideTopText')[0];
  arrCube_6_ElRef[2] = document.getElementById('cube6').getElementsByClassName('cubeSideBackText')[0];
  arrCube_6_ElRef[3] = document.getElementById('cube6').getElementsByClassName('cubeSideBottomText')[0];
}

function firstFillCubeNumbers(){
  
  getDomElements();

  day = new Date().getDate();
  month = (new Date().getMonth()) + 1;
  year = new Date().getFullYear();

  arrCube_1_ElRef[0].innerText = arrCube_4_ElRef[0].innerText = day;
  arrCube_2_ElRef[0].innerText = arrCube_5_ElRef[0].innerText = month;
  arrCube_3_ElRef[0].innerText = arrCube_6_ElRef[0].innerText = year;


  maxDays = getDaysfromMonthAndYear(month, year);
  
  if(day == maxDays){
    arrCube_1_ElRef[1].innerText = 1;
    arrCube_1_ElRef[2].innerText = 2;
    arrCube_1_ElRef[3].innerText = day - 1;
  } else if(day == 1){
      if (month = 1) {month = 13;}
      maxDays = getDaysfromMonthAndYear(month - 1, year);
      arrCube_1_ElRef[1].innerText = 1;
      arrCube_1_ElRef[2].innerText = 2;
      arrCube_1_ElRef[3].innerText = maxDays;
  } else{
    arrCube_1_ElRef[1].innerText = day + 1;
    arrCube_1_ElRef[2].innerText = day + 2;
    arrCube_1_ElRef[3].innerText = day - 1;
  }

}

function getDaysfromMonthAndYear(varMonth, varYear){

  var isLeapYear = isLeapYearCheck(varYear);

  switch(varMonth){

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

function isLeapYearCheck(varYear){
  if (varYear % 4 == 0){

    if(varYear % 100 == 0 && varYear % 400 != 0){
      return false;
    }

    return true;

  } else {
    return false;
  }

  // if (varYear == 2020){
  //   return true;
  // }
  // let dummyYear = varYear;
  // if (varYear > 2020){

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