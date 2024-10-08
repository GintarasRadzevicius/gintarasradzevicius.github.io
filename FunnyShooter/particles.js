class Particle{
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if(this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle{
    constructor (game, x, y){
        super(game);
        this.size = Math.random() * 30 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        // this.color = 'white';
        // this.color = 'rgba(255, 255, 255, 0.5)';
        this.color = 'rgba(255,42,4,0.5)';
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle{

}

export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this.image = document.getElementById("fire");
        this.size = Math.random() * 100 + 100;
        this.x = x - 200;
        this.y = y + 100;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }

    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 10);
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }

}