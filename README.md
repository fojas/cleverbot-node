# Cleverbot-node

A node.js client for talking to cleverbot.

Based on the [Cleverbot ruby gem](https://github.com/benmanns/cleverbot)
Forked from https://github.com/fojas/cleverbot-node

Basic usage:

```
    var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    Cleverbot.prepare(function(){
      cleverbot.write(cleverMessage, function (response) {
           alert(response.message);
      });
    });
```

See 'examples' for more usage.
