/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    if (b != undefined) __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'resources/sprites/hud/loader.png');
            this.load.image('preloadBarBG', 'resources/sprites/hud/loader_bg.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    QuedaLivre.Boot = Boot;
})(QuedaLivre || (QuedaLivre = {}));
