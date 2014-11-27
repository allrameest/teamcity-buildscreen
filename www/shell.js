define([
    "knockout",
    "lodash",
    "project-config",
    "screen"
], function (ko, _, cfg, screen) {

    var screens = _.map(cfg.screens, function(screenConfig) {
        return screen(screenConfig);
    });

    for (var i = 0; i < screens.length; i++)
    {
        screens[i].setNext(screens[(i+1)%screens.length]);
    }

    screens[0].activate();

    return {
        screens: ko.observableArray(screens)
    };
});