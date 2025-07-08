class ThrowableObject extends MovableObject {


    constructor() {
        super();
    }


    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 5;
        this.applyGravity()
        setInterval(() => this.x += 10, 25);
    };
    

}