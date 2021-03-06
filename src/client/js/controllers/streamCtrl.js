app.controller('streamCtrl', function($scope, $http, $location, $sce) {

    let channel = $location.url();
    $scope.currentStream = [];

    $scope.audioStream = '';

    $scope.trustSrc = (src) => {
        return $sce.trustAsResourceUrl(src);
    };

    $http.get(`http://idietmoran.com/twitch/api/users${channel}`)
        .success((data) => {
            $scope.audioStream = data.url;
        })
        .error((data) => {
            console.error('got nothing');
        });


});
