Space.Game = function (game) {
    this.background = null;
    this.target_position = {};
    Space.structure_from_grid = {};
};
Space.Game.prototype = {
    create: function () {
        document.body.oncontextmenu = function () {
            return false;
        };
        Phaser.Canvas.setUserSelect(game.canvas, 'none');
        Phaser.Canvas.setTouchAction(game.canvas, 'none');

        game.world.setBounds(0, 0, 2500, 1600);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        var background = game.add.tileSprite(0, 0, 2500, 1600, 'background');
        background.inputEnabled = true;
        background.events.onInputDown.add(function (obj, background) {
            this.target_position.x = background.worldX;
            this.target_position.y = background.worldY;
        }, this);
        background.fixedToCamera = true;
        this.background = background;

        Space.myShip = MyShip;

//      Space.ship = this.add.sprite(400, 300, 'ship');
//
//
//      game.physics.arcade.enable(ship);
//
//      ship.body.collideWorldBounds = true;
//
//      ship.scale.setTo(0.05, 0.05);
//      ship.anchor.setTo(0.5, 0.5);

        createDrawingArea();
        createEventListeners();

        Space.structure_from_grid = resetData();
    },
    update: function () {
        var shots = Space.myShip.shots;
        for (var i in shots) {
            var bullet = shots[i].bullet;
            var target = shots[i].target;
            var cb = shots[i].cb;
            this.physics.arcade.collide(bullet, target, cb, null, this);
        }

        var distance = this.game.math.distance(Space.myShip.position.x, Space.myShip.position.y, this.target_position.x, this.target_position.y);
        if(distance < 1){
            Space.myShip.body.velocity.setTo(0, 0);
        }

        if (!game.camera.atLimit.x && Space.myShip.body.velocity) {
            this.background.tilePosition.x -= (Space.myShip.body.velocity.x * this.time.physicsElapsed);
        }

        if (!game.camera.atLimit.y && Space.myShip.body.velocity) {
            this.background.tilePosition.y -= (Space.myShip.body.velocity.y * this.time.physicsElapsed);
        }
    }
};