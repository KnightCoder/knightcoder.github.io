describe("Testing test", function() {
    it("Should be true", function() {
        expect(true).toBeTruthy();
    });
});

describe("Testing myApp", function() {
    var $controller, $rootScope;
    var templates = {
            main: "main.html"
        },
        accessTokens = {
            videoUpload: [{
                key: "access_token",
                value: "646eadbb60ba43f8aefe6af28668db328b3bbb16792e1e99c3ee307f97caad69"
            }, {
                key: "project_id",
                value: "332oy4bc5r"
            }]
        },
        urls = {
            videoUpload: 'https://upload.wistia.com'
        };

    beforeEach(angular.mock.module('myApp'));
    beforeEach(module('app/src/script/components/videoUploader/template.html'));

    // Inject the $controller service
    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    describe('Main Controller', function() {
        var mainCtrl, $scope = {};

        beforeEach(function() {
            $scope = $rootScope.$new();
            // Create an instance of our controller
            mainCtrl = $controller('mainCtrl', { $scope: $scope, templatesConst: templates });
        });

        // Verify our controller exists
        it('should be defined', function() {
            expect(mainCtrl).toBeDefined();
        });

        it('template URL should be defined', function() {
            expect($scope.templates.main).toBe(templates.main);
        });
    });

    describe('VideoUploader component', function() {
        var $componentController;
        var videoUploaderCompCtrl;
        var $scope = {};

        beforeEach(inject(function(_$componentController_) {
            $componentController = _$componentController_;
            $scope = $rootScope.$new();
        }));
        beforeEach(function() {
            // Create an instance of our controller
            videoUploaderCompCtrl = $componentController('videoUploader', { $scope: $scope, urlsConst: urls, accessTokensConst: accessTokens });
            eventEmitted = false;
        });
        it('To verify Wistia URL', function() {
            expect($scope.url).toBe([urls.videoUpload, "?", accessTokens.videoUpload[0].key, "=", accessTokens.videoUpload[0].value, "&", accessTokens.videoUpload[1].key, "=", accessTokens.videoUpload[1].value].join(""));
        });

        it('To verify fileuploadadd event', function() {
            var eventEmitted = false;
            $scope.$on("fileuploadadd", function() {
               eventEmitted = true;
            });
            $scope.$broadcast("fileuploadadd");
            expect(eventEmitted).toBe(true);
        });

        it('To verify fileuploadstart event', function() {
            var eventEmitted = false;
            $scope.$on("fileuploadstart", function() {
               eventEmitted = true;
            });
            $scope.$broadcast("fileuploadstart");
            expect(eventEmitted).toBe(true);
        });

        it('To verify fileuploaddone event', function() {
            var eventEmitted = false;
            $scope.$on("fileuploaddone", function() {
               eventEmitted = true;
            });
            $scope.$broadcast("fileuploaddone", {
                jqXHR:{
                    responseJSON:{
                        hashed_id:"hashID"
                    }
                }
            });
            expect(eventEmitted).toBe(true);
        });
        
        it('To verify videoClass on fileuploaddone event', function() {
            var eventEmitted = false;
            $scope.$on("fileuploaddone", function() {
               eventEmitted = true;
            });
            $scope.$broadcast("fileuploaddone", {
                jqXHR:{
                    responseJSON:{
                        hashed_id:"hashID"
                    }
                }
            });
            expect($scope.videoClass).toBe('wistia_async_hashID');
        });

        it('To verify fileuploadalways event', function() {
            var eventEmitted = false;
            $scope.$on("fileuploadalways", function() {
               eventEmitted = true;
            });
            $scope.$broadcast("fileuploadalways");
            expect(eventEmitted).toBe(true);
        });

        it('To verify fileuploadsubmit event', function() {
            var eventEmitted = false;
            $scope.$on("fileuploadsubmit", function() {
               eventEmitted = true;
            });
            $scope.$broadcast("fileuploadsubmit");
            expect(eventEmitted).toBe(true);
        });


        //run code to test
    });
});
