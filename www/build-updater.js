define(["jquery"], function ($) {
    return function(buildUrl, model) {

        var update = function() {
            $.getJSON(buildUrl).done(function(builds) {
                if (builds.build !== undefined)
                {
                    var lastBuild = builds.build[0];
                    var success = lastBuild.status === "SUCCESS";
                    model.failed(!success);
                }
                else
                {
                    model.failed(null);
                }

                setTimeout(update, 20000);
            });
        }

        update();
        
    };
});