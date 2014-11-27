define(["jquery"], function ($) {
    return function(buildUrl, model, buildFailedNotify) {

        var previousBuildId = "";

        var update = function() {
            $.getJSON(buildUrl).done(function(builds) {
                if (builds.build !== undefined)
                {
                    var lastBuild = builds.build[0];
                    var success = lastBuild.status === "SUCCESS";
                    model.failed(!success);

                    if (!success && previousBuildId !== lastBuild.id)
                    {
                        buildFailedNotify();
                    }
                }
                else
                {
                    model.failed(null);
                }

                previousBuildId = lastBuild.id;
                setTimeout(update, 5000);
            });
        }

        update();
        
    };
});