app.factory('personFactory', function ($http, $resource) {
    return $resource('api/person/:id',
        { id: '@id' },
        { 'update': { method: 'PUT' } },
        { 'query': { method: 'GET', isArray: false } });
});