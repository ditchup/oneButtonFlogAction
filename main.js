"use strict";

// 即時関数
(function () {
    var libDir = "stuff/";
    STUFF.sprout(libDir + "easyCanvas");
    STUFF.sprout(libDir + "dom");
    STUFF.sprout(libDir + "dummy");
    STUFF.sprout(libDir + "separatedCanvas");

    window.onload = function () {
        // 依存関係
        var getCtx = STUFF.easyCanvas.setup;
        var domMove = STUFF.dom.move;
        var windowToLocal = STUFF.dummy.windowToLocal;
        var getScratchCtx = STUFF.separatedCanvas.setup;

        // 本処理
        var mainCtx = getCtx(320, 320, true);
        var mainCanvas = mainCtx.canvas;
        var scratchCtx = getScratchCtx(320, 320);
    }; // window.onload

}());

