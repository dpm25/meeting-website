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
        var table = new BeautylogOsTable.cliTable({
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
var BeautylogOS;
(function (BeautylogOS) {
    function init() {
        var colors = require("colors");
        var clc = require("cli-color");
        var beautylogOS = {}; //object to append to all public facing functions
        var localBl; // object to append to all private params and functions
        localBl = {};
        localBl.dirPrefix = clc.bgXterm(39).xterm(231).bold(' DIR ') + ' ';
        localBl.errorPrefix = ' Error: '.bgRed.white.bold + ' ';
        localBl.infoPrefix = clc.bgXterm(198).xterm(231).bold(' INFO ') + ' ';
        localBl.normalPrefix = ' Log: '.bgCyan.white.bold + ' ';
        localBl.okPrefix = ' '.bgGreen + ' OK! '.bgBlack.green.bold + ' ';
        localBl.successPrefix = ' Success: '.bgGreen.white.bold + ' ';
        localBl.warnPrefix = ' '.bgYellow + ' Warn: '.bgBlack.yellow.bold + ' ';
        /**
         *
         * @param logText
         * @param logType
         * @returns {boolean}
         */
        beautylogOS.log = function (logText, logType) {
            if (logText === void 0) { logText = 'empty log'; }
            if (logType === void 0) { logType = 'normal'; }
            try {
                switch (logType) {
                    case 'dir':
                        logText = localBl.dirPrefix + clc.xterm(26)(logText);
                        break;
                    case 'error':
                        logText = localBl.errorPrefix + logText.red.bold;
                        break;
                    case 'info':
                        logText = localBl.infoPrefix + clc.xterm(198)(logText);
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
        /**
         * logs an directory to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.dir = function (logText) {
            return beautylogOS.log(logText, 'dir');
        };
        /**
         * logs an error to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.error = function (logText) {
            return beautylogOS.log(logText, 'error');
        };
        /**
         * logs an info to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.info = function (logText) {
            return beautylogOS.log(logText, 'info');
        };
        /**
         * logs an 'OK!' message to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.ok = function (logText) {
            return beautylogOS.log(logText, 'ok');
        };
        /**
         * logs a success to console
         * @param logText string to log as error
         * @returns {boolean}
         */
        beautylogOS.success = function (logText) {
            return beautylogOS.log(logText, 'success');
        };
        /**
         * logs a 'warn:' message to console
         * @param logText string to log as error
         * @returns {boolean}
         */
        beautylogOS.warn = function (logText) {
            return beautylogOS.log(logText, 'warn');
        };
        beautylogOS.table = BeautylogOsTable.init();
        return beautylogOS;
    }
    BeautylogOS.init = init;
})(BeautylogOS || (BeautylogOS = {}));
/// <reference path="./index.ts" />
var BeautylogOsTable;
(function (BeautylogOsTable) {
    function init() {
        BeautylogOsTable.cliTable = require("cli-table2");
        var beautylogOsTable = {};
        beautylogOsTable.new = function (typeArg, tableHeadArrayArg) {
            var newConsoleTable = new ConsoleTable(typeArg, tableHeadArrayArg);
            return newConsoleTable;
        };
        return beautylogOsTable;
    }
    BeautylogOsTable.init = init;
})(BeautylogOsTable || (BeautylogOsTable = {}));
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
/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./beautylog.classes.ts" />
/// <reference path="./beautylog.os.ts" />
/// <reference path="./beautylog.os.table.ts" />
/// <reference path="./beautylog.browser.ts" />
var beautylog = function (logPlatform) {
    if (logPlatform === void 0) { logPlatform = "os"; }
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
