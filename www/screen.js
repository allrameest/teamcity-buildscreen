define([
    "knockout",
    "jquery"
], function (ko, $) {

    var baseUrl = "http://miniproxy.apphb.com/jetbrains-teamcity";

    var BuildProject = function(data) {
        var self = this;
        console.log(data.name);
        self.name = data.name;
        self.projectName = data.projectName;
    }

    var buildProjects = ko.observableArray([]);

    $.getJSON(baseUrl + "/guestAuth/app/rest/projects", function(allData) {
        for (var i = 0; i < allData.project.length; i++) {
            var group = allData.project[i];
            $.getJSON(baseUrl + group.href, function(projectData) {
                var buildTypes = projectData.buildTypes.buildType;
                for (var j = 0; j < buildTypes.length; j++) {
                    console.log(buildTypes[j]);
                    buildProjects.push(new BuildProject(buildTypes[j]));
                };
            });
        }
    });

    return {
        buildProjects: buildProjects
    };
});