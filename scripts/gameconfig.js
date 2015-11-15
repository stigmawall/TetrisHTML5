var TILE_SIZE = 64;
var TOTAL_ROWS = 11;
var TOTAL_COLS = 9;

var ACERTAR_SEMPRE = false;

var MIN_DISTANCE_TO_BE_NEAR = 22;

var BLOCKED_TILE = -1;
var EMPTY_TILE = -2;

var FINAL_POINTS = "";

var PIECE_CONFIG = 
[
	{id:1, scale:0.6, sprite:"piece1", points:
		[
			{ang:270, dist:0.5},
			{ang:90, dist:0.5}
		]
	},
	
	{id:2, scale:0.6, sprite:"piece2", points:
		[
			{ang:135, dist:0.739},
			{ang:224, dist:0.733},
			{ang:315, dist:0.715}
		]
	},
	
	{id:3, scale:0.6, sprite:"piece3", points:
		[
			{ang:90, dist:1.538},
			{ang:270, dist:1.538},
			{ang:270, dist:0.512},
			{ang:90, dist:0.513}
		]
	},
	
	{id:4, scale:0.6, sprite:"piece4", points:
		[
			{ang:180, dist:0.5},
			{ang:117.5, dist:1.1},
			{ang:65, dist:1.1},
			{ang:242, dist:1.14}
		]
	},
	
	{id:5, scale:0.6, sprite:"piece5", points:
		[
			{ang:334, dist:1.141},
			{ang:90, dist:0.502},
			{ang:206, dist:1.141},
			{ang:270, dist:0.501}
		]
	},
	
	{id:6, scale:0.6, sprite:"piece6", points:
		[
			{ang:179, dist:0.518},
			{ang:0, dist:0.510},
			{ang:296, dist:1.155},
			{ang:117, dist:1.143}
		]
	}
	
	,{id:7, scale:0.6, sprite:"piece7", points:[{ang:0, dist:0}]}
	
];

// =========== MAMUTE BASE ====================

var trace = function(){}
function enableTrace(enable)
{
	if (enable == true)
		trace = console.log.bind(console, "");
	else
		trace = function(){}
}

enableTrace(true);

var Mamute = {};
Mamute.debug = true;

Mamute.Object = function(){};
Mamute.Extends = function (d, b) {
    if (b == undefined) b = Mamute.Object;
	for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};


Mamute.invokeList = new Array();

function invoke(where, method, time)
{
	var inv = setTimeout(function () {where[method]()}, time * 1000.0);
	Mamute.invokeList.push(inv);
	return inv;
}

function cancelInvoke(inv)
{
	if (inv != undefined && inv != null)
	{
		clearTimeout(inv);
	}
	else
	{
		for (this.i = 0; this.i < Mamute.invokeList.length; this.i++)
		{
			if (Mamute.invokeList[this.i] != null && Mamute.invokeList[this.i] != undefined)
			{
				clearTimeout(Mamute.invokeList[i]);
			}
		}
	}
}


// ============================================


