define([
    "jquery",
    "lodash"
], function ($, _) {

    var load = function(baseUrl, callback) {
        $.getJSON(baseUrl + "/guestAuth/app/rest/projects")
            .done(function(allData) {

                var groupPromises = _.map(allData.project, function(group) {
                    return $.getJSON(baseUrl + group.href);
                });

                $.when.apply($, groupPromises).done(function() {
                    var groupBuildTypes = _.map(arguments, function (arg)
                        {
                            return arg[0].buildTypes.buildType;
                        });
                    
                    var allBuildTypes = _.flatten(groupBuildTypes);
                    var sortedBuildTypes = _.sortBy(allBuildTypes, ["projectName", "name"]);
                    callback(sortedBuildTypes);
                });
            });
    }

    return {
        load: load
    };
});