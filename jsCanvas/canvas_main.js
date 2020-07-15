var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var quantity = 100;
quantity = Number(quantity);

var lineBottomArray = [];
for(let i = 0; i < quantity; i++){
    lineBottomArray.push(new LineBottom());
}
var lineTopArray = [];
for(let i = 0; i < quantity; i++){
    lineTopArray.push(new LineTop());
}

var lineLeftArray = [];
for(let i = 0; i < quantity; i++){
    lineLeftArray.push(new LineLeft());
}

var lineRightArray = [];
for(let i = 0; i < quantity; i++){
    lineRightArray.push(new LineRight());
}


function animate(){
    requestId = undefined;

    startCanvas();
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < lineBottomArray.length; i++){
        lineBottomArray[i].draw();
        lineTopArray[i].draw();
        lineLeftArray[i].draw();
        lineRightArray[i].draw();

        lineBottomArray[i].update();
        lineTopArray[i].update();
        lineLeftArray[i].update();
        lineRightArray[i].update();
    }
}
