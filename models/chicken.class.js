let chickenId = 0;

class Chicken extends MovableObject {
    type = 'enemy';
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
        hurt : audioPathBase + 'silence.mp3',
        dead : audioPathBase + 'silence.mp3',
    }


    constructor() {

        super();
        chickenId++;
        this.objectName += chickenId;

        this.x = (widthCanvas * 0.8) + (Math.random() * widthCanvas * 2);
        this.setWalkGroundY();
        // this.setBorderCoordinates();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_DEAD);
        this.setAudioCache(this.audioFiles);

        // this.movementAnimationAuto(this.IMAGES_WALKING, 200);
        // this.moveLeftAuto(0.15, 0.45, false);

        this.animate();
        this.saveIntervalsGlobally();
    }


    animate() {

        intervalId = setInterval(() => {
            if(this.isDead()) {
                console.log('isDead', this.healthStatus);
                this.deadHandling();
            }
        }, 500);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(!this.isDead()) {
                this.walkingAnimation();
                this.playAudio(this.audioCache.walk, 'walk-chicken', 0.3);
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



}

