class Character extends MovableObject {
    width = this.width * 1.5;
    height = this.width / 0.508333;
    IMAGES_WALKING = [
        imgPathBase + '2_character_pepe/2_walk/W-21.png',
        imgPathBase + '2_character_pepe/2_walk/W-22.png',
        imgPathBase + '2_character_pepe/2_walk/W-23.png',
        imgPathBase + '2_character_pepe/2_walk/W-24.png',
        imgPathBase + '2_character_pepe/2_walk/W-25.png',
        imgPathBase + '2_character_pepe/2_walk/W-26.png',
    ];
    world;


    constructor() {

        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = widthCanvas * 0.1;
        this.y = heightCanvas - this.height - walkOffset;

        this.setImageCache(this.IMAGES_WALKING);
        this.animateWalking(this.IMAGES_WALKING, 300);

        this.animate();

        // console.log(this.world.keystrokes);

    }


    animate() {
        console.log(this.world);
        // if(this.world.keystrokes.RIGHT) {
        //     this.animateRight();
        // }
    }


    jump() {
        console.log('jump');
    }

}