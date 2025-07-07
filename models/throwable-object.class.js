class ThrowableObject extends MovableObject {

    IMAGES_THROW = [];


    constructor() {

        super();
        // this.loadImage(imgPathBase + '6_salsa_bottle/salsa_bottle.png');
        // this.x = widthCanvas * 0.3;
        // this.setWalkGroundY();
        // this.consoleObjectPosition();
        // this.throw(200, heightCanvas * -0.66);
        

    }


    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 5;
        this.applyGravity()
        setInterval(() => this.x += 10, 25);
    };
    

}