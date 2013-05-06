//the loading screen that will display while our assets load
Crafty.scene('loading', function () {
    //load takes an array of assets and a callback when complete
    Crafty.load(["images/mushroom-character.jpg"], function () {
        //Crafty.e('BlockType01').at(50,300);
        Crafty.scene("main"); //when everything is loaded, run the main scene
    });

    //black background with some loading text
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
        .text("Loading")
        .css({ "text-align": "center" });
});

Crafty.scene("main", function() {
    Crafty.e('Floor');
    Game.fillScene();
});