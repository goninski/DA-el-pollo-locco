class Character extends MovableObject {
    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    objectPadding = [0.375, 0.11, 0.04, 0.11];
    // objectPadding = null;
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

    IMAGES_HURT = [
        imgPathBase + '2_character_pepe/4_hurt/H-41.png',
        imgPathBase + '2_character_pepe/4_hurt/H-42.png',
        imgPathBase + '2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        imgPathBase + '2_character_pepe/5_dead/D-51.png',
        imgPathBase + '2_character_pepe/5_dead/D-52.png',
        imgPathBase + '2_character_pepe/5_dead/D-53.png',
        imgPathBase + '2_character_pepe/5_dead/D-54.png',
        imgPathBase + '2_character_pepe/5_dead/D-55.png',
        imgPathBase + '2_character_pepe/5_dead/D-56.png',
        imgPathBase + '2_character_pepe/5_dead/D-57.png',
    ];


    constructor() {

        super();
        this.x = widthCanvas * 0.3;
        this.setWalkGroundY();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_JUMPING);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEAD);
        this.applyGravity();

        this.animate();

    }


    animate() {

        intervalId = setInterval(() => {
            this.movings();
        }, 1000 / 60);
        stoppableIntervals.push(intervalId);

        intervalId = setInterval(() => {
            if(this.world.isGameOver()) {
                // return stopGame();
            }
            if(!this.isAboveGround()) {
                if(this.isDead()) {
                    this.isDeadHandling();
                } else if(this.isHurt()) {
                    this.isHurtedHandling();
                } else {
                    this.walkingAnimation();
                }
            }
        }, 50); 
        stoppableIntervals.push(intervalId);

        intervalId = setInterval(() => {
            if(this.isAboveGround()) {
                this.jumpingAnimation();    
            }
        }, 100); 
        stoppableIntervals.push(intervalId);

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
        // this.consoleObjectPosition()
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


    walkingAnimation() {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            this.movementAnimation(this.IMAGES_WALKING);    
        }
    }


    jumpingAnimation() {
        this.movementAnimation(this.IMAGES_JUMPING);    
    }


}