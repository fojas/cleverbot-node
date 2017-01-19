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

With API Key:

The unofficial cleverbot api requests can optionally contain an API key. Information can be found here: http://www.cleverbot.com/apis

In order to add your key to your bot, you can use the `configure` method.

```
    var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    cleverbot.configure({botapi: "IAMKEY"});
    Cleverbot.prepare(function(){
      cleverbot.write(cleverMessage, function (response) {
           alert(response.message);
      });
    });
```

See 'examples' for more usage.
