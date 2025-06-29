class Character extends MovableObject {
    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    objectPadding = [0.375, 0.11, 0.04, 0.11];
    otherDirection = false;
    speedMove = 3;

    IMAGES_WALKING = [
        imgPathBase + '2_character_pepe/2_walk/W-21.png',
        imgPathBase + '2_character_pepe/2_walk/W-22.png',
        imgPathBase + '2_character_pepe/2_walk/W-23.png',
        imgPathBase + '2_character_pepe/2_walk/W-24.png',
        imgPathBase + '2_character_pepe/2_walk/W-25.png',
        imgPathBase + '2_character_pepe/2_walk/W-26.png',
    ];


    constructor() {

        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = widthCanvas * 0.1;
        this.y = heightCanvas - this.height - walkOffset;

        this.setImageCache(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {

        console.log(this.world);
        console.log(this.height);
        // console.log(this.world.level);

        // if(this.world.keystrokes.KEY_RIGHT) {
        //     this.otherDirection = true;
        // }

        console.log(this.x)
        let keystroke;
        keystroke = 'KEY_LEFT';
        // keystroke = 'KEY_RIGHT';

        if(keystroke == 'KEY_LEFT') {
            this.moveLeft();
        }

        if(keystroke == 'KEY_RIGHT') {
            this.moveRight();
        }

        this.animateWalking(this.IMAGES_WALKING, 300);

    }


    moveLeft() {
        this.otherDirection = true;
        setInterval(() => {
            // if(keystrokes.KEY_LEFT) {
                if(this.x < (widthCanvas * 1) + (this.width * 0.6)) {
                    this.x += this.speedMove;
                    if(this.x < widthCanvas) {
                        this.world.screenTranslateX = this.x;
                    }
                }
            // }
        }, 1000 / 60);
    }


    moveRight() {
        this.otherDirection = false;
        setInterval(() => {
            // if(keystrokes.KEY_RIGHT) {
                if(this.x < (widthCanvas * 2) - this.width + (this.width * 0.11)) {
                    this.x += this.speedMove;
                    if(this.x < widthCanvas) {
                        this.world.screenTranslateX = -this.x;
                    }
                }
            // }
        }, 1000 / 60);
    }


    // moveLeft(speed) {
    //     setInterval(() => {
    //         // this.x = this.x * -1;
    //         this.x -= speed;
    //         this.world.screenTranslateX = -this.x;
    //     }, 1000 / 60);
    // }


    // moveX(speed) {
    //     setInterval(() => {
    //         console.log(this.x);
    //         if(this.x > this.screenStartX && this.x < this.screenEndX) {
    //             this.x += speed;
    //             this.world.screenTranslateX = -this.x * this.factorX;
    //         }
    //     }, 1000 / 60);
    // }


    jump() {
        console.log('jump');
    }

}