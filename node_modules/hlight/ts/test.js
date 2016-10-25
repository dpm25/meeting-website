/// <reference path="./typings/main.d.ts" />
var hlight = require("../index.js");
describe("hlight", function () {
    it("should highlight javascript", function () {
        this.timeout(10000);
        hlight("var test = 3;\nfunction(){\n  var hello = \"super\"\n};\nvar test;", "javascript");
    });
});
//# sourceMappingURL=test.js.map