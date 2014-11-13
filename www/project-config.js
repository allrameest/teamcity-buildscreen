define([], function () {
    return {
        screens: [
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
            }
        ]
    };
});