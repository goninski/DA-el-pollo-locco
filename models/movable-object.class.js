class MovableObject extends DrawableObject {

    objectPadding = null;
    fitX;
    fitY;
    fitWidth;
    fitHeight;
    speedY = 0;
    acceleration = 2.5;
    yGround = heightCanvas - this.height - walkOffset;

    constructor() {
        super();
    }


    setScreenSlidePos(screenSlide) {
        this.x = screenSlide * (widthCanvas - 0);
    }


    drawRectangle(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            this.fitBorderCoordinates();
            ctx.beginPath();
            ctx.rect(this.fitX, this.fitY, this.fitWidth, this.fitHeight);
            ctx.stroke();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'orange';
        }
    }
    
    
    fitBorderCoordinates() {
        this.fitX = this.x;
        this.fitY = this.y;
        this.fitWidth = this.width;
        this.fitHeight = this.height;
        if(this.objectPadding) {
            this.fitX = this.x + (this.width * this.objectPadding[1]);
            this.fitY = this.y + (this.height * this.objectPadding[0]);
            this.fitWidth = this.width * (1 - this.objectPadding[1] - this.objectPadding[3]);
            this.fitHeight = this.height * (1 - this.objectPadding[2] - this.objectPadding[0]);
        }
    }


    movementAnimationAuto(imagePaths, speed = 300) {
        intervalId = setInterval(() => {
            this.movementAnimationItem(imagePaths);
        }, speed);
        stoppableIntervals.push(intervalId);
    }    


    movementAnimationItem(imagePaths) {
        let index = this.currentImage % imagePaths.length;
        let path = imagePaths[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }    


    moveLeftAuto(speedMin = 0.15, speedMax = null, type = null) {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        intervalId = setInterval(() => {
            this.x -= speed;
            // type ? console.log(type + '.x: ' + this.x) : null;
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
        return this.y < this.yGround;
    }


    isColliding(obj) {
        this.fitBorderCoordinates();
        return (this.fitX + this.fitWidth > obj.fitX) && (this.fitY + this.fitHeight > obj.fitY) && (this.fitX < obj.fitX) && (this.fitY < obj.fitY + obj.fitY + obj.fitHeight);

        // return (this.x + this.width > obj.x) && (this.y + this.height > obj.y) && (this.x < obj.x + obj.width) && (this.y < obj.y + obj.y + obj.height);
    }

}