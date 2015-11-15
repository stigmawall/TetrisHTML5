var Tetris;
(function (Tetris) 
{
    var Monster = (function (_super) 
	{
        Mamute.Extends(Monster, _super);
        
        function Monster() 
		{
            if (_super != undefined) _super.apply(this, arguments);
            
            this.group = game.add.group();
            inGame.stage.add(this.group);
            
            this.sprite = null;
            this.spriteList = new Array();
            
            this.idle = [];
            this.suando = [];
            this.comendo = [];
            this.morrendo = [];
            this.currentAnim = [];
            this.currentAnimName = "";
            this.currentFrame = 0;
            this.elapsedTime = 0;
            
            this.awake();
            this.start();
        }
		
        Monster.prototype.awake = function () 
		{      
        };
		
        Monster.prototype.start = function () 
		{
          // this.sprite = game.add.sprite(0, 0, "suando1");
          // this.sprite.anchor.set(0.5, 1);
           
          this.sprite = game.add.sprite(0, 0, "monstro");
          this.sprite.scale.set(1.25,1.25);
          this.sprite.anchor.set(0.5, 1);
          this.group.add( this.sprite );

         
          this.sprite.animations.add("idle", Phaser.Animation.generateFrameNames('monstro_animado_novo', 1, 67, '.png', 4), 24, true);
          this.sprite.animations.add("comendo", Phaser.Animation.generateFrameNames('monstro_come_peca_', 0, 76, '.png', 5), 24, false);
          this.sprite.animations.add("morrendo", Phaser.Animation.generateFrameNames('monstro_morre_', 0, 76, '.png', 5), 24, false);
          this.sprite.animations.add("suando", Phaser.Animation.generateFrameNames('monstro_suando_', 1, 57, '.png', 4), 24, true);

          
          //inGame.stage.add(this.sprite);
          this.playAnimation("idle");
          


          /*
           // IDLE
           for (this.i = 1; this.i <= 67; this.i++)
           {
               var s = game.add.sprite(0, -40, "idle" + this.i);
               s.anchor.set(0.5, 1);
               this.idle.push(s);
               this.spriteList.push(s);
               this.group.add(s);
           }
           
           // SUANDO
           for (this.i = 1; this.i <= 57; this.i++)
           {
               var s = game.add.sprite(0, 0, "suando" + this.i);
               s.anchor.set(0.5, 1);
               this.suando.push(s);
               this.spriteList.push(s);
               this.group.add(s);
           }
           
           // COMENDO
           for (this.i = 1; this.i <= 77; this.i++)
           {
               var s = game.add.sprite(0, 0, "comendo" + this.i);
               s.anchor.set(0.5, 1);
               this.comendo.push(s);
               this.spriteList.push(s);
               this.group.add(s);
           }
           
           // MORRENDO
           for (this.i = 1; this.i <= 77; this.i++)
           {
               var s = game.add.sprite(0, 0, "morrendo" + this.i);
               s.anchor.set(0.5, 1);
               this.morrendo.push(s);
               this.spriteList.push(s);
               this.group.add(s);
           }
           
           this.group.scale.set(inGame.level_data.monster_scale);
           */
           
        };
        
		
        Monster.prototype.update = function () 
		    {      
            /*
            this.elapsedTime += game.time.elapsed;
            if (this.elapsedTime / 1000.0 >= 1.0 / 24)
            {
                this.elapsedTime = 0;
                this.currentFrame++;
                if (this.currentFrame >= this.currentAnim.length)
                {
                    if (this.currentAnimName == "comendo")
                    {
                        this.playAnimation("idle");
                        return;    
                    }
                    
                    this.currentFrame = 0;
                }
                this.setFrame(this.currentAnim[this.currentFrame]);
            }
            */
        };
        
        Monster.prototype.setFrame = function (s) 
		{
           /*
           for (this.i = 0; this.i < this.spriteList.length; this.i++)
           {
               this.spriteList[this.i].visible = false;
           }
           
           s.visible = true;
           */
        };
        
        
        /*
        Monster.prototype.setPos = function (tile) 
		{
            
            if (tile != undefined)
            {
                var _o = {x:100, y:260};
                this.group.x = tile.getPosition().x + _o.x;
                this.group.y = tile.getPosition().y + _o.y;
            }
            
            // SEMPRE NO MEIO
            this.group.x = game.width / 2;
        };
        */
        
        Monster.prototype.setPos = function (linha) 
		{
            var tilePos = inGame.grid.data[TOTAL_ROWS - linha][0].getPosition().y;
            
            var _o = {x:100, y:260};
            //this.group.x = tile.getPosition().x + _o.x;
            //this.group.y = tilePos + 245;
            this.sprite.y = tilePos + 215;
            
            // SEMPRE NO MEIO
            //this.group.x = game.width / 2;
            this.sprite.x = game.width / 2;


            // offsets
            if( this.sprite.animations.currentAnim.name=="morrendo" ||
                this.sprite.animations.currentAnim.name=="suando" )
              this.sprite.position.y += 20;
        };
        
        Monster.prototype.onLose = function () 
		{
            // SEMPRE NO MEIO
           // this.group.x = game.width / 2;
            //this.group.y = game.height / 2;
            
            this.playAnimation("morrendo");
            invoke(inGame, "exitScene", 3.0);
        };
        
        
        Monster.prototype.playAnimation = function (anim) 
		    {
            var a1 = this.sprite.play(anim);

            if( anim=="comendo" ) 
            {
              _this = this;
              
              a1.onComplete.add(function (obj) {
                _this.playAnimation("idle");
              }, this);
            }
            
            /*if (this.currentAnimName == anim) return;
            this.currentAnimName = anim;
            this.currentFrame = 0;
            this.currentAnim = this[anim];
            */
        };
        
        return Monster;
    })();
	Tetris.Monster = Monster;
})(Tetris || (Tetris = {}));


