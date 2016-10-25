/// <reference path="./index.ts" />

var defaultStylesheet =
    'div, h1, h2, h3, h4, h5, h6, p, pre { display: block; }\n' +
    'b, strong { font-weight: bold; }\n' +
    'i, em { font-style: italic; }\n' +
    'u { text-decoration: underline; }\n' +
    'del, strike { text-decoration: strikethrough; }\n' +
    'pre { white-space: pre; }';

var fs = require('fs'),
    path = require('path'),
    jsdom = require('jsdom').jsdom,
    ConsoleWriter = require('writer.js').ConsoleWriter;

var extendedColorsFile = path.join(paths.dataDir, 'extendedColors.json'),
    extendedColors = JSON.parse(fs.readFileSync(extendedColorsFile, 'utf8')),
    nearestColor = require('nearest-color').from(supportedColors).or(invert(extendedColors));

/**
 * Takes in HTML and writes out text w/ escape sequences to style the text for
 * console output.
 *
 * By default this method writes directly to the console. To do something
 * different (e.g. to write to a string) you can supply your own writer object
 * (anything with a `write` method) in the options.
 */
function htmlout(html, options) {
    var doc = jsdom('<html><head></head><body></body></html>');
    options.writer = new ConsoleWriter();
    options.css.unshift(defaultStylesheet);
    options.css.forEach(function(css) {
        var styleNode = doc.createElement('STYLE');
        styleNode.textContent = css;
        doc.head.appendChild(styleNode);
    });

    doc.body.innerHTML = html;

    var buffer = [];
    forEach(doc.body.childNodes, function(node) {
        output(node, buffer, options.writer);
    });
}

var html2console = (function() {
    var css = fs.readFileSync(path.join(paths.dataDir,"code.css"));
    return function(html) {
        var options:any = {};
        options.css = [];
        options.css.push(css);
        return htmlout(html, options);
    };
})();

/**
 * It appears that I have done something weird here and actually implemented
 * logic that makes use of the buffer, so I can't just get rid of it. (Well, I'm
 * sure I can but it'll require a bit of time to refamiliarize myself with this
 * code to understand WTF it's doing.)
 *
 * For now, whatever. I think it's fine to generate this giant buffer; writing
 * to stdout as we go is still going to make the performance way better.
 */
function output(node, buffer, writer) {
    if (node.nodeName === 'STYLE' || node.nodeName === 'SCRIPT') {
        return;
    }

    if (hasChildren(node)) {
        forEach(node.childNodes, function(child) {
            output(child, buffer, writer);
        });

    } else if (isTextNode(node)) {
        addToBuffer(buffer, applyStyle(node), writer);
    }

    ensureLineBreakBetweenBlocks(node, buffer, writer);
}

function hasChildren(node) {
    return node.childNodes.length > 0;
}

function applyStyle(textNode) {
    var text = getText(textNode);

    switch (findStyle(textNode, 'textTransform')) {
        case 'uppercase':
            text = text.toUpperCase();
            break;

        case 'lowercase':
            text = text.toLowerCase();
            break;

        case 'capitalize':
            text = text.replace(/\b[a-z]/g, function(char) {
                return char.toUpperCase();
            });
            break;
    }

    var lines = text.split('\n');
    var maxLineLength = lines.reduce(function(max, line) {
        return line.length > max ? line.length : max;
    }, 0);

    var bgColor = findStyle(textNode, 'backgroundColor');

    var color = findStyle(textNode, 'color');
    if (color) {
        color = nearestColor(color);
        if (color) {
            var sequence = getColorSequence(color.name);
            lines = applySequence(lines, sequence);
        }
    }

    var fontStyle = findStyle(textNode, 'fontStyle');
    if (fontStyle === 'italic') {
        lines = applySequence(lines, styleSequences.italic);
    }

    var fontWeight = findStyle(textNode, 'fontWeight');
    if (fontWeight === 'bold') {
        lines = applySequence(lines, styleSequences.bold);
    }

    var textDecoration = findStyle(textNode, 'textDecoration');
    if (textDecoration === 'underline') {
        lines = applySequence(lines, styleSequences.underline);
    } else if (textDecoration === 'strikethrough') {
        lines = applySequence(lines, styleSequences.strikethrough);
    }

    return lines.join('\n');
}

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
function getColorSequence(name) {
    var sequence = colorSequences[name];

    if (!sequence) {
        sequence = ['\x1B[38;5;' + name + 'm', '\x1B[39m'];
    }

    return sequence;
}

function getBGColorSequence(name) {
    var sequence = bgColorSequences[name];

    if (!sequence) {
        sequence = ['\x1B[48;5;' + name + 'm', '\x1B[49m'];
    }

    return sequence;
}

function applySequence(lines, sequence, paddedWidth?) {
    return lines.map(function(line) {
        if (typeof paddedWidth != "undefined") {
            line = pad(line, paddedWidth);
        }

        return sequence[0] + line + sequence[1];
    });
}

function isElement(node) {
    return node && node.nodeType === 1;
}

function isTextNode(node) {
    return node && node.nodeType === 3;
}

function getText(textNode) {
    var text = textNode.textContent;

    if (findStyle(textNode, 'whiteSpace') !== 'pre') {
        text = text.replace(/\s+/g, ' ');

        if (isBetweenBlocks(textNode)) {
            text = text.replace(/^\s+|\s+$/g, '');
        } else {
            if (isFirstChild(textNode)) {
                text = text.replace(/^\s+/, '');
            }
            if (isLastChild(textNode)) {
                text = text.replace(/\s+$/, '');
            }
        }
    }

    return text;
}

function getStyle(node) {
    if (!node) {
        return {};
    }

    var view = node.ownerDocument.defaultView;

    if (isTextNode(node)) {
        node = node.parentNode;
    }

    return isElement(node) ? view.getComputedStyle(node) : {};
}

function findStyle(node, property) {
    if (!node) {
        return null;
    }

    var view = node.ownerDocument.defaultView;

    if (isTextNode(node)) {
        node = node.parentNode;
    }

    var style = view.getComputedStyle(node);
    while (styleMissing(style, property)) {
        node = node.parentNode;
        if (!isElement(node)) {
            break;
        }

        style = view.getComputedStyle(node);
    }

    return style[property];
}

function styleMissing(style, property) {
    return !style[property];
}

function isFirstChild(textNode) {
    return textNode === textNode.parentNode.firstChild;
}

function isLastChild(textNode) {
    return textNode === textNode.parentNode.lastChild;
}

function isBlockElement(element) {
    if (isTextNode(element)) {
        return false;
    }

    var style = getStyle(element);
    return style.display === 'block';
}

function isBetweenBlocks(node) {
    return isBlockElement(node.previousSibling) && isBlockElement(node.nextSibling);
}

function addToBuffer(buffer, text, writer) {
    if (!text) { return; }
    buffer.push(text);
    writer.write(text);
}

/**
 * Appends a new line to the buffer under all of the following conditions:
 *
 * 1. The last string pushed to the buffer wasn't already a newline
 * 2. Either the previous sibling or next sibling is a block-level element
 *
 * @param {Array.<string>} buffer
 * @param {{write: function(string):*}} writer
 */
function ensureLineBreakBetweenBlocks(node, buffer, writer) {
    if (!node.nextSibling) {
        return;
    }

    if (!isBlockElement(node.previousSibling) && !isBlockElement(node.nextSibling)) {
        return;
    }

    if (buffer.length === 0 || buffer[buffer.length - 1] === '\n') {
        return;
    }

    buffer.push('\n');
    writer.write('\n');
}

function forEach(collection, fn) {
    Array.prototype.forEach.call(collection, fn);
}

/**
 * This method exists because I was dumb and made extendedColors.json backwards.
 */
function invert(object) {
    var inverted = {};
    for (var prop in object) {
        inverted[object[prop]] = prop;
    }
    return inverted;
}

function pad(string, width) {
    while (string.length < width) {
        string += ' ';
    }
    return string;
}