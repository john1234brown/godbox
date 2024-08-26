const { GodBox } = require('./index.js');
const fs = require('node:fs');
try {
const test = new GodBox('./server.js', './test/public', 60000, 5000, false, true, false, {log: console.log, time: console.time, timeEnd: console.timeEnd});
//console.log('Test:', GodBox.toString(), test.toString());
}catch(err){
 console.log(err);
}
