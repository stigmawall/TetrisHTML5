/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this, 768, 1024, Phaser.AUTO, 'content', null);
            this.state.add('Boot', QuedaLivre.Boot, false);
            this.state.add('Preloader', QuedaLivre.Preloader, false);
            this.state.add('MainMenu', QuedaLivre.MainMenu, false);
            this.state.add('MainGame', QuedaLivre.MainGame, false);
            this.state.add('YouWin', QuedaLivre.YouWin, false);
            this.state.add('YouLose', QuedaLivre.YouLose, false);
            this.state.add('TestScene', QuedaLivre.TestScene, false);
            this.state.start('Boot');
            //this.state.start('TestScene');
        }
        return Main;
    })(Phaser.Game);
    QuedaLivre.Main = Main;
})(QuedaLivre || (QuedaLivre = {}));
