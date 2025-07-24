class MovableObject extends DrawableObject {

    groundY;
    objectPadding = null;
    borderX;
    borderY;
    borderWidth;
    borderHeight;
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
    countDeadHandling = 0;
    // lastAudioType;
    // lastAudioTimeStamp;

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

    
    // moveLeftAuto(speedMin = 0.15, speedMax = null, consoleX = false) {
    //     if(gameIsPaused === true) return;
    //     let speed = speedMax ? speedMin + (Math.random() * speedMax) : speedMin;
    //     intervalId = setInterval(() => {
    //         this.x -= speed;
    //         consoleX ? this.consoleObjectPosition() : null;
    //     }, 1000 / 60);
    //     this.intervals.push(intervalId);
    // }


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this instanceof ThrowableObject || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
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
        buffer = buffer == 0 ? 0 : (widthCanvas / buffer) * -1;
        if(!fromObj.isAboveGround() || (fromObj.borderY + fromObj.borderHeight + buffer < this.borderY) || fromObj.borderX + fromObj.borderWidth + buffer < this.borderX || fromObj.borderX + buffer > this.borderX + this.borderWidth) {
            return false;
        };
        return true;
    }


    isHitFromBottle(throwableObj, buffer = 0) {
        this.setBorderCoordinates();
        buffer = buffer == 0 ? 0 : (widthCanvas / buffer) * -1;
        if((throwableObj.borderY + throwableObj.borderHeight + buffer < this.borderY) || throwableObj.borderX + throwableObj.borderWidth + buffer < this.borderX || throwableObj.borderX + buffer > this.borderX + this.borderWidth) {
            return false;
        };
        return true;
    }

    
    hitHandling(obj) {
        this.hits++;
        this.healthStatus -= obj.statusValue;
        if(this.healthStatus <= 0) {
            this.healthStatus = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(this.objectName, this.hits, this.healthStatus);
    }


    hitHandlingFromAbove(obj) {
        obj.statusValue = 100;
        if(this instanceof Endboss) {
            obj.statusValue = 25;
        }
        this.hitHandling(obj);
    }


    hitHandlingFromThrowable(obj) {
        obj.statusValue = 100;
        if(this instanceof Endboss) {
            obj.statusValue = 25;
        }
        this.hitHandling(obj);
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    hurtHandling() {
       this.hurtAnimation();
    }


    // isDead() {
    //     if(this.healthStatus <= 0) {
    //         if(this instanceof Chicken) {
    //             // this.hits === 1 ? livingEnemies-- : null;
    //             // livingEnemies <= 0 ? gameStatus = 2 : null;
    //             return true;
    //         }
    //         if(this instanceof Endboss) {
    //             this.deadCount++;
    //             this.deadCount === 1 ? livingEnemies-- : null;
    //             // livingEnemies <= 0 ? gameStatus = 2 : null;
    //             return true;
    //         }
    //         if(this instanceof Character) {
    //             gameStatus = 9;
    //             console.log('gameStatus movableObject:', gameStatus);
    //             let timePassed = new Date().getTime() - this.lastHit;
    //             return timePassed <= 3000;
    //         }
    //     }
    //     return false;
    // }


    isDead() {
        if(this.healthStatus <= 0) {
            if(this instanceof Character) {
                let timePassed = new Date().getTime() - this.lastHit;
                return timePassed <= 3000;
            } else {
                return true;
            }
        }
    }


    deadHandling() {
    //    console.log('deadHandling', this.objectName);
       this.countDeadHandling++;
       this.deadAnimation();
       this.clearIntervals();
       console.log(this.objectName, 'deadHandling#', this.countDeadHandling, 'hits:', this.hits, 'health:', this.healthStatus);
    }


        // deadHandling(audioObj, audioSrc = '', volume = 1, option = 0) {
    //     console.log('deadHandling', this.objectName);

    // //    (this.type == 'enemy' && this.deadCount === 1) ? livingEnemies-- : null;
    // //    livingEnemies <= 0 ? gameStatus = 2 : null;
    //    this.deadAnimation();
    // //    this.playAudio(audioObj, audioSrc, volume, option);
    //    this.clearIntervals();
    //    this.audio.pause();
    // }


    saveIntervalsGlobally() {
       stoppableIntervals.push(...this.intervals);
    //    console.log(stoppableIntervals);
    }


    clearIntervals() {
       setTimeout(() => this.intervals.forEach(clearInterval), 10000);
    }


}