let littleChickenId = 0;

/**Class representing a little chicken  */
class LittleChicken extends Chicken {

    isEnemy = true;
    width = this.width * 0.66;
    height = this.width / 1.12;
    strength = 8;

    IMAGES_WALKING = [
        imgPathBase + '3_enemies_chicken/chicken_small/1_walk/1_w.png',
        imgPathBase + '3_enemies_chicken/chicken_small/1_walk/2_w.png',
        imgPathBase + '3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEATH = [
        imgPathBase + '3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    audioFiles = {
        walk : audioPathBase + 'chicken-walk.mp3',
        dead : audioPathBase + 'chicken-death.mp3',
    }


    /**
     * Create a chicken - and place it randomly on ground level
     */
    constructor() {
        super();
        littleChickenId++;
        this.objectName += littleChickenId;
        this.roundDimensions();
        this.setRandomPosX(0.5, 3);
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
            if(gameIsPaused || this.dead) return;
            if(this.isDying()) {
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
            if(gameIsPaused || this.dead || this.isDying()) return;
            this.walkingAnimation();
            this.startAudio(this.audioCache.walk, 0.15, true);
        }, 200);  
        this.intervals.push(intervalId);
    }


    /**
     * AnimateMoving
     */
    animateMoving() {
        intervalId = setInterval(() => {
            if(gameIsPaused || this.dead || this.isDying()) return;
            this.moveLeft(0.075, 0.2, false);
        }, 1000 / 60); 
        this.intervals.push(intervalId);
    }


    /**
     * Handling death
     */
    handlingDeath(animDuration = 75) {
        super.handlingDeath(animDuration);
        if(this.deathDebounceCounter === 1) {
            this.startAudio(this.audioCache.death, 0.4);
            this.stopOtherAudios();
        }
    }


}

