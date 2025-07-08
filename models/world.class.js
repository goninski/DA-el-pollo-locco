class World {
    keystrokes;
    canvas;
    ctx;
    screenTranslateX = 0;
    intervals = [];
    timer = 0;

    level = level1;
    backgrounds = level1.backgrounds;
    clouds = level1.clouds;
    enemies = level1.enemies;
    bottles = level1.bottles;
    coins = level1.coins;
    statusBars = level1.statusBars;
    character = new Character();

    constructor(canvas, keystrokes) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setCheckIntervals();
        this.keystrokes = keystrokes;
        this.applyWorldToObjects();
        saveIntervalsGlobally(this.intervals);
    }


    applyWorldToObjects() {
        this.character.world = this;
        // this.statusBars.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.screenTranslateX, 0);
        this.drawObjects(this.backgrounds);
        this.drawObjects(this.clouds);
        this.drawObjects(this.bottles);
        this.drawObjects(this.coins);
        this.drawObjects(this.enemies);
        this.drawObject(this.character);
        
        this.ctx.translate(-this.screenTranslateX, 0);
        this.drawObjects(this.statusBars);

        if(this.isGameOver()) return stopGame();

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


    setCheckIntervals() {
        intervalId = setInterval(() => {
            // console.log('screenTranslateX:', this.screenTranslateX);
            // console.log('character x:', this.character.x)
            this.checkEnemyHits();
        }, 50);
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            this.checkCoinCollection();
            this.checkBottleCollection();
        }, 100);
        this.intervals.push(intervalId);
    }


    checkEnemyHits() {
        this.level.enemies.forEach((enemy) => {
            console.log('character healthStatus:', this.character.healthStatus);
            console.log(enemy.objectName, 'healthStatus:', enemy.healthStatus);
            if(enemy.healthStatus <= 0 || this.character.healthStatus <= 0) return;
            if(enemy.isHitFromAbove(this.character)) {
                this.handleHitFromAbove(enemy, this.character);
            // } else if(enemy.isHitFromThrowable(this.character.bottles[0])) {
            //     this.handleHitFromThrowable(enemy, this.character);
            } else if(this.character.isHit(enemy)) {
                this.handleHit(enemy, this.character);
            }
        });
    }


    handleHitFromAbove(enemy, character) {
        console.log(enemy.objectName, 'isHitFromAbove:', 'healthStatus:', enemy.healthStatus);
        enemy.hitHandlingFromAbove(character);
        console.log(enemy.objectName, 'healthStatus:', enemy.healthStatus);
        this.statusBars[0].updateStatusBar(enemy.healthStatus);
    }
    

    handleHitFromThrowable(enemy, character) {
        console.log(enemy.objectName, 'isHitFromBottle:', 'healthStatus:', enemy.healthStatus);
        enemy.hitHandlingFromThrowable(character);
        console.log(enemy.objectName, 'healthStatus:', enemy.healthStatus);
        this.statusBars[0].updateStatusBar(enemy.healthStatus);
    }

    
    handleHit(enemy, character) {
        // console.log('isHit from:', enemy.constructor.name, 'value:', enemy.statusValue);
        // console.log('character healthStatus:', character.healthStatus);
        character.hitHandling(enemy);
        this.statusBars[0].updateStatusBar(character.healthStatus);
    }

    
    checkCoinCollection() {
        this.level.coins.forEach((obj) => {
            if(obj.hits > 0 || this.character.coinStatus >= 100) return;
            if(this.character.touchesObject(obj)) {
                console.log('collection of:', obj.constructor.name, 'value:', obj.statusValue);
                console.log('character.coinStatus:', this.character.coinStatus);
                this.character.collectCoin(obj);
                this.statusBars[1].updateStatusBar(this.character.coinStatus);
            };
        });
    }


    checkBottleCollection() {
        this.level.bottles.forEach((obj) => {
            if(obj.hits > 0 || this.character.bottleStatus >= 100) return;
            if(this.character.touchesObject(obj)) {
                console.log('collection of:', obj.constructor.name, 'value:', obj.statusValue);
                console.log('character.bottleStatus:', this.character.bottleStatus);
                this.character.collectBottle(obj);
                this.statusBars[2].updateStatusBar(this.character.bottleStatus);
            };
        });
    }
    
    
    isGameOver(){
        if(gameStatus === 0) {
            let timePassed = new Date().getTime() - this.character.lastHit;
            return timePassed >= 3000;
        }
    }

}