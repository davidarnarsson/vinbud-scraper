var Emitter = function () {
  this.subscribers = {};
};

Emitter.prototype.on = function (msg, cb) {
  (this.subscribers[msg] = this.subscribers[msg] || []).push(cb);
};

Emitter.prototype.emit = function (msg, data) {
  (this.subscribers[msg] || []).forEach(function (cb) {
    cb(data);
  });
};

module.exports = Emitter;