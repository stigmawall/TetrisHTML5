function GameGrid(initialRows)
{
	this.points = null;
	this.group = null;
	this.data = null;
	this.gameEnded = false;
	
	this.lastUpdateValue = 0;
	
	this.counterMonsterPos = 0.0;
	
	this.constructor = function()
	{
		this.points = new Array();
		this.group = game.add.group();
		
		this.data = new Array(TOTAL_ROWS);
		
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			this.data[this.r] = new Array(TOTAL_COLS);
		}
		
		for (this.r = TOTAL_ROWS- 1; this.r >= 0; this.r--) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				this.data[this.r][this.c] = new Tile(this.r, this.c);
				this.data[this.r][this.c].addToGroup(this.group);
				
				if (this.r >= TOTAL_ROWS - initialRows)
				{
					this.data[this.r][this.c].setValue( this.getRandomGridValue() );
				}
				else
				{
					this.data[this.r][this.c].setValue( EMPTY_TILE );
				}
				
				this.addContactPoint(this.r, this.c);
			}
		}
		
		
		inGame.stage.add(this.group);
		this.updateSlots();
	};
	
	
	this.tintDrag = function(points)
	{
		if (points == undefined) points = [];
		// RESET COLORS
		//*
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				if (this.data[this.r][this.c].tint != inGame.level_data.tips_color)
				{
					this.data[this.r][this.c].setTint();
				}
			}
		}
		//*/
		
		for (this.i = 0; this.i < points.length; this.i++) 
		{
			if (points[this.i].tint != inGame.level_data.tips_color)
			{
				points[this.i].setTint(inGame.level_data.drag_color);
			}
		}
	};
	
	
	this.getTileValue = function(row, col)
	{
		if (row < 0 || row >= TOTAL_ROWS) return -6666;
		if (col < 0 || col >= TOTAL_COLS) return -6666;
		if (this.data[row][col].value < 0) return -6666;
		return this.data[row][col].value;
	};
	
	this.removeHighLigh = function()
	{
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++)
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++)
			{
				this.data[this.r][this.c].setTint();
			}
		}
	};
	
	
	this.hasTip = function(value, id)
	{
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++)
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++)
			{
				var _p = this.checkCanPlace(this.r, this.c, value, id + 1);
				if (_p != null)
				{					
					return true;
				}
			}
		}
		
		return false;
	}
	
	this.highLighTip = function()
	{
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++)
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++)
			{
				var _p = this.checkCanPlace(this.r, this.c, inGame.currentPiece.value, inGame.currentPiece.pieceID + 1);
				if (_p != null)
				{
					for (this.i = 0; this.i < _p.length; this.i++)
					{
						this.data[_p[this.i].r][_p[this.i].c].setTint(inGame.level_data.tips_color);
					}
					
					return;
				}
			}
		}
	}
	
	this.checkCanPlace = function(row, col, value, pieceID)
	{
		if (pieceID == undefined) pieceID = 1;
		if (pieceID == 1)
		{
			var _v = 0;
			// R1
			_v = this.getTileValue(row, col) + this.getTileValue(row + 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row + 1, c:col}];
			//R2
			_v = this.getTileValue(row, col) + this.getTileValue(row - 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row - 1, c:col}];
			//R3
			_v = this.getTileValue(row, col) + this.getTileValue(row, col + 1);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col + 1}];
			//R4
			_v = this.getTileValue(row, col) + this.getTileValue(row, col - 1);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col - 1}];
		}
		else if (pieceID == 2)
		{
			var _v = 0;
			// R1
			_v = this.getTileValue(row, col) + this.getTileValue(row, col + 1) + this.getTileValue(row + 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col + 1}, {r:row + 1, c:col}];
			//R2
			_v = this.getTileValue(row, col) + this.getTileValue(row, col - 1) + this.getTileValue(row + 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col - 1}, {r:row + 1, c:col}];
			//R3
			_v = this.getTileValue(row, col) + this.getTileValue(row, col - 1) + this.getTileValue(row - 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col - 1}, {r:row - 1, c:col}];
		}
		else if (pieceID == 3)
		{
			var _v = 0;
			// R1
			_v = this.getTileValue(row, col) + this.getTileValue(row, col + 1) + this.getTileValue(row, col + 2) + this.getTileValue(row, col + 3);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col + 1}, {r:row, c:col + 2}, {r:row, c:col + 3}];
			//R2
			_v = this.getTileValue(row, col) + this.getTileValue(row+1, col) + this.getTileValue(row+2, col) + this.getTileValue(row + 3, col);
			if (_v == value) return [{r:row, c:col}, {r:row+1, c:col}, {r:row+2, c:col}, {r:row +3, c:col}];
		}
		else if (pieceID == 4)
		{
			var _v = 0;
			// R1
			_v = this.getTileValue(row, col) + this.getTileValue(row, col + 1) + this.getTileValue(row, col + 2) + this.getTileValue(row - 1, col + 2);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col + 1}, {r:row, c:col + 2}, {r:row - 1, c:col + 2}];
			
			// R2
			_v = this.getTileValue(row, col) + this.getTileValue(row, col + 1) + this.getTileValue(row, col + 2) + this.getTileValue(row + 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col + 1}, {r:row, c:col + 2}, {r:row + 1, c:col}];
			
			// R3
			_v = this.getTileValue(row, col) + this.getTileValue(row + 1, col) + this.getTileValue(row + 2, col) + this.getTileValue(row + 2, col + 1);
			if (_v == value) return [{r:row, c:col}, {r:row + 1, c:col}, {r:row + 2, c:col}, {r:row + 2, c:col + 1}];
			
			// R3
			_v = this.getTileValue(row, col) + this.getTileValue(row + 1, col) + this.getTileValue(row + 2, col) + this.getTileValue(row, col - 1);
			if (_v == value) return [{r:row, c:col}, {r:row + 1, c:col}, {r:row + 2, c:col}, {r:row, c:col - 1}];
		}
		else if (pieceID == 5)
		{
			var _v = 0;
			
			// R1
			_v = this.getTileValue(row, col) + this.getTileValue(row, col - 1) + this.getTileValue(row, col + 1) + this.getTileValue(row + 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col - 1}, {r:row, c:col + 1}, {r:row + 1, c:col}];
			
			//R2
			_v = this.getTileValue(row, col) + this.getTileValue(row - 1, col) + this.getTileValue(row + 1, col) + this.getTileValue(row, col - 1);
			if (_v == value) return [{r:row, c:col}, {r:row - 1, c:col}, {r:row + 1, c:col}, {r:row, c:col - 1}];
			
			//R3
			_v = this.getTileValue(row, col) + this.getTileValue(row, col - 1) + this.getTileValue(row, col + 1) + this.getTileValue(row - 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col - 1}, {r:row, c:col + 1}, {r:row - 1, c:col}];
			
			//R4
			_v = this.getTileValue(row, col) + this.getTileValue(row - 1, col) + this.getTileValue(row + 1, col) + this.getTileValue(row, col + 1);
			if (_v == value) return [{r:row, c:col}, {r:row - 1, c:col}, {r:row + 1, c:col}, {r:row, c:col + 1}];
		}
		else if (pieceID == 6)
		{
			var _v = 0;
			
			// R1
			_v = this.getTileValue(row, col) + this.getTileValue(row, col + 1) + this.getTileValue(row - 1, col + 1) + this.getTileValue(row + 1, col);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col + 1}, {r:row - 1, c:col + 1}, {r:row + 1, c:col}];
			
			//R2
			_v = this.getTileValue(row, col) + this.getTileValue(row, col - 1) + this.getTileValue(row + 1, col) + this.getTileValue(row + 1, col + 1);
			if (_v == value) return [{r:row, c:col}, {r:row, c:col - 1}, {r:row + 1, c:col}, {r:row + 1, c:col + 1}];
		}
		else if (pieceID == 7)
		{
			var _v = 0;
			
			// R1
			_v = this.getTileValue(row, col);
			if (_v == value) return [{r:row, c:col}];
		}
		
		return null;
	};
	
	this.update = function()
	{
		this.updateValue = 0;
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				this.updateValue += this.data[this.r][this.c].update();
			}
		}
		
		if (this.lastUpdateValue != 0 && this.updateValue == 0)
		{
			this.updateVisualValues();
		}
		
		this.lastUpdateValue = this.updateValue;
		
		this.counterMonsterPos -= game.time.elapsed;
		if (this.counterMonsterPos <= 0)
		{
			//this.updateMonsterPos();
		}
	};
	
	this.updateVisualValues = function()
	{
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				this.data[this.r][this.c].setValue(this.data[this.r][this.c].value);
				this.data[this.r][this.c].setPosition(this.c * TILE_SIZE, this.r * TILE_SIZE);
			}
		}	
	};
	
	this.updateSlots = function()
	{
		this.highPieceList = new Array();
		this.highPieceListIndex = 1000;
		this.lineCleaned = false;
		this.clearList = new Array();
		
		this.totalPecasAtivas = 0;
		
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			this.countBlocked = 0;
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				if (this.data[this.r][this.c].value == BLOCKED_TILE)
				{
					this.countBlocked++;
				}
				else if (this.data[this.r][this.c].value >= 0)
				{
					this.totalPecasAtivas++;
				}
				
				if (this.r <= this.highPieceListIndex && this.data[this.r][this.c].value >= 0)
				{
					if (this.r < this.highPieceListIndex)
					{
						this.highPieceList = new Array();
					}
					
					this.highPieceListIndex = this.r;
					this.highPieceList.push(this.data[this.r][this.c]);
				}
			}
			
			// LIMPA LINHA
			if (this.countBlocked >= TOTAL_COLS)
			{
				for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
				{
					this.data[this.r][this.c].setValue(EMPTY_TILE);
					this.clearList.push(this.data[this.r][this.c]);
					this.lineCleaned = true;
				}
			}
		}
		
		if (this.totalPecasAtivas == 0)
		{
			for (this.i = 0; this.i < inGame.level_data.lines_when_clear_all; this.i++)
			{
				this.addLine();
			}
			
			inGame.points += inGame.level_data.points_when_clear_all_lines;			
			inGame.hud.setPoints(inGame.points);
		}
		
		if (this.lineCleaned == true)
		{
			inGame.onClearLine(this.clearList);
		}
	};
	
	this.desceLinha = function()
	{
			// Verifica quantas linhas deve descer
			for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
			{
				for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
				{
					this.data[this.r][this.c].tileoffset = 0;
					this.data[this.r][this.c].reversedTileoffset = 0;
					
					for (this.r2 = this.r + 1; this.r2 < TOTAL_ROWS; this.r2++) 
					{
						if (this.data[this.r2][this.c].value == EMPTY_TILE)
						{
							this.data[this.r][this.c].tileoffset += TILE_SIZE;
						}
					}
				}
			}
			
			
			
				
			// DESCE O VALOR DAS LINHAS	
			for (this.r = 0; this.r < TOTAL_ROWS - 1; this.r++) 
			{
				for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
				{
					if (this.data[this.r][this.c].value != EMPTY_TILE && this.data[this.r + 1][this.c].value == EMPTY_TILE)
					{
						
						this.tempUpValue = this.data[this.r + 1][this.c].value;
						//this.tempOffset = this.data[this.r + 1][this.c].tileoffset;
						this.data[this.r + 1][this.c].value = this.data[this.r][this.c].value;
						this.data[this.r][this.c].value = this.tempUpValue;
						
						
						this.r = 0;
						this.c = 0;
					}
				}
			}

		invoke(this, "desceMonster", 0.12 * TOTAL_COLS);
		inGame.hud.resetTimer();
	};
	
	this.desceMonster = function()
	{
		this.updateMonsterPos(true);
		inGame.monster.playAnimation("comendo");
	};
	
	this.addContactPoint = function(row, col)
	{
		var point = game.add.sprite(0, 0, "point");
		point.tint = "0x006600";
		point.visible = false;// Mamute.debug;
		point.width = point.height = TILE_SIZE / 4.0;
		point.anchor.set(0.5);
		point.x = col * TILE_SIZE + TILE_SIZE / 2.0;
		point.y = row * TILE_SIZE + TILE_SIZE / 2.0;
		
		this.points.push(point);
		
		//game.physics.arcade.enable(point);
		
		this.group.add(point);
	};
	
	
	this.addLine = function()
	{
		if (this.gameEnded == true) return;
		
		this.removeHighLigh();
		
		SoundManager.play("sfx_itemcaindo");
		
		this.gameEnded = false;
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				if (this.r == 0 && this.data[this.r][this.c].value >= 0)
				{
					this.gameEnded = true;
				}
				else
				{
					if (this.r > 0)
					{
						this.data[this.r - 1][this.c].setValue( this.data[this.r][this.c].value );
					}
				}
			}
		}
		
		for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
		{
			this.data[TOTAL_ROWS - 1][this.c].setValue( this.getRandomGridValue() );
		}
		
		if (inGame.currentPiece.usablePiece == false)
		{
			inGame.renewPiece();
		}
		
		
		this.updateMonsterPos();
		
		if (this.gameEnded == true)
		{
			this.loseGame();
		}
	};
	
	this.updateMonsterPos = function()
	{
		this.counterMonsterPos = 2.0;
		var _p = 0;
		var _l = 0;
		for (this.r = 0; this.r < TOTAL_ROWS; this.r++) 
		{
			for (this.c = 0; this.c < TOTAL_COLS; this.c++) 
			{
				if (this.data[this.r][this.c].value >= BLOCKED_TILE)
				{
					_p++;
					if (_p >= TOTAL_COLS)
					{
						_p = 0;
						_l++;
					}
				}
			}
		}
		

		if (_l >= TOTAL_ROWS - 1)
		{
			inGame.monster.playAnimation("suando");
		}
		else
		{
			inGame.monster.playAnimation("idle");
		}
		
		//( eating ) ? inGame.monster.setPos(_l + 1) : inGame.monster.setPos(_l);
		inGame.monster.setPos(_l);
	};
	
	
	this.loseGame = function()
	{
		inGame.loseGame();
	};
	
	
	this.rand = function(min, max)
	{		
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	this.getRandomGridValue = function()
	{
		var min = 0;
		var max = inGame.level_data.possible_numbers.length - 1;
		
		var v = Math.floor(Math.random() * (max - min + 1)) + min;
		
		return inGame.level_data.possible_numbers[v];
	};
	
	this.at = function(row, col)
	{
		return this.data[Math.floor(row)][Math.floor(col)];
	};
	
	this.set = function(col, row, value)
	{
		this.data[Math.floor(row)][Math.floor(col)].setValue( value );	
	};
	
	this.constructor();
}

