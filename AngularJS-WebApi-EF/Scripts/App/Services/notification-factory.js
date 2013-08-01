app.factory('notificationFactory', function () {
    return {
        success: function () {
            toastr.success("Success");
        },
        error: function (text) {
            toastr.error(text, "Error");
        }
    };
});