class MovableObject extends DrawableObject {

    groundY;
    objectPadding = null;
    borderX;
    borderY;
    borderWidth;
    borderHeight;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    constructor() {
        super();
    }


    setWalkGroundY() {
        this.groundY = heightCanvas - this.height - walkOffset;
        this.y = this.groundY;
    }


    drawRectangle(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            this.borderCoordinates();
            ctx.beginPath();
            ctx.rect(this.borderX, this.borderY, this.borderWidth, this.borderHeight);
            ctx.stroke();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'orange';
        }
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


    movementAnimationAuto(imagePaths, speed = 300) {
        intervalId = setInterval(() => {
            this.movementAnimation(imagePaths);
        }, speed);
        stoppableIntervals.push(intervalId);
    }    


    movementAnimation(imagePaths) {
        let index = this.currentImage % imagePaths.length;
        let path = imagePaths[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }    


    moveLeftAuto(speedMin = 0.15, speedMax = null, consoleX = false) {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        intervalId = setInterval(() => {
            this.x -= speed;
            consoleX ? this.consoleObjectPosition() : null;
        }, 1000 / 60);
        stoppableIntervals.push(intervalId);
    }


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || (this.speedY > 0)) {
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


    isHit(enemy) {
        this.borderCoordinates();
        return (this.borderX + this.borderWidth > enemy.borderX) && (this.borderY + this.borderHeight > enemy.borderY) && (this.borderX < enemy.borderX) && (this.borderY < enemy.borderY + enemy.borderY + enemy.borderHeight);

        // return (this.x + this.width > enemy.x) && (this.y + this.height > enemy.y) && (this.x < enemy.x + enemy.width) && (this.y < enemy.y + enemy.y + enemy.height);
    }

    
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    isDead() {
        if(this.energy <= 0) {
            if(this instanceof Character) {
                gameStatus = 0;
            }
            let timePassed = new Date().getTime() - this.lastHit;
            return timePassed <= 3000;
        }
    }


    isHitHandling(enemy) {
        this.energy -= enemy.strength;
        console.log('character.energy', this.energy);
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurtedHandling() {
        this.movementAnimation(this.IMAGES_HURT);    
    }


    isDeadHandling() {
        this.movementAnimation(this.IMAGES_DEAD);  
    }


}