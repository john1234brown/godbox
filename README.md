# JohnnyKins-GodBox Also Could be named Pheonix Box

**Warning Godbox-dev is now deprecated this godbox utility has it all in one design pattern solution now!**
**For Seperate environment modes such as production and development modes!**

- The isolated VM Express Webserver hosting solution for nodeJS.
- Without The Need for Obfuscation Due to the unique Fact and Nature of Pure Merkle Verification setup with Proper scopage to not pose a backdoor from webserver side to stop it. Like my johnnykins-blackbox and johnnykins-blackbox-dev setups!
- This utilizes a VM Context and A Child Process with its own environment variables Setup!
- This Utilizes a Recreation tactic like how a pheonix dies and rebirths itself very similar thing here utilizings a merkle tree verification setup!
- So when Something is found wrong with the server files it will stop it and restart it! And Properly Resetup the files and remove the infected directory!
- This is why i want to include the simple path traversal exploit protection thus would allow for pure webserver setup in a secure manner! And Help streamlining setup for developers!
- Will work on example codes here soon But I have done some tests so far and will be uploading to the this Github repository.

## What is our purpose

Well with the growing hacking issues in todays technologies, specifically the application layer of nodeJS and the express runtime! There tends to be issues when making express apps using just helmet, cors setups one can still run the risk of accidental backdoors in there applications as they develop!
So I have decided to help streamline developers today with my utility package I really hope this helps add and secure those in mind!

- We offer basic Request Header Size limit setting for protecting headers of requests!! <-Coming Soon!
- ***v|Finished|v***
- Removes Basic path traversal exploits in express static serving!
- Removes Path Traversal Exploits via query parameters!
- We will not offer Request Body Sanitizations that is up to the Web Server Developer at that point to properly sanitize your endpoints!
- Example of how to use bodyParser a great module which offers this solution!
- Merkle Verification Express request interceptor middleware design solution to prevent malicious server from being able to execute payload by accepting final request to make it read said payload and execute!
- Which tends to be the most scariest of hacks going around these days exploiting backdoors in ones application to infect it to open up the machine to be a botnet!
- So to help New coming developers in there web development process and have peace of mind in working with there servers without worrying of potential backdoors like this!
- And To Help Junior developers / Senior Developers Educate in a faster streamlined manner on ones security practices and principles!
- Specifically in the NodeJS Express Realm of Developement as this is my main root stack per say! Anybody is welcome to convert, this utility to other programming languages as they wish and is actually is recommended to do so!

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); // Support JSON-encoded bodies up to 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Support URL-encoded bodies up to 50MB

// Your routes
```

- Due to the Potential of it conflicting with the sole purpose of being a fail safe process for your webserver is really what this utility is utilizing merkle tree verification techniques in private function in a class setup to properly keep out of context!

## Examples

- Newest Setup Style the one Below will be updated with the following!
- *production mode*
- Setup
- [NPM Site](https://www.npmjs.com/package/godbox)
- server doesnt have console logs but merkle process does!

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

- [Here is the link click to check out the example!](https://github.com/john1234brown/godbox/tree/example)
- Will be releasing core pandorasWall design code! Which was made for helping to protect this GodBox module!
- And Will Be Released as its own module here Soon!

## Background Story

Well Among my days of making nodeJS applications and on my journey to become a successful senior developer in the industry i've personally always suffered from needing to properly secure every application I've attempted to make, ...sadly some made using my own utility files and sometimes finding myself loosing these files just to have to remake them all again! I sometimes grow restless over this and I Feel releasing our security tools and utilitys for public usage would solve this and also help junior developers succeed in there future careers from the public knowledge being available.
So Ive Decided to make a simple answer and solution on how to protect ones NodeJS applications or programs!
Ive come up with simple merkle verification setup process in nodeJS sadly i released it while back ago but thought to make service to sell it! But I personally rather publicly release it for the future of developers to utilize and be able to succeed in there future creations.
Ive personally helped make the Nodes for BTC specifically the core template pseudo design all in NodeJS and came up with this utility solution file for protecting incase of potential backdoors! and I feel its time to publicly release this utility as we see today the security of such a system in design I did this because I personally never made any successful applications or services but ive passed very good utility solutions in the pass which helped others developers succeed in there careers which they where only personal developers I knew and as I grow older the more I feel its time not to share with just who I choice but with the world.
I will still continue my journey as developer always and will hopefully one day release successfuly application and service or software of my own. But for now! I release my greatest creation as a utility tool.
                                                                                                                                                                                                    - Sincerely Satoshi Johnathan Edward Brown August 20, 2024

## PandorasWall a sub class created for this godBox and its purpose!

## Author Johnathan Edward Brown August 24, 2024

- NodeJS Utility and Boilerplate design pattern for securing ones environment and runtime properly from runtime injections such as Code and Memory Injections!
- This is to help streamline young developers into understanding the AST traversal walk setup ontop of setting up a hashing system for runtime memory objects in a way to capture just about all objects in runtime in the memory of ones setup! Which is why we also utilize a AST for code injections which could cause a memory object to surface most the times.. unless a pure memory inject rather... Then for those I would advise consulting with a true security expert On more details on how to properly do such!
- Ive spent about a week on this benchmark running so anyone is welcome to pentest this design pattern structure to help come up with more secure and proper boiler plate designs for the community to help alleviate in the persisting security concerns in the NodeJS runtime! and The NodeJS Developer Realm!

### Personal Comments and Statements

- I hope this is of some use to developers as such as it was for me to benchmark test and do runs on setting up a new concept and design pattern due to the increasing concerns in race condition attacks! Which honestly took advantage of bad excessive securiy calculations to protect ones runtime...
- So I tried my best to come up with a super simple design pattern easy to use Class Object which can be spawned to wrap ones existing nodeJS application in said protections...
- Honestly took me quite sometime and extensive research on learning proper Class and private Fields setups! Along with proper variable passing to not give out access to the existing variables that are responsible for securing ones program!
- You're Probably looking at 2 years of studying and about 1 week of truly designing this out Ironically I attempted all of this when I was much younger and not as experienced!
- Like not even 1 month of using nodeJS back when I first got into it in 2014. I actually got quite close to a decent core principle design pattern.
- But Sadly Due to lack of experience and understanding how to optimize ones code in another langauge tended to run me into another wall per say lol!
- But gladly this didn't stop me and Big Thanks to my amazing Mentor Vampeyer who wouldn't let me give up! I think today I Will finally publicly release a decent BoilerPlate design for this.
- But I Might Hold Off until I get my godbox utility completed for usage with this before hand...
- So you might be seeing this publicly after its already available in the GodBox utility and bundled as such.
- I Also include a full list of my benchmarks tests and runs of different snippets of codes which helped me get to my final goal.
- Which I will include as a zip file in the release section of this Repository!

### Notes for PandorasWall

Upon experimenting with the current code setup!
Ive noticed i need to most likely optimize the merkle file verification to not happen so frequently as its causing intensive cpu usage! other then that ITs doing great and better than i thought!

Very good success averaging 150% cpu usage now if i get this down to a average of 25% then we will be doing something that works great and properly secures ones runetime! while not causing race conditions like this current setup and design pattern! tends to due!

### Finished completed

- Cpu usage on average is about 7% to 12% on acer chromebook 315
