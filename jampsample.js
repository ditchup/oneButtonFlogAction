enchant();

window.onload = function(){
    var game = new Core(320, 320);
    //game.fps = 15;
    game.preload({
        "flog_stand": "stand.png",
        "flog_hang": "hang.png",
        "flog_jump": "jump.png",
        "flog_hug": "hug.png",
        "cloud": "cloud.png"
    });
    game.onload = function(){
        var flog = new Sprite(64, 64);
        var images = game.assets;

        var hight = [0, 20, 30, 36, 40, 42, 43, 44, 43, 42, 40, 36, 30, 20, 0];
        var basehight = 200;

        flog.y = basehight;
        flog.jumping = false;
        flog.image = images["flog_stand"];

        game.currentScene.addEventListener("touchstart", function (e) {
            if (flog.jumping) {
                return;
            }
            flog.jumping = true;
            flog.image = images["flog_jump"];

            var time = 0;
            flog.addEventListener("enterframe", function (e) {
                flog.y = basehight - hight[time];
                time++;
                if (time === hight.length) {
                    flog.jumping = false;
                    flog.image = images["flog_stand"];
                    flog.clearEventListener("enterframe");
                }
            });
        });
        game.currentScene.addChild(flog);
    };
    game.start();
};
