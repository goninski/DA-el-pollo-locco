let endbossId = 0;

class Endboss extends MovableObject {
    isEnemy = false;
    width = this.width * 2;
    height = this.width / 0.86;
    statusValue = 10;

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

    audioFiles = {
        walk : audioPathBase + 'endboss-walk.mp3',
        walkSteps : audioPathBase + 'walk.mp3',
        alert : audioPathBase + 'endboss-alert.mp3',
        attack : audioPathBase + 'endboss-attack.mp3',
        hurt : audioPathBase + 'endboss-hurt.mp3',
        dead : audioPathBase + 'endboss-dead.mp3',
    }


    constructor() {

        super();
        endbossId++;
        this.objectName += endbossId;

        this.setRandomPosX(2, 3);
        // this.setRandomPosX(1);
        this.setWalkGroundY();
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_ALERT);
        this.setImageCache(this.IMAGES_ATTACK);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEAD);
        this.setAudioCache(this.audioFiles);
        this.loadImage(this.IMAGES_WALKING[0]);

        this.animate();
        this.saveIntervalsGlobally();

    }


    animate() {

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isAttacking()) {
                this.handlingAttack();
            } else if(this.isAlert()) {
                this.handlingAlert();
            }
        }, 50);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead()) {
                this.handlingDead();
            } else if(this.isHurt()) {
                this.handlingHurt();
            }
        }, 100);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead() || this.isHurt()) return;
            startAudio(this.audioCache.walkSteps, 1);
            this.stopWalkAudios();
            if(this.isAttacking()) {
                startAudio(this.audioCache.attack, 1);
            } else if(this.isAlert()) {
                startAudio(this.audioCache.alert, 1);
            } else {
                this.walkingAnimation();
                startAudio(this.audioCache.walk, 0.33, true);
            }
        }, 150);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            if(this.isDead() || this.isHurt() || this.isAlert()) return;
            if(this.isAttacking()) {
                this.moveLeft(1, 1.5, false);
            } else {
                this.moveLeft(0.15, 0.66, false);
            }
        }, 1000 / 60); 
        this.intervals.push(intervalId);

    }


    stopWalkAudios() {
        stopAudio(this.audioCache.walk);
        stopAudio(this.audioCache.alert);
        stopAudio(this.audioCache.attack);
    }


    isCloseToCharacter() {
        let characterCenterX = this.world.character.x + (this.world.character.width  / 2);
        return (this.borderX -characterCenterX < (widthCanvas / 2));
    }


    isVeryCloseToCharacter() {
        let characterCenterX = this.world.character.x + (this.world.character.width  / 2);
        return (this.borderX -characterCenterX < (widthCanvas / 3));
    }


    isAlert() {
        return this.isCloseToCharacter() && !this.isAttacking();
    }


    handlingAlert() {
        let imagePaths = 'IMAGES_ALERT';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    isAttacking() {
        // return this.isVeryCloseToCharacter() && (this.healthStatus > 0 && this.healthStatus < 70);
        return this.isVeryCloseToCharacter();
    }


    handlingAttack() {
        let imagePaths = 'IMAGES_ATTACK';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    handlingHurt() {
        stopAudio(this.audioCache.walk);
        stopAudio(this.audioCache.walkSteps);
        startAudio(this.audioCache.hurt, 0.6);
        super.handlingHurt();
    }


    handlingDead() {
        // console.log(this.countDeadHandling);
        // if(this.countDeadHandling === 0) {
            stopAudio(this.audioCache.walk);
            stopAudio(this.audioCache.walkSteps);
            startAudio(this.audioCache.dead);
            super.handlingDead();
        // }
    }


}

    