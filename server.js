const express = require('express');
const app = express();
const isExpressSymbol = GLOBALLY.getGlobalSymbol();
app[isExpressSymbol] = true;

GLOBALLY.setExpressApp(app, GLOBALLY);
//Make sure to ^ Set your expressApp via the globally to attach middlewares properly! Obviously still utilize helmet and cors!
//Make sure to utilize the following here!
process.child.on(GLOBALLY.getGlobalString(), ()=>{
    console.log('Shutting down Server from parent before timeout!');
    app.removeAllListeners();
    listen.closeAllConnections();
    listen.close();
    setTimeout(() =>{
        console.log('Shutting Down Server from parent message to stop after timeout!');
    },10);
})


app.use('/', express.static(path.join(process.cwd, 'public')));
const listen = app.listen(3001);