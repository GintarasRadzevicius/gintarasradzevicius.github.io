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

let screenHeight = screen.height;
let itemsHeight = 530;
let heightDifference = screenHeight - itemsHeight;
let margin = Math.round(heightDifference * 0.1);
let headerMargin = Math.round(margin/2);


if (screenHeight - itemsHeight > 0) {
  document.getElementById('header').style.marginTop = headerMargin + 'px';
  document.getElementsByClassName('dateText')[0].style.marginTop = margin + 'px';
  document.getElementsByClassName('scene')[0].style.marginTop = margin + 'px';
}

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

  let daysQuantity = countDaysQuantity(yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd);
  let workingDaysQuantity;
  let bCountWorkingDays = true;

  if (bCountWorkingDays) {
    workingDaysQuantity = countWorkingDays(daysQuantity, yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd);
    document.getElementById('calcText').innerText = workingDaysQuantity;

  } else {
      document.getElementById('calcText').innerText = daysQuantity;
  }


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
/***********************************************************Calculate working days start*******************************************************/

function countWorkingDays(allDays, yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd) {

  let weekdayBeginning = getWeekdayBeginning(monthStart, dayStart, yearStart);
  let weekdayEnd = getWeekdayEnd(monthEnd, dayEnd, yearEnd);
  let daysToRemoveFromBeginning = countDaysToRemoveFromBeginning(weekdayBeginning);
  let daysToRemoveFromEnd = countDaysToRemoveFromEnd(weekdayEnd);                                 //not including last day
  
  let workingDays = 0;

  if (allDays > 14) {
    workingDays = countWorkingDaysMoreThan15Days(allDays, weekdayBeginning, weekdayEnd, daysToRemoveFromBeginning, daysToRemoveFromEnd);

  }else{
    if (allDays == 0) {return 0;}
    workingDays = countWorkingDaysUpTo15Days(allDays, weekdayBeginning);
  }
  workingDays = excludePublicHolidays(workingDays, yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd);

  return workingDays;

}

function countWorkingDaysMoreThan15Days(allDays, weekdayBeginning, weekdayEnd, daysToRemoveFromBeginning, daysToRemoveFromEnd) {
  let fullWeeksAllDays = allDays - daysToRemoveFromBeginning - daysToRemoveFromEnd;

  if (fullWeeksAllDays % 7 != 0){alert('error: fullWeeksAllDays % 7');}                           //just for testing

  let weeks = 0;
  weeks = fullWeeksAllDays / 7;

  let fullWeeksWorkingDays = 0;
  fullWeeksWorkingDays = weeks * 5;

  let workingDaysFirstWeek = countWorkingDaysFirstWeek(weekdayBeginning);
  let workingDaysLastWeek = countWorkingDaysLastWeek(weekdayEnd);

  let workingDays = fullWeeksWorkingDays + workingDaysFirstWeek + workingDaysLastWeek;

  return workingDays;
}

function countWorkingDaysUpTo15Days(allDays, weekdayBeginning) {

  let dummyWeekdayBeginning = weekdayBeginning;
  let workingDaysOneWeek = 0;

  for (let i = 0; i < allDays; i++) {
    
    if (dummyWeekdayBeginning == 6) {dummyWeekdayBeginning = 0; continue;}
    if (dummyWeekdayBeginning == 0) {dummyWeekdayBeginning++; continue;}

    dummyWeekdayBeginning++;
    workingDaysOneWeek++;
  }

  return workingDaysOneWeek;
}

function getWeekdayBeginning(monthStart, dayStart, yearStart) {
  // let dateBeginning = new Date(monthStart + ' ' + dayStart + ' ' + yearStart);
  let dateBeginning = new Date(yearStart, --monthStart, dayStart);  // changed to below line since found this function constructor in the web
  return dateBeginning.getDay();
}

function getWeekdayEnd(monthEnd, dayEnd, yearEnd) {
  // let dateEnd = new Date(monthEnd + ' ' + dayEnd + ' ' + yearEnd);           // changed to below line since found this function constructor in the web
  let dateEnd = new Date(yearEnd, --monthEnd, dayEnd);
  return dateEnd.getDay();
}

function countWorkingDaysFirstWeek(weekdayBeginning) {
  switch (weekdayBeginning) {
    case 0:
    case 1:                                              //case 1: Do not return 5 since it is already counted in full weeks
    case 6:
      return 0;

    case 2:
      return 4;

    case 3:
      return 3;

    case 4:
      return 2;

    case 5:
      return 1;

    default:
      alert('Error in countWorkingDaysFirstWeek');
  }
}

function countWorkingDaysLastWeek(weekdayEnd) {

  switch (weekdayEnd) {
    case 0:
    case 6:
      return 5;
  
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      weekdayEnd--
      return weekdayEnd;
  
    default:
      alert('Error in countWorkingDaysLastWeek');
  }
}

function countDaysToRemoveFromBeginning(weekdayBeginning) {
  
  switch (weekdayBeginning) {
    case 0:
      return 1;

    case 1:
      return 0;

    case 2:
      return 6;

    case 3:
      return 5;

    case 4:
      return 4;

    case 5:
      return 3;

    case 6:
      return 2;

    default:
      alert('Error in countDaysToRemoveFromBeginning');
  }
}

function countDaysToRemoveFromEnd(weekdayEnd) {

  if (weekdayEnd == 0) {
    weekdayEnd = 6;
  } else{
    weekdayEnd--;
  }
  
  switch (weekdayEnd) {       //-1 because not counting last day
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return weekdayEnd;
  
    default:
      alert('Error in countDaysToRemoveFromEnd');
  }
}
/***********************************************************Calculate working days end*******************************************************/

/***********************************************************Calculate working days excluding public holidays start*******************************************************/

function excludePublicHolidays(workingDaysQuantity, yearStart, yearEnd, monthStart, monthEnd, dayStart, dayEnd) {

  if (yearStart < 2016 || yearEnd > 2026) {alert('Atsiprašome darbo dienos skaičiuojamos tik 2016 - 2026 metams');return;}

  let fromDate = new Date(yearStart, monthStart - 1, dayStart);
  let toDate   = new Date(yearEnd, monthEnd - 1, dayEnd);
  let checkDate;

  for (let i = 0; i < arrNationalholidays.length; i++) {

    if (arrNationalholidays[i][0] < yearStart || arrNationalholidays[i][0] > yearEnd) {continue;}

    checkDate = new Date(arrNationalholidays[i][0], arrNationalholidays[i][1] - 1, arrNationalholidays[i][2]);

    if (checkDate >= fromDate && checkDate < toDate) {
      // console.log(arrNationalholidays[i][0] + ' ' + arrNationalholidays[i][1] + ' ' + arrNationalholidays[i][2]);
      workingDaysQuantity--;
    }
  }

return workingDaysQuantity;

}

/***********************************************************Calculate working days excluding public holidays end*******************************************************/

/***********************************************************National holidays start*******************************************************/

var arrNationalholidays = [];                                                                       //Already excluded weekends

addNationalHolidays();


function addNationalHolidays() {

  arrNationalholidays.push([2016, 1, 1, 'Naujųjų metų diena']);
  arrNationalholidays.push([2016, 2, 16, 'Lietuvos valstybės atkūrimo diena']);                       
  arrNationalholidays.push([2016, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2016, 3, 28, 'Šv. Velykų antroji diena']);                                //!!! Day which is not same every year. First day is always on Sunday
  // arrNationalholidays.push([2016, 5, 1, 'Tarptautinė darbo diena']);                               //Day in weekend
  arrNationalholidays.push([2016, 6, 24, 'Rasos ir Joninių diena']);
  arrNationalholidays.push([2016, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  arrNationalholidays.push([2016, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2016, 11, 1, 'Visų Šventųjų diena']);
  // arrNationalholidays.push([2016, 12, 24, 'Šv. Kūčių diena']);                                     //Day in weekend
  // arrNationalholidays.push([2016, 12, 25, 'Šv. Kalėdų diena']);                                    //Day in weekend
  arrNationalholidays.push([2016, 12, 26, 'Šv. Kalėdų antroji diena']);

  // arrNationalholidays.push([2017, 1, 1, 'Naujųjų metų diena']);                                    //Day in weekend
  arrNationalholidays.push([2017, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  // arrNationalholidays.push([2017, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);             //Day in weekend
  arrNationalholidays.push([2017, 4, 17, 'Šv. Velykų antroji diena']);                                //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2017, 5, 1, 'Tarptautinė darbo diena']);
  // arrNationalholidays.push([2017, 6, 24, 'Rasos ir Joninių diena']);                               //Day in weekend
  arrNationalholidays.push([2017, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  arrNationalholidays.push([2017, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2017, 11, 1, 'Visų Šventųjų diena']);
  // arrNationalholidays.push([2017, 12, 24, 'Šv. Kūčių diena']);                                     //Day in weekend
  arrNationalholidays.push([2017, 12, 25, 'Šv. Kalėdų diena']);
  arrNationalholidays.push([2017, 12, 26, 'Šv. Kalėdų antroji diena']);

  arrNationalholidays.push([2018, 1, 1, 'Naujųjų metų diena']);
  arrNationalholidays.push([2018, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  // arrNationalholidays.push([2018, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);             //Day in weekend
  arrNationalholidays.push([2018, 4, 2, 'Šv. Velykų antroji diena']);                 //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2018, 5, 1, 'Tarptautinė darbo diena']);
  // arrNationalholidays.push([2018, 6, 24, 'Rasos ir Joninių diena']);                               //Day in weekend
  arrNationalholidays.push([2018, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  arrNationalholidays.push([2018, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2018, 11, 1, 'Visų Šventųjų diena']);
  arrNationalholidays.push([2018, 12, 24, 'Šv. Kūčių diena']);
  arrNationalholidays.push([2018, 12, 25, 'Šv. Kalėdų diena']);
  arrNationalholidays.push([2018, 12, 26, 'Šv. Kalėdų antroji diena']);

  arrNationalholidays.push([2019, 1, 1, 'Naujųjų metų diena']);
  // arrNationalholidays.push([2019, 2, 16, 'Lietuvos valstybės atkūrimo diena']);                          //Day in weekend
  arrNationalholidays.push([2019, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2019, 4, 22, 'Šv. Velykų antroji diena']);                                      //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2019, 5, 1, 'Tarptautinė darbo diena']);
  arrNationalholidays.push([2019, 6, 24, 'Rasos ir Joninių diena']);
  // arrNationalholidays.push([2019, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);    //Day in weekend
  arrNationalholidays.push([2019, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2019, 11, 1, 'Visų Šventųjų diena']);
  arrNationalholidays.push([2019, 12, 24, 'Šv. Kūčių diena']);
  arrNationalholidays.push([2019, 12, 25, 'Šv. Kalėdų diena']);
  arrNationalholidays.push([2019, 12, 26, 'Šv. Kalėdų antroji diena']);

  arrNationalholidays.push([2020, 1, 1, 'Naujųjų metų diena']);
  // arrNationalholidays.push([2020, 2, 16, 'Lietuvos valstybės atkūrimo diena']);                          //Day in weekend
  arrNationalholidays.push([2020, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2020, 4, 13, 'Šv. Velykų antroji diena']);                                      //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2020, 5, 1, 'Tarptautinė darbo diena']);
  arrNationalholidays.push([2020, 6, 24, 'Rasos ir Joninių diena']);
  arrNationalholidays.push([2020, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  // arrNationalholidays.push([2020, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);         //Day in weekend
  // arrNationalholidays.push([2020, 11, 1, 'Visų Šventųjų diena']);                                        //Day in weekend
  arrNationalholidays.push([2020, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                            //!!! Day which is not same every year. 
  arrNationalholidays.push([2020, 12, 24, 'Šv. Kūčių diena']);
  arrNationalholidays.push([2020, 12, 25, 'Šv. Kalėdų diena']);
  // arrNationalholidays.push([2020, 12, 26, 'Šv. Kalėdų antroji diena']);                                  //Day in weekend

  arrNationalholidays.push([2021, 1, 1, 'Naujųjų metų diena']);
  arrNationalholidays.push([2021, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  arrNationalholidays.push([2021, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2021, 4, 5, 'Velykų antroji diena']);                                           //!!! Day which is not same every year. First day is always on Sunday
  // arrNationalholidays.push([2021, 5, 1, 'Tarptautinė darbo diena']);                                     //Day in weekend
  arrNationalholidays.push([2021, 6, 24, 'Rasos ir Joninių diena']);
  arrNationalholidays.push([2021, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  // arrNationalholidays.push([2021, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);         //Day in weekend
  arrNationalholidays.push([2021, 11, 1, 'Visų Šventųjų diena']);
  arrNationalholidays.push([2021, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                            //!!! Day which is not same every year. 
  arrNationalholidays.push([2021, 12, 24, 'Šv. Kūčių diena']);
  // arrNationalholidays.push([2021, 12, 25, 'Šv. Kalėdų diena']);                                          //Day in weekend
  // arrNationalholidays.push([2021, 12, 26, 'Šv. Kalėdų antroji diena']);                                  //Day in weekend

  // arrNationalholidays.push([2022, 1, 1, 'Naujųjų metų diena']);                                          //Day in weekend
  arrNationalholidays.push([2022, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  arrNationalholidays.push([2022, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2022, 4, 18, 'Velykų antroji diena']);                                          //!!! Day which is not same every year. First day is always on Sunday
  // arrNationalholidays.push([2022, 5, 1, 'Tarptautinė darbo diena']);                                     //Day in weekend
  arrNationalholidays.push([2022, 6, 24, 'Rasos ir Joninių diena']);
  arrNationalholidays.push([2022, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  arrNationalholidays.push([2022, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2022, 11, 1, 'Visų Šventųjų diena']);
  arrNationalholidays.push([2022, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                            //!!! Day which is not same every year. 
  // arrNationalholidays.push([2022, 12, 24, 'Šv. Kūčių diena']);                                           //Day in weekend
  // arrNationalholidays.push([2022, 12, 25, 'Šv. Kalėdų diena']);                                          //Day in weekend
  arrNationalholidays.push([2022, 12, 26, 'Šv. Kalėdų antroji diena']);

  // arrNationalholidays.push([2023, 1, 1, 'Naujųjų metų diena']);                                          //Day in weekend
  arrNationalholidays.push([2023, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  // arrNationalholidays.push([2023, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);                   //Day in weekend
  arrNationalholidays.push([2023, 4, 10, 'Velykų antroji diena']);                                          //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2023, 5, 1, 'Tarptautinė darbo diena']);
  // arrNationalholidays.push([2023, 6, 24, 'Rasos ir Joninių diena']);                                     //Day in weekend
  arrNationalholidays.push([2023, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  arrNationalholidays.push([2023, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2023, 11, 1, 'Visų Šventųjų diena']);
  arrNationalholidays.push([2023, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                            //!!! Day which is not same every year. 
  // arrNationalholidays.push([2023, 12, 24, 'Šv. Kūčių diena']);                                           //Day in weekend
  arrNationalholidays.push([2023, 12, 25, 'Šv. Kalėdų diena']);
  arrNationalholidays.push([2023, 12, 26, 'Šv. Kalėdų antroji diena']);

  arrNationalholidays.push([2024, 1, 1, 'Naujųjų metų diena']);
  arrNationalholidays.push([2024, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  arrNationalholidays.push([2024, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2024, 4, 1, 'Velykų antroji diena']);                                           //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2024, 5, 1, 'Tarptautinė darbo diena']);
  arrNationalholidays.push([2024, 6, 24, 'Rasos ir Joninių diena']);
  // arrNationalholidays.push([2024, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);    //Day in weekend
  arrNationalholidays.push([2024, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  arrNationalholidays.push([2024, 11, 1, 'Visų Šventųjų diena']);
  // arrNationalholidays.push([2024, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                         //!!! Day which is not same every year. Commented because it is Saturday
  arrNationalholidays.push([2024, 12, 24, 'Šv. Kūčių diena']);
  arrNationalholidays.push([2024, 12, 25, 'Šv. Kalėdų diena']);
  arrNationalholidays.push([2024, 12, 26, 'Šv. Kalėdų antroji diena']);

  arrNationalholidays.push([2025, 1, 1, 'Naujųjų metų diena']);
  // arrNationalholidays.push([2025, 2, 16, 'Lietuvos valstybės atkūrimo diena']);                          //Day in weekend
  arrNationalholidays.push([2025, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2025, 4, 11, 'Velykų antroji diena']);                                          //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2025, 5, 1, 'Tarptautinė darbo diena']);
  arrNationalholidays.push([2025, 6, 24, 'Rasos ir Joninių diena']);
  // arrNationalholidays.push([2025, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);    //Day in weekend
  arrNationalholidays.push([2025, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);
  // arrNationalholidays.push([2025, 11, 1, 'Visų Šventųjų diena']);                                        //Day in weekend
  // arrNationalholidays.push([2025, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                         //!!! Day which is not same every year. Commented because it is Sunday
  arrNationalholidays.push([2025, 12, 24, 'Šv. Kūčių diena']);
  arrNationalholidays.push([2025, 12, 25, 'Šv. Kalėdų diena']);
  arrNationalholidays.push([2025, 12, 26, 'Šv. Kalėdų antroji diena']);

  arrNationalholidays.push([2026, 1, 1, 'Naujųjų metų diena']);
  arrNationalholidays.push([2026, 2, 16, 'Lietuvos valstybės atkūrimo diena']);
  arrNationalholidays.push([2026, 3, 11, 'Lietuvos nepriklausomybės atkūrimo diena']);
  arrNationalholidays.push([2026, 4, 6, 'Velykų antroji diena']);                                           //!!! Day which is not same every year. First day is always on Sunday
  arrNationalholidays.push([2026, 5, 1, 'Tarptautinė darbo diena']);
  arrNationalholidays.push([2026, 6, 24, 'Rasos ir Joninių diena']);
  arrNationalholidays.push([2026, 7, 6, 'Valstybės (Lietuvos karaliaus Mindaugo karūnavimo) diena']);
  // arrNationalholidays.push([2026, 8, 15, 'Žolinė (Švč. Mergelės Marijos ėmimo į dangų diena)']);         //Day in weekend
  // arrNationalholidays.push([2026, 11, 1, 'Visų Šventųjų diena']);                                        //Day in weekend
  arrNationalholidays.push([2026, 11, 2, 'Mirusiųjų atminimo (Vėlinių) diena']);                            //!!! Day which is not same every year. 
  arrNationalholidays.push([2026, 12, 24, 'Šv. Kūčių diena']);
  arrNationalholidays.push([2026, 12, 25, 'Šv. Kalėdų diena']);
  // arrNationalholidays.push([2026, 12, 26, 'Šv. Kalėdų antroji diena']);                                  //Day in weekend

}








//***********************************************************National holidays end*******************************************************/

//***********************************************************Menu start*******************************************************/

function menuClick() {

  document.getElementById("hamburgerCube").style.transform = "rotateX(90deg)";
  document.getElementById("menuLines").style.opacity = 0;
  document.getElementById("menuExit").style.opacity = 1;
  // document.getElementById("menuItems").style.transform = "scale(1)";

  // document.getElementById("cubeContainer1").style.animation = "cubeContainer1ExitAnimation 1s";
  // document.getElementById("cube1").style.transition = "all 2s ease";
  let cube1rotation = arrRotateXDegree[0] - 50;
  let cube2rotation = arrRotateXDegree[1] + 50;
  let cube3rotation = arrRotateXDegree[2] - 50;
  let cube4rotation = arrRotateXDegree[3] + 50;
  let cube5rotation = arrRotateXDegree[4] - 180;
  let cube6rotation = arrRotateXDegree[5] + 50;
  document.getElementsByClassName('cube')[0].style.transition = '2s';
  document.getElementsByClassName('cube')[1].style.transition = '2s';
  document.getElementsByClassName('cube')[2].style.transition = '2s';
  document.getElementsByClassName('cube')[3].style.transition = '2s';
  document.getElementsByClassName('cube')[4].style.transition = '2s';
  document.getElementsByClassName('cube')[4].style.transitionDelay = '0.1s';
  document.getElementsByClassName('cube')[5].style.transition = '2s';

  document.getElementById('cube1').style.transform = 'rotate3d(0.1,1,0,-175deg) rotateX(' + cube1rotation + 'deg)';
  document.getElementById('cubeContainer1').style.left = '-500px';
  document.getElementById('cube2').style.transform = 'rotate3d(0.1,1,0,-75deg) rotateX(' + cube2rotation + 'deg)' + 'scale3d(0, 0, 0)';
  document.getElementById('cube3').style.transform = 'rotate3d(0.1,1,0,-75deg) rotateX(' + cube3rotation + 'deg)';
  document.getElementById('cubeContainer3').style.left = '500px';
  document.getElementById('cube4').style.transform = 'rotate3d(0.1,1,0,75deg) rotateX(' + cube4rotation + 'deg)';
  document.getElementById('cubeContainer4').style.left = '-500px';
  document.getElementById('cube5').style.transform = 'rotate3d(0.1,1,0,0deg) rotateX(' + cube5rotation + 'deg)' + 'scale3d(10, 10, 10)';
  // document.getElementById('cubeContainer5').style.top = '-500px';
  document.getElementById('cube6').style.transform = 'rotate3d(0.1,1,0,75deg) rotateX(' + cube6rotation + 'deg)';
  document.getElementById('cubeContainer6').style.left = '500px';
  document.getElementById('rectangularScene').style.transform = 'scale3d(0.1, 0.1, 0.1)';

  // document.getElementById('menuOverlay').style.backgroundColor = 'rgba(102, 51, 153, 1)';
}

function menuExitClick() {

  document.getElementById("hamburgerCube").style.transform = "rotateX(0)";
  document.getElementById("menuLines").style.opacity = 1;
  document.getElementById("menuExit").style.opacity = 0;
  // document.getElementById("menuItems").style.transform = "scale(0)";

  document.getElementsByClassName('cube')[0].style.transition = '0.5s';
  document.getElementsByClassName('cube')[0].style.transitionDelay = '0.2s';
  document.getElementsByClassName('cube')[1].style.transition = '0.5s';
  document.getElementsByClassName('cube')[2].style.transition = '0.5s';
  document.getElementsByClassName('cube')[3].style.transition = '0.5s';
  document.getElementsByClassName('cube')[4].style.transition = '0.5s';
  document.getElementsByClassName('cube')[5].style.transition = '0.5s';

  document.getElementById('cubeContainer1').style.left = '0';

  document.getElementById('cube1').style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[0] + 'deg)';
  document.getElementById('cube2').style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[1] + 'deg)' + 'scale3d(1, 1, 1)';
  document.getElementById('cube3').style.transform = 'rotate3d(0.1,1,0,-18deg) rotateX(' + arrRotateXDegree[2] + 'deg)';
  document.getElementById('cubeContainer3').style.left = '0';
  document.getElementById('cube4').style.transform = 'rotate3d(0.1,1,0,18deg) rotateX(' + arrRotateXDegree[3]  + 'deg)';
  document.getElementById('cubeContainer4').style.left = '0';
  document.getElementById('cube5').style.transform = 'rotate3d(0.1, 1, 0, 18deg) rotateX(' + arrRotateXDegree[4] + 'deg)' + 'scale3d(1, 1, 1)';
  document.getElementById('cube6').style.transform = 'rotate3d(0.1,1,0,18deg) rotateX(' + arrRotateXDegree[5] + 'deg)';
  document.getElementById('cubeContainer6').style.left = '0';
  document.getElementById('rectangularScene').style.transform = 'scale3d(1, 1, 1)';



}

//***********************************************************Menu end*******************************************************/
