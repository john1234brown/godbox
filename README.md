# JohnnyKins-GodBox Also Could be named Pheonix Box

- The isolated VM Express Webserver hosting solution for nodeJS.
- Without The Need for Obfuscation Due to the unique Fact and Nature of Pure Merkle Verification setup with Proper scopage to not pose a backdoor from webserver side to stop it. Like my johnnykins-blackbox and johnnykins-blackbox-dev setups!
- This utilizes a VM Context and A Child Process with its own environment variables Setup!
- This Utilizes a Recreation tactic like how a pheonix dies and rebirths itself very similar thing here utilizings a merkle tree verification setup!
- So when Something is found wrong with the server files it will stop it and restart it! And Properly Resetup the files and remove the infected directory!
- This is why i want to include the simple path traversal exploit protection thus would allow for pure webserver setup in a secure manner! And Help streamlining setup for developers!

## How To Use

### Step 1

- Make sure to Have NodeJS installed!
- Make folder called Godbox-example
- cd into godbox-example
- run npm init -y

### Step 2

- make a folder called public and inside of it make a index.html
- Go into index.html and use this!
- **index.html**

```html
<body>
    <h1>Hello World From Johnnykins GodBox</h1>
</body>

<footer>Author: Johnathan Edward Brown :D</footer>
```

### Step 3

- Go back to the folder Godbox-example!
- make a server.js file!
- Go into server.js and use this!
- **server.js**

```js
const express = require('express');
const app = express();
const isExpressSymbol = GLOBALLY.getGlobalSymbol(); //This is a safety type check setup!
app[isExpressSymbol] = true; //Which is required to be set to true to pass it to the setExpressApp(app, Globally);
GLOBALLY.setExpressApp(app, GLOBALLY);
// How to properly setup and utilize the pandoraExpress Communication channel!
const pandoraExpressSymbol = pandoraWall.getGlobalSymbol();
app[pandoraExpressSymbol] = true; //Which is required to be set true to setup the pandoraWalls runtime protection middleware!
pandoraWall.setExpress(app, pandoraWall); //Which is required to properly secure the pandoraWall with the current running server in context!

//GLOBALLY.setExpressApp(app, GLOBALLY);//Call Twice to test Express lock out! This Prevents double calling this after its been set!
//Make sure to ^ Set your expressApp via the globally to attach middlewares properly! Obviously still utilize helmet and cors!
//Make sure to utilize the following here! 
app.use('/', express.static(path.join(process.cwd, 'public')));
//For this utility to work properly the app.listen() call must be saved to variable named listen in camelCasing aka lowercase cause its one word!!
const listen = app.listen(3001);
// Please include this at the end of your server.js setup!
//This is required as well!
process.child.on(GLOBALLY.getGlobalString(), ()=>{
    const fs = require('node:fs');
    console.log('Shutting down Server from parent before timeout!');
    app.removeAllListeners();
    listen.closeAllConnections();
    listen.close();
    setTimeout(() =>{
        console.log('Shutting Down Server from parent message to stop after timeout!');
    },10);
});
//I Really hope this utility helps Protect Application and Web Servers here in the future for streamline development process and production release!
//With a nice safety net design principle which utilizes the fact the merkle verification upon failure literally Denies
//The express app any requests prevents a modified malicious server from being able to execute the payload potentially!
//Solving alot of todays issues with express servers in nodeJS runetime and maybe might shed light on how they can convert this over to solve it in other applications and softwares!
```

### Step 4

- Inside the Godbox-example folder still
- make a index.js file and put this code inside it!

```js
const { GodBox } = require('./index.js');
const fs = require('node:fs');
try {
new GodBox('./server.js', './test/public', 60000, 1000, false, true, false, {log: console.log});
}catch(err){
 console.log(err);
}

```

### Step 5

- Start it all up now and enjoy!
- Execute this in terminal!

```node
node index.js
```

### Step 6

- Enjoy Peace of Mind with More Secure Express and NodeJs applications from potential Runtime Injections via Code/Memory along with potential Malware payload prevention using File Verification setup with express middelware to prevent access upon tampered files!!

## Examples

- Newest Setup Style the one Below will be updated with the following!
- *production mode*
- Setup
- [NPM Site](https://www.npmjs.com/package/godbox)
- server doesnt have console logs but merkle process does!
- npm install godbox

```js
const { GodBox } = require('godbox');
try {

/*** 
   * @param {string} serverFile - Main Server File to Run in VM!
   * @param {string} serverFolder - Main Process Folder to Run in VM!
   * @param {number} interval - Main Server Restarting Interval in VM
   * @param {number} merkleInterval - Merkle File Check Interval Adjust as needed!
   * @param {boolean} useEnv - Are you using dotenv? true or false = yes or no! Defaults to false
   * @param {boolean} devMode - If using Development mode and want console logs set to true by default false!
   */
const test = new GodBox('./server.js', './test/public', 120000, 30000, false, false);


}catch(err){
 console.log(err);
}
```

- *development mode*
- Setup
- [NPM Site](https://www.npmjs.com/package/godbox)
- offers console logs on server side!
- npm install godbox

```js
const { GodBox } = require('godbox');
try {
/*** 
    * @param {string} serverFile - Main Server File to Run in VM!
    * @param {string} serverFolder - Main Process Folder to Run in VM!
    * @param {number} interval - Main Server Restarting Interval in VM
    * @param {number} merkleInterval - Merkle File Check Interval Adjust as needed!
    * @param {boolean} useEnv - Are you using dotenv? true or false = yes or no! Defaults to false
    * @param {boolean} devMode - If using Development mode and want console logs set to true by default false!
    */
const test = new GodBox('./server.js', './test/public', 120000, 30000, false, true);

}catch(err){
 console.log(err);
}
```

- **server.js**

```js
const express = require('express');
const app = express();
const isExpressSymbol = GLOBALLY.getGlobalSymbol(); //This is a safety type check setup!
app[isExpressSymbol] = true; //Which is required to be set to true to pass it to the setExpressApp(app, Globally);
GLOBALLY.setExpressApp(app, GLOBALLY);
//GLOBALLY.setExpressApp(app, GLOBALLY);//Call Twice to test Express lock out! This Prevents double calling this after its been set!
//Make sure to ^ Set your expressApp via the globally to attach middlewares properly! Obviously still utilize helmet and cors!
//Make sure to utilize the following here!

app.use('/', express.static(path.join(process.cwd, 'public')));
//For this utility to work properly the app.listen() call must be saved to variable named listen in camelCasing aka lowercase cause its one word!!
const listen = app.listen(3001);
//This is required as well!
process.child.on(GLOBALLY.getGlobalString(), ()=>{
    const fs = require('node:fs');
    console.log('Shutting down Server from parent before timeout!');
    app.removeAllListeners();
    listen.closeAllConnections();
    listen.close();
    setTimeout(() =>{
        console.log('Shutting Down Server from parent message to stop after timeout!');
    },10);
});
//I Really hope this utility helps Protect Application and Web Servers here in the future for streamline development process and production release!
//With a nice safety net design principle which utilizes the fact the merkle verification upon failure literally Denies
//The express app any requests prevents a modified malicious server from being able to execute the payload potentially!
//Solving alot of todays issues with express servers in nodeJS runetime and maybe might shed light on how they can convert this over to solve it in other applications and softwares!
```
