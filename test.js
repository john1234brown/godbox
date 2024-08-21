const { GodBox } = require('godbox-dev');
try {
const test = new GodBox('./server.js', './test/public', 60000, 1000, false);

}catch(err){
 console.log(err);
}
