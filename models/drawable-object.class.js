/** Class representing a drawable object */
class DrawableObject {
    
    objectName;
    skipDrawing = false;
    x = 0;
    y = 0;
    width = widthCanvas * 0.15;
    height = this.width;
    objectPadding = null;
    borderX = 0;
    borderY = 0;
    borderWidth = 0;
    borderHeight = 0;
    img;
    imageCache = {};
    currentImage = 0;
    destroyed = false;

    
    /**
     * Create a drawable object
     */
    constructor() {
        this.objectName = this.constructor.name;
    }


    /**
     * Load single image
     * @param {string} path - image path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Set image cache
     * @param {array} imagePaths - image paths
     */
    setImageCache(imagePaths) {
        imagePaths.forEach(path => {
            this.loadImage(path);
            this.imageCache[path] = this.img
        });
    }
    
    
    /**
     * Set x position with screen slide no
     * @param {number} screenSlide - currently -1 to 3, default 0
     */
    setScreenSlidePos(screenSlide) {
        this.x = screenSlide * (widthCanvas - 0);
    }


    /**
     * Set x position randomly 
     * @param {number} screenStart - starting screen slide no
     * @param {number} screenEnd - ending screen slide no
     */
    setRandomPosX(screenStart = -1, screenEnd = 2) {
        let min = widthCanvas * screenStart;
        let max = (widthCanvas * screenEnd) - this.width;
        this.x = Math.floor(Math.random() * (max - min)) + min;        
        this.roundCoordinates()
    }


    /**
     * Set a manual position
     * @param {number} x - x position
     * @param {number} y - y position
     */
    positionObject(x, y) {
        this.x = x;
        this.y = y;
        this.roundCoordinates()
        this.setBorderCoordinates();
    }


    /**
     * Position object to the walk ground height
     */
    setWalkGroundY() {
        this.groundY = heightCanvas - this.height - walkOffset;
        this.y = this.groundY;
        this.roundCoordinates()
    }


    /**
     * Hide object (position beneath the canvas)
     */
    hideObject() {
        this.y = heightCanvas + 1;
        this.roundCoordinates()
    }


    /**
     * Round dimensions to nearest integer
     */
    roundDimensions() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
    }


    /**
     * Round coordinates to nearest integer
     */
    roundCoordinates() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }
    
      
    /**
     * Set border coordinates considering image padding
     */
    setBorderCoordinates() {
        this.roundCoordinates();
        this.borderX = this.x;
        this.borderY = this.y;
        this.borderWidth = this.width;
        this.borderHeight = this.height;
        if(this.objectPadding) {
            this.borderX = Math.round(this.x + (this.width * this.objectPadding[1]));
            this.borderY = Math.round(this.y + (this.height * this.objectPadding[0]));
            this.borderWidth = Math.round(this.width * (1 - this.objectPadding[1] - this.objectPadding[3]));
            this.borderHeight = Math.round(this.height * (1 - this.objectPadding[2] - this.objectPadding[0]));
        }
    }
    
    
    /**
     * Draw border rectangle (for debugging)
     * @param {ctx} ctx - canvas context
     */
    drawRectangle(ctx) {
        if(this instanceof Clouds) return;
        if(this instanceof MovableObject) {
            this.setBorderCoordinates();
            if(showObjectBorders) {
                this.setBorderCoordinates();
                ctx.beginPath();
                ctx.rect(this.borderX, this.borderY, this.borderWidth, this.borderHeight);
                ctx.stroke();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'orange';
            }
        }
    }


    /**
     * Log the coordinates to the console (for debugging)
     * @param {string} sourceInfo - optional info, e.g. to indicate the log source
     * @param {boolean} borderCoordinates - true / false=image coordinates
     */
    consoleObjectCoordinates(sourceInfo = '', borderCoordinates = true) {
        let x = borderCoordinates ? this.borderX : this.x;
        let xr = borderCoordinates ? this.borderX + this.borderWidth : this.x + this.width;
        let y = borderCoordinates ? this.borderY : this.y;
        let yb = borderCoordinates ? this.borderY + this.borderHeight : this.y + this.height;
        let borderSuffix = borderCoordinates ? 'B-' : '';
        let msgTitle = '\n' + borderSuffix + 'Coordinates ' + this.objectName + '  ' + sourceInfo;
        let msgContent = '\nx/xr ' + x + '-' + xr + ' | y/yb ' + y + '-' + yb;
        console.log(msgTitle, msgContent)
    }

}