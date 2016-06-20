let fs = require('fs');
let mkdir = require('mkdirp');
let fsExtra = require('fs-extra');

module.exports = function(DT ,fileOrDirectory){
  let self=   this;
  let makeDir = function(callback){
      fsExtra.copy(`${DT.path.directorys}/${fileOrDirectory}`, DT.path.external, function(err) {
        if (err) {
          console.log(`\x1b[33m'${template}'\x1b[0m not found in templates.`);
          return
        }
        console.log(`\x1b[33m '${template}'\x1b[0m cloned to \x1b[36m ${externalPath} \x1b[0m `)
          process.exit()
      });
  }
  let buildFromTemplate = function(){

    let exit = function(counter ,limit){
      if(counter == limit){
        process.exit()
      }
    }
    let done = function(obj){

      let arrayOfPaths = self.parse(`${DT.path.external}\\${fileOrDirectory}` ,obj);
      if(arrayOfPaths.length){
        var k = 0;
        arrayOfPaths.forEach(function(_path){
          k++;
          console.log('making' ,_path)
          if(/\.[a-z]+$/i.test(_path)){
            fsExtra.outputFile(_path ,'' ,exit.bind(null,k , arrayOfPaths.length))
          }else{
            mkdir(_path)
          }

        });
      }else{
        console.log(`Nothing to build from ${fileOrDirectory}.js`);
      }
    }
    let parsedJS = self.jsParser(`${DT.path.js}/${fileOrDirectory}.js`,done);

  }

  fs.stat(`${DT.path.directorys}/${fileOrDirectory}`,function(e1){
    fs.stat(`${DT.path.js}/${fileOrDirectory}.js`,function(e2){
          if(e1 === null && e2 === null){
            let callback = function(stdRead){
              stdRead = stdRead.trim();

              if(stdRead === '1'){
                  makeDir();

              }else if(stdRead === '2'){
                buildFromTemplate()

              }else{process.exit()}
            }
            self.stdout(`Building from Directory ${fileOrDirectory}(1) exists and JStemplate ${fileOrDirectory}.js(2). Use 1 or 2 to select.` ,callback)
          }else if(e1 === null && e2 !== null){
            makeDir();
          }else if(e2 === null && e1 !==null){
            buildFromTemplate()
          }else{
            console.log('cant build')
            process.exit()
          }
        });
  });
}
