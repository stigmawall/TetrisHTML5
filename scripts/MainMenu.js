/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.game.load.json('level', 'resources/data/level/level1.json?v=' + Math.random());
        };
        MainMenu.prototype.create = function () {
            this.level_data = this.game.cache.getJSON('level');
            
            SoundManager.play("musica_intro", true);
            
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.title = this.game.add.text(this.game.world.centerX, 350, this.level_data.title, null);
            this.title.anchor.x = 0.5;
            this.title.fill = "white";
            this.title.stroke = "#659446";
            this.title.strokeThickness = 12;
            this.title.font = "Conv_BradBunR";
            this.title.fontSize = 80;
            this.title.align = "center";
            this.instructions = this.game.add.text(this.game.world.centerX, 450, this.level_data.tutorial, null);
            this.instructions.anchor.x = 0.5;
            this.instructions.wordWrap = true;
            this.instructions.wordWrapWidth = 650;
            this.instructions.fill = "white";
            this.instructions.font = "Conv_BradBunR";
            this.instructions.fontSize = 32;
            this.instructions.setShadow(2, 2, "#295e0a", 0);
            this.instructions.stroke = "#295e0a";
            this.instructions.strokeThickness = 2;
            this.instructions.align = "center";
            this.add.tween(this.background).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: this.world.centerY + 400 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.game.add.audio('sfx_cliquebotao').play();
            this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            //var tween = this.add.tween(this.logo).to({ y: 1210 }, 1000, Phaser.Easing.Linear.None, true);
            //tween.onComplete.addOnce(this.startGame, this);
            this.startGame()
        };
        MainMenu.prototype.startGame = function () {
            this.game.sound.removeByKey('sfx_cliquebotao');
            this.game_music = null;
            this.level_data = null;
            this.background.destroy();
            this.logo.destroy();
            this.title.destroy();
            this.instructions.destroy();
            this.input.onDown.removeAll();
            this.game.state.start('MainGame', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    QuedaLivre.MainMenu = MainMenu;
})(QuedaLivre || (QuedaLivre = {}));
