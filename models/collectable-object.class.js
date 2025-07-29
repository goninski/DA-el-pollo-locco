/** Class representing a collectable object  */
class CollectableObject extends MovableObject {

    value = 0;
    collectableObj = true;
    collected = false;
    throwableObj = false;
    throwing = false;
    splashed = false;
    throwingInterval;

    
    /**
     * Create a collectable object
     */
    constructor() {
        super();
    }
   
}