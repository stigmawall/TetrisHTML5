function Piece(id)
{
	this.group = null;
	
	this.sprite = null;
	this.btn = null;
	this.collisionPoint = null;
	this.countPoint = null;
	
	this.ghost = null;
	
	this.rotation = 0;
	this.value = 7;
	
	this.textField = null;
	
	this.count = 0;
	
	this.falling = true;
	
	this.lowerPiece = 1;
	
	this.originalGhostPosition = {x:0, y:0};
	
	this.pieceID = id;
	
	this.originalScale = 0.52;
	this.stopScale = 1;
	
	this.dragging = false;
	
	this.usablePiece = false;
	
	this.destroy = function()
	{
		if (this.btn != null) this.btn.destroy();
		if (this.ghost != null) this.ghost.destroy();	
		if (this.sprite != null) this.sprite.destroy();	
		if (this.textField != null) this.textField.destroy();
		if (this.countPoint != null && this.countPoint.length > 0)
		{
			for (this.i = 0; this.i < this.countPoint.length; this.i++)
			{
				this.countPoint[this.i].destroy();
			}
		}
	};
	
	this.getRandomPieceIndex = function(tentativas)
	{
		var min = 0;
		var max =inGame.level_data.possible_pieces.length;
	
		var r = Math.floor(Math.random() * (max - min)) + min;
		return (inGame.level_data.possible_pieces[r] - 1);
	};
	
	this.createButton = function()
	{
		this.btn =  game.add.sprite(0, 0, "btn_pieces");
		this.btn.anchor.set(0.5);// =  game.add.sprite(0, 0, "btn_pieces");
		
		this.btn.x = game.width / 2;
		this.btn.y = 900;
		
		this.btn.inputEnabled = true;
        this.btn.input.useHandCursor = true;
        this.btn.events.onInputUp.add(inGame.requestForMoreLines, inGame);
	};
	
	this.constructor = function()
	{
		this.canCreate = false;
		this.usablePiece = false;
		
		if (this.pieceID == undefined) this.pieceID = this.getRandomPieceIndex();
		this.value = this.setRandomValue(this.pieceID);
		this.tentativasDeCriar = 0;
		while (this.canCreate != true)
		{
			if (inGame.grid.hasTip(this.value, this.pieceID) == true)
			{
				this.canCreate = true;
			}
			else
			{
				this.pieceID = this.getRandomPieceIndex(this.tentativasDeCriar);
				this.value = this.setRandomValue(this.pieceID );
				this.tentativasDeCriar++;
				if (this.tentativasDeCriar >= 150)
				{
					trace("nao tem onde por");
					this.createButton();
					return;
				}
			
			}
		}
		
		this.group = inGame.grid.group;
		
		
		this.ghost = game.add.sprite(0, 0, PIECE_CONFIG[this.pieceID].sprite);
		this.ghost.visible = false;
		this.sprite = game.add.sprite(0, 0, PIECE_CONFIG[this.pieceID].sprite);
		
		//this.sprite.tint = "0x0000FF";
		//this.ghost.tint = "0xCCCCCC";
		
		this.stopScale = this.originalScale * PIECE_CONFIG[this.pieceID].scale;
		
		//*
		this.sprite.scale.set(this.stopScale);
		this.ghost.scale.set(this.stopScale);
		//*/
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.ghost.anchor.x = 0.5;
		this.ghost.anchor.y = 0.5;
		
		this.textField = game.add.text(0,0, this.value + "", null);
		this.textField.anchor.set(0.5);
		this.textField.fill = "white";
		this.textField.stroke = "#659446";
		this.textField.strokeThickness = 8;
		this.textField.font = "Conv_BradBunR";
		this.textField.fontSize = 48;
		this.textField.align = "center";	
		
		this.sprite.x = game.width / 2 - this.group.x;
		this.sprite.y = 900 - this.group.y;
		
		this.ghost.x = this.sprite.x;
		this.ghost.y = this.sprite.y;
		
		this.originalGhostPosition = {x:this.ghost.x, y:this.ghost.y};
		
		this.sprite.inputEnabled = true;
    	this.sprite.input.enableDrag();
    	this.sprite.originalPosition = this.sprite.position.clone();
		this.sprite.events.onDragStop.add(function() {
	      this.stopDrag();
	    }, this);
		this.sprite.events.onDragStart.add(function() {
	      this.startDrag();
	    }, this);
		
		this.collisionPoint = game.add.sprite(0, 0, "point");
		this.collisionPoint.tint = "0x006600";
		this.collisionPoint.visible = false;;
		this.collisionPoint.width = this.collisionPoint.height = 12;
		this.collisionPoint.anchor.set(0.5);
		
		//game.physics.arcade.enable(this.collisionPoint);
		
		this.countPoint = new Array();
		
		
		this.group.add(this.ghost);
		this.group.add(this.sprite);
		
		
		for (this.i = 0; this.i < PIECE_CONFIG[this.pieceID].points.length; this.i++)
		{
			this.addCountPoint (PIECE_CONFIG[this.pieceID].points[this.i]);
		}
		
		this.group.add(this.collisionPoint); 
		this.group.add(this.textField); 
		
		this.dragging = false;
		this.usablePiece = true;
	};
	
	
	this.rotate = function(direction)
	{
		this.sprite.rotation += (90 * direction) * 3.1415 / 180.0;	
	};
	
	
	this.addCountPoint = function(_pointInfo)
	{
		var p = game.add.sprite(0, 0, "point");
		p.tint = "0xFFFF00";
		p.visible = Mamute.debug;
		p.width = p.height = 12;
		p.anchor.set(0.5);
		this.countPoint.push(p);
		
		p.pointInfo = _pointInfo;// = {x:_x, y:_y};
		
		this.group.add(p);
	};
	
	
	this.startDrag = function(currentSprite)
	{
		this.dragging = true;
		inGame.currentPiece.sprite.scale.set(inGame.currentPiece.originalScale);
	};
	
	this.stopDrag = function()
	{
		this.dragging = false;
		
		if (inGame.running == true)
		{
		
			this.resultPieces = new Array();			
			this.result = this.calculateResult(this.resultPieces);
			if ((inGame.level_data.always_correct == true && this.result > 0) || this.result == this.value)
			{
				for (this.i = 0; this.i < this.resultPieces.length; this.i++)
				{
					this.resultPieces[this.i].setValue(BLOCKED_TILE);
				}
				
				SoundManager.play("sfx_acerto");
				
				inGame.grid.updateSlots();
				inGame.renewPiece();
			}
			else
			{
				SoundManager.play("sfx_erro");
				
				this.reset();
			}
		}
		
		inGame.grid.tintDrag();
		
		
	};
	
	this.setRandomValue = function(piece)
	{
		if (piece == undefined) piece = 0;
		var pos = [2, 3, 4,4,4,4,4,4,4];
		var min = 0;
		var max = pos[piece] * inGame.level_data.possible_numbers[inGame.level_data.possible_numbers.length - 1];
		
		return Math.floor(Math.random() * (max - min)) + min;
	};
	
	this.calculateResult = function(resultPieces)
	{
		var _r = 0;
		var _n = 0;
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				for (this.i = 0; this.i < this.countPoint.length; this.i++)
				{
					if (inGame.grid.data[this.r][this.c].value >= 0)
					{
						/*
						if (this.near(inGame.grid.data[this.r][this.c].getPosition(),
							{x:this.countPoint[this.i].x, y:this.countPoint[this.i].y}) == true)
							{
								resultPieces.push(inGame.grid.data[this.r][this.c]);
								var _v = inGame.grid.data[this.r][this.c].value;
								_r += (_v < 0) ? 0 : _v;
								_n++;
							}
							*/
							
						
						if (this.intersect(inGame.grid.data[this.r][this.c].getPosition(),
							{x:this.countPoint[this.i].x, y:this.countPoint[this.i].y - 20}) == true)
							{
								resultPieces.push(inGame.grid.data[this.r][this.c]);
								var _v = inGame.grid.data[this.r][this.c].value;
								_r += (_v < 0) ? 0 : _v;
								_n++;
							}
							
					}
				}
			}
		}
		
		if (_n != this.countPoint.length) _r -= 5000;
		
		return _r;
	};
	
	this.getIntersectionOnGrid = function()
	{
		this.resultPieces = new Array();			
		this.result = this.calculateResult(this.resultPieces);
		return this.resultPieces;
	};
	
	this.intersect = function(tilePos, point)
	{
		tilePos.x -= TILE_SIZE / 2;
		tilePos.y -= TILE_SIZE / 2;
		
		if (point.x - 8 > tilePos.x &&
			point.y - 8 > tilePos.y &&
			point.x + 8 < tilePos.x + TILE_SIZE &&
			point.y + 8 < tilePos.y + TILE_SIZE)
			{
				return true;
			}
		
		/*
		if (point.x >= tilePos.x && point.x <= tilePos.x + TILE_SIZE &&
			point.y >= tilePos.y && point.y <= tilePos.y + TILE_SIZE)
			{
				return true;
			}
			*/
		return false;
	}
	
	this.near = function(point1, point2)
	{
		var d = this.distance(point1, point2);
		return (d < MIN_DISTANCE_TO_BE_NEAR);
	};
	
	this.distance = function( point1, point2 )
    {
      var xs = 0;
      var ys = 0;
     
      xs = point2.x - point1.x;
      xs = xs * xs;
     
      ys = point2.y - point1.y;
      ys = ys * ys;
     
      return Math.sqrt( xs + ys );
    };
	
	/*
	this.checkCollision = function(first, second)
	{
		this.intersect = false;
		game.physics.arcade.overlap(first, second, function()
		{
			this.intersect = true;
		});
		
		return this.intersect;
	}*/
  
	
	this.setForm = function()
	{
		if (numPieces == 3)
		{
			if (rotation == 0)
			{
				this.tiles[0].setPosition(-1 * TILE_SIZE, -1 * TILE_SIZE);
				this.ghosts[0].setPosition(-1 * TILE_SIZE, -1 * TILE_SIZE);
				this.ghosts[0].row = 0;
				
				this.tiles[1].setPosition(0, -1 * TILE_SIZE);
				this.ghosts[1].setPosition(0, -1 * TILE_SIZE);
				this.ghosts[1].row = 0;
				
				this.tiles[2].setPosition(0, 0);
				this.ghosts[2].setPosition(0, 0);
				this.ghosts[2].row = 1;	
			}
		}
	};
	
	
	this.countTint = 0;
	this.update = function()
	{
		if (this.sprite != null)
		{
			this.textField.x = this.sprite.x;
			this.textField.y = this.sprite.y;
			
			this.collisionPoint.x = this.sprite.x;
			this.collisionPoint.y = this.sprite.y;
			
			this.updatePoints();
			
			if (this.dragging == true)
			{
				this.countTint++;
				if (this.countTint % 10 == 0)
				{
					inGame.grid.tintDrag(this.getIntersectionOnGrid());
				}
			}
		}
	};
	
	
	this.updatePoints = function()
	{
		for (this.i = 0; this.i < this.countPoint.length; this.i++)
		{
			this._ang = this.countPoint[this.i].pointInfo.ang + (this.sprite.rotation * 180.0 / 3.1415);
			this._ang = (this._ang % 360) * 3.1415 / 180;
			
			this.countPoint[this.i].x = this.sprite.x + Math.cos(this._ang) * TILE_SIZE * this.countPoint[this.i].pointInfo.dist;
			this.countPoint[this.i].y = this.sprite.y + Math.sin(this._ang) * TILE_SIZE * this.countPoint[this.i].pointInfo.dist;
		
			//this.countPoint[this.i].x = Math.floor(this.countPoint[this.i].x / TILE_SIZE) * TILE_SIZE + (TILE_SIZE / 2);
			//this.countPoint[this.i].y = Math.floor(this.countPoint[this.i].y / TILE_SIZE) * TILE_SIZE + (TILE_SIZE / 2);
		}
	};
	
	this.reset = function()
	{
		this.lowerPiece = 1;
		this.ghost.x = this.originalGhostPosition.x;
		this.ghost.y = this.originalGhostPosition.y;
		
		this.sprite.x = this.sprite.originalPosition.x;
		this.sprite.y = this.sprite.originalPosition.y;
		
		this.sprite.scale.set(this.stopScale);
	};
	
	this.constructor();
}
