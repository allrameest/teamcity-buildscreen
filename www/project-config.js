define([], function () {
    return {
        screens: [
            {
                baseUrl: "http://localhost:49738",
                showAll: true,
                projects: [],
                sound: "sounds/dramatic-chipmunk.mp3"
            },
            {
                baseUrl: "http://109.239.237.98:100",
                showAll: true,
                projects: [],
                sound: "sounds/pacman.mp3"
            }
            /*,
            
            {
                baseUrl: "http://miniproxy.apphb.com/jetbrains-teamcity",
                showAll: false,
                projects: [
                    "NetCommunityProjects",
                    "ApacheAnt",
                    "Haskell",
                    "AmazonApiClient",
                    "NUnit"
                ]
            },
            {
                baseUrl: "http://miniproxy.apphb.com/codebetter-teamcity",
                showAll: false,
                projects: [
                    "Less",
                    "NHaml",
                    "NHibernate"
                ]
            }*/
        ]
    };
});