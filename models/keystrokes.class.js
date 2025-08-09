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
        this.bindTouchButtonEventsToKeyPress();
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
    }


    /**
     * Bind touch buttons to keys 
     */
    bindTouchButtonEventsToKeyPress() {
        this.bindTouchButtonEventToKeyPress('btnMoveLeft', 'KEY_LEFT');
        this.bindTouchButtonEventToKeyPress('btnMoveRight', 'KEY_RIGHT');
        this.bindTouchButtonEventToKeyPress('btnJump', 'KEY_SPACE');
        this.bindTouchButtonEventToKeyPress('btnThrowBottle', 'KEY_B');
    }


    /**
     * Bind touch button event to key press
     * @param {string} btnId - button id
     * @param {string} strokeProp - property name of the keystroke
     */
    bindTouchButtonEventToKeyPress(btnId, strokeProp) {
        document.getElementById(btnId).addEventListener('touchstart', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes[strokeProp] = true;
            lastKeystroke = new Date().getTime();
        });
        document.getElementById(btnId).addEventListener('touchend', (event) => {
            event.cancelable ? event.preventDefault() : null;
            keystrokes[strokeProp] = false;
        });
    }        

};
