class DrawableObject {
    x = 0;
    y = 0;
    width = widthCanvas * 0.15;
    height = this.width;
    img;
    imageCache = {};
    currentImage = 0;


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


    loopImages(imagePaths, speed, isStoppable = true) {
        let interval = setInterval(() => {
            let index = this.currentImage % imagePaths.length;
            let path = imagePaths[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, speed);
        isStoppable ? stoppableIntervals.push(interval) : null;
    }    


}