let canvas;
let world;
let keystrokes;
let gameOverScreen;
let gameStatus = 1;

function initGame() {
    gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style = 'display: none !important';
    document.addEventListener("keydown", updateKeystrokesObj);
    document.addEventListener("keyup", resetKeystrokesObj);
    keystrokes = new Keystrokes();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keystrokes);
}


function restartGame() {
    window.location.reload();
}    


function stopGame() {
    stoppableIntervals.forEach(clearInterval);
    gameOverScreen.style = '';
}    


function saveIntervalsGlobally(intervals) {
    stoppableIntervals.push(...intervals);
}


function clearIntervallTimeout(intervalId, timeout = 5000) {
    setTimeout(function() {clearInterval(intervalId)}, timeout);
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
        case 'b':
            keystrokes.KEY_B = true;
            break;
        case 'c':
            keystrokes.KEY_C = true;
            break;
        case ' ':
            keystrokes.KEY_SPACE = true;
    }
    // console.log(keystrokes);
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
        case 'b':
            keystrokes.KEY_B = false;
         break
        case 'c':
            keystrokes.KEY_C = false;
         break
        case ' ':
            keystrokes.KEY_SPACE = false;
    }
    // console.log(keystrokes);
}

