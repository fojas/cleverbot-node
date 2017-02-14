var http = require('https')
    , qs = require('querystring')
    , Cleverbot = function () {
    };

Cleverbot.prepare = function(cb){
  // noop for backwards compatibility
  cb();
};

Cleverbot.prototype = {

    configure: function (options){
      options = options || {};
      this.botapi = options.botapi;
    },

    path: function(message){
      var path = '/getreply';
        , query = {
          input: message,
          key: this.botapi || "CHANGEME"
        };

      if(this.state) {
        query.cs = this.state;
      }
      return [path, qs.stringify(query)].join("?");
    },

    write: function (message, callback) {
        var clever = this;
        var body = this.params;

        var options = {
            host: 'www.cleverbot.com',
            port: 443,
            path: this.path(message),
            method: 'GET',
            headers: { 'Content-Type': 'text/javascript' }
        };
        var cb = callback || function() { };

        var req = http.request(options, function (res) {
            var body = "";
            res.on("data", function(data) {
              body += data;
            });
            res.on("end", function() {
              var responseBody = JSON.parse(body);
              responseBody.message = responseBody.output; //for backwards compatibility
              this.state = responseBody.cs;
              cb(responseBody);
            }.bind(this));
        }.bind(this));

        req.end();

    }
};

module.exports = Cleverbot;
