class World {
    keystrokes;
    canvas;
    ctx;
    backgrounds =  [
        new Background(imgPathBase + '5_background/layers/air.png'),
        new Background(imgPathBase + '5_background/layers/3_third_layer/1.png'),
        new Background(imgPathBase + '5_background/layers/2_second_layer/1.png'),
        new Background(imgPathBase + '5_background/layers/1_first_layer/1.png'),
    ];
    clouds =  [
        new Clouds(),    
    ];
    enemies =  [
        new Chicken(),    
        new Chicken(),    
        new Chicken(),    
    ]
    character = new Character();


    constructor(canvas, keystrokes) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keystrokes = keystrokes;
        this.draw();
        this.applyWorldToObjects();
    }


    applyWorldToObjects() {
        console.log(this);
        this.character.world = this;
        console.log(this.character.world);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawObjects(this.backgrounds);
        this.drawObjects(this.clouds);
        this.drawObjects(this.enemies);

        this.drawObject(this.character);

        // automatic recall of draw (speed depending on gpu performance)
        let self = this;
        requestAnimationFrame(() => self.draw());
    };


    drawObject(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);            
    }


    drawObjects(objs) {
        objs.forEach(obj => {
            this.drawObject(obj);
        });
    }

}