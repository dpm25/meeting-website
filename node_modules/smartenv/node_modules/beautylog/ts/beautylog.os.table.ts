/// <reference path="./index.ts" />
module BeautylogOsTable {
    export var cliTable;
    export function init() {
        cliTable =  require("cli-table2");
        var beautylogOsTable:any = {};

        beautylogOsTable.new = function(typeArg:string,tableHeadArrayArg?) {
            var newConsoleTable = new ConsoleTable(typeArg,tableHeadArrayArg);
            return newConsoleTable;
        };
        return beautylogOsTable;
    }
}