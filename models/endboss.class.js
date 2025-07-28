let endbossId = 0;

/**
 * Class for the endboss
 */
class Endboss extends MovableObject {

    isEnemy = true;
    width = this.width * 2;
    height = this.width / 0.86;
    strength = 10;
    active = false;
    lastApproach = null;

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

    IMAGES_DEATH = [
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

        this.setRandomPosX(2.2, 2.75);
        this.setWalkGroundY();
        // this.setRandomPosX(1);
        this.roundCoordinates();
        this.roundDimensions();

        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_ALERT);
        this.setImageCache(this.IMAGES_ATTACK);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEATH);
        this.setAudioCache(this.audioFiles);
        this.loadImage(this.IMAGES_WALKING[0]);

        this.animate();
        this.saveIntervalsGlobally();
    }


    /**
     * Animation intervals
     */
    animate() {

        intervalId = setInterval(() => {
            if(gameIsPaused || !this.active) return;
            if(this.isAttacking()) {
                this.handlingAttack();
            } else if(this.isAlert()) {
                this.handlingAlert();
            }
        }, 50);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused || !this.active) return;
            if(this.isDead()) {
                this.handlingDeath();
            } else if(this.isHurt()) {
                this.handlingHurt();
            }
        }, 100);  
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused || !this.active) return;
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
            if(gameIsPaused || !this.active) return;
            if(this.isDead() || this.isHurt() || this.isAlert()) return;
            if(this.isAttacking()) {
                this.moveLeft(1, 1.5, false);
            } else {
                this.moveLeft(0.15, 0.66, false);
            }
        }, 1000 / 60); 
        this.intervals.push(intervalId);

    }


    /**
     * Stop the walking audios
     */
    stopWalkAudios() {
        stopAudio(this.audioCache.walk);
        stopAudio(this.audioCache.alert);
        stopAudio(this.audioCache.attack);
    }


    /**
     * Check if close to character
     * @returns {boolean}
     */
    isCloseToCharacter() {
        let characterCenterX = this.world.character.x + (this.world.character.width  / 2);
        return (this.borderX -characterCenterX < (widthCanvas / 2.5));
    }


    /**
     * Check if very close to character
     * @returns {boolean}
     */
    isVeryCloseToCharacter() {
        let characterCenterX = this.world.character.x + (this.world.character.width  / 2);
        return (this.borderX -characterCenterX < (widthCanvas / 3));
    }


    /**
     * Set last approach time (=if close to character)
     */
    setLastCharacterApproachTime() {
        if(this.isCloseToCharacter()) {
            if(this.lastApproach === null) {
                this.lastApproach = new Date().getTime();
            }
        } else {
            this.lastApproach = null;
        }
        console.log('lastApproach', this.lastApproach);
    }


    /**
     * Check if is on alert
     * @returns {boolean}
     */
    isAlert() {
        this.setLastCharacterApproachTime();
        if(this.isAttacking()) return;
        if(!this.isCloseToCharacter()) return;
        return trueDuring(this.lastApproach, 3000);
    }


    /**
     * Handling if on alert
     */
    handlingAlert() {
        let imagePaths = 'IMAGES_ALERT';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    /**
     * Check if is attacking
     */
    isAttacking() {
        // return this.isVeryCloseToCharacter() && (this.healthStatus > 0 && this.healthStatus < 70);
        return this.isVeryCloseToCharacter();
    }


    /**
     * Handling the attack (attack animation)
     */
    handlingAttack() {
        let imagePaths = 'IMAGES_ATTACK';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    /**
     * Handling if hurt
     */
    handlingHurt() {
        this.stopWalkAudios()
        // stopAudio(this.audioCache.walk);
        // stopAudio(this.audioCache.walkSteps);
        startAudio(this.audioCache.hurt, 0.6);
        super.handlingHurt();
    }


    /**
     * Handling if dead
     */
    handlingDeath() {
        // console.log(this.countDeadHandling);
        // if(this.countDeadHandling === 0) {
            this.stopWalkAudios()
            // stopAudio(this.audioCache.walk);
            // stopAudio(this.audioCache.walkSteps);
            startAudio(this.audioCache.dead);
            super.handlingDeath();
        // }
    }

}

    