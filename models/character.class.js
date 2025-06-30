class Character extends MovableObject {
    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    // objectPadding = [0.375, 0.11, 0.04, 0.11];
    objectPadding = null;
    otherDirection = false;
    speed = 10;

    IMAGES_WALKING = [
        imgPathBase + '2_character_pepe/2_walk/W-21.png',
        imgPathBase + '2_character_pepe/2_walk/W-22.png',
        imgPathBase + '2_character_pepe/2_walk/W-23.png',
        imgPathBase + '2_character_pepe/2_walk/W-24.png',
        imgPathBase + '2_character_pepe/2_walk/W-25.png',
        imgPathBase + '2_character_pepe/2_walk/W-26.png',
    ];


    constructor() {

        super();
        this.x = widthCanvas * 0.1;
        this.y = heightCanvas - this.height - walkOffset;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);

        this.objectId = 'character' + '.';
        console.log(this.objectId + 'x: ' + this.x);

        this.animate();

    }


    animate() {
        intervalId = setInterval(() => this.walkingAnimation(), 50);
        stoppableIntervals.push(intervalId);
        intervalId = setInterval(() => this.movingAnimation(), 1000 / 60);
        stoppableIntervals.push(intervalId);
    }


    walkingAnimation() {
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            this.walkingAnimationLoopItem(this.IMAGES_WALKING);    
        }
    }


    movingAnimation() {
        if(this.world.keystrokes.KEY_RIGHT) {
            this.otherDirection = false;
            this.moveRight(this.speed);
        }
        else if(this.world.keystrokes.KEY_LEFT) {
            this.otherDirection = true;
            this.moveLeft(this.speed);
        }
        this.x < widthCanvas ? this.world.screenTranslateX = -this.x : null;
        console.log(this.objectId + 'x: ' + this.x);
    }


    moveRight(speed) {
        if(this.x < (widthCanvas * 2) - this.width) {
            this.x += speed;
        }
    }


    moveLeft(speed) {
        if(this.x > (widthCanvas * -1) + 8) {
            this.x -= speed;
        }
    }


    jump() {
        console.log('jump');
    }

}