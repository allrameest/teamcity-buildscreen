define([
    "knockout",
    "jquery",
    "lodash",
    "project-loader",
    "build-updater"
], function (ko, $, _, projectLoader, buildUpdater) {

    return function(cfg) {

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

            $.getJSON(cfg.baseUrl + buildType.href)
                .done(function(x) {
                    buildUpdater(cfg.baseUrl + x.builds.href, model);
                });

            return model;
        }

        var compareProjects = function(left, right) {
            if (left.projectName() !== right.projectName()) {
                return left.projectName() < right.projectName() ? -1 : 1;
            }

            if (left.name() === right.name()) {
                return 0;
            }

            return left.name() < right.name() ? -1 : 1;
        }

        var pushBuildTypes = function(buildTypes) {
            _(buildTypes).forEach(function(bt) {
                var buildBox = createProject(bt);
                buildProjects.push(buildBox);
            });
            
            buildProjects.sort(compareProjects);
        }

        projectLoader.load(cfg, pushBuildTypes);

        return {
            buildProjects: buildProjects
        };
    }

});