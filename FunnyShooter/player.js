import {Sitting, Running, Jumping, Falling, Exploding} from './playerStates.js';
import {CollisionAnimation} from "./collisionAnimation.js";
import {ExplosionAnimation} from "./explosionAnimation.js";

export class Player {
    constructor(game){
        this.game = game;
        // this.width = 400;
        // this.height = 456;
        this.width = 300;
        this.height = 342;
        this.x = 100;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0; // for vertical movement velocity y. this.vy. vertical speed
        this.weight = 1;
        this.image = document.getElementById('player'); //JS automatically creates 
        //references to all elements with IDs into the global namespace, using 
        //it's ID as a variable name. So we could replace this line with this line: this.image = player
        this.frameX = 0;    //choosing place from spritesheet
        this.frameY = 0;    //choosing place from spritesheet
        this.maxFrame;      //this is because when in spritesheet are more rows with different number of images
        this.fps = 3;       //fps for image to change
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;        //frameTimer will cycle between 0 and framInterval increasing deltaTime for each frame. Evry time it reaches the interval it will trigger the next frame and it will reset.
        this.speed = 0;     
        this.maxSpeed = 15;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Exploding(this.game)];
        // this.isAlreadyInCoalitionWithGroundEnemy = false;
        this.gameOverTimeStart = null;
    
    }

    restart(){
        this.x = 100;
        this.y = this.game.height - this.height - this.game.groundMargin;

    }

    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handlerInput(input);
        //horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')){
             this.speed = this.maxSpeed;
        } else if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        } else if (input.includes('touchRight')) {
            this.speed = this.maxSpeed;
        } else if (input.includes('touchLeft')) {
            this.speed = -this.maxSpeed;
        } else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        // if (input.includes('ArrowUp') && this.onGround()) this.vy -= 20 // we will refactor this in player States Jumping class
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //sprite animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        
    }

    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
       context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this. width, this.height);
    /*
    context.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this. width, this.height)
    sx - source x
    sy - source y
    sw - source width
    sh - source height
    it is what we want to crop out from source image
    then this.x ... this.height is desctination x, destination y... will tell where we want to put our cropped out image on the screen



    */
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){//Changing player states
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision(){

        this.game.enemies.forEach(enemy => {
            if (enemy.enemyName == 'GroundEnemy') {
                if(
                    enemy.x < this.x + (this.width/2) && 
                    enemy.x + enemy.width > this.x &&
                    enemy.y < this.y + this.height &&
                    enemy.y + enemy.height > this.y
                    ){
                    this.game.explosions.push(new ExplosionAnimation(this.game, this.game.player.x + this.game.player.width*0.5, this.game.player.y + this.game.player.height*0.5));
                    this.game.gameOver = true;
                    console.log('gameOver');
                    let time = new Date();
                    this.gameOverTimeStart = time.getTime();
                } 
            }else{
                if (enemy.x < this.x + this.width && 
                    enemy.x + enemy.width > this.x &&
                    enemy.y < this.y + this.height &&
                    enemy.y + enemy.height > this.y) {
                    enemy.markedForDeletion = true;
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    this.game.score++;
                }
                
                
            }
        })
    }
}