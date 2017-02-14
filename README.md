# Cleverbot-node

A node.js client for talking to cleverbot.

Basic usage:

In order to add your key to your bot, you can use the `configure` method. API keys can be obtained from the [Cleverbot API Sign Up Page](http://cleverbot.com/api).

```
    var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    cleverbot.configure({botapi: "IAMKEY"});
    cleverbot.write(cleverMessage, function (response) {
       console.log(response.output);
    });
```

### Changes from 0.2.x

* API Key is now required
* `Cleverbot.prepare` call is no longer needed. It is now a noop for backwards compatibility
* The output of the bot is now in the `output` attribute of the response object. It is copied to `message` for backwards compatibility

### Known issues

* Cleverbot API sometimes returns an empty response attribute

See 'examples' for more usage.
