class World {
    keystrokes;
    canvas;
    ctx;
    screenTranslateX = 0;
    intervals = [];
    level = level1;
    character = new Character();
    backgrounds = level1.backgrounds;
    clouds = level1.clouds;
    enemies = level1.enemies;
    endboss = level1.endboss;
    bottles = level1.bottles;
    coins = level1.coins;
    statusBars = level1.statusBars;

    constructor(canvas, keystrokes) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setGlobalIntervals();
        this.keystrokes = keystrokes;
        this.applyWorldToObjects();
        saveIntervalsGlobally(this.intervals);
        livingEnemies = this.enemies.length - 1;
    }


    applyWorldToObjects() {
        this.character.world = this;
        this.endboss.world = this;
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

        if(!this.isGameOver() && !this.isGameWon() && !gameIsPaused) {
            let self = this;
            requestAnimationFrame(() => self.draw());
        }
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


    setGlobalIntervals() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            timer = playTimeCounter();
            document.getElementById('playTimer').innerHTML =  timer;
        }, 1000);
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            this.updateGameStatus();
        }, 300);
        this.intervals.push(intervalId);

        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            this.checkEnemyHits();
            this.checkBottleCollection();
            this.checkCoinCollection();
        }, 50);
        this.intervals.push(intervalId);

    }



    updateGameStatus() {
        // console.log('livingEnemies', livingEnemies);
        this.statusBars[0].updateStatusBar(this.character.healthStatus);
        this.statusBars[1].updateStatusBar(this.character.coinStatus);
        this.statusBars[2].updateStatusBar(this.character.bottleStatus);
        this.statusBars[3].updateStatusBar(this.endboss.healthStatus);
        if(this.isGameOver()) {
            return handlingGameOver();
        } else if(this.isGameWon()) {
            return handlingGameWon();
        } else if(livingEnemies <= 0 && !this.endboss.active) {
            this.endboss.active = true;
            this.endboss.setWalkGroundY();
            this.statusBars[3].positionObject((widthCanvas * 0.985) - 158, (heightCanvas * 0.03) + 72);
        }
    }



    isGamePaused(){
        if(this.isGameOver() || this.isGameWon()) {
            return false;
        } else {
            return gameIsPaused = true
        }
    }


    isGameOver(){
        if(this.character.isDead()) {
            return during(this.character.lastHit, 2500);
        }
    }


    isGameWon(){
        if(this.endboss.isDead()) {
            return during(this.endboss.lastHit, 1500);
        }
    }
    
    
    checkEnemyHits() {
        this.level.enemies.forEach((enemy) => {
            if(enemy.isDead() || this.character.isDead()) {
              return;  
            }
            // console.log(this.character.bottles);
            if(this.character.bottles.length > 0) {
                if(enemy.isHitFromBottle(this.character.bottles[0])) {
                    enemy.handlingHitFromBottle(this.character.bottles[0]);                    
                }
            }
            if(enemy.isHitFromAbove(this.character)) {
                enemy.handlingHitFromAbove(this.character);
            } else if(this.character.isHit(enemy)) {
                this.character.handlingHit(enemy);
            }
        });
    }

    
    checkBottleCollection() {
        // console.log(this.character.bottleStatus);
        if(this.character.bottleStatus >= 100) return;
        this.level.bottles.forEach((bottle) => {
            // console.log(bottle.hits);
            if(bottle.hits <= 0) {
                if(this.character.touchesObject(bottle)) {
                    // this.character.collectBottle(bottle);
                    this.character.collectObject(bottle);
                };
            }
        });
    }

    
    checkCoinCollection() {
        if(this.character.coinStatus >= 100) return;
        this.level.coins.forEach((coin) => {
            if(coin.hits <= 0) {
                if(this.character.touchesObject(coin)) {
                    // this.character.collectCoin(coin);
                    this.character.collectObject(coin);
                };
            }
        });
    }

    

}