/// <reference path="index.ts" />
module SmartenvObjectStorage {
    export function init() {
        var obs:any = {
            add: function(paramNameArg = "undefined",objectArg = "undefined") {
                if (paramNameArg == "undefined"){
                    plugins.beautylog.error("paramName is undefined");
                    return;
                }
                if (objectArg == "undefined"){
                    plugins.beautylog.error("objectArg is undefined");
                }
                if (typeof obsItems[paramNameArg] === "undefined"){
                    obsItems[paramNameArg] = objectArg;
                } else {
                    plugins.beautylog.error("object is already present, so add operation has failed.");
                }
                return obsItems[paramNameArg];
            },
            replace: function(paramNameArg,objectArg){
                obsItems[paramNameArg] = objectArg;
            },
            merge: function(paramNameArg,objectArg){
                if(!(typeof obsItems[paramNameArg] === "undefined")){
                    obsItems[paramNameArg] = plugins._.assign(obsItems[paramNameArg],objectArg);
                } else {
                    plugins.beautylog.error("object is not present, so there is nothing to merge");
                }
            },
            get: function(keyName) {
                return obsItems[keyName];
            },
            getAll: function () {
                return obsItems;
            },
            addComplete: function(itemsArg) {
                obsItems = plugins._.assign(obsItems,itemsArg);
                return obsItems;
            }
        };
        var obsItems:any = {};
        return obs;
    }
}