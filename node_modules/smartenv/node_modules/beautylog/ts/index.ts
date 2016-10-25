/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./beautylog.classes.ts" />
/// <reference path="./beautylog.os.ts" />
/// <reference path="./beautylog.os.table.ts" />
/// <reference path="./beautylog.browser.ts" />

var beautylog = function(logPlatform:string = "os") {
    switch (logPlatform) {
        case "os":
            var beautylogOs = BeautylogOS.init();
            return beautylogOs;
            break;
        case "browser":
            var beautylogBrowser = BeautylogBrowser.init();
            return beautylogBrowser;
            break;
        default:
            console.log("something is strange about the way you required beautylog");
            break;
    }
};
module.exports = beautylog;
