#!/usr/bin/env node
'use strict';
let path = require('path');
let fsExtra = require('fs-extra');
let fs = require('fs');
let mkdir = require('mkdirp');
let open = require('./lib/open');
let build = require('./lib/build');
let parse = require('./lib/generatePaths');
let JSparser = require('./lib/JSparser');
let add = require('./lib/add');
let list = require('./lib/list');

function removeGITfiles(){

  try{
      let del = fs.statSync(`${__dirname}/user-created/directorys/gitignore.txt`);
      del && fsExtra.removeSync(`${__dirname}/user-created/directorys/gitignore.txt`);
      let del2 = fs.statSync(`${__dirname}/user-created/JS templates/gitignore.txt`);
      del2 && fsExtra.removeSync(`${__dirname}/user-created/JS templates/gitignore.txt`);
  }catch(e){

  }


}

class DT{

  constructor(){
    removeGITfiles(); //i know i can use gitignore here but i have to delete these files anyways on first run
    this.templateJS = {}
    this.openWith = false;
    let editor = function(){
      let preffered = ['atom' ,'brackets'];
      let check = process.env.Path.match(/atom|brackets/)[0];
      if(check == null){check = 'notepad'}
      return check
    }
    this.cmd = {
      windows:{
        start:'start',
        explorer:'explorer',
        editor:editor
      },
      mac:{
        editor:editor
      },
      linux:{
        editor:editor
      }
    }
    DT.path = {
      js:path.resolve(__dirname,'user-created/JS templates'),
      directorys:path.resolve(__dirname,'user-created/directorys'),
      internal:path.resolve(__dirname,'user-created'),
      files:null,
      external:path.normalize(process.cwd())
    }
    this.open = open.bind(this,DT);
    this.build = build.bind(this,DT);
    this.list = list.bind(this,DT);
    this.parse = parse;
    this.jsParser = JSparser;
    this.add = add.bind(this,DT);
    this.argParser(process.argv);


  }
  argParser(argv){
    //flags
    if(argv.length < 3){
      console.log("no params passed");
      this['help']();
    }
    argv.indexOf('-o') > 0 && (this.openWith = true);
    argv.indexOf('-delete') > 0 && this['delete']();//EVERYTHING
    argv.indexOf('list') > 0 && this['list']();
    argv.indexOf('add') > 0 && this['add'](argv[argv.indexOf('add') + 1]);
    argv.indexOf('help') > 0 && this['help']();
    argv.indexOf('build-from') > 0 && this['build'](argv[argv.indexOf('build-from') + 1]);
    argv.indexOf('open') > 0 && this['open'](argv[argv.indexOf('open') + 1]);

  }


  stdout(msg ,callback){
    process.stdout.write(msg);
    var stream = process.stdin;

    stream.on('readable',function(chunk){
      let read = process.stdin.read();
      if(read !== null){
        callback(read.toString())
      }

    })
  }
  delete(){
    let callback = function(msg){
      msg = msg.trim()
      if(msg == 'Y' || msg =='y'){
        console.log("deleting");
        fsExtra.removeSync(DT.path.js);
        fsExtra.removeSync(DT.path.directorys);
        mkdir(`${DT.path.internal}/JS templates`);
        mkdir(`${DT.path.internal}/directorys`);
        process.nextTick(process.exit)
      }else{
      }
    }
    this.stdout('are you sure you want to delete all templates & directorys? Y/n',callback)
  }
  help(){
    console.log('\n');
    console.log(
`Help:

Availible commands: add , build , open
flags: -o , -delete
-o - open-with "opens a text editor after being used with'add' " based on system path variable
list  - lists everything created

add - <name> "will add a js file or a directory depending on input"
build-from - <name> depending on name will clone directory structure to current working directory`
);
    console.log('\n')
  }
}
new DT();
