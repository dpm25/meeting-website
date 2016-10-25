/// <reference path="index.ts" />
var Environment = (function () {
    function Environment(runtimeEnvArg, userAgentArg) {
        if (userAgentArg === void 0) { userAgentArg = "undefined"; }
        this.runtimeEnv = runtimeEnvArg;
        this.userAgent = userAgentArg;
        if (runtimeEnvArg == "node") {
            this.isBrowser = false;
            this.isNode = true;
            this.nodeVersion = process.version;
        }
        else if (runtimeEnvArg == "browser") {
            this.isBrowser = true;
            this.isNode = false;
            this.nodeVersion = "undefined";
        }
    }
    ;
    return Environment;
})();
/// <reference path="index.ts" />
/**
 * Deals with the environment the current JS script is running in.
 */
var SmartenvEnvironment;
(function (SmartenvEnvironment) {
    var environment;
    var envDetermined = false;
    /**
     * returns the environment
     * @returns {Environment}
     */
    var getEnv = function () {
        if (!envDetermined) {
            (function () {
                var localRunTimeEnv = "undefined";
                var localUserAgent = "undefined";
                if (typeof window !== "undefined") {
                    localRunTimeEnv = 'browser';
                    localUserAgent = navigator.userAgent;
                }
                else if (typeof process !== "undefined") {
                    localRunTimeEnv = 'node';
                }
                environment = new Environment(localRunTimeEnv, localUserAgent);
            })();
            envDetermined = true; // ensure code above only runs once
        }
        ;
        return environment;
    };
    /**
     * prints the environment to console
     */
    var printEnv = function () {
        if (this.getEnv().isNode) {
            plugins.beautylog.ok("running on NODE");
            var smartenvVersion = require("./package.json").version;
            plugins.beautylog.log("node version is " + this.getEnv().nodeVersion + " and smartenv version is " + smartenvVersion);
        }
        else {
            plugins.beautylog.ok("running on BROWSER");
            plugins.beautylog.log("browser is " + this.getEnv().userAgent);
        }
        plugins.beautylog.log("the smartenv registration store currently holds the following properties:");
        console.log(Object.getOwnPropertyNames(smartenv.obs.getAll()));
    };
    SmartenvEnvironment.init = function (objectArg) {
        objectArg.getEnv = getEnv;
        objectArg.printEnv = printEnv;
    };
})(SmartenvEnvironment || (SmartenvEnvironment = {}));
/// <reference path="index.ts" />
var SmartenvObjectStorage;
(function (SmartenvObjectStorage) {
    function init() {
        var obs = {
            add: function (paramNameArg, objectArg) {
                if (paramNameArg === void 0) { paramNameArg = "undefined"; }
                if (objectArg === void 0) { objectArg = "undefined"; }
                if (paramNameArg == "undefined") {
                    plugins.beautylog.error("paramName is undefined");
                    return;
                }
                if (objectArg == "undefined") {
                    plugins.beautylog.error("objectArg is undefined");
                }
                if (typeof obsItems[paramNameArg] === "undefined") {
                    obsItems[paramNameArg] = objectArg;
                }
                else {
                    plugins.beautylog.error("object is already present, so add operation has failed.");
                }
                return obsItems[paramNameArg];
            },
            replace: function (paramNameArg, objectArg) {
                obsItems[paramNameArg] = objectArg;
            },
            merge: function (paramNameArg, objectArg) {
                if (!(typeof obsItems[paramNameArg] === "undefined")) {
                    obsItems[paramNameArg] = plugins._.assign(obsItems[paramNameArg], objectArg);
                }
                else {
                    plugins.beautylog.error("object is not present, so there is nothing to merge");
                }
            },
            get: function (keyName) {
                return obsItems[keyName];
            },
            getAll: function () {
                return obsItems;
            },
            addComplete: function (itemsArg) {
                obsItems = plugins._.assign(obsItems, itemsArg);
                return obsItems;
            }
        };
        var obsItems = {};
        return obs;
    }
    SmartenvObjectStorage.init = init;
})(SmartenvObjectStorage || (SmartenvObjectStorage = {}));
/// <reference path="typings/tsd.d.ts" />
/// <reference path="smartenv.classes.ts" />
/// <reference path="smartenv.environment.ts" />
/// <reference path="smartenv.objectstorage.ts" />
var plugins = {
    beautylog: require("beautylog")("os"),
    _: require("lodash")
};
var smartenv = {}; //create smartenv object
SmartenvEnvironment.init(smartenv);
smartenv.obs = SmartenvObjectStorage.init();
module.exports = smartenv;
