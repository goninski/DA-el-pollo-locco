class MovableObject {
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


    animateWalking(imagePaths, speed) {
        setInterval(() => {
            let index = this.currentImage % imagePaths.length;
            let path = imagePaths[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, speed);
    }    


    animateLeft(speedMin = 0.15, speedMax = null) {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
    }


    animateRight(speedMin = 0.15, speedMax = null) {
        let speed = speedMax ? 0.15 + (Math.random() * speedMax) : speedMin;
        setInterval(() => {
            this.x += speed;
        }, 1000 / 60);
    }
}