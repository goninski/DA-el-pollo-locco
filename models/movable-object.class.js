class MovableObject extends DrawableObject {

    
    constructor() {
        super();
    }

    setScreenSlidePos(screenSlide) {
            this.x = screenSlide * (widthCanvas - 1);
    }


    animateWalking(imagePaths, speed) {
        this.loopImages(imagePaths, speed);
    }    


    moveLeft(speedMin = 0.15, speedMax = null, type = '') {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
        console.log('moving right mo-type: ' + type);
    }


    moveRight(speedMin = 0.15, speedMax = null, type = '') {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        setInterval(() => {
            this.x += speed;
        }, 1000 / 60);
        console.log('moving right mo-type: ' + type);
    }

}