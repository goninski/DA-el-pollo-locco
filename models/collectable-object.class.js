/**
 * Class for collectable objects
 */
class CollectableObject extends MovableObject {

    value = 0;
    collectableObj = true;
    collected = false;
    throwableObj = false;
    throwing = false;
    splashed = false;
    throwingInterval;

    
    constructor() {
        super();
    }
   
}