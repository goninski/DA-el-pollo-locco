let cloudsId = 0;

class Clouds extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    constructor(imgPath, screenSlide = 0) {

        super();
        cloudsId++;
        this.objectName += cloudsId;
        this.setScreenSlidePos(screenSlide);
        this.loadImage(imgPath);

        this.moveLeftAuto(0.15);
        // this.moveLeftAuto(0.15, null, false);

    }

}
