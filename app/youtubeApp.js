angular.module('YouTubeApp', [
    'ui.router',
    'videos'
])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '',
                abstract: true
            })
        ;
        $urlRouterProvider.otherwise('/');
    }])
;
