let bottleId = 0;

class Bottle extends CollectableObject {
    width = this.width * 0.7
    height = this.width * 1;
    objectPadding = [0.1, 0.2, 0.1, 0.2];
    value = 10;
    strength = 10;
    throwable = true;

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

    
    constructor() {

        super();
        bottleId++;
        this.objectName += bottleId;

        this.setRandomPosX();
        this.setWalkGroundY();
        // this.setBorderCoordinates();

        this.setImageCache(this.IMAGES_THROW);
        this.setImageCache(this.IMAGES_SPLASH);
        let index = Math.floor(Math.random() * 2);
        this.loadImage(this.IMAGES_GROUND[index]);
        this.setAudioCache(this.audioFiles);

        this.animate();

    }


    animate() {

        intervalId = setInterval(() => {
            if(this.throwing) {
                this.handleFlying();
            }
        }, 100);  
        this.intervals.push(intervalId);

    }

   
    handleFlying() {
        console.log('\n\nisThrowing', this.objectName);
        console.log('Border from', this.objectName, '(x-right, y-bottom):', this.borderX + this.borderWidth, this.borderY + this.borderHeight);

        if(this.isSplashing() && !this.splashed) {
            clearInterval(this.throwingInterval);
            this.y = this.groundY + (this.height / 2);
            this.splashingAnimation();
            setTimeout(() => this.splashed = true, 750);
        } else if(this.splashed) {
            this.throwing = false;
            this.used = true;
            this.loadImage(this.IMAGES_SPLASH[5]);
            this.clearIntervals(0);
            // this.handleSplash();
        } else {
            this.flyingAnimation();
        }
    }


    flyingAnimation() {
        startAudioResumed(this.audioCache.flying);
        let imagePaths = 'IMAGES_THROW';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }



    isSplashing() {
        if(!this.collected || this.used || this.isAboveGround()) return;
        // console.log(this.objectName, 'isSplashing');
        return true;
    }


    handleSplash() {
        this.throwing = false;
        this.used = true;
        this.loadImage(this.IMAGES_SPLASH[5]);
        this.clearIntervals(0);
        // pauseGame();
    }

    
    splashingAnimation() {
        startAudio(this.audioCache.splash);
        let imagePaths = 'IMAGES_SPLASH';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }

}

