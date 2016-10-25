#!/usr/bin/env node

/// <reference path="./index.ts" />
var BeautylogPlugins;
(function (BeautylogPlugins) {
    var plugins = {};
    BeautylogPlugins.init = function () {
        plugins = {
            lodash: require("lodash"),
            smartenv: require("smartenv"),
            q: require("q")
        };
        if (plugins.smartenv.getEnv().isNode) {
            plugins = plugins.lodash.assign(plugins, {
                colors: require("colors"),
                clc: require("cli-color"),
                figlet: require("figlet")
            });
        }
        return plugins;
    };
})(BeautylogPlugins || (BeautylogPlugins = {}));
/// <reference path="./index.ts" />
var tableHelpers = {
    makeRow: function (cellCounterArg, colorArg) {
        if (cellCounterArg === void 0) { cellCounterArg = 2; }
        if (colorArg === void 0) { colorArg = "cyan"; }
        var rowArray = [];
        for (var i = 0; i < (cellCounterArg); i++) {
            rowArray.push(String(i + 1).cyan);
        }
        return rowArray;
    }
};
var ConsoleTable = (function () {
    function ConsoleTable(tableTypeArg, tableHeadArrayArg) {
        if (tableHeadArrayArg === void 0) { tableHeadArrayArg = tableHelpers.makeRow(); }
        switch (tableTypeArg) {
            case "checks":
                this.tableHead = ['Check Item:'.cyan, 'Status:'.cyan];
                break;
            case "custom":
                this.tableHead = tableHeadArrayArg;
                break;
            default:
                break;
        }
        this.rows = [];
        this.type = tableTypeArg;
    }
    ConsoleTable.prototype.push = function (row) {
        this.rows.push(row);
    };
    ConsoleTable.prototype.print = function () {
        var table = new BeautylogNodeTable.cliTable({
            head: this.tableHead
        });
        for (var row in this.rows) {
            if (this.rows[row][1] == "success") {
                this.rows[row][1] = ' '.bgGreen + ' ' + this.rows[row][1];
            }
            else if (this.rows[row][1] == "error") {
                this.rows[row][1] = ' '.bgRed + ' ' + this.rows[row][1];
            }
            table.push(this.rows[row]);
        }
        ;
        console.log(table.toString());
    };
    return ConsoleTable;
})();
/// <reference path="./index.ts" />
var BeautylogNode;
(function (BeautylogNode) {
    function init() {
        var beautylogNode = {
            log: BeautylogNodeLog.init(),
            code: BeautylogNodeCode.init(),
            figlet: BeautylogNodeFiglet.figlet,
            figletSync: BeautylogNodeFiglet.figletSync
        };
        /**
         * logs an directory to console
         * @param logText
         * @returns {boolean}
         */
        beautylogNode.dir = function (logText) {
            return beautylogNode.log(logText, 'dir');
        };
        /**
         * logs an error to console
         * @param logText
         * @returns {boolean}
         */
        beautylogNode.error = function (logText) {
            return beautylogNode.log(logText, 'error');
        };
        /**
         * logs an info to console
         * @param logText
         * @returns {boolean}
         */
        beautylogNode.info = function (logText) {
            return beautylogNode.log(logText, 'info');
        };
        /**
         * logs an 'OK!' message to console
         * @param logText
         * @returns {boolean}
         */
        beautylogNode.ok = function (logText) {
            return beautylogNode.log(logText, 'ok');
        };
        /**
         * logs a success to console
         * @param logText string to log as error
         * @returns {boolean}
         */
        beautylogNode.success = function (logText) {
            return beautylogNode.log(logText, 'success');
        };
        /**
         * logs a 'warn:' message to console
         * @param logText string to log as error
         * @returns {boolean}
         */
        beautylogNode.warn = function (logText) {
            return beautylogNode.log(logText, 'warn');
        };
        beautylogNode.table = BeautylogNodeTable.init();
        return beautylogNode;
    }
    BeautylogNode.init = init;
})(BeautylogNode || (BeautylogNode = {}));
/// <reference path="./index.ts" />
var BeautylogNodeLog;
(function (BeautylogNodeLog) {
    BeautylogNodeLog.init = function () {
        var localBl = {
            dirPrefix: plugins.clc.bgXterm(39).xterm(231).bold(' DIR ') + ' ',
            errorPrefix: ' Error: '.bgRed.white.bold + ' ',
            infoPrefix: plugins.clc.bgXterm(198).xterm(231).bold(' INFO ') + ' ',
            normalPrefix: ' Log: '.bgCyan.white.bold + ' ',
            okPrefix: ' '.bgGreen + ' OK! '.bgBlack.green.bold + ' ',
            successPrefix: ' Success: '.bgGreen.white.bold + ' ',
            warnPrefix: ' '.bgYellow + ' Warn: '.bgBlack.yellow.bold + ' '
        };
        /**
         *
         * @param logText
         * @param logType
         * @returns {boolean}
         */
        var logFunction = function (logText, logType) {
            if (logText === void 0) { logText = 'empty log'; }
            if (logType === void 0) { logType = 'normal'; }
            try {
                switch (logType) {
                    case 'dir':
                        logText = localBl.dirPrefix + plugins.clc.xterm(26)(logText);
                        break;
                    case 'error':
                        logText = localBl.errorPrefix + logText.red.bold;
                        break;
                    case 'info':
                        logText = localBl.infoPrefix + plugins.clc.xterm(198)(logText);
                        break;
                    case 'normal':
                        logText = localBl.normalPrefix + logText.cyan.bold;
                        break;
                    case 'ok':
                        logText = localBl.okPrefix + logText.bold;
                        break;
                    case 'success':
                        logText = localBl.successPrefix + logText.green.bold;
                        break;
                    case 'warn':
                        logText = localBl.warnPrefix + logText.bold;
                        break;
                    case 'log':
                    default:
                        logText.blue.bold;
                        console.log(('unknown logType for "' + logText + '"').red.bold);
                        break;
                }
                console.log(logText);
                return true;
            }
            catch (error) {
                console.log(localBl.errorPrefix + 'You seem to have tried logging something strange'.red.bold + error);
                return false;
            }
        };
        return logFunction;
    };
})(BeautylogNodeLog || (BeautylogNodeLog = {}));
/// <reference path="./index.ts" />
var BeautylogNodeCode;
(function (BeautylogNodeCode) {
    BeautylogNodeCode.init = function () {
        var codeFunction = function (codeString, options) {
            var hlight = require("hlight");
            var codeSnippet = {
                source: codeString,
                highlighted: "default"
            };
            if (typeof codeString != "string") {
                console.log("beautylog.code() expects a string as first argument!");
                return;
            }
            ;
            if (typeof options != "undefined") {
                codeSnippet.highlighted = hlight(codeSnippet.source, options.language);
            }
        };
        return codeFunction;
    };
})(BeautylogNodeCode || (BeautylogNodeCode = {}));
/// <reference path="./index.ts" />
var BeautylogNodeTable;
(function (BeautylogNodeTable) {
    function init() {
        BeautylogNodeTable.cliTable = require("cli-table2");
        var beautylogOsTable = {};
        beautylogOsTable.new = function (typeArg, tableHeadArrayArg) {
            var newConsoleTable = new ConsoleTable(typeArg, tableHeadArrayArg);
            return newConsoleTable;
        };
        return beautylogOsTable;
    }
    BeautylogNodeTable.init = init;
})(BeautylogNodeTable || (BeautylogNodeTable = {}));
/// <reference path="./index.ts" />
var BeautylogNodeFiglet;
(function (BeautylogNodeFiglet) {
    var defaultOptions = {
        font: "Star Wars",
        color: "green",
        cb: function () { }
    };
    BeautylogNodeFiglet.figlet = function (textArg, optionsArg) {
        var done = plugins.q.defer();
        var mergeOptions = plugins.lodash.cloneDeep(defaultOptions);
        var options = plugins.lodash.assign(mergeOptions, optionsArg);
        plugins.figlet(textArg, {
            font: options.font,
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data[options.color]);
            options.cb();
            done.resolve();
        });
        return done.promise;
    };
    BeautylogNodeFiglet.figletSync = function (textArg, optionsArg) {
        var mergeOptions = plugins.lodash.cloneDeep(defaultOptions);
        var options = plugins.lodash.assign(mergeOptions, optionsArg);
        console.log(plugins.figlet.textSync(textArg, {
            font: options.font,
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })[options.color]);
        return true;
    };
})(BeautylogNodeFiglet || (BeautylogNodeFiglet = {}));
/// <reference path="./index.ts" />
var BeautylogBrowser;
(function (BeautylogBrowser) {
    function init() {
        var beautylogBrowser = {};
        beautylogBrowser.log = function (message) {
            console.log('%c Log: %c ' + message, "background:#42A5F5;color:#ffffff", "color:#42A5F5;");
        };
        beautylogBrowser.info = function (message) {
            console.log('%c Info: %c ' + message, 'background:#EC407A;color:#ffffff;', 'color:#EC407A;');
        };
        beautylogBrowser.ok = function (message) {
            console.log('%c OK: %c ' + message, "background:#000000;color:#8BC34A;", "color:#000000;");
        };
        beautylogBrowser.success = function (message) {
            console.log('%c Success: %c ' + message, "background:#8BC34A;color:#ffffff;", "color:#8BC34A;");
        };
        beautylogBrowser.warn = function (message) {
            console.log('%c Warn: %c ' + message, "background:#000000;color:#FB8C00;", "color:#000000;");
        };
        return beautylogBrowser;
    }
    BeautylogBrowser.init = init;
})(BeautylogBrowser || (BeautylogBrowser = {}));
/// <reference path="./index.ts" />
/// <reference path="./typings/main.d.ts" />
/// <reference path="./beautylog.plugins.ts" />
/// <reference path="./beautylog.classes.ts" />
/// <reference path="./beautylog.node.ts" />
/// <reference path="./beautylog.node.log.ts" />
/// <reference path="./beautylog.node.code.ts" />
/// <reference path="./beautylog.node.table.ts" />
/// <reference path="./beautylog.node.figlet.ts" />
/// <reference path="./beautylog.browser.ts" />
/// <reference path="./beautylog.promisechain.ts" />
var plugins = BeautylogPlugins.init();
var beautylog = (function () {
    switch (plugins.smartenv.getEnv().runtimeEnv) {
        case "node":
            var beautylogOs = BeautylogNode.init();
            return beautylogOs;
            break;
        case "browser":
            var beautylogBrowser = BeautylogBrowser.init();
            return beautylogBrowser;
            break;
        default:
            console.log("something is strange about the platform in which you try to use beautylog");
            break;
    }
})();
module.exports = beautylog;
