define([], function () {
    require.config({
        baseUrl: "./",
        paths: {
            knockout: "lib/knockout",
            jquery: "lib/jquery.min"
        },
        map: {
          '*': { 'jquery': 'jquery-private' },
          'jquery-private': { 'jquery': 'jquery' }
        }
    });

    require([
        "knockout",
        "screen"
    ], function (ko, screen) {

        ko.applyBindings(screen);

    });
});