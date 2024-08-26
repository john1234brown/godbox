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
        this.#privateBox = this.#privateFunction();
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
                            //${code}
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
    #privateFunction() {
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



            constructor(scope) {
                this.scope = scope; // Store the scope in ThePrivateBox instance
                this.verified = 0;
                this.verified2 = 0;
                this.#booleanLock = { lock: true };
                this.#privateFunctionG(scope, this);
                this.#rootASTHash = this.#exampleReverseTraverse();
                this.#ASTInterval = setInterval(() =>{
                       this.#currentASTHash = this.#exampleReverseTraverse();
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
        return new ThePrivateBox(this.#scope);
    }
}
//Orignal setup deprecated with obfuscation tactic to properly wrap said class! With Obfuscation at runtime!
//Check from current scopage!
// Create an instance of TheBox, passing in the current scope
//new PandorasWallSource(this);

//This is our public facing utility for obfuscating the utility for each user runtime! To properly secure it!
//Author Johnathan Edward Brown August 25, 2024
// This is a neat way to obfuscate ones class utilitys as they are being used to help properly! contain it to be unaccessible!
// To Further help build layers and walls to prevent one from getting into said application layers!
class PandoraWall {
    #obfuscated
    #scope

    constructor(scope, devMode){
        this.#scope = scope;
        this.#obfuscated = this.#obfuscateCode(new PandorasWallSource(scope));
        return this.#obfuscated;
    }

    #obfuscateCode(code, devMode) {
        const JavaScriptObfuscator = require('javascript-obfuscator');
        return JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: true,
          disableConsoleOutput: !devMode, //I Utilize Opposite of devMode value to simplify setup! and less code!
          identifierNamesGenerator: 'hexadecimal',
          identifiersPrefix: '',
          renameGlobals: true,
          selfDefending: true,
          splitStrings: true,
          stringArray: true,
          stringArrayEncoding: ['base64', 'rc4'],
          stringArrayThreshold: 1,
          target: 'browser',
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
          reservedNames: ['process.*', 'pandoraWall', 'GLOBALLY'] // Ensure process.env is not obfuscated
        }).getObfuscatedCode();
      }
}
//new PandoraWall(this, ${this.#devMode});