var SpacePhysics = {
    spawnMyShip: function (structure) {
        var ship_position;
        var ship_structure = structure;
        var group = game.add.group();
        var x = 600, y = 300;
        var offset_y, offset_x;
        var side = 15;
        group.x = x;
        group.y = y;
        group.pivot.x = x + ship_structure.length / 2 * side;
        group.pivot.y = y + ship_structure[0].length / 2 * side;
        for (var i in ship_structure) {
            var raw = ship_structure[i];
            for (var j in raw) {
                var cell = raw[j];
                if (cell) {
                    offset_x = side * j;
                    offset_y = side * i;
                    var block_sprite = group.create(x + side * j, y + side * i, 'block_');
                }
            }
        }
        game.physics.arcade.enable(group);
        group.enableBody = true;
        group.physicsBodyType = Phaser.Physics.ARCADE;
        game.camera.follow(group);
//        game.input.onDown.add(function (pointer) {
//            if (pointer.rightButton.isDown) {
//                this.fire('bullet', group, enemy_cubes);
//            }
//            else {
//                this.rotationToPointer(group);
//                this.moveGroup(group, 100);
//            }
//
//        }, this);
        return group;
    },
    spawnShip: function (structure) {
        var ship_position;
        var cubes = [];
        var group = game.add.group();
        var x = 800, y = 300;
        var offset_y, offset_x;
        var side = 15;
        group.x = x;
        group.y = y;
        group.pivot.x = x + structure.length / 2 * side;
        group.pivot.y = y + structure[0].length / 2 * side;
        for (var i in structure) {
            var raw = structure[i];
            for (var j in raw) {
                var cell = raw[j];
                if (cell) {
                    offset_x = side * j;
                    offset_y = side * i;
                    var block_sprite = group.create(x + side * j, y + side * i, 'block_');
                    cubes.push(block_sprite);
                    game.physics.enable(block_sprite, Phaser.Physics.ARCADE);
                    block_sprite.enableBody = true;
                }
            }
        }
        game.physics.arcade.enable(group);
        group.enableBody = true;
        group.physicsBodyType = Phaser.Physics.ARCADE;
        return cubes;
    },
    fire: function (bullet, ship, target) {
        var bullet = game.add.sprite(-100, -100, bullet);
        bullet.anchor.setTo(0.5, 0.5);

        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.enableBody = true;

        Space.myShip.shots.push({bullet: bullet, target: target, cb: hit_enemy});

        bullet.position.x = ship.position.x;
        bullet.position.y = ship.position.y;
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);

        var x = game.input.position.x;
        var y = game.input.position.y;

        this.moveTo(bullet, x, y, 500);
    },
    moveTo: function (obj, x, y, velocity) {
        if (!velocity)
            velocity = 200;
//        game.camera.follow(obj);
//        var x = obj.offset_x ? game.input.position.x + obj.offset_x : game.input.position.x;
//        var y = obj.offset_y ? game.input.position.y + obj.offset_y : game.input.position.y;
        game.physics.arcade.moveToXY(obj, x, y, velocity);
//        game.physics.arcade.moveToPointer(obj, velocity);
    },
    rotationToPointer: function (obj) {
        obj.rotation = game.physics.arcade.angleToPointer(obj);
        obj.angle += 90;
    },
    moveGroup: function (group, velocity) {
        // TODO: kill temp_obj
        var temp_obj = game.add.sprite(group.x, group.y, 'block');
        game.physics.enable(temp_obj, Phaser.Physics.ARCADE);
        temp_obj.enableBody = true;
        temp_obj.visible = false;
        temp_obj.width = 300;
        temp_obj.height = 300;
        group.position = temp_obj.position;
        game.physics.arcade.moveToPointer(temp_obj, velocity);
        return temp_obj;
    }
};