let fullscreenAvailable = document.fullscreenEnabled;
let showObjectBorders = false;
let imgPathBase = '/assets/img/';
let body;
let world;
let canvas;
let widthCanvas = 1000;
let heightCanvas = Math.round(widthCanvas / 1.777);
let walkOffset = 48;
let keystrokes;
let lastKeystroke;
let lastKeystroke_LEFT;
let lastKeystroke_RIGHT;
let lastKeystroke_JUMP;
let lastKeystroke_THROW;
let time = {};
let timer;
let secondsPlay = 0;
let intervalId = 0;
let stoppableIntervals = [];
let livingEnemies;
let gameIsPaused = false;


/**
 * Initial - on page load and restart
 * @param {boolean} skipStartScreen
 */
function initGame(skipStartScreen = false) {
    canvas = document.getElementById('canvas');
    body = document.body;
    keystrokes = new Keystrokes();
    setFullscreenToggle();
    setBodyClassIfTouchDevice();
    audioMuted ? body.classList.add('audio-muted') : body.classList.remove('audio-muted');
    skipStartScreen ? startGame() : showStartScreen();
}


/**
 * Show start screen
 */
function showStartScreen() {
    hideAllScreens();
    body.classList.add('start-screen');
    loadLevel1();
    pauseGame();
    startAudio(audioCache.gameStart, 0.2, true);
    unmuteAudio();
}


/**
 * Load level 1
 */
function loadLevel1() {
    livingEnemies = 999;
    initLevel1();
    world = new World(canvas, keystrokes);
}


/**
 * Start the game
 * @param {event} event - start button
 */
function startGame(event = null) {
    event ? event.stopPropagation() : null;
    stopAudio(audioCache.gameStart);
    resumeGame();
    logPlayingAudios();
    secondsPlay = 0;
    lastKeystroke = new Date().getTime();
    hideAllScreens();
    body.classList.add('start-screen', 'slide-out');
    body.classList.add('play-screen');
    setTimeout(() => body.classList.remove('start-screen', 'slide-out'), 700);
}  


/**
 * Restart the game
 * @param {event} event - restart button
 */
function restartGame(event = null) {
    event ? event.stopPropagation() : null;
    stoppableIntervals.forEach(clearInterval);
    stopAllAudios();
    cleanLoopedAudiosArray();
    gameIsPaused = false;
    // window.location.reload();
    initGame();
}    


/**
 * Hide all screens
 */
function hideAllScreens() {
    body.classList.remove('legal-notice-screen');
    body.classList.remove('start-screen', 'slide-out');
    body.classList.remove('win-screen');
    body.classList.remove('game-over-screen');
    body.classList.remove('play-screen');
    body.classList.remove('game-paused');
    body.classList.remove('help-screen');
}


/**
 * Check if touch device
 * @return {boolean}
 */
function isTouchEnabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) || 
           ( navigator.msMaxTouchPoints > 0 );
}


/**
 * Set body class if/not touch device
 */
function setBodyClassIfTouchDevice() {
    isTouchEnabled() ? body.classList.add('is-touch-device'): body.classList.remove('is-touch-device');
}


/**
 * Handling game won
 * @param {event} event - game over button (temporary)
 */
function handlingGameWin(event = null) {
    event ? event.stopPropagation() : null;
    console.log('handlingGameWin');
    hideAllScreens();
    body.classList.add('win-screen');
    // stopAllAudios();
    // startAudio(audioCache.gameWin);
    // world.character.winJump();
    // stoppableIntervals.forEach(clearInterval);
    // setTimeout(() => {
    //     stoppableIntervals.forEach(clearInterval);
    //     stopAllAudios();
    // }, 1000);
    // setTimeout(() => restartGame(null), 12000);
}    


/**
 * Handling game over
 * @param {event} event - surrender button
 */
function handlingGameOver(event = null) {
    event ? event.stopPropagation() : null;
    console.log('handlingGameOver');
    resumeGame();
    stopAllAudios();
    stoppableIntervals.forEach(clearInterval);
    hideAllScreens();
    body.classList.add('game-over-screen');
    document.getElementById('playTimer').innerHTML = timer;
    startAudio(audioCache.gameOver);
    // setTimeout(() => restartGame(null), 12000);
}    


/**
 * Toggle helpscreen (including pausing/resuming game)
 * @param {event} event - help button
 */
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


/**
 * Toggle legal notice screen
 * @param {event} event - legal notice button
 */
function toggleLegalNotice(event) {
    event.stopPropagation();
    if(body.classList.contains('legal-notice-screen')) {
        body.classList.remove('legal-notice-screen');
    } else {
        body.classList.add('legal-notice-screen');
    }
}   


/**
 * Set fullscreen button if fullscreen available
 */
function setFullscreenToggle() {
    let btnToggleFullscreen = document.getElementById('btnToggleFullscreen')
    !fullscreenAvailable ? btnToggleFullscreen.classList.add('hide') : btnToggleFullscreen.classList.remove('hide');
}


/**
 * Toggle fullscreen
 * @param {event} event - fullscreen button
 */
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


/**
 * Open fullscreen mode
 * @param {element} elem - fullscreen element
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


/**
 * Close fullscreen
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}


/**
 * Pause game
 */
function pauseGame() {
    body.classList.add('game-paused');
    gameIsPaused = true;
    muteAudio();
}   

/**
 * Resume game
 */
function resumeGame() {
    gameIsPaused = false;
    unmuteAudio();
    world.draw();
}   


/**
 * Returns a playtime counter
 */
function runPlayTimeCounter() {
    let timeDiff = 60 * 60 * 1000
    let dateObj = new Date(secondsPlay * 1000 - timeDiff);
    secondsPlay++;
    setTimeObject(dateObj);
    if(time.hours >= 1){
        return timer = time.hours + ':' + time.minutes + ':' + time.seconds + '';
    } else {
        return timer = time.minutes + ':' + time.seconds + '';
    }
}


/**
 * Set time object
 * @param {date} dateObj - date object
 */
function setTimeObject(dateObj) {
    time = {
        hours:dateObj.getHours(),
        minutes:dateObj.getMinutes(),
        seconds:dateObj.getSeconds(),
    }
    Object.entries(time).forEach(i => {
        let key = i[0];
        let val = i[1];
        time[key] = (val < 10 ? '0' + val : val);
    });
}


/**
 * Save intervals globally
 * @param {array} intervals - array of intervals
 */
function saveIntervalsGlobally(intervals) {
    stoppableIntervals.push(...intervals);
}


/**
 * Clear an interval after timeout
 * @param {intervalId} intervalId 
 * @param {number} timeout 
 */
function clearIntervalAfterTimeout(intervalId, timeout = 5000) {
    setTimeout(function() {clearInterval(intervalId)}, timeout);
}    


/**
 * Helper: return passed time since a start time
 * 
 * @param {Date} startTime - will be compared to now
 */
function getPassedTime(startTime, sourceInfo = '') {
    let passedTime = new Date().getTime() - startTime;
    return '\npassedTime ' + passedTime + ' ' + sourceInfo;
}


/**
 * Helper: debounce leading signal (return true during a certain duration since start time)
 *  
 * @param {Date} startTime - start time to compare with now
 * @param {number} duration - duration ms for the leading signal
 * @returns {boolean}
 */
function debounceLeading(startTime, duration = 1000) {
    let currentTime = new Date().getTime();
    return (currentTime - startTime) <= duration;
}


/**
 * Helper: debounce signal delayed (return true after a certain duration since start time)
 * 
 * @param {Date} startTime - start time to compare with now
 * @param {number} delay - ms to delay the signal
 * @returns {boolean}
 */
function debounceDelayed(startTime, delay = 150) {
    let currentTime = new Date().getTime();
    return (currentTime - startTime) >= delay;
}
