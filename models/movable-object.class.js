class MovableObject extends DrawableObject {

    objectPadding = null;
    fitX;
    fitY;
    fitWidth;
    fitHeight;


    constructor() {
        super();
    }


    setScreenSlidePos(screenSlide) {
        this.x = screenSlide * (widthCanvas - 1);
    }


    drawRectangle(ctx) {
        if(this instanceof Character || this instanceof Chicken) {
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


    animateWalking(imagePaths, speed) {
        this.loopImages(imagePaths, speed);
    }    


    moveLeft(speedMin = 0.15, speedMax = null, type = '') {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
    }


    moveRight(speedMin = 0.15, speedMax = null, type = '') {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        setInterval(() => {
            this.x += speed;
        }, 1000 / 60);
    }

}