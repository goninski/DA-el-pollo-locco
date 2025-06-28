class Clouds extends MovableObject {

    width = widthCanvas;
    height = heightCanvas;


    constructor() {

        super().loadImage(imgPathBase + '5_background/layers/4_clouds/1.png')

        this.x = Math.random() * widthCanvas * 0.2;
        this.animateLeft(0.15);

    }

}
