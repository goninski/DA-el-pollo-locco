/**Class representing the main character (Pepe) */
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
    throwing = false;

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

    IMAGES_DEATH = [
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


    /**
     * Create character and place it on ground level
     */
    constructor() {
        super();
        this.roundDimensions();
        this.x = 0;
        this.setWalkGroundY();
        this.roundCoordinates();
        this.setMediaCache();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.applyGravity();
        this.animate();
    }


    /**
     * set media cache
     */
    setMediaCache() {
        this.setImageCache(this.IMAGES_IDLE);
        this.setImageCache(this.IMAGES_IDLE_LONG);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_JUMPING);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEATH);
        this.setAudioCache(this.audioFiles);
    }


    /**
     * Animate calls
     */
    animate() {
        this.mainKeystrokesHandler(); //60x
        this.throwBottleKeystrokeHandler(); //70ms
        this.animateWalkingHurtDeath(); //50ms
        this.animateJumping(); //100ms
        this.animateIdle(); //300ms
        this.saveIntervalsGlobally();
    }


    /**
     * Main keystrokes handler (fast interval)
     */
    mainKeystrokesHandler() {
        intervalId = setInterval(() => {
            if(gameIsPaused || this.isDead()) return;
            this.isIdle = false;
            this.isIdleLong = false;
            if(this.world.keystrokes.KEY_LEFT) {
                this.otherDirection = true;
                this.moveLeft(this.speed);
            } else if(this.world.keystrokes.KEY_RIGHT) {
                this.otherDirection = false;
                this.moveRight(this.speed);
            } else if(this.world.keystrokes.KEY_SPACE) {
                this.handleKeystrokeSpace();
            } else {
                this.checkAndSetIdle();
            }
            this.x < widthCanvas ? this.world.screenTranslateX = -this.x : null;
        }, 1000 / 60);
        this.intervals.push(intervalId);
    }


    /**
     * Throw bottle keystroke handler (slower interval)
     */
    throwBottleKeystrokeHandler() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.world.keystrokes.KEY_B) {
                // this.throwBottle();
                debounceLeading(lastKeystroke_THROW, 100) ? this.throwBottle() : null;
                // debounceDelayed(lastKeystroke_THROW, 100) ? this.throwBottle() : null;
            } 
        }, 150);
        this.intervals.push(intervalId);
    }


    /**
     * Handle keystroke SPACE (jump)
     */
    handleKeystrokeSpace() {
        if(this.isAboveGround()) return;
        this.jump(30);
        startAudioDebouncedLeading(this.audioCache.jump, lastKeystroke_JUMP, 125);
    }


    /**
     * Check and handle idle
     */
    checkAndSetIdle() {
        let timePassed = new Date().getTime() - lastKeystroke;
        if(timePassed >= 3000 && timePassed < 6000) {
            this.isIdle = true;
        } else if(timePassed >= 6000) {
            this.isIdleLong = true;
        }
    }


    /**
     * Interval to animate walking, hurt, death
     */
    animateWalkingHurtDeath() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(!this.isAboveGround()) {
                if(this.isDead()) {
                    this.handlingDeath();
                    stopAudio(this.audioCache.idle);
                    startAudioDebouncedLeading(this.audioCache.dead, this.lastHit, 125, 0.7);
                } else if(this.isHurt()) {
                    this.handlingHurt();
                    stopAudio(this.audioCache.idle);
                    startAudioDebouncedLeading(this.audioCache.hurt, this.lastHit, 125);
                } else if(!this.isIdle && !this.isIdleLong) {
                    this.walkingAnimation();
                }
            }
        }, 50); 
        this.intervals.push(intervalId);
    }


    /**
     * Interval to animate jumping
     */
    animateJumping() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isAboveGround()) {
                this.jumpingAnimation();
             }
        }, 100); 
        this.intervals.push(intervalId);
    }


    /**
     * Interval to animate idle
     */
    animateIdle() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            this.idleAnimation();
        }, 300); 
        this.intervals.push(intervalId);
    }


    /**
     * Walking animation
     */
    walkingAnimation() {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            super.walkingAnimation();
            stopAudio(this.audioCache.idle);
            startAudio(this.audioCache.walk);
        } else {
            stopAudio(this.audioCache.walk);
        }
    }


    /**
     * Idle and long idle animation
     */
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


    /**
     * Move left
     * @param {number} speed 
     */
    moveLeft(speed) {
        if(this.x > (widthCanvas * -1) + 8) {
            this.x -= speed;
        }
    }


    /**
     * Move right
     * @param {number} speed 
     */
    moveRight(speed) {
        if(this.x < (widthCanvas * 2) - this.width) {
            this.x += speed;
        }
    }


    /**
     * Collect object
     * @param {object} obj - collectable object (bottle, coin)
     */
    collectObject(obj) {
        if(!obj.collectableObj || obj.collected) return;
        let objName = obj.constructor.name.toLowerCase();
        this[objName + 's'].push(obj);
        this[objName + 'Status'] += obj.value;
        obj.collected = true;
        obj.hideObject();
        startAudioResumed(obj.audioCache.collect);
        console.log('collected', obj.objectName, '#' + this[objName + 's'].length, 'Status', this[objName + 'Status']);
    }
    
    
    /**
     * Throw bottle
     */
    throwBottle() {
        console.log('#bottles before throw', this.bottles.length)
        if(this.bottles.length <= 0) return;
        let bottle = this.bottles[0];
        bottle.x = Math.round(this.borderX);
        bottle.y = Math.round(this.borderY - (bottle.height * 0.5));
        bottle.handleThrow(this);
        console.log('Thrown bottle', bottle.objectName);
        this.throwing = true;
            this.bottles.shift();
            this.bottleStatus -= bottle.value;
            this.throwing = false;
            console.log('#bottles after throw', this.bottles.length)
        // setTimeout(() => {
        //     this.bottles.shift();
        //     this.bottleStatus -= bottle.value;
        //     this.throwing = false;
        //     console.log('#bottles after throw', this.bottles.length)
        // }, 50);
    }


    /**
     * Jump animation on game win
     */
    winJump() {
        this.otherDirection ? this.otherDirection = false : null;
        this.x = 0;
        this.setWalkGroundY();
        this.jump(80);
        this.loadImage(this.IMAGES_JUMPING[3]);
    }


}