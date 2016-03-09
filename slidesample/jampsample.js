enchant();

window.onload = function(){
    var game = new Core(320, 320);
    //game.fps = 15;
    game.preload({
        "flog_stand": "../img/stand.png",
        "flog_hang": "../img/hang.png",
        "flog_jump": "../img/jump.png",
        "flog_hug": "../img/hug.png",
        "cloud": "../img/cloud.png",
        //"sky": "../img/sky.png",
        "sky": "../img/sky2.png",
        "land": "../img/land.png",
        "coin": "../img/coin4.png",
        "coinIcon": "../img/coin3.png",
    });
    var GameObject = Class.create(Sprite);

    function fillReaves(ctx, x, y, w, h) {
        var pxSize = 2;
        var baseColor = "green";
        var colors = ["rgb(0, 100, 0)",
                "rgb(50, 200, 50)",
                "rgb(150, 250, 150)"];

        ctx.fillStyle = baseColor;
        ctx.fillRect(x, y, w, h);

        var i, j;
        for (i = x; i < x+w; i += pxSize) {
            for (j = y; j < y+h; j += pxSize) {
                //ctx.fillStyle = colors[RandList[(i*j) % 10000]];
                ctx.fillStyle = colors[Math.floor(Math.random() * 4)];
                ctx.fillRect(i ,j, pxSize, pxSize);
            }
        }
    }
    
    game.onload = function(){
        var images = game.assets;
        var P = {};

        var bgSprite = new Sprite(320, 320);
        bgSprite.image = new Surface(320, 320);
        bgSprite.image.draw(images.sky);
        //bgSprite.image.draw(images.land, 0, 254);

        var terrainSprite = new Sprite(320, 320);
        terrainSprite.image = new Surface(320, 320);

        var ctx = terrainSprite.image.context;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(220, 320);
        ctx.lineTo(0, 320);
        ctx.closePath();

        ctx.clip();

        fillReaves(ctx, 0, 0, 320, 320);
        game.currentScene.addEventListener("enterframe", function() {
            fillReaves(ctx, 0, 310, 320, 10);
            ctx.drawImage(ctx.canvas, 10, 10, 310, 310, 0, 0, 310, 310);
        });

        // 前後関係
        game.currentScene.addChild(bgSprite);
        game.currentScene.addChild(terrainSprite);

    };
    game.start();
    //game.debug()
};
