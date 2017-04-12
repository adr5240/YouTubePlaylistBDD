var assert = chai.assert;
var expect = chai.expect;

describe("The Videos Controller", function() {

    beforeEach(function() {
        module("videos");
        inject(function($injector) {
            videosModel = $injector.get("VideosModel");
            $controller = $injector.get("$controller");
            $httpBackend = $injector.get("$httpBackend");
            videosCtrl = $controller("VideosCtrl");
            $state = $injector.get("$state");
        });
        $httpBackend.expectGET("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw")
            .respond(200, []);
    });

    it("should have a videos property, inits as an array", function() {
        assert.isArray(videosCtrl.videos);
    });

    it("should make http request for videos if empty", function() {
        $httpBackend.expectGET("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw")
            .respond(200, []);
        $httpBackend.flush();
    });

    describe("the return to videos function", function() {
        xit("should reset videosCtrl.currentVideo to undefined", function($state) {
            videosCtrl.currentVideo = {};

            expect($state).to.respondTo('go');
            videosCtrl.returnToVideos();
            expect(videosCtrl.currentVideo).to.be.an("undefined");
        });
    });

});
