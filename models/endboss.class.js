class Endboss extends MovableObject {
    width = this.width * 2.5;
    height = this.width / 0.86;

    IMAGES_WALKING = [
        imgPathBase + '4_enemie_boss_chicken/1_walk/G1.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G2.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G3.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G4.png',
    ];


    constructor() {

        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = (widthCanvas * 0.5);
        // this.x = (widthCanvas * 0.7) + (Math.random() * widthCanvas * 0.9);
        this.y = heightCanvas - this.height - walkOffset;

        this.setImageCache(this.IMAGES_WALKING);
        this.animateWalking(this.IMAGES_WALKING, 175);
        // this.moveLeft(2);

    }

}

