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

        this.updateGameStatus();

        if(!this.isGameOver() && !this.isGameWon) {
            let self = this;
            requestAnimationFrame(() => self.draw());
        }
    };


    drawStartScreenObjects(objs) {
        objs.forEach(obj => {
            this.drawObject(obj);
        });
    }

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
        // intervalId = setInterval(() => {
        //     this.updateGameStatus();
        // }, 1000 / 60);
        // this.intervals.push(intervalId);

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
            // console.log('character healthStatus:', this.character.healthStatus);
            // console.log(enemy.objectName, 'healthStatus:', enemy.healthStatus);
            if(enemy.healthStatus <= 0 || this.character.healthStatus <= 0) return;
            if(enemy.isHitFromAbove(this.character)) {
                this.handleEnemyHitFromAbove(enemy, this.character);
            // } else if(enemy.isHitFromBottle(this.character.bottles[0])) {
            //     this.handleEnemyHitFromBottle(enemy, this.character);
            } else if(this.character.isHit(enemy)) {
                this.handleHitFromEnemy(enemy, this.character);
            }
        });
    }


    handleEnemyHitFromAbove(enemy, character) {
        enemy.hitHandlingFromAbove(character);
        console.log(enemy.objectName, 'isHitFromAbove:', 'healthStatus:', enemy.healthStatus);
    }
    

    EnemyHitFromBottlee(enemy, character) {
        enemy.hitHandlingFromBottle(character);
        console.log(enemy.objectName, 'isHitFromBottle:', 'healthStatus:', enemy.healthStatus);
    }

    
    handleHitFromEnemy(enemy, character) {
        character.hitHandling(enemy);
        console.log('character isHit from:', enemy.constructor.name, 'value:', enemy.statusValue);
        console.log('character healthStatus:', character.healthStatus);
    }

    
    checkCoinCollection() {
        this.level.coins.forEach((coin) => {
            if(coin.hits > 0 || this.character.coinStatus >= 100) return;
            if(this.character.touchesObject(coin)) {
                this.character.collectCoin(coin);
                console.log('collection of:', coin.constructor.name, 'value:', coin.statusValue);
                console.log('character.coinStatus:', this.character.coinStatus);
            };
        });
    }


    checkBottleCollection() {
        this.level.bottles.forEach((bottle) => {
            if(bottle.hits > 0 || this.character.bottleStatus >= 100) return;
            if(this.character.touchesObject(bottle)) {
                this.character.collectBottle(bottle);
                console.log('collection of:', bottle.constructor.name, 'value:', bottle.statusValue);
                console.log('character.bottleStatus:', this.character.bottleStatus);
            };
        });
    }
    
    
    updateGameStatus() {
        // this.statusBars[0].updateStatusBar(this.character.healthStatus);
        // this.statusBars[1].updateStatusBar(this.character.coinStatus);
        // this.statusBars[2].updateStatusBar(this.character.bottleStatus);
        // this.updateEndbossStatusBar();
        this.character.healthStatus <= 0 ? gameStatus = 0 : null;
        if(this.isGameOver()) {
            gameOver();
        } else if(this.isGameWon()) {
            gameWon();
        }
    }


    updateEndbossStatusBar() {
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof Endboss) {
                this.statusBars[4].updateStatusBar(enemy.healthStatus);
            }
        });
    }


    isGamePaused(){
        if(this.isGameOver()) {
            return false;
        } else {
            return gameStatus === -1;
        }
    }


    isGameOver(){
        if(gameStatus === 9) {
            let timePassed = new Date().getTime() - this.character.lastHit;
            return timePassed >= 3000;
        }
    }


    isGameWon(){
        if(gameStatus === 2) {
            let timePassed = new Date().getTime() - this.character.lastHit;
            return timePassed >= 3000;
        }
    }

}