define(["jquery"], function ($) {
    var audioCache = {};

    var getAudio = function(url) {
        var audio = audioCache[url];
        if (audio === undefined)
        {
            audio = new Audio(url);
            audioCache[url] = audio;
        }
        return audio;
    };

    return function(cfg) {
        if (!cfg.sound) {
            return {
                notify: function(){}
            }
        }

        var audio = getAudio(cfg.sound);

        return {
            notify: function() {
                console.log(audio);
                audio.play();
            }
        };
    };
});