let chickenId = 0;

/**
 * Class for the chickens 
 */
class Chicken extends MovableObject {

    isEnemy = true;
    height = this.width / 1.02;
    strength = 3;

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


    constructor() {

        super();
        chickenId++;
        this.objectName += chickenId;
        this.roundDimensions();
        this.setRandomPosX(0.5, 3);
        // this.setRandomPosX(0.5, 1.2);
        this.setWalkGroundY();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_DEATH);
        this.setAudioCache(this.audioFiles);

        this.animate();
        this.saveIntervalsGlobally();
    }


    /**
     * Animation intervals
     */
    animate() {

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead()) {
                this.handlingDeath();
            }
        }, 50);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(!this.isDead()) {
                this.walkingAnimation();
                startAudio(this.audioCache.walk, 0.25, true);
            }
            // this.consoleObjectCoordinates('(chicken.interval200)');

        }, 200);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(!this.isDead()) {
                this.moveLeft(0.15, 0.45, false);
            }
        }, 1000 / 60); 
        this.intervals.push(intervalId);
    }


    /**
     * Handling death
     */
    handlingDeath() {
        if(this.countDeadHandling === 0) {
            stopAudio(this.audioCache.walk);
            startAudio(this.audioCache.dead);
            super.handlingDeath();
        }
    }


}

