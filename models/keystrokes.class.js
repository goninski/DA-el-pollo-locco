class Keystrokes {

    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_DOWN = false;
    KEY_SPACE = false;
    KEY_B = false;
    KEY_C = false;

    
    constructor() {

        this.bindKeyPressEvents();

    }


    bindKeyPressEvents() {
        document.addEventListener("keydown", this.updateKeystrokesObj);
        document.addEventListener("keyup", this.resetKeystrokesObj);
    }


    updateKeystrokesObj(event) {
        switch(event.key) {
            case 'ArrowLeft':
                keystrokes.KEY_LEFT = true
                break
            case 'ArrowRight':
                keystrokes.KEY_RIGHT = true;
                break
            case 'ArrowUp':
                keystrokes.KEY_UP = true;
                break
            case 'ArrowDown':
                keystrokes.KEY_DOWN = true;
                break
            case 'b':
                keystrokes.KEY_B = true;
                break;
            case 'c':
                keystrokes.KEY_C = true;
                break;
            case ' ':
                keystrokes.KEY_SPACE = true;
                event.preventDefault();
        }
        // console.log(keystrokes);
    }


    resetKeystrokesObj(event) {
        switch(event.key) {
            case 'ArrowLeft':
                keystrokes.KEY_LEFT = false
                break
            case 'ArrowRight':
                keystrokes.KEY_RIGHT = false;
                break
            case 'ArrowUp':
                keystrokes.KEY_UP = false;
                break
            case 'ArrowDown':
                keystrokes.KEY_DOWN = false;
                break
            case 'b':
                keystrokes.KEY_B = false;
            break
            case 'c':
                keystrokes.KEY_C = false;
            break
            case ' ':
                keystrokes.KEY_SPACE = false;
        }
        // console.log(keystrokes);
    }

};
