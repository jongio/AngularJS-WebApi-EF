app.directive('crudGrid', function () {
    return {
        restrict: 'A',
        replace: false,
        templateUrl: '/Scripts/App/Directives/Templates/crud-grid-directive-template.html',
        controller: function ($scope, personFactory, notificationFactory) {
            $scope.people = [];
            $scope.addMode = false;

            $scope.toggleAddMode = function () {
                $scope.addMode = !$scope.addMode;
            };

            $scope.toggleEditMode = function (person) {
                person.editMode = !person.editMode;
            };

            var successCallback = function (e, cb) {
                notificationFactory.success();
                $scope.getPeople(cb);
            };

            var successPostCallback = function (e) {
                successCallback(e, function () {
                    $scope.toggleAddMode();
                    $scope.person = {};
                });
            };

            var errorCallback = function (e) {
                notificationFactory.error(e.data.Message);
            };

            $scope.addPerson = function () {
                personFactory.save($scope.person, successPostCallback, errorCallback);
            };

            $scope.deletePerson = function (person) {
                personFactory.delete({ id: person.Id }, successCallback, errorCallback);
            };

            $scope.updatePerson = function (person) {
                personFactory.update({ id: person.Id }, person, successCallback, errorCallback);
            };

            $scope.getPeople = function (cb) {
                personFactory.query(function (data) {
                    $scope.people = data;
                    if (cb) cb();
                });
            };
            $scope.getPeople();
        }
    }
});