
var level = 'trace';
var loggers = {};
var Logger = function (l, output) {
  this.level = l || level;
  this.output = output;
};

var prepareMessage = function(argsObj) {
  var args = Array.prototype.slice.call(argsObj);
  args.unshift(new Date().toISOString() + ':');
  return args.join(' ');
};

var doLog = function (writer, method, logLevel, message) {
  if ((logLevel == null) || level.indexOf(logLevel) !== -1) {
    writer[method](message);
  }
};

Logger.prototype.log = function () {
  doLog(this.output, 'log', this.level, prepareMessage(arguments));
};

Logger.prototype.error = function () {
  doLog(this.output, 'error', null, prepareMessage(arguments));
};

Logger.prototype.warn = function () {
  doLog(this.output,'warn', this.level, prepareMessage(arguments));
};

var log = function (level) {
  return (loggers[level] = loggers[level] || new Logger(level, console));
};

log.setLevel = function (l) {
   level = l;
};

log.Logger = Logger;
module.exports = log;
