app.directive('crudGrid', function () {
    return {
        restrict: 'A',
        replace: false,
        scope: true,
        templateUrl: '/Scripts/App/Directives/Templates/crud-grid-directive-template.html',
        controller: ['$scope', '$element', '$attrs', 'crudGridDataFactory', 'notificationFactory',
            function ($scope, $element, $attrs, crudGridDataFactory, notificationFactory) {
                $scope.objects = [];
                $scope.lookups = [];
                $scope.object = {};
                $scope.columns = angular.fromJson($attrs.columns);
                $scope.addMode = false;
                $scope.orderBy = { field: 'Name', asc: true };
                $scope.loading = true;
                $scope.filter = '';

                var $docScope = angular.element(document).scope();

                $scope.setLookupData = function () {
                    for (var i = 0; i < $scope.columns.length; i++) {
                        var c = $scope.columns[i];
                        if (c.lookup && !$scope.hasLookupData(c.lookup.table)) {
                            crudGridDataFactory(c.lookup.table).query(function (data) {
                                $scope.setIndividualLookupData(c.lookup.table, data);
                            });
                        }
                    }
                };

                $scope.resetLookupData = function(table) {
                    $scope.setIndividualLookupData(table, {});
                    $scope.setLookupData();
                };

                $scope.getLookupData = function (table) {
                    return typeof table == 'undefined' ? null : $scope.lookups[table.toLowerCase()];
                };

                $scope.setIndividualLookupData = function (table, data) {
                    $scope.lookups[table.toLowerCase()] = data;
                };

                $scope.hasLookupData = function (table) {                    
                    return !$.isEmptyObject($scope.getLookupData(table));
                };

                $scope.getLookupValue = function (lookup, key) {
                    var data = $scope.getLookupData(lookup.table);

                    if (typeof data != 'undefined') {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i][lookup.key] === key)
                                return data[i][lookup.value];
                        }
                    }

                    return '';
                };

                $scope.toggleAddMode = function () {
                    $scope.addMode = !$scope.addMode;
                    $scope.object = {};
                };

                $scope.toggleEditMode = function (object) {
                    object.editMode = !object.editMode;
                };

                var successCallback = function (e, cb) {
                    notificationFactory.success();
                    $docScope.$broadcast('lookupDataChange', [$attrs.table]);
                    $scope.getData(cb);
                };

                var successPostCallback = function (e) {
                    successCallback(e, function () {
                        $scope.toggleAddMode();
                    });
                };

                $scope.$on('lookupDataChange', function (scope, table) {
                    $scope.resetLookupData(table[0]);
                });

                var errorCallback = function (e) {
                    notificationFactory.error(e.data.ExceptionMessage);
                };

                $scope.addObject = function () {
                    crudGridDataFactory($attrs.table).save($scope.object, successPostCallback, errorCallback);
                };

                $scope.deleteObject = function (object) {
                    crudGridDataFactory($attrs.table).delete({ id: object.Id }, successCallback, errorCallback);
                };

                $scope.updateObject = function (object) {
                    crudGridDataFactory($attrs.table).update({ id: object.Id }, object, successCallback, errorCallback);
                };

                $scope.getData = function (cb) {

                    crudGridDataFactory($attrs.table).query(function (data) {
                        $scope.objects = data;
                        if (cb) cb();
                    });
                };

                $scope.setOrderBy = function (field) {
                    var asc = $scope.orderBy.field === field ? !$scope.orderBy.asc : true;
                    $scope.orderBy = { field: field, asc: asc };
                };

                $scope.getData(
                    function () {
                        $scope.setLookupData();
                        $scope.loading = false;
                    });
            }]
    };
});