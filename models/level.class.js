class Level {

    backgrounds;
    clouds;
    enemies;
    screenStartX = (widthCanvas * -1) + 1;
    screenEndX = (widthCanvas * 2) - 1;

    constructor(backgrounds, clouds, enemies) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
    }

}