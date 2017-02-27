var http = require('https')
    , qs = require('querystring')
    , Cleverbot = function (options) {
        this.configure(options);
      };

Cleverbot.prepare = function(cb){
  // noop for backwards compatibility
  cb();
};

Cleverbot.prototype = {

    configure: function (options){
      if(options && options.constructor !== Object){
        throw new TypeError("Cleverbot must be configured with an Object");
      }
      this.options = options || {};
    },

    path: function(message){
      var path = '/getreply'
        , query = {
          input: JSON.stringify(message),
          key: this.options.botapi || "CHANGEME"
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
            var chunks = [];
            res.on("data", function(data) {
              chunks.push(data);
            });
            res.on("end", function(i) {
              var body = Buffer.concat(chunks).toString();
              var responseBody;
              responseBody = JSON.parse(body);
              responseBody.message = responseBody.output; //for backwards compatibility
              this.state = responseBody.cs;
              cb(responseBody);
            }.bind(this));
        }.bind(this));

        req.end();

    }
};

module.exports = Cleverbot;
