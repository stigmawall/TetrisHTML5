function Tile(row, col)
{
	this.value = -1;
	this.spriteBlocked = null;
	this.sprite0 = null;
	this.spriteList = new Array();
	this.row = row == undefined ? 0 : row;
	this.col = col == undefined ? 0 : col;
	this.textField = null;
	this.offset = {x:-1, y:-24};
	
	this.tileoffset = 0;
	this.reversedTileoffset = 0;
	
	this.originalTint = null;
	
	this.animAcerto = null;
	
	this.constructor = function()
	{
		this.scale = 0.52;
		
		for (this.i = 1; this.i <= 4;this.i++)
		{
			var s = game.add.sprite(0, 0, "peca" + this.i);
			s.scale.set(this.scale);
			this.spriteList.push(s);
			this.originalTint = s.tint;
		}
		
		this.spriteBlocked = game.add.sprite(0, 0, "peca6");
		this.spriteBlocked.alpha = 0.5;
		this.spriteBlocked.scale.set(this.scale);
		
		/*
		this.textField = game.add.bitmapText(0, 0, 'bebasneue', "", 50);
		this.textField.tint = "0x0000FF";
		this.textField.anchor.set( 0.5 );*/
		
		this.textField = game.add.text(0, 0, "", null);
		this.textField.anchor.set(0.5);
		this.textField.fill = "white";
		this.textField.stroke = "#659446";
		this.textField.strokeThickness = 8;
		this.textField.font = "Conv_BradBunR";
		this.textField.fontSize = 48;
		this.textField.align = "center";	
		
		this.setPosition(this.col * TILE_SIZE, this.row * TILE_SIZE);	
	};
	
	
	this.getMonsterPos = function()
	{
		return {x:this.sprite0.x - this.offset.x + TILE_SIZE / 2.0, y:this.sprite0.y - this.offset.x + TILE_SIZE / 2.0};
	};	
	
	this.setTint = function(color)
	{
		if (color == undefined) color = this.originalTint;
		for (this.i = 0; this.i < this.spriteList.length; this.i++)
		{
			this.spriteList[this.i].tint = color;
		}
	}
	
	this.setTintToDrag = function(points)
	{
		
	};
	
	this.addToGroup = function(group)
	{
		for (this.i = 0; this.i < this.spriteList.length; this.i++)
		{
			group.add(this.spriteList[this.i]);
		}
		
		group.add(this.spriteBlocked);
		group.add(this.textField);
	};
	
	this.setValue = function(value, hideText)
	{
		this.mod = Math.floor( value % 4 );
		if (this.mod < 0) this.mod = 0;
		
		for (this.i = 0; this.i < this.spriteList.length; this.i++)
		{
			this.spriteList[this.i].visible = false;
			
			if (this.i == this.mod)
			{
				this.sprite0 = this.spriteList[this.i];
			}
		}
		
		this.value = value;
		
		this.textField.setText((value < 0 || hideText == true) ? "" : value + "");
		
		if (this.value == BLOCKED_TILE)
		{
			this.spriteBlocked.visible = true;
			this.sprite0.visible = false;
		}
		else
		{
			this.spriteBlocked.visible = false;
			this.sprite0.visible = (value >= 0);
		}
	};
	
	this.setPosition = function(x, y)
	{
		//this.sprite0.x = x + this.offset.x;
		//this.sprite0.y = y + this.offset.y;
		
		for (this.i = 0; this.i < this.spriteList.length; this.i++)
		{
			this.spriteList[this.i].x = x + this.offset.x;
			this.spriteList[this.i].y = y + this.offset.y;
		}
		
		this.spriteBlocked.x = x + this.offset.x;
		this.spriteBlocked.y = y + this.offset.y;
		
		this.textField.x = x + (TILE_SIZE / 2);
		this.textField.y = y + (TILE_SIZE / 2);
	};
	
	this.setColor = function(color)
	{
		this.sprite0.tint = color;
	}
	
	this.getPosition = function()
	{
		return {x:this.sprite0.x - this.offset.x + TILE_SIZE / 2.0, y:this.sprite0.y - this.offset.x + TILE_SIZE / 2.0};
	};
	
	this.update = function()
	{
		if (this.tileoffset > 0)
		{
			this.velocity = 4;
			this.tileoffset -= this.velocity;
			this.reversedTileoffset += this.velocity;
			this.setPosition(this.col * TILE_SIZE, this.row * TILE_SIZE + this.reversedTileoffset);	
			return 1;
		}
		
		return 0;
	};
	
	this.constructor();
}
