export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }

    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        if (this.game.gameOver) {
            
            // context.textAlign = 'left';
            // context.font = this.fontSize * 10 + 'px ' + this.fontFamily;
            // context.fillStyle = 'red';
            // context.fillText('Game Over', (this.game.width * 0.5) - 800, this.game.height * 0.5);

            // context.beginPath();

            // context.rect(this.game.width * 0.5 - 500, this.game.height * 0.5 + 50, 1000, 100);
            // context.fillStyle = 'rgba(225,225,225,0.5)';
            // context.fill();
            // context.lineWidth = 5;
            // context.strokeStyle = 'green';
            // context.stroke();
            // context.closePath();
            // context.font = 'bold 70px Courier New';
        
            // context.fillStyle = 'black';
            // context.textAlign = 'center';

            // context.fillText('Start', this.game.width * 0.5, this.game.height * 0.5 + 125);
        }
    }

    drawStartButton(context){
        context.textAlign = 'left';
        context.font = this.fontSize * 10 + 'px ' + this.fontFamily;
        context.fillStyle = 'red';
        context.fillText('Game Over', (this.game.width * 0.5) - 800, this.game.height * 0.5);

        context.beginPath();

        context.rect(this.game.width * 0.5 - 500, this.game.height * 0.5 + 50, 1000, 100);
        context.fillStyle = 'rgba(225,225,225,0.5)';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = 'green';
        context.stroke();
        context.closePath();
        context.font = 'bold 70px Courier New';
    
        context.fillStyle = 'black';
        context.textAlign = 'center';

        context.fillText('Start', this.game.width * 0.5, this.game.height * 0.5 + 125);
    }
}