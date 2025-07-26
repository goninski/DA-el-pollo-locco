let chickenId = 0;

class Chicken extends MovableObject {
    isEnemy = true;
    height = this.width / 1.02;
    statusValue = 3;

    IMAGES_WALKING = [
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
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

        this.setRandomPosX(0.5, 3);
        this.setWalkGroundY();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_DEAD);
        this.setAudioCache(this.audioFiles);

        this.animate();
        this.saveIntervalsGlobally();
    }


    animate() {

        intervalId = setInterval(() => {
            // console.log(this.objectName, 'hits:', this.hits, 'health:', this.healthStatus);
            if(this.isDead()) {
                this.deadHandling();
            }
        }, 50);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(!this.isDead()) {
                this.walkingAnimation();
                startAudio(this.audioCache.walk, 0.25, true);
            }
        }, 200);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(!this.isDead()) {
                this.moveLeft(0.15, 0.45, false);
            }
        }, 1000 / 60); 
        this.intervals.push(intervalId);
    }


    deadHandling() {
        if(this.countDeadHandling === 0) {
            stopAudio(this.audioCache.walk);
            this.playAudio(this.audioCache.dead);
            super.deadHandling();
        }
    }


    playAudio(audioObj) {
        this.audio = audioObj;
        this.audio.play();
    }


}

