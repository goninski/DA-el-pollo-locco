class StatusBar extends DrawableObject {

    height = this.width / 3.77;
    color = 'orange';
    statusType;
    statusValue = 0;


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
        imgPathBase + '/7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/0.png',
        imgPathBase + '/7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/20.png',
        imgPathBase + '/7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/40.png',
        imgPathBase + '/7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/60.png',
        imgPathBase + '/7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/80.png',
        imgPathBase + '/7_statusbars/1_statusbar/3_statusbar_bottle/' + this.color + '/100.png',
    ]


    constructor(statusType, y) {
        super();
        this.statusType = statusType;
        this.x = widthCanvas * 0.4;
        this.loadImage(this['IMAGES_'+ this.statusType][0]);
        // this.setImageCache(this['IMAGES_' + statusType]);
        this.y = y;
    }


    updateStatusbar(statusType, statusValue) {
        this.statusType = statusType;
        this.statusValue = statusValue;
        let index;
        if(this.statusType == 'HEALTH'){
            index = this.resolveImgIndexHealth(this.statusValue);
        } else {
            index = this.resolveImgIndex(this.statusValue);
        }
        console.log(this['IMAGES_'+ this.statusType][index]);
        this.loadImage(this['IMAGES_'+ this.statusType][index]);
    }


    resolveImgIndex(statusValue) {
        return 0;
    }


    resolveImgIndexHealth(statusValue) {
        if(statusValue == 100) {
            return 0;
        } else if(statusValue > 60) {
            return 1;
        } else if(statusValue > 40) {
            return 2;
        } else if(statusValue > 20) {
            return 3;
        } else if(statusValue > 0) {
            return 4;
        } else if(statusValue == 0) {
            return 5;
        }
    }
        

}