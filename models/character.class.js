class Character extends MovableObject {
    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    objectPadding = [0.375, 0.11, 0.04, 0.11];
    // objectPadding = null;
    otherDirection = false;
    speed = 10;
    coinStatus = 0;
    bottleStatus = 0;
    coins = [];
    bottles = [];
        
    IMAGES_IDLE = [
        imgPathBase + '2_character_pepe/1_idle/idle/I-1.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-2.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-3.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-4.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-5.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-6.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-7.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-8.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-9.png',
        imgPathBase + '2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-11.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-12.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-13.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-14.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-15.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-16.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-17.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-18.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-19.png',
        imgPathBase + '2_character_pepe/1_idle/long_idle/I-20.png',
    ];

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
        this.x = widthCanvas * 0.05;
        this.setWalkGroundY();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_JUMPING);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEAD);
        this.applyGravity();

        this.animate();
        // this.intervalForMovings(1000 / 60);
        // this.intervalForWalking(50);
        // this.intervalForJumpings(100);

    }


    animate() {
        intervalId = setInterval(() => {
            this.movingsOnKey();
        }, 1000 / 60);
        stoppableIntervals.push(intervalId);

        intervalId = setInterval(() => {
            if(this.world.isGameOver()) {
                // return stopGame();
            }
            if(!this.isAboveGround()) {
                if(this.isDead()) {
                    this.deadAnimation();
                } else if(this.isHurt()) {
                    this.hurtAnimation();
                } else {
                    this.walkingAnimationOnKey();
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

        intervalId = setInterval(() => {
            this.throwBottle();
        }, 100); 
        stoppableIntervals.push(intervalId);

    }
   

    movingsOnKey() {
        if(this.world.keystrokes.KEY_RIGHT) {
            this.otherDirection = false;
            this.moveRight(this.speed);
        }
        else if(this.world.keystrokes.KEY_LEFT) {
            this.otherDirection = true;
            this.moveLeft(this.speed);
        }
        else if(this.world.keystrokes.KEY_SPACE  && !this.isAboveGround()) {
            this.jump(30);
        }
        // else if(this.world.keystrokes.KEY_D) {
        //     this.throwBottle();
        // }
        this.x < widthCanvas ? this.world.screenTranslateX = -this.x : null;
        // this.consoleObjectPosition()
    }


    walkingAnimationOnKey() {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            this.walkingAnimation();
        }
    }


    moveLeft(speed) {
        if(this.x > (widthCanvas * -1) + 8) {
            this.x -= speed;
        }
    }


    moveRight(speed) {
        if(this.x < (widthCanvas * 2) - this.width) {
            this.x += speed;
        }
    }


    collectCoin(coin) {
        coin.collectObject();
        this.coins.push(coin);
        this.coinStatus += coin.statusValue;
    }


    collectBottle(bottle) {
        bottle.collectObject();
        this.bottles.push(bottle);
        this.bottleStatus += bottle.statusValue;
        console.log(this.bottles);
    }


    throwBottle() {
        // console.log(this.bottles);
        if(this.bottles.length <= 0) return;
        if(this.world.keystrokes.KEY_D) {
            let bottle = this.bottles[0];
            bottle.x = this.x;
            bottle.y = this.y;
            bottle.speedY = 5;
            bottle.applyGravity()
            setInterval(() => {
                bottle.x += 10;
            }, 25);
            this.bottles.shift();
            // console.log(this.bottles);
        }
    };


    
    // intervalForMovings(speed) {
    //     intervalId = setInterval(() => {
    //         this.movingsOnKey();
    //     }, speed);
    //     stoppableIntervals.push(intervalId);
    // }

    // intervalForWalking(speed) {
    //     intervalId = setInterval(() => {
    //         if(this.world.isGameOver()) {
    //             // return stopGame();
    //         }
    //         if(!this.isAboveGround()) {
    //             if(this.isDead()) {
    //                 this.deadAnimation();
    //             } else if(this.isHurt()) {
    //                 this.hurtAnimation();
    //             } else {
    //                 this.walkingAnimationOnKey();
    //             }
    //         }
    //     }, 50); 
    //     stoppableIntervals.push(intervalId);
    // }

    // intervalForJumping(speed) {
    //     intervalId = setInterval(() => {
    //         if(this.isAboveGround()) {
    //             this.jumpingAnimation();    
    //         }
    //     }, speed); 
    //     stoppableIntervals.push(intervalId);
    // }


}