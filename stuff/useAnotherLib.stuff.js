"use strict";

console.log("useAnotherLib.stuff.js!");

(function useAnotherLib() {
    var ns = STUFF.namespace("useAnotherLib");

    // この即時関数中で未ロードのサブライブラリ関数を変数に入れ共有することはできない
    // ↑は結構不便。
    // 依存関係を記述できるようにしたいね。
    ns.moveBy = function (elem, dx, dy) {
        var move = STUFF.dom.move;
        var getX = STUFF.dom.getX, getY = STUFF.dom.getY;
        var oldx = getX(elem), oldy = getY(elem);

        move(elem, oldx + dx, oldy + dy);
    };
}());
