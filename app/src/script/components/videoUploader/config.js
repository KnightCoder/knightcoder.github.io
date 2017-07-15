;
(function(angular) {
    'use strict';
    var appInfo = {
        version: '1.0.0'
    };

    angular.module('myApp')
        .config(['fileUploadProvider', configFn]);

    function configFn(fileUploadProvider) {
        fileUploadProvider.defaults.autoUpload = true;
    };
})(window.angular);
