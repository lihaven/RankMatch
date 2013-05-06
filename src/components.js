Crafty.c('Block', {
    init: function() {
        this.requires('2D, Color, Canvas, Mouse, Text');
        this.w = 20;
        this.h = 20;
        this.text("0");
        this.aryX;
        this.aryY;
        this.bind('MouseUp', this.onClick);
        //this.enableDrag(); //Here as a note to myself that I might want this later
    },

    at: function(x, y) {
        this.aryX = x;
        this.aryY = y;
        Game.grid.array[x][y] = this;
        this.x = x*(Game.block.w + Game.block.padding)+15; //15=left padding
        this.y = Game.window.h-40-(y*(Game.block.h + Game.block.padding)); //40=floor height+padding
        return this;
    },

    onClick: function() {
        if ( (Game.active.one != null) && (Game.active.one == this) ){
            this.deactivate();
        } else if ( (Game.active.one != null) && (Game.active.one != this) ) {
            this.swapWithActive();
            this.deactivate();
            Game.refreshScene();
        } else {
            console.log("[" + this.aryX + "][" + this.aryY + "]" + " " + this.color());
            console.log(this);
            this.setActive();
            }
    },

    rankUp: function () {
        var rank = parseInt(this.text());
        rank++;
        this.text(rank.toString());
    },

    getColorByType: function(type) {
         return Game.block.color1[type];
    },

    setColor1: function() {
        this.color(Game.block.color1[this.type]);
    },

    setType: function(type) {
        this.type = type;
        this.setColor1();
        return this;
    },

    setActive: function () {
        this.color("#FF0066");
        Game.active.one = this;
    },

    swapWithActive: function () {
        var tempType = Game.active.one.type;
        Game.active.one.setType(this.type).setColor1();
        this.setType(tempType).setColor1();
    },

    deactivate: function () {
        this.color(this.getColorByType(this.type));
        Game.clearActive();
    }
});

Crafty.c('Floor', {
    init: function() {
        this.requires('2D, Collision, Color, Canvas, Solid');
        this.color('grey');
        this.w = 400;
        this.h = 10;
        this.x = 0;
        this.y = 390;
    }
});



