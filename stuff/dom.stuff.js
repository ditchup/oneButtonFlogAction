"use strict";
console.log("dom.stuff.js!");
// モジュールパターン

STUFF.namespace("dom");

(function () {
    var ns = STUFF.dom;

    /// 要素位置の指定
    ns.move = function(elem, x, y) {
        elem.style.left = x;
        elem.style.top = y;
    };

    // 要素の上下関係
    ns.over = function(upperElem, underElem) {
        var underZIndex = Number(underElem.style.zIndex);

        upperElem.style.zIndex = underZIndex + 1;
    };

    ns.under = function(underElem, upperElem) {
        var upperZIndex = Number(upperElem.style.zIndex);

        underElem.style.zIndex = upperZIndex - 1;
    };

    // 要素位置を数値として取得
    ns.getX = function (elem) {
        return parseFloat(elem.style.left);
    };
    ns.getY = function (elem) {
        return parseFloat(elem.style.top);
    };
}());
