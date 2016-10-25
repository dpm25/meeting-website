/// <reference path="index.ts" />
class Environment {
    public runtimeEnv:string;
    public userAgent:string;
    public nodeVersion:string;
    public isBrowser:boolean;
    public isNode:boolean;
    constructor(runtimeEnvArg:string,userAgentArg:string = "undefined") {
        this.runtimeEnv = runtimeEnvArg;
        this.userAgent = userAgentArg;
        if(runtimeEnvArg == "node"){
            this.isBrowser = false;
            this.isNode = true;
            this.nodeVersion = process.version;
        } else if (runtimeEnvArg == "browser") {
            this.isBrowser = true;
            this.isNode = false;
            this.nodeVersion = "undefined";
        }
    };
}
