class Keystrokes {

    KEY_LEFT = false;
    KEY_RIGHT = false;
    KEY_UP = false;
    KEY_DOWN = false;
    KEY_SPACE = false;
    KEY_B = false;
    KEY_C = false;
    lastAction = new Date().getTime();
    
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
                keystrokes.lastAction = new Date().getTime();
                break
            case 'ArrowRight':
                keystrokes.KEY_RIGHT = true;
                keystrokes.lastAction = new Date().getTime();
                break
            case 'ArrowUp':
                keystrokes.KEY_UP = true;
                keystrokes.lastAction = new Date().getTime();
                break
            case 'ArrowDown':
                keystrokes.KEY_DOWN = true;
                keystrokes.lastAction = new Date().getTime();
                break
            case 'b':
                keystrokes.KEY_B = true;
                keystrokes.lastAction = new Date().getTime();
                break;
            case 'c':
                keystrokes.KEY_C = true;
                keystrokes.lastAction = new Date().getTime();
                break;
            case ' ':
                event.preventDefault();
                keystrokes.KEY_SPACE = true;
                keystrokes.lastAction = new Date().getTime();
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
            keystrokes.lastAction = new Date().getTime();
        });
        document.getElementById('btnMoveLeft').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_LEFT = false;
        });
        document.getElementById('btnMoveRight').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_RIGHT = true;
            keystrokes.lastAction = new Date().getTime();
        });
        document.getElementById('btnMoveRight').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_RIGHT = false;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_SPACE = true;
            keystrokes.lastAction = new Date().getTime();
        });
        document.getElementById('btnJump').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_SPACE = false;
        });
        document.getElementById('btnThrowBottle').addEventListener('touchstart', (event) => {
            event.preventDefault();
            keystrokes.KEY_B = true;
            keystrokes.lastAction = new Date().getTime();
        });
        document.getElementById('btnThrowBottle').addEventListener('touchend', (event) => {
            event.preventDefault();
            keystrokes.KEY_B = false;
        });
        // document.getElementById('btnThrowCoin').addEventListener('touchstart', (event) => {
        //     event.preventDefault();
        //     keystrokes.KEY_C = true;
        //     keystrokes.lastAction = new Date().getTime();
        // });
        // document.getElementById('btnThrowCoin').addEventListener('touchend', (event) => {
        //     event.preventDefault();
        //     keystrokes.KEY_C = false;
        // });
    }

};
