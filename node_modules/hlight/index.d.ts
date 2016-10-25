/// <reference path="ts/typings/main.d.ts" />
declare module HlightPlugins {
    var init: () => {
        path: any;
    };
}
declare var plugins: {
    path: any;
};
declare module HlightPaths {
    var init: () => any;
}
declare var paths: any;
declare var supportedColors: {
    white: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    lightGrey: string;
    darkGrey: string;
    lightRed: string;
    lightGreen: string;
    lightYellow: string;
    lightBlue: string;
    lightMagenta: string;
    lightCyan: string;
};
declare var colorSequences: {
    white: string[];
    black: string[];
    red: string[];
    green: string[];
    yellow: string[];
    blue: string[];
    magenta: string[];
    cyan: string[];
    lightGrey: string[];
    darkGrey: string[];
    lightRed: string[];
    lightGreen: string[];
    lightYellow: string[];
    lightBlue: string[];
    lightMagenta: string[];
    lightCyan: string[];
};
declare var bgColorSequences: {
    white: string[];
    black: string[];
    red: string[];
    green: string[];
    yellow: string[];
    blue: string[];
    magenta: string[];
    cyan: string[];
    lightGrey: string[];
    darkGrey: string[];
    lightRed: string[];
    lightGreen: string[];
    lightYellow: string[];
    lightBlue: string[];
    lightMagenta: string[];
    lightCyan: string[];
};
declare var styleSequences: {
    bold: string[];
    italic: string[];
    underline: string[];
    strikethrough: string[];
};
declare var defaultStylesheet: string;
declare var fs: any, path: any, jsdom: any, ConsoleWriter: any;
declare var extendedColorsFile: any, extendedColors: any, nearestColor: any;
/**
 * Takes in HTML and writes out text w/ escape sequences to style the text for
 * console output.
 *
 * By default this method writes directly to the console. To do something
 * different (e.g. to write to a string) you can supply your own writer object
 * (anything with a `write` method) in the options.
 */
declare function htmlout(html: any, options: any): void;
declare var html2console: (html: any) => void;
/**
 * It appears that I have done something weird here and actually implemented
 * logic that makes use of the buffer, so I can't just get rid of it. (Well, I'm
 * sure I can but it'll require a bit of time to refamiliarize myself with this
 * code to understand WTF it's doing.)
 *
 * For now, whatever. I think it's fine to generate this giant buffer; writing
 * to stdout as we go is still going to make the performance way better.
 */
declare function output(node: any, buffer: any, writer: any): void;
declare function hasChildren(node: any): boolean;
declare function applyStyle(textNode: any): any;
/**
 * This is VERY stupid and deserves refactoring in the near future. Basically,
 * I structured colors and extendedColors differently; so if this is the name of
 * a color, then it's a "standard" color, but if it's a number, then it denotes
 * an extended color.
 *
 * Really I should change the API of nearest-color so that you can associate
 * arbitrary data w/ a color. That way I wouldn't need to do the color-name-to-
 * sequence mapping.
 */
declare function getColorSequence(name: any): any;
declare function getBGColorSequence(name: any): any;
declare function applySequence(lines: any, sequence: any, paddedWidth?: any): any;
declare function isElement(node: any): boolean;
declare function isTextNode(node: any): boolean;
declare function getText(textNode: any): any;
declare function getStyle(node: any): any;
declare function findStyle(node: any, property: any): any;
declare function styleMissing(style: any, property: any): boolean;
declare function isFirstChild(textNode: any): boolean;
declare function isLastChild(textNode: any): boolean;
declare function isBlockElement(element: any): boolean;
declare function isBetweenBlocks(node: any): boolean;
declare function addToBuffer(buffer: any, text: any, writer: any): void;
/**
 * Appends a new line to the buffer under all of the following conditions:
 *
 * 1. The last string pushed to the buffer wasn't already a newline
 * 2. Either the previous sibling or next sibling is a block-level element
 *
 * @param {Array.<string>} buffer
 * @param {{write: function(string):*}} writer
 */
declare function ensureLineBreakBetweenBlocks(node: any, buffer: any, writer: any): void;
declare function forEach(collection: any, fn: any): void;
/**
 * This method exists because I was dumb and made extendedColors.json backwards.
 */
declare function invert(object: any): {};
declare function pad(string: any, width: any): any;
declare var hlight: (code: string, language: string) => void;
