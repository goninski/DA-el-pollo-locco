let imgPathBase = '/assets/img/';
let keystrokes;
let canvas;
let world;
let ctx;
let widthCanvas = 720;
let heightCanvas = widthCanvas / 1.777;
let walkOffset = 48;

function init() {
    keystrokes = new Keystrokes();
    document.addEventListener("keydown", updateKeystrokesObj);
    document.addEventListener("keyup", resetKeystrokesObj);
    canvas = document.getElementById('canvas');
    world = new World(canvas, keystrokes);
    world.draw();
}

function updateKeystrokesObj(event) {
    switch(event.key) {
        case 'ArrowLeft':
            keystrokes.LEFT = true
            break
        case 'ArrowRight':
            keystrokes.RIGHT = true;
            break
        case 'ArrowUp':
            keystrokes.UP = true;
            break
        case 'ArrowDown':
            keystrokes.DOWN = true;
            break
        case ' ':
            keystrokes.SPACE = true;
    }
}

function resetKeystrokesObj(event) {
    switch(event.key) {
        case 'ArrowLeft':
            keystrokes.LEFT = false
            break
        case 'ArrowRight':
            keystrokes.RIGHT = false;
            break
        case 'ArrowUp':
            keystrokes.UP = false;
            break
        case 'ArrowDown':
            keystrokes.DOWN = false;
            break
        case ' ':
            keystrokes.SPACE = false;
    }
}
