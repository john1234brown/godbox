// The God AKA Pheonix Box a Gift From God and a Pheonix With Some Root Hash Verification of a Isolated Container! For Express Static Webservers And NodeJS Applications!
// Author: Johnathan Edward Brown August 24, 2024
// License: GPL-3.0
console.log('The God Box Simple Isolated Webserver Hosting Module In NodeJS!');
console.log('Prevent Path Traversal Exploits');
console.log('Prevents HTML Defacing By Replacing and Fixing! Until a Bug Fix can Be Released! To Stop the Exploit!');
console.log('Utilizes Merkle Tree Verification Techniques!');
console.log('Author: Johnathan Edward Brown, Mentor: Vampeyer');
console.log('I Hope you Enjoy My Nice Application Layer Security Tool For Express!');

class GodBox {
    /*  Provides Server File = String, Server Folder =  String, number = interval
    */
    #devMode
    #serverFile
    #serverFolder
    #interval
    #merkleInterval
    #useEnv
    #GlobalReference
    #sandbox
    #context
    #breakValue
    #childEmitter
    #child
    #childcwd
    #childServerFile
    #childServerFolder
    #timeOut
    #TheBox
    #TheProtectorO
    #TimeOut
    #cwd
    #script //for vm script verification checks!
    #scriptRunning
  /*** 
    * @param {string} serverFile - Main Server File to Run in VM!
    * @param {string} serverFolder - Main Process Folder to Run in VM!
    * @param {number} interval - Main Server Restarting Interval in VM
    * @param {number} merkleInterval - Merkle File Check Interval Adjust as needed!
    * @param {boolean} useEnv - Are you using dotenv? true or false = yes or no! Defaults to false
    * @param {boolean} devMode - If using Development mode and want console logs set to true by default false!
    */
    constructor(serverFile, serverFolder, interval, merkleInterval, useEnv = false, devMode = false){
        this.#cwd = process.cwd();
        this.#breakValue = true;
        this.#devMode = devMode;
        this.#useEnv = useEnv;
        const originalConsoleLog = console.log;
        // Modified console.log function that only logs if devMode is true
        console.log = (...args) => {
          if (devMode) {
            originalConsoleLog(...args);
          }
        };
        //This Will Help Protect yalls Host Environment Variables From Being Leaked via your Webserver!
        //Utilizing traditional dotenv setup!
        const config = this.#generateConfig();
        Object.keys(process.env).forEach(key =>{
            if (!config.envVars[key]){
              delete process.env[key];
            }
        });
        this.#serverFile = serverFile;
        this.#serverFolder = serverFolder;
        this.#interval = interval;
        this.#merkleInterval = merkleInterval;
        this.#useEnv = useEnv;
        const os = require('node:os');
        const path = require('node:path');
        const fs = require('node:fs');
        const randomFileName = this.#generateRandomFileName(16); // Adjust length as needed
        const tempFilePath = `${os.tmpdir()}/${randomFileName}`;
        fs.cpSync(process.cwd(), tempFilePath, {recursive: true});
        this.#childServerFile = path.join(tempFilePath, serverFile);
        this.#childServerFolder = path.join(tempFilePath, serverFolder);
        this.#TheBox = this;
        this.#childcwd = tempFilePath;
        this.#child = this.#createCustomFork();
        // Create the file with restricted permissions
        //fs.writeFileSync(tempFilePath, code, { mode: 0o600 });
        this.#TimeOut = setTimeout(()=>{
            try {
                console.log('Testing:', this.#childServerFile);
                this.#runInVM(fs.readFileSync(this.#childServerFile));
                console.log('OH God yes!!!');
            }catch(err){
                console.log('OHHH NOOO GOD BOX WHERE ART Thou WHEN I NEED Thou THE MOST DONT Worry God Box Still Got You covered!! :D', err);
            }
        }, 5000);

        var booleanCheck = false;
        
        async function timeout(ms) {
          return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
              clearTimeout(timer);
              resolve();
            }, ms);
          });
        }

        //Properly clear VM Memory from context on shutdowns!!!
        process.on('SIGINT', async()=>{
          if (!booleanCheck){
          booleanCheck = true
          this.#breakValue = false;
          this.#TheProtectorO.toggleLock();
          console.log('SIGINT Starting Shut Down Promise!');
          try {
              await new Promise(async (resolve, reject) => {
                try {
                    await fs.promises.rm(this.#childcwd, { recursive: true, retryDelay: 1000, maxRetries: 10, force: true });
                    console.log('SIGINT: Finished removing directory!');
                    resolve();
                  }catch(err){
                    //console.log('Child closing Error:', err);
                    resolve();
                }
              });

              this.stop();
              return process.exit(0);
            }catch(err){
              console.log('Error on sigInt:', err);
            }
          return process.exit(0);
          }
        });

        process.on('SIGTERM', async()=>{
          if (!booleanCheck){
            booleanCheck = true
            this.#breakValue = false;
            this.#TheProtectorO.toggleLock();
            console.log('SIGTERM Starting Shut Down Promise!');
            try {
                await new Promise(async (resolve, reject) => {
                  try {
                      await fs.promises.rm(this.#childcwd, { recursive: true, retryDelay: 1000, maxRetries: 10 });
//                      await timeout(1000);
                      console.log('SIGTERM: Finished removing directory!');
                      resolve();
                    }catch(err){
                      console.log('Child closing Error:', err);
                      resolve();
                  }
                });
                return process.exit(0);
              }catch(err){
                console.log('Error on sigInt:', err);
              }
            return process.exit(0);
          }
        });
    }

    getGlobally(){
      return this.#GlobalReference;
    }

    #generateConfig() {
        const fs3 = require('node:fs');
        const config = {
          envVars: {}
        };
        if (this.#useEnv){
        const envContent = fs3.readFileSync('.env', 'utf8');
        const envVars = envContent.split('\n')
          .filter(line => !line.startsWith('#'))
          .reduce((acc, line) => {
            const [key, value] = line.split('=');
            acc[key.trim()] = { name: key, value: value.replaceAll('\"', "").trim() };
            return acc;
          }, {});
        
        config.envVars = { ...envVars };
        }
        return config;
    }


    #generateRandomFileName(length) {
        const crypto = require('node:crypto');
        return crypto.randomBytes(length).toString('hex');
    }

    #createCustomFork(){
      async function timeout(ms) {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            resolve();
          }, ms);
        });
      }

        if (this.#childcwd){
          async () =>{
          const fs = require('node:fs');
          await new Promise(async (resolve, reject) => {
            try {
                await fs.promises.rm(this.#childcwd, { recursive: true, retryDelay: 1000, maxRetries: 10, force: true });
                console.log('Finished removing directory!');
                resolve();
              }catch(err){
                console.log('Child closing Error:', err);
                resolve();
            }
          });
          }
        }
        const { EventEmitter } = require('node:stream');
        const { spawn } = require('child_process');
        const child = spawn('node', []); // Create a child process without a specific script
        //We isolate with our own environment and working directory along with a on listener!
        child.cwd = this.#childcwd;
        child.env = process.env;
        //Private communication channel properly!
        this.#childEmitter = new EventEmitter();
        child.on = this.#childEmitter.on;
        child.emit = this.#childEmitter.emit;
        child.on('close', async()=>{
          const fs = require('node:fs');
          await new Promise(async (resolve, reject) => {
            try {
                await fs.promises.rm(this.#childcwd, { recursive: true, retryDelay: 1000, maxRetries: 10, force: true });
                console.log('Finished removing directory!');
                resolve();
              }catch(err){
                console.log('Child closing Error:', err);
                resolve();
            }
          });
        });
        //child; //Clear out env mappings to protect users Personal Process Environment From being leaked from webserver side!
        console.log('Creating Child Fork:', child.cwd, child.env);
        return child;
    }
    //Need to include the blackbox module as well! to include obfuscations on vm server in context running!
    #runInVM(code){
        const fs3 = require('node:fs');
        const vm = require('node:vm');
        const path = require('node:path');
        if (this.#breakValue){
          const cwd = this.#childcwd;
          this.#TheProtectorO = this.#TheProtectorF(this.#serverFile, this.#serverFolder, this.#interval, this.#merkleInterval, this.#useEnv, this.#childcwd, this.#TheBox);
          const GLOBALLY = this.#generateGlobal(this.#TheProtectorO);
          this.#GlobalReference = GLOBALLY;
          this.#TheProtectorO.setGlobal(this.#GlobalReference);
          const EMITTER = this.#childEmitter;
          const child = this.#child;
          //console.log('Running context with process.env', process.env);
          // Create a sandbox with the necessary modules and variables
          this.#sandbox = {
              process: {
                  process: this.#child,
                  child: child,
                  env: this.#child.env,
                  cwd: this.#child.cwd
              },
              path,
              fetch,
              require,
              setTimeout,
              setInterval,
              clearInterval,
              clearTimeout,
              Buffer,
              global: {},
              GLOBALLY,
              EMITTER
          };
          if (this.#devMode){
            this.#sandbox.console = console;
          }

          // Add necessary global variables and functions
          this.#sandbox.global = this.#sandbox;
          // Create a context from the sandbox
          this.#context = vm.createContext(this.#sandbox);
          // Execute the code in the context
          console.log('Starting context run!');
          const modifiedCode = `
          //Author: Johnathan Edward Brown August 22, 2024
//Mentor: Vampeyer
//In hopes to help streamline developers on protecting there runetime in nodeJS!
//Thanks to extensive research with AST walkers and utilizing Merkle Tree Hashes along with Merkle Tree Root hash.
//To simplify calculations and detections on runetime changes and modifications / injections!!!
//Can potentially take this boiler plate template design to be able to streamline developers to create intricate ast walker designs!
//Which could help stop injections and malware payload delivery in runetime of NodeJs processes!
//I personally don't guarentee this is a fool proof design or pattern this is just a template to help better understand on how one can properly secure there variable scopages!
//Along with all loaded memory objects in runtime!

//const babelParser = require('@babel/parser');
//const recast = require('recast');

const crypto = require('crypto');

// Utility function to generate a hash
function generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

// Class definition
//Some can label TheBox as the Letter W for the in the WALL
class PandorasWall {
    #privateBox;
    #publicBox;
    #scope; // Private field to store the passed scope
    #masterBox

    constructor(scope) {
        this.#scope = scope; // Store the passed scope
        this.#publicBox = this.publicFunction();
        this.#privateBox = this.#privateFunction();
    }
    //I Will build out our own internal connections allowed on startup until merkle verification process as such to prevent injections before as such properly!
    //While including proper middleware design injection approach to encapsulate this security The Pandoras Wall some call it! Keeps all the bad stuff out! Behind the WALL!
    publicFunction() {
        class ThePublicBox {
            #connectionsAllowed

            constructor() {
                /*// Example code with multiple functions
                function exampleCode() {
                    function outerFunction() {
                        function innerFunction() {
                            console.log('Inner function');
                            //Put <Server Code Here>
                            ${code}
                        }
                        const innerAnonymous = function () {
                            console.log('Anonymous function');
                        };
                        innerFunction();
                        innerAnonymous();
                    }
                    outerFunction();
                }
                exampleCode();*/
            }
        }
        return new ThePublicBox();
    }
    //Author: Johnathan Edward Brown August 23, 2024
    //This will be our Core Functions for the WALL functionality which is the last two letters the LLs
    //This Can be Referred To Our A in the Word WALL
    #privateFunction() {
        class ThePrivateBox {
            #rootMemoryHash
            #secondaryMemoryHash
            #currentMemoryHash
            #booleanLock
            #booleanASTLock
            #rootASTHash
            #currentASTHash




            constructor(scope) {
                this.scope = scope; // Store the scope in ThePrivateBox instance
//                this.#privateFunction();
                this.#booleanLock = { lock: true };
//                this.#rootMemoryHash = this.#captureMemoryState(this);
//                this.#intervalF(); // Adjust interval as needed
                this.#privateFunctionG(scope, this);
//                this.#rootASTHash = this.#privateFunction();
                this.#rootASTHash = this.#exampleReverseTraverse();
                setInterval(() =>{
//                    this.#currentASTHash = this.#privateFunction();
                       this.#currentASTHash = this.#exampleReverseTraverse();
                    if (this.#rootASTHash === this.#currentASTHash){
                        console.log('NO changes detected in AST!');
                    }else{
                        console.log('WARNING WARNING WARNING YOU HAVE BEEN WARNED YOUR AST HAS DETECTED MODIFICATIONS TO THE RUNETIMES CODE!');
                        console.log('LOCKING AST!');
                    }
                }, 1000);
            }

            //Author Johnathan Edward Brown August 23, 2024
            //This Can be referred to as the letter L in the word WALL
            //This can be seen as the 2nd before last letter L in the word WALL as well! the parent of it all!
            #exampleReverseTraverse(){
                const crypto = require('crypto');

                // Utility function to generate a hash
                function generateHash(input) {
                    return crypto.createHash('sha256').update(input).digest('hex');
                }

                function reverseTraverseAndCapture(nodePath, localItems) {
                    let currentPath = nodePath;
                
                    // Traverse up the node chain
                    while (currentPath && currentPath.node) {
                        const node = currentPath.node;
                
                        if (node.type === 'FunctionDeclaration') {
                            localItems.add({
                                type: 'FunctionDeclaration',
                                name: node.id ? node.id.name : '<anonymous>',
                                hash: generateHash(JSON.stringify(node)),
                                node: currentPath,
                            });
                        } else if (node.type === 'FunctionExpression') {
                            localItems.add({
                                type: 'FunctionExpression',
                                name: node.id ? node.id.name : '<anonymous>',
                                hash: generateHash(JSON.stringify(node)),
                                node: currentPath,
                            });
                        } else if (node.type === 'ArrowFunctionExpression') {
                            localItems.add({
                                type: 'ArrowFunctionExpression',
                                name: '<anonymous>',
                                hash: generateHash(JSON.stringify(node)),
                                node: currentPath,
                            });
                        } else if (node.type === 'VariableDeclaration') {
                            node.declarations.forEach(declaration => {
                                if (declaration.id && declaration.id.name) {
                                    localItems.add({
                                        type: 'VariableDeclaration',
                                        name: declaration.id.name,
                                        hash: generateHash(JSON.stringify(declaration)),
                                        node: currentPath,
                                    });
                                }
                            });
                        }
                
                        // Move up to the parent node
                        currentPath = currentPath.parentPath;
                    }
                }

                const babelParser = require('@babel/parser');
                const recast = require('recast');
                /// Here we start our AST Merkle walk setup!
                const codeString = PandorasWall.toString();

                // Parse the string into an AST using @babel/parser
                const ast = babelParser.parse(codeString, {
                    sourceType: 'module',
                    plugins: ['classPrivateMethods', 'classPrivateProperties'],
                });
                // Usage for Reverse Traversal
                const reverseLocalItems = new Set();
                
                // Start from a given node path and traverse upwards
                recast.types.visit(ast, {
                    visitFunctionDeclaration(path) {
                        reverseTraverseAndCapture(path, reverseLocalItems);
                        return false; // Prevent downward traversal
                    },
                
                    visitFunctionExpression(path) {
                        reverseTraverseAndCapture(path, reverseLocalItems);
                        return false; // Prevent downward traversal
                    },
                
                    visitArrowFunctionExpression(path) {
                        reverseTraverseAndCapture(path, reverseLocalItems);
                        return false; // Prevent downward traversal
                    },
                
                    visitVariableDeclaration(path) {
                        path.node.declarations.forEach(declaration => {
                            reverseTraverseAndCapture(path, reverseLocalItems);
                        });
                        return false; // Prevent downward traversal
                    }
                });
                const combinedHash = generateHash(Array.from(reverseLocalItems).toString());
                //console.log(combinedHash);
                return combinedHash;
            }
            
            //Author Johnathan Edward Brown August 23, 2024
            //This will be responsible for capturing our global scopage!
            //This is The Last Letter L in the Word WALL The WHOLE PART OF IT!
            #privateFunctionG(scope, box){
                const crypto = require('crypto');

                // Utility for hashing
                function generateHash(input) {
                  return crypto.createHash('sha256').update(input).digest('hex');
                }

                // Capture the initial state of the entire memory and return Merkle root hash
                function captureMemoryState() {
                  // Store the global scope as a hash (or tree) using recursion or iteration
                    function hashObject(obj, visited = new Set(), depth = 0, maxDepth = 100000000) {
                        if (obj === null || obj === undefined) return generateHash('null');

                        const type = typeof obj;

                        if (type === 'string' || type === 'number' || type === 'boolean') {
                            return generateHash(obj.toString());
                        }

                        if (type === 'function') {
                            return generateHash(obj.toString());
                        }

                        if (visited.has(obj)) {
                            return generateHash('circular'); // Handle circular references
                        }

                        visited.add(obj);

                        if (depth > maxDepth) {
                            return generateHash('depth-exceeded'); // Prevent deep recursion
                        }

                        if (Array.isArray(obj)) {
                            return generateHash(obj.toString());
                        }

                        if (type === 'object') {
                            return generateHash(obj.toString());
                        }

                        return generateHash('unknown'); // Fallback for unexpected types
                    }
                    //We properly hash the process object, global object, and require object to check these for any injections as well!
                    //Since AST traversal can't catch these! only physical code injects!
                    //This helps prevent In Memory Code Injections using Object oriented Injections! or even module injections! and global injections!
                    const list = [hashObject(process), hashObject(global), hashObject(require)];
                    const finalHashes = hashObject(list);
                    //console.log('Scanned All:', JSON.stringify(list, null, 2));
                    //console.log(finalHashes);
                    return finalHashes;
                }

                // Start of secure initialization
                //Boiler plate provided by Chat GPT-4.0
                //Finalized By: Johnathan Edward Brown August 23, 2024 With Minor Adjustments!
                //We realized we dont have to take any thing out of scopage! we can utilize a boolean lock setup in a private function under one of its public function to properly do what is needed!
                function startMonitoring(box) {
                    //Initializes the rootMemoryHash while still retaining the original!
                    box.#rootMemoryHash = captureMemoryState();
                    setInterval(() => {
                        box.#currentMemoryHash = captureMemoryState();
                        if (box.#rootMemoryHash === box.#currentMemoryHash && box.#booleanLock.lock){
                          console.log('No Change Detected in Process Memory From Original Root Hash!');
                        }
    
                        if (box.#rootMemoryHash !== box.#currentMemoryHash && box.#booleanLock.lock) {
                          box.#secondaryMemoryHash = box.#currentMemoryHash;
                          box.#booleanLock.lock = false;
                          console.log('Locking! Process has noticed a change in runtime Please be weary of this! if you didnt intentionally do this please pay CLOSE ATTENTION TO THIS CONSOLE LOG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        }else if(box.#secondaryMemoryHash !== box.#currentMemoryHash && !box.#booleanLock.lock){
                           console.log('Changes Detected in Process Memory! From Backup Secondary Hash WARNING THIS IS NOT GOOD! You have been warned! This process has been tampered with no doubt about it!');
                        }else if(box.#secondaryMemoryHash === box.#currentMemoryHash && !box.#booleanLock.lock){
                            console.log('No Changes Detected in Process Memory! From Backup Secondary Hash WARNING THIS IS NOT GOOD! You have been warned! This Process may have been tampered with!');
                        }
                    }, 1000);
                    //Initializes the rootMemoryHash while still retaining the original!
                    //box.#rootMemoryHash = captureMemoryState();
                }

                // Security Considerations
                process.child.on('uncaughtException', (err) => {
                  console.error('Unhandled Exception:', err);
                  // Implement logging or alerting
                });

                process.child.on('unhandledRejection', (reason, promise) => {
                  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
                  // Implement logging or alerting
                });
                startMonitoring(box);
            }
        }

        // Pass the stored scope when creating ThePrivateBox instance
        return new ThePrivateBox(this.#scope);
    }
}
//Check from current scopage!
// Create an instance of TheBox, passing in the current scope
new PandorasWall(this);

          `
          //fs3.writeFileSync('./output.js', modifiedCode);
          try {
            vm.runInContext(modifiedCode, this.#context);
          }catch(err){
            console.log('Error:', err);
          }

          this.#timeOut = setTimeout(() => {
              console.log('Stopping VM...');
              this.#rotateObby();
              this.#runInVM(code);
          }, this.#interval);
        }else{
          return;
        }
    }



    #rotateObby() {
        //Kills the original Process and Re creates Secondary Process for a Refresh of the potentially infected process!
//        process.kill(this.#child.pid); //Better method to kill vm context to not need communication channels!
        this.#child.emit(this.#GlobalReference.getGlobalString());
        this.#child.kill(); //Properly Kill!
        console.log('Chiled: ', this.#child.killed);
        console.log(this.#child.exitCode, 'Child exit code');
        this.#TheProtectorO.terminate();
        return;
    }

    #generateGlobal(theProtectorC){
        class JBGlobal {
          #GLOBAL_STRING
          #expressApp
          #TheProtector
          #maxHeaderSize
          #maxBodySize
          #expressSymbol
          #expressLock


          constructor(theProtectorC){
            this.#GLOBAL_STRING = this.#generateRandomString(2048);
            this.#expressSymbol = Symbol(this.#GLOBAL_STRING);
            this.#TheProtector = theProtectorC;
            this.#expressLock = 0;

          }

          /**Encapsulate the Random Function as a private function
           * @param {number} length - The length of the random string to generate
           * @returns {string} - The generated random string
           */
          #generateRandomString(length) {
            const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
            let randomString = '';
            const firstCharIndex = Math.floor(Math.random() * letters.length);
            randomString += letters[firstCharIndex];
            for (let i = 1; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * charset.length);
              randomString += charset[randomIndex];
            }
            return randomString;
          }
          /**
             * @returns {symbol} - The global Symbol Object
          */
          getGlobalSymbol(){
           return this.#expressSymbol;
          }
          /**
          * @returns {string} - The global String
          */
          getGlobalString(){
           return this.#GLOBAL_STRING;
          }
          /***
           * @param {express.application} app - The Express application from server context to protect!
           * 
           */
          setExpressApp(app, JBGlobal){
            console.log('Set express app called!');
            if (this.#expressLock === 0){
            this.#expressApp = app;
            this.#expressLock = 1;
            this.#expressProtect(app, JBGlobal);
            }else{
              console.log('Malicious Activity Detected on the setExpressApp Call Please Double Check your Servers Code!');
              return;
            }
          }

          #expressProtect(app, JBGlobal){

            function isExpressApp(obj, JBGlobal){
              const isExpressAppSymbol = JBGlobal.getGlobalSymbol();
              return obj && obj[isExpressAppSymbol] === true;
            }

            if (isExpressApp(app, JBGlobal)){
              console.log('Success its a express application!');
            }else{
              console.log('Malicious Activity detected trying to set the express app in context to overwrite handlers!');
              return;
            }
            //TODO: Finish the Built in Express protections!
            //Finished: 
            //Path Traversal protection yes even for express static servers! suprising huh!
            //Include Overflow on header checks!
            //Include Express App checks!
            //Utilize the JBGlobal merkleVerify to include a middleware to prevent express apps from listening to requests when infected!
            //
            console.log('Success!!!');
            app.use((req, res, next) => {
              //Dont even load in the req object into memory or usage so not to execute malicious request on check!
              switch(JBGlobal.getMerkleVerify()){
                case 0:
                  res.status(200).send(JSON.stringify(
                    {
                      Error: 'Error please try again in like 1 second for the server to be refreshed!',
                      Warning: 'Dont worry our Merkle Verification System is currently loading up requests are not allowed until verification!, You Are secure with us!'
                    }
                  ));
                  break;
                case 1:
                  next();
                   //Response go through merkle is verified!
                  break;
                case 2:
                  res.status(404).send(JSON.stringify(
                    {
                      Error: 'Error please try again in like 1 second for the server to be refreshed!',
                      Warning: 'Dont worry our Merkle Verification System has prevented some malicious Activity on our network, You Are secure with us!',
                      Message: 'Our Merkle Verification System Deletes Malicous Modified Server Files and Replaces With Original Starts Back Up, So You can Be in peace of mind of your web application security.',
                      Hackers: "Nice Try......"
                    }
                  ));
                default://Properly deny on defaults just incase!!!!! Since using a switch statement here!!!!
                  res.status(404).send(JSON.stringify(
                    {
                      Error: 'Error please try again in like 1 second for the server to be refreshed!',
                      Warning: 'Dont worry our Merkle Verification System has prevented some malicious Activity on our network, You Are secure with us!',
                      Message: 'Our Merkle Verification System Deletes Malicous Modified Server Files and Replaces With Original Starts Back Up, So You can Be in peace of mind of your web application security.',
                      Hackers: "Nice Try......"
                    }
                  ));
                  break;
              }
            });
            
            app.use((req, res, next) => {
              // Basic header length check (adjust limit as needed)
              const totalHeaderLength = Object.keys(req.headers).reduce((acc, header) => acc + header.length + req.headers[header].length, 0);
              if (totalHeaderLength > 8192 /* from NodeDocs max safe node size headers by default!*/) {
                return res.status(413).send('Request headers too large');
              }
            
              next();
            });

            // Custom middleware for path validation! Provided By AI Gemini Snippet used in multiple projects 
            function sanitizePath(req, res, next) {
              const path = require('node:path');
              //const allowedChars = /^[a-zA-Z0-9_\-\.]+$/; // Adjust allowed characters as needed
              const normalizedPath = path.normalize(req.path);
              req.sanitizedPath = normalizedPath;
              next();
            }
            app.use(sanitizePath);

            //Sanitize all query params for path traversal exploits! Provided By AI Gemini Snippet used in multiple projects as utility finally decided to make it as true utility!
            function sanitizeQueryParams(req, res, next) {
              //Modified to utilize normalize path method above!
              const path = require('node:path');
              // Iterate through query parameters
              for (const key in req.query) {
                if (req.query.hasOwnProperty(key)) {
                  // Basic sanitization: remove potential path traversal characters
                  req.query[key] = req.query[key].replace(/[\/\\]/g, '');
                  // Additional sanitization based on specific needs (e.g., whitelisting characters)
                }
              }
              next();
            }
            app.use(sanitizeQueryParams);
            console.log('Success!!!');
        }

          getMerkleVerify(){
            return this.#TheProtector.getMerkleVerify();
          }

        }
        //By giving the web server its own global context to communicate globally and have it obfuscated ensures extra security!
        //Basically its own emitter in local private scope to prevent attaching or using the emitter from anywhere else proper communication channel scopage design pattern!
        //Johnathan Edward Brown Waz here AND THE VAMPEYER WAZ HEREE!!! <- Credits to Vampeyer for Teaching me this Design pattern Principle!
        return new JBGlobal(theProtectorC);
    }


    //Author: Johnathan Edward Brown, August 19, 2024
    //The Merkle Verification Protector Class Object for Merkle verifying the Server!
    #TheProtectorF(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox){
        //We will spawn our own Seperate child process that is unref to be able to rewrite files to the directory! and reset back to original!
        class TheProtectorC{
            #childcwd
            #serverFile
            #serverFolder
            #interval
            #useEnv
            #theBox
            #fileList
            #execList
            #answer
            #timeOut

            #lock
            #loopBreak
            #lock3 //Fix another loop issue lol!

            #cwd
            MerkleVerified
            #JBGlobal
            #executor

            constructor(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox){
              const fs = require('node:fs');
              const path = require('node:path');
              this.#cwd = process.cwd();
              this.#serverFile = serverFile;
              this.#serverFolder = serverFolder;
              this.#interval = interval;
              this.#useEnv = useEnv;
              this.#childcwd = childCWD;
              this.#theBox = theBox;
              this.#lock = false;
              this.#lock3 = false;
              this.#loopBreak = true;
              this.MerkleVerified = 0;
              //We still utilize our original singleThreadedExecuorService setup! will attempting a workerpool setup in our #runInVm function in the GodBox class!
              //For checks of merkle verification on the code there!
              //We encapsulate our singleThreadedExecutorService provided by Gemini Ai Snippet for usage of a singleThreadedExecutorService setup!
              class SingleThreadedExecutorService {
                constructor() {
                  this.queue = [];
                  this.isProcessing = false;
                }
              
                submitTask(task) {
                  return new Promise((resolve, reject) => {
                    this.queue.push({ task, resolve, reject });
                    this.processQueue();
                  });
                }
              
                processQueue() {
                  if (!this.isProcessing && this.queue.length > 0) {
                    this.isProcessing = true;
                    const { task, resolve, reject } = this.queue.shift();
                    task().then(resolve).catch(reject).finally(() => {
                      this.isProcessing = false;
                      this.processQueue();
                    });
                  }
                }
              }
              //const executor = new SingleThreadedExecutorService();
              //this.#executor = executor;
              //executor.submitTask(async()=>{
                //while(this.#loopBreak){
              this.#timeOut = setInterval(async () =>{
                  console.log('Merkle interval Started!');
                  try {
                  if (this.#fileList && this.#execList && this.#lock === false && this.#loopBreak === true){
                      this.#lock = true;
                      console.log('Starting Calculation');
                      //Optimized August 20, 2024 By Johnathan Edward Brown //Redacted dual rebuilding of fileList!
                      this.#answer = await this.calculateCombinedxxHash(this.#fileList, this.#execList);
                      this.#lock = false;
                  }else if(this.#lock === false && this.#loopBreak === true){
                      console.log('Starting first Mekrkle Round!');
                      this.#lock = true;
                      this.#fileList = await this.#readFilesRecursively(process.cwd());//The Original Directory
                      //fs.writeFileSync(path.join(process.cwd(), "fileList.json"), JSON.stringify(this.#fileList, null, 2));
                      this.#execList = await this.#readFilesRecursively(this.#childcwd); //The Actual Serving Directory
                      //fs.writeFileSync(path.join(process.cwd(), "fileList2.json"), JSON.stringify(this.#execList, null, 2));
                      console.log('Starting Calculation');
                      this.#answer = await this.calculateCombinedxxHash(this.#fileList, this.#execList);
                      console.log('Finished!');
                      this.#lock = false;
                  }else if(this.#loopBreak === false){
                      clearInterval(this.#timeOut);
                      return;
                  }else if(this.#loopBreak === true && this.#lock === true){
                    console.log('Cant merkle start still calculating merkle currently!');
                    return;
                  }
                  }catch(err){
                      console.log('Err:', err);
                  }
              }, merkleInterval);

              //Deprecated the inteval setup! due to security concerns!
              //We want our modules entire process execution space to be used up for the entire merkle process thus this didnt do so we could see the loopbreak and lock logs
              //Log out the usage of cant merkle start still calculating merkle currently all though! that is good but it doesnt really precisely protect to the level of security with merkle verification that I need!
              //Still usable code so leaving here as reference but leaving notes as why we redacted this!
              /*this.#timeOut = setInterval(async () =>{
                  console.log('Merkle interval Started!');
                  try {
                  if (this.#fileList && this.#execList && this.#lock === false && this.#loopBreak === true){
                      this.#lock = true;
                      console.log('Starting Calculation');
                      //Optimized August 20, 2024 By Johnathan Edward Brown //Redacted dual rebuilding of fileList!
                      this.#answer = await this.calculateCombinedHash(this.#fileList, this.#execList);
                      this.#lock = false;
                  }else if(this.#lock === false && this.#loopBreak === true){
                      console.log('Starting first Mekrkle Round!');
                      this.#lock = true;
                      this.#fileList = await this.#readFilesRecursively(process.cwd());//The Original Directory
                      //fs.writeFileSync(path.join(process.cwd(), "fileList.json"), JSON.stringify(this.#fileList, null, 2));
                      this.#execList = await this.#readFilesRecursively(this.#childcwd); //The Actual Serving Directory
                      //fs.writeFileSync(path.join(process.cwd(), "fileList2.json"), JSON.stringify(this.#execList, null, 2));
                      console.log('Starting Calculation');
                      this.#answer = await this.calculateCombinedHash(this.#fileList, this.#execList);
                      console.log('Finished!');
                      this.#lock = false;
                  }else if(this.#loopBreak === false){
                      clearInterval(this.#timeOut);
                      return;
                  }else if(this.#loopBreak === true && this.#lock === true){
                    console.log('Cant merkle start still calculating merkle currently!');
                    return;
                  }
                  }catch(err){
                      console.log('Err:', err);
                  }
              }, merkleInterval)*/
            }

            async #readFilesRecursively(folder, fileList = []) {
                const fs = require('node:fs');
                const path = require('node:path');
                try {
                  const files = await fs.promises.readdir(folder);
                  for (const file of files) {
                    const filePath = path.join(folder, file);
                    //console.log(filePath);
                    const stats = await fs.promises.stat(filePath);
              
                    if (stats.isDirectory()) {
                      // If the current item is a directory, recursively call the function
                      await this.#readFilesRecursively(filePath, fileList);
                    } else if (stats.isFile()) {
                      // If the current item is a file, add its path to the array
                      fileList.push(filePath);
                    }
                  }
                  return fileList;
                } catch (error) {
                  console.error('Error reading files:', error);
                  //throw error; // Rethrow the error to handle it elsewhere if needed
                }
            }

            async calculateCombinedMd5Hash(fileList, execFiles) {
              var fileHashes = [];
              var file2Hashes = [];

                async function calculateHash(filePath) {
                    try {
                      // Read file asynchronously
                      const data = await fs.promises.readFile(filePath);
                  
                      // Calculate hash
                      const hash = crypto.createHash('md5'); //Originally we used sha256 for btc but today more eco friendly and still secure designs prove we can use md5 believe it or not as long as the merkleInterval timing is fast enough!
                      hash.update(data);
                  
                      // Return the hash value
                      return hash.digest('hex');
                    } catch (error) {
                      // Handle errors, e.g., file not found, etc.
                      console.log(error);
                    }
                }
                const fs = require('node:fs');
                const path = require('node:path');
                const crypto = require('node:crypto');
                try {
                    for (const file of fileList){
                      try {
                      const filePath = path.join(file);
                      if (fs.statSync(filePath).isFile()) {
                        const fileHash = await calculateHash(filePath);
                        fileHashes.push(fileHash);
                      }
                      }catch(err){
                        console.log('Failed Calculating Hash For:', file,'Had An Error:', err);
                        break;//Properly Break our For loops upon error!
                      }
                    }

                    for (const file of execFiles){
                      try {
                      const file2Path = path.join(file);
                      if (fs.statSync(file2Path).isFile()) {

                        const file2Hash = await calculateHash(file2Path);
                        file2Hashes.push(file2Hash);
                      }
                      }catch(err){
                        console.log('Failed Calculating Hash For:', file,'Had An Error:', err);
                        break;//Properly Break our for loops upon error!
                      }
                    }
                    
                    const combinedHash = crypto.createHash('md5');
                    combinedHash.update(fileHashes.join(','));
                    const execHash = crypto.createHash('md5');
                    execHash.update(file2Hashes.join(','));
                    const answer = {
                      firstHash: combinedHash.digest('hex'),
                      secondHash: fileHashes,
                      thirdHash: execHash.digest('hex'),
                      fourthHash: file2Hashes,
                    };
                    if (answer.firstHash === answer.thirdHash){
                        this.MerkleVerified = 1;
                        console.log('Merkle Verification Passed!','\nHash:', answer.firstHash, '\nHash:',answer.thirdHash);
                        //fs.writeFileSync(path.join(process.cwd(), 'merkles.json'), JSON.stringify(answer, null, 2));
                    }else{
                        this.MerkleVerified = 2;
                        console.log('Merkle Verification Failed Attempting to Shutdown and Reset!');
                        //fs.cpSync(this.#cwd, this.#childcwd, {recursive: true});
                        this.#theBox.restart(this.#serverFile, this.#serverFolder, this.#interval, this.#useEnv); //Restart the box!
                        //this.#theBox.terminate();
                    }
                    return answer;
                }catch(e){
                  console.log(e);
                  return;
                }
            }

            async calculateCombinedxxHash(fileList, execFiles) {
              const crypto = require('node:crypto');
              const XXHash = require('xxhash');
              var fileHashes = [];
              var file2Hashes = [];
              const seed = crypto.randomBytes(4);
                async function calculateHash(filePath) {
                    try {
                      // Read file asynchronously
                      const data = await fs.promises.readFile(filePath);
                  
                      // Calculate hash
                      const hash = XXHash.hash64(Buffer.from(data), Buffer.from(seed)).toString('hex'); //Originally we used sha256 for btc but today more eco friendly and still secure designs prove we can use md5 believe it or not as long as the merkleInterval timing is fast enough!
              //        hash.update(data);
                  
                      // Return the hash value
                      return hash;
                    } catch (error) {
                      // Handle errors, e.g., file not found, etc.
                      console.log(error);
                    }
                }
                const fs = require('node:fs');
                const path = require('node:path');
                try {
                    for (const file of fileList){
                      try {
                      const filePath = path.join(file);
                      if (fs.statSync(filePath).isFile()) {
                        const fileHash = await calculateHash(filePath);
                        fileHashes.push(fileHash);
                      }
                      }catch(err){
                        console.log('Failed Calculating Hash For:', file,'Had An Error:', err);
                        break;//Properly Break our For loops upon error!
                      }
                    }
              
                    for (const file of execFiles){
                      try {
                      const file2Path = path.join(file);
                      if (fs.statSync(file2Path).isFile()) {
              
                        const file2Hash = await calculateHash(file2Path);
                        file2Hashes.push(file2Hash);
                      }
                      }catch(err){
                        console.log('Failed Calculating Hash For:', file,'Had An Error:', err);
                        break;//Properly Break our for loops upon error!
                      }
                    }
                    
                    const combinedHash = XXHash.hash64(Buffer.from(fileHashes.join(',')), Buffer.from(seed)).toString('hex');
                    const execHash = XXHash.hash64(Buffer.from(file2Hashes.join(',')), Buffer.from(seed)).toString('hex');
                    const answer = {
                      firstHash: combinedHash,
                      secondHash: fileHashes,
                      thirdHash: execHash,
                      fourthHash: file2Hashes,
                    };
                    if (answer.firstHash === answer.thirdHash){
                        this.MerkleVerified = 1;
                        console.log('Merkle Verification Passed!','\nHash:', answer.firstHash, '\nHash:',answer.thirdHash);
                        //fs.writeFileSync(path.join(process.cwd(), 'merkles.json'), JSON.stringify(answer, null, 2));
                    }else{
                        this.MerkleVerified = 2;
                        console.log('Merkle Verification Failed Attempting to Shutdown and Reset!');
                        //fs.cpSync(this.#cwd, this.#childcwd, {recursive: true});
                        this.#theBox.restart(this.#serverFile, this.#serverFolder, this.#interval, this.#useEnv); //Restart the box!
                        //this.#theBox.terminate();
                    }
                    return answer;
                }catch(e){
                  console.log(e);
                  return;
                }
            }
              
            setGlobal(JBGlobal) {
              this.#JBGlobal = JBGlobal;
            }

            getMerkleVerify(){
              return this.MerkleVerified;
            }

            terminate(){
                clearInterval(this.#timeOut);
                this.#loopBreak = false;
                this.#lock = true;
                delete this;
            }

            toggleLock(){
              this.#lock3 = true;
            }

            getLock3(){
              return this.#lock3;
            }

        }
        return new TheProtectorC(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox);
    }

    terminate(){
        this.#breakValue = false;
        this.#child.emit(this.#GlobalReference.getGlobalString());
        this.#child.kill(); //Properly Kill!
        console.log('Chiled: ', this.#child.killed);
        console.log(this.#child.exitCode, 'Child exit code');
        this.#TheProtectorO.terminate();
        clearTimeout(this.#timeOut);
    }

    restart(serverFile, serverFolder, interval, useEnv){
        if (this.#TheProtectorO.getLock3 === false){
        console.log('Restarting with:', serverFile, serverFolder, interval, useEnv);
        this.terminate();
        delete this;
        return new GodBox(serverFile, serverFolder, interval, useEnv);
        }
    }
    /***
     * Calling this will
     * @returns process.exit(0);
     */
    stop(){
      const fs = require('node:fs');
        try {
          fs.rmSync(this.#childcwd, {recursive: true, retryDelay: 1000, maxRetries: 10});
        }catch(err){
          //console.log('Error on Stop removing Directory:', err);
        }
        this.terminate();
        delete this;
        return;
    }
}

//Deprecated and Redacted due to potential bug and issues!
//Example why this utility cant be used in a simple require('godbox').set() setup due to the nature of duplicating servers from server context! side!
//The Reason we lost the source code for it sadly in the first place..... -_- -___- -__- simple mistakes make the developer better though!
/*
function set(app, serverFile, serverFolder, interval, merkleInterval, useEnv){
  if (app){
      const express = require('express');
      if (app instanceof express.application){
        const box = new GodBox(serverFile, serverFolder, interval, merkleInterval, useEnv);
        box.getGlobally().setExpressApp(app);
        return box;
      }
  }
}*/

module.exports = { GodBox }

