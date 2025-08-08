let coinId = 0;

/**
 * Class representing collectable coins
 */
class Coin extends CollectableObject {

    width = this.width * 0.7
    height = this.width * 1;
    objectPadding = [0.3, 0.3, 0.3, 0.3];
    value = 5; 

    IMAGES_MAIN = [
        imgPathBase + '8_coin/coin_1.png',
        imgPathBase + '8_coin/coin_2.png',

    ];

    audioFiles = {
        collect : audioPathBase + 'coin-collect.mp3',
    }

    
    /**
     * Create a coin - and place it randomly
     */
    constructor() {
        super();
        coinId++;
        this.objectName += coinId;
        this.roundDimensions();
        this.setRandomPosX();
        this.setWalkGroundY();
        this.y = this.groundY - (Math.floor(Math.random() * (heightCanvas * 0.6)));
        this.roundCoordinates();
        this.setBorderCoordinates();
        let index = Math.floor(Math.random() * 2);
        this.setMediaCache();
        this.showImageFromCache('IMAGES_MAIN', index);
}

    
    /**
     * set media cache
     */
    setMediaCache() {
        this.setImageCache(this.IMAGES_MAIN);
        this.setAudioCache(this.audioFiles);
    }

}

