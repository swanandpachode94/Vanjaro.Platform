﻿app.controller('setting_savetemplateas', function ($scope, $attrs, $http, CommonSvc, SweetAlert) {
    var common = CommonSvc.getData($scope);
    //Init Scope
    $scope.onInit = function () {
        $('.VjName').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                event.preventDefault();
            }
        });
    };

    $scope.openIconPopup = function () {
        if ($(window.parent.document.body).find('.modal-body iframe').length < 2)
            window.parent.OpenPopUp(null, 700, 'right', 'Select Icon', window.parent.CurrentExtTabUrl + '&guid=85682cd1-d5fd-4611-b252-3bc1972545a0&ignoregj=true#!/setting', '', '', false);
    };

    $scope.Click_Save = function (type) {
        if (mnValidationService.DoValidationAndSubmit('', 'setting_savetemplateas')) {
            var s = new XMLSerializer();
            var str = s.serializeToString($(window.document.body).contents().find('svg')[0]);
            var data = { Icon: str };
            common.webApi.post('pages/savelayoutas', 'pid=' + parseInt($scope.ui.data.PID.Value) + '&name=' + $scope.ui.data.Name.Value, data).then(function (data) {
                if (data.data.IsSuccess) {
                    window.parent.ShowNotification($scope.ui.data.Name.Value, '[L:LayoutCreatedSuccess]', 'success');
                    $(window.parent.document.body).find('[data-bs-dismiss="modal"]').click();
                }
                else {
                    window.parent.ShowNotification('', data.data.Message, 'error');
                }
            });
        };
    };
});