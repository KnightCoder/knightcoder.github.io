;
(function(angular) {
    'use strict';

    angular.module('myApp')
        .controller('DemoFileUploadController', ['$scope', '$http', 'urlsConst', 'accessTokensConst', DemoFileUploadControllerFn])
        .controller('FileDestroyController', ['$scope', '$http', FileDestroyControllerFn]);

    var url = "";

    function DemoFileUploadControllerFn($scope, $http, urlsConst, accessTokensConst) {
        var accessStr = ["?"];
        for(var i=0; i<accessTokensConst.videoUpload.length; i++){
            accessStr.push(accessTokensConst.videoUpload[i].key, "=", accessTokensConst.videoUpload[i].value, "&");
        }
        accessStr.pop();
        url = [urlsConst.videoUpload].concat(accessStr).join("");
        $scope.options = {
            url: url
        };
        $scope.loadingFiles = true;
        $http.post(url)
            .then(
                function(response) {
                    $scope.loadingFiles = false;
                    $scope.queue = response.data.files || [];
                },
                function() {
                    $scope.loadingFiles = false;
                }
            );
    };

    function FileDestroyControllerFn($scope, $http) {
        var file = $scope.file,
            state;
        if (file.url) {
            file.$state = function() {
                return state;
            };
            file.$destroy = function() {
                state = 'pending';
                return $http({
                    url: file.deleteUrl,
                    method: file.deleteType
                }).then(
                    function() {
                        state = 'resolved';
                        $scope.clear(file);
                    },
                    function() {
                        state = 'rejected';
                    }
                );
            };
        } else if (!file.$cancel && !file._index) {
            file.$cancel = function() {
                $scope.clear(file);
            };
        }
    };
})(window.angular);
