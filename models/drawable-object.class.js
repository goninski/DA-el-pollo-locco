class DrawableObject {
    x = 0;
    y = 0;
    width = widthCanvas * 0.15;
    height = this.width;
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
    
    
    setScreenSlidePos(screenSlide) {
        this.x = screenSlide * (widthCanvas - 0);
    }


    consoleObjectPosition() {
         console.log(this.objectName, 'x:' + this.x, 'y:' + this.y);
    }

    
    drawRectangle(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {
            this.borderCoordinates();
            ctx.beginPath();
            ctx.rect(this.borderX, this.borderY, this.borderWidth, this.borderHeight);
            ctx.stroke();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'orange';
        }
    }

}