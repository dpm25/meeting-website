/// <reference path="./typings/main.d.ts" />
/// <reference path="./hlight.plugins.ts" />
/// <reference path="./hlight.paths.ts" />
/// <reference path="./hlight.colors.ts" />
/// <reference path="./hlight.original.ts" />

var hlight = function(code:string,language:string) {
    var hljs = require('highlight.js');
    var html;
    if (typeof language === "undefined") {
        html = (hljs.highlight(language, code)).value;
    }
    else {
        html = (hljs.highlightAuto(code)).value;
    };
    return html2console('<pre class="hljs">' + html + '</pre>');
};

module.exports = hlight;
