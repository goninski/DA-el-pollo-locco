/** Class representing a moveable object  */
class MovableObject extends DrawableObject {

    isEnemy = false;
    groundY;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    strength = 0;
    intervals = [];
    audio;
    audioFiles = {};
    audioCache = {};
    lastHit = 0;
    hitDebounceCounter = 0;
    deathDebounceCounter = 0;
    dead = false;


    /**
     * Create a movable object
     */
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
        if((this.borderY > fromObj.borderY + fromObj.borderHeight)) return;
        if((this.borderY + this.borderHeight < fromObj.borderY)) return;
        if(!this.isHitFromSide(fromObj, xBuffer)) return;
        return true;
    }


    /**
     * Check if is hit from a counter object
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    isHitOnGround(fromObj, xBuffer = 0) {
        if(this.isAboveGround()) return;
        return this.touchesObject(fromObj, xBuffer);
    }
    // isHitOnGround(fromObj, xBuffer = 0) {
    //     return this.isHitFromSide(fromObj, xBuffer);
    // }


    /**
     * Check if is hit from the sides
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    isHitFromSide(fromObj, xBuffer = 0) {
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
        if(!fromObj.isAboveGround()) return;
        if((this.borderY > fromObj.borderY + fromObj.borderHeight)) return;
        if(!this.isHitFromSide(fromObj, xBuffer)) return;
        return true;
    }


    /**
     * Check if is hit from side jump
     * @param {object} fromObj - counter object to check
     * @param {number} xBuffer - negativ x buffer (add value for more margin/precision)
     * @returns {boolean}
     */
    isHitFromSideJump(fromObj, xBuffer = 0) {
        if(!fromObj.isAboveGround()) return;
        if(!this.isHitFromSide(fromObj, xBuffer)) return;
        return true;
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
        // console.log(this.objectName, '(handlingHitFromBottle)');
        this.handlingHit(obj);
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
        // console.log(this.objectName, '(handlingHitFromAbove)');
        this.handlingHit(obj);
    }


    /**
     * Handling if hit from side jump
     * @param {object} fromObj - counter object
     */
    handlingHitFromSideJump(obj) {
        if(!(this instanceof Endboss)) return;
        this.strength = 10;
        obj.strength = 10;
        // console.log(this.objectName, '(handlingHitSideJump)');
        this.handlingHit(obj);
    }

  
    /**
     * Handling if hit from touch
     * @param {object} fromObj - counter object
     */
    handlingHitOnGround(obj) {
        obj.strength = 15;
        if(obj instanceof Endboss) {
            obj.strength = 30;
        }
        // console.log(this.objectName, '(handlingHitFromGround)');
        this.handlingHit(obj);
    }


    /**
     * General handling if hit
     * @param {object} fromObj - counter object
     */
    handlingHit(obj) {
        this.hitDebounceCounter++;
        if(this.hitDebounceCounter === 1) {
            this.lastHit = new Date().getTime();
            this.energy -= obj.strength;
            this.energy <= 0 ? this.energy = 0 : null;
        }
        debounceDelayed(this.lastHit, 1000) ? this.hitDebounceCounter = 0 : null;
        this.ConsoleLogHitDetails(obj, true);
    }


    /**
     * Log hit details in console (for debug)
     * @param {object} obj - counter object
     * @param {boolean} show - show log 
     */
    ConsoleLogHitDetails(obj, show) {
        if(show) {
            console.log('\n' +  this.objectName, 'is hit from', obj.objectName);
            console.log(this.objectName, 'energy:', this.energy, 'hitDebounceCounter:', this.hitDebounceCounter);
            console.log(obj.objectName, 'energy:', obj.energy, 'hitDebounceCounter:', obj.hitDebounceCounter);
        }
    }


    /**
     * Check if hurt
     * @param {number} animDuration - duration (ms) of the hurt animation
     * @returns {boolean}
     */
    isHurt(animDuration = 500) {
        return debounceLeading(this.lastHit, animDuration);
    }


    /**
     * Handling if hurt
     */
    handlingHurt() {
       this.hurtAnimation();
    }


    /**
     * Check if dead
     * @returns {boolean}
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * Handling death
     * @param {number} clearTimeout - timeout in ms after intervals should be cleared
     */
    handlingDeath(clearTimeout = 3000) {
        if(this.deathDebounceCounter === 0) {
            this.deathDebounceCounter++;
            if(this.isEnemy && !(this instanceof Endboss)) {
                livingEnemies--;
            }
            this.deathAnimation();
            this.clearIntervals(clearTimeout);
            this.destroyed = true;
        }
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