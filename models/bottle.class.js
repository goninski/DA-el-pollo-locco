/** Class representing a bottle */
class Bottle extends CollectableObject {

    static instanceId = 0;
    
    width = this.width * 0.7
    height = this.width * 1;
    objectPadding = [0.1, 0.2, 0.1, 0.2];
    value = 10;
    strength = 10;
    throwableObj = true;

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
        this.instanceId++;
        this.objectName += this.instanceId;
        this.roundDimensions();
        this.setRandomPosX();
        this.setWalkGroundY();
        this.setImageCache(this.IMAGES_THROW);
        this.setImageCache(this.IMAGES_SPLASH);
        let index = Math.floor(Math.random() * 2);
        this.loadImage(this.IMAGES_GROUND[index]);
        this.setAudioCache(this.audioFiles);
        this.animate();
}


    /**
     * Animation interval
     */
    animate() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.throwing) {
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
        this.speedY = speed;
        this.applyGravity()
        this.throwing = true;
        this.throwingInterval = setInterval(() => {
            fromObj.otherDirection ? this.x -= moveX : this.x += moveX;
        }, 25);
    }


    /**
     * Handling of a flying bottle
     */
    handleFlying() {
        if(this.isSplashing() && !this.splashed) {
            clearInterval(this.throwingInterval);
            this.y = this.groundY + (this.height / 2);
            this.splashingAnimation();
            setTimeout(() => this.splashed = true, 750);
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
        startAudioResumed(this.audioCache.flying);
        let imagePaths = 'IMAGES_THROW';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    /**
     * Check if bottle is splashing
     * @returns {boolean}
     */
    isSplashing() {
        if(!this.collected || this.isAboveGround()) return;
        // console.log(this.objectName, 'isSplashing');
        return true;
    }

   
    /**
     * Splashing animation
     */
    splashingAnimation() {
        startAudio(this.audioCache.splash);
        let imagePaths = 'IMAGES_SPLASH';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    /**
     * Handle splashed bottle
     */
    handleSplashed() {
        this.throwing = false;
        this.destroyed = true;
        this.clearIntervals(0);
        this.loadImage(this.IMAGES_SPLASH[5]);
    }

}

