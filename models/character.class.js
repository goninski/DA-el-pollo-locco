class Character extends MovableObject {
    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    yGround = heightCanvas - this.height - walkOffset;
    objectPadding = [0.375, 0.11, 0.04, 0.11];
    // objectPadding = null;
    otherDirection = false;
    speed = 10;
    // speedY = 0;
    // acceleration = 2.5;

    IMAGES_WALKING = [
        imgPathBase + '2_character_pepe/2_walk/W-21.png',
        imgPathBase + '2_character_pepe/2_walk/W-22.png',
        imgPathBase + '2_character_pepe/2_walk/W-23.png',
        imgPathBase + '2_character_pepe/2_walk/W-24.png',
        imgPathBase + '2_character_pepe/2_walk/W-25.png',
        imgPathBase + '2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        imgPathBase + '2_character_pepe/3_jump/J-31.png',
        imgPathBase + '2_character_pepe/3_jump/J-32.png',
        imgPathBase + '2_character_pepe/3_jump/J-33.png',
        imgPathBase + '2_character_pepe/3_jump/J-34.png',
        imgPathBase + '2_character_pepe/3_jump/J-35.png',
        imgPathBase + '2_character_pepe/3_jump/J-36.png',
        imgPathBase + '2_character_pepe/3_jump/J-37.png',
        imgPathBase + '2_character_pepe/3_jump/J-38.png',
        imgPathBase + '2_character_pepe/3_jump/J-39.png',
    ];


    constructor() {

        super();
        // this.x = widthCanvas * 0.3;
        this.y = this.yGround;
        this.x = 300;
        // this.y = -200;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_JUMPING);
        this.applyGravity();

        this.objectId = 'character' + '.';
        // console.log(this.objectId + 'x: ' + this.x);

        this.animate();

    }


    animate() {
        intervalId = setInterval(() => {
            if(this.isAboveGround()) {
                this.jumpingAnimation();    
            }
        }, 100); 
        stoppableIntervals.push(intervalId);

        intervalId = setInterval(() => {
            if(!this.isAboveGround()) {
                this.walkingAnimation();
            }
        }, 50); 
        stoppableIntervals.push(intervalId);

        intervalId = setInterval(() => {
            this.movings();
        }, 1000 / 60);
        stoppableIntervals.push(intervalId);

    }


    walkingAnimation() {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            this.movementAnimationItem(this.IMAGES_WALKING);    
        }
    }


    jumpingAnimation() {
        this.movementAnimationItem(this.IMAGES_JUMPING);    
    }


    movings() {
        if(this.world.keystrokes.KEY_RIGHT) {
            this.otherDirection = false;
            this.moveRight(this.speed);
        }
        else if(this.world.keystrokes.KEY_LEFT) {
            this.otherDirection = true;
            this.moveLeft(this.speed);
        }
        else if(this.world.keystrokes.KEY_SPACE  && !this.isAboveGround()) {
            this.jump(30 );
        }
        this.x < widthCanvas ? this.world.screenTranslateX = -this.x : null;
        // console.log(this.objectId + 'x: ' + this.x);
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



}