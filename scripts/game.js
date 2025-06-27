let imgPathBase = '/assets/img/';
let canvas;
let world;
let ctx;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    // console.log('character', world.character);
    world.draw();
}

