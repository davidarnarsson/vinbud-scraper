var should = require('should');
var Emitter = require('../src/emitter');

describe('Emitter', function () {
  it('should fire off a callback on a registered event with argument', function (next) {
    var e = new Emitter();
    e.on('event', function (arg) {
      arg.should.be.exactly('test');
      next();
    });
    
    e.emit('event', 'test');
  });  
  
  it('should handle emits without assigned callbacks', function () {
    var e = new Emitter();
    e.emit('event');
  });
});

