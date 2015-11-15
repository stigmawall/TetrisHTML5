var inGame = null;

function InGameScene()
{		
	this.grid = null;
	this.stage = null;
	this.background = null;
	
	this.currentPiece = null;
	this.monster = null;
	
	this.elapsedTime = 0;
	this.gameState = null;
	
	this.running = true;
	
	this.hud = null;
	
	this.acertoList = new Array();
	
	this.numTips = 5;
	this.points = 0;
	this.usingTip = false;
	
	this.preload = function()
	{	
		Mamute.debug = false;
		inGame = this;
	};
	
	this.create = function()
	{
		TOTAL_COLS = this.level_data.cols;
		TOTAL_ROWS = this.level_data.rows;
		
		this.running = true;
		
		this.points = 0;
		this.usingTip = false;
		this.numTips = inGame.level_data.max_tips;
		
		// background
		this.background = game.add.sprite(game.width / 2, game.height / 2, "cenario");
		this.background.anchor.set(0.5);
		this.background.scale.set(1.0);
		
		//game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.stage = game.add.group();
		this.grid = new GameGrid( inGame.level_data.initial_num_lines );
		
		this.grid.group.x = (game.width - TOTAL_COLS * TILE_SIZE) / 2;
		this.grid.group.y = game.height - (TOTAL_ROWS * TILE_SIZE) - 290 ;
		
		this.currentPiece = new Piece();
		
		game.input.keyboard.onDownCallback = this.onKeyDown;
		
		this.monster = new Tetris.Monster();
		this.monster.setPos(inGame.level_data.initial_num_lines);
		
		this.grid.updateMonsterPos();
		for (this.i = 0; this.i < TOTAL_COLS; this.i++)
		{
			var _a = game.add.sprite( 0, 0, 'acerto' );
       		_a.animations.add('action');
        	_a.anchor.set(0.5);
			_a.scale.set(0.8);
			this.stage.add(_a);
			this.acertoList.push(_a);
		}
		
		// topo do cenario
		this.background = game.add.sprite(game.width / 2, 0, "topo_cenario");
		this.background.anchor.set(0.5, 0);
		this.background.scale.set(1.0);
		
		SoundManager.play("musica_intro");
	};

	this.releaseButton = function()
	{
	};
	
	this.onKeyDown = function(e)
	{
		if (e.key == "ArrowUp")
		{
			inGame.currentPiece.rotate(1);
		}	
	};
	
	this.onClearLine = function(blocks)
	{
		if (blocks.length >= TOTAL_COLS)
		{
			var _o = {x:80, y:250};
			for (this.i = 0; this.i < TOTAL_COLS; this.i++)
			{
				this.acertoList[this.i].x = blocks[this.i].sprite0.x + _o.x;
				this.acertoList[this.i].y = blocks[this.i].sprite0.y + _o.y;
				invoke(this, "playActionAnim" + this.i, 0.05 * this.i);
			}
			
			this.grid.counterMonsterPos = -0.06 * TOTAL_COLS;
			
			invoke(this.grid, "desceLinha", 0.06 * TOTAL_COLS);
			
			this.setTipCount(this.numTips + inGame.level_data.tips_increment);
			
			this.points += (this.usingTip != true) ? inGame.level_data.points_increment : inGame.level_data.points_increment_with_tips;
			this.usingTip = false;
			
			this.hud.setPoints(this.points);
			trace("POINTS:" + this.points);
			
			
			if (inGame.level_data.can_win == true && this.points >= inGame.level_data.minimum_points_to_win)
			{
				this.gameState.finishGameLevel(true);
			}
			
		}
	};
	
	this.playActionAnim0 = function(){this.acertoList[0].animations.play("action", 24, false);}	
	this.playActionAnim1 = function(){this.acertoList[1].animations.play("action", 24, false);}	
	this.playActionAnim2 = function(){this.acertoList[2].animations.play("action", 24, false);}	
	this.playActionAnim3 = function(){this.acertoList[3].animations.play("action", 24, false);}	
	this.playActionAnim4 = function(){this.acertoList[4].animations.play("action", 24, false);}	
	this.playActionAnim5 = function(){this.acertoList[5].animations.play("action", 24, false);}	
	this.playActionAnim6 = function(){this.acertoList[6].animations.play("action", 24, false);}	
	this.playActionAnim7 = function(){this.acertoList[7].animations.play("action", 24, false);}	
	this.playActionAnim8 = function(){this.acertoList[8].animations.play("action", 24, false);}	
	this.playActionAnim9 = function(){this.acertoList[9].animations.play("action", 24, false);}	
	this.playActionAnim10 = function(){this.acertoList[10].animations.play("action", 24, false);}	
	this.playActionAnim11 = function(){this.acertoList[11].animations.play("action", 24, false);}	
	this.playActionAnim12 = function(){this.acertoList[12].animations.play("action", 24, false);}	
	
	
	this.update = function()
	{
		if( this.grid ) this.grid.update();
		if( this.currentPiece ) this.currentPiece.update();
		if( this.monster ) this.monster.update();
		
		/*
		this.elapsedTime += game.time.elapsed;
		if (this.elapsedTime >= inGame.level_data.time_to_create_line * 1000)
		{
			this.elapsedTime = 0;
			inGame.grid.addLine();
			inGame.currentPiece.reset();
			this.renewPiece();
		}*/
	};
	
	this.loseGame = function()
	{
		FINAL_POINTS = this.hud.txtPoints.text;
		this.running = false;
		this.monster.onLose();
		//this.gameState.finishGameLevel(false);
	};
	
	this.exitScene = function()
	{
		this.gameState.finishGameLevel(false);
	};
	
	this.renewPiece = function()
	{
		if (this.currentPiece != null) this.currentPiece.destroy();
		this.currentPiece = new Piece();
	};
	
	this.onMouseDown = function()
	{
	};
	
	this.rotateLeft = function()
	{
		inGame.currentPiece.rotate(-1);	
		if (this.currentPiece.usablePiece == true)
		{
			SoundManager.play("sfx_cliquebotao");
		}
	};
	
	this.rotateRight = function()
	{
		inGame.currentPiece.rotate(1);
		if (this.currentPiece.usablePiece == true)
		{
			SoundManager.play("sfx_cliquebotao");
		}
	};
	
	
	this.requestForMoreLines = function()
	{
		SoundManager.play("sfx_cliquebotao");
		for (this.i = 0; this.i < inGame.level_data.lines_on_click_more; this.i++)
		{
			this.grid.addLine();
		}
	};
	
	this.getTip = function()
	{
		if (this.numTips > 0 && this.currentPiece.usablePiece == true)
		{
			this.usingTip = true;
			inGame.grid.highLighTip();
			this.setTipCount(this.numTips - 1);
			SoundManager.play("sfx_cliquebotao");
		}
	};
	
	this.setTipCount = function(num)
	{
		if (num > inGame.level_data.max_tips) num = inGame.level_data.max_tips;
		this.numTips = num;
		this.hud.txtTip.setText(num + "");
	};
}
