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

        this.animateWalking(this.IMAGES_WALKING, 300);

        // console.log(this.world.level);

        setInterval(() => {
            if(this.world.keystrokes.KEY_RIGHT) {
                this.otherDirection = false;
                // this.moveToRight(this.speedMove);
                this.moveRight(this.speedMove);
            }
            else if(this.world.keystrokes.KEY_LEFT) {
                this.otherDirection = true;
                // this.moveToLeft(this.speedMove);
                this.moveLeft(this.speedMove);
            }
            console.log('character.x: ' + this.x);
        }, 1000 / 60);

    }


    moveRight(speed) {
        if(this.x < (widthCanvas * 2) - this.width + (this.width * 0.11)) {
            this.x += speed;
            if(this.x < widthCanvas) {
                this.world.screenTranslateX = -this.x;
            }
        }
    }


    moveLeft(speed) {
        if(this.x < (widthCanvas * 1) + (this.width * 0.6)) {
            this.x += speed;
            if(this.x < widthCanvas) {
                this.world.screenTranslateX = this.x;
            }
        }
    }

    
    // moveRight(speed) {
    //     this.x += speed;
    //     this.world.screenTranslateX = -this.x;
    // }


    // moveLeft(speed) {
    //     this.x += speed;
    //     this.world.screenTranslateX = this.x;
    // }


    jump() {
        console.log('jump');
    }

}