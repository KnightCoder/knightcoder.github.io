;(function(angular) {
    'use strict';
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', 'templatesConst', mainCtrlFn]);
        function mainCtrlFn($scope,templatesConst){
            $scope.templates=templatesConst;
        };
})(window.angular);
