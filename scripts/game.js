let imgPathBase = '/assets/img/';
let audioPathBase = '/assets/audio/';
let audioIsMuted = false;
let audioMutedByUser = false;
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


function initGame(startPlay = false) {
    canvas = document.getElementById('canvas');
    body = document.body;
    keystrokes = new Keystrokes();
    setFullscreenToggle();
    setBodyClassIfTouchDevice();
    audioIsMuted ? body.classList.add('audio-muted') : body.classList.remove('audio-muted');
    startPlay ? startGame() : showStartScreen();
}


function showStartScreen() {
    hideAllScreens();
    body.classList.add('start-screen');
    loadLevel1();
    pauseGame();
    startAudio(audioCache.start, 0.2, true);
    unmuteAudio();
}


function loadLevel1() {
    livingEnemies = 999;
    initLevel1();
    world = new World(canvas, keystrokes);
}


function startGame(event = null) {
    event ? event.stopPropagation() : null;
    stopAudio(audioCache.start);
    resumeGame()
    secondsPlay = 0;
    lastKeystroke = new Date().getTime();
    hideAllScreens();
    body.classList.add('play-screen');
}  


function restartGame(event = null) {
    event ? event.stopPropagation() : null;
    stopAudios();
    stoppableIntervals.forEach(clearInterval);
    gameIsPaused = false;
    // window.location.reload();
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


function gameOverHandling(event = null) {
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


function gameWonHandling(event = null) {
    event ? event.stopPropagation() : null;
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


function toggleHelp(event) {
    event.stopPropagation();
    body.classList.remove('game-paused');
    if(body.classList.contains('help-screen')) {
        body.classList.remove('help-screen');
        if(body.classList.contains('play-screen')) {
            resumeGame();
        }
    } else {
        body.classList.add('help-screen');
        if(body.classList.contains('play-screen')) {
            pauseGame();
        }
    }
}   


function pauseGame() {
    body.classList.add('game-paused');
    gameIsPaused = true;
    muteAudio();
}   


function resumeGame() {
    gameIsPaused = false;
    unmuteAudio();
    world.draw();
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
    if(!currentAudios.includes(audioObj)) {
        currentAudios.push(audioObj);        
    };
    audioObj.volume = volume;
    audioObj.loop = loop;
    checkNSetAudioMuting(audioObj);
    audioObj.play().catch(error => {
        audioObj.muted = true;
        audioIsMuted = true;
        body.classList.add('audio-muted', 'audio-auto-muted');
        console.log('audioplay error:', error);
    });
    // !audioObj.loop ? currentAudios.pop() : null;
}


function startAudioDebounced(audioObj, startTime, delay = 150, volume = 1, loop = false) {
    if(debounced(startTime, delay)) {
        startAudio(audioObj, volume, loop);
    }
}


function startAudioResumed(audioObj, volume = 1) {
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
        body.classList.remove('audio-muted', 'audio-auto-muted');
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
    if(audioIsMuted) {
        audioMutedByUser = false;
        unmuteAudio(event);
    } else {
        audioMutedByUser = true;
        muteAudio();
    }
}


function muteAudio() {
    currentAudios.forEach(item => item.muted = true);
    audioIsMuted = true;
    body.classList.add('audio-muted');
}


function unmuteAudio(event = null) {
    event ? event.stopPropagation() : null;
    if(audioMutedByUser) return;
    if(body.classList.contains('audio-auto-muted') && event === null) return;
    currentAudios.forEach(item => item.muted = false);
    audioIsMuted = false;
    body.classList.remove('audio-muted', 'audio-auto-muted');
}


function debounced(startTime, delay = 150) {
    let currentTime = new Date().getTime();
    return (currentTime - startTime) <= delay;
}


function during(startTime, duration = 1000) {
    return (new Date().getTime() - startTime) >= duration;
}
