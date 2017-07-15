;
(function(angular) {
    'use strict';

    angular.module('myApp')
        .component('videoUploader', {
            templateUrl: 'src/script/components/videoUploader/template.html',
            controller: ['$scope', '$http', 'urlsConst', 'accessTokensConst', 'fileUpload', videoUploaderCompCtrlFn]
        });

    function videoUploaderCompCtrlFn($scope, $http, urlsConst, accessTokensConst, fileUpload) {
        var accessStr = ["?"];
        for(var i=0; i<accessTokensConst.videoUpload.length; i++){
            accessStr.push(accessTokensConst.videoUpload[i].key, "=", accessTokensConst.videoUpload[i].value, "&");
        }
        accessStr.pop();
        $scope.url = [urlsConst.videoUpload].concat(accessStr).join("");

        $scope.uploadedVideoIds = [];
        $scope.$on('fileuploadadd', fileuploadaddFn);
        $scope.$on('fileuploadstart', fileuploadstartFn);
        $scope.$on('fileuploaddone',fileuploaddoneFn);
        $scope.$on('fileuploadalways', fileuploadalwaysFn);
        $scope.$on('fileuploadsubmit', fileuploadsubmitFn);

        function fileuploadaddFn(e, data) {
            if(e && e.targetScope){
                if(e.targetScope.cancel){
                    e.targetScope.cancel();
                }
                if(e.targetScope.queue){
                    e.targetScope.queue = [];
                }
            }
            replacePlayer();
        };
        function fileuploadstartFn(e, data) {
            replacePlayer();
        };
        function fileuploaddoneFn(e, data) {
            window._wq = window._wq || [];
            _wq.push({ id: "data.jqXHR.responseJSON.hashed_id", onReady: function(video) {
            }});
            $scope.uploadedVideoIds.push(data.jqXHR.responseJSON.hashed_id);
            $scope.videoClass = "wistia_async_"+data.jqXHR.responseJSON.hashed_id;
            replacePlayer(data.jqXHR.responseJSON.hashed_id);
        };
        function fileuploadalwaysFn(e,data){
            $scope.uploading = false;
        };
        function fileuploadsubmitFn(e,data){
            $scope.uploading = true;
        };
        function replacePlayer(hId){
            if($scope.uploadedVideoIds.length){
                var apiObj, id;
                id = $scope.uploadedVideoIds.pop();
                if(id){
                    apiObj = Wistia.api(id);
                    if(apiObj){
                        if(hId){
                            apiObj.replaceWith(hId);
                        }else{
                            apiObj.remove();
                        }
                    }else{
                        apiObj = Wistia.api();
                        if(apiObj){
                            if(hId){
                                apiObj.replaceWith(hId);
                            }else{
                                apiObj.remove();
                            }
                        }
                    }
                }
            }
        };
    };
})(window.angular);
