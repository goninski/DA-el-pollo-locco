/**Class representing the main character (Pepe) */
class Character extends MovableObject {

    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    objectPadding = [0.375, 0.11, 0.04, 0.11];
    otherDirection = false;
    speed = 10;
    coinStatus = 0;
    bottleStatus = 0;
    coins = [];
    bottles = [];
    throwDebounceCounter = 0;
    lastThrow = 0;
    thrownBottle = {};
    idle = false;
    idleLong = false;

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

    IMAGES_WIN = [
        imgPathBase + '2_character_pepe/3_jump/J-31.png',
        imgPathBase + '2_character_pepe/3_jump/J-32.png',
        imgPathBase + '2_character_pepe/3_jump/J-33.png',
        imgPathBase + '2_character_pepe/3_jump/J-34.png',
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
        idle : audioPathBase + 'character-idle.mp3',
        walk : audioPathBase + 'character-walk.mp3',
        walkSteps : audioPathBase + 'walk-step.mp3',
        jump : audioPathBase + 'character-jump.mp3',
        hurt : audioPathBase + 'character-hurt.mp3',
        death : audioPathBase + 'character-death.mp3',
        win : audioPathBase + 'character-win.wav',
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
        this.setImageCache(this.IMAGES_WIN);
        this.setImageCache(this.IMAGES_DEATH);
        this.setAudioCache(this.audioFiles);
    }


    /**
     * Animate interval calls
     */
    animate() {
        this.keystrokesHandler(); //1000/60
        this.animateWalkingHurtDeath(); //50ms
        this.animateJumping(); //100ms
        this.animateIdle(); //300ms
        this.saveIntervalsGlobally();
    }


    /**
     * Interval for: keystrokes handler 
     */
    keystrokesHandler() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || this.isDying()) return;
            if(this.world.isGameWon()) {
                this.winJump();
            } else if(this.world.keystrokes.KEY_LEFT) {
                this.moveLeft(this.speed);
            } else if(this.world.keystrokes.KEY_RIGHT) {
                this.moveRight(this.speed);
            } else if(this.world.keystrokes.KEY_SPACE) {
                this.jump();
            } else if(this.world.keystrokes.KEY_B) {
                this.throwBottle();
            } else {
                this.setIdleState();
            }
            this.x < widthCanvas ? this.world.screenTranslateX = -this.x : null;
        }, 1000 / 60);
        this.intervals.push(intervalId);
    }


    /**
     * Interval for: Animation of walking/hurt/death, set idleState
     */
    animateWalkingHurtDeath() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead) return;
            if(!this.isAboveGround()) {
                if(this.isDying()) {
                    this.disableIdle();
                    this.startAudio(this.audioCache.death,0.7);
                    this.handlingDeath();
                } else if(this.isHurt()) {
                    this.disableIdle();
                    this.startAudio(this.audioCache.hurt);
                    this.handlingHurt();
                } else if(this.idle || this.idleLong) {
                    return;
                } else {
                    this.walkingAnimation();
                }
            }
        }, 50); 
        this.intervals.push(intervalId);
    }


    /**
     * Interval for: jumping animation
     */
    animateJumping() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || this.isDying()) return;
            if(this.world.isGameWon()) {
                this.winJumpAnimation();
            } else if(this.isAboveGround()) {
                this.jumpingAnimation();
             }
        }, 100); 
        this.intervals.push(intervalId);
    }


    /**
     * Interval for: idle animation
     */
    animateIdle() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || this.isHurt() || this.isDying()) return;
            // console.log('\nanimateIdle Interval');
            // console.log('idle', this.idle);
            // console.log('idleLong', this.idleLong);
            if(this.idle) {
                console.log('animateIdle.idle');
                this.img = this.imageCache[this['IMAGES_IDLE'][0]];
                this.movementAnimation(this['IMAGES_IDLE']);
            } else if(this.idleLong) {
                console.log('animateIdle.idleLong');
                // this.img = this.imageCache[this['IMAGES_IDLE_LONG'][0]];
                this.movementAnimation(this['IMAGES_IDLE_LONG']);
                this.startAudio(this.audioCache.idle);
            } 
        }, 300); 
        this.intervals.push(intervalId);
    }


    /**
     * Handle jump keystroke
     */
    jump() {
        if(this.isAboveGround()) return;
        this.disableIdle();
        this.startAudio(this.audioCache.jump);
        super.jump(30);
    }


    /**
     * Check and set idle states
     */
    setIdleState() {
        if(gamePaused || this.dead || this.isDying()) return;
        let timePassed = new Date().getTime() - lastKeystroke;
        if(timePassed >= 3000 && timePassed < 6000) {
            this.idle = true;
            this.idleLong = false;
        } else if(timePassed >= 6000) {
            this.idle = false;
            this.idleLong = true;
        } else {
            this.idle = false;
            this.idleLong = false;
        }
        // console.log('\nidle', this.idle);
        // console.log('idleLong', this.idleLong);
    }


    /**
     * disable idle
     */
    disableIdle() {
        this.idle = false;
        this.idleLong = false;
        this.stopAudio(this.audioCache.idle);
    }


    /**
     * Walking animation
     */
    walkingAnimation() {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
        if(this.world.keystrokes.KEY_RIGHT || this.world.keystrokes.KEY_LEFT) {
            // this.disableIdle();
            super.walkingAnimation();
        }
    }

    
    /**
     * Move left
     * @param {number} speed 
     */
    moveLeft(speed) {
        this.disableIdle();
        this.otherDirection = true;
        this.startAudio(this.audioCache.walkSteps);
        if(this.x > (widthCanvas * -1) + 8) {
            this.x -= speed;
        }
    }


    /**
     * Move right
     * @param {number} speed 
     */
    moveRight(speed) {
        this.disableIdle();
        this.otherDirection = false;
        this.startAudio(this.audioCache.walkSteps);
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
        if(this.x === 0) return;
        let objName = obj.constructor.name.toLowerCase();
        this[objName + 's'].push(obj);
        this[objName + 'Status'] += obj.value;
        obj.collected = true;
        obj.hideObject();
        this.startAudioResumed(obj.audioCache.collect);
        consoleHits ? console.log('collected', obj.objectName, '#' + this[objName + 's'].length, 'Status', this[objName + 'Status']) : null;
    }
    
    
    /**
     * Throw bottle 
     */
    throwBottle() {
        this.disableIdle();
        if(this.bottles.length <= 0) return;
        this.throwDebounceCounter++;
        if(this.throwDebounceCounter === 1) {
            this.lastThrow = new Date().getTime();
            let bottle = this.bottles[0];
            this.thrownBottle = bottle;
            bottle.x = Math.round(this.borderX);
            bottle.y = Math.round(this.borderY - (bottle.height * 0.5));
            bottle.handleThrow(this);
            this.bottleStatus -= bottle.value;
            this.bottles.shift();
        }
        debounceDelayed(this.lastThrow, 1000) ? this.throwDebounceCounter = 0 : null;
    }


    /**
     * Win jump animation
     * @param {string} imagePaths - variable name for the win jump images array
     */
    winJumpAnimation(imagePaths = 'IMAGES_WIN') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    /**
     * Jump animation on game win
     */
    winJump() {
        this.disableIdle();
        this.x = 0;
        this.setWalkGroundY();
        super.jump(30);
        this.startAudio(this.audioCache.win);
        this.clearIntervals(1500);
        this.loadImage(this.IMAGES_WIN[3]);
    }


    /**
     * check if dying
     * @returns {boolean}
     */
    isDying() {
        return super.isDying(2500);
    }

}