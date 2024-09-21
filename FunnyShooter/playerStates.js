// import { Dust, Fire } from "./particles.js";
import { Fire } from "./particles.js";


const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State{
    constructor(game){
        super('SITTING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 0;
    }

    handlerInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

        if (input.includes('ArrowLeft') || input.includes('ArrowRight')
            || input.includes('touchright') || input.includes('touchleft')) {
            this.game.player.setState(states.RUNNING, 1);
        } else if(input.includes('ArrowUp') || input.includes('swipeUp')){
            this.game.player.setState(states.JUMPING, 1)
        }
    }
}


export class Running extends State{
    constructor(game){
        super('RUNNING',game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 0;
    }

    handlerInput(input){
        // this.game.particles.push(new Dust(this.game, this.game.player.x + this.game.player.width * 0.1, this.game.player.y + this.game.player.height));
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        
        if (input.includes('ArrowDown')) {
            this.game.player.setState(states.SITTING, 0);
        } else if(input.includes('ArrowUp') || input.includes('swipeUp')){
            this.game.player.setState(states.JUMPING, 1)
        }
    }
}


export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -= 35;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 0;
    }

    handlerInput(input){

        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}


export class Falling extends State{
    constructor(game){
        super('FALLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 1;
        this.game.player.frameY = 0;
    }

    handlerInput(input){
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}

export class Exploding extends State{
    constructor(game){
        super('EXPLODING', game);
    }
    enter(){
        
    }
    
}