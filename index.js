// The God AKA Pheonix Box a Gift From God and a Pheonix With Some Root Hash Verification of a Isolated Container! For Express Static Webservers And NodeJS Applications!
// Author: Johnathan Edward Brown August 24, 2024
// License: GPL-3.0
console.log('The God Box Simple Isolated Webserver Hosting Module In NodeJS!');
console.log('Prevent Path Traversal Exploits');
console.log('Prevents HTML Defacing By Replacing and Fixing! Until a Bug Fix can Be Released! To Stop the Exploit!');
console.log('Utilizes Simple Merkle Root Hash Verification Technique For Optimal Cpu Usage!');
console.log('Finalized Runtime Express Protection Middleware!');
console.log('Dual Express Protection Middleware Design Runtime/Physical File Protection');
console.log('Author: Johnathan Edward Brown, Mentor: Vampeyer');
console.log('I Hope you Enjoy My Nice Application Layer Security Tool For Express!');
var fs = require('node:fs');
//Source Code GodBox Class!
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
    #TrueAnswer
    #TrueAnswerLock
    fileList
    execList

  /*** 
    * @param {string} serverFile - Main Server File to Run in VM!
    * @param {string} serverFolder - Main Process Folder to Run in VM!
    * @param {number} interval - Main Server Restarting Interval in VM! Also Reobfuscates the GodBox import from this Interval and Server Code!!
    * @param {number} merkleInterval - Merkle File Check Interval Adjust as needed!
    * @param {boolean} useEnv - Are you using dotenv? true or false = yes or no! Defaults to false
    * @param {boolean} devMode - If using Development mode and want console logs set to true by default false!
    * @param {boolean} fsMiddleware - Utilize middleware on fs to contain the sandbox process! to the folder it is in! Defaults to true!
    * @param {object} console - Set Console up for process! example { log: console.log(), error: console.erro() } defaults to this example!
    * @param {object} fsOverride - Limit The Nodes:FS Module capabilites And functions! Example: { readSync: fs.readSync(), writeSync: fs.writeSync() } Defaults to allow promises and sync of read, write, rm, cp
    * 
    */
    constructor(
      serverFile,
      serverFolder,
      interval,
      merkleInterval,
      useEnv = false,
      devMode = false,
      fsMiddleware,
      consoleOverride = {
        log: console.log,
        error: console.error
      },
      fsOverride = {
        read: fs.read,
        readSync: fs.readSync,
        readFileSync: fs.readFileSync,
        cpSync: fs.cpSync,
        cp: fs.cp,
        rmSync: fs.rmSync,
        rm: fs.rm,          
        writeSync: fs.writeSync,
        write: fs.write,
        writeFile: fs.writeFile,
        writeFileSync: fs.writeFileSync,
        promises:{
          readdir: fs.promises.readdir,
          readFile: fs.promises.readFile,
          rm: fs.rmSync,
          cp: fs.cpSync,
          writeFile: fs.promises.writeFile,

        }
      }
      ){
        const path = require('node:path');
        this.#cwd = process.cwd();
        this.#breakValue = true;
        this.#devMode = devMode;
        this.#useEnv = useEnv;
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        //There is a big reason why I Define my own Definition for the FS module and heres Why!
        //Due to issues with modules themselves being used for attacks on webservers! setting up ones servers design like so and utilizing!
        //A obfuscator to obfuscate this godBox import as its being used will technically obfuscate the references and usages of the fs module!
        //Since we define the fs module here! and override it so these names get obfuscated in runetime!
        //Since it directly passes the fs to the child process as the same module to use it properly uses the obfuscated references im place of the original fs calls in the child webServer!
        //Thus if we also include a obfuscation method for childProcess code to be ran as well! then we properly Help shield where the fs module is in runtime from public endpoint side!
        //This helps to ensure ones server files and folders can't be modified due to this backdoor! of being able to pinpoint the fs module in server through public endpoint!
        fs = fsOverride;
        //Here we intercept consoles values properly to prevent using other console access to bypass the middleware setup!
        console = consoleOverride;
        // Modified console.log function that only logs if devMode is true
        console.log = (...args) => {
          if (devMode) {
            originalConsoleLog(...args);
          }else{
            return;  
          }
        };
        console.error = (...args) => {
          if (devMode) {
            originalConsoleError(...args);
          }else{
            return;  
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
        this.#TheBox = this;
        this.#TrueAnswerLock = 0;
        this.#runInVM(fs.readFileSync(path.join(process.cwd(), serverFile)), fs);
        // Create the file with restricted permissions
        //fs.writeFileSync(tempFilePath, code, { mode: 0o600 });
/*        this.#TimeOut = setTimeout(()=>{
            try {
                console.log('Testing:', this.#childServerFile);
                this.#runInVM(fs.readFileSync(path.join(process.cwd(), serverFile)));
                console.log('OH God yes!!!');
            }catch(err){
                console.log('OHHH NOOO GOD BOX WHERE ART Thou WHEN I NEED Thou THE MOST DONT Worry God Box Still Got You covered!! :D', err);
            }
        }, 5000);*/

        var booleanCheck = false;

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

    #nonBlockingTimeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
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

    async #generateNewChild(){
      const os = require('node:os');
      const path = require('node:path');
      const fs = require('node:fs');

      if (this.#childcwd){
        try{
          await fs.promises.rm(this.#childcwd, { recursive: true, force: true });}catch(err){
          console.log('Error removing child Directory:', err);
        }
        console.log('Finished removing directory!');
      }

      const randomFileName = this.#generateRandomFileName(16); // Adjust length as needed
      const tempFilePath = `${os.tmpdir()}/${randomFileName}`;
      try {
        await fs.promises.cp(path.join(process.cwd()), path.join(tempFilePath), { recursive: true, force: true });
        console.log('Copying new child directory success!', tempFilePath);
      }catch(err){
        console.log('Error copying new child:', err);
      }
      this.#childServerFile = path.join(tempFilePath, this.#serverFile);
      this.#childServerFolder = path.join(tempFilePath, this.#serverFolder);
      this.#childcwd = tempFilePath;
      await this.#nonBlockingTimeout(1000);
    }

    #obfuscateCode(code, devMode) {
      const JavaScriptObfuscator = require('javascript-obfuscator');
      return JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: !devMode,
      identifierNamesGenerator: 'hexadecimal',
      log: devMode,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayCallsTransformThreshold: 0.5,
      stringArrayEncoding: [],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: 'variable',
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false,
      reservedNames: ['process.*', 'pandoraWall', 'GLOBALLY', 'PandorasWall', 'PandorasWallSource'] // Ensure process.env is not obfuscated
    }).getObfuscatedCode();
    }

    //Need to include the blackbox module as well! to include obfuscations on vm server in context running!
    async #runInVM(code, fs){
        const os = require('node:os');
        const vm = require('node:vm');
        const path = require('node:path');
        if (this.#breakValue){
          await this.#generateNewChild();
          this.#child = this.#createCustomFork();
          console.log('New Child: ', this.#child.killed, this.#childcwd);
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
              fs, //Pass the modified fs module to context!
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
          // We now utilize a dual obfuscation technique! Where the code gets obfuscated by the pandoraWall class itself!
          // And we obfuscate this code to execute in obfuscated form in the child process to properly help secure ones application layers!
          // Author Johnathan Edward Brown August 25, 2024
          const modifiedCode = `
          //Author: Johnathan Edward Brown August 22, 2024
//Last Updated: Johnathan Edward Brown August 25, 2024
//Mentor: Vampeyer
//In hopes to help streamline developers on protecting there runetime in nodeJS!
//Thanks to extensive research with AST walkers and utilizing Merkle Tree Hashes along with Merkle Tree Root hash.
//To simplify calculations and detections on runetime changes and modifications / injections!!!
//Can potentially take this boiler plate template design to be able to streamline developers to create intricate ast walker designs!
//Which could help stop injections and malware payload delivery in runetime of NodeJs processes!
//I personally don't guarentee this is a fool proof design or pattern this is just a template to help better understand on how one can properly secure there variable scopages!
//Along with all loaded memory objects in runtime!

const crypto = require('crypto');

// Utility function to generate a hash
function generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

// Class definition
// This is my source code for the PandorasWall which gets obfuscated in runtime do to the custom obfuscated public facing class structure!
class PandorasWallSource {
    #middleBox;
    #privateBox;
    #publicBox;
    #scope; // Private field to store the passed scope
    #masterBox

    constructor(scope) {
        this.#scope = scope; // Store the passed scope
        this.#privateBox = this.#privateFunction(this);
        this.#middleBox = this.#middle(this.#privateBox);
        this.#publicBox = this.publicFunction(this.#middleBox);
        process.child.on('exit', () => {
          delete this;
        })
    }
    //I Will build out our own internal connections allowed on startup until merkle verification process as such to prevent injections before as such properly!
    //While including proper middleware design injection approach to encapsulate this security The Pandoras Wall some call it! Keeps all the bad stuff out! Behind the WALL!
    publicFunction(middle) {
        class ThePublicBox {

            constructor(pandoraWall) {
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
                exampleCode();
                process.child.on('exit', () => {
                  delete this;
                });
            }
        }
        return new ThePublicBox(middle);
    }
    //Author Johnathan Edward Brown August 25, 2024
    //This is a new peice of the PandorasWall to help allow middleware design.
    #middle(a){
        class pandoraGlobal {
            #booleanLock
            #booleanLock2
            GLOBAL_STRING
            #expressSymbol
            #expressLock
            #expressApp
            #Protect

            constructor(a){
                const crypto = require('node:crypto');
                //Create a super secure password for communication channel to authorize communication process between child and PandorasWall
                this.GLOBAL_STRING = crypto.randomBytes(2048).toString('base64')+crypto.randomBytes(4096).toString('hex')+crypto.randomBytes(2048).toString('base64');
                this.#expressSymbol = Symbol(this.GLOBAL_STRING);
                this.#expressLock = 0;
                this.#Protect = a;
            }
            getGlobalString(){
                return this.GLOBAL_STRING;
            }

            getGlobalSymbol(){
                return this.#expressSymbol;
            }

            setExpress(app, box){
                function isExpressApp(obj, box){
                    const isExpressAppSymbol = box.getGlobalSymbol();
                    return obj && obj[isExpressAppSymbol] === true;
                  }
                console.log('Set express app called!');
                if (this.#expressLock === 0 && isExpressApp(app, box)){
                    this.#expressApp = app;
                    this.#expressLock = 1;
                    this.#expressProtect(app, box);
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
                  console.log('Pandoras Wall: Success its a express application!');
                }else{
                  console.log('Malicious Activity detected trying to set the express app in context to overwrite handlers!');
                  return;
                }
                console.log('Success!!!');
                app.use((req, res, next) => {
                  //Dont even load in the req object into memory or usage so not to execute malicious request on check!
                  switch(JBGlobal.getVerify()){
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
            }

            getVerify(){
                //Do in reverse check to properly correleate when a change happens to use the one from most dangerous to least dangerous!
                if (this.#Protect.verified === 2 || this.#Protect.verified2 === 2){
                    return 2;
                }
                if (this.#Protect.verified === 1 || this.#Protect.verified2 === 1){
                    return 1;
                }
                if (this.#Protect.verified === 0 || this.#Protect.verified2 === 0){
                    return 0;
                }
            }
        }

        return new pandoraGlobal(a);
    }

    //Author: Johnathan Edward Brown August 23, 2024
    //This will be our Core Functions for the WALL functionality which is the last two letters the LLs
    //This Can be Referred To Our A in the Word WALL
    #privateFunction(box) {
        class ThePrivateBox {
            #rootMemoryHash
            #secondaryMemoryHash
            #currentMemoryHash
            #booleanLock
            #booleanASTLock
            #rootASTHash
            #currentASTHash
            #ASTInterval
            #MemoryInterval
            verified
            verified2



            constructor(scope, box) {
                this.scope = scope; // Store the scope in ThePrivateBox instance
                this.verified = 0;
                this.verified2 = 0;
                this.#booleanLock = { lock: true };
                this.#privateFunctionG(scope, this);
                this.#rootASTHash = this.#exampleReverseTraverse(box);
                this.#ASTInterval = setInterval(() =>{
                       this.#currentASTHash = this.#exampleReverseTraverse(box);
                    if (this.#rootASTHash === this.#currentASTHash){
                        console.log('NO changes detected in AST!');
                        this.verified2 = 1;
                    }else{
                        console.log('WARNING WARNING WARNING YOU HAVE BEEN WARNED YOUR AST HAS DETECTED MODIFICATIONS TO THE RUNETIMES CODE!');
                        console.log('LOCKING AST!');
                        this.verified2 = 2;
                    }
                }, 1000);

                process.child.on('exit', () => {
                    console.log('Child Exiting From pandorasWall');
                    clearInterval(this.#ASTInterval);
                    clearInterval(this.#MemoryInterval);
                    delete this;
                })
            }

            //Author Johnathan Edward Brown August 23, 2024
            //This Can be referred to as the letter L in the word WALL
            //This can be seen as the 2nd before last letter L in the word WALL as well! the parent of it all!
            #exampleReverseTraverse(box){
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
                const codeString = PandorasWallSource.toString();

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
                    box.#MemoryInterval = setInterval(() => {
                        box.#currentMemoryHash = captureMemoryState();
                        if (box.#rootMemoryHash === box.#currentMemoryHash && box.#booleanLock.lock){
                          console.log('No Change Detected in Process Memory From Original Root Hash!');
                          box.verified = 1;
                        }
    
                        if (box.#rootMemoryHash !== box.#currentMemoryHash && box.#booleanLock.lock) {
                          box.#secondaryMemoryHash = box.#currentMemoryHash;
                          box.#booleanLock.lock = false;
                          box.verified = 2;
                          console.log('Locking! Process has noticed a change in runtime Please be weary of this! if you didnt intentionally do this please pay CLOSE ATTENTION TO THIS CONSOLE LOG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        }else if(box.#secondaryMemoryHash !== box.#currentMemoryHash && !box.#booleanLock.lock){
                           box.verified = 2;
                           console.log('Changes Detected in Process Memory! From Backup Secondary Hash WARNING THIS IS NOT GOOD! You have been warned! This process has been tampered with no doubt about it!');
                        }else if(box.#secondaryMemoryHash === box.#currentMemoryHash && !box.#booleanLock.lock){
                            box.verified = 2;
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
        return new ThePrivateBox(this.#scope, box);
    }
}
//Orignal setup deprecated with obfuscation tactic to properly wrap said class! With Obfuscation at runtime!
//Check from current scopage!
// Create an instance of TheBox, passing in the current scope
new PandorasWallSource(this);
`;        
          const obfuscatedCode = this.#obfuscateCode(modifiedCode, this.#devMode);
          await this.#nonBlockingTimeout(1000);
          //fs3.writeFileSync('./output.js', modifiedCode);
          try {
            vm.runInContext(obfuscatedCode, this.#context);
          }catch(err){
            console.log('Error:', err);
          }

          this.#timeOut = setTimeout(async () => {
              console.log('Stopping VM...');
              this.#rotateObby();
              await this.#nonBlockingTimeout(1000);
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
        console.log('Child: ', this.#child.killed);
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
            const crypto = require('node:crypto');
            //Create a super secure password for communication channel to authorize communication process between child and parent!
            this.#GLOBAL_STRING = crypto.randomBytes(2048).toString('base64')+crypto.randomBytes(4096).toString('hex')+crypto.randomBytes(2048).toString('base64');
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
            function isExpressApp(obj, JBGlobal){
              const isExpressAppSymbol = JBGlobal.getGlobalSymbol();
              return obj && obj[isExpressAppSymbol] === true;
            }
            console.log('Set express app called!');
            if (this.#expressLock === 0 && isExpressApp(app, JBGlobal)){
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
            #loops //Fix maximum loops!

            #cwd
            MerkleVerified
            #JBGlobal
            #executor

            constructor(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox){
              const path = require('node:path');
              this.#cwd = process.cwd();
              this.#serverFile = serverFile;
              this.#serverFolder = serverFolder;
              this.#interval = interval;
              this.#useEnv = useEnv;
              this.#childcwd = childCWD;
              this.#theBox = theBox;
              this.#lock = false;
              this.#loopBreak = false;
              this.#lock3 = false;
              this.MerkleVerified = 0;
              this.#loops = 0;
              //Major Cpu Optimizations and reduced recursive calls! Able to now achieve on 1 second interval less than 75% cpu usage with parallel of runtime protection intervals!
              /*
                Benchmark results:
                Single Core Acer Chromebook 315 Intel like 2.8GHZ
                Max Anomaly Peaked 85% cpu usage average peak waz 75%
                And Average stable is 65% cpu usage With running All protections on 1 second interval
                
                All though this can be majorly reduced by putting file check on 3 second interval to stabilize at under 50% cpu load to reduce race condition attacks!
              
              */
              //This is on a single core cpu this test and benchmark was ran to help optimize to the fullest!
              //All though average its expected one would setup File Merkle check every 10 seconds while runtime protects
              this.#setup(serverFile, serverFolder, interval, useEnv);
            }

            //Further optimized August 25, 2024 By Johnathan Edward Brown utilizing a lock setup! to do one time merkle setup for trueMerkle answer will majorly reduce!
            //CPU Overhead when the Protector Gets Restarted by containing the TrueAnswer in the GodBox itself for persistant usage!
            //Also removes race condtion exploits due to repetitive recursive usages!
            /*
              Benchmark Results:
              Single Core Acer Chromebook 315 Intel Like 2.8GHz
              Max Anomaly Peaked 45% cpu usage average peak was 35%
              And average stable is 20% cpu usage with running all protections on 1 second interval except the File Merkle Interval check was on a 10 second interval!

              With Peaked at 90% cpu usage average peak was 65%
              and average stable is 40% cpu usage with running all protections on 1 second interval even File Merkle Interval as well!
            */
            async #setup(serverFile, serverFolder, interval, useEnv){
              const verionList = process.version.split(',');
              const v1 = parseInt(verionList[0].replace('v', ''));
              const v2 = parseInt(verionList[1]);
              console.log(verionList, v1, v2);

              console.time('Timer');
                if (this.#theBox.#TrueAnswerLock === 0 && this.#lock === false && this.#loopBreak === false){
                this.#lock = true;
                console.log('Setting up File Merkle Security!');
//                this.#theBox.fileList = await this.#readFilesRecursively(process.cwd());
//                this.#theBox.execList = await this.#readFilesRecursively(this.#childcwd);
                if ((v1 === 19 && v2 >= 8) || v1>=20){
                  console.log('Node Version higher then 19.8.0 detected!');
                  this.#theBox.#TrueAnswer = await this.#hashFolderContentsNodeV22(process.cwd());
                  }else{
                    console.log('Node Version lower then 19.8.0 detected! Please be aware this is a less optimized setup! Its recommended to utilize the Node v19.8.0 and up!');
                  this.#theBox.#TrueAnswer = await this.#hashFolderContents(process.cwd());
                }
                this.#loopBreak = true;
                this.#theBox.#TrueAnswerLock = 1;
                console.log('File Merkle True Answer Calculated and Ready!');
                if (this.#loops <= 0){
                this.#loops = this.#loops+1;
                this.#timeOut = setInterval(async () =>{
                  console.log('File Merkle interval Started!');
                  try {
                    if (this.#theBox.#TrueAnswer && this.#loopBreak === true && this.#lock === false){
                      this.#lock = true;
                      console.log('Starting File calculations!');
                      if ((v1 === 19 && v2 >= 8) || v1>=20){
                        this.#answer = await this.#hashFolderContentsNodeV22(this.#childcwd);
                        }else{
                        this.#answer = await this.#hashFolderContents(this.#childcwd);
                        }
                      if (this.#answer.firstHash === this.#theBox.#TrueAnswer.firstHash){
                        this.MerkleVerified = 1;
                        console.log('Verified File Merkle Success!');
                      }else if(this.#answer.firstHash !== this.#theBox.#TrueAnswer.firstHash){
                        this.MerkleVerified = 2;
                        console.log('File Merkle Invalid warning restarting!');
                        this.#theBox.restart(serverFile, serverFolder, interval, useEnv);
                      }
                      this.#lock = false;
                    }else if(this.#loopBreak === false){
                        console.log('File Merkle Loop Is Breaking! If Server is not restarting please be warned malicious activity may be noticed!');
                        this.#loops = this.#loops - 1;
                        clearInterval(this.#timeOut);
                        return;
                    }else if(this.#loopBreak === true && this.#lock === true){
                      console.log('Cant merkle start still calculating merkle currently!');
                      console.log('Total File Merkle Loops:', this.#loops);
//                      console.log('True answer', this.#theBox.#TrueAnswer);
                      return;
                    }else if (String(this.#theBox.#TrueAnswer).length === 0){
                      console.log('Cant merkle start still calculating True merkle currently!');
                      return;
                    }
                  }catch(err){
                      console.log('Err:', err);
                  }
                }, merkleInterval);
                this.#lock = false;
                console.timeEnd('Timer');
                }
              }else if (this.#theBox.#TrueAnswerLock === 1 && this.#lock === false && this.#loopBreak === false)
                if (this.#loops <= 0){
                  this.#lock = true;
                  this.#loopBreak = true;
                  this.#loops = this.#loops+1;
                  this.#timeOut = setInterval(async () =>{
                    console.log('File Merkle interval Started!');
                    try {
                      if (this.#theBox.#TrueAnswer && this.#loopBreak === true && this.#lock === false){
                        this.#lock = true;
                        console.log('Starting File calculations!');
                        if ((v1 === 19 && v2 >= 8) || v1>=20){
                        this.#answer = await this.#hashFolderContentsNodeV22(this.#childcwd);
                        }else{
                        this.#answer = await this.#hashFolderContents(this.#childcwd);
                        }
                        if (this.#answer.firstHash === this.#theBox.#TrueAnswer.firstHash){
                          this.MerkleVerified = 1;
                          console.log('Verified File Merkle Success!');
                        }else if(this.#answer.firstHash !== this.#theBox.#TrueAnswer.firstHash){
                          this.MerkleVerified = 2;
                          console.log('File Merkle Invalid warning restarting!');
                          this.#theBox.restart(this.#serverFile, this.#serverFolder, this.#interval, this.#useEnv);
                        }
                        this.#lock = false;
                      }else if(this.#loopBreak === false){
                          console.log('File Merkle Loop Is Breaking! If Server is not restarting please be warned malicious activity may be noticed!');
                          this.#loops = this.#loops - 1;
                          clearInterval(this.#timeOut);
                          return;
                      }else if(this.#loopBreak === true && this.#lock === true){
                        console.log('Cant merkle start still calculating merkle currently!');
                        console.log('Total File Merkle Loops:', this.#loops);
  //                      console.log('True answer', this.#theBox.#TrueAnswer);
                        return;
                      }else if (String(this.#theBox.#TrueAnswer).length === 0){
                        console.log('Cant merkle start still calculating True merkle currently!');
                        return;
                      }
                    }catch(err){
                        console.log('Err:', err);
                    }
                  }, merkleInterval);
                  this.#lock = false;
                  }
            }

            #nonBlockingTimeout(ms) {
              return new Promise((resolve) => {
                setTimeout(resolve, ms);
              });
            }
            
            //Pretty neat concept to cut down on usage of cpu!
            async #hashFolderContents(folderPath) {
              const crypto = require('crypto');
              const fs = require('fs');
              const statAsync = fs.promises.stat;
              const readdirAsync =  fs.promises.readdir;
              const readFileAsync = fs.promises.readFile;

              const hash = crypto.createHash('sha256');
            
              try {
                const files = await readdirAsync(folderPath);
            
                for (const file of files) {
                  const filePath = `${folderPath}/${file}`;
                  const stat = await statAsync(filePath);
            
                  if (stat.isDirectory()) {
                    hash.update(await this.#hashFolderContents(filePath));
                  } else {
                    hash.update(await readFileAsync(filePath));
                  }
                }
                
                const answer = hash.digest('hex');
                return answer;
              } catch (err) {
                console.error('Error hashing folder contents:', err);
                return null;
              }
            }


            //Author Johnathan Edward Brown August 26, 2024
            //Pretty neat concept to cut down on usage of cpu! Along with FileSystem Reads! Due To The nature of Opening a file as blob doesnt Require as much of a deep cycle read!
            //And Solve Race Condition issues In Merkle Or File Verification Systems or setups in NodeJS using a Newer NodeJS function available only to 19.8.0 and up!
            async #hashFolderContentsNodeV22(folderPath) {
              const crypto = require('crypto');
              const fs = require('fs');
              const statAsync = fs.promises.stat;
              const readdirAsync =  fs.promises.readdir;
//              const readFileAsync = fs.promises.readFile;

              const hash = crypto.createHash('sha256');
            
              try {
                const files = await readdirAsync(folderPath);
            
                for (const file of files) {
                  const filePath = `${folderPath}/${file}`;
                  const stat = await statAsync(filePath);
            
                  if (stat.isDirectory()) {
                    hash.update(await this.#hashFolderContentsNodeV22(filePath));
                  } else {
                    hash.update(((await fs.openAsBlob(filePath)).arrayBuffer.toString('hex')));
                  }
                }
                
                const answer = hash.digest('hex');
                return answer;
              } catch (err) {
                console.error('Error hashing folder contents:', err);
                return null;
              }
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

            //Optimized more proper form!
            async calculateCombinedHash(fileList) {
              const fs = require('node:fs');
              const path = require('node:path');
              const crypto = require('node:crypto');

              var fileHashes = [];

                async function calculateHash(filePath) {
                    try {
                      // Read file asynchronously
                      const data = await fs.promises.readFile(filePath);
                  
                      // Calculate hash
                      const hash = crypto.createHash('sha256'); //Originally we used sha256 for btc but today more eco friendly and still secure designs prove we can use md5 believe it or not as long as the merkleInterval timing is fast enough!
                      hash.update(data);
                  
                      // Return the hash value
                      return hash.digest('hex');
                    } catch (error) {
                      // Handle errors, e.g., file not found, etc.
                      console.log(error);
                    }
                }

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

                    
                    const combinedHash = crypto.createHash('sha256');
                    combinedHash.update(fileHashes.join(','));
                    const answer = {
                      firstHash: combinedHash.digest('hex'),
                      secondHash: fileHashes
                    };
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

