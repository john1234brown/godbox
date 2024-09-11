import { GodBox } from './index';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface Options {
    error: any;
    file?: string;
    dir?: string;
    timeout?: number;
    interval?: number;
    flag1?: boolean;
    flag2?: boolean;
    flag3?: boolean;
    log?: (message?: any, ...optionalParams: any[]) => void;
    time?: () => void;
    timeEnd?: () => void;
    read?: boolean;
    write?: boolean;
    help?: boolean;
}

function parseArgs(): Options {
    const args: string[] = process.argv.slice(2);
    const options: Options = {
        error: undefined
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--file':
                options.file = args[++i];
                break;
            case '--dir':
                options.dir = args[++i];
                break;
            case '--timeout':
                options.timeout = parseInt(args[++i], 10);
                break;
            case '--interval':
                options.interval = parseInt(args[++i], 10);
                break;
            case '--useEnv':
                options.flag1 = args[++i] === 'true';
                break;
            case '--devMode':
                options.flag2 = args[++i] === 'true';
                break;
            case '--fsMiddleware':
                options.flag3 = args[++i] === 'true';
                break;
            case '--log':
                options.log = console.log;
                break;
            case '--time':
                options.time = console.time;
                break;
            case '--timeEnd':
                options.timeEnd = console.timeEnd;
                break;
            case '--read':
                options.read = args[++i] === 'true';
                break;
            case '--write':
                options.write = args[++i] === 'true';
                break;
            case '--help':
                options.help = true;
                break;
            default:
                console.error(`Unknown argument: ${args[i]}`);
                process.exit(1);
        }
    }

    return options;
}

try {
    const options: Options = parseArgs();
    if (options.help) {
        console.log('\n');
        console.log('=====================================================================================================');
        console.log('\n                                  God Box Help Menu                                              \n');
        console.log('\n              NodeJS Virtualization Utility For Express Servers Or NodeJS Applications          \n');
        console.log('=====================================================================================================');
        console.log('\n          Author: Johnathan Edward Brown      |          Mentor: Vampeyer                        \n');
        console.log('=====================================================================================================');
        console.log('--file {filePath} specify what file you want to serve from the godBox! From the current directory!');
        console.log('--dir {dirPath} specify what folder your webserver files are in! to be served in the GodBox!');
        console.log('--timeout {interval} what interval do you want the server to restart this is in milliseconds by the way!');
        console.log('--interval {interval} what interval do you want the server to be checking its files for verification! this is in milliseconds by the way!');
        console.log('--useEnv {true|false} are you using a .env file which may need to be loaded into the vm context!');
        console.log('--devMode {true|false} are you in development mode if so set to true to enable console logs!');
        console.log('--fsMiddleware {true||false} do you want to utilize the fileSystem middleware?');
        console.log('--log enable the usage of console.log in the consoleOverride parameters of Godbox!');
        console.log('--time enable console.time usage in consoleOverride parameters of Godbox!');
        console.log('--timeEnd enable the usage of console.timeEnd in consoleOverride parameters of Godbox!');
        console.log('--read WIP while enable the usage of read from fs module in the vm!');
        console.log('--write WIP will enable the usage of write from fs moduel in the vm!');
        console.log('--help Prints this help menu!');
        console.log('=====================================================================================================');
        console.log('\n                                God Box End of Help Menu                                         \n');
        console.log('=====================================================================================================');
        console.log('\n');
    }
    options.read = false;
    options.write = false;
    let fsOverrides: any = {
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
        promises: {
            readdir: fs.promises.readdir,
            readFile: fs.promises.readFile,
            rm: fs.rmSync,
            cp: fs.cpSync,
            writeFile: fs.promises.writeFile
        }
    };
    if (options.read) {
        fsOverrides.read = fs.read;
        fsOverrides.readSync = fs.readSync;
        fsOverrides.readdir = fs.readdir;
        fsOverrides.readdirSync = fs.readdirSync;
        fsOverrides.readFileSync = fs.readFileSync;
        fsOverrides.promises.readdir = fs.promises.readdir;
        fsOverrides.promises.readFile = fs.promises.readFile;
    }
    if (options.write) {
        fsOverrides.rename = fs.rename;
        fsOverrides.renameSync = fs.renameSync;
        fsOverrides.cpSync = fs.cpSync;
        fsOverrides.cp = fs.cp;
        fsOverrides.rm = fs.rm;
        fsOverrides.rmSync = fs.rmSync;
        fsOverrides.writeSync = fs.writeSync;
        fsOverrides.write = fs.write;
        fsOverrides.writeFile = fs.writeFile;
        fsOverrides.writeFileSync = fs.writeFileSync;
        fsOverrides.promises.writeFile = fs.promises.writeFile;
        fsOverrides.promises.cp = fs.promises.cp;
        fsOverrides.promises.rm = fs.promises.rm;
        fsOverrides.promises.rename = fs.promises.rename;
    }
    console.log('Starting GodBox instance started with the following options:', options);
    // Define the console override object
    const consoleOverride = {
        log: options.log ? console.log : (...args: any[]) => {},
        time: options.time ? console.time : (...args: any[]) => {},
        timeEnd: options.timeEnd ? console.timeEnd : (...args: any[]) => {},
        error: options.error ? console.error : (...args: any[]) => {}
    };
    const test = new GodBox(
        options.file || './server.js',
        options.dir || './public',
        options.timeout || 300000,
        options.interval || 10000,
        options.flag1 ? options.flag1 : false,
        options.flag2 ? options.flag2 : false,
        options.flag3 ? options.flag3 : false,
        consoleOverride,
        fsOverrides
    );
} catch (err) {
    console.error('Failed to start GodBox:', err);
    process.exit(1);
}