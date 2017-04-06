app.controller('channelsCtrl', ($scope, $http, $route) => {
    let channels = 'http://idietmoran.com/twitch/api/top/streams';

    $scope.streams = {};

    // $scope.reloadRoute = () => {
    //     $route.reload();
    // };

    $http.get(channels)
        .success((data) => {
            if(data.streams !== null) {
                $scope.streams = data.streams;
            }
        })
        .error((data) => {
            console.log('got nothing');
        });

});
