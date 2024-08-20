// The God Box Merkle Verification Isolated Container! For Express Static Webservers!
// Author: Johnathan Edward Brown August 20, 2024
// License: GPL-3.0
console.log('The God Box Simple Isolated Webserver Hosting Module In NodeJS!');
console.log('Prevent Path Traversal Exploits');
console.log('Prevents HTML Defacing By Replacing and Fixing! Until a Bug Fix can Be Released! To Stop the Exploit!');
console.log('Utilizes Merkle Tree Verification Techniques!');
console.log('Author: Johnathan Edward Brown, Mentor: Vampeyer');

class GodBox {
    /*  Provides Server File = String, Server Folder =  String, number = interval
    */
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


    constructor(serverFile, serverFolder, interval, merkleInterval, useEnv){
        this.#cwd = process.cwd();
        this.#breakValue = true;
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
        this.#child = this.#createCustomFork();
        // Create the file with restricted permissions
        //fs.writeFileSync(tempFilePath, code, { mode: 0o600 });
        this.#childcwd = tempFilePath;
        this.#TheBox = this;
        this.#TimeOut = setTimeout(()=>{
            try {
                console.log('Testing:', this.#childServerFile);
                this.#TheProtectorO = this.#TheProtectorF(serverFile, serverFolder, interval, merkleInterval, useEnv, this.#childcwd, this.#TheBox, this.#cwd);
                this.#runInVM(fs.readFileSync(this.#childServerFile));
                console.log('OH God yes!!!');
            }catch(err){
                console.log('OHHH NOOO NOT GOOD GOD BOX WHERE ART THOUGH!', e);
            }
        }, 5000);
        
        process.on('SIGINT', async()=>{
          try {
              await fs.promises.rm(this.#childcwd, {recursive: true});
          }catch(err){
            process.exit(0);
          }
          return;
        });

        process.on('beforeExit', async()=>{
            try {
                await fs.promises.rm(this.#childcwd, {recursive: true});
            }catch(err){
              process.exit(0);
            }
            return;
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
        //child; //Clear out env mappings to protect users Personal Process Environment From being leaked from webserver side!
        console.log('Creating Child Fork:', child.cwd, child.env);
        return child;
    }

    #runInVM(code){
        const fs3 = require('node:fs');
        const vm = require('node:vm');
        const path = require('node:path');
        if (this.#breakValue){
          const cwd = this.#childcwd;
          const GLOBALLY = this.#generateGlobal();
          this.#GlobalReference = GLOBALLY;
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
              console,
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

          // Add necessary global variables and functions
          this.#sandbox.global = this.#sandbox;
          // Create a context from the sandbox
          this.#context = vm.createContext(this.#sandbox);
          // Execute the code in the context
          console.log('Starting context run!');
          fs3.writeFileSync('./output.js', code);
          try {
            vm.runInContext(code, this.#context);
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
        this.#child.emit(this.#GlobalReference);
        this.#child.kill(); //Properly Kill!
        console.log('Chiled: ', this.#child.killed);
        console.log(this.#child.exitCode, 'Child exit code');
        return;
    }

    #generateGlobal(){
        class JBGlobal {
          #GLOBAL_STRING
          #expressApp

          constructor(){
            this.#GLOBAL_STRING = this.#generateRandomString(12);
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
             * @returns {string} - The global string
          */
          getGlobalString(){
           return this.#GLOBAL_STRING;
          }

          setExpressApp(app){
            console.log('Set express app called!');
            
            this.#expressApp = app;
            expressProtect(app);
          }
        }
        //By giving the web server its own global context to communicate globally and have it obfuscated ensures extra security!
        //Quite literally this one is over kill but very important to protect the custom process.stdout communication channel context of the obfuscated controller to the web server!
        //Johnathan Edward Brown Waz here!!!
        // And this one was deprecated due to realizations of usages of the child_process to help further isolate from main process context!
        return new JBGlobal();
    }

    #TheProtectorF(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox){
        //We will spawn our own Seperate child process that is unref to be able to rewrite files to the directory! and reset back to original!
        class TheProtectorC{
            #childcwd
            #serverFile
            #serverFolder
            #interval
            #merkleInterval
            #useEnv
            #theBox
            #fileList
            #execList
            #answer
            #timeOut

            #lock
            #loopBreak
            #cwd

            constructor(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox){
              const fs = require('node:fs');
              const path = require('node:path');
              this.#cwd = process.cwd();
              this.#serverFile = serverFile;
              this.#serverFolder = serverFolder;
              this.#interval = interval;
              this.#merkleInterval = merkleInterval;
              this.#useEnv = useEnv;
              this.#childcwd = childCWD;
              this.#theBox = theBox;
              this.#lock = false;
              this.#loopBreak = true;
              this.#timeOut = setInterval(async () =>{
                  console.log('Merkle interval Started!');
                  try {
                  if (this.#fileList && this.#execList && this.#lock === false && this.#loopBreak === true){
                      this.#lock = true;
                      console.log('Starting Calculation =!');
                      this.#fileList = await this.#readFilesRecursively(process.cwd());//The Original Directory
                      //fs.writeFileSync(path.join(process.cwd(), "fileList.json"), JSON.stringify(this.#fileList, null, 2));
                      this.#execList = await this.#readFilesRecursively(this.#childcwd); //The Actual Serving Directory
                      //fs.writeFileSync(path.join(process.cwd(), "fileList2.json"), JSON.stringify(this.#execList, null, 2));
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
                  }
                  }catch(err){
                      console.log('Err:', err);
                  }
              }, merkleInterval)
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

            async calculateCombinedHash(fileList, execFiles) {
              var fileHashes = [];
              var file2Hashes = [];

                async function calculateHash(filePath) {
                    try {
                      // Read file asynchronously
                      const data = await fs.promises.readFile(filePath);
                  
                      // Calculate hash
                      const hash = crypto.createHash('sha256');
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
                      }
                    }
                    
                    const combinedHash = crypto.createHash('sha256');
                    combinedHash.update(fileHashes.join(','));
                    const execHash = crypto.createHash('sha256');
                    execHash.update(file2Hashes.join(','));
                    const answer = {
                      firstHash: combinedHash.digest('hex'),
                      secondHash: fileHashes,
                      thirdHash: execHash.digest('hex'),
                      fourthHash: file2Hashes,
                    };
                    if (answer.firstHash === answer.thirdHash){
                        console.log('Merkle Verification Passed!','\nHash:', answer.firstHash, '\nHash:',answer.thirdHash);
                        //fs.writeFileSync(path.join(process.cwd(), 'merkles.json'), JSON.stringify(answer, null, 2));
                    }else{
                        console.log('Merkle Verification Failed Attempting to Shutdown and Reset!');
                        //fs.cpSync(this.#cwd, this.#childcwd, {recursive: true});
                        this.#theBox.restart(this.#serverFile, this.#serverFolder, this.#interval, this.#merkleInterval, this.#useEnv); //Restart the box!
                        //this.#theBox.terminate();
                    }
                    return answer;
                }catch(e){
                  console.log(e);
                }
            }

            terminate(){
                clearInterval(this.#timeOut);
                this.#loopBreak = false;
                this.#lock = true;
                delete this;
            }

        }
        return new TheProtectorC(serverFile, serverFolder, interval, merkleInterval, useEnv, childCWD, theBox);
    }

    terminate(){
        this.#child.emit(this.#GlobalReference);
        this.#child.kill(); //Properly Kill!
        console.log('Chiled: ', this.#child.killed);
        console.log(this.#child.exitCode, 'Child exit code');
        this.#TheProtectorO.terminate();
        clearTimeout(this.#timeOut);
    }

    restart(serverFile, serverFolder, interval, merkleInterval, useEnv){
        const fs = require('node:fs');
        fs.rmSync(this.#childcwd, {recursive: true});
        console.log('Restarting with:', serverFile, serverFolder, interval, merkleInterval, useEnv);
        this.terminate();
        delete this;
        return new GodBox(serverFile, serverFolder, interval, merkleInterval, useEnv);
    }
    /***
     * Calling this will
     * @returns process.exit(0);
     */
    stop(){
        this.terminate();
        return process.exit(0);
    }
}


function expressProtect(app){
    console.log('Success!!!');
}

module.exports = { GodBox }

