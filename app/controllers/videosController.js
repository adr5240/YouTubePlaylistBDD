angular.module('videos', [
    'ui.router',
    'videos.model',
])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('main.videos', {
                url: '/',
                views: {
                    'videoDetails@': {
                        controller: 'VideosCtrl as videosCtrl',
                        templateUrl: 'templ/detail.tmpl.html'
                    },
                    'videoList@': {
                        controller: 'VideosCtrl as videosCtrl',
                        templateUrl: 'templ/list.tmpl.html'
                    }
                }
            });
        $stateProvider
            .state('main.videos.details', {
                url: 'videos/:videoId',
                views: {
                    'videoDetails@': {
                        controller: 'VideosCtrl as videosCtrl',
                        templateUrl: 'templ/detail.tmpl.html'
                    }
                }
            });
    }])

    .controller('VideosCtrl', function(VideosModel) {
        let videosCtrl = this;
        videosCtrl.videos = [];

        VideosModel.getAllVideos()
            .then(function(results) {
                cacheAllVideos(results);
            });

        function cacheAllVideos(videos) {
            videosCtrl.videos = videos;
        }

        videosCtrl.getAllVideos = VideosModel.getAllVideos;
    })
;
