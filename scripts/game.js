let imgPathBase = '/assets/img/';
let keystrokes;
let canvas;
let world;
let widthCanvas = 960;
let heightCanvas = widthCanvas / 1.777;
let walkOffset = 48;
let stoppableIntervals = [];

// document.addEventListener("keydown", updateKeystrokesObj);
// document.addEventListener("keyup", resetKeystrokesObj);

function init() {
    keystrokes = new Keystrokes();
    document.addEventListener("keydown", updateKeystrokesObj);
    canvas = document.getElementById('canvas');
    world = new World(canvas, keystrokes);
    document.addEventListener("keyup", resetKeystrokesObj);
}


function stopGame() {
    stoppableIntervals.forEach(clearInterval);
}    


function updateKeystrokesObj(event) {
    switch(event.key) {
        case 'ArrowLeft':
            keystrokes.KEY_LEFT = true
            break
        case 'ArrowRight':
            keystrokes.KEY_RIGHT = true;
            break
        case 'ArrowUp':
            keystrokes.KEY_UP = true;
            break
        case 'ArrowDown':
            keystrokes.KEY_DOWN = true;
            break
        case ' ':
            keystrokes.KEY_SPACE = true;
    }
    console.log(keystrokes);
}

function resetKeystrokesObj(event) {
    switch(event.key) {
        case 'ArrowLeft':
            keystrokes.KEY_LEFT = false
            break
        case 'ArrowRight':
            keystrokes.KEY_RIGHT = false;
            break
        case 'ArrowUp':
            keystrokes.KEY_UP = false;
            break
        case 'ArrowDown':
            keystrokes.KEY_DOWN = false;
            break
        case ' ':
            keystrokes.KEY_SPACE = false;
    }
    console.log(keystrokes);
}

