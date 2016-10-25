/// <reference path="./index.ts" />
module HlightPaths {
    export var init = function(){
        var paths:any = {};
        paths.packageBase = plugins.path.resolve(__dirname);
        paths.dataDir = plugins.path.join(paths.packageBase,"data/");
        return paths;
    }
}
var paths = HlightPaths.init();