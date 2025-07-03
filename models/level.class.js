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
    throwables;
    statusBars;

    constructor(backgrounds, clouds, enemies, throwables) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
        this.throwables = throwables;
        // this.statusBars = statusBars;
    }

}