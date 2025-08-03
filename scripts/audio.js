let audioPathBase = '/assets/audio/';
let audioMuted = false;
// let audioMutedByUser = false;
let currentAudio;
let loopedAudios = [];
let audioCache = {
    gameStart : new Audio(audioPathBase + 'game-start.mp3'),
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
    setLoopedAudioArray(audioObj);
    setAudioMuting(audioObj);
    audioObj.play().catch(error => {
        audioObj.muted = true;
        audioMuted = true;
        localStorage.setItem("audioMutedByUser", "auto");
        body.classList.add('audio-muted', 'audio-auto-muted');
        // console.log('Audio auto muted ! >>', error);
    });
}


/**
 * Set array for looped audio
 * @param {object} audioObj - audio object
 */
function setLoopedAudioArray(audioObj) {
    if(audioObj.loop) {
        if(!(loopedAudios.includes(audioObj))) {
            loopedAudios.push(audioObj);        
        };
    }
    // console.log('loopedAudios:', loopedAudios);
}


/**
 * Set audio muting depending on state
 * @param {object} audioObj - audio object
 */
function setAudioMuting(audioObj) {
    // console.log('audioMuted ?', audioMuted);
    if(audioMuted) {
        audioObj.muted = true;
        body.classList.add('audio-muted');
    } else {
        audioObj.muted = false;
        localStorage.setItem("audioMutedByUser", "false");
        body.classList.remove('audio-muted', 'audio-auto-muted');
    }
}


/**
 * Start audio debounced leading
 * @param {object} audioObj - audio object
 * @param {date} startTime - start time for compare to now
 * @param {number} duration - valid leading signal duration
 * @param {number} volume - 0 to 1
 * @param {boolean} loop 
 */
function startAudioDebouncedLeading(audioObj, startTime, duration = 150, volume = 1, loop = false) {
    if(debounceLeading(startTime, duration)) {
        startAudio(audioObj, volume, loop);
    }
}


/**
 * Start audio resumed (restart from beginning)
 * @param {object} audioObj - audio object
 * @param {number} volume - 0 to 1
 */
function startAudioResumed(audioObj, volume = 1) {
    audioObj.currentTime = 0;
    startAudio(audioObj, volume, false)
}


/**
 * Stop audio object and remove it from loopedAudios if containing
 * @param {object} audioObj - audio object
 */
function stopAudio(audioObj) {
    audioObj.pause();
    currentAudio ? currentAudio.pause() : null;
    removeAudioFromLoopedAudios(audioObj);
}


/**
 * Stop all audios
 */
function stopAllAudios() {
    currentAudio ? currentAudio.pause() : null;
    loopedAudios.forEach(item => item.pause());
    cleanLoopedAudiosArray();
}


/**
 * Remove audio from loopedAudios Array if containing
 * @param {object} audioObj - audio object
 */
function removeAudioFromLoopedAudios(audioObj) {
    let index = loopedAudios.findIndex(item => item === audioObj);
    index >= 0 ? loopedAudios.splice(index, 1) : null;
}


/**
 * Clean loopedAudios Array (remove stopped objects)
 */
function cleanLoopedAudiosArray() {
    loopedAudios = loopedAudios.filter(audio => !audio.paused);
}


/**
 * Toggle audio mute
 * @param {event} event - mute toogle button
 */
function toggleAudioMute(event = null) {
    event ? event.stopPropagation() : null;
    if(audioMuted) {
        // audioMutedByUser = false;
        localStorage.setItem("audioMutedByUser", "false");
        unmuteAudio(event);
    } else {
        // audioMutedByUser = true;
        localStorage.setItem("audioMutedByUser", "true");
        muteAudio();
    }
}


/**
 * Mute audio
 */
function muteAudio() {
    loopedAudios.forEach(item => item.muted = true);
    currentAudio? currentAudio.muted = true : null;
    audioMuted = true;
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
        // if(audioMutedByUser) return;
        if(localStorage.getItem("audioMutedByUser") === 'true') return;
        loopedAudios.forEach(item => item.muted = false);
        currentAudio? currentAudio.muted = false : null;
    }
    audioMuted = false;
    body.classList.remove('audio-muted', 'audio-auto-muted');
}