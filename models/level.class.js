class Level {

    // imgPathBase = '/assets/img/';
    // widthCanvas = 960;
    // heightCanvas = widthCanvas / 1.777;
    // walkOffset = 48;
    // stoppableIntervals = [];

    // screenStartX = (widthCanvas * -1) + 1;
    // screenEndX = (widthCanvas * 2) - 1;

    backgrounds;
    clouds;
    enemies;
    bottles;
    coins;
    statusBars;

    constructor(backgrounds, clouds, enemies, bottles, coins, statusBars) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.statusBars = statusBars;
    }

}