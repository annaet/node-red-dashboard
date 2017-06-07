/* global angular */
angular.module('ui').directive('uiVideo', ['$timeout', '$sce',
    function ($timeout, $sce) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/ui-video/ui-video.html',
            link: function(scope, element, attrs) {
                $timeout(function() {
                    var me = scope.$parent.me;
                    me.video = {};
                    me.video.config = {
                        preload: "none",
                        sources: [],
                        tracks: [],
                        theme: "vendor/videogular/dist/themes/default/videogular.css"
                    };

                    if (me.item.value) {
                      me.video.config.sources.push({
                        src: $sce.trustAsResourceUrl(me.item.value.src),
                        type: me.item.value.type
                      });
                    }

                    // When new values arrive, update the video source
                    scope.$watch('me.item.value', function (newValue) {
                        if (me.item.value) {
                          me.video.config.sources = [];
                          me.video.config.sources.push({
                            src: $sce.trustAsResourceUrl(me.item.value.src),
                            type: me.item.value.type
                          });
                        }
                    });
                }, 0);
            }
        }
    }
]);
