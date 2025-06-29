class Character extends MovableObject {
    world;
    width = this.width * 1.5;
    height = this.width / 0.508333;
    otherDirection = false;
    factorX = 1;

    IMAGES_WALKING = [
        imgPathBase + '2_character_pepe/2_walk/W-21.png',
        imgPathBase + '2_character_pepe/2_walk/W-22.png',
        imgPathBase + '2_character_pepe/2_walk/W-23.png',
        imgPathBase + '2_character_pepe/2_walk/W-24.png',
        imgPathBase + '2_character_pepe/2_walk/W-25.png',
        imgPathBase + '2_character_pepe/2_walk/W-26.png',
    ];


    constructor() {

        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = widthCanvas * 0.1;
        this.y = heightCanvas - this.height - walkOffset;

        this.setImageCache(this.IMAGES_WALKING);
        this.animate();

    }


    animate() {

        console.log(this.world);

        // if(this.world.keystrokes.KEY_RIGHT) {
        //     this.otherDirection = true;
        // }

        this.otherDirection = true;
        this.factorX = this.otherDirection ? -1 : 1;
        this.animateWalking(this.IMAGES_WALKING, 300);
        this.moveX(0.5);

    }


    moveX(speed) {
        setInterval(() => {
            this.x += speed;
            this.world.screenTranslateX = -this.x * this.factorX;
        }, 1000 / 60);
    }

    
    jump() {
        console.log('jump');
    }

}