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
    isIdle = false;
    isIdleLong = false;

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

    IMAGES_IDLE_LONG = [
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

    audioFiles = {
        idle : audioPathBase + 'idle.mp3',
        walk : audioPathBase + 'walk.mp3',
        jump : audioPathBase + 'jump.mp3',
        hurt : audioPathBase + 'hurt.mp3',
        dead : audioPathBase + 'dead.mp3',
    }



    constructor() {

        super();
        this.x = 0;
        this.setWalkGroundY();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_IDLE);
        this.setImageCache(this.IMAGES_IDLE_LONG);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_JUMPING);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEAD);
        this.setAudioCache(this.audioFiles);
        this.applyGravity();

        this.animate();
        this.saveIntervalsGlobally();
    }


    animate() {

        // interval for fast key observer
        intervalId = setInterval(() => {
            if(gameIsPaused || this.isDead()) return;
            this.keyObserverFast();
        }, 1000 / 60);
        this.intervals.push(intervalId);

        // interval for walking/hurt/dead animation
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            this.animationsOnGround();
        }, 50); 
        this.intervals.push(intervalId);

        // interval for jumping animation (slower)
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isAboveGround()) {
                this.jumpingAnimation();
             }
        }, 100); 
        this.intervals.push(intervalId);

        // interval for idle animation (slower)
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            this.idleAnimation();
        }, 300); 
        this.intervals.push(intervalId);

        // interval for slow key observer
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            this.keyObserverSlow();
        }, 100);
        this.intervals.push(intervalId);

    }


    keyObserverFast() {
        if(this.world.keystrokes.KEY_RIGHT) {
            this.otherDirection = false;
            this.moveRight(this.speed);
                this.isIdle = false;
                this.isIdleLong = false;
        }
        else if(this.world.keystrokes.KEY_LEFT) {
            this.otherDirection = true;
            this.moveLeft(this.speed);
            this.isIdle = false;
            this.isIdleLong = false;
        }
        else if(this.world.keystrokes.KEY_SPACE  && !this.isAboveGround()) {
            this.jump(30);
            startAudioDebounced(this.audioCache.jump, lastKeystroke_JUMP, 125);
            this.isIdle = false;
            this.isIdleLong = false;
        }
        else {
            let timePassed = new Date().getTime() - lastKeystroke;
            if(timePassed >= 3000 && timePassed < 6000) {
                this.isIdle = true;
                this.isIdleLong = false;
            } else if(timePassed >= 6000) {
                this.isIdleLong = true;
                this.isIdle = false;
            } else {
                this.isIdle = false;
                this.isIdleLong = false;
            }
        }
        this.x < widthCanvas ? this.world.screenTranslateX = -this.x : null;
        // this.consoleObjectPosition()
    }


    keyObserverSlow() {
        if(this.world.keystrokes.KEY_B) {
            // this.throwBottle();
            debounced(lastKeystroke_THROW) ? this.throwBottle() : null;
        } 
    }


    animationsOnGround() {
        if(!this.isAboveGround()) {
            if(this.isDead()) {
                this.handlingDead();
                startAudioDebounced(this.audioCache.dead, this.lastHit, 125, 0.7);
            } else if(this.isHurt()) {
                this.handlingHurt();
                startAudioDebounced(this.audioCache.hurt, this.lastHit, 125);
            } else if(!this.isIdle && !this.isIdleLong) {
                this.walkingAnimation();
            }
        }
    }


    walkingAnimation() {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            super.walkingAnimation();
            startAudio(this.audioCache.walk);
        } else {
            stopAudio(this.audioCache.walk);
        }
    }


    idleAnimation() {
        let imagePaths;
        if(this.isIdle) {
            imagePaths = 'IMAGES_IDLE'
        } else if(this.isIdleLong) {
            imagePaths = 'IMAGES_IDLE_LONG'
            startAudio(this.audioCache.idle);
        } else {
            return;
        }
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
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


    throwBottle() {
        if(this.bottles.length <= 0) return;
        let bottle = this.bottles[0];
        // console.log('characterX:', this.x);
        this.bottleStatus -= bottle.value;
        bottle.x = this.x;
        bottle.y = this.y;
        bottle.throwing = true;
        bottle.speedY = 5;
        bottle.applyGravity()
        bottle.throwingInterval = setInterval(() => {
            this.otherDirection ? bottle.x -= 15 : bottle.x += 15;
        }, 25);
        this.bottles.shift();
        // console.log(bottle);
        // bottle.consoleObjectPosition();
    }


    winJump() {
        this.jump(30);
        this.loadImage(this.IMAGES_JUMPING[3]);
    }


}