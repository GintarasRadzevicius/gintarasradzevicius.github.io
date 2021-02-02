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
var fromContainer1 = arrContainers[0];
let fromContainer2 = arrContainers[1];
let fromContainer3 = arrContainers[2];
let fromContainer4 = arrContainers[3];
let fromContainer5 = arrContainers[4];
let fromContainer6 = arrContainers[5];

fromContainer1.addEventListener('touchmove', processTouchMove, false);
fromContainer1.addEventListener('touchstart', processTouchStart, false);
fromContainer1.addEventListener('touchend', processTouchEnd, false);
fromContainer1.addEventListener("pressHold", doSomething, false);

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


var pressHoldDuration = 50;
var timerID;
var counter = 0;
var pressHoldEvent = new CustomEvent("pressHold");

function timer() {

  if (counter < pressHoldDuration) {
    timerID = requestAnimationFrame(timer);
    counter++;
  } else {
    console.log("Press threshold reached!");
    fromContainer1.dispatchEvent(pressHoldEvent);
    timerID = requestAnimationFrame(timer);

    counter = 25;
  }
}

function doSomething() {

  if (startY > endY) {
    rotateCubeUp();

  } else if(startY < endY){
    rotateCubeDown()
  }
}

function processTouchStart(ev){

  requestAnimationFrame(timer);
  ev.preventDefault();

  identifyWhichCube(ev);

  startY = ev.changedTouches[0].pageY;
  endY = startY;

  date = new Date();
  time = date.getTime();
  fingerPressTime = time;

}

function processTouchEnd(ev){

  cancelAnimationFrame(timerID);
  counter = 0;

  ev.preventDefault();

  if(timeNew - fingerPressTime >= 500){return;}

  if(startY < endY){
    if (endY - startY > 220) {rotateCubeDown(); rotateCubeDown(); rotateCubeDown(); rotateCubeDown();}
    rotateCubeDown();

  } else if(startY > endY){
    if (startY - endY > 220) {rotateCubeUp(); rotateCubeUp(); rotateCubeUp(); rotateCubeUp();}
    rotateCubeUp();

  }
}

function processTouchMove(ev){

  ev.preventDefault();
  endY = ev.changedTouches[0].pageY;

}

function identifyWhichCube(ev){
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

var arrRotateXDegree = [0,0,0,0,0,0];
var arrSideCounter = [0,0,0,0,0,0];
var arrCubeSidesClasses = ['cubeSideFrontText', 'cubeSideTopText', 'cubeSideBackText', 'cubeSideBottomText'];

function rotateCubeUp(){
  let cubeNo = Number(targetElement[4]) - 1;

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
  // calculateResult();

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
  // calculateResult();
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


/***********************************************************cube numbers start*******************************************************/
var maxDays;
var day;
var month;
var year;

var dayFrom;
var monthFrom;
var yearFrom;
var dayTo;
var monthTo;
var yearTo;


function changeNumbersUp(cubeNumber){

  let activeFrontClass = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
  let cubeId = 'cube' + (cubeNumber + 1);

  findFrontAfterChange(cubeNumber, 'up');

  activeFrontClass = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
  document.getElementById(cubeId).getElementsByClassName(activeFrontClass)[0].innerText = updateDateUp(cubeNumber);
  
  changeDayAccordingToMonth(cubeNumber); //changing day when month and year changes

}

function changeNumbersDown(cubeNumber){

  let activeFrontClass;
  let cubeId = 'cube' + (cubeNumber + 1);

  findFrontAfterChange(cubeNumber, 'down');

  activeFrontClass = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
  document.getElementById(cubeId).getElementsByClassName(activeFrontClass)[0].innerText = updateDateDown(cubeNumber);

  changeDayAccordingToMonth(cubeNumber);

}

function changeDayAccordingToMonth(cubeNumber) {
  switch (cubeNumber) {   
    case 1:
    case 2:
      if (monthFrom == 2 && dayFrom > 27) {
        let maxDays = getDaysfromMonthAndYear(monthFrom, yearFrom);
        if (dayFrom > maxDays) {
          document.getElementById('cube1').getElementsByClassName(arrCubeSidesClasses[arrSideCounter[0]])[0].innerText = maxDays;
          dayFrom = maxDays;
        }
      }
      break;

    case 4:
    case 5:
      if (monthTo == 2 && dayTo > 27) {
        let maxDays = getDaysfromMonthAndYear(monthTo, yearTo);
        if (dayTo > maxDays) {
          document.getElementById('cube4').getElementsByClassName(arrCubeSidesClasses[arrSideCounter[3]])[0].innerText = maxDays;
          dayTo = maxDays;
        }
      }
      break;
  }

}

function updateDateUp(cubeNumber){
  
  switch (cubeNumber) {

    case 0:
      if(dayFrom == 1){dayFrom = getDaysfromMonthAndYear(monthFrom, yearFrom);} else{dayFrom--;}
      return dayFrom;
      break;
  
    case 3:
      if(dayTo == 1){dayTo = getDaysfromMonthAndYear(monthTo, yearTo);} else{dayTo--;}
      return dayTo;
      break;
  
    case 1:
      if(monthFrom == 1){monthFrom = 12;} else{monthFrom--;}
      return monthFrom;
      break;
    
    case 4:
      if(monthTo == 1){monthTo = 12;} else{monthTo--;}
      return monthTo;
      break;
      
    case 2:
      yearFrom--;
      return yearFrom;
      break;
  
    case 5:
      yearTo--;
      return yearTo;
      break;
  }
}

function updateDateDown(cubeNumber){

  switch (cubeNumber) {

    case 0:
      if (dayFrom > 27) {
        let maxDays = getDaysfromMonthAndYear(monthFrom, yearFrom);
        if(dayFrom >= maxDays){dayFrom = 0;};
      }
      dayFrom++;
      return dayFrom;
      break;
  
    case 3:
      if (dayTo > 27) {
        let maxDays = getDaysfromMonthAndYear(monthFrom, yearFrom);
        if(dayTo >= maxDays){dayTo = 0;};
      }
      dayTo++;
      return dayTo;
      break;
  
    case 1:
      if(monthFrom == 12){monthFrom = 0;};
      monthFrom++;
      return monthFrom;
      break;
    
    case 4:
      if(monthTo == 12){monthTo = 1;};
      monthTo++;
      return monthTo;
      break;
      
    case 2:
      yearFrom++;
      return yearFrom;
      break;
  
    case 5:
      yearTo++;
      return yearTo;
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

var dayFrom;
var monthFrom;
var yearFrom;
var dayTo;
var monthTo;
var yearTo;



function firstFillCubeNumbers(){
  
  getDomElements();

  dayFrom = dayTo = new Date().getDate();
  monthFrom = monthTo = (new Date().getMonth()) + 1;
  yearFrom = yearTo = new Date().getFullYear();

  arrCube_1_ElRef[0].innerText = arrCube_4_ElRef[0].innerText = dayFrom;
  arrCube_2_ElRef[0].innerText = arrCube_5_ElRef[0].innerText = monthFrom;
  arrCube_3_ElRef[0].innerText = arrCube_6_ElRef[0].innerText = yearFrom;


  maxDays = getDaysfromMonthAndYear(monthFrom, yearFrom);
  
  if(dayFrom == maxDays){
    arrCube_1_ElRef[1].innerText = 1;
    arrCube_1_ElRef[2].innerText = 2;
    arrCube_1_ElRef[3].innerText = dayFrom - 1;
  } else if(dayFrom == 1){
      if (month = 1) {month = 13;}
      maxDays = getDaysfromMonthAndYear(month - 1, year);
      arrCube_1_ElRef[1].innerText = 1;
      arrCube_1_ElRef[2].innerText = 2;
      arrCube_1_ElRef[3].innerText = maxDays;
  } else{
    arrCube_1_ElRef[1].innerText = dayFrom + 1;
    arrCube_1_ElRef[2].innerText = dayFrom + 2;
    arrCube_1_ElRef[3].innerText = dayFrom - 1;
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

/***********************************************************Calculation start*******************************************************/
/*

function getAllNumbers(){
        
  dayFrom = document.getElementsByClassName(arrCubeSidesClasses[arrSideCounter[0]])[0].innerText;
  monthFrom = document.getElementsByClassName(arrCubeSidesClasses[arrSideCounter[1]])[0].innerText;
  yearFrom = document.getElementsByClassName(arrCubeSidesClasses[arrSideCounter[2]])[0].innerText;
  dayTo = document.getElementsByClassName(arrCubeSidesClasses[arrSideCounter[3]])[0].innerText;
  monthTo = document.getElementsByClassName(arrCubeSidesClasses[arrSideCounter[4]])[0].innerText;
  yearTo = document.getElementsByClassName(arrCubeSidesClasses[arrSideCounter[5]])[0].innerText;
alert(arrCubeSidesClasses[arrSideCounter[0]]);
  console.log('dayFrom: ' + dayFrom);
  console.log('monthFrom: ' + monthFrom);
  console.log('yearFrom: ' + yearFrom);
  console.log('dayTo: ' + dayTo);
  console.log('monthTo: ' + monthTo);
  console.log('yearTo: ' + yearTo);
}


function calculateResult(){

  getAllNumbers();

  let dateFrom, dateTo;

  let bReverseDate = bDateShouldBeReversed();           //just for test

  if (bReverseDate != true && bReverseDate != false) {  //just for test
    alert("Error in bDateShouldBeReversed() !!!!!!");
  }

  if (bReverseDate){
    dateFrom = getDate("dateTo");
    dateTo = getDate("dateFrom");

  } else {
    dateFrom = getDate("dateFrom");
    dateTo = getDate("dateTo");
  }


  let arrDateFrom = dateFrom.split("-");
  let arrDateTo = dateTo.split("-");

  let dayFrom = arrDateFrom[0];
  let monthFrom = arrDateFrom[1];
  let yearFrom = arrDateFrom[2];

  let dayTo = arrDateTo[0];
  let monthTo = arrDateTo[1];
  let yearTo = arrDateTo[2];

  if (Number(yearFrom) > Number(yearTo)){
  }


  let daysQuantity = countDaysQuantity(Number(yearFrom), Number(yearTo), Number(monthFrom), Number(monthTo), Number(dayFrom), Number(dayTo));

  let resultNumbers = document.getElementsByClassName("resultNumbers");
  resultNumbers[0].innerText = daysQuantity; 


}

function countDaysQuantity(startYear, endYear, startMonth, endMonth, startDay, endDay){

  let daysQuantity = 0;

  if (endYear == startYear){


    if (endMonth == startMonth) {


      if (endDay == startDay){
        daysQuantity = 0;

      } else {
        daysQuantity = endDay - startDay;
    }


    } else if (endMonth - startMonth > 1){

      daysQuantity = daysQuantity + getDaysQuantityInMonth(startYear, startMonth) - startDay;
      daysQuantity = daysQuantity + endDay;
      daysQuantity = daysQuantity + getDaysOfSeveralMonths(startYear, startMonth + 1, endMonth);


    } else if (endMonth - startMonth == 1){
      daysQuantity = daysQuantity + getDaysQuantityInMonth(startYear, startMonth) - startDay;
      daysQuantity = daysQuantity + endDay;


    } else {
      alert("Error in countDaysQuantity: 1.");

    }
    
    
  } else if(endYear - startYear > 1){

    daysQuantity = daysQuantity + getDaysQuantityInMonth(startYear, startMonth) - startDay;
    daysQuantity = daysQuantity + endDay;
    daysQuantity = daysQuantity + getDaysOfSeveralMonths(startYear, startMonth + 1, 12 + 1);
    daysQuantity = daysQuantity + getDaysOfSeveralMonths(endYear, 1, endMonth);
    daysQuantity = daysQuantity + getDaysQuantityInYears(startYear + 1, endYear);


  } else if(endYear - startYear == 1){
    daysQuantity = daysQuantity + getDaysQuantityInMonth(startYear, startMonth) - startDay;
    daysQuantity = daysQuantity + endDay;
    daysQuantity = daysQuantity + getDaysOfSeveralMonths(startYear, startMonth + 1, 12 + 1);
    daysQuantity = daysQuantity + getDaysOfSeveralMonths(endYear, 1, endMonth);


  } else {
    alert("Error in countDaysQuantity: 2.");
  }


  return daysQuantity;
}

function getDaysOfSeveralMonths(yearToCheck, firstMonthToCheck, secondMonthToCheck){

  let daysNumber = 0;

  while(firstMonthToCheck != secondMonthToCheck) {

    daysNumber = daysNumber + getDaysQuantityInMonth(yearToCheck, firstMonthToCheck);

    firstMonthToCheck = ++firstMonthToCheck;
  }
  
  return daysNumber;
}



function getDaysQuantityInMonth(year, month){

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
      
      if (year % 4 == 0){
        return 29;
      } else {
        return 28;
      }
  }
}

function getDaysQuantityInYears(yearStart, yearEnd){

  let daysNumber = 0;
  
  while(yearStart != yearEnd) {

    if ( isLeapYearCheck(yearStart)){
      daysNumber = daysNumber + 366;
      yearStart = ++yearStart;

    } else {
    daysNumber = daysNumber + 365;
    yearStart = ++yearStart;
    }
  }
  return daysNumber;
}

function bDateShouldBeReversed(){

  let yearFrom = document.getElementsByClassName("dateFrom")[0].children[1].children[2].innerText;
  let yearTo = document.getElementsByClassName("dateTo")[0].children[1].children[2].innerText;

  let monthFrom = document.getElementsByClassName("dateFrom")[0].children[1].children[1].innerText;
  let monthTo = document.getElementsByClassName("dateTo")[0].children[1].children[1].innerText;

  let dayFrom = document.getElementsByClassName("dateFrom")[0].children[1].children[0].innerText;
  let dayTo = document.getElementsByClassName("dateTo")[0].children[1].children[0].innerText;

  if(Number(yearFrom) - Number(yearTo) > 0){
    return true;

  } else if (yearFrom == yearTo) {

    if (Number(monthFrom) - Number(monthTo) > 0){
      return true;

    } else if(monthFrom == monthTo){
        if (Number(dayFrom) - Number(dayTo) > 0){
          return true;

        } else{
          return false;
        }
            
    } else{
      return false;
    }

  } else {
    return false;
  }
}

function getDate(dateFromOrTo){
  let date;
  date = document.getElementsByClassName(dateFromOrTo)[0].children[1].children[0].innerText;
  date = date + "-" + document.getElementsByClassName(dateFromOrTo)[0].children[1].children[1].innerText;
  date = date + "-"+ document.getElementsByClassName(dateFromOrTo)[0].children[1].children[2].innerText;
  return date;
}



/***********************************************************Calculation end*******************************************************/
