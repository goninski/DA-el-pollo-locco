let canvas;
let world;
let keystrokes;
let startScreen;
let gameOverScreen;
let screenOverlay;
let gameStatus = 0;
let fullscreenAvailable = document.fullscreenEnabled;


function initGame() {
    screenOverlay = document.getElementById('screenOverlay');
    startScreen = document.getElementById('startScreen');
    gameOverScreen = document.getElementById('gameOverScreen');
    screenOverlay.classList.remove('hide');
    startScreen.classList.remove('hide');
    // document.addEventListener("keydown", updateKeystrokesObj);
    // document.addEventListener("keyup", resetKeystrokesObj);
    keystrokes = new Keystrokes();
    canvas = document.getElementById('canvas');
    let fullscreenBtn = document.getElementById('fullscreenBtn')
    !fullscreenAvailable ? fullscreenBtn.classList.add('hide') : null;
    setBodyClassIfTouchDevice();
}


function startGame(event) {
    event.stopPropagation();
    initGame();
    gameStatus = 1;
    startScreen.classList.add('hide');
    gameOverScreen.classList.add('hide');
    screenOverlay.classList.add('hide');
    initLevel1();
    world = new World(canvas, keystrokes);
}    


function restartGame(event) {
    event.stopPropagation();
    window.location.reload();
    initGame();
    // startGame(event);
}    


function togglePauseGame(event) {
    event.stopPropagation();
    gameStatus = gameStatus === -1 ? 1 : -1;
    console.log(gameStatus);
}    


function stopGame(event = null) {
    event ? event.stopPropagation() : null;
    gameStatus = 0;
    stoppableIntervals.forEach(clearInterval);
    gameOverScreen.classList.remove('hide');
    screenOverlay.classList.remove('hide');
}    


function saveIntervalsGlobally(intervals) {
    stoppableIntervals.push(...intervals);
}


function clearIntervallTimeout(intervalId, timeout = 5000) {
    setTimeout(function() {clearInterval(intervalId)}, timeout);
}    


// function updateKeystrokesObj(event) {
//     switch(event.key) {
//         case 'ArrowLeft':
//             keystrokes.KEY_LEFT = true
//             break
//         case 'ArrowRight':
//             keystrokes.KEY_RIGHT = true;
//             break
//         case 'ArrowUp':
//             keystrokes.KEY_UP = true;
//             break
//         case 'ArrowDown':
//             keystrokes.KEY_DOWN = true;
//             break
//         case 'b':
//             keystrokes.KEY_B = true;
//             break;
//         case 'c':
//             keystrokes.KEY_C = true;
//             break;
//         case ' ':
//             keystrokes.KEY_SPACE = true;
//     }
//     // console.log(keystrokes);
// }


// function resetKeystrokesObj(event) {
//     switch(event.key) {
//         case 'ArrowLeft':
//             keystrokes.KEY_LEFT = false
//             break
//         case 'ArrowRight':
//             keystrokes.KEY_RIGHT = false;
//             break
//         case 'ArrowUp':
//             keystrokes.KEY_UP = false;
//             break
//         case 'ArrowDown':
//             keystrokes.KEY_DOWN = false;
//             break
//         case 'b':
//             keystrokes.KEY_B = false;
//          break
//         case 'c':
//             keystrokes.KEY_C = false;
//          break
//         case ' ':
//             keystrokes.KEY_SPACE = false;
//     }
//     // console.log(keystrokes);
// }


function toggleFullscreen(event) {
    event.stopPropagation();
    let fullscreenElem = document.querySelector('.fullscreen');
    if (!document.fullscreenElement) {
        openFullscreen(fullscreenElem);
    } else {
        closeFullscreen();
    }
}    


function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}


function isTouchEnabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
}


function setBodyClassIfTouchDevice() {
    if(isTouchEnabled()) {
        document.body.classList.add('is-touch-device');
    } else {
        document.body.classList.remove('is-touch-device');
    }
}
