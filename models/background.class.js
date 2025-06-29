class Background extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    constructor(imgPath, screenSlide = 0) {

        super().loadImage(imgPath);

        this.setScreenSlidePos(screenSlide);

    }

}
