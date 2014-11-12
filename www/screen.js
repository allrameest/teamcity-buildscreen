define([
    "knockout",
    "jquery",
    "lodash",
    "project-loader",
    "build-updater"
], function (ko, $, _, projectLoader, buildUpdater) {

    var baseUrl = "http://miniproxy.apphb.com/jetbrains-teamcity";

    var buildProjects = ko.observableArray([]);

    var createProject = function(buildType) {
        var model = {
            name: ko.observable(buildType.name),
            projectName: ko.observable(buildType.projectName),
            failed: ko.observable(null)
        }
        model.buildStatus = ko.pureComputed(function() {
            if (this.failed() === true) return "failed";
            if (this.failed() === false) return "successful";
            return null;
        }, model);

        $.getJSON(baseUrl + buildType.href)
            .done(function(x) {
                buildUpdater(baseUrl + x.builds.href, model);
            });

        return model;
    }

    var pushBuildTypes = function(buildTypes) {
        _(buildTypes).forEach(function(bt) {
            buildProjects.push(createProject(bt));
        });
    }

    projectLoader.load(baseUrl, pushBuildTypes);

    return {
        buildProjects: buildProjects
    };
});