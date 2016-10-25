/// <reference path="ts/typings/main.d.ts" />
declare module BeautylogPlugins {
    var init: () => any;
}
declare var tableHelpers: {
    makeRow: (cellCounterArg?: number, colorArg?: string) => any[];
};
declare class ConsoleTable {
    tableHead: string[];
    rows: any;
    type: string;
    constructor(tableTypeArg: string, tableHeadArrayArg?: string[]);
    push(row: string[]): void;
    print(): void;
}
declare module BeautylogNode {
    function init(): any;
}
declare module BeautylogNodeLog {
    var init: () => (logText?: string, logType?: string) => boolean;
}
declare module BeautylogNodeCode {
    var init: () => (codeString: any, options?: any) => void;
}
declare module BeautylogNodeTable {
    var cliTable: any;
    function init(): any;
}
declare module BeautylogNodeFiglet {
    var figlet: (textArg: string, optionsArg?: any) => any;
    var figletSync: (textArg: string, optionsArg?: any) => boolean;
}
declare module BeautylogBrowser {
    function init(): any;
}
declare module BeautylogPromiseChain {
}
declare var plugins: any;
declare var beautylog: any;
