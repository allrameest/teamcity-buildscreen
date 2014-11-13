define([
	"lodash"
], function (_) {

	var filterProjects = function(cfg, projects) {
		if (cfg.showAll) return projects;
		return _.filter(projects, function(project) {
			return _.contains(cfg.projects, project.id);
		})
	}

    return {
        filterProjects: filterProjects
    };
});