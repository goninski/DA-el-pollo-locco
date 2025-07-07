let imgPathBase = '/assets/img/';
let widthCanvas = 960;
let heightCanvas = widthCanvas / 1.777;
let walkOffset = 48;
let intervalId = 0;
let stoppableIntervals = [];
let playStatus = 1;

const level1 = new Level(
    [
        new Background(imgPathBase + '5_background/layers/air.png', -1),
        new Background(imgPathBase + '5_background/layers/3_third_layer/1.png', -1),
        new Background(imgPathBase + '5_background/layers/2_second_layer/1.png', -1),
        new Background(imgPathBase + '5_background/layers/1_first_layer/1.png', -1),

        new Background(imgPathBase + '5_background/layers/air.png', 0),
        new Background(imgPathBase + '5_background/layers/3_third_layer/2.png', 0),
        new Background(imgPathBase + '5_background/layers/2_second_layer/2.png', 0),
        new Background(imgPathBase + '5_background/layers/1_first_layer/2.png', 0),

        new Background(imgPathBase + '5_background/layers/air.png', 1),
        new Background(imgPathBase + '5_background/layers/3_third_layer/1.png', 1),
        new Background(imgPathBase + '5_background/layers/2_second_layer/1.png', 1),
        new Background(imgPathBase + '5_background/layers/1_first_layer/1.png', 1),
    ],
    [
        new Clouds(imgPathBase + '5_background/layers/4_clouds/1.png', -1),    
        new Clouds(imgPathBase + '5_background/layers/4_clouds/2.png', 0),    
        new Clouds(imgPathBase + '5_background/layers/4_clouds/1.png', 1),    
    ],
    [
        new Chicken(),    
        new Chicken(),    
        new Chicken(),
        new Endboss(),    
    ],
    [
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
        new Bottle(),    
    ],
    [
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
        new Coin(),    
    ],
    [
        new StatusBar('HEALTH', widthCanvas * 0.03, heightCanvas * 0.03),    
        new StatusBar('COINS', (widthCanvas * 0.03) + 20, (heightCanvas * 0.03) + 36),    
        new StatusBar('BOTTLES', (widthCanvas * 0.03 + 40), (heightCanvas * 0.03) + 72),    
        new StatusBar('ENDBOSS', (widthCanvas * 0.97) - 158, (heightCanvas * 0.03)),    
    ],
);



