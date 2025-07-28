let coinId = 0;

class Coin extends CollectableObject {
    width = this.width * 0.7
    height = this.width * 1;
    objectPadding = [0.3, 0.3, 0.3, 0.3];
    value = 5; 
    strength = 5;

    IMAGES_GROUND = [
        imgPathBase + '8_coin/coin_1.png',
        imgPathBase + '8_coin/coin_2.png',

    ];

    audioFiles = {
        collect : audioPathBase + 'coin-collect.mp3',
    }

    
    constructor() {

        super();
        coinId++;
        this.objectName += coinId;
        this.roundDimensions();

        this.setRandomPosX();
        this.setWalkGroundY();
        this.y = this.groundY - (Math.floor(Math.random() * (heightCanvas * 0.66)));
        this.roundCoordinates();
        this.setBorderCoordinates();

        let index = Math.floor(Math.random() * 2);
        this.loadImage(this.IMAGES_GROUND[index]);
        this.setAudioCache(this.audioFiles);

    }

   
}

