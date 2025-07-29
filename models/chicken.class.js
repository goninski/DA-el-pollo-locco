let chickenId = 0;

/**Class representing a chicken  */
class Chicken extends MovableObject {

    isEnemy = true;
    height = this.width / 1.02;
    strength = 15;

    IMAGES_WALKING = [
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEATH = [
        imgPathBase + '3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    audioFiles = {
        walk : audioPathBase + 'walk-chicken.mp3',
        dead : audioPathBase + 'dead-chicken.wav',
    }


    /**
     * Create a chicken - and place it randomly on ground level
     */
    constructor() {
        super();
        chickenId++;
        this.objectName += chickenId;
        this.roundDimensions();
        this.setRandomPosX(0.5, 3);
        // this.setRandomPosX(0.5, 1.2);
        this.setWalkGroundY();
        this.setMediaCache();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.animate();
    }


    /**
     * set media cache
     */
    setMediaCache() {
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_DEATH);
        this.setAudioCache(this.audioFiles);
    }


    /**
     * Animate calls
     */
    animate() {
        this.animateDeath();
        this.animateWalking();
        this.animateMoving();
        this.saveIntervalsGlobally();
    }


    /**
     * AnimateDeath
     */
    animateDeath() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead()) {
                this.handlingDeath();
            }
        }, 50);  
        this.intervals.push(intervalId);
    }


    /**
     * AnimateWalking
     */
    animateWalking() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead()) return;
            this.walkingAnimation();
            startAudio(this.audioCache.walk, 0.25, true);
        }, 200);  
        this.intervals.push(intervalId);
    }


    /**
     * AnimateMoving
     */
    animateMoving() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead()) return;
            this.moveLeft(0.15, 0.45, false);
        }, 1000 / 60); 
        this.intervals.push(intervalId);
    }


    /**
     * Handling death
     */
    handlingDeath() {
        if(this.deathDebouncer === 0) {
            stopAudio(this.audioCache.walk);
            startAudio(this.audioCache.dead);
            super.handlingDeath();
        }
    }

}

