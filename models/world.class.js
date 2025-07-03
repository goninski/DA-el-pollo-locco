class World {
    keystrokes;
    canvas;
    ctx;
    screenTranslateX = 0;

    level = level1;
    backgrounds = level1.backgrounds;
    clouds = level1.clouds;
    enemies = level1.enemies;
    throwables = level1.throwables;
    // statusBars = level1.statusBars;
    statusBar = new StatusBar('HEALTH', 50);
    character = new Character();

    constructor(canvas, keystrokes) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.checkCharacterCollitions();
        this.keystrokes = keystrokes;
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
        this.drawObject(this.character);
        this.drawObjects(this.enemies);
        this.drawObjects(this.throwables);
        
        this.ctx.translate(-this.screenTranslateX, 0);
        this.drawObject(this.statusBar);
        // this.drawObjects(this.statusBars);

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
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }


    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }


    checkCharacterCollitions() {
        let intervalId = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isHit(enemy)) {
                    // console.log('collision with', enemy.constructor.name, 'strength:', enemy.strength);
                    this.character.hitHandling(enemy);
                    console.log(this.statusBar);
                    this.statusBar.updateStatusBar('HEALTH', this.character.health);
                    // console.log(this.statusBars);
                    // this.statusBars.updateStatusBar('HEALTH', this.character.health);
                    // console.log(this.statusbars);
                    // console.log(this.character.health);
                    // if(this.statusBars.statusType == 'HEALTH') {
                    //     console.log(this.statusBars);
                    //     this.statusbars.updateStatusbar('HEALTH', this.character.health);
                    // }
                };
            });
        }, 200);
        stoppableIntervals.push(intervalId);
    }


    isGameOver(){
        if(gameStatus === 0) {
            let timePassed = new Date().getTime() - this.character.lastHit;
            return timePassed >= 3000;
        }
    }

}