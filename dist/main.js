var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.append(canvas);
var c = canvas.getContext('2d');
var map;
var mouse = {
    down: false,
    x: undefined,
    y: undefined
};
canvas.addEventListener('mousedown', function (e) {
    processMouseDown(true, e);
});
canvas.addEventListener('mouseup', function (e) {
    processMouseDown(false, e);
});
function processMouseDown(mouseDown, e) {
    mouse.down = mouseDown;
    console.log('e.clientX', e.clientX);
    console.log('e.offsetX', e.offsetX);
    console.log('e.pageX', e.pageX);
    console.log(mouseDown, e);
}
function createMap(width, height) {
    map = new Array(height).fill(0).map(function () { return new Array(width).fill(0); });
}
createMap(10, 5);
