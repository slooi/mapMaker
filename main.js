"use strict";
var canvas = document.createElement('canvas');
var canvas2 = document.createElement('canvas');
var app = document.getElementById('app');
var bDiameter = 16;
var bMapWidth = 10;
var bMapHeight = 10;
canvas.width = bDiameter * bMapWidth;
canvas.height = bDiameter * bMapHeight;
var fWidth = canvas.width; //bDiameter*10//
var fHeight = canvas.height; //bDiameter*10//
app.style.width = fWidth + 'px';
app.style.height = fHeight + 'px';
canvas.style.width = fWidth + 'px';
canvas.style.height = fHeight + 'px';
document.getElementById('app').append(canvas);
document.getElementById('app').append(canvas2);
var c = canvas.getContext('2d');
var blockType = 1;
var map;
createMap(bMapWidth, bMapHeight);
var mouse = {
    down: false,
    x: undefined,
    y: undefined
};
canvas.addEventListener('mousedown', function (e) {
    processMouseDown(true, e);
});
canvas.addEventListener('mousemove', function (e) {
    processMouseDown(undefined, e);
});
canvas.addEventListener('mouseup', function (e) {
    processMouseDown(false, e);
});
window.addEventListener('keydown', function (e) {
    console.log(e);
    var key = e.key;
    var keyCode = e.keyCode;
    if (keyCode >= 48 && keyCode <= 57) {
        blockType = Number(key);
    }
});
function processMouseDown(mouseDown, e) {
    if (mouseDown !== undefined) {
        mouse.down = mouseDown;
    }
    var mX = e.offsetX;
    var mY = e.offsetY;
    if (mX < fWidth && mY < fHeight) {
        mouse.x = mX;
        mouse.y = mY;
        console.log(mouse.x, mouse.y);
        if (mouse.down) {
            placeBlock(mouse.x, mouse.y);
        }
    }
}
function createMap(width, height) {
    map = new Array(height).fill(0).map(function () { return new Array(width).fill(-1); });
}
// Re-renders canvas
function render() {
    c.clearRect(0, 0, fWidth, fHeight);
    for (var i = 0; i < bMapHeight; i++) {
        for (var j = 0; j < bMapWidth; j++) {
            var val = map[i][j];
            if (val === 1) {
                c.fillStyle = 'green';
            }
            if (val === 2) {
                c.fillStyle = 'yellow';
            }
            if (val !== -1) {
                c.fillRect(j * bDiameter, i * bDiameter, bDiameter, bDiameter);
            }
        }
    }
}
function loop() {
    render();
    requestAnimationFrame(loop);
}
loop();
function placeBlock(offX, offY) {
    var indexX = Math.floor(offX / bDiameter);
    var indexY = Math.floor(offY / bDiameter);
    console.log(indexX, indexY);
    map[indexY][indexX] = blockType;
}
var type = document.getElementById('type');
type.innerText = String(blockType);
