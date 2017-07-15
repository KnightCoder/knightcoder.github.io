;(function(angular) {
    'use strict';
    angular.module('myApp')
        .service('name', ['', nameSvcFn]);

    function nameSvcFn() {};
})(window.angular);
