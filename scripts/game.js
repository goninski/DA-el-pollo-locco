let canvas;
let body;
let world;
let keystrokes;
let gameStatus = 0; // 0:startscreen, -1:paused, 1:play, 2:won; 9:gameover
let fullscreenAvailable = document.fullscreenEnabled;
let currentAudio;
let secondsPlay = 0;
let timer;
let showObjectBorders = false;

function initGame(restart = false) {
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
    stoppableIntervals.forEach(clearInterval);
    body.classList.add('play-screen');
    gameStatus = 1;
    initLevel1();
    world = new World(canvas, keystrokes);
    playAudio(null);
    secondsPlay = 0;
}  


function restartGame(event) {
    event.stopPropagation();
    window.location.reload();
    initGame(true);
}    


function hideAllScreens() {
    body.classList.remove('start-screen');
    body.classList.remove('win-screen');
    body.classList.remove('game-over-screen');
    body.classList.remove('play-screen');
    body.classList.remove('game-paused');
    body.classList.remove('help-screen');
}


function showStartScreen() {
    hideAllScreens();
    body.classList.add('start-screen');
    // body.classList.add('help-screen');
    playAudio(audioStart);
}


function gameOver(event = null) {
    event ? event.stopPropagation() : null;
    console.log('game is over');
    gameStatus = 9;
    stoppableIntervals.forEach(clearInterval);
    hideAllScreens();
    body.classList.add('game-over-screen');
    document.getElementById('playTimer').innerHTML = timer;
}    


function gameWon(event = null) {
    event ? event.stopPropagation() : null;
    gameStatus = 2;
    stoppableIntervals.forEach(clearInterval);
    hideAllScreens();
    body.classList.add('win-screen');
}    


async function playAudio(file) {
    if(file === null) {
        currentAudio.pause();
        currentAudio = null;
        body.classList.remove('audio-auto-muted');
        body.classList.add('no-audio');
        return;
    } else {
        currentAudio = file;
        currentAudio.loop = currentAudio === audioStart ? true : false;
    }
    await handleAudioAutoMute();
}


async function handleAudioAutoMute() {
    try {
      await currentAudio.play();
        currentAudio.play();
        body.classList.remove('audio-auto-muted');
        body.classList.remove('no-audio');
    } catch (err) {
        toggleAudioMute();
        body.classList.add('audio-auto-muted');
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
    let fullscreenElem = document.querySelector('.fullscreen-element');
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


function toggleHelp(event) {
    event.stopPropagation();
    body.classList.remove('game-paused');
    if(body.classList.contains('help-screen')) {
        body.classList.remove('help-screen');
        if(body.classList.contains('play-screen')) {
            gameStatus = 1;
        }
    } else {
        body.classList.add('help-screen');
        if(body.classList.contains('play-screen')) {
            body.classList.add('game-paused');
            gameStatus = -1;
        }
    }
}   


// function togglePauseGame(event) {
//     event.stopPropagation();
//     if(gameStatus === -1) {
//         gameStatus = 1;
//         body.classList.remove('game-paused');
//     } else {
//         gameStatus = -1;
//         body.classList.add('game-paused');
//     }
// }    


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


function saveIntervalsGlobally(intervals) {
    stoppableIntervals.push(...intervals);
}


function clearIntervallTimeout(intervalId, timeout = 5000) {
    setTimeout(function() {clearInterval(intervalId)}, timeout);
}    


function timerUpCounter() {
    let timeDiff = 60 * 60 * 1000
    let dateObj = new Date(secondsPlay * 1000 - timeDiff);
    secondsPlay++;
    let time = {
        hours:dateObj.getHours(),
        minutes:dateObj.getMinutes(),
        seconds:dateObj.getSeconds(),
    }
    Object.entries(time).forEach(i => {
        let key = i[0];
        let val = i[1];
        time[key] = (val < 10 ? '0' + val : val);
    });
    if(time.hours >= 1){
        timer = time.hours + ':' + time.minutes + ':' + time.seconds + '';
    } else {
        timer = time.minutes + ':' + time.seconds + '';
    }
    console.log(timer);
    return timer;
}

