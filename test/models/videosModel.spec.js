var assert = chai.assert;
var expect = chai.expect;

describe("The Videos Model", function() {

    beforeEach(function() {
        module("videos");
        inject(function($injector) {
            videosModel = $injector.get("VideosModel");
            $controller = $injector.get("$controller");
            videosCtrl = $controller("VideosCtrl", {
                videosModel: videosModel
            });
        });
    });

    describe("getAllVideos function", function() {
        it("should return a promise", function() {
            result = videosModel.getAllVideos();
            expect(videosModel.getAllVideos().then).to.not.throw(Error);
        });
    });

    describe("getVideo function", function() {
        it("should return a promise", function() {
            result = videosModel.getVideo();
            expect(videosModel.getVideo().then).to.not.throw(Error);
        });
    });
});
