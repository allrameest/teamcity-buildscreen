define([
    "knockout",
    "lodash",
    "project-config",
    "screen"
], function (ko, _, cfg, screen) {

    var screens = _.map(cfg.screens, function(screenConfig) {
        return screen(screenConfig);
    });

    return {
        screens: ko.observableArray(screens)
    };
});