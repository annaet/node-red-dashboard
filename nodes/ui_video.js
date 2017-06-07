module.exports = function(RED) {
    var ui = require('../ui')(RED);

    function VideoNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var group = RED.nodes.getNode(config.group);
        if (!group) { return; }
        var tab = RED.nodes.getNode(group.config.tab);
        if (!tab) { return; }

        var options = {
            emitOnlyNewValues: false,
            node: node,
            tab: tab,
            group: group,
            control: {
                type: 'video',
                label: config.label,
                order: config.order,
                width: config.width || group.config.width || 6,
                height: config.height || 1,
                videoHeight: config.videoHeight,
                autoplay: config.autoplay,
                controls: config.controls
            }
        };

        var done = ui.add(options);

        node.on("close", done);
    }
    RED.nodes.registerType("ui_video", VideoNode);
};
