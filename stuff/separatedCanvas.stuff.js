"use strict";
console.log("separatedCanvas.stuff.js!");

STUFF.namespace("separatedCanvas");

// body要素に属さない独立したCanvas要素を作る。
// バックグラウンドでの描画準備に使う。
(function () {
    var ns = STUFF.separatedCanvas;

    ns.setup = function (width, height, frame) {
        var elem, ctx;

        elem = document.createElement("canvas");
        elem.height = height;
        elem.width = width;

        ctx = elem.getContext("2d");

        return ctx;
    };
}());

