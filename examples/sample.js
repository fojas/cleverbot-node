require('dotenv').config()
var key = process.env.CLEVERBOT_KEY || "CHANGEME"
var Cleverbot = require('../lib/cleverbot');
var CBots = [new Cleverbot,new Cleverbot]
  , i = 0
  , name = ['Bob Loblaw', 'Stan Sitwell']
  , callback = function callback(resp){
      CBots[i].write(resp['message'],callback, errCallback);
      console.log(name[i = ( ( i + 1 ) %2)],' : ',  resp['message'])
    }
  , errCallback = function(error, originalMessage, response) {
      console.log(error, originalMessage, response);
    };

CBots.forEach(function(bot) {
  bot.configure({botapi: key});
});

Cleverbot.prepare(function(){
  callback({message:'Just a small town girl'})
});

