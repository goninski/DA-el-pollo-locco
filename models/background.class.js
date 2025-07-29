/** Class representing a canvas background */
class Background extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    /**
     * Create a background
     * @param {string} imgPath - file path for the image
     * @param {number} screenSlide - canvas screen slide
     */
    constructor(imgPath, screenSlide = 0) {
        super().loadImage(imgPath);
        this.setScreenSlidePos(screenSlide);
    }

}
