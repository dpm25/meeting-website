/// <reference path="typings/tsd.d.ts" />
var smartenv = require("./index.js");
var beautylog = require("beautylog")("os");
beautylog.info("Now testing the smartenv module");
smartenv.printEnv();
beautylog.info("Now testing the smartenv module");

//test smartenv.obs.add
smartenv.obs.add("myTestObject",{key1:"Peter"});
smartenv.obs.add("myTestObject",{key1:"Klaus"}); //now trying to add a second
smartenv.printEnv();
beautylog.log(smartenv.obs.get("myTestObject").key1); // this should be Peter

//test smartenv.obs.replace
smartenv.obs.replace("myTestObject",{key1:"Klaus"});
beautylog.log(smartenv.obs.get("myTestObject").key1); // this should be Klaus

//test smartenv.obs.merge
smartenv.obs.merge("myTestObject",{key2:"Peter"});
beautylog.log(smartenv.obs.get("myTestObject").key1 + smartenv.obs.get("myTestObject").key2); // this should be KlausPeter

var key2 = "hello";
smartenv.obs.get("myTestObject").key2 = key2;
beautylog.log(smartenv.obs.get("myTestObject").key2);

beautylog.success("Success!");