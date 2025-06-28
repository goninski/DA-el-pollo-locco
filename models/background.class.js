class Background extends MovableObject {
    width = widthCanvas;
    height = heightCanvas;

    constructor(imgPath) {
        super().loadImage(imgPath);
    }

}
