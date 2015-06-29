(function(){
    'use strict';
    var searchApp = angular.module('searchApp', []);
    searchApp.factory('dataFactory',['$http', function($http) {
        var url = {
            'search': '../../src/api/search.json'
        };
        var dataFactory = {};
        dataFactory.search = function() {
            return $http.get(url.search);
        };
        return dataFactory;
    }]);

    searchApp.controller('search',['$scope', 'dataFactory',
        function($scope, dataFactory) {
            var scope = $scope;
            scope.deleteKeyword = function(index) {
                scope.keyword.splice(index, 1)
            };
            function success(data, status) {
                scope.status = status;
                scope.data = data;
            }
            function error(data, status) {
                scope.data = data || 'Request failed';
                scope.status = status;
            }
            function fetch(cb) {
                dataFactory.search().
                    success(success).
                    error(error).then(function() {
                        if(cb) cb();
                    });
            }
            function renderKeyword() {
                scope.keyword = scope.data.response.search.keyword;
            }
            function renderList() {
                scope.list = scope.data.response.list;
            }
            fetch(function() {
                renderKeyword();
                renderList();
            });
        }
    ]);


})();
