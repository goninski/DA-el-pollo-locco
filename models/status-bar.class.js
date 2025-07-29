/** Class representing a status bar */
class StatusBar extends DrawableObject {

    height = this.width / 3.77;
    color;
    statusType;
    statusValue = 0;
    statusReverse = false;

    color = 'green';
    IMAGES_HEALTH = [
        imgPathBase + '7_statusbars/1_statusbar/2_statusbar_health/' + this.color + '/100.png',
        imgPathBase + '7_statusbars/1_statusbar/2_statusbar_health/' + this.color + '/80.png',
        imgPathBase + '7_statusbars/1_statusbar/2_statusbar_health/' + this.color + '/60.png',
        imgPathBase + '7_statusbars/1_statusbar/2_statusbar_health/' + this.color + '/40.png',
        imgPathBase + '7_statusbars/1_statusbar/2_statusbar_health/' + this.color + '/20.png',
        imgPathBase + '7_statusbars/1_statusbar/2_statusbar_health/' + this.color + '/0.png',
    ]

    IMAGES_COINS = [
        imgPathBase + '7_statusbars/1_statusbar/1_statusbar_coin/' + this.color + '/0.png',
        imgPathBase + '7_statusbars/1_statusbar/1_statusbar_coin/' + this.color + '/20.png',
        imgPathBase + '7_statusbars/1_statusbar/1_statusbar_coin/' + this.color + '/40.png',
        imgPathBase + '7_statusbars/1_statusbar/1_statusbar_coin/' + this.color + '/60.png',
        imgPathBase + '7_statusbars/1_statusbar/1_statusbar_coin/' + this.color + '/80.png',
        imgPathBase + '7_statusbars/1_statusbar/1_statusbar_coin/' + this.color + '/100.png',
    ]

    IMAGES_BOTTLES = [
        imgPathBase + '7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/0.png',
        imgPathBase + '7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/20.png',
        imgPathBase + '7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/40.png',
        imgPathBase + '7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/60.png',
        imgPathBase + '7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/80.png',
        imgPathBase + '7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/100.png',
    ]

    IMAGES_ENDBOSS = [
        imgPathBase + '7_statusbars/2_statusbar_endboss/' + this.color + '/' + this.color + '100.png',
        imgPathBase + '7_statusbars/2_statusbar_endboss/' + this.color + '/' + this.color + '80.png',
        imgPathBase + '7_statusbars/2_statusbar_endboss/' + this.color + '/' + this.color + '60.png',
        imgPathBase + '7_statusbars/2_statusbar_endboss/' + this.color + '/' + this.color + '40.png',
        imgPathBase + '7_statusbars/2_statusbar_endboss/' + this.color + '/' + this.color + '20.png',
        imgPathBase + '7_statusbars/2_statusbar_endboss/' + this.color + '/' + this.color + '0.png',
    ]


    /**
     * Create a status bar
     * @param {string} statusType - 'HEALTH', 'ENDBOSS'
     * @param {number} x - x position 
     * @param {number} y - y position
     */
    constructor(statusType, x, y) {
        super();
        this.positionObject(x, y);
        this.roundDimensions();
        this.roundCoordinates();

        this.statusType = statusType;
        if(this.statusType === 'HEALTH' || this.statusType === 'ENDBOSS') {
            this.statusReverse = true;
        }
        if(this.statusType === 'ENDBOSS') {
            this.hideObject();
        }
        this.loadImage(this['IMAGES_'+ this.statusType][0]);
    }


    /**
     * Update the statusbar value
     * @param {number} statusValue 
     */
    updateStatusBar(statusValue) {
        this.statusValue = statusValue;
        let index = this.resolveImgIndex(this.statusValue);
        this.loadImage(this['IMAGES_'+ this.statusType][index]);
    }


    /**
     * Resolve the image index for statusbar depending from value
     * @param {number} statusValue 
     */
    resolveImgIndex(statusValue) {
        if(this.statusReverse) {
            return this.resolveImgIndexReverse(statusValue);
        }
        if(statusValue < 20) {
            return 0;
        } else if(statusValue < 40) {
            return 1;
        } else if(statusValue < 60) {
            return 2;
        } else if(statusValue < 80) {
            return 3;
        } else if(statusValue < 100) {
            return 4;
        } else {
            return 5;
        }
    }


    /**
     * Resolve the reversed image index for statusbar depending from value
     * @param {number} statusValue 
     */
    resolveImgIndexReverse(statusValue) {
        if(statusValue > 80) {
            return 0;
        } else if(statusValue > 60) {
            return 1;
        } else if(statusValue > 40) {
            return 2;
        } else if(statusValue > 20) {
            return 3;
        } else if(statusValue > 0) {
            return 4;
        } else {
            return 5;
        }
    }


}