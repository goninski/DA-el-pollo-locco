let imgPathBase = '/assets/img/';
let audioPathBase = '/assets/audio/';
let audioIsMuted = false;
let showObjectBorders = false;
let canvas;
let widthCanvas = 1000;
let heightCanvas = widthCanvas / 1.777;
let walkOffset = 48;
let body;
let world;
let keystrokes;
let lastKeystroke;
let lastKeystroke_LEFT;
let lastKeystroke_RIGHT;
let lastKeystroke_JUMP;
let lastKeystroke_THROW;
// let gameStatus = 0; // 0:startscreen, -1:paused, 1:play, 2:won; 9:gameover
// let playStatus = 1;
let gameIsPaused = false;
let timer;
let secondsPlay = 0;
let livingEnemies;
let intervalId = 0;
let stoppableIntervals = [];
let fullscreenAvailable = document.fullscreenEnabled;
let currentAudios = [];
let audioCache = {
    start : new Audio(audioPathBase + 'start.mp3'),
    gameOver : new Audio(audioPathBase + 'game-over.mp3'),
    gameWin : new Audio(audioPathBase + 'game-win.wav'),
};


function initGame(restart = false) {
    canvas = document.getElementById('canvas');
    body = document.body;
    keystrokes = new Keystrokes();
    setFullscreenToggle();
    setBodyClassIfTouchDevice();
    audioIsMuted ? body.classList.add('audio-muted') : body.classList.remove('audio-muted');
    gameIsPaused = false;
    livingEnemies = 999;
    restart ? startGame() : showStartScreen();
}


function startGame(event = null) {
    event ? event.stopPropagation() : null;
    hideAllScreens();
    stoppableIntervals.forEach(clearInterval);
    stopAudio(audioCache.start);
    body.classList.add('play-screen');
    // gameStatus = 1;
    secondsPlay = 0;
    initLevel1();
    world = new World(canvas, keystrokes);
    lastKeystroke = new Date().getTime();
}  


function restartGame(event = null) {
    event ? event.stopPropagation() : null;
    // window.location.reload();
    // initGame(true);
    initGame();
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
    startAudio(audioCache.start, 0.2, true);
}


function gameOver(event = null) {
    event ? event.stopPropagation() : null;
    console.log('game is over');
    // gameStatus = 9;
    stopAudios();
    stoppableIntervals.forEach(clearInterval);
    hideAllScreens();
    body.classList.add('game-over-screen');
    startAudio(audioCache.gameOver);
    document.getElementById('playTimer').innerHTML = timer;
    // setTimeout(() => restartGame(null), 12000);
}    


function gameWon(event = null) {
    event ? event.stopPropagation() : null;
    // gameStatus = 2;
    stopAudios();
    hideAllScreens();
    body.classList.add('win-screen');
    startAudio(audioCache.gameWin);
    stoppableIntervals.forEach(clearInterval);
    // setTimeout(() => restartGame(null), 12000);
}    


function setBodyClassIfTouchDevice() {
    isTouchEnabled() ? body.classList.add('is-touch-device'): body.classList.remove('is-touch-device');
}


function isTouchEnabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
}


function setFullscreenToggle() {
    let btnToggleFullscreen = document.getElementById('btnToggleFullscreen')
    !fullscreenAvailable ? btnToggleFullscreen.classList.add('hide') : btnToggleFullscreen.classList.remove('hide');
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
            gameIsPaused = false;
            // gameStatus = 1;
            !audioIsMuted ? unmuteAudios() : null;
            world.draw();
        }
    } else {
        body.classList.add('help-screen');
        if(body.classList.contains('play-screen')) {
            body.classList.add('game-paused');
            gameIsPaused = true;
            // gameStatus = -1;
            !audioIsMuted ? muteAudios() : null;
            // stoppableIntervals.forEach(clearInterval);
        }
    }
}   


function playTimeCounter() {
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
    // console.log(timer);
    return timer;
}


function saveIntervalsGlobally(intervals) {
    stoppableIntervals.push(...intervals);
}


function clearIntervallTimeout(intervalId, timeout = 5000) {
    setTimeout(function() {clearInterval(intervalId)}, timeout);
}    


function startAudio(audioObj, volume = 1, loop = false) {
    !currentAudios.includes(audioObj) ? currentAudios.push(audioObj) : null;
    audioObj.volume = volume;
    audioObj.loop = loop;
    checkNSetAudioMuting(audioObj);
    audioObj.play().catch(error => {
        audioObj.muted = true;
        audioIsMuted = true;
        body.classList.add('audio-muted');
        console.log('audioplay error:', error);
    });
    // !audioObj.loop ? currentAudios.pop() : null;
}


function startAudioDebounced(audioObj, eventStart, delay = 150, volume = 1, loop = false) {
    let currentTime = new Date().getTime();
    let diff = currentTime - eventStart;
    // console.log(eventStart, currentTime, diff);
    if(diff > delay) return;
    startAudio(audioObj, volume, loop)
}


function resumeAudio(audioObj, volume = 1) {
    // audioObj.pause();
    audioObj.currentTime = 0;
    startAudio(audioObj, volume, false)
}


function checkNSetAudioMuting(audioObj) {
    if(audioIsMuted) {
        audioObj.muted = true;
        body.classList.add('audio-muted');
    } else {
        audioObj.muted = false;
        body.classList.remove('audio-muted');
    }
}


function stopAudio(audioObj) {
    audioObj.pause();
    let index = currentAudios.findIndex(item => item === audioObj);
    index >= 0 ? currentAudios.splice(index, 1) : null;
}


function stopAudios() {
    currentAudios.forEach(item => item.pause());
    currentAudios = [];
}


function toggleAudioMute(event = null) {
    event ? event.stopPropagation() : null;
    audioIsMuted ? unmuteAudios() : muteAudios();
}


function muteAudios() {
    currentAudios.forEach(item => item.muted = true);
    // currentAudios.forEach(item => item.mute = true);
    audioIsMuted = true;
    body.classList.add('audio-muted');
}


function unmuteAudios() {
    currentAudios.forEach(item => item.muted = false);
    audioIsMuted = false;
    body.classList.remove('audio-muted');
}

