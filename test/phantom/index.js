var system = require('system');

var tests = [
  'testScrapeMetaData'
];

var runTests = function (tests, successes, fails) {
  if (!tests.length) {
    system.stdout.writeLine("\n---------------------------\n");
    system.stdout.writeLine((successes + fails) + ' tests run. ' + successes + ' successful. ' + fails + ' fails.\n\n');
    phantom.exit();
  }
  
  var testName = tests.pop();
  var test = require('./' + testName);
  
  test(function(description, callback) {
     system.stdout.write([testName, description, ':'].join(' '));
     
     try {
       callback(function (result) {
         system.stdout.writeLine(result ? " success" : " fail");
         runTests(tests,successes + (result ? 1 : 0), fails + (result ? 0 : 1));
       });
     }
     catch (e) {
       system.stdout.writeLine(" fail");
       system.stdout.writeLine(e);
     }
  });
}; 


runTests(tests,0,0);

