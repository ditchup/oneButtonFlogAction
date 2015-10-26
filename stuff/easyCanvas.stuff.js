"use strict";
console.log("easyCanvas.stuff.js!");

STUFF.namespace("easyCanvas");

(function () {
    var ns = STUFF.easyCanvas;

    ns.setup = function (width, height, frame) {
        var elem, ctx;

        elem = document.createElement("canvas");
        elem.height = height;
        elem.width = width;
        document.body.appendChild(elem);

        // 画面左端に移動
        // tmlib tm.graphics.CanvasのresizeWindowを参考に
        elem.style.position = "absolute";
        elem.style.left = 0;
        elem.style.top = 0;

        ctx = elem.getContext("2d");

        // Canvas要素の有無や大きさを確認するため、枠線を表示する
        if (frame === true) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, width, height);
            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, width, height);
        }

        return ctx;
    };
}());

