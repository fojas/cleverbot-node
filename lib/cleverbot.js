var Cleverbot, crypto, http;

crypto = require('crypto');

http = require('http');

Cleverbot = (function() {
    function Cleverbot() {
        this.params = {
            'stimulus': '',
            'start': 'y',
            'sessionid': '',
            'vText8': '',
            'vText7': '',
            'vText6': '',
            'vText5': '',
            'vText4': '',
            'vText3': '',
            'vText2': '',
            'icognoid': 'wsf',
            'icognocheck': '',
            'fno': '0',
            'prevref': '',
            'emotionaloutput': '',
            'emotionalhistory': '',
            'asbotname': '',
            'ttsvoice': '',
            'typing': '',
            'lineref': '',
            'sub': 'Say',
            'islearning': '1',
            'cleanslate': 'false'
        };
        this.cookies = {};
        this.parserKeys = ['message', 'sessionid', 'logurl', 'vText8', 'vText7', 'vText6', 'vText5', 'vText4', 'vText3', 'vText2', 'prevref', '', 'emotionalhistory', 'ttsLocMP3', 'ttsLocTXT', 'ttsLocTXT3', 'ttsText', 'lineref', 'lineURL', 'linePOST', 'lineChoices', 'lineChoicesAbbrev', 'typingData', 'divert'];
        this.prepare();
    }

    Cleverbot.prototype.digest = function(body) {
        var m;
        m = crypto.createHash('md5');
        m.update(body);
        return m.digest('hex');
    };

    Cleverbot.prototype.encodeParams = function(a1) {
        var u, x;
        u = [];
        for (x in a1) {
            if (a1[x] instanceof Array) {
                u.push(x + '=' + encodeURIComponent(a1[x].join(',')));
            } else if (a1[x] instanceof Object) {
                u.push(params(a1[x]));
            } else {
                u.push(x + '=' + encodeURIComponent(a1[x]));
            }
        }
        return u.join('&');
    };

    Cleverbot.prototype.write = function(message, callback) {
        var body, cookie_string, cookie_tmp, key, options, req, self, val;
        self = this;
        body = this.params;
        body.stimulus = message;
        body.icognocheck = this.digest(this.encodeParams(body).substring(9, 35));
        cookie_string = '';
        cookie_tmp = [];
        for (key in this.cookies) {
            if (this.cookies.hasOwnProperty(key)) {
                val = this.cookies[key];
                cookie_tmp.push(key + '=' + val);
            }
        }
        cookie_string += cookie_tmp.join(';');
        options = {
            host: 'www.cleverbot.com',
            port: 80,
            path: '/webservicemin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': this.encodeParams(body).length,
                'Cache-Control': 'no-cache',
                'Cookie': cookie_string
            }
        };
        req = http.request(options, function(res) {
            var cb;
            cb = callback || function() {};
            res.on('data', function(chunk) {
                var chunk_data, i, iLen, responseHash;
                chunk_data = chunk.toString().split('\r');
                responseHash = {};
                i = 0;
                iLen = chunk_data.length;
                while (i < iLen) {
                    self.params[self.parserKeys[i]] = responseHash[self.parserKeys[i]] = chunk_data[i];
                    i++;
                }
                cb(responseHash);
            });
        });
        req.write(this.encodeParams(body));
        req.end();
    };

    Cleverbot.prototype.prepare = function() {
        var options, req, self;
        self = this;
        options = {
            host: 'www.cleverbot.com',
            port: 80,
            path: '/',
            method: 'GET'
        };
        req = http.request(options, function(res) {
            var current_cookie, i, list, single_cookie;
            res.on('data', function(chunk) {});
            if (res.headers && res.headers['set-cookie']) {
                list = res.headers['set-cookie'];
                i = 0;
                while (i < list.length) {
                    single_cookie = list[i].split(';');
                    current_cookie = single_cookie[0].split('=');
                    self.cookies[current_cookie[0]] = current_cookie[1];
                    i++;
                }
            }
        });
        req.end();
    };

    return Cleverbot;

})();

module.exports = Cleverbot;
