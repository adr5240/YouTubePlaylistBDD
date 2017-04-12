angular.module('videos.model', [

])
    .service('VideosModel', function($http, $q) {
        let model = this,
            videos = [];
        const URL = {
            FETCH: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw'
        };

        model.getAllVideos = function() {
            let deferred = $q.defer();

            if(videos.length !== 0) {
                deferred.resolve(videos);
            } else {
                $http.get(URL.FETCH).then(function(videos) {
                    deferred.resolve(cacheAllVideos(videos));
                });
            }

            return deferred.promise;
        };

        function cacheAllVideos(videos) {
            videos = extractAll(videos);
            return videos;
        }

        function extractAll(videos) {
            return videos.data.items;
        }
    })
;
