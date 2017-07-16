;
(function(angular) {
    'use strict';
    var templates = {
            main: "src/script/app/templates/main.html"
        },
        accessTokens = {
            videoUpload: [{
                key: "access_token",
                value: "646eadbb60ba43f8aefe6af28668db328b3bbb16792e1e99c3ee307f97caad69"
            }, {
                key: "project_id",
                value: "332oy4bc5r"
            }]
        },
        urls = {
            videoUpload: 'https://upload.wistia.com'
        };

    angular.module('myApp')
        .constant('templatesConst', templates)
        .constant('urlsConst', urls)
        .constant('accessTokensConst', accessTokens);
})(window.angular);
