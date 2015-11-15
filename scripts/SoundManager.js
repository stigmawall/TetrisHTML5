function SoundManagerClass()
{
	this.audioList = {};
	
	this.load = function(alias, path)
	{
		game.load.audio(alias, path);
	};
	
	this.play = function(alias, loop, stopIfPlaying)
	{
		if (this.audioList[alias] == undefined)
		{
			this.audioList[alias] =	game.add.audio(alias);
		}
		
		this.audioList[alias].loop = (loop == true) ? true : false;
		
		if (this.audioList[alias].isPlaying  == false || stopIfPlaying == true)
		{
			this.audioList[alias].stop();
			this.audioList[alias].play();
		}
	};
	
	this.stop = function(alias)
	{
		if (this.audioList[alias] != undefined)
		{
			this.audioList[alias].stop();
		}
	};
		
	this.stopAll = function()
	{
		game.sound.stopAll();
	};
	
	this.mute = function(muted)
	{
		game.sound.mute = muted;
	};
	
	
	this.dispose = function()
	{
		this.stopAll();
		for (var property in this.audioList) 
		{
			if (this.audioList.hasOwnProperty(property))
			{
				this.audioList[property].destroy();
				this.audioList[property] = undefined;
			}
		}
	};
}

var SoundManager = new SoundManagerClass();
