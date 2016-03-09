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
    
    game.onload = function(){
        var images = game.assets;
        var P = {};
        P.allCoin = 9;

        var Terrain = Class.create(Sprite , {
            initialize: function () {
                Sprite.call(this, 320, 120);
                this.moveTo(0, 254);
                this.image = new Surface(320, 120);
                this.flatten();

                this.pitList = [];
            },

            flatten: function () {
                this.image.draw(images.land, 0, 0);
                this.pitList = [];
            },

            makePit: function (x1, x2) {
                this.image.context.clearRect(x1, 0, x2, 320-254);
                this.pitList.push([x1, x2]);
            },

            // チェック時に存在している穴に落ちるかどうかチェック
            // 落ちるときはtrue、落ちないときはfalseを返す
            checkPit: function (x, width) {
                var i, len = this.pitList.length;
                var pit;
                for (i = 0; i < len; i++) {
                    pit = this.pitList[i];
                    if (pit[0] < x && x + width < pit[0] + pit[1]) {
                        return true;
                    }
                }
                return false;
            }
            
        });

        var Coin = Class.create(Sprite, {
            initialize: function (scene) {
                Sprite.call(this, 48, 48);
                this.image = images.coin;
                this.scene = scene;
            },
            checkMe: function (checker) {
                checker.checklist.push(this);
                this.checker = checker;
            },
            uncheckMe: function () {
                var checker = this.checker;
                var id = checker.checklist.indexOf(this);
                checker.checklist.splice(id, 1);
            },
            deleteMe: function () {
                this.scene.removeChild(this);
            },
            onCheck: function (checker) {
                console.log("checked");
                this.uncheckMe();
                this.deleteMe();
            }
            
        });


        var CoinMeter = Class.create(Group, {
            initialize: function (numAll) {
                Group.call(this);

                var coinIcon = new Sprite(32, 32);
                coinIcon.image = images.coinIcon;
                coinIcon.moveTo(278, 11);
                
                this.numDisplay = new Label("0/0");
                this.numDisplay.moveTo(260, 20);
                this.numAll = numAll;

                this.addChild(coinIcon);
                this.addChild(this.numDisplay);

                this.updateDisplay(0);
                console.log("a");
            },
            updateDisplay: function (numHave) {
                this.numDisplay.text = numHave + "/" + this.numAll;
            }
        });

        var bgSprite = new Sprite(320, 320);
        bgSprite.image = new Surface(320, 320);
        bgSprite.image.draw(images.sky);
        //bgSprite.image.draw(images.land, 0, 254);

        var terrain = new Terrain();
        terrain.flatten();
        terrain.makePit(50, 90);
        terrain.makePit(180, 90);

        var coinMeter = new CoinMeter(P.allCoin);

        var coin = new Coin(game.currentScene);
        coin.xlist = [0, 140, 250, 20, 150, 200, 270, 0, 250];
        coin.moveTo(200, 200);
        coin.onCheck = function (checker) {
            this.moveTo(coin.xlist[0], 200);
            if (typeof checker.coin === "number") {
                checker.coin += 1;
                coinMeter.updateDisplay(checker.coin);
                console.log(checker.coin);
            }

            coin.xlist.shift();
            if (coin.xlist.length === 0) {
                console.log("end");
                coin.uncheckMe();
                coin.deleteMe();
            }
        };


        var flog = new GameObject(64, 64);
        flog.hightSample = [0, 20, 30, 36, 40, 42, 43, 44, 43, 42, 40, 36, 30, 20, 0];
        flog.hightSampleLength = flog.hightSample.length;
        flog.hightFrame = 0;
        flog.basehight = 200;
        flog.terrain = terrain;

        flog.y = flog.basehight;
        flog.state = 0; /*0: stand,  1: jumping, 2: hug, 4: fallpit*/

        flog.checklist = [];
        coin.checkMe(flog);
        //coin.uncheckMe(flog);
        flog.check = function () {
            var checklist = this.checklist.slice(0);
            var i, len = checklist.length;
            for (i = 0; i < len; i++) {
                if(this.intersect(checklist[i])) {
                    checklist[i].onCheck(this);
                }
            }
        }
        game.currentScene.addEventListener("enterframe", function () {
            flog.check();
        });
        // コイン枚数を数える
        flog.coin = 0;

        flog.stand = function() {
            flog.hightFrame = 0;
            //flog.basehight = flog.y;
            flog.state = 0;
            flog.image = images["flog_stand"];
            flog.clearEventListener("enterframe");
        };
        flog.stand();

        flog.jump = function(time) {
            //if (typeof time === "number") flog.hightFrame = time;

            flog.state = 1;
            flog.image = images["flog_jump"];

            flog.addEventListener("enterframe", function (e) {
                flog.y = flog.basehight - flog.hightSample[flog.hightFrame];
                flog.hightFrame++;
                if (flog.hightFrame === flog.hightSampleLength) {
                    flog.stand();
                }
            });
        }

        // TODO terrainの参照ってどこで取ればいいの？
        // 複数のオブジェクトが関係する処理をメソッドにするのは不適？
        flog.fall = function (time) {
            var terrain = flog.terrain;
            flog.state = 1;
            flog.image = images["flog_jump"];
            flog.hightFrame = time;
            var localbasehight = flog.y + flog.hightSample[time];
            
            flog.addEventListener("enterframe", function(e) {
                if (flog.hightFrame < flog.hightSampleLength) {
                    flog.y = localbasehight - flog.hightSample[flog.hightFrame];
                    flog.hightFrame++;
                } else {
                    // 自由落下最高速
                    flog.y += 34;
                }

                // 地面との接触判定
                if (flog.y > flog.basehight) {
                    if (terrain.checkPit(flog.x + 20, flog.width-40)) {
                        // 落ちるとき
                        //flog.basehight = 320 - 54;
                        flog.fallPit();
                    } else {
                        flog.y = flog.basehight;
                        flog.stand();
                    }
                }

            });
        }

        // 妥協？整理はついた。
        flog.fallPit = function () {
            flog.clearEventListener("enterframe");
            flog.state = 4; // fallPit, 何もできない
            flog.addEventListener("enterframe", function (e) {
                    // 自由落下最高速
                    flog.y += 34;
                    if (flog.y > 320) {
                        // 画面下に完全に落ちた時
                        flog.clearEventListener("enterframe");
                        flog.moveTo(0, -64);
                        flog.fall(2);
                    }
            });
        };

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
                    break;
                case 2: // hug
                    //flog.jump(); // 以前のjump時のtimeを再利用
                    flog.fall(2);
                    // 操作で落下か小ジャンプか選べないだろうか。
                    break;
                    // 4のfallpit状態の時は何も反応しない。
                    // 穴の中で飛べるのは面白いけど・・・まだうまく書けない。
            }

        });

        // 前後関係
        game.currentScene.addChild(bgSprite);
        game.currentScene.addChild(terrain);
        game.currentScene.addChild(flog);
        game.currentScene.addChild(coin);
        game.currentScene.addChild(coinMeter);

    };
    game.start();
    //game.debug()
};
