"use strict";
// #######################
//  FILE READER STUFF
// #######################
var fileReader = new FileReader();
function findFileType(dataURL) {
    var jpegPos = dataURL.search(/jpeg/);
    var pngPos = dataURL.search(/png/);
    var pos = Math.max(jpegPos, pngPos);
    console.log(jpegPos, pngPos);
    if (pos !== -1 && pos < 16) {
        return jpegPos ? '.jpeg' : '.png';
    }
    return -1;
}
fileReader.onload = function (e) {
    var _a;
    console.log(e.currentTarget.result);
    if (e.currentTarget !== undefined) {
        // If input file is valid type
        var result = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.result;
        var fileType = findFileType(result);
        if (fileType !== -1) {
            // If input file is valid type check 2
            var img_1 = new Image();
            img_1.onload = function () {
                console.log('draw img on canvas');
                c === null || c === void 0 ? void 0 : c.drawImage(img_1, 0, 0);
            };
            console.log('setting image src');
            img_1.src = result;
        }
    }
};
// EVENT LISTENERS
window.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});
window.addEventListener('drop', function (e) {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    var fileObj = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files[0];
    if (fileObj) {
        fileReader.readAsDataURL(fileObj);
    }
    console.log(fileObj);
});
