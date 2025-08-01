/** Class representing keystrokes */
class Keystrokes {

    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_SPACE = false;
    KEY_B = false;

    
    /**
     * Create keystrokes
     */
    constructor() {
        this.disableContextMenuForTouchDevice;
        this.bindKeyPressEvents();
        this.bindBtnTouchEventsToKeyPress();
    }


    /**
     * Disable context menu on touch devices
     */
    disableContextMenuForTouchDevice() {
        if(isTouchEnabled()) {
            document.addEventListener("contextmenu", event => event.preventDefault());
        }
    }


    /**
     * Bind key press events
     */
    bindKeyPressEvents() {
        document.addEventListener("keydown", this.updateKeystrokesObj);
        document.addEventListener("keyup", this.resetKeystrokesObj);
    }


    /**
     * Update the keystrokes object for keydown
     * @param {event} event - keypress
     */
    updateKeystrokesObj(event) {
        switch(event.keyCode) {
            case 37:
                keystrokes.KEY_LEFT = true
                lastKeystroke = new Date().getTime();
                lastKeystroke_LEFT = lastKeystroke;
                break
            case 39:
                keystrokes.KEY_RIGHT = true;
                lastKeystroke = new Date().getTime();
                lastKeystroke_RIGHT = lastKeystroke;
                break
            case 66:
                keystrokes.KEY_B = true;
                lastKeystroke = new Date().getTime();
                lastKeystroke_THROW = lastKeystroke;
                break;
            case 32:
                event.preventDefault();
                keystrokes.KEY_SPACE = true;
                lastKeystroke = new Date().getTime();
                lastKeystroke_JUMP = lastKeystroke;
        }
        // console.log(keystrokes);
    }


    /**
     * Reset the keystrokes object on keyup
     * @param {event} event - release of keypress
     */
    resetKeystrokesObj(event) {
        switch(event.keyCode) {
            case 37:
                keystrokes.KEY_LEFT = false
                break
            case 39:
                keystrokes.KEY_RIGHT = false;
                break
            case 66:
                keystrokes.KEY_B = false;
            break
            case 32:
                keystrokes.KEY_SPACE = false;
        }
        // console.log(keystrokes);
    }


    /**
     * Bind touch buttons to keys 
     */
    bindBtnTouchEventsToKeyPress() {
        document.getElementById('btnMoveLeft').addEventListener('touchstart', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_LEFT = true;
            lastKeystroke = new Date().getTime();
        });
        document.getElementById('btnMoveLeft').addEventListener('touchend', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_LEFT = false;
        });
        document.getElementById('btnMoveRight').addEventListener('touchstart', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_RIGHT = true;
            lastKeystroke = new Date().getTime();
        });
        document.getElementById('btnMoveRight').addEventListener('touchend', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_RIGHT = false;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_SPACE = true;
            lastKeystroke = new Date().getTime();
        });
        document.getElementById('btnJump').addEventListener('touchend', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_SPACE = false;
        });
        document.getElementById('btnThrowBottle').addEventListener('touchstart', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_B = true;
            lastKeystroke = new Date().getTime();
        });
        document.getElementById('btnThrowBottle').addEventListener('touchend', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes.KEY_B = false;
        });
    }


};
