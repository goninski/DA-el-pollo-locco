class Character extends MovableObject {

    constructor() {
        super().loadImage(imgPathBase + '2_character_pepe/2_walk/W-21.png');
    }

    jump() {
        console.log('jump');
    }
}