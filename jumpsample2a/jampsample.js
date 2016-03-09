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
        "sky": "../img/sky.png",
        "land": "../img/land.png",
    });
    game.onload = function(){
        var images = game.assets;

        var flog = new Sprite(64, 64);
        var hight = [0, 20, 30, 36, 40, 42, 43, 44, 43, 42, 40, 36, 30, 20, 0];
        var hlen = hight.length;
        var basehight = 200;

        flog.y = basehight;
        flog.state = 0; /*0: stand,  1: jumping, 2: hug*/
        flog.time = 0;

        flog.stand = function() {
            flog.time = 0;
            flog.state = 0;
            flog.image = images["flog_stand"];
            flog.clearEventListener("enterframe");
        };
        flog.stand();

        flog.jump = function(time) {
            //if (typeof time === "number") flog.time = time;

            flog.state = 1;
            flog.image = images["flog_jump"];

            flog.addEventListener("enterframe", function (e) {
                flog.y = basehight - hight[flog.time];
                flog.time++;
                if (flog.time === hlen) {
                    flog.stand();
                }
            });
        }

        flog.fall = function (time) {
            flog.state = 1;
            flog.image = images["flog_jump"];
            flog.time = time;
            var localbasehight = flog.y + hight[flog.time];
            
            flog.addEventListener("enterframe", function(e) {
                if (flog.time < hlen) {
                    flog.y = localbasehight - hight[flog.time];
                    flog.time++;
                } else {
                    // 自由落下最高速
                    flog.y += 34;
                }

                if (flog.y > basehight) {
                    flog.y = basehight;
                    flog.stand();
                }

            });
        }

        flog.hug = function() {
            flog.state = 2;
            flog.image = images["flog_hug"];

            flog.clearEventListener("enterframe");
            flog.addEventListener("enterframe", function (e) {
                flog.x += 2;
                if (flog.x >= game.width) {
                    flog.x = -flog.width;
                }
            });
        };
        game.currentScene.addEventListener("touchstart", function (e) {
            switch (flog.state) {
                case 0: // stand
                    flog.jump();
                    break;
                case 1: // jump
                    flog.hug();
                    //console.log(flog.time);
                    break;
                case 2: // hug
                    //flog.jump(); // 以前のjump時のtimeを再利用
                    flog.fall(2);
                    // 操作で落下か小ジャンプか選べないだろうか。
                    break;
            }

        });

        var bgSprite = new Sprite(320, 320);
        bgSprite.image = new Surface(320, 320);
        bgSprite.image.draw(images.sky);
        bgSprite.image.draw(images.land, 0, 254);
        game.currentScene.addChild(bgSprite);
        game.currentScene.addChild(flog);
    };
    game.start();
};
