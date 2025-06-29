class Clouds extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    constructor(imgPath, screenSlide = 0) {

        super().loadImage(imgPath);

        this.setScreenSlidePos(screenSlide);

        this.moveLeft(0.15, null, 'clouds');

    }

}
