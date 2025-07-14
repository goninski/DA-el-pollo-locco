let canvas;
let body;
let world;
let keystrokes;
let gameStatus = 0; // 0:startscreen, -1:paused, 1:play, 2:won; 9:gameover
let fullscreenAvailable = document.fullscreenEnabled;
let currentAudio;

function initGame(restart = false) {
    // gameStatus = 0;
    canvas = document.getElementById('canvas');
    body = document.body;
    let btnToggleFullscreen = document.getElementById('btnToggleFullscreen')
    !fullscreenAvailable ? btnToggleFullscreen.classList.add('hide') : btnToggleFullscreen.classList.remove('hide');
    keystrokes = new Keystrokes();
    setBodyClassIfTouchDevice();
    if(restart) {
        startGame();
    } else {
        showStartScreen();
    }
}

function startGame(event) {
    event.stopPropagation();
    hideAllScreens();
    body.classList.add('play-mode');
    gameStatus = 1;
    initLevel1();
    world = new World(canvas, keystrokes);
    playAudio(null);
}  


function restartGame(event) {
    event.stopPropagation();
    window.location.reload();
    initGame(true);
}    


function hideAllScreens() {
    body.classList.remove('show-start-screen');
    body.classList.remove('show-win-screen');
    body.classList.remove('show-gameover-screen');
    body.classList.remove('play-mode');
    body.classList.remove('game-paused');
}


function showStartScreen() {
    hideAllScreens();
    body.classList.add('show-start-screen');
    playAudio(audioStart);
}


function gameOver(event = null) {
    event ? event.stopPropagation() : null;
    console.log('game is over');
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


async function playAudio(file) {
    if(file === null) {
        currentAudio.pause();
        currentAudio = null;
        body.classList.remove('audio-auto-muted');
        return;
    } else {
        currentAudio = file;
        currentAudio.loop = currentAudio === audioStart ? true : false;
        currentAudio.controls = true;
    }
    try {
      await currentAudio.play();
        currentAudio.play();
        body.classList.remove('audio-auto-muted');
    } catch (err) {
        toggleAudioMute();
        body.classList.add('audio-auto-muted');
    }
}


function togglePauseGame(event) {
    event.stopPropagation();
    let elemEnable = event.currentTarget.querySelector('.enable');
    let elemDisable = event.currentTarget.querySelector('.disable');
    if(gameStatus === -1) {
        gameStatus = 1;
        elemEnable.classList.remove('hide');
        elemDisable.classList.add('hide');
        body.classList.remove('game-paused');
    } else {
        gameStatus = -1;
        elemEnable.classList.add('hide');
        elemDisable.classList.remove('hide');
        body.classList.add('game-paused');
    }
}    


function toggleAudioMute(event = null) {
    if(event) {
        event.stopPropagation();
        body.classList.remove('audio-auto-muted');
    };
    if(currentAudio === null) return;
    let btn = document.getElementById('btnToggleAudioMute');
    let elemEnable = btn.querySelector('.enable');
    let elemDisable = btn.querySelector('.disable');
    if(body.classList.contains('audio-muted')) {
        currentAudio.play();
        elemEnable.classList.remove('hide');
        elemDisable.classList.add('hide');
        body.classList.remove('audio-muted');
    } else {
        currentAudio.pause();
        elemEnable.classList.add('hide');
        elemDisable.classList.remove('hide');
        body.classList.add('audio-muted');
    }
}   


function toggleFullscreen(event) {
    event.stopPropagation();
    let fullscreenElem = document.querySelector('.fullscreen');
    let elemEnable = event.currentTarget.querySelector('.enable');
    let elemDisable = event.currentTarget.querySelector('.disable');
    if (!document.fullscreenElement) {
        openFullscreen(fullscreenElem);
        elemEnable.classList.add('hide');
        elemDisable.classList.remove('hide');
    } else {
        closeFullscreen();
        elemEnable.classList.remove('hide');
        elemDisable.classList.add('hide');
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
