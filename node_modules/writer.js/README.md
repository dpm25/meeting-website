# writer.js

Just a dumb little JS library providing an abstraction around the concept of writing text *to*
something. Could be stdout, could be a file (not implemented yet), could be a string.

Loosely based off similar concepts in the worlds of Java, .NET (e.g.
[TextWriter](https://msdn.microsoft.com/en-us/library/system.io.textwriter%28v=vs.110%29.aspx)) and
probably elsewhere.

## Example

```javascript
var writer = require('writer');

var stringWriter = new writer.StringWriter();
stringWriter.write('foo');
stringWriter.write('bar');
stringWriter.write('baz');

stringWriter.toString();
// => 'foobarbaz'

var consoleWriter = new writer.ConsoleWriter();
consoleWriter.write('hey!');
consoleWriter.write('look!');
```

Make sense? Makes sense to me, anyway.
