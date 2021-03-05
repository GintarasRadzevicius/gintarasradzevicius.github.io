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


document.addEventListener('touchstart', processGlobalTouchStart, false);

let arrContainers = document.getElementsByClassName('container');
var fromContainer1 = arrContainers[0];
let fromContainer2 = arrContainers[1];
let fromContainer3 = arrContainers[2];
let toContainer4 = arrContainers[3];
let toContainer5 = arrContainers[4];
let toContainer6 = arrContainers[5];

fromContainer1.addEventListener('touchmove', processTouchMove, false);
fromContainer1.addEventListener('touchstart', processTouchStart, false);
fromContainer1.addEventListener('touchend', processTouchEnd, false);
fromContainer1.addEventListener("pressHold", doSomething, false); //it works while only on this. It should be done differently, but it is as it is.

fromContainer2.addEventListener('touchmove', processTouchMove, false);
fromContainer2.addEventListener('touchstart', processTouchStart, false);
fromContainer2.addEventListener('touchend', processTouchEnd, false);

fromContainer3.addEventListener('touchmove', processTouchMove, false);
fromContainer3.addEventListener('touchstart', processTouchStart, false);
fromContainer3.addEventListener('touchend', processTouchEnd, false);

toContainer4.addEventListener('touchmove', processTouchMove, false);
toContainer4.addEventListener('touchstart', processTouchStart, false);
toContainer4.addEventListener('touchend', processTouchEnd, false);

toContainer5.addEventListener('touchmove', processTouchMove, false);
toContainer5.addEventListener('touchstart', processTouchStart, false);
toContainer5.addEventListener('touchend', processTouchEnd, false);

toContainer6.addEventListener('touchmove', processTouchMove, false);
toContainer6.addEventListener('touchstart', processTouchStart, false);
toContainer6.addEventListener('touchend', processTouchEnd, false);


var startY = 0;
var fingerPressTime;
var time;
var endY;
var targetElement;


var pressHoldDuration = 50;
var counter = 0;
var countHoldTrigger = 0;
var pressHoldEvent = new CustomEvent("pressHold");

function timer() {

  if (counter < pressHoldDuration) {
    timerID = requestAnimationFrame(timer);
    counter++;
  } else {
    console.log("Press threshold reached!");
    countHoldTrigger++;
    // if (holdTouchCounter == 20) { //This block because sometimes cancelAnimationFrame does not work on touch end
    //   cancelAnimationFrame(timerID);
    //   holdTouchCounter = 0;
    //   return;
    // } else{
    //   holdTouchCounter++;
    // }

    fromContainer1.dispatchEvent(pressHoldEvent);
    timerID = requestAnimationFrame(timer);

    counter = 25;
  }
}

function doSomething() {

  if (startY > endY) {
    rotateCubeUp();
    calculateResult();

  } else if(startY < endY){
    rotateCubeDown()
    calculateResult();
  }
}

var doubleTouchFirstPressTime = 0;
var holdTouchCounter = 0;
var bInputOpened = false;
var elInput;
var textElement;
var timerID;
var bCubeRotated = false;

function processTouchStart(ev){

  startY = ev.changedTouches[0].pageY;
  endY = startY;

  time = new Date().getTime();
  fingerPressTime = time;
  
  // identifyWhichCube(ev);

  // if (timerID){cancelAnimationFrame(timerID);}  //when input is opened cancel animation fram does not work

  // if (bInputOpened) {inputCloseAndCalculateResult();} 

console.log('bCubeRotated: ' + bCubeRotated);

  if (fingerPressTime - doubleTouchFirstPressTime < 300 && !bCubeRotated) {
    bInputOpened = true;
    inputOpenNumber(ev);
    return;
  }

  doubleTouchFirstPressTime = fingerPressTime;

  requestAnimationFrame(timer);
  ev.preventDefault();
}

var touchCounter = 0;

function processGlobalTouchStart(ev) {            //This function made because processTouchStart scope is little
    if (timerID){cancelAnimationFrame(timerID);}

    switch (ev.targetTouches[0].target.className) { //this block since cancelAnimationFrame does not work when touch input
      case 'inputNumber1':
      case 'inputNumber2':
      case 'inputNumber3':
        cancelAnimationFrame(timerID++);
        cancelAnimationFrame(timerID++);
        cancelAnimationFrame(timerID++);
        cancelAnimationFrame(timerID++);
        cancelAnimationFrame(timerID++);
      break;
    }
    
    identifyWhichCube(ev);

    if (targetElement == null){
      console.log('target: ' + targetElement);
    }

    if (touchCounter && bInputOpened) {touchCounter = 0; inputCloseAndCalculateResult();}

    if (bInputOpened){touchCounter++;}else{touchCounter = 0;}
}

var cubeNr;

function inputOpenNumber(ev){

  // targetElement = ev.targetTouches[0].target;
  let numberAreaClass = ev.targetTouches[0].target.className;

  switch (numberAreaClass) {
    case 'cubeSideFrontText':
    case 'cubeSideTopText':
    case 'cubeSideBackText':
    case 'cubeSideBottomText':

      let cubeClassName;
      let width;

      switch (targetElement) {
        case 'cube1':
          cubeNr = 1;
          cubeClassName = 'inputNumber1';
          width = '40';
          break;

        case 'cube6':
          cubeNr = 6;
          cubeClassName = 'inputNumber1';
          width = '40';
          break;
 
        case 'cube2':
          cubeNr = 2;
          cubeClassName = 'inputNumber2';
          width = '60';
          break;

        case 'cube5':
          cubeNr = 5;
          cubeClassName = 'inputNumber2';
          width = '60';
          break;

        case 'cube3':
          cubeNr = 3;
          cubeClassName = 'inputNumber3';
          width = '84';
          break;

        case 'cube4':
          cubeNr = 4;
          cubeClassName = 'inputNumber3';
          width = '84';
          break;
        
        default:
          alert('Error in inputOpenNumber');
          break;

      }
      
      elInput = document.createElement("input");
      elInput.setAttribute('type', 'number');
      elInput.setAttribute('class', cubeClassName);
      elInput.style.width = width + 'px';
      elInput.addEventListener('keyup', inputCheckKeypress);

      textElement = document.getElementById(targetElement).getElementsByClassName(numberAreaClass)[0];
      textElement.style.display = 'none';
      textElement.parentElement.appendChild(elInput);

      elInput.focus();

      break;
  }
}


function inputCheckKeypress(event) {
  switch (event.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      break;

    case 'Enter':
    case 'Escape':
      inputCloseAndCalculateResult();
      return;
  
    default:                                      //characters i.e. + - are typing in, therefore we should remove it
      elInput.value ='';
      // let pattern = /[0-9]/g;
      // var result = inputValue.match(pattern);
      return;
  }
    inputCheckNumbers();
}

function inputCheckNumbers() {

  let inputNumber = elInput.value;
  let inputString = inputNumber.toString();

  switch (targetElement) {
    case 'cube1':
    case 'cube4':
      if(inputString.length > 2){
        elInput.value = inputString.substring(0,2);
      }
      let maxDays = inputGetMaxDays();

      if (inputString.length == 1 ) {     //first inputNumber can not be 0 and biggen than 2 or 3 depending on leap year
        if (inputNumber == 0){elInput.value = '';}
      } else{
        if (elInput.value > maxDays){
          elInput.value = (elInput.value)[0];
        }
      }
      
      break;

    case 'cube2':
    case 'cube5':
      if(inputString.length > 2){
        elInput.value = inputString.substring(0,2);
      }
      if (inputString.length == 1 ) {     //first inputNumber can not be 0 and biggen than 1
        if (inputNumber == 0){elInput.value = '';}
      } else{
        if (elInput.value > 12){
          elInput.value = (elInput.value)[0];
        }
      }
      break;

    case 'cube3':
    case 'cube6':
      if(inputString.length > 4){
        elInput.value = inputString.substring(0,4);
      }
      if (inputString.length == 1 ) {     //first inputNumber can not be 0
        if (inputNumber == 0){elInput.value = '';}
      } else{
        if (elInput.value > 9999){
          elInput.value = (elInput.value)[4];
        }
      }

      break;
  }
}

function inputGetMaxDays() {

  switch (targetElement) {
    case 'cube1':
      return getDaysfromMonthAndYear(monthFrom, yearFrom);
  
    case 'cube4':
      return getDaysfromMonthAndYear(monthTo, yearTo);
  }
}

function inputCloseAndCalculateResult(){

  let inputValue = elInput.value;

  elInput.remove();
  textElement.style.display = 'block';
  bInputOpened = false;

  if (!inputValue) {return;}


let cubeId = 'cube' + cubeNr;
let cubeNumber = Number(cubeNr) - 1;
let activeFrontClass = arrCubeSidesClasses[arrSideCounter[cubeNumber]];

  document.getElementById(cubeId).getElementsByClassName(activeFrontClass)[0].innerText = inputValue;

  switch (cubeNr) {
    case 1:
      dayFrom = Number(inputValue);
      break;

    case 2:
      monthFrom = Number(inputValue);
      break;

    case 3:
      yearFrom = Number(inputValue);
      break;

    case 4:
      dayTo = Number(inputValue);
      break;
    
    case 5:
      monthTo = Number(inputValue);
     break;

    case 6:
      yearTo = Number(inputValue);
      break;
  }

  console.log('Date from: ' + dayFrom + '-'+ monthFrom + '-' + yearFrom);
  console.log('Date to: ' + dayTo + '-'+ monthTo + '-' + yearTo);
  console.log('');

  calculateResult();

}



function processTouchEnd(ev){
  cancelAnimationFrame(timerID);

  counter = 0;

  ev.preventDefault();

  bCubeRotated = false;

  date = new Date();
  if(date.getTime() - fingerPressTime >= 500){return;}


  if(startY < endY){
    if (endY - startY < 10){return;}  //for double touch
    if (endY - startY > 220) {rotateCubeDown(); calculateResult(); rotateCubeDown(); calculateResult(); rotateCubeDown(); calculateResult(); rotateCubeDown(); calculateResult();}
    rotateCubeDown();
    calculateResult();
    
  } else if(startY > endY){
    if (startY - endY < 10){return;}  //for double touch
    if (startY - endY > 220) {rotateCubeUp(); calculateResult(); rotateCubeUp(); calculateResult(); rotateCubeUp(); calculateResult(); rotateCubeUp(); calculateResult();}
    rotateCubeUp();
    calculateResult();
    
  }else if(startY == endY){
    return;
  }
  bCubeRotated = true;

}



function processTouchMove(ev){

  ev.preventDefault();
  endY = ev.changedTouches[0].pageY;

}

function identifyWhichCube(ev){
  targetElement = ev.targetTouches[0].target;

  if (targetElement.classList.length == 0){return null;}

  switch (targetElement.className) {
    case 'container':
    case 'cubeContainer':
    case 'cube':
      let i = 0;

      while (targetElement.className != 'cube') {
        targetElement = targetElement.children[0];
        if (targetElement.classList.length == 0){return null;}
        i++;
        // if (i == 5) {alert('ERROR in identifyWhichCube -> while (targetElement.className != cube)');}
        if (i == 5) {return null;}  //return null made for function processGlobalTouchStart()
      }
    
      break;

    default:
      let j = 0;
      while (targetElement.className != 'cube') {
        targetElement = targetElement.parentElement;

        if (targetElement == null){return null;}//when pressing in input shows error
        if (targetElement.classList.length == 0){return null;}

        j++;
        // if (j == 5) {alert('ERROR in identifyWhichCube -> DEFAULT while (targetElement.className != cube)');}
        if (j == 5) {return null;}
      }
      break;
    }


  // if (targetElement.className != 'cube') {alert('error in identifyWhichCube -> container');}
  if (targetElement.className != 'cube') {return null;}
  targetElement = targetElement.id;
}

var date;
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
}

function rotateCubeDown(){
  let cubeNo = Number(targetElement[4]) - 1;
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
  
  changeDayAccordingToMonth(cubeNumber);

}

function changeNumbersDown(cubeNumber){

  let activeFrontClass;
  let cubeId = 'cube' + (cubeNumber + 1);

  findFrontAfterChange(cubeNumber, 'down');

  activeFrontClass = arrCubeSidesClasses[arrSideCounter[cubeNumber]];
  document.getElementById(cubeId).getElementsByClassName(activeFrontClass)[0].innerText = updateDateDown(cubeNumber);

  changeDayAccordingToMonth(cubeNumber);

}

function changeDayAccordingToMonth(cubeNumber) {  //changing day when month and year changes(changes 2nd(28/29 days) and other months (30 days) )
  switch (cubeNumber) {   
    case 1:
    case 2:
      if (dayFrom > 27) {
        let maxDays = getDaysfromMonthAndYear(monthFrom, yearFrom);
        if (dayFrom > maxDays) {
          document.getElementById('cube1').getElementsByClassName(arrCubeSidesClasses[arrSideCounter[0]])[0].innerText = maxDays;
          dayFrom = maxDays;
        }
      }
      break;

    case 4:
    case 5:
      if (dayTo > 27) {
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
      if(yearFrom == 1){yearFrom = 10000;};
      yearFrom--;
      return yearFrom;
      break;
  
    case 5:
      if(yearTo == 1){yearTo = 10000;};
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
        let maxDays = getDaysfromMonthAndYear(monthTo, yearTo);
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
      if(yearFrom == 9999){yearFrom = 0;};
      yearFrom++;
      return yearFrom;
      break;
  
    case 5:
      if(yearTo == 9999){yearTo = 0;};
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





function calculateResult(){

  let bReverseDate = bDateShouldBeReversed();

let dayStart, monthStart, yearStart, dayEnd, monthEnd, yearEnd;

  if (bReverseDate){
    dayStart = dayTo;
    monthStart = monthTo;
    yearStart = yearTo;
    dayEnd = dayFrom;
    monthEnd = monthFrom;
    yearEnd = yearFrom;
  } else {
    dayStart = dayFrom;
    monthStart = monthFrom;
    yearStart = yearFrom;
    dayEnd = dayTo;
    monthEnd = monthTo;
    yearEnd = yearTo;

  }

  // console.log('From: ' + dayStart + '-' + monthStart + '-' + yearStart);
  // console.log('To: ' + dayEnd + '-' + monthEnd + '-' + yearEnd);

  let daysQuantity = countDaysQuantity(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd);
  
  document.getElementById('calcText').innerText = daysQuantity; 
  




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

  if(yearFrom - yearTo > 0){
    return true;

  } else if (yearFrom == yearTo) {

    if (monthFrom - monthTo > 0){
      return true;

    } else if(monthFrom == monthTo){
        if (dayFrom - dayTo > 0){
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




/***********************************************************Calculation end*******************************************************/
