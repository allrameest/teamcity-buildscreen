var baseUrl = "teamcity-api";

function BuildProject(data) {
    var self = this;
    console.log(data.name);
    self.name = data.name;
    self.projectName = data.projectName;
}

function BuildProjectsViewModel() {
    var self = this;

    self.buildProjects = ko.observableArray([]);

    $.getJSON(baseUrl + "/guestAuth/app/rest/projects", function(allData) {
    	for (var i = 0; i < allData.project.length; i++) {
    		var group = allData.project[i];
    		$.getJSON(baseUrl + group.href, function(projectData) {
    			var buildTypes = projectData.buildTypes.buildType;
    			for (var j = 0; j < buildTypes.length; j++) {
    				console.log(buildTypes[j]);
		        	self.buildProjects.push(new BuildProject(buildTypes[j]));
		        };
    		});
    	}
    });  
}

ko.applyBindings(new BuildProjectsViewModel());