define([
    "jquery",
    "lodash",
    "project-filter"
], function ($, _, filter) {

    var load = function(cfg, callback) {
        $.getJSON(cfg.baseUrl + "/guestAuth/app/rest/projects")
            .done(function(allData) {

                var projects = filter.filterProjects(cfg, allData.project);

                console.log(projects);

                var groupPromises = _.map(projects, function(group) {
                    return $.getJSON(cfg.baseUrl + group.href);
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