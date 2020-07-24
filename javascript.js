"use strict";

/*
Notes:
1. Calculation does not include last day.
*/

var yearNumber = new Date().getFullYear();
var monthNumber = (new Date().getMonth()) + 1;
var dayNumber = new Date().getDate();

let dayFromTag = document.getElementsByClassName("day");
let dayFromTagChildren = dayFromTag[0].children;
dayFromTagChildren[1].innerText = dayNumber;


let monthFromTag = document.getElementsByClassName("month");
let monthFromTagChildren = monthFromTag[0].children;
monthFromTagChildren[1].innerText = monthNumber;

let yearFromTag = document.getElementsByClassName("year");
let yearFromTagChildren = yearFromTag[0].children;
yearFromTagChildren[1].innerText = yearNumber;


window.ontouchstart = function(event){                              /*For Iphone !!!!!!!!!!!!!!! not updated*/ 

  let modalDay = document.getElementById("modalWindowChooseDay");
  let modalMonth = document.getElementById("modalWindowChooseMonth");
  let modalYear = document.getElementById("modalWindowChooseYear");

  if (event.target == modalDay) {
    animationHideModal(modalDay);
  }
  if (event.target == modalMonth) {
    animationMonthHideModal(modalMonth);
  }
  if (event.target == modalYear) {
    animationYearHideModal(modalYear);
  }



}

daySelector(document.getElementsByClassName("number")[0]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!for test





/* Start________________________________________________________________________Modal_day________________________________________________________________ */

var day;
var sourceClassName;
var requestId;
var maxDaysInMonth;
var enumCubeSides;

function daySelector(element){

  enumCubeSides = 0;

  startCanvas();

  sourceClassName = element.parentElement.parentElement.className;
  day = element;

  let modal = document.getElementById("modalWindowChooseDay");

  modal.className = "modalWindowChooseDay";
  modal.style.display = "block";
  document.getElementById("canvasDay").className = "canvasDay";
  document.getElementById("exitButtonContainer").className = "exitButtonContainer";
  document.getElementById("cube").className = "cube";
  document.getElementById("arrowUp").className = "arrowUp";
  document.getElementById("arrowDown").className = "arrowDown";
  document.getElementById("arrowLeft").className = "arrowLeft";
  document.getElementById("arrowRight").className = "arrowRight";

  fillCubeNumbers();


}
function fillCubeNumbers(){
  let dayNumber = Number(document.getElementsByClassName(sourceClassName)[0].children[0].children[1].innerText);
  maxDaysInMonth = getDaysfromMonthAndYear(Number(document.getElementsByClassName(sourceClassName)[0].children[1].children[1].innerText), Number(document.getElementsByClassName(sourceClassName)[0].children[2].children[1].innerText));

  document.getElementsByClassName("cubeSideFrontText")[0].innerText = dayNumber;


  if(dayNumber == maxDaysInMonth){dayNumber = 0};
  document.getElementsByClassName("cubeSideTopText")[0].innerText = 1 + dayNumber;

  if(dayNumber == maxDaysInMonth){dayNumber = -1};
  document.getElementsByClassName("cubeSideBackText")[0].innerText = 2 + dayNumber;

  if(dayNumber == maxDaysInMonth){dayNumber = -4};
  document.getElementsByClassName("cubeSideRightText")[0].innerText = maxDaysInMonth;

  let monthNumberForCube = Number(document.getElementsByClassName(sourceClassName)[0].children[1].children[1].innerText);

  if(dayNumber == 1){

    if(monthNumberForCube == 1){
      dayNumber == 31 + 1;
    } else{
      let yearNumberForCube = Number(document.getElementsByClassName(sourceClassName)[0].children[2].children[1].innerText) - 1;
      maxDaysInMonth = getDaysfromMonthAndYear(monthNumberForCube - 1, yearNumberForCube);
      dayNumber = maxDaysInMonth + 1;
    }
    
  };
  document.getElementsByClassName("cubeSideBottomText")[0].innerText = dayNumber - 1;

}


function startCanvas(){
  if (!requestId) {
    requestId = window.requestAnimationFrame(animate);
  }
}

function dayChange(newSelectedDay){
  day.innerText = newSelectedDay.innerText;

  let modal = document.getElementById("modalWindowChooseDay");
  animationHideModal(modal);
  // modal.style.display = "none";
}

function animationHideModalDayWindow(){
  document.getElementById("modalWindowChooseDay").className = "canvasAnimatingOut";
  document.getElementById("canvasDay").className = "canvasAnimatingOut";
  document.getElementById("exitButtonContainer").className = "canvasAnimatingOut";
  document.getElementById("cube").className = "canvasAnimatingOut";
  document.getElementById("arrowUp").className = "canvasAnimatingOut";
  document.getElementById("arrowDown").className = "canvasAnimatingOut";
  document.getElementById("arrowLeft").className = "canvasAnimatingOut";
  document.getElementById("arrowRight").className = "canvasAnimatingOut";

  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }

}

/* End________________________________________________________________________Modal_day________________________________________________________________ */


/* Start________________________________________________________________________Modal_month________________________________________________________________ */

var month;

function monthSelector(element){

  sourceClassName = element.parentElement.parentElement.className;

  month = element;

  let modal = document.getElementById("modalWindowChooseMonth");

  modal.children[0].className = "modalWindowMonthContainer";
  modal.className = "modalWindowChooseMonth";
  modal.style.display = "block";
}

function monthChange(newSelectedMonth){

  month.innerText = newSelectedMonth.innerText;

  adjustDaysNumbersAccToMonth(newSelectedMonth, sourceClassName);

  let modal = document.getElementById("modalWindowChooseMonth");
  animationMonthHideModal(modal);

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

function animationMonthHideModal(modal){
  modal.children[0].className = "modalMonthAnimatingOut";
  modal.className = "modalBackgroundOut";
}

/* End________________________________________________________________________Modal_month________________________________________________________________ */



/* Start________________________________________________________________________Modal_year________________________________________________________________ */

var year;

function yearSelector(element){
  sourceClassName = element.parentElement.parentElement.className;

  year = element;

  let modal = document.getElementById("modalWindowChooseYear");

  // modal.className = "modalWindowChooseYear";
  // modal.children[0].className = "modalYearVerticalChoice";
  modal.style.display = "block";

  // let yearElementInScroll = document.getElementsByClassName("yearItem");

  // for(let i = 0; i < yearElementInScroll.length; i++){
  //   if (year.innerText == yearElementInScroll[i].innerText){
  //     yearElementInScroll[i].scrollIntoView();
  //   }
  // }


}

function yearChange(newSelectedYear){

  let dayShouldBeChecked = false;
  let newSelectedYearIsLeapYear = isLeapYearCheck(newSelectedYear.innerText);

  if(isLeapYearCheck(year.innerText) != newSelectedYearIsLeapYear){
    dayShouldBeChecked = true;
  }

  year.innerText = newSelectedYear.innerText;

  if(sourceClassName == "dateFrom"){
   
    if ((dayShouldBeChecked) && (document.getElementsByClassName("dateFrom")[0].children[1].children[1].innerText == "2")){

      let modalDaysElements = document.getElementById("modalDays");

      if (newSelectedYearIsLeapYear){
        
        let lastDay = modalDaysElements.children.length;
        let liItem = modalDaysElements.lastElementChild.cloneNode(true);
        modalDaysElements.appendChild(liItem);
        modalDaysElements.lastElementChild.innerText = lastDay + 1;


      }else{

        modalDaysElements.removeChild(modalDaysElements.lastElementChild);

        if (document.getElementsByClassName("dateFrom")[0].children[1].children[0].innerText == "29"){

          document.getElementsByClassName("dateFrom")[0].children[1].children[0].innerText = "28";
        }

      }

    }


  }else{
  
    if ((dayShouldBeChecked) && (document.getElementsByClassName("dateTo")[0].children[1].children[1].innerText == "2")){

      let modalDaysElements = document.getElementById("modalDays");

      if (newSelectedYearIsLeapYear){
        
        let lastDay = modalDaysElements.children.length;
        let liItem = modalDaysElements.lastElementChild.cloneNode(true);
        modalDaysElements.appendChild(liItem);
        modalDaysElements.lastElementChild.innerText = lastDay + 1;


      }else{

        modalDaysElements.removeChild(modalDaysElements.lastElementChild);

        if (document.getElementsByClassName("dateTo")[0].children[1].children[0].innerText == "29"){

          document.getElementsByClassName("dateTo")[0].children[1].children[0].innerText = "28";
        }
      }
    }
  }

  let modal = document.getElementById("modalWindowChooseYear");
  animationYearHideModal(modal);
}

function animationYearHideModal(modal){
  modal.className = "modalBackgroundOut";
  modal.children[0].className = "modalYearAnimatingOut";
}

/* End________________________________________________________________________Modal_year________________________________________________________________ */

function calculateResult(){

  let dateFrom, dateTo;

  let bReverseDate = bDateShouldBeReversed();           //just for test

  if (bReverseDate != true && bReverseDate != false) {  //just for test
    alert("Error in bDateShouldBeReversed() !!!!!!");
    alert("Error in bDateShouldBeReversed() !!!!!!");
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

  let result = document.getElementsByClassName("result");
  // result[0].innerText = "Data nuo: " + dateFrom + " iki: " + dateTo; 
  result[0].innerText = "Dienų skaičius: " + daysQuantity; 


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

// let arrayMonthAndDays = [
//   [31],
//   [28],
//   [31],
//   [30],
//   [31],
//   [30],
//   [31],
//   [31],
//   [30],
//   [31],
//   [30],
//   [31],
// ];
var scrollCounter = 0;
var btouchEnded = false;
function scrollAddMoreYears(){
  // scrollCounter += 1;

  let scrollHeight = document.getElementById("modalYearVerticalChoice").scrollHeight;
  let offsetHeight = document.getElementById("modalYearVerticalChoice").offsetHeight;
  let clientHeight = document.getElementById("modalYearVerticalChoice").clientHeight;

  let scrollTop = document.getElementById("modalYearVerticalChoice").scrollTop;
  let scrollDifference = scrollHeight - clientHeight - scrollTop;

  if (scrollTop > 50 && scrollDifference > 5) {return;}; //scrollDifference > 5 "5" for firefox android users


  if (scrollTop <= 50) {
    createPastYearTags();

  //   while(!btouchEnded){ //for Iphone since Iphone has specific scroll, which changes after finger is released.
  //     scrollCounter += 1
  //     if (scrollCounter == 10000000){
  //       alert(btouchEnded);
  //       return;
  //     }
  //   }
  //   alert(btouchEnded);
  //   btouchEnded == false;
   
  // alert("done");
    return;
  }

  if (scrollDifference <= 5) {
    createFutureYearTags(scrollHeight);
  };
}

async function bTouchEnded(){
  // alert("touchEnded");
  btouchEnded == true;
}

function getFirstYear(){
  let modalYearVerticalChoice = document.getElementById("modalYearVerticalChoice");
  return modalYearVerticalChoice.children[0].innerText;
}

function getLastYear(){
  let modalYearVerticalChoice = document.getElementById("modalYearVerticalChoice");
  return modalYearVerticalChoice.children[modalYearVerticalChoice.children.length - 1].innerText;
}


function createPastYearTags(){
  // Start *****Calculating year*********
  let firstYearText = getFirstYear();
  let yearNumber = Number(firstYearText);

  if (yearNumber < 11){return;};

  let list;

  let liElement = document.createElement("div");  //"let" here allows to add onclick event to trigger yearChange
  liElement.className = "yearItem";
  liElement.onclick = function (){yearChange(liElement);};
  let lastYear = yearNumber - 10;

  liElement.appendChild(document.createTextNode(lastYear));

  list = document.getElementById("modalYearVerticalChoice");
  list.insertBefore(liElement, list.childNodes[0].nextSibling);

  for (let i = 0; i < 9; i++){

    let liElement2 = document.createElement("div");  //"let" here allows to add onclick event to trigger yearChange
    liElement2.className = "yearItem";
    liElement2.onclick = function (){yearChange(liElement2);};
    
    liElement2.appendChild(document.createTextNode(++lastYear));


    list.insertBefore(liElement2, list.childNodes[i].nextSibling.nextSibling);
  
  }
  let yearElementInScroll = document.getElementsByClassName("yearItem");

  for(let i = 0; i < yearElementInScroll.length; i++){
    if (firstYearText == yearElementInScroll[i].innerText){
      yearElementInScroll[i].scrollIntoView();
      return;
    }
  }
  // list.scrollTop = 530;
}

function createFutureYearTags(scrollHeight){
  // Start *****Calculating year*********

  let yearNumber = Number(getLastYear());
  let list;

  for (let i = 0; i < 11; i++){
    let liElement = document.createElement("div");  //"let" here allows to add onclick event to trigger yearChange
    liElement.className = "yearItem";
    liElement.onclick = function (){yearChange(liElement);};
   
    liElement.appendChild(document.createTextNode(++yearNumber));

    list = document.getElementById("modalYearVerticalChoice");
    list.appendChild(liElement);

  }

  // document.getElementById("modalYearVerticalChoice").scrollTop = scrollHeight - 50;

}

// Start********************************************3D cube*******************************************

var rotateY = -25;
var rotateX = 0;
var rotateZ = 0;
var rotateRightSideDeg = 0;
var rotateLeftSideDeg = 0;
var rotateBottomSideDeg = 0;
var rotateTopSideDeg = 0;
var rotateFrontSideDeg = 0;
var rotateBackSideDeg = 0;

var cubePoints = [
[0,0,0],
[1,0,0],
[1,1,0],
[0,1,0],
[0,0,1],
[1,0,1],
[1,1,1],
[0,1,1]
];

var arrBottomLine = [0, 0];

function moveUp(){

  // rotateRightSideDeg += 90;
  // rotateLeftSideDeg -= 90;

  // document.querySelector('.cubeSideRightText').style.transform = 'rotate('+ rotateRightSideDeg +  'deg)';
  // document.querySelector('.cubeSideLeftText').style.transform = 'rotate('+ rotateLeftSideDeg +  'deg)';
  console.log("A: " + getPointA());
  console.log("B: " + getPointB());
  console.log("");

  rotate('X', '-90');

  // moveUpRotation();

  // changeCubePointsUp();
  console.log("");

}

function moveUpRotation(){
  if (bBottomLineIsAtPoints(0, 1) || bBottomLineIsAtPoints(4, 5) || bBottomLineIsAtPoints(7, 6) || bBottomLineIsAtPoints(3, 2)) {
    rotateX -= 90;

    document.querySelector('.cube').style.transform =
    'rotateY(' + rotateY + 'deg)' +
    'rotateX(' + rotateX + 'deg)';

  } else if (bBottomLineIsAtPoints(1, 0) || bBottomLineIsAtPoints(5, 4) || bBottomLineIsAtPoints(6, 7) || bBottomLineIsAtPoints(2, 3)) {
    rotateX += 90;
    document.querySelector('.cube').style.transform =
    'rotateY(' + rotateY + 'deg)' +
    'rotateX(' + rotateX + 'deg)';
    
  } else if(bBottomLineIsAtPoints(1, 5) || bBottomLineIsAtPoints(0, 4) || bBottomLineIsAtPoints(3, 7) || bBottomLineIsAtPoints(2, 6)){

    rotateY += 0;
    rotateZ += 90;
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateZ(' + rotateZ + 'deg)';

  } else if(bBottomLineIsAtPoints(5, 1) || bBottomLineIsAtPoints(4, 0) || bBottomLineIsAtPoints(7, 3) || bBottomLineIsAtPoints(6, 2)){
    rotateY += 0;
    rotateZ -= 90;
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateZ(' + rotateZ + 'deg)';
  }
}

function moveDown(){
  console.log("A: " + getPointA());
  console.log("B: " + getPointB());
  console.log("");

  // let firstDayNumber = Number(document.getElementsByClassName(sourceClassName)[0].children[0].children[1].innerText);
  // document.getElementsByClassName("cubeSideBottomText")[0].innerText = firstDayNumber - 1;
  rotate('X', '90');
  // getBottomLine();

  // moveDownRotation();

  // changeCubePointsDown();
  
}

function rotate(axis, degrees) {
  let outermostRotator = document.getElementsByClassName("cube").item(0);
  //outermostRotator.style.transform = 'rotateY(0deg)';
  outermostRotator.outerHTML = `<div class='cube' id='container' style="transition: 1s; transform-style: preserve-3d; transform: rotate${axis}(0deg); position: relative; transition-timing-function: ease-in-out; width: inherit; height: inherit; ">${outermostRotator.outerHTML}</div>`;
  window.setTimeout(function () {
      container.style.transform = `rotateY(-20deg) rotate${axis}(${degrees}deg)`;
      container.removeAttribute('id');
  }, 1000);

}

function moveDownRotation(){

  if (bBottomLineIsAtPoints(0, 1) || bBottomLineIsAtPoints(4, 5) || bBottomLineIsAtPoints(7, 6) || bBottomLineIsAtPoints(3, 2)) {

    rotateX += 90;            //rotate whole cube
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' +
    'rotateX(' + rotateX + 'deg)';

    // rotateRightSideDeg -= 90; //rotate only side faces
    // rotateLeftSideDeg += 90;
    // document.querySelector('.cubeSideRightText').style.transform = 'rotate('+ rotateRightSideDeg +  'deg)';
    // document.querySelector('.cubeSideLeftText').style.transform = 'rotate('+ rotateLeftSideDeg +  'deg)';
  } else if (bBottomLineIsAtPoints(1, 0) || bBottomLineIsAtPoints(5, 4) || bBottomLineIsAtPoints(6, 7) || bBottomLineIsAtPoints(2, 3)) {
    rotateX -= 90;
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateX(' + rotateX + 'deg)';
    
  } else if(bBottomLineIsAtPoints(1, 5) || bBottomLineIsAtPoints(0, 4) || bBottomLineIsAtPoints(3, 7) || bBottomLineIsAtPoints(2, 6)){

    rotateY += 0;
    rotateZ -= 90;
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateZ(' + rotateZ + 'deg)';

  } else if(bBottomLineIsAtPoints(5, 1) || bBottomLineIsAtPoints(4, 0) || bBottomLineIsAtPoints(7, 3) || bBottomLineIsAtPoints(6, 2)){
    rotateY -= 0;
    rotateZ += 90;
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateZ(' + rotateZ + 'deg)';

  } else if(bBottomLineIsAtPoints(1, 2) || bBottomLineIsAtPoints(5, 6) || bBottomLineIsAtPoints(4, 7) || bBottomLineIsAtPoints(0, 3)){
    console.log(111111111111);
    
    console.log("rotateY: " + rotateY);
    console.log("rotateX: " + rotateX);
    console.log("rotateZ: " + rotateZ);
    console.log("");
    
    if (rotateX % 90 == 0){
      rotateY += 115;
      rotateX += 115;
      rotateZ -= 90;

    } else{
      rotateY -= 90;
      rotateX += 0;
    }

    
    console.log("rotateY: " + rotateY);
    console.log("rotateX: " + rotateX);
    console.log("rotateZ: " + rotateZ);
    console.log("");



    document.querySelector('.cube').style.transform =
    'rotateZ(' + rotateZ + 'deg)' +
    'rotateX(' + rotateX + 'deg)' +
    'rotateY(' + rotateY + 'deg)';
  
  } else if(bBottomLineIsAtPoints(2, 1) || bBottomLineIsAtPoints(6, 5) || bBottomLineIsAtPoints(7, 4) || bBottomLineIsAtPoints(3, 0)){
    console.log(22222222222);
    console.log("rotateY: " + rotateY);
    console.log("rotateX: " + rotateX);
    console.log("rotateZ: " + rotateZ);
    console.log("");
    
    if (rotateX % 90 == 0){
      rotateY += 115;
      rotateX += 115;
      rotateZ -= 90;

    } else{
      rotateY += 90;
    }

    
    console.log("rotateY: " + rotateY);
    console.log("rotateX: " + rotateX);
    console.log("rotateZ: " + rotateZ);
    console.log("");



    document.querySelector('.cube').style.transform =
    'rotateZ(' + rotateZ + 'deg)' +
    'rotateX(' + rotateX + 'deg)' +
    'rotateY(' + rotateY + 'deg)';

  }
}

function moveLeft(){
  console.log("A: " + getPointA());
  console.log("B: " + getPointB());
  console.log("");

  rotate('Y', '90');
  // moveLeftRotation();

  // changeCubePointsLeft();
  console.log("");
}

function moveLeftRotation(){
  if (bBottomLineIsAtPoints(0, 1) || bBottomLineIsAtPoints(4, 0) || bBottomLineIsAtPoints(5, 4) || bBottomLineIsAtPoints(1, 5)) {
    rotateY += 90;
console.log("0. moveLeftRotation. rotateX: " + rotateX);
    document.querySelector('.cube').style.transform =
    'rotateY(' + rotateY + 'deg)' +
    'rotateX(' + rotateX + 'deg)';
 
    
  } else if (bBottomLineIsAtPoints(1, 0) || bBottomLineIsAtPoints(2, 1) || bBottomLineIsAtPoints(3, 2) || bBottomLineIsAtPoints(0, 3)) {
    rotateY += 90;

    console.log("1. moveLeftRotation. rotateX: " + rotateX);
    document.querySelector('.cube').style.transform =
    'rotateY(' + rotateY + 'deg)' +
    'rotateX(' + rotateX + 'deg)';
    
  } else if(bBottomLineIsAtPoints(4, 5) || bBottomLineIsAtPoints(7, 4) || bBottomLineIsAtPoints(6, 7) || bBottomLineIsAtPoints(5, 6)){
    rotateY += 90;
    rotateX += 0;
    console.log("2. moveLeftRotation. rotateX: " + rotateX);
    console.log("2. moveLeftRotation. rotateY: " + rotateY);
    console.log("2. moveLeftRotation. rotateZ: " + rotateZ);
    console.log("");

    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateX(' + rotateX + 'deg)';

  } else if(bBottomLineIsAtPoints(1, 2) || bBottomLineIsAtPoints(5, 1) || bBottomLineIsAtPoints(6, 5) || bBottomLineIsAtPoints(2, 6)){
    rotateY += 0;
    rotateZ -= 90;
    console.log("3. moveLeftRotation. rotateY: " + rotateY);
    document.querySelector('.cube').style.transform = 
    'rotateY(' + rotateY + 'deg)' + 
    'rotateZ(' + rotateZ + 'deg)';
  }
}

function moveRight(){
  // var rotateY = 0,
  // rotateX = 0;

  rotateY -= 90;
  rotate('Y', '-90');

  // document.querySelector('.cube').style.transform =
  // 'rotateY(' + rotateY + 'deg)' +
  // 'rotateX(' + rotateX + 'deg)';

  // rotateTopSideDeg -= 90;
  // rotateBottomSideDeg += 90;
  // rotateBackSideDeg += 180;

  // document.querySelector('.cubeSideTopText').style.transform = 'rotate('+ rotateTopSideDeg +  'deg)';
  // document.querySelector('.cubeSideBottomText').style.transform = 'rotate('+ rotateBottomSideDeg +  'deg)';
  // document.querySelector('.cubeSideBackText').style.transform = 'rotate('+ rotateBackSideDeg +  'deg)';

  // changeCubePointsRight();
  console.log("");

}


function getPointA(){
  for (let i = 0; i < cubePoints.length; i++) {
    if (cubePoints[i].toString() == "0,0,0") {
      return i;
    }
  }
}

function getPointB(){
  for (let i = 0; i < cubePoints.length; i++) {
    if (cubePoints[i].toString() == "1,0,0") {
      return i;
    }
  }
}

function getBottomLine(){
  arrBottomLine[0] = getPointA();
  arrBottomLine[1] = getPointB();
}

function bBottomLineIsAtPoints(index1, index2){           //function getBottomLine() should be called before
  if ((arrBottomLine[0] == index1) && (arrBottomLine[1] == index2)) {return true;};
  return false;
}

function changeCubePointsLeft(){

  for (let i = 0; i < cubePoints.length; i++) {
    if (cubePoints[i].toString() == "0,0,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,0,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

      console.log("cubePoints[i]: " + cubePoints[i].toString());
      
  }
}

function changeCubePointsRight(){

  for (let i = 0; i < cubePoints.length; i++) {
    if (cubePoints[i].toString() == "0,0,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,0,1") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,1") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,1") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,1") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

      console.log("cubePoints[i]: " + cubePoints[i].toString());
      
  }
}

function changeCubePointsDown(){
  // [0,0,0],
  // [1,0,0],
  // [1,1,0],
  // [0,1,0],
  // [0,0,1],
  // [1,0,1],
  // [1,1,1],
  // [0,1,1]
  // ];
  
  for (let i = 0; i < cubePoints.length; i++) {
    if (cubePoints[i].toString() == "0,0,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,0,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,1") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,1") {
      // alert("kaka i: " + i + "cubePoints[i].toString(): " + cubePoints[i].toString());
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

      console.log("cubePoints[i]: " + cubePoints[i].toString());
      
  }
  console.log("");
}

function changeCubePointsUp(){

  for (let i = 0; i < cubePoints.length; i++) {
    if (cubePoints[i].toString() == "0,0,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,0") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,0") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 0;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,0,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,0,1") {
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 1;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "1,1,1") {
      // alert("kaka i: " + i + "cubePoints[i].toString(): " + cubePoints[i].toString());
      cubePoints[i][0] = 1;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

    if (cubePoints[i].toString() == "0,1,1") {
      cubePoints[i][0] = 0;
      cubePoints[i][1] = 1;
      cubePoints[i][2] = 0;
      console.log("i:" + i  + ". " + cubePoints[i]);
      continue;
    }

      
  }
}



// End********************************************3D cube*******************************************

// Start********************************************Swipe*******************************************

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

const gestureZone = document.getElementById('cube');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX <= touchstartX) {
        // console.log('Swiped left');
        // rotateY -= 90;

        // document.querySelector('.cube').style.transform =
        // 'rotateY(' + rotateY + 'deg)' +
        // 'rotateX(' + rotateX + 'deg)';
      }
    
    if (touchendX >= touchstartX) {
        // console.log('Swiped right');
        // rotateY += 90;

        // document.querySelector('.cube').style.transform =
        // 'rotateY(' + rotateY + 'deg)' +
        // 'rotateX(' + rotateX + 'deg)';
      }
    
    if (touchendY <= touchstartY) {
        // console.log('Swiped up');
        rotateX += 90;

        document.querySelector('.cube').style.transform =
        'rotateY(' + rotateY + 'deg)' +
        'rotateX(' + rotateX + 'deg)';
      }
      
    
    
    if (touchendY >= touchstartY) {
        // console.log('Swiped down');
        rotateX -= 90;

        document.querySelector('.cube').style.transform =
        'rotateY(' + rotateY + 'deg)' +
        'rotateX(' + rotateX + 'deg)';
      }

    
    if (touchendY === touchstartY) {
        console.log('Tap');
      }
}

// End********************************************Swipe*******************************************
//#region ExitButton
function ExitButtonRectangle1hoverIn(){
  let exitButtonRectangle2 = document.getElementById("exitButtonRectangle1");
  
}

//#endregion ExitButton
