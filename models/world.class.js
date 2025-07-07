class World {
    keystrokes;
    canvas;
    ctx;
    screenTranslateX = 0;

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
        this.checkCharacterCollitions();
        this.keystrokes = keystrokes;
        this.applyWorldToObjects();
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

            // console.log('screenTranslateX:', this.screenTranslateX);
            // console.log('character x:', this.character.x)
            this.checkCharacterEnemyCollition();
            this.checkCharacterCoinCollection();
            this.checkCharacterBottleCollection();
            // this.checkCharacterStrikes();

        }, 100);
        stoppableIntervals.push(intervalId);
    }


    checkCharacterEnemyCollition() {
        this.level.enemies.forEach((enemy) => {
            if(enemy.healthStatus <= 0 || this.character.healthStatus <= 0) return;
            if(enemy.isHitFromAbove(this.character)) {
                console.log(enemy.objectName, 'isHitFromAbove:', 'healthStatus:', enemy.healthStatus);
                enemy.hitHandlingFromAbove(this.character);
                console.log(enemy.objectName, 'healthStatus:', enemy.healthStatus);
                // this.statusBars[0].updateStatusBar(enemy.healthStatus);
            } else if(enemy.isHitFromThrowable(this.character.bottles[0])) {
                console.log(enemy.objectName, 'isHitFromBottle:', 'healthStatus:', enemy.healthStatus);
                enemy.hitHandlingFromThrowable(this.character);
                console.log(enemy.objectName, 'healthStatus:', enemy.healthStatus);
                // this.statusBars[0].updateStatusBar(enemy.healthStatus);
            } else if(this.character.isHit(enemy)) {
                // console.log('isHit with:', enemy.constructor.name, 'value:', enemy.statusValue);
                // console.log('character.healthStatus:', this.character.healthStatus);
                // this.character.isHitHandling(enemy);
                // this.statusBars[0].updateStatusBar(this.character.healthStatus);
            }
        });
    }
    
    
    checkCharacterCoinCollection() {
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


    checkCharacterBottleCollection() {
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
    

    // checkCharacterStrikes() {
    //     this.level.enemies.forEach((obj) => {
    //         if(this.character.isHit(obj)) {
    //             // console.log('collection of:', obj.constructor.name, 'value:', obj.statusValue);
    //             // console.log('character.healthStatus:', this.character.healthStatus);
    //             this.character.isHitHandling(obj);
    //             // this.statusBars[0].updateStatusBar(this.character.healthStatus);
    //         };
    //     });
    // }

    
    isGameOver(){
        if(gameStatus === 0) {
            let timePassed = new Date().getTime() - this.character.lastHit;
            return timePassed >= 3000;
        }
    }

}