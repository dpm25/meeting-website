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
//# sourceMappingURL=index.js.map