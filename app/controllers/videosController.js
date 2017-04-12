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

    .controller('VideosCtrl', function($state, VideosModel) {
        let videosCtrl = this;

        videosCtrl.videos = [];

        VideosModel.getAllVideos()
            .then(function(results) {
                videosCtrl.videos = results;
            });

        VideosModel.getVideo()
            .then(function(result) {
                videosCtrl.currentVideo = result;
                if(videosCtrl.currentVideo) {
                    videosCtrl.currentVideo.url = "https://www.youtube.com/embed/" + result.contentDetails.videoId;
                }
            });

        function checkListView() {
            return $state.current.name === 'main.videos';
        }

        function returnToVideos() {
            videosCtrl.currentVideo = undefined;

            $state.go('main.videos', {

            });
        }
        
        videosCtrl.trustSrc = VideosModel.trustSrc;
        videosCtrl.returnToVideos = returnToVideos;
        videosCtrl.checkListView = checkListView;
    })
;
