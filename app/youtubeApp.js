angular.module('YouTubeApp', [
    'ui.router',
    'videos'
])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '',
                abstract: true
            })
        ;
        $urlRouterProvider.otherwise('/');
    })
;
