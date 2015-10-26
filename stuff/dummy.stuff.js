console.log("dummy.stuff.js!");
// モジュールパターン
STUFF.namespace("dummy");   // STUFF.dummyを確保する

(function () {
    var ns = STUFF.dummy;
    
    ns.shout = function () {
        console.log("this is STUFF.dummy!");
    };

    // Davvid Geary著「Core HTML5 Canvas」（オライリー・ジャパン発行）p24より
    // 名前など改変。
    // canvasの描画サーフェスと要素サイズとの差の補正は排除
    //
    ns.windowToLocal = function (touchedElem, x, y) {
        var bbox = touchedElem.getBoundingClientRect();
        return {
                x: x - bbox.left,
                y: y - bbox.top
            };
    };
    // もともとのバージョン
    /*
    ns.windowToCanvas(canvas, x, y) {
        var bbox = touchedElem.getBoundingClientRect();
        return {
                x: (x - bbox.left) * (canvas.width / bbox.width),
                y: (y - bbox.top) * (canvas.height / bbox.height)
            };
    };
     
     */

}());
