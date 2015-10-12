Space.Preloader = function(game){

};
Space.Preloader.prototype = {
    preload: function(){
        this.load.image('ship', 'imgs/RebelDreadnaught1.png');
        this.load.image('background', 'imgs/back1.jpg');
        this.load.image('bullet', 'imgs/bullet.png');
        this.load.image('enemy', 'imgs/RandomShips1/spshipsprite.png');
        this.load.image('block', 'imgs/block.png');
        this.load.image('block_', 'imgs/block_.png');
    },
    create: function(){
        game.state.start('Game');
    }
};