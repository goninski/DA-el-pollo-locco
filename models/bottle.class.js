let bottleId = 0;

/** Class representing a bottle */
class Bottle extends CollectableObject {

    width = this.width * 0.7
    height = this.width * 1;
    objectPadding = [0.1, 0.2, 0.1, 0.2];
    value = 20;
    strength = 10;
    throwableObj = true;
    flying = false;
    throwX = 0;
    otherDirection = false;

    IMAGES_GROUND = [
        imgPathBase + '6_salsa_bottle/1_salsa_bottle_on_ground.png',
        imgPathBase + '6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    IMAGES_THROW = [
        imgPathBase + '6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        imgPathBase + '6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        imgPathBase + '6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    audioFiles = {
        collect : audioPathBase + 'bottle-collect.mp3',
        flying : audioPathBase + 'bottle-flying.mp3',
        splash : audioPathBase + 'bottle-splash.mp3',
    }

    
    /**
     * Create a bottle - and place it randomly on ground level
     */
    constructor() {
        super();
        bottleId++;
        this.objectName += bottleId;
        this.roundDimensions();
        this.setRandomPosX();
        this.setWalkGroundY();
        this.setMediaCache();
        let index = Math.floor(Math.random() * 2);
        this.loadImage(this.IMAGES_GROUND[index]);
        this.animate();
}


    /**
     * set media cache
     */
    setMediaCache() {
        this.setImageCache(this.IMAGES_THROW);
        this.setImageCache(this.IMAGES_SPLASH);
        this.setAudioCache(this.audioFiles);
    }


    /**
     * Animation interval
     */
    animate() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.flying) {
                this.handleFlying();
            }
        }, 100);  
        this.intervals.push(intervalId);

        this.saveIntervalsGlobally();
    }

  
    /**
     * Handling of thrown bottle
     * @param {object} fromObj - object of the bottle thrower (i.g. the character) 
     * @param {number} speed - throw y-speed (i.g. coming from thrower)
     * @param {number} moveX - x-position move per interval
     */
    handleThrow(fromObj, speed = 10, moveX = 15) {
        this.flying = true;
        this.speedY = speed;
        this.applyGravity();
        this.otherDirection = fromObj.otherDirection;
        this.throwingInterval = setInterval(() => {
            this.otherDirection ? this.x -= moveX : this.x += moveX;
        }, 25);
    }


    /**
     * Handling of a flying bottle
     */
    handleFlying() {
        if(this.isSplashing()) {
            clearInterval(this.throwingInterval);
            this.y = this.groundY + (this.height / 2);
            this.splashingAnimation();
            setTimeout(() => {
                this.splashed = true;
                this.flying = false;
            }, 750);
        } else if(this.splashed) {
            this.handleSplashed();
        } else {
            this.flyingAnimation();
        }
    }


    /**
     * Flying animation
     */
    flyingAnimation() {
        this.startAudioResumed(this.audioCache.flying);
        let imagePaths = 'IMAGES_THROW';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    /**
     * Check if bottle is splashing
     * @returns {boolean}
     */
    isSplashing() {
        if(!this.collected || this.isAboveGround() || this.splashed) return;
        // console.log(this.objectName, 'isSplashing');
        return true;
    }

   
    /**
     * Splashing animation
     */
    splashingAnimation() {
        this.startAudio(this.audioCache.splash);
        // this.stopOtherAudios();
        let imagePaths = 'IMAGES_SPLASH';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    /**
     * Handle splashed bottle
     */
    handleSplashed() {
        this.flying = false;
        this.destroyed = true;
        this.clearIntervals(0);
        // this.stopAllAudios();
        this.loadImage(this.IMAGES_SPLASH[5]);
    }

}

