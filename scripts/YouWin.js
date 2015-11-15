/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var YouWin = (function (_super) {
        __extends(YouWin, _super);
        function YouWin() {
            _super.apply(this, arguments);
        }
        YouWin.prototype.create = function () {
            SoundManager.stopAll();
            SoundManager.play('musica_finalbom');
            this.background = this.add.sprite(0, 0, 'tela_ganha');
            this.restart = this.add.sprite(game.width / 2 - 80, 750, 'menu_btn');
            this.menu = this.add.sprite(game.width / 2 + 80, 750, 'retry_btn');
            var g = new Phaser.Graphics(this.game, 0, 0);
            g.beginFill(0x000000, 1);
            g.drawRect(0, 0, this.game.width, this.game.height);
            g.endFill();
            this.black_screen = this.game.add.sprite(0, 0);
            this.black_screen.addChild(g);
            var t = this.add.tween(this.black_screen).to({ alpha: 0 }, 1000, Phaser.Easing.Bounce.InOut);
            t.onComplete.add(this.startMenu, this);
            t.start();
        };
        YouWin.prototype.startMenu = function () {
            this.restart.inputEnabled = true;
            this.restart.input.useHandCursor = true;
            this.restart.events.onInputUp.add(this.fadeIn, this);
            this.menu.inputEnabled = true;
            this.menu.input.useHandCursor = true;
            this.menu.events.onInputUp.add(this.fadeIn, this);
        };
        YouWin.prototype.fadeIn = function (event) {
            var t = this.add.tween(this.black_screen).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut);
            this.game.add.audio('sfx_cliquebotao').play();
            if (event.key == "menu_btn")
                t.onComplete.add(this.gotoMenu, this);
            else
                t.onComplete.add(this.retryGame, this);
            t.start();
        };
        YouWin.prototype.gotoMenu = function () { this.dispose(); this.game.state.start('MainMenu', true, false); };
        YouWin.prototype.retryGame = function () { this.dispose(); this.game.state.start('MainGame', true, false); };
        YouWin.prototype.dispose = function () {
            SoundManager.dispose();
            this.game.tweens.removeAll();
            this.background.destroy();
            this.restart.destroy();
            this.menu.destroy();
            this.black_screen.destroy();
        };
        return YouWin;
    })(Phaser.State);
    QuedaLivre.YouWin = YouWin;
})(QuedaLivre || (QuedaLivre = {}));
