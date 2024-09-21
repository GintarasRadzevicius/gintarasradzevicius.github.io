export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchX = '';
        this.touchTreshold = 30;
        this.restartTheGame = false;

        window.addEventListener('keydown', e => {
            //for keydown logic below
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp'||
                e.key === 'ArrowLeft'||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }

            // else if (e.key === 'd') this.game.debug = !this.game.debug;
        });

        window.addEventListener('keyup', e =>{
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft'||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        window.addEventListener('touchstart', e=>{
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;

            if(this.touchX > window.innerWidth/2 && this.keys.indexOf('swipe right') === -1){
                this.keys.push('touchRight');
            }else{
                this.keys.push('touchLeft');
            }
        });


        window.addEventListener('touchmove', e=>{
            const swipeDistanceY = this.touchY - e.changedTouches[0].pageY;
  
            // console.log('swipeDistanceY: ' + swipeDistanceY);
            if ((swipeDistanceY > this.touchTreshold) && this.keys.indexOf('swipeUp') === -1){
                this.keys.push('swipeUp');
            }
        });

        window.addEventListener('touchend', e=>{
            this.keys.splice(this.keys.indexOf('swipeUp'), 1);
            this.keys.splice(this.keys.indexOf('touchRight'), 1);
            this.keys.splice(this.keys.indexOf('touchLeft'), 1);
        });


    }
}