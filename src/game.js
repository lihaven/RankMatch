Game = {
    window: {
        w: 400,
        h: 400
    },

    block: {
        w: 15,
        h: 15,
        padding: 9,     // blue       red      green     white     purple    orange
        color1: new Array("#0066CC","#993333","#8C9522","#F4E4C6","#52438E","#C97C31"),
    },

    grid: {
        w: 6,
        h: 6,
        array: new Array(),

        init: function () {
            for (i=0; i < Game.grid.w; i++) {
                this.array.push(new Array(this.w));
            }
        }
    },

    active: {
        one: null,
        two: null
    },

    clean: true,
    debug: true,

    init: function() {
        this.grid.init();
        Crafty.init(this.window.w, this.window.h);
        Crafty.background("grey");
        Crafty.scene('loading');
    },

    fillScene: function(){
        this.forEachBlock(this.createBlock);

        this.clean = false;
        while (this.clean == false) {
            if (Game.debug) {console.log("Frame " +Crafty.frame());}
            this.forEachBlock(this.evaluateForMatch);
            this.forEachBlock(this.fillEmpty);
            Game.isClean();
        }

    },

    refreshScene: function () {
        this.clean = false;
        while (this.clean == false) {
            if (Game.debug) {console.log("Frame " +Crafty.frame());}
            this.forEachBlock(this.evaluateForMatch);
            this.forEachBlock(this.fillEmpty);
            Game.isClean();
        }
    },

    forEachBlock: function(action) {
        for (var x = 0; x < this.grid.w; x++) { //x
            for (var y = 0; y < this.grid.h; y++) { //y
                action(x, y);
            }
        }
    },

    clearActive: function() {
        this.active.one = null;
        this.active.two = null;
    },

    createBlock: function(x, y) {
        var type = Math.floor(Math.random() * Game.block.color1.length);
        Crafty.e('Block').setType(type).at(x, y);
    },
    /*
    Check if a block has a match
     */
    evaluateForMatch: function (x, y) {
        var lblock = null; //left
        var rblock = null; //right
        var bblock = null; //bottom
        var tblock = null; //top
        var thisblock = Game.grid.array[x][y];

        if (x-1 >= 0)          { lblock = Game.grid.array[x-1][y]; }
        if (x+1 < Game.grid.w) { rblock = Game.grid.array[x+1][y]; }
        if (y-1 >= 0)          { bblock = Game.grid.array[x][y-1]; }
        if (y+1 < Game.grid.h) { tblock = Game.grid.array[x][y+1]; }

        Game.checkMatch(lblock, thisblock, rblock);
        Game.checkMatch(bblock, thisblock, tblock);
    },

    checkMatch: function (b1, b2, b3) {
        if (Game.setHasNoNulls(b1, b2, b3) && Game.setHasEqualTypes(b1, b2, b3)) {
            if (Game.setHasEqualRanks(b1, b2, b3)) {
                Game.rankUpBlock(b2)
            }
            Game.deleteBlock(b1);
            Game.deleteBlock(b3);
        }
    },

    deleteBlock: function (block) {
        var x = block.aryX;
        var y = block.aryY;
        block.destroy();
        if (Game.debug) {console.log("removing " + x + ", " + y);}
        Game.grid.array[x][y] = null;

    },

    setHasEqualRanks: function (b1, b2, b3) {
        if ( (b1.text() == b2.text()) && (b2.text() == b3.text()) && (b3.text() == b1.text()) ) {
            return true;
        }
    },

    rankUpBlock: function (block) {
        block.rankUp();
    },

    setHasNoNulls: function (b1, b2, b3) {
        if ( (b1 != null) && (b2 != null) && (b3 != null) ) {
            return true;
        }
        return false;
    },

    setHasEqualTypes: function (b1, b2, b3) {
        if ( (b1.type == b2.type) && (b2.type == b3.type) && (b3.type == b1.type) ) {
            return true;
        }
        return false;
    },

    isClean: function () {
        this.clean = true;
        this.forEachBlock(function (x,y) {
             if (Game.grid.array[x][y] == null) {
                 this.clean = false;
             }
        });
    },

    fillEmpty: function (x, y) {
        if (Game.grid.array[x][y] == null) {
            var n = 0;
            while (Game.grid.array[x][y] == null && (y+n < Game.grid.h)) {
                n++;

                if (Game.grid.array[x][y+n] != null) {
                    Game.moveBlock(n, x, y);
                }

                if (y+n >= Game.grid.h) {
                    if (Game.debug) {console.log("creating at " + x + ", " + y + "; because y+n is " + (y+n));}
                    Game.createBlock(x, y);
                }
            }
        }
    },

    moveBlock: function (n, x, y) {
        if (Game.debug) {console.log("moving to " + x + ", " + y);}
        Game.grid.array[x][y+n].at(x, y);
        Game.grid.array[x][y+n] = null;
    }
};


Game.init();
Crafty.e



