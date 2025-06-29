class World {
    keystrokes;
    canvas;
    ctx;
    screenTranslateX = 0;

    backgrounds = level1.backgrounds;
    clouds = level1.clouds;
    enemies = level1.enemies;
    character = level1.character;


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


    drawObject(obj) {
        if(obj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0);
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        if(obj.otherDirection) {
            obj.x = obj.x;
            this.ctx.restore();
        }
    }


    drawObjects(objs) {
        objs.forEach(obj => {
            this.drawObject(obj);
        });
    }

}