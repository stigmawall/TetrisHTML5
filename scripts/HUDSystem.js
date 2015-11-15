var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var HUDSystem = (function (_super) {
        __extends(HUDSystem, _super);
        function HUDSystem(game, m, parent, name, addToStage, enableBody, physicsBodyType) {
            _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
           this.main = m;
            this.henrique = this.game.add.image(-512, 300, "henrique", 1, this);
            
            //this.modal = this.game.add.image(this.game.world.centerX, 70, "modal_hud", 0, this);
            //this.modal.anchor.x = this.modal.anchor.y = 0.5;
            
            this.somaPos = 20;
            
            this.timer = this.game.add.image(600, 870 + this.somaPos, "timer_hud", 0, this);
            this.vidas = this.game.add.image(590 + 500, 80 + this.somaPos, "vidas_hud", 0, this);
            this.pause = this.game.add.sprite(680, 20 + this.somaPos, "pause_btn", 0, this);
            this.pause.inputEnabled = true;
            this.pause.input.useHandCursor = true;
            this.pause.events.onInputUp.add(this.pauseGame, this);
            this.pause.input.priorityID = 1;
            this.question = this.game.add.text(this.game.world.centerX, 24, "Questão 5\nQuestão teste teste", null, this);
            this.question.visible = false;
            /*
            this.question.anchor.x = 0.5;
            this.question.wordWrap = true;
            this.question.wordWrapWidth = 650;
            this.question.align = "center";
            this.question.fill = "white";
            this.question.font = "Conv_BradBunR";
            this.question.fontSize = 28;
            this.question.lineSpacing = -10;
            this.question.setShadow(2, 2, "black", 0);
            this.question.stroke = "black";
            this.question.strokeThickness = 2;
            */
            
            // ROTATE BUTTONS & TIP
            this.btnRotateLeft = this.game.add.sprite(game.width / 2 - 165, 900 + this.somaPos, "bt_rotate", 0, this);
            this.btnRotateLeft.inputEnabled = true;
            this.btnRotateLeft.scale.set(0.5);
            this.btnRotateLeft.anchor.set(0.5);
            this.btnRotateLeft.input.useHandCursor = true;
            this.btnRotateLeft.events.onInputUp.add(inGame.rotateLeft, inGame);
            this.btnRotateLeft.scale.x *= -1;
            
            this.btnRotateRight = this.game.add.sprite(game.width / 2 + 165, 900 + this.somaPos, "bt_rotate", 0, this);
            this.btnRotateRight.inputEnabled = true;
            this.btnRotateRight.scale.set(0.5);
            this.btnRotateRight.anchor.set(0.5);
            this.btnRotateRight.input.useHandCursor = true;
            this.btnRotateRight.events.onInputUp.add(inGame.rotateRight, inGame);
            
            this.btnTip = this.game.add.sprite(game.width / 2 - 300, 900 + this.somaPos, "bt_dica", 0, this);
            this.btnTip.inputEnabled = true;
            this.btnTip.scale.set(0.5);
            this.btnTip.anchor.set(0.5);
            this.btnTip.input.useHandCursor = true;
            this.btnTip.events.onInputUp.add(inGame.getTip, inGame);
            
            this.txtTip = game.add.text(this.btnTip.x + (90 - 45), this.btnTip.y - (30), "5", null);
            this.txtTip.anchor.x = 0;
            this.txtTip.fill = "black";
            this.txtTip.stroke = "white";
            this.txtTip.strokeThickness = 6;
            this.txtTip.font = "Conv_BradBunR";
            this.txtTip.fontSize = 48;
            this.txtTip.align = "center";
            
            
            this.txtPoints = game.add.text(60, 35, "000", null);
            this.txtPoints.anchor.x = 0;
            this.txtPoints.fill = "black";
            this.txtPoints.stroke = "white";
            this.txtPoints.strokeThickness = 6;
            this.txtPoints.font = "Conv_BradBunR";
            this.txtPoints.fontSize = 48;
            this.txtPoints.align = "center";
            
            this.setPoints(0);
            // ==============
            
            
            this.timer.visible = false;            
            
            this.timer_countdown = game.add.text(this.timer.x + (90 - 35), this.timer.y, "99:99", null);
            this.timer_countdown.anchor.x = 0.5;
            this.timer_countdown.fill = "black";
            this.timer_countdown.stroke = "white";
            this.timer_countdown.strokeThickness = 6;
            this.timer_countdown.font = "Conv_BradBunR";
            this.timer_countdown.fontSize = 48;
            this.timer_countdown.align = "center";
            
            
            this.life = this.game.add.text(this.vidas.x + (100), this.vidas.y + 15, "x 99", null, this);
            this.life.anchor.x = 0.5;
            this.life.fill = "white";
            this.life.font = "Conv_BradBunR";
            this.life.fontSize = 32;
            this.life.setShadow(2, 2, "#295e0a", 0);
            this.life.stroke = "#295e0a";
            this.life.strokeThickness = 2;
            this.graphics = this.game.add.graphics(0, 0, this);
            this.graphics.beginFill(0x000000, 0.98);
            this.graphics.drawRect(0, 0, this.game.width, this.game.height);
            this.graphics.endFill();
            this.graphics.visible = false;
            this.pauseText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "PAUSE", null, this);
            this.pauseText.anchor.y = this.pauseText.anchor.x = 0.5;
            this.pauseText.fill = "white";
            this.pauseText.stroke = "#659446";
            this.pauseText.strokeThickness = 15;
            this.pauseText.font = "Conv_BradBunR";
            this.pauseText.fontSize = 130;
            this.pauseText.visible = false;
            this.play = this.game.add.sprite(this.game.world.centerX - 27.5, this.pauseText.y + (this.pauseText.height / 1.5) - 25, "play_btn", 0, this);
            this.play.visible = false;
            this.play.inputEnabled = true;
            this.play.input.useHandCursor = true;
            this.play.input.priorityID = 1;
            this.transition_time = 300;
            this.barPos = { hidey: -62, showy: 0 };
            this.fecharPos = { hidey: -62, showy: 5 };
            this.duvidaPos = { hidey: -62, showy: 5 };
            this.musicaPos = { hidey: -62, showy: 5 };
            this.titlePos = { hidey: -68, showy: -6 };
            this.bar = this.game.add.image(0, this.barPos.hidey, "bar_hud", 0, this);
            this.fechar = this.game.add.sprite(944, this.fecharPos.hidey, "fechar_btn", 0, this);
            this.fechar.inputEnabled = true;
            this.fechar.input.useHandCursor = true;
            this.fechar.input.priorityID = 1;
            this.duvida = this.game.add.sprite(880, this.duvidaPos.hidey, "duvida_btn", 0, this);
            this.duvida.inputEnabled = true;
            this.duvida.input.useHandCursor = true;
            this.duvida.input.priorityID = 1;
            this.musica = this.game.add.sprite(816, this.musicaPos.hidey, "musica_btn", 0, this);
            this.musica.inputEnabled = true;
            this.musica.input.useHandCursor = true;
            this.title = this.game.add.text(this.game.world.centerX, this.titlePos.hidey, "Tetris", null, this);
            this.title.anchor.x = 0.5;
            this.title.fill = "white";
            this.title.stroke = "#659446";
            this.title.strokeThickness = 12;
            this.title.font = "Conv_BradBunR";
            this.title.fontSize = 52;
            this.audio_button = this.game.add.audio('sfx_cliquebotao');
            
            
            
            // CONFIG NEW BG =============================
            
            this.btnRotateLeft.alpha = 0.0;
            this.btnRotateRight.alpha = 0.0;
            this.btnTip.alpha = 0.0;
            
            this.timer.alpha = 0;
            this.btnRotateLeft.y -= 25;
            this.btnRotateRight.y -= 25;
            this.btnTip.y += 35;
            this.btnTip.x += 10;
            this.timer_countdown.x += 40;
            
            this.timer_countdown.fill = "#CDC194";
            this.timer_countdown.stroke = "#6C620B";
            this.timer_countdown.fontSize = 40;
            
            this.txtTip.y += 42;
            this.txtTip.fill = "#CDC194";
            this.txtTip.stroke = "#6C620B";
            this.txtTip.fontSize = 40;
            // ===========================================
            
        }
        
        HUDSystem.prototype.setPoints = function (value) {
            var str = value + "";
            while (str.length < inGame.level_data.score_digits) str = "0" + str;
            this.txtPoints.setText(str);
        }
        
        
        HUDSystem.prototype.pauseGame = function () {
            var _this = this;
            this.audio_button.play();
            this.pause.visible = false;
            this.game.time.events.add(this.transition_time + 50, function () { _this.game.paused = true; _this.game.world.addChild(_this); }, this);
            this.play.visible = true;
            this.graphics.visible = true;
            this.pauseText.visible = true;
            this.game.input.onUp.add(this.returnGame, this);
            this.game.world.addChild(this);
            this.game.add.tween(this.bar).to({ y: this.barPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.fechar).to({ y: this.fecharPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.duvida).to({ y: this.duvidaPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.musica).to({ y: this.musicaPos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            this.game.add.tween(this.title).to({ y: this.titlePos.showy }, this.transition_time, Phaser.Easing.Back.InOut, true);
            if (this.main.releaseButton != undefined){ this.main.releaseButton.events.onInputDown.remove(this.main.onClickOnMonster, this.main); }
        };
        HUDSystem.prototype.returnGame = function (event) {
            // during the pause, the update menu doens't work
            // so the verification is like Jorge, they want to be hardcore WoW
            if (this.onClickPausedMenu(event, this.play)) {
                this.audio_button.play();
                this.game.paused = false;
                this.pause.visible = true;
                this.play.visible = false;
                this.graphics.visible = false;
                this.pauseText.visible = false;
                this.game.add.tween(this.bar).to({ y: this.barPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.fechar).to({ y: this.fecharPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.duvida).to({ y: this.duvidaPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.musica).to({ y: this.musicaPos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                this.game.add.tween(this.title).to({ y: this.titlePos.hidey }, this.transition_time, Phaser.Easing.Back.InOut, true);
                if (this.main.releaseButton != undefined){ this.main.releaseButton.events.onInputDown.add(this.main.onClickOnMonster, this.main);}
            }
            if (this.onClickPausedMenu(event, this.musica)) {
                console.log("musica");
                this.audio_button.play();
            }
            if (this.onClickPausedMenu(event, this.fechar)) {
                console.log("fechar");
                this.audio_button.play();
            }
            if (this.onClickPausedMenu(event, this.duvida)) {
                console.log("duvida");
                this.audio_button.play();
            }
        };
        HUDSystem.prototype.onClickPausedMenu = function (event, buttonToCheck) {
            /*console.log(event.x + " - " + event.y);
            console.log(buttonToCheck.x + " - " + buttonToCheck.y);
            console.log(buttonToCheck.width + " - " + buttonToCheck.height);
            console.log("-----------");*/
            if (event.x > buttonToCheck.x && event.x < (buttonToCheck.width + buttonToCheck.x) &&
                event.y > buttonToCheck.y && event.y < (buttonToCheck.height + buttonToCheck.y)) {
                return true;
            }
            return false;
        };
        HUDSystem.prototype.setTimer = function (t) {
            this.timer_seconds = t;
            var myDate = new Date(null, null, null, null, null, this.timer_seconds).toTimeString().replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, "$2");
            this.timer_countdown.text = myDate.toString();
            this.timer_controller = new Phaser.Timer(this.game, false);
            this.game.time.add(this.timer_controller);
            this.timer_controller.loop(1000, this.updateTimer, this);
            this.timer_controller.start();
        };
        HUDSystem.prototype.pauseTimer = function () { this.timer_controller.pause(); };
        HUDSystem.prototype.resumeTimer = function () { this.timer_controller.resume(); };
        HUDSystem.prototype.updateTimer = function (t) {
            this.timer_seconds--;
            var myDate = new Date(null, null, null, null, null, this.timer_seconds).toTimeString().replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, "$2");
            this.timer_countdown.text = myDate.toString();
            if (this.timer_seconds <= 0)
            {
                this.timer_seconds = this.main.level_data.time_to_create_line + 1;
                this.main.onTimeEnded();
            }
        };
        
        HUDSystem.prototype.resetTimer = function () 
        {
            if (this.main != null && this.main != undefined)
            {
                this.timer_seconds = this.main.level_data.time_to_create_line + 1;
            }
        };
        
        
        HUDSystem.prototype.destroyTimer = function () {
            this.timer_controller.stop();
            this.timer_controller.destroy();
        };
        HUDSystem.prototype.setLife = function (l) {
            this.life.text = "x " + l;
            this.life_count = parseInt(l);
        };
        HUDSystem.prototype.loseHeart = function () {
            this.life_count--;
            this.life.text = "x " + this.life_count.toString();
            if (this.life_count <= 0) {
                this.main.setBasketMiss(true);
                this.main = null;
            }
        };
        HUDSystem.prototype.showComemoration = function () {
            this.game.add.tween(this.henrique).to({ x: -200 }, 1500, Phaser.Easing.Elastic.Out, true, 0, 0, true);
        };
        HUDSystem.prototype.dispose = function () {
            this.life_count = 0;
            this.timer_seconds = 0;
            this.audio_button.destroy();
            this.game.sound.removeByKey('sfx_cliquebotao');
            this.pause.events.onInputUp.remove(this.pauseGame, this);
            this.game.input.onUp.remove(this.returnGame, this);
            this.game.input.onUp.remove(this.onClickPausedMenu, this);
            this.destroyTimer();
            this.henrique.destroy();
            this.bar.destroy();
            //this.modal.destroy();
            this.timer.destroy();
            this.vidas.destroy();
            this.pause.destroy();
            this.fechar.destroy();
            this.duvida.destroy();
            this.musica.destroy();
            this.play.destroy();
            this.title.destroy();
            this.question.destroy();
            this.life.destroy();
            this.timer_countdown.destroy();
            this.timer_controller.destroy();
            this.graphics.destroy();
            this.pauseText.destroy();
            this.main = null;
            this.destroy();
        };
        return HUDSystem;
    })(Phaser.Group);
    QuedaLivre.HUDSystem = HUDSystem;
})(QuedaLivre || (QuedaLivre = {}));
