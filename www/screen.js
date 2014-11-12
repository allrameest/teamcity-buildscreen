define([
    "knockout",
    "jquery",
    "lodash"
], function (ko, $, _) {

    var baseUrl = "http://miniproxy.apphb.com/jetbrains-teamcity";

    var BuildProject = function(data) {
        var self = this;
        self.name = data.name;
        self.projectName = data.projectName;
    }

    var buildProjects = ko.observableArray([]);

    var pushBuildTypes = function(buildTypes) {
        var sortedBuildTypes = _.sortBy(buildTypes, ["projectName", "name"]);

        _(sortedBuildTypes).forEach(function(bt) {
            buildProjects.push(new BuildProject(bt));
        });
    }

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
                pushBuildTypes(allBuildTypes);
            });
        });

    return {
        buildProjects: buildProjects
    };
});