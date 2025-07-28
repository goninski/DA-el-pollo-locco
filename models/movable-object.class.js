/**
 * Class for moveable objects
 */
class MovableObject extends DrawableObject {

    isEnemy = false;
    groundY;
    speedY = 0;
    acceleration = 2.5;
    strength = 0;
    healthStatus = 100;
    hits = 0;
    lastHit = 0;
    intervals = [];
    audio;
    audioFiles = {};
    audioCache = {};
    countDeadHandling = 0;


    constructor() {
        super();
    }


    /**
     * Set audio cache
     * @param {object} audioFiles - object with audiofile names
     */
    setAudioCache(audioFiles) {
        for (let [type, path] of Object.entries(audioFiles)) {
            this.audioCache[type] = new Audio(path);
        }
    }


    /**
     * Movement animation (acts as a loop within intervals)
     * @param {array} imagePaths - image paths
     */
    movementAnimation(imagePaths) {
        if(gameIsPaused === true) return;
        let index = this.currentImage % imagePaths.length;
        let path = imagePaths[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }    


    /**
     * Execute walking animation
     * @param {string} imagePaths - variable name for the walking images array
     */
    walkingAnimation(imagePaths = 'IMAGES_WALKING') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    /**
     * Execute jumping animation
     * @param {string} imagePaths - variable name for the jumping images array
     */
    jumpingAnimation(imagePaths = 'IMAGES_JUMPING') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    /**
     * Execute hurt animation
     * @param {string} imagePaths - variable name for the hurting images array
     */
    hurtAnimation(imagePaths = 'IMAGES_HURT') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    /**
     * Execute death animation
     * @param {string} imagePaths - variable name for the death images array
     */
    deathAnimation(imagePaths = 'IMAGES_DEATH') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    /**
     * Move left
     * @param {number} speedMin - minimal speed
     * @param {number} speedMax - maximal speed
     */
    moveLeft(speedMin = 0.15, speedMax = null) {
        if(gameIsPaused === true) return;
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        this.x -= speed;
    }

    
    /**
     * Apply gravity
     */
    applyGravity() {
        intervalId = setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        this.intervals.push(intervalId);
    }


    /**
     * Jump (apply speed)
     * @param {number} speedY - vertical speed
     */
    jump(speedY) {
        this.speedY = speedY;
    }

    
    /**
     * Check if is above ground
     * @returns {boolean}
     */
    isAboveGround() {
        return this.y < this.groundY;
    }


    /**
     * Check if touches a counter object
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    touchesObject(fromObj, xBuffer = 0) {
        this.setBorderCoordinates();
        // this.consoleObjectCoordinates('(isHitFromAbove ?)');
        if((this.borderY > fromObj.borderY + fromObj.borderHeight)) return;
        if((this.borderY + this.borderHeight < fromObj.borderY)) return;
        if(!this.isHitFromSide(fromObj, xBuffer)) return;
        return true;
    }


    // touchesObject(fromObj, xBuffer = 0) {
    //     this.setBorderCoordinates();
    //     return ( (this.borderX < fromObj.borderX) && (this.borderX + this.borderWidth > fromObj.borderX) && (this.borderY < fromObj.borderY + fromObj.borderHeight) && (this.borderY + this.borderHeight > fromObj.borderY) );
    // }


    /**
     * Check if is hit from a counter object
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    isHit(fromObj, xBuffer = 0) {
        return this.touchesObject(fromObj, xBuffer);
    }


    /**
     * Check if is hit from the sides
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    isHitFromSide(fromObj, xBuffer = 0) {
        // xBuffer = 0;
        this.setBorderCoordinates();
        let thisX = this.borderX;
        let fromX = fromObj.borderX;
        if((thisX + xBuffer > fromX + fromObj.borderWidth)) return;
        if((thisX + this.borderWidth < fromX + xBuffer)) return;
        return true;
    }


    /**
     * Check if is hit from a above from a counter object
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    isHitFromAbove(fromObj, xBuffer = 0) {
        this.setBorderCoordinates();
        // if(fromObj instanceof Character) {
        //     fromObj.consoleObjectCoordinates('(otherDirection '+ fromObj.otherDirection);
        // }
        if(!fromObj.isAboveGround()) return;
        if((this.borderY > fromObj.borderY + fromObj.borderHeight)) return;
        if(!this.isHitFromSide(fromObj, xBuffer)) return;
        return true;
    }


    /**
     * Handling if hit from above
     * @param {object} fromObj - counter object
     */
    handlingHitFromAbove(obj) {
        obj.strength = 100;
        if(this instanceof Endboss) {
            obj.strength = 15;
        }
        console.log(this.objectName, '(handlingHitFromAbove');
        this.handlingHit(obj);
    }


    /**
     * Handling if hit from bottle
     * @param {object} fromObj - bottle object
     */
    handlingHitFromBottle(obj) {
        obj.strength = 100;
        if(this instanceof Endboss) {
            obj.strength = 10;
        }
        console.log(this.objectName, '(handlingHitFromBottle)');
        this.handlingHit(obj);
    }

  
    /**
     * General handling if hit
     * @param {object} fromObj - counter object
     */
    handlingHit(obj) {
        this.hits++;
        // if(this instanceof Endboss || this instanceof Coin) {
        //     lastWinRelevantHit = new Date().getTime();
        // }
        this.healthStatus -= obj.strength;
        if(this.healthStatus <= 0) {
            this.healthStatus = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        // console.log(this.objectName, 'is hit from', obj.objectName);
        // console.log(this.objectName, 'healthStatus:', this.healthStatus, 'hits:', this.hits);
    }


    /**
     * Check if hurt
     * @returns {boolean}
     */
    isHurt() {
        return trueDuring(this.lastHit, 500);
        // let timePassed = new Date().getTime() - this.lastHit;
        // return timePassed <= 500;
    }


    /**
     * Handling if hurt
     */
    handlingHurt() {
       this.hurtAnimation();
    }


    /**
     * Handling if dead
     */
    isDead() {
        return this.healthStatus <= 0;
    }


    /**
     * Handling death
     */
    handlingDeath(clearTimeout = 3000) {
        if(this.isEnemy && !(this instanceof Endboss)) {
            livingEnemies--;
        }
        this.countDeadHandling++;
        this.deathAnimation();
        this.clearIntervals(clearTimeout);
        this.destroyed = true;
    }


    /**
     * Save intervals globaly
     */
    saveIntervalsGlobally() {
       stoppableIntervals.push(...this.intervals);
    //    console.log(stoppableIntervals);
    }


    /**
     * Clear intervals
     */
    clearIntervals(timeout = 10000) {
       setTimeout(() => this.intervals.forEach(clearInterval), timeout);
    }


    /**
     * Destroy Object
     * @param {number} intervalTimeout 
     */
    destroyObject(intervalTimeout = 10000) {
        this.destroyed = true;
        this.y = heightCanvas + 1;
        this.x = widthCanvas + 1;
        this.roundCoordinates()
        this.clearIntervals(intervalTimeout);
    }


}