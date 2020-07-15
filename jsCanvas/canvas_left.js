function LineLeft(){

    this.createNewLine = function(){
        let speed = Math.floor(Math.random() * 1) + 1;
        let minHypotenuse = 35;
        let maxHypotenuse = 40;
        let hypotenuse = Math.floor(Math.random() * (maxHypotenuse - minHypotenuse + 1) + minHypotenuse);
        let arrCoords = getDataLeft(0, Math.random() * window.innerHeight, hypotenuse, speed);

        this.x1 = arrCoords[0];
        this.y1 = arrCoords[1];
        if (this.y1 ==  window.innerHeight / 2) {this.y1 = 100}; //when this.y1 starts at center the degree in triangle will be 0
        this.x2 = arrCoords[2];
        this.y2 = arrCoords[3];
        this.differenceSideX = arrCoords[4];
        this.differenceSideY = arrCoords[5];

        this.boolLineStartsAtLeftTopSide = this.y1 < window.innerHeight/2 ? true : false;
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
        if((this.x1 == this.x2) || (this.y1 == this.y2)){                               //for line to minimize on center
            this.createNewLine();
        }

        if(this.boolLineStartsAtLeftTopSide){
            if(this.y2 + this.differenceSideY < window.innerHeight/2){                  //for line to minimize on center
                this.x2 = this.x2 + this.differenceSideX;
                this.y2 = this.y2 + this.differenceSideY;
            }
            if(this.y1 + this.differenceSideY >= this.y2){                              //for line to minimize on center
                this.x1 = this.x2;
                this.y1 = this.y2;
                return;
            }

            if(this.x1 > 0){                                                            //line starts from minus X coord axis, therefore shrink should start after line breaks x coord axis
                this.x1 = this.x1 + this.differenceSideX + this.differenceSideX / 20;
                this.y1 = this.y1 + this.differenceSideY + this.differenceSideY / 20;
                return
            }

            this.x1 = this.x1 + this.differenceSideX;
            this.y1 = this.y1 + this.differenceSideY;

        } else{
            if(this.y2 - this.differenceSideY > window.innerHeight / 2){                //for line to minimize on center
                this.y2 = this.y2 - this.differenceSideY;
                this.x2 = this.x2 + this.differenceSideX;
            }

            if(this.y1 - this.differenceSideY <= this.y2){                              //for line to minimize on center
                this.x1 = this.x2;
                this.y1 = this.y2;
                return;
            }

            if(this.x1 > 0){                                                            //line starts from minus X coord axis, therefore shrink should start after line breaks x coord axis
                this.y1 = this.y1 - this.differenceSideY - this.differenceSideY / 20;
                this.x1 = this.x1 + this.differenceSideX + this.differenceSideX / 20;
                return
            }

            this.y1 = this.y1 - this.differenceSideY;
            this.x1 = this.x1 + this.differenceSideX;
        }


        
    }
}

function getDataLeft(x1, y1, hypotenuse, speed){                      //The function moves the line below x axis, so it is not visible
    let x2 = 0;
    let y2 = 0;

    let angleTriangleSideOnXCoord = getAngleOnX(y1);
    let angleTriangleSideOnYCoord = 180 - 90 - angleTriangleSideOnXCoord;

    let sideOnX = hypotenuse * Math.sin(angleTriangleSideOnYCoord * Math.PI/180);
    let sideOnY = hypotenuse * Math.sin(angleTriangleSideOnXCoord * Math.PI/180);


    if(y1 < window.innerHeight/2){             //for left top side
        y2 = y1 + sideOnY;
        x2 = 0 + sideOnX;
    
    }else{                                    //for left ground side
        y2 = y1 - sideOnY;
        x2 = 0 + sideOnX;
    
    }


    hypotenuse++;

    let newSideOnX = hypotenuse * Math.sin(angleTriangleSideOnYCoord * Math.PI/180);
    let newSideOnY = hypotenuse * Math.sin(angleTriangleSideOnXCoord * Math.PI/180);
      
    let differenceSideX = (newSideOnX - sideOnX) * speed;   //for speed
    let differenceSideY = (newSideOnY - sideOnY) * speed;   //for speed

    let min = 10;                                           //For lines smoothly start moving to center (not all at once)
    let max = window.innerHeight;
    let maxLength = Math.floor(Math.random() * (max - min + 1) + min);

    if(y1 < window.innerHeight/2){
        do {                                                    //for line start from below of screen
            y1 = y1 - differenceSideY;
            y2 = y2 - differenceSideY;
            x1 = x1 - differenceSideX;
            x2 = x2 - differenceSideX;
        
        } while (0 - maxLength < x2);
    } else{
        do {                                                    //for line start from below of screen
            y1 = y1 + differenceSideY;
            y2 = y2 + differenceSideY;
            x1 = x1 - differenceSideX;
            x2 = x2 - differenceSideX;
        
        } while (0 - maxLength < x2);
    }
  
    return [x1, y1, x2, y2, differenceSideX, differenceSideY];
}

function getAngleOnX(y1){
    let sideOnY;
    let sideOnX = window.innerWidth / 2;;

    if(y1 < window.innerHeight/2){              //for top side
        sideOnY = (innerHeight / 2) - y1;
    } else{                                     //for bottom side
        sideOnY = y1 - innerHeight / 2;
    }

    let angleYCoord = Math.atan(sideOnY/sideOnX) * 180/Math.PI;

    return angleYCoord;
}