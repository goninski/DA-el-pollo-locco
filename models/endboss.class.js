let endbossId = 0;

class Endboss extends MovableObject {
    type = 'enemy';
    width = this.width * 2;
    height = this.width / 0.86;
    statusValue = 15;

    IMAGES_WALKING = [
        imgPathBase + '4_enemie_boss_chicken/1_walk/G1.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G2.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G3.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        imgPathBase + '4_enemie_boss_chicken/2_alert/G5.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G6.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G7.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G8.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G9.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G10.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G11.png',
        imgPathBase + '4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        imgPathBase + '4_enemie_boss_chicken/3_attack/G13.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G14.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G15.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G16.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G17.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G18.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G19.png',
        imgPathBase + '4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        imgPathBase + '4_enemie_boss_chicken/4_hurt/G21.png',
        imgPathBase + '4_enemie_boss_chicken/4_hurt/G22.png',
        imgPathBase + '4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        imgPathBase + '4_enemie_boss_chicken/5_dead/G24.png',
        imgPathBase + '4_enemie_boss_chicken/5_dead/G25.png',
        imgPathBase + '4_enemie_boss_chicken/5_dead/G26.png',
    ];


    constructor() {

        super();
        endbossId++;
        this.objectName += endbossId;
        this.x = (widthCanvas * 1.5) + (Math.random() * widthCanvas * 2);
        this.setWalkGroundY();
        // this.setBorderCoordinates();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);

        // this.movementAnimationAuto(this.IMAGES_WALKING, 150);
        // this.moveLeftAuto(0.15, 0.66, false);

        this.animate();
        this.saveIntervalsGlobally();

    }


    animate() {

        intervalId = setInterval(() => {
            if(this.isDead()) {
                // console.log('isDead', this.healthStatus);
                this.deadHandling();
            }
        }, 500);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(!this.isDead()) {
                this.walkingAnimation();
            }
        }, 150);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(!this.isDead()) {
                this.moveLeft(0.15, 0.66, false);
            }
        }, 1000 / 60); 
        this.intervals.push(intervalId);

    }


}

    