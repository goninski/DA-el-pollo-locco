class DrawableObject {
    skipDrawing = false;
    x = 0;
    y = 0;
    width = widthCanvas * 0.15;
    height = this.width;
    objectPadding = null;
    borderX = 0;
    borderY = 0;
    borderWidth;
    borderHeight;
    img;
    imageCache = {};
    currentImage = 0;
    type;
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
    
    
    setScreenSlidePos(screenSlide) {
        this.x = screenSlide * (widthCanvas - 0);
    }


    setRandomPosX(screenStart = -1, screenEnd = 2) {
        let min = widthCanvas * screenStart;
        let max = (widthCanvas * screenEnd) - this.width;
        this.x = Math.floor(Math.random() * (max - min)) + min;        
    }


    setWalkGroundY() {
        this.groundY = heightCanvas - this.height - walkOffset;
        this.y = this.groundY;
    }


    consoleObjectPosition(obj = null) {
        if(obj =! null) {
            console.log(obj.objectName, 'x:' + obj.x, 'y:' + obj.y);
        } else {
            console.log(this.objectName, 'x:' + this.x, 'y:' + this.y);
        }
    }

    
    drawRectangle(ctx) {
        if(showObjectBorders) {
            if(this instanceof Clouds) return;
            if(this instanceof MovableObject) {
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