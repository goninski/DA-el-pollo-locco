let canvas;
let body;
let world;
let keystrokes;
let gameStatus = 0; // 0:startscreen, -1:paused, 1:play, 2:won; 9:gameover
let fullscreenAvailable = document.fullscreenEnabled;


function initGame(restart = false) {
    gameStatus = 0;
    canvas = document.getElementById('canvas');
    body = document.body;
    keystrokes = new Keystrokes();
    let fullscreenBtn = document.getElementById('fullscreenBtn')
    !fullscreenAvailable ? fullscreenBtn.classList.add('hide') : null;
    setBodyClassIfTouchDevice();
    if(!restart) {
        showStartScreen();
    }
}


function hideAllScreens() {
    body.classList.remove('show-start-screen');
    body.classList.remove('show-win-screen');
    body.classList.remove('show-gameover-screen');
    body.classList.remove('play-mode');
}


function showStartScreen() {
    hideAllScreens();
    body.classList.add('show-start-screen');
    audioStart.play();
}


function startGame(event) {
    event.stopPropagation();
    hideAllScreens();
    body.classList.add('play-mode');
    gameStatus = 1;
    initLevel1();
    world = new World(canvas, keystrokes);
}  


function restartGame(event) {
    event.stopPropagation();
    window.location.reload();
    initGame(true);
}    


function togglePauseGame(event) {
    event.stopPropagation();
    if(gameStatus === -1) {
        gameStatus = 1;
        body.classList.remove('game-paused');
    } else {
        gameStatus = -1;
        body.classList.add('game-paused');
    }
}    


function gameOver(event = null) {
    event ? event.stopPropagation() : null;
    gameStatus = 9;
    stoppableIntervals.forEach(clearInterval);
    hideAllScreens();
    body.classList.add('show-gameover-screen');
}    


function gameWon(event = null) {
    event ? event.stopPropagation() : null;
    gameStatus = 2;
    stoppableIntervals.forEach(clearInterval);
    hideAllScreens();
    body.classList.add('show-win-screen');
}    


function saveIntervalsGlobally(intervals) {
    stoppableIntervals.push(...intervals);
}


function clearIntervallTimeout(intervalId, timeout = 5000) {
    setTimeout(function() {clearInterval(intervalId)}, timeout);
}    


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
        body.classList.add('is-touch-device');
    } else {
        body.classList.remove('is-touch-device');
    }
}
