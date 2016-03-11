define([], function () {
    'use strict';

    var ModalPasswordChangeController = function ($scope, $log, authService) {
        $scope.title = "Change password";
        $scope.pwdata = {};
        $scope.isValid = true;
        $scope.message = "";

        $scope.cancel = function () {
            $scope.close();
        };

        $scope.showErrorMessage = function (message) {
            //alert(message + '\nTry again.');
            $scope.isValid = false;
            $scope.message = message;
            document.getElementById("form-field-current").value = '';
            document.getElementById("form-field-new").value = '';
            document.getElementById("form-field-confirm").value = '';
        };

        $scope.save = function () {
            authService.updatePassword($scope.pwdata.current, $scope.pwdata.new, $scope.pwdata.confirm).then(
                function (result) {
                    $log.info(result);
                    $log.info(result.toString());
                    switch (result.toString()) {
                        case 'OK' :
                            $scope.close();
                            break;
                        case 'WRONGPASSWORD' :
                            $scope.showErrorMessage('Wrong password');
                            break;
                        case 'PASSWORDMISSMATCH' :
                            $scope.showErrorMessage('Password mismatch');
                            break;
                        case 'UPDATEERROR' :
                            $scope.showErrorMessage('Update error');
                            break;
                        default :
                            $scope.showErrorMessage('Unknown error');
                            break;
                    }
                }
            );
        };
    };
    ModalPasswordChangeController.$inject = ['$scope', '$log', 'authService'];

    return {
        Controller: ModalPasswordChangeController
    };

});
