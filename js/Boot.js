var Space = {};
Space.Boot = function (game) {
};
Space.Boot.prototype = {
    preload: function () {

    },
    create: function () {
        this.state.start('Preloader');
    }
};