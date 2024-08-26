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