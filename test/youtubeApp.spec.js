var assert = chai.assert;
var expect = chai.expect;

describe("The YouTube App", function() {
    beforeEach(angular.mock.module('YouTubeApp'));

    beforeEach(function() {
        module("YouTubeApp");
        inject(function($injector) {
            videosModel = $injector.get("VideosModel");
            $controller = $injector.get("$controller");
            $httpBackend = $injector.get("$httpBackend");
            videosCtrl = $controller("VideosCtrl", { videosModel: videosModel });
        });
    });

    it('should have a VideosCtrl controller', function() {
        expect(videosCtrl.returnToVideos).to.be.a('function');
        expect(videosCtrl.videos).to.be.an('array');
    });

    it('should have a working VideosModel service', inject(['VideosModel',
        function(videosModel) {
            expect(videosModel.getAllVideos).to.be.a('function');
        }])
    );
});
