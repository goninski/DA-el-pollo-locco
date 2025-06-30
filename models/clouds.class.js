let cloudsId = 0;

class Clouds extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    constructor(imgPath, screenSlide = 0) {

        super();
        this.setScreenSlidePos(screenSlide);
        this.loadImage(imgPath);

        cloudsId++;
        this.objectId = cloudsId;
        // this.moveLeft(0.15, null, 'clouds' + this.objectId);
        this.moveLeft(0.15);

    }

}
