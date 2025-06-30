let endbossId = 0;

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

        super();
        this.x = (widthCanvas * 1.5) + (Math.random() * widthCanvas * 2);
        this.y = heightCanvas - this.height - walkOffset;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);

        endbossId++;
        this.objectId = 'endboss' + endbossId + '.';
        // console.log(this.objectId + 'x: ' + this.x);

        this.movementAnimationAuto(this.IMAGES_WALKING, 150);

        this.moveLeftAuto(0.15, 0.66, this.objectId);

    }

}

