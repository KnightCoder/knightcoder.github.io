;
(function(angular) {
    'use strict';
    var appInfo = {
        version: '1.0.0'
    };

    angular.module('myApp', ['blueimp.fileupload'])
        .config(['$sceDelegateProvider', configSCEFn])
        .config(['$httpProvider', 'fileUploadProvider', configFn])
        .info(appInfo);

    function configSCEFn($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['self', "https://upload.wistia.com/**"]);
    };

    function configFn($httpProvider, fileUploadProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    };
})(window.angular);
