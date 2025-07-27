let coinId = 0;

class Coin extends MovableObject {
    width = this.width * 0.7
    height = this.width * 1;
    objectPadding = [0.3, 0.3, 0.3, 0.3];
    strength = 5;
    isCollectable = true;

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

        this.setRandomPosX();
        this.setWalkGroundY();
        this.y = this.groundY - (Math.floor(Math.random() * (heightCanvas * 0.66)));
        this.setBorderCoordinates();
        // console.log(this.objectName, this.x, this.y);

        let index = Math.floor(Math.random() * 2);
        this.loadImage(this.IMAGES_GROUND[index]);
        this.setAudioCache(this.audioFiles);

    }

   
}

