class MovableObject extends DrawableObject {

    isEnemy = false;
    isCollectable = false;
    groundY;
    speedY = 0;
    acceleration = 2.5;
    statusValue = 0;
    healthStatus = 100;
    hits = 0;
    lastHit = 0;
    intervals = [];
    audio;
    audioFiles = {};
    audioCache = {};
    counthandlingDead = 0;
    isThrowing= false;

    constructor() {
        super();
    }


    setBorderCoordinates() {
        this.borderX = this.x;
        this.borderY = this.y;
        this.borderWidth = this.width;
        this.borderHeight = this.height;
        if(this.objectPadding) {
            this.borderX = this.x + (this.width * this.objectPadding[1]);
            this.borderY = this.y + (this.height * this.objectPadding[0]);
            this.borderWidth = this.width * (1 - this.objectPadding[1] - this.objectPadding[3]);
            this.borderHeight = this.height * (1 - this.objectPadding[2] - this.objectPadding[0]);
        }
    }


    setAudioCache(audioFiles) {
        for (let [type, path] of Object.entries(audioFiles)) {
            this.audioCache[type] = new Audio(path);
        }
    }


    movementAnimation(imagePaths) {
        if(gameIsPaused === true) return;
        let index = this.currentImage % imagePaths.length;
        let path = imagePaths[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }    


    walkingAnimation(imagePaths = 'IMAGES_WALKING') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    jumpingAnimation(imagePaths = 'IMAGES_JUMPING') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
}


    hurtAnimation(imagePaths = 'IMAGES_HURT') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);    
    }


    deadAnimation(imagePaths = 'IMAGES_DEAD') {
        this.img = this.imageCache[this[imagePaths][0]];
        this.movementAnimation(this[imagePaths]);
    }


    moveLeft(speedMin = 0.15, speedMax = null, consoleX = false) {
        if(gameIsPaused === true) return;
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        this.x -= speed;
        consoleX ? this.consoleObjectPosition() : null;
    }

    
    applyGravity() {
        intervalId = setInterval(() => {
            // if(this.isAboveGround() || this instanceof ThrowableObject || this.speedY > 0) {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        this.intervals.push(intervalId);
    }


    jump(speedY) {
        this.speedY = speedY;
    }

    
    isAboveGround() {
        return this.y < this.groundY;
    }


    collectObject() {
        this.x = 0;
        this.y = heightCanvas + this.height;
        this.setBorderCoordinates();
        this.isCollectable = false;
    }


    touchesObject(counterPartObj) {
        this.setBorderCoordinates();
        // console.log(this.objectName, this.borderX, this.borderY);
        // console.log(counterPartObj.objectName, 'x:' + counterPartObj.borderX, 'y-bottom:', + counterPartObj.borderY + counterPartObj.borderHeight);
        return (this.borderX + this.borderWidth > counterPartObj.borderX) && (this.borderX < counterPartObj.borderX) && (this.borderY + this.borderHeight > counterPartObj.borderY) && (this.borderY < counterPartObj.borderY + counterPartObj.borderHeight);
    }


    isHit(fromObj) {
        return this.touchesObject(fromObj);
    }


    isHitFromAbove(fromObj, buffer = 0) {
        this.setBorderCoordinates();
        // buffer = buffer === 0 ? 0 : (widthCanvas / buffer) * -1;
        if(!fromObj.isAboveGround() || (fromObj.borderY + fromObj.borderHeight + buffer < this.borderY) || fromObj.borderX + fromObj.borderWidth + buffer < this.borderX || fromObj.borderX + buffer > this.borderX + this.borderWidth) {
            return false;
        };
        return true;
    }


    isHitFromBottle(fromObj, buffer = 0) {
        return true;
        // console.log('isThrowing:', fromObj.isThrowing);
        // if(!fromObj.isThrowing) return;
        this.setBorderCoordinates();
        console.log('Border', this.objectName, '(x-left, x-right, y-top):', this.borderX, this.borderX + this.borderWidth, this.borderY);
        // console.log('Border from', fromObj.objectName, '(x-left, x-right, y-bottom):',fromObj.x, fromObj.x + fromObj.width, fromObj.y + fromObj.height);
        // console.log('Border from', fromObj.objectName, '(x-left, x-right, y-bottom):',fromObj.borderX, fromObj.borderX + fromObj.borderWidth, fromObj.borderY + fromObj.borderHeight);

        if((fromObj.borderY + fromObj.borderHeight + buffer < this.borderY) || fromObj.borderX + fromObj.borderWidth + buffer < this.borderX || fromObj.borderX + buffer > this.borderX + this.borderWidth) {
            return false;
        };
        return true;
    }

    
    handlingHit(obj) {
        this.hits++;
        this.healthStatus -= obj.statusValue;
        if(this.healthStatus <= 0) {
            this.healthStatus = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(this.objectName, 'is hit from', obj.objectName);
        console.log(this.objectName, 'healthStatus:', this.healthStatus, 'hits:', this.hits);
    }


    handlingHitFromAbove(obj) {
        obj.statusValue = 100;
        if(this instanceof Endboss) {
            obj.statusValue = 25;
        }
        // console.log(this.objectName, 'is hit from above');
        this.handlingHit(obj);
    }


    handlingHitFromBottle(obj) {
        obj.statusValue = 100;
        if(this instanceof Endboss) {
            obj.statusValue = 25;
        }
        console.log(this.objectName, 'is hit from throwable');
        this.handlingHit(obj);
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed <= 500;
    }


    handlingHurt() {
       this.hurtAnimation();
    }


    isDead() {
        return this.healthStatus <= 0;
    }


    handlingDead() {
        this.isEnemy ? livingEnemies-- : null;
        this.counthandlingDead++;
        this.deadAnimation();
        this.clearIntervals();
    }


    saveIntervalsGlobally() {
       stoppableIntervals.push(...this.intervals);
    //    console.log(stoppableIntervals);
    }


    clearIntervals(timeout = 10000) {
       setTimeout(() => this.intervals.forEach(clearInterval), timeout);
    }


}