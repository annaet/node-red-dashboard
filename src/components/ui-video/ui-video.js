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

                    me.video.config = {
                        autoplay: me.item.autoplay,
                        controls: me.item.controls,
                        sources: [],
                        tracks: [],
                        theme: "vendor/videogular/dist/themes/default/videogular.css"
                    };
                    me.video.style = {
                        height: me.item.videoHeight
                    };
                    me.video.canPlay = function() {
                        if (me.video.config.autoplay) {
                            me.video.API.play();
                        }
                    }

                    if (me.item.value) {
                        me.video.config.sources.push({
                            src: $sce.trustAsResourceUrl(me.item.value.src),
                            type: me.item.value.type
                        });
                    }

                    var setVideo = function() {
                        me.video.config.sources = [];
                        me.video.config.sources.push({
                            src: $sce.trustAsResourceUrl(me.item.value.src),
                            type: me.item.value.type
                        });
                    };

                    // When new values arrive, update the video source
                    scope.$watch('me.item.value', function (newValue) {
                        if (me.item.value) {
                            if (me.item.value.src && me.item.value.type) {
                                setVideo();
                            }

                            if (typeof me.item.value.autoplay === 'boolean') {
                                me.video.config.autoplay = me.item.value.autoplay;
                            }

                            if (typeof me.item.value.controls === 'boolean') {
                                me.video.config.controls = me.item.value.controls;
                            }
                        }
                    });
                }, 0);
            }
        }
    }
]);
