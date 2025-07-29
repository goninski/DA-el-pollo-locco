/** Class representing a game level */
class Level {

    backgrounds;
    clouds;
    enemies;
    endboss;
    bottles;
    coins;
    statusBars;

    
    /**
     * Create a level
     * @param {array} backgrounds - array of background objects
     * @param {array} clouds - cloud class objects
     * @param {array} enemies - enemy class objects
     * @param {array} bottles - bottle class objects
     * @param {array} coins - coin class objects
     * @param {array} statusBars - statusbar class objects
     */
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