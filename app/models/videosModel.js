angular.module('videos.model', [

])
    .service('VideosModel', function($http, $q, $stateParams, $sce) {
        let model = this,
            currentVideo;
        model.videos = [];
        const URL = {
            FETCH: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw'
        };

        model.getAllVideos = function() {
            let deferred = $q.defer();

            if(model.videos.length !== 0) {
                deferred.resolve(model.videos);
            } else {
                $http.get(URL.FETCH).then(function(videos) {
                    deferred.resolve(cacheAllVideos(videos));
                });
            }
            return deferred.promise;
        };

        model.getVideo = function() {
            return (currentVideo) ? $q.when(currentVideo) : getVideoById($stateParams.videoId);
        };

        model.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        function getVideoById(videoId) {
            let deferred = $q.defer();

            if(model.videos.length > 0) {
                deferred.resolve(findVideo(videoId));
            } else {
                model.getAllVideos().then(function() {
                    deferred.resolve(findVideo(videoId));
                });
            }

            return deferred.promise;
        }

        function findVideo(videoId) {
            if(model.videos) {
                for(let i = 0; i < model.videos.length; i++) {
                    if(model.videos[i].contentDetails.videoId === videoId) return model.videos[i];
                }
            }
        }

        function cacheAllVideos(videos) {
            model.videos = extractAll(videos);
            return model.videos;
        }

        function cacheVideo(result) {
            currentVideo = result;
            return currentVideo;
        }

        function extractAll(videos) {
            return videos.data.items;
        }
    })
;
