/**
 * Class for level 1 
 */
class Level {

    backgrounds;
    clouds;
    enemies;
    endboss;
    bottles;
    coins;
    statusBars;

    
    constructor(backgrounds, clouds, enemies, bottles, coins, statusBars) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = enemies[enemies.length - 1];
        this.bottles = bottles;
        this.coins = coins;
        this.statusBars = statusBars;

    }

}