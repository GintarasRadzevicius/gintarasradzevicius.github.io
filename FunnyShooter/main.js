import { Player } from './player.js';
import { InputHandler } from './userInput.js';
import { Background } from './background.js';
import { GroundEnemy } from './enemies.js';
import { FlyingEnemy } from './enemies.js';
import { ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';



window.addEventListener('load', function name() {
    

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 2340; //2340 my phone
canvas.height = 1080; // 1080 my phone

// let score = 0;
// let gameFrame = 0;

// ctx.font = "50px Georgia";

// let canvasPosition = canvas.getBoundingClientRect();

// const mouse = {
//     x: canvas.width/2,
//     y: canvas.height/2,
//     click: false
// }

// canvas.addEventListener("mousedown", function (event) {
//     mouse.x = event.x - canvasPosition.left;
//     mouse.y = event.y - canvasPosition.top;
//     console.log(mouse.x, mouse.y);
// });


        
        // this.y = canvas.height/2;
        // this.radius = 50;
        // this.angle = 0;
        // this.frameX = 0;
        // this.frameY = 0;
        // this.frame = 0;
        // this.spriteWidth = 400;
        // this.spriteHeight = 327;
class Game{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.groundMargin = 50;
        this.speed = 3;                 //It is game speed
        this.maxSpeed = 3;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.UI = new UI(this);
        this.enemies = [];
        this.particles = [];
        this.collisions = [];
        this.explosions = [];
        this.maxParticles = 50;
        this.enemyTimer = 1;
        this.enemyInterval = 4000;
        this.debug = false;
        this.score = 0;
        this.fontColor = 'black';
        this.gameOver = false;
        this.playerExplosionParticles = [];
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
    }

    update(deltaTime){
        this.background.update();
        if(!game.gameOver) this.player.update(this.input.keys, deltaTime);
        //handleEnemies
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 3;            
        } else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(enemy =>{
            enemy.update(deltaTime);
            if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            // if (enemy.playerGameOver) this.enemies.splice(this.enemies.indexOf(enemy), 1);
        });
        //handle particles
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.markedForDeletion) this.particles.splice(index, 1);
        });
        if (this.particles.length > this.maxParticles){
            this.particles.length = this.maxParticles;
        }

        //handle collisions sprites
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime);
            if (collision.markedForDeletion) this.collisions.splice(index, 1);

        })

        this.explosions.forEach((explosi, index) => {
            explosi.update(deltaTime);
            if (explosi.markedForDeletion) this.collisions.splice(index, 1);

        })



    }

    draw(context){

        this.background.draw(context);
        if(!game.gameOver) this.player.draw(context);
        this.enemies.forEach(enemy =>{
            enemy.draw(context);
        });
        if(!game.gameOver) this.particles.forEach(particle =>{
            particle.draw(context);
        });
        this.collisions.forEach(collision =>{
            collision.draw(context);
        });
        this.explosions.forEach(explosi =>{
            explosi.draw(context);
        });

        this.UI.draw(context);

 
    }

    addEnemy(){
        if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyingEnemy(this));
        // this.enemies.push(new ClimbingEnemy(this));
        // console.log(this.enemies);
    }

}


const canvasButton = document.getElementById("canvas1");
canvasButton.addEventListener("click", function (e) {
    restartTheGame(e);
}); 

function restartTheGame(event) {//click on start button I just counted by click coordinte, because it is hard to calculate when canvas width/height is hardoced and window.innerWith is something different than my computer's screen size
    // if (!game.gameOver) return;

    let x = event.clientX;
    let y = event.clientY;
    
    // alert("Coordinate x: " + x + 
    //     "Coordinate y: " + y);

    let differenceX = window.innerWidth / x;
    let differenceY = window.innerHeight / y;

    if (differenceX >= 1.4 && differenceX < 3.5) {
        if (differenceY >= 1.55 && differenceY < 1.83) {

            restartGameClearValues();

        }
    }
// this.game.width * 0.5 - 500, this.game.height * 0.5 + 50, 1000, 100)

}


    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0; // this is because sprite image blinks very fast, so we will manage fps for image
    let value = null;
    let counter = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime; //value of miliseconds for how long each frame stays on the screen before it gets redrawn. lastTime will hold value of timeStamp value from previous loop. 
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);


        // console.log('gameOver: ' + game.gameOver);

        if (game.gameOver){
            let b = new Date();
            let changingTime = b.getTime();

            counter++;
            if (changingTime - game.player.gameOverTimeStart > 3000) {
                cancelAnimationFrame(value);
                game.UI.drawStartButton(ctx);
            } else{
                value = requestAnimationFrame(animate);
            }
        } else{
            value = requestAnimationFrame(animate);
        }

    }

    animate(0); // passing value - 0 - in order to enabling variable timeStamp to work in animate function.


    function restartGameClearValues() {
        game.player.restart();
        game.gameOver = false;
        game.enemies = [];
        game.particles = [];
        game.collisions = [];
        game.explosions = [];
        game.score = 0;
        value = requestAnimationFrame(animate);

    }

});

