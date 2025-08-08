/** Class representing a endboss */
class Endboss extends MovableObject {

    world;
    isEnemy = true;
    width = this.width * 2;
    height = this.width / 0.86;
    objectPadding = [0.15, 0, 0, 0];
    strength = 20;
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
        walkSteps : audioPathBase + 'walk-step.mp3',
        alert : audioPathBase + 'endboss-alert.mp3',
        attack : audioPathBase + 'endboss-attack.mp3',
        hurt : audioPathBase + 'endboss-hurt.mp3',
        death : audioPathBase + 'endboss-death.mp3',
    }


    /**
     * Create a endboss
     */
    constructor() {
        super();
        this.setRandomPosX(2.2, 2.75);
        this.setWalkGroundY();
        this.roundCoordinates();
        this.roundDimensions();
        this.setMediaCache();
        this.showImageFromCache('IMAGES_WALKING');
        this.animate();
    }


    /**
     * set media cache
     */
    setMediaCache() {
        this.setImageCache(this.IMAGES_WALKING);
        this.setImageCache(this.IMAGES_ALERT);
        this.setImageCache(this.IMAGES_ATTACK);
        this.setImageCache(this.IMAGES_HURT);
        this.setImageCache(this.IMAGES_DEATH);
        this.setAudioCache(this.audioFiles);
    }


    /**
     * Animate calls
     */
    animate() {
        this.animateMoving();
        this.animateAlertAttack();
        this.animateHurtDeath();
        this.animateAudios();
        this.animateWalkingAudios();
        this.saveIntervalsGlobally();
    }


    /**
     * Animate moving
     */
    animateMoving() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || !this.active) return;
            if(this.isDying() || this.isHurt() || this.isAlert()) return;
            if(this.isAttacking()) {
                this.moveLeft(1, 2, false);
            } else {
                this.moveLeft(0.15, 0.66, false);
            }
        }, 1000 / 60); 
        this.intervals.push(intervalId);
    }


    /**
     * Animate alert and attack
     */
    animateAlertAttack() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || !this.active) return;
            if(this.isDying() || this.isHurt()) return;
            if(this.isAttacking()) {
                this.attackAnimation();
            } else if(this.isAlert()) {
                this.alertAnimation();
            }
        }, 50);  
        this.intervals.push(intervalId);
    }


    /**
     * Animate hurt and death
     */
    animateHurtDeath() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || !this.active) return;
            if(this.isDying()) {
                this.handlingDeath(1500);
                this.stopAudio(this.audioCache.walk);
                this.startAudio(this.audioCache.death);
            } else if(this.isHurt()) {
                this.handlingHurt();
                this.stopAudio(this.audioCache.walk);
                this.startAudio(this.audioCache.hurt, 0.6);
            }
        }, 100);  
        this.intervals.push(intervalId);
    }


    /**
     * Animate audios for walking, alert, attack
     */
    animateAudios() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || !this.active) return;
            if(this.isDying() || this.isHurt()) return;
            if(this.isAttacking()) {
                this.handlingAttack();
            } else if(this.isAlert()) {
                this.handlingAlert();
            } else {
                this.walkingAnimation();
                this.stopAudio(this.audioCache.alert);
                this.startAudio(this.audioCache.walk, 0.33, true);
            }
        }, 150);  
        this.intervals.push(intervalId);
    }


    /**
     * Animate audios for walking
     */
    animateWalkingAudios() {
        intervalId = setInterval(() => {
            if(gamePaused || this.dead || !this.active) return;
            if(this.isDying() || this.isHurt()) return;
            if(this.isAttacking() || this.isAlert()) return;
            this.startAudio(this.audioCache.walkSteps, 0.5);
        }, 175);  
        this.intervals.push(intervalId);
    }

    
    /**
     * Check if close to character
     * @param {number} distance - distance in % of the canvas width
     * @returns {boolean}
     */
    isCloseToCharacter(distance) {
        let characterPos = this.world.character.borderX + this.world.character.borderWidth;
        return (this.borderX - characterPos < (widthCanvas * distance / 100));
    }


    /**
     * Check if character is acting (jumping/throwing)
     * @returns {boolean}
     */
    isCharacterActing() {
        return (this.world.character.isAboveGround() || this.world.character.throwing);   
    }


    /**
     * Return true if alert is needed
     */
    isAlert() {
        if(this.isAttacking()) return;
        if(this.world.character.idle || this.world.character.idleLong) return;
        return (this.isCloseToCharacter(45) || this.isCharacterActing());
    }


    /**
     * Return true if attack is needed
     */
    isAttacking() {
        if(this.world.character.dead || this.world.character.isDying()) return;
        if(this.world.character.idle || this.world.character.idleLong) return;
        return (this.isCloseToCharacter(33) || this.isCharacterActing());
    }


    /**
     * Handling if on alert
     */
    handlingAlert() {
        this.stopAudio(this.audioCache.hurt);
        this.stopAudio(this.audioCache.attack);
        this.stopAudio(this.audioCache.walk);
        this.startAudio(this.audioCache.alert, 1);
    }


    /**
     * Handling if on attack
     */
    handlingAttack() {
        this.stopAudio(this.audioCache.hurt);
        this.stopAudio(this.audioCache.alert);
        this.stopAudio(this.audioCache.walk);
        this.startAudio(this.audioCache.walkSteps, 0.5);
        this.startAudio(this.audioCache.attack, 1);
    }
    
    
    /**
     * Alert animation
     */
    alertAnimation() {
        let imagePaths = 'IMAGES_ALERT';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    /**
     * Attack Animation
     */
    attackAnimation() {
        let imagePaths = 'IMAGES_ATTACK';
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


}

    