/// <reference path="./index.ts" />
module HlightPlugins {
    export var init = function(){
        var plugins = {
            path: require("path")
        }
        return plugins;
    }
}
var plugins = HlightPlugins.init();