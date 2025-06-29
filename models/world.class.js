class World {
    keystrokes;
    canvas;
    ctx;
    screenTranslateX = 0;

    backgrounds = level1.backgrounds;
    clouds = level1.clouds;
    enemies = level1.enemies;
    character = new Character();


    constructor(canvas, keystrokes) {
        this.keystrokes = keystrokes;
        console.log(this.keystrokes);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.applyWorldToObjects();
    }


    applyWorldToObjects() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.screenTranslateX, 0);

        this.drawObjects(this.backgrounds);
        this.drawObjects(this.clouds);
        this.drawObjects(this.enemies);
        this.drawObject(this.character);

        this.ctx.translate(-this.screenTranslateX, 0);

        // automatic recall of draw (speed depending on gpu performance)
        let self = this;
        requestAnimationFrame(() => self.draw());
    };


    drawObjects(objs) {
        objs.forEach(obj => {
            this.drawObject(obj);
        });
    }


    drawObject(obj) {
        obj.otherDirection ? this.flipImage(obj) : null;
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        obj.drawRectangle(this.ctx);
        obj.otherDirection ? this.flipImageBack(obj) : null;
    }


    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width * 1.5, 0);
        this.ctx.scale(-1, 1);
        // obj.x = obj.x * -1;
    }


    flipImageBack(obj) {
        // obj.x = obj.x;
        this.ctx.restore();
    }


    // drawRectangle(obj) {
    //     if(this instanceof Character) {
    //         this.ctx.beginPath();
    //         this.ctx.rect(obj.x, obj.y, obj.width, obj.height);
    //         this.ctx.stroke();
    //         this.ctx.lineWidth = '5';
    //         this.ctx.strokeStyle = 'orange';
    //     }
    // }

}