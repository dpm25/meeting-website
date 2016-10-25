# beautylog
beautiful logging

## Status
[![Build Status](https://travis-ci.org/pushrocks/beautylog.svg?branch=v0.0.9)](https://travis-ci.org/pushrocks/beautylog)
[![Dependency Status](https://david-dm.org/pushrocks/beautylog.svg)](https://david-dm.org/pushrocks/beautylog)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/beautylog/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/beautylog/master/dependencies/npm)
[![bitHound Score](https://www.bithound.io/github/pushrocks/beautylog/badges/score.svg)](https://www.bithound.io/github/pushrocks/beautylog)
[![Coverage Status](https://coveralls.io/repos/github/pushrocks/beautylog/badge.svg?branch=greenkeeper-npmts-2.1.10)](https://coveralls.io/github/pushrocks/beautylog?branch=greenkeeper-npmts-2.1.10)

## Usage
```javascript

### Simple Logging
var bl = require('beautylog'); //for use in OS console environment AND browser console


bl.log('some log message'); //normal console log message
bl.success('some success message'); //success console log message
bl.error('some error message'); //error console log message

//alternatively you can use a logType parameter
bl.log('some log message','normal');
bl.log('some success message','success');
bl.log('some error message','error');
```
The plugin produces beautiful output like this:
![console.png](https://mediaserve.lossless.digital/github.com/pushrocks/beautylog/console.png)

### Code Highlighting



### Console Tables
beautylog allows displaying data in nice tables for better overview.

There are different types of tables.

#### Custom

```javascript
var bl = require('beautylog')("os"); //for use in OS console environment
var myTable = bl.table.new("custom",["Heading1".blue,"Heading2".blue,"Heading3".blue]); // type "custom"
myTable.push(["check 1","success"]); // adds a row the myTable
myTable.push(["check 2","error"]); // adds a row the myTable
myTable.push(["check 3","error"]); // adds a row the myTable
myTable.print(); //prints myTable to the console
```

#### Checks

```javascript
var bl = require('beautylog')("os"); //for use in OS console environment
var myTable = bl.table.new("checks"); // type checks
myTable.push(["check 1","success"]); // adds a row the myTable
myTable.push(["check 2","error"]); // adds a row the myTable
myTable.push(["check 3","error"]); // adds a row the myTable
myTable.print(); //prints myTable to the console
```

The table from the code with type "checks" above looks like this:
![table.png](https://mediaserve.lossless.digital/github.com/pushrocks/beautylog/table.png)

