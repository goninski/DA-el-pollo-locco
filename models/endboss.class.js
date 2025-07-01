let endbossId = 0;

class Endboss extends MovableObject {
    width = this.width * 2.5;
    height = this.width / 0.86;
    strength = 15;

    IMAGES_WALKING = [
        imgPathBase + '4_enemie_boss_chicken/1_walk/G1.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G2.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G3.png',
        imgPathBase + '4_enemie_boss_chicken/1_walk/G4.png',
    ];


    constructor() {

        super();
        endbossId++;
        this.objectName += endbossId;
        this.x = (widthCanvas * 1.5) + (Math.random() * widthCanvas * 2);
        this.setWalkGroundY();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);

        this.movementAnimationAuto(this.IMAGES_WALKING, 150);

        this.moveLeftAuto(0.15, 0.66, false);

    }

}

