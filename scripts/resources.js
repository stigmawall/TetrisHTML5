//PRELOAD ASSETS
function LoadPreloadResources()
{

}

// GAME ASSETS
function LoadGameResources(onFileLoaded, onLoadComplete, where)
{
	if (where != null && where != undefined)
	{
		if (onLoadComplete != null && onLoadComplete != undefined)
		{
			game.load.onLoadComplete.add(onLoadComplete, where);
		}
		
		if (onFileLoaded != null && onFileLoaded != undefined)
		{
			game.load.onFileComplete.add(onFileLoaded, where);
		}
	}

	AddTetrisResourceList();
	
	game.load.start();
}

function AddTetrisResourceList()
{
	//SPRITES
	game.load.image('peca1', 'resources/sprites/pecas_cor/peca1.png');
	game.load.image('peca2', 'resources/sprites/pecas_cor/peca2.png');
	game.load.image('peca3', 'resources/sprites/pecas_cor/peca3.png');
	game.load.image('peca4', 'resources/sprites/pecas_cor/peca4.png');
	game.load.image('peca5', 'resources/sprites/pecas_cor/peca5.png');
	game.load.image('peca6', 'resources/sprites/pecas_cor/peca6.png');
	
	game.load.image('bt_rotate', 'resources/sprites/bt_rotate.png');
	game.load.image('bt_dica', 'resources/sprites/bt_dica.png');
	
	game.load.image('tela_ganha', 'resources/sprites/tela_ganha.png');
	game.load.image('tela_perde', 'resources/sprites/tela_perde.png');
	game.load.image('topo_cenario', 'resources/sprites/topo.png');
	game.load.image('btn_pieces', 'resources/sprites/btn_pieces.png');
	
	
	for (this.i = 1; this.i <= 7; this.i++)
	{
		this.str = this.i + "";
		if (this.str.length < 2) this.str = "0" + this.str;
		game.load.image('piece' + this.i, 'resources/sprites/pecas/' + this.str + '.png');
	}
	
	game.load.image('tile', 'resources/sprites/tile.png');
	game.load.image('point', 'resources/sprites/point.png');
	game.load.image('cenario', 'resources/sprites/cenario.png');
	
	game.load.atlasJSONHash('monstro', 'resources/sprites/monstro.png', 'resources/sprites/monstro.json');
	game.load.atlasJSONHash('acerto', 'resources/sprites/anima_acerto.png', 'resources/sprites/anima_acerto.json');

	/*
	game.load.atlasJSONHash('acerto', 'resources/sprites/anima_acerto.png', 'resources/sprites/anima_acerto.json');
    

	// MONSTRI IDLE
	for (this.i = 1; this.i <= 67; this.i++)
	{
		var str = this.i + "";
		if (str.length < 2) str = "0" + str;
		game.load.image('idle' + this.i, 'resources/sprites/monstro_idle/monstro_animado_novo00' + str + '.png');
	}
	
	// MONSTRO
	for (this.i = 1; this.i <= 57; this.i++)
	{
		var str = this.i + "";
		if (str.length < 2) str = "0" + str;
		game.load.image('suando' + this.i, 'resources/sprites/monstro_suando/monstro_suando_00' + str + '.png');
	}
	
	// MONSTRO COMENDO
	for (this.i = 0; this.i <= 76; this.i++)
	{
		var str = this.i + "";
		if (str.length < 2) str = "0" + str;
		game.load.image('comendo' + (this.i + 1), 'resources/sprites/montro_come_peca/monstro_come_peca_000' + str + '.png');
	}
	
	// MONSTRO MORRE
	for (this.i = 0; this.i <= 76; this.i++)
	{
		var str = this.i + "";
		if (str.length < 2) str = "0" + str;
		game.load.image('morrendo' + (this.i + 1), 'resources/sprites/monstro_morre/monstro_morre_000' + str + '.png');
	}
	*/
	
	
}

var RESOURCES_TO_LOAD = 49;
