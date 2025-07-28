let audioPathBase = '/assets/audio/';
let audioIsMuted = false;
let audioMutedByUser = false;
let currentAudio;
let loopedAudios = [];
let audioCache = {
    start : new Audio(audioPathBase + 'start.mp3'),
    gameOver : new Audio(audioPathBase + 'game-over.mp3'),
    gameWin : new Audio(audioPathBase + 'game-win.wav'),
};


/**
 * Start audio
 * @param {object} audioObj - audio object
 * @param {number} volume - 0 to 1
 * @param {boolean} loop 
 */
function startAudio(audioObj, volume = 1, loop = false) {
    currentAudio = audioObj;
    audioObj.volume = volume;
    audioObj.loop = loop;
    if(loop) {
        if(!loopedAudios.includes(audioObj)) {
            loopedAudios.push(audioObj);        
        };
    }
    checkNSetAudioMuting(audioObj);
    audioObj.play().catch(error => {
        audioObj.muted = true;
        audioIsMuted = true;
        body.classList.add('audio-muted', 'audio-auto-muted');
        console.log('audioplay error:', error);
    });
    // !audioObj.loop ? loopedAudios.pop() : null;
}


/**
 * Start audio debounced - still in use ??
 * @param {object} audioObj - audio object
 * @param {date} startTime
 * @param {number} delay - ms
 * @param {number} volume - 0 to 1
 * @param {boolean} loop 
 */
function startAudioDebounced(audioObj, startTime, delay = 150, volume = 1, loop = false) {
    if(debounced(startTime, delay)) {
        startAudio(audioObj, volume, loop);
    }
}


/**
 * Start audio resumed - still in use ??
 * @param {object} audioObj - audio object
 * @param {number} volume - 0 to 1
 */
function startAudioResumed(audioObj, volume = 1) {
    audioObj.currentTime = 0;
    startAudio(audioObj, volume, false)
}


/**
 * Check and set audio muting state
 * @param {object} audioObj - audio object
 */
function checkNSetAudioMuting(audioObj) {
    // console.log('audioIsMuted ?', audioIsMuted);
    if(audioIsMuted) {
        audioObj.muted = true;
        body.classList.add('audio-muted');
    } else {
        audioObj.muted = false;
        body.classList.remove('audio-muted', 'audio-auto-muted');
    }
}


/**
 * Stop audios (loop)
 */
function stopAudios() {
    currentAudio.pause();
    loopedAudios.forEach(item => item.pause());
    loopedAudios = [];
}


/**
 * Stop single audio (iteration of the loop above)
 * @param {object} audioObj - audio object
 */
function stopAudio(audioObj) {
    audioObj.pause();
    let index = loopedAudios.findIndex(item => item === audioObj);
    index >= 0 ? loopedAudios.splice(index, 1) : null;
}


/**
 * Toggle audio mute
 * @param {event} event - mute toogle button
 */
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


/**
 * Mute audio
 */
function muteAudio() {
    loopedAudios.forEach(item => item.muted = true);
    currentAudio? currentAudio.muted = true : null;
    audioIsMuted = true;
    body.classList.add('audio-muted');
}


/**
 * Unmute audio
 * @param {event} event - user interaction
 */
function unmuteAudio(event = null) {
    if(event) {
        event.stopPropagation();
        loopedAudios.forEach(item => {
            item.muted = false;
            body.classList.contains('audio-auto-muted') ? item.play() : null;
        });
    } else {
        if(audioMutedByUser) return;
        loopedAudios.forEach(item => item.muted = false);
        currentAudio? currentAudio.muted = false : null;
    }
    audioIsMuted = false;
    body.classList.remove('audio-muted', 'audio-auto-muted');
}

