class CollectableObject extends MovableObject {

    value = 0;
    collectable = true;
    collected = false;
    used = false;
    throwable = false;
    throwing = false;
    splashed = false;
    throwingInterval;

    constructor() {
        super();
    }
   
  
    // throw(x, y) {
    //     this.x = x;
    //     this.y = y;
    //     this.speedY = 5;
    //     this.applyGravity()
    //     setInterval(() => this.x += 10, 25);
    // };
    

}