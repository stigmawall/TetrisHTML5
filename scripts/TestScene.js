/// <reference path="phaser/typescript/phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var QuedaLivre;
(function (QuedaLivre) {
    var TestScene = (function (_super) {
        __extends(TestScene, _super);
        function TestScene() {
            _super.apply(this, arguments);
        }
        
        
// ===========================================================
        
        
        
        TestScene.prototype.preload = function () 
        {
           
        };
        
        
        
        TestScene.prototype.create = function () 
        {  
           trace("TestScene");
           
           
        };
        
        TestScene.prototype.update = function () 
        {
            
        };
        
        
        
        
 // ===========================================================      
        
        
        
        
        
        
        
        
        
        return TestScene;
    })(Phaser.State);
    QuedaLivre.TestScene = TestScene;
})(QuedaLivre || (QuedaLivre = {}));
