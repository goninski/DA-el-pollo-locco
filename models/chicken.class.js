class Chicken extends MovableObject {
    height = this.width / 1.02;

    IMAGES_WALKING = [
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor() {

        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = (widthCanvas * 0.2) + (Math.random() * widthCanvas * 0.7);
        this.y = heightCanvas - this.height - walkOffset;

        this.setImageCache(this.IMAGES_WALKING);
        this.animateWalking(this.IMAGES_WALKING, 200);
        this.moveLeft(0.15, 0.45, 'chicken');

    }


}

