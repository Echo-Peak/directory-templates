#!/usr/bin/env node

'use strict';
let fs = require('fs');
let child_process = require('child_process');
let path = require('path');
let mkdir = require('mkdirp');
let fsExtra = require('fs-extra');

let dt = {
  platform: 'win32',
  templatePath: path.resolve(__dirname, 'templates'),
  argv: [],

  init: function() {
    this.argv = process.argv;
    (this.argv.indexOf('-list') >= 0) && this.list();
    (this.argv.length < 3) && this.noArgs();
    let openCommand = this.argv.toString().match(/-open=[a-z0-9- ]+/);
    let addCommand = this.argv.toString().match(/-add=[a-z0-9- ]+/);
    let cloneCommand = this.argv.toString().match(/-clone=[a-z0-9- ]+/);
    let externalPath = process.cwd();
    let _path;
    let templatName;

    switch (process.platform) {
      case 'darwin':
        this.platform = 'finder';
        break;
      case 'win32':
        this.platform = 'explorer';
        break;
      default:
        this.platform = 'explorer';
    }
    
    if (openCommand != null) {
      templatName = openCommand[0].substr(6);
      _path = path.resolve(__dirname, 'templates', templatName);

      this.openTemplate(_path,templatName);
    }
    if (addCommand != null) {
      templatName = addCommand[0].substr(5);
      _path = path.resolve(__dirname, 'templates', templatName);

      this.add(externalPath ,_path ,templatName );
    }
    if (cloneCommand != null) {
      templatName = cloneCommand[0].substr(7);
      _path = path.resolve(__dirname, 'templates', templatName);

      this.clone(externalPath, _path , templatName);
    }


  },
  list: function() {

    fs.readdir(this.templatePath, (err, dir) => {
      console.log('Templates -> ', dir)
    });
  },
  add: function(externalPath, templatePath ,folderName) {
    fsExtra.copy(externalPath, templatePath, function(err) {
      if (err) {
        console.log(err);
        return
      }

      console.log(`added \x1b[33m '${folderName}' \x1b[0m to Templates`);
    });
  },
  clone: function(externalPath, templatePath ,template) {


    fsExtra.copy(templatePath, externalPath, function(err) {
      if (err) {
        console.log(`\x1b[33m'${template}'\x1b[0m not found in templates.`);
        return
      }
      console.log(`\x1b[33m '${template}'\x1b[0m cloned to \x1b[36m ${externalPath} \x1b[0m `)
    });
  },
  openTemplate: function(_path ,templatName) {
    let doesItExist = fs.stat(_path, (err) => {
      if (err) {
        console.log('no such template found');
        process.stdout.write(`Make '${templatName}' folder? ` + '(y/n)');
        var stream = process.stdin;
        stream.on('readable', () => {
          let chunk = process.stdin.read();

          if (chunk !== null) {
            let c = chunk.toString().replace(/\r\n$/, '');


            if (c == ('y' || 'yes' || 'Y')) {

              this.makedir(_path);
            } else {

              process.exit();
            }
          }

        });

        return
      }
      child_process.exec(this.platform + ' ' + path.resolve(__dirname, 'templates', templatName))
    });

  },
  makedir: function(dir) {
    mkdir(dir, (err) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        child_process.exec(this.platform + ' ' + dir, function() {
          process.exit()
        })

      }
    });
  },
  noArgs: function() {
    console.log(`
      no parameters passed:
      \x1b[35m use \x1b[0m \x1b[36m -open=\x1b[0m'<\x1b[33mTEMPLATE_NAME\x1b[0m>' to open template folder
      \x1b[35m use \x1b[0m \x1b[36m -clone=\x1b[0m'<\x1b[33mTEMPLATE_NAME\x1b[0m>' to clone from templates
      \x1b[35m use \x1b[0m \x1b[36m -add=\x1b[0m'<\x1b[33mTEMPLATE_NAME\x1b[0m>' to add a folder to templates
      \x1b[35m use \x1b[0m \x1b[36m -list\x1b[0m to list all templates
      \x1b[35m use \x1b[0m \x1b[36m -del=\x1b[0m'<\x1b[33mTEMPLATE_NAME\x1b[0m>' deletes template folder
      `)
  }


}
dt.init();
