/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var QuedaLivre;
(function (QuedaLivre) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
        
            this.hud = null;
        }
        
        MainGame.prototype.preload = function () 
        {
            this.game.load.json('level', 'resources/data/level/level1.json?v=' + Math.random());
            
            inGame = new InGameScene();
            inGame.gameState = this;
            inGame.preload();
        };
        
        MainGame.prototype.create = function () 
        {  
            console.log("start");
            
            this.level_data = this.game.cache.getJSON('level');
            inGame.level_data = this.level_data;
            
            inGame.create();
            
            this.hud = new QuedaLivre.HUDSystem(this.game, this, this.world);
            this.hud.title.text = this.level_data.title;
            this.hud.setTimer(this.level_data.time_to_create_line);
            this.hud.setLife(5);
            
            inGame.hud = this.hud;
            inGame.setTipCount(this.level_data.max_tips);
            
            /*
            var g = new Phaser.Graphics(this.game, 0, 0);
            g.beginFill(0xff0000, 0.0);
            g.drawRect(0, 0, this.game.width, this.game.height);
            g.endFill();
            this.releaseButton = this.game.add.sprite(0, 0);
            this.releaseButton.addChild(g);
            this.releaseButton.inputEnabled = true;
            this.releaseButton.input.useHandCursor = true;
            this.releaseButton.input.priorityID = 0;
            this.releaseButton.events.onInputDown.add(this.onClickOnMonster, this);
            */
        };
        
        MainGame.prototype.update = function () 
        {
            inGame.update();
        };
        
        MainGame.prototype.resetLevel = function (gameOver) 
        {
            
        };
        
        MainGame.prototype.onTimeEnded = function (finish) 
        {
            inGame.grid.addLine();
        }
        
        
        MainGame.prototype.finishGameLevel = function (finish) 
        {    
            this.hud.destroyTimer();
            this.hud.dispose();
            
            if (finish == true)
            {
                this.game.state.start('YouWin', true, false);
            }
            else
            {
                this.game.state.start('YouLose', true, false);
            }
        };
        
        MainGame.prototype.onClickOnMonster = function () {
            if (this.falling)
                return;
            this.falling = true;
            this.audio_falling.play();
            this.monster_tween.stop(false);
            this.hud.pauseTimer();
            var wx = this.actual_item.world.x;
            var wy = this.actual_item.world.y;
            this.monster.removeChild(this.actual_item);
            this.game.world.addChild(this.actual_item);
            this.actual_item.x = wx;
            this.actual_item.y = wy;
            this.game.physics.enable(this.actual_item, Phaser.Physics.ARCADE);
            this.actual_item.body.collideWorldBounds = true;
            this.actual_item.body.gravity.set(0, 300);
        };
        
        return MainGame;
    })(Phaser.State);
    QuedaLivre.MainGame = MainGame;
})(QuedaLivre || (QuedaLivre = {}));
