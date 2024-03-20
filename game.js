function setPixel(screen, x, y, color) {
    screen.buffer[x + y * screen.width] = color;
}

function printScreen(screen) {

    let s = "";
    for(let i = 0; i < screen.buffer.length; i ++) {
        if(i % screen.width == 0) {
            s += "\n";
        }
        let pix = '' + screen.buffer[i];
        if(pix.length == 1) {
            s += ' ' + pix;
        } else {
            s += pix;
        }
    }

    console.log(s);

}

function initScreen(width, height) {
    let screen = {
        buffer: [],
        width: width,
        height: height
    }
    for(let i = 0; i < width * height; i ++) {
        screen.buffer[i] = '[_]';
    }
    return screen;
}

let screen = initScreen(15, 15);

printScreen(screen);