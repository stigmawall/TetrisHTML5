/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var QuedaLivre;
(function (QuedaLivre) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBarBG = this.add.image(this.world.centerX, this.world.centerY, 'preloadBarBG');
            this.preloadBarBG.anchor.x = this.preloadBarBG.anchor.y = 0.5;
            this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
            this.preloadBar.anchor.x = this.preloadBar.anchor.y = 0.5;
            this.load.setPreloadSprite(this.preloadBar);
            this.preloadText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 30, "Carregando", null);
            this.preloadText.anchor.x = 0.5;
            this.preloadText.align = "center";
            this.preloadText.fill = "white";
            this.preloadText.font = "Conv_BradBunR";
            this.preloadText.fontSize = 42;
            this.game.load.image('titlepage', 'resources/sprites/startmenu/titlepage.png');
			this.game.load.image('logo', 'resources/sprites/startmenu/logo.png');
            this.game.load.audio('music', 'resources/sprites/title.mp3', true);
            this.game.load.image("henrique", "resources/sprites/hud/henrique.png");
            this.game.load.image("estrela", "resources/sprites/hud/estrela.png");
            this.game.load.image("home_btn", "resources/sprites/hud/home.png");
            this.game.load.image("menu_btn", "resources/sprites/hud/menu.png");
            this.game.load.image("musica_btn", "resources/sprites/hud/musica.png");
            this.game.load.image("pause_btn", "resources/sprites/hud/pause.png");
            this.game.load.image("play_btn", "resources/sprites/hud/play.png");
            this.game.load.image("duvida_btn", "resources/sprites/hud/duvida.png");
            this.game.load.image("fechar_btn", "resources/sprites/hud/fechar.png");
		    this.game.load.image("modal_hud", "resources/sprites/hud/modal.png");
            this.game.load.image("timer_hud", "resources/sprites/hud/timer.png");
            this.game.load.image("bar_hud", "resources/sprites/hud/bar.png");
            this.game.load.image("vidas_hud", "resources/sprites/hud/hud_vidas.png");
			this.game.load.image("retry_btn", "resources/sprites/hud/tentar.png");
            
            // AUDIO
            SoundManager.load("musica_intro", ["resources/sound/musica_intro.mp3", "resources/sound/musica_intro.ogg", "resources/sound/musica_intro.m4a"]);
            SoundManager.load("musica_finalbom", ["resources/sound/musica_finalbom.mp3", "resources/sound/musica_finalbom.ogg", "resources/sound/musica_finalbom.m4a"]);
            SoundManager.load("musica_finalruim", ["resources/sound/musica_finalruim.mp3", "resources/sound/musica_finalruim.ogg", "resources/sound/musica_finalruim.m4a"]);
            SoundManager.load("sfx_acerto", ["resources/sound/sfx_acerto.mp3", "resources/sound/sfx_acerto.ogg", "resources/sound/sfx_acerto.m4a"]);
            SoundManager.load("sfx_cliquebotao", ["resources/sound/sfx_cliquebotao.mp3", "resources/sound/sfx_cliquebotao.ogg", "resources/sound/sfx_cliquebotao.m4a"]);
            SoundManager.load("sfx_erro", ["resources/sound/sfx_erro.mp3", "resources/sound/sfx_erro.ogg", "resources/sound/sfx_erro.m4a"]);
            SoundManager.load("sfx_itemcaindo", ["resources/sound/sfx_itemcaindo.mp3", "resources/sound/sfx_itemcaindo.ogg", "resources/sound/sfx_itemcaindo.m4a"]);
            
            // TETRIS
            AddTetrisResourceList();
       
       };
        Preloader.prototype.create = function () {
            this.add.tween(this.preloadText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.preloadBarBG).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
            
            game.stage.disableVisibilityChange = true;
            
        };
        Preloader.prototype.startMainMenu = function () {
            
            //SoundManager.mute(true);
            this.game.state.start('MainMenu', true, false);
            //this.game.state.start('TestScene', true, false);
        };
        return Preloader;
    })(Phaser.State);
    QuedaLivre.Preloader = Preloader;
})(QuedaLivre || (QuedaLivre = {}));
