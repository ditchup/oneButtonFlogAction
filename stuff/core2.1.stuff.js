"use strict";
console.log("core2.1.stuff.js!");
// スクリプトおよび画像のロード機能
// load scripts and images

// 名前空間 
if (typeof STUFF === "undefined") {
	var STUFF = {};
} else {
	console.log("variable name 'STUFF' is already used");
}

// .stuff.jsファイルのロードを行う
// 依存関係がある場合も、ロード順にかかわらず、関数内でほかのサブライブラリを参照できる。
// ただし、ロード後即時関数を実行するような場合は依存するサブライブラリを事前にロードしておく必要がある。
STUFF.sprout = function (moduleName) {
    var head, elem;
    
	// ロード済みかのチェック
	if (STUFF[moduleName] !== undefined && STUFF[moduleName] !== null) {
		return;
	}

	elem = document.createElement("script");
	elem.src = moduleName + ".stuff.js";
    
	head = document.getElementsByTagName("head")[0];
	head.appendChild(elem);
	
	return elem;
};

// 任意のjsスクリプトのロードを行う
STUFF.loadScript = function (modulePath) {
	var head = document.getElementsByTagName("head")[0];
	var elem = document.createElement("script");
	
	elem.src = modulePath
	
	head.appendChild(elem);
	
	return elem;
};

// 画像ファイルをロードし、img要素に割り当てる。
// アクセス用の文字列をキー、ファイルパスを値として持つオブジェクトを受け取る
// 返り値としてロードしたimg要素を返す
// （アクセス用文字列とimg要素の組み合わせを返す）
STUFF.loadImage = function (imageIndexes) {
	var img, k;
	var images = {};

	for (k in imageIndexes) {
		img = new Image();
		img.src = imageIndexes[k];
		images[k] = img;
	}

	return images;
};

// 各モジュールで名前空間を確保する
// JavaScriptパターン　優れたアプリケーションのための作法（Stoyan Stefanov, O'REILLY）p.92より
STUFF.namespace = function (nsString) {
    var parts = nsString.split("."),
        parentObject = STUFF,
        i;

    // 先頭の冗長なグローバルを取り除く
    if (parts[0] === "STUFF") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        // プロパティが存在しなければ作成する
        if (typeof parentObject[parts[i]] === "undefined") {
            parentObject[parts[i]] = {};
        }
        parentObject = parentObject[parts[i]];
    }

    return parentObject;
};

// JavaScript 6版 p349より
/*
function loadasync(url) {
	var head = document.getElementsByTagName("head")[0];
	var s = document.createElement("script");
	s.src = url;
	head.appendChild(s);
	
}
*/

//TODO ・・・追加ライブラリまでまとめて1つのファイルとして出力する（文字列を作る）functionの文字列化で何とか？

// TODO エラー処理がほとんどない。方針を決めないと。
