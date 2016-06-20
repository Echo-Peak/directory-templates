var fs = require('fs');
var child_process = require('child_process');
let mkdir = require('mkdirp');

module.exports = function(DT ,projectName){
  let self = this;
  let file = `//Treat this file like json with comments
const ${projectName} = {

}`;
  if(projectName === void 0){
    console.log('invalid parameters');
    return
  }
  let callback = function(stdRead){
    stdRead = stdRead.trim()
    if(stdRead === '1'){

      fs.writeFile(`${DT.path.js}/${projectName}.js` ,file , 'utf8',function(){
        if(self.openWith){
          child_process.exec(`${self.cmd.windows.editor()} "${DT.path.js}\\${projectName}.js"`);
        }
        process.exit();
      });

    }else if(stdRead === '2'){

      mkdir(DT.path.directorys+'/'+projectName , function(e){
      child_process.exec(`${self.cmd.windows.explorer} "${DT.path.directorys}\\${projectName}"`);
      process.exit();
    });

    }else{process.exit()}
  }

    this.stdout(`what type is "${projectName}""? template(1) or directory(2). Use 1 or 2 to select. ` ,callback);
}
