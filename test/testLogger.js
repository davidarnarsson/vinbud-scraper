var log = require('../src/log');
var Logger = log.Logger;
var should = require('should');


var MockConsole = function () {
  this.messages = {};
  var me = this;
  var makeCall = function (lvl) {
    return function () {
      me.messages[lvl] = me.messages[lvl] || [];
      me.messages[lvl].push(Array.prototype.slice.call(arguments).join());
    };
  };
  
  ['log','warn','error'].map(function (x) {
    me[x] = makeCall(x);
  });
};

describe('Logger', function () { 
  it('should write a log message to a global writer', function () {
    var logger = new Logger(null, new MockConsole());
    logger.log('test');
    
    logger.output.messages['log'][0].should.endWith('test');
  });
  
  it('should write an error message regardless of log level', function () {
    var logger = new Logger('somelevel', new MockConsole());
    logger.error('test');
    logger.output.messages['error'][0].should.endWith('test');
  });
  
  it('should not write if log level doesn\'t contain the logger\'s level', function () {
    var logger = new Logger('debug', new MockConsole());
    logger.log('test');
    (logger.output.messages['log'] === undefined).should.be.true;
  });
  
  it('should log if the global level contains the logger level', function () {
    var logger = new Logger('debug', new MockConsole());
    log.setLevel('trace debug');
    logger.log('test');
    logger.output.messages['log'][0].should.endWith('test');
  });
});