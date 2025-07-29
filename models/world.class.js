/** Class represeting a game world */
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


    /**
     * Create a world
     * @param {element} canvas - canvas dom element
     * @param {object} keystrokes - keystroke class object
     */
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


    /**
     * Apply world object to character and endboss
     */
    applyWorldToObjects() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * Draw Canvas
     */
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


    /**
     * Draw objects on canvas (loop)
     * @param {array} objs - array of objects
     */
    drawObjects(objs) {
        objs.forEach(obj => {
            this.drawObject(obj);
        });
    }


    /**
     * Draw single object on canvas (iteration of a loop )
     * @param {object} obj - single object to draw
     */
    drawObject(obj) {
        obj.otherDirection ? this.flipImage(obj) : null;
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        obj.drawRectangle(this.ctx);
        obj.otherDirection ? this.flipImageBack(obj) : null;
    }


    /**
     * Flip image on canvas
     * @param {object} obj - object to flip
     */    
    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }


    /**
     * Revers image flip
     * @param {object} obj - object to flip reverse
     */    
    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }


    /**
     * Set global intervals
     */
    setGlobalIntervals() {
        intervalId = setInterval(() => {
            if(gameIsPaused) return;
            timer = runPlayTimeCounter();
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
            this.checkObjectCollection('bottle');
            this.checkObjectCollection('coin');
        }, 50);
        this.intervals.push(intervalId);

    }


    /**
     * Update the game status
     */
    updateGameStatus() {
        // this.debugLogs();
        this.updateStatusBars();
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


    /**
     * Debug logs within game status update interval
     */
    debugLogs() {
        console.log('livingEnemies', livingEnemies);
        console.log('this.character.bottles #', this.character.bottles.length);
    }


    /**
     * Update the status bars
     */
    updateStatusBars() {
        this.statusBars[0].updateStatusBar(this.character.healthStatus);
        this.statusBars[1].updateStatusBar(this.character.coinStatus);
        this.statusBars[2].updateStatusBar(this.character.bottleStatus);
        this.statusBars[3].updateStatusBar(this.endboss.healthStatus);
    }


    /**
     * Check if game is paused
     * @returns {boolean}
     */
    isGamePaused(){
        if(this.isGameOver() || this.isGameWon()) {
            return false;
        } else {
            return gameIsPaused === true;
        }
    }


    /**
     * Check if game is won
     * @returns {boolean}
     */
    isGameWon() {
        // return livingEnemies <= 0;
        if(this.endboss.isDead()) {
            return debounceDelayed(this.endboss.lastHit, 1500);
        }
    }
    
    
    /**
     * Check if game is over
     * @returns {boolean} - during ??
     */
    isGameOver(){
        if(this.character.isDead()) {
            return debounceDelayed(this.character.lastHit, 2000);
        }
    }
  
    
    /**
     * Check enemy hits (in both directions)
     */
    checkEnemyHits() {
        this.level.enemies.forEach((enemy) => {
            if(enemy.isDead() || this.character.isDead()) {
              return;  
            }
            if(this.character.bottles.length > 0) {
                let bottle = this.character.bottles[0];
                if(enemy.isHitFromAbove(bottle, bottle.borderWidth * 0.5)) {
                    enemy.handlingHitFromBottle(bottle);                    
                }
            }
            if(enemy.isHitFromAbove(this.character, enemy.borderWidth * 0.25)) {
                enemy.handlingHitFromAbove(this.character);
            } else if(enemy.isHitFromSideJump(this.character, enemy.borderWidth * 0.25)) {
                enemy.handlingHitFromSideJump(this.character);
                // this.character.handlingHitFromSideJump(enemy);
            } else if(this.character.isHitOnGround(enemy)) {
                this.character.handlingHitOnGround(enemy);
            }
        });
    }


    /**
     * Check object collection (coin/bottle collection)
     * @param {string} objectName - class name of the collectable object (lower case)
     */
    checkObjectCollection(objectName) {
        if(this.character[objectName + 'Status'] >= 100) return;
        this.level[objectName + 's'].forEach((item) => {
            if(this.character.touchesObject(item, this.character.borderWidth * 0.25)) {
                this.character.collectObject(item);
            };
        });
    }


}