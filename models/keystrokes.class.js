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
        if(isTouchEnabled()) {
            this.bindBtnTouchEventsToKeyPress();
        }

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


    bindBtnTouchEventsToKeyPress() {
        document.getElementById('btnMoveLeft').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_LEFT = true;
        });
        document.getElementById('btnMoveLeft').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_LEFT = false;
        });
        document.getElementById('btnMoveRight').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_RIGHT = true;
        });
        document.getElementById('btnMoveRight').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_RIGHT = false;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_SPACE = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_SPACE = false;
        });
        document.getElementById('btnThrowBottle').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_B = true;
        });
        document.getElementById('btnThrowBottle').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_B = false;
        });
        // document.getElementById('btnThrowCoin').addEventListener('touchstart', (event) => {
        //     event.preventDefault();
        //     keystrokes.KEY_C = true;
        // });
        // document.getElementById('btnThrowCoin').addEventListener('touchend', (event) => {
        //     event.preventDefault();
        //     keystrokes.KEY_C = false;
        // });
    }

};
