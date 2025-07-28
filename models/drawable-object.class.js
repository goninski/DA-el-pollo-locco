class DrawableObject {
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
    objectName;
    
    constructor() {
        this.objectName = this.constructor.name;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    setImageCache(imagePaths) {
        imagePaths.forEach(path => {
            this.loadImage(path);
            this.imageCache[path] = this.img
        });
    }
    
    
    positionObject(x, y) {
        this.x = x;
        this.y = y;
        this.roundCoordinates()
        this.setBorderCoordinates();
    }


    setScreenSlidePos(screenSlide) {
        this.x = screenSlide * (widthCanvas - 0);
    }


    setRandomPosX(screenStart = -1, screenEnd = 2) {
        let min = widthCanvas * screenStart;
        let max = (widthCanvas * screenEnd) - this.width;
        this.x = Math.floor(Math.random() * (max - min)) + min;        
        this.roundCoordinates()
    }


    setWalkGroundY() {
        this.groundY = heightCanvas - this.height - walkOffset;
        this.y = this.groundY;
        this.roundCoordinates()
    }


    hideObject() {
        this.y = heightCanvas + 1;
        this.roundCoordinates()
    }


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


    roundDimensions() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
    }


    roundCoordinates() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }
    

    consoleObjectCoordinates(borderPos = true) {
        let x = borderPos ? this.borderX : this.x;
        let xr = borderPos ? this.borderX + this.borderWidth : this.x + this.width;
        let y = borderPos ? this.borderY : this.y;
        let yb = borderPos ? this.borderY + this.borderHeight : this.y + this.height;
        let borderIndicator = borderPos ? ' (B)' : '';
        // console.log(label, this.objectName + ') ', 'x/xr: ' + x + '-' + xr + ' / ', 'y/yb: ' + y + '-' + yb);
        console.log('Coordinates', this.objectName + ': ', 'x/xr ' + x + '-' + xr + borderIndicator);
        console.log('Coordinates', this.objectName + ': ', 'y/yb ' + y + '-' + yb + borderIndicator);
    }

    
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


}