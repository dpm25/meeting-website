/// <reference path="index.ts" />
/**
 * Deals with the environment the current JS script is running in.
 */
module SmartenvEnvironment {

    var environment:Environment;
    var envDetermined:boolean = false;

    /**
     * returns the environment
     * @returns {Environment}
     */
    var getEnv = function(){
        if (!envDetermined) {
            (function() {
                var localRunTimeEnv = "undefined";
                var localUserAgent = "undefined";
                if (typeof window !== "undefined") {
                    localRunTimeEnv = 'browser';
                    localUserAgent = navigator.userAgent;
                } else if (typeof process !== "undefined") {
                    localRunTimeEnv = 'node';
                }
                environment = new Environment(localRunTimeEnv,localUserAgent);
            })();
            envDetermined = true; // ensure code above only runs once
        };
        return environment;
    };

    /**
     * prints the environment to console
     */
    var  printEnv = function() {
        if (this.getEnv().isNode) {
            plugins.beautylog.ok("running on NODE");
            var smartenvVersion = require("./package.json").version;
            plugins.beautylog.log("node version is " + this.getEnv().nodeVersion + " and smartenv version is " + smartenvVersion);
        } else {
            plugins.beautylog.ok("running on BROWSER");
            plugins.beautylog.log("browser is " + this.getEnv().userAgent);
        }
        plugins.beautylog.log("the smartenv registration store currently holds the following properties:");
        console.log(Object.getOwnPropertyNames(smartenv.obs.getAll()));
    }

    export var init = function(objectArg) {
        objectArg.getEnv = getEnv;
        objectArg.printEnv = printEnv;
    }
}