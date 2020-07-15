
function LineTop(){

    this.createNewLine = function(){
        let speed = Math.floor(Math.random() * 1) + 1 
        let minHypotenuse = 35;
        let maxHypotenuse = 40;
        let hypotenuse = Math.floor(Math.random() * (maxHypotenuse - minHypotenuse + 1) + minHypotenuse);

        let arrCoords = getDataTop(Math.random() * window.innerWidth, 0, hypotenuse, speed);
        this.x1 = arrCoords[0];
        if (this.x1 ==  window.innerWidth / 2) {this.x1 = 100}; //when this.x1 starts at center the degree in triangle will be 0
        this.y1 = arrCoords[1];
        this.x2 = arrCoords[2];
        this.y2 = arrCoords[3];
        this.differenceSideX = arrCoords[4];
        this.differenceSideY = arrCoords[5];

        this.boolLineStartsAtBottomLeftSide = this.x1 < window.innerWidth/2 ? true : false;
        this.arrColor = [
            '#DB2763',
            '#B0DB43',
            '#12EAEA',
            '#BCE7FD',
            '#C492B1',
        ];
        this.color = Math.floor(Math.random() * this.arrColor.length);
        this.color = this.arrColor[this.color];
    }

    this.createNewLine();

    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();
    }

    this.update = function(){
        
        if((this.x1 == this.x2) || (this.y1 == this.y2)){   //for line to minimize on center
            this.createNewLine();
        }

        if(this.boolLineStartsAtBottomLeftSide){
            if(this.x2 + this.differenceSideX < window.innerWidth/2){                  //for line to minimize on center
                this.x2 = this.x2 + this.differenceSideX;
                this.y2 = this.y2 + this.differenceSideY;
            }
            if(this.x1 + this.differenceSideX >= this.x2){  //for line to minimize on center
                this.x1 = this.x2;
                this.y1 = this.y2;
                return;
            }
            if(this.y1 > 0){                                                            //line starts from minus X coord axis, therefore shrink should start after line breaks x coord axis
                this.x1 = this.x1 + this.differenceSideX + this.differenceSideX / 20;
                this.y1 = this.y1 + this.differenceSideY + this.differenceSideY / 20;
                return
            }
            this.x1 = this.x1 + this.differenceSideX;
            this.y1 = this.y1 + this.differenceSideY;

        } else{
            if(this.x2 - this.differenceSideX > window.innerWidth/2){                  //for line to minimize on center
                this.x2 = this.x2 - this.differenceSideX;
                this.y2 = this.y2 + this.differenceSideY;
            }

            if(this.x1 - this.differenceSideX <= this.x2){  //for line to minimize on center
                this.x1 = this.x2;
                this.y1 = this.y2;
                return;
            }
            if(this.y1 > 0){                                                            //line starts from minus X coord axis, therefore shrink should start after line breaks x coord axis
                this.x1 = this.x1 - this.differenceSideX - this.differenceSideX / 20;
                this.y1 = this.y1 + this.differenceSideY + this.differenceSideY / 20;
                return
            }

            this.x1 = this.x1 - this.differenceSideX;
            this.y1 = this.y1 + this.differenceSideY;
        }


        
    }
}

function getDataTop(x1, y1, hypotenuse, speed){                      //The function moves the line below x axis, so it is not visible
    let x2 = 0;
    let y2 = 0;

    let angleTriangleSideOnYCoord = getAngleOnYTop(x1);
    let angleTriangleSideOnXCoord = 180 - 90 - angleTriangleSideOnYCoord;

    let sideOnX = hypotenuse * Math.sin(angleTriangleSideOnYCoord * Math.PI/180);
    let sideOnY = hypotenuse * Math.sin(angleTriangleSideOnXCoord * Math.PI/180);


    if(x1 < window.innerWidth/2){             //for ground left side
        x2 = x1 + sideOnX;
        y2 = 0 + sideOnY;
    
    }else{                                      //for ground right side
        x2 = x1 - sideOnX;
        y2 = 0 + sideOnY;
    
    }


    hypotenuse++;

    let newSideOnX = hypotenuse * Math.sin(angleTriangleSideOnYCoord * Math.PI/180);
    let newSideOnY = hypotenuse * Math.sin(angleTriangleSideOnXCoord * Math.PI/180);
      
    let differenceSideX = (newSideOnX - sideOnX) * speed;   //for speed
    let differenceSideY = (newSideOnY - sideOnY) * speed;   //for speed

    let min = 10;                                           //For lines smoothly start moving to center (not all at once)
    let max = window.innerHeight;
    let maxLength = Math.floor(Math.random() * (max - min + 1) + min);

    if(x1 < window.innerWidth/2){
        do {                                                    //for line start from below of screen
            x1 = x1 - differenceSideX;
            x2 = x2 - differenceSideX;
            y1 = y1 - differenceSideY;
            y2 = y2 - differenceSideY;
        
        } while (0 - maxLength < y2);
    } else{
        do {                                                    //for line start from below of screen
            x1 = x1 + differenceSideX;
            x2 = x2 + differenceSideX;
            y1 = y1 - differenceSideY;
            y2 = y2 - differenceSideY;
        
        } while (0 - maxLength < y2);
    }

    return [x1, y1, x2, y2, differenceSideX, differenceSideY];
}

function getAngleOnYTop(x1){
    let sideOnY = window.innerHeight / 2;
    let sideOnX;

    if(x1 < window.innerWidth/2){             //for ground left side
        sideOnX = window.innerWidth / 2 - x1;
    } else{                                     //for ground right side
        sideOnX = x1 - window.innerWidth / 2;
    }

    let angleYCoord = Math.atan(sideOnX/sideOnY) * 180/Math.PI;

    return angleYCoord;
}