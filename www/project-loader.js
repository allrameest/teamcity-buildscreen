define([
    "jquery",
    "lodash",
    "project-filter"
], function ($, _, filter) {

    var loadProject = function(cfg, callback, project)
    {
        $.getJSON(cfg.baseUrl + project.href)
            .done(function(projectData) {
                var projects = projectData.projects.project;

                _(projects).forEach(function(project) {
                    loadProject(cfg, callback, project);
                });

                var buildTypes = projectData.buildTypes.buildType;
                callback(buildTypes);
            });
    }

    var load = function(cfg, callback) {
        $.getJSON(cfg.baseUrl + "/guestAuth/app/rest/projects")
            .done(function(allData) {

                var projects = filter.filterProjects(cfg, allData.project);

                _(projects).forEach(function(project) {
                    loadProject(cfg, callback, project);
                });

            });
    }

    return {
        load: load
    };
});