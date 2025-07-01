let chickenId = 0;

class Chicken extends MovableObject {
    height = this.width / 1.02;
    strength = 3;

    IMAGES_WALKING = [
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor() {

        super();
        chickenId++;
        this.objectName += chickenId;

        this.x = (widthCanvas * 0.8) + (Math.random() * widthCanvas * 2);
        this.setWalkGroundY();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.setImageCache(this.IMAGES_WALKING);

        this.movementAnimationAuto(this.IMAGES_WALKING, 200);

        this.moveLeftAuto(0.15, 0.45, false);

    }


}

