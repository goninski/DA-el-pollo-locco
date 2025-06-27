class Chicken extends MovableObject {

    constructor() {
        super().loadImage(imgPathBase + '3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    }

    eat() {
        console.log('eat');
    }
}

