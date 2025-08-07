/** Class representing clouds for the canvas */
class Clouds extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    /**
     * Create clouds
     * @param {string} imgPath - file path for the image
     * @param {number} screenSlide - canvas screen slide
     */
    constructor(imgPath, screenSlide = 0) {
        super();
        this.objectName;
        this.setScreenSlidePos(screenSlide);
        this.loadImage(imgPath);
        this.animate();
    }


    /**
     * Animate clouds to left
     */
    animate() {
        intervalId = setInterval(() => {
            this.moveLeft(0.33);
        }, 1000 / 60); 
        this.intervals.push(intervalId);
        this.saveIntervalsGlobally();
    }

}
