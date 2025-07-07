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

    constructor() {
        super();
    }


    borderCoordinates() {
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


    movementAnimation(imagePaths) {
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
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        this.x -= speed;
        consoleX ? this.consoleObjectPosition() : null;
    }

    
    moveLeftAuto(speedMin = 0.15, speedMax = null, consoleX = false) {
        let speed = speedMax ? speedMin + (Math.random() * speedMax) : speedMin;
        intervalId = setInterval(() => {
            this.x -= speed;
            consoleX ? this.consoleObjectPosition() : null;
        }, 1000 / 60);
        stoppableIntervals.push(intervalId);
    }


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

    
    collectObject() {
        this.hits++;
        this.x = 0;
        this.y = heightCanvas + this.height;
        this.borderCoordinates();
    }


    isAboveGround() {
        return this.y < this.groundY;
    }


    touchesObject(obj) {
        this.borderCoordinates();
        return (this.borderX + this.borderWidth > obj.borderX) && (this.borderY + this.borderHeight > obj.borderY) && (this.borderX < obj.borderX) && (this.borderY < obj.borderY + obj.borderY + obj.borderHeight);
    }


    isHit(obj) {
        this.touchesObject(obj);
    }


    isHitFromAbove(obj, buffer = 1) {
        this.borderCoordinates();
        obj.borderCoordinates();
        buffer = (widthCanvas / buffer) * -1 ;
        if(!obj.isAboveGround() || (obj.borderY + obj.borderHeight + buffer < this.borderY) || obj.borderX + obj.borderWidth + buffer < this.borderX || obj.borderX + buffer > this.borderX + this.borderWidth) {
            return false;
        };
        return true;
    }

    
    isHitFromThrowable(obj, buffer = 1) {
        buffer = (widthCanvas / buffer) * -1 ;
        this.borderCoordinates();
        // obj.borderCoordinates();
        if(!obj.isAboveGround() || (obj.borderY + obj.borderHeight + buffer < this.borderY) || obj.borderX + obj.borderWidth + buffer < this.borderX || obj.borderX + buffer > this.borderX + this.borderWidth) {
            return false;
        };
        return true;
    }

    
    hitHandling(obj) {
        this.healthStatus -= obj.statusValue;
        if(this.healthStatus <= 0) {
            this.healthStatus = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitHandlingFromAbove(obj) {
        obj.statusValue = 100;
        if(this instanceof Endboss) {
            obj.statusValue = 25;
        }
        this.isHitHandling(obj);
    }


    hitHandlingFromThrowable(obj) {
        obj.statusValue = 100;
        if(this instanceof Endboss) {
            obj.statusValue = 25;
        }
        this.isHitHandling(obj);
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    isDead() {
        if(this.healthStatus <= 0) {
            if(this instanceof Chicken) {
                // console.log(this.objectName);
                return true;
            }
            if(this instanceof Character) {
                // gameStatus = 0;
            }
            let timePassed = new Date().getTime() - this.lastHit;
            return timePassed <= 3000;
        }
    }





    // hideObject(){
    //     this.skipDrawing = true;
    //     this.x = 0;
    //     this.y = heightCanvas + this.height;
    //     this.borderCoordinates();
    // }
    

    // movementAnimationAuto(imagePaths, speed = 300) {
    //     intervalId = setInterval(() => {
    //         // this.isDead() ? imagePaths = this.IMAGES_DEAD : null;  
    //         if(this.isDead()) return;
    //         this.movementAnimation(imagePaths);
    //     }, speed);
    //     // if(this.isDead()) {
    //     //     clearInterval(intervalId);
    //     // }
    //     stoppableIntervals.push(intervalId);
    // }    





}