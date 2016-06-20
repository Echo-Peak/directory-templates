let fs = require('fs');
let child_process = require('child_process');

module.exports = function(DT , fileOrDirectory){
  let self =this;
  if(fileOrDirectory === void 0){
    console.log('opening "user-created"');
    child_process.exec(`${this.cmd.windows.explorer} ${DT.path.internal}`);
    return
  }


  let searchJS = fs.stat(`${DT.path.directorys}/${fileOrDirectory}`,function(e1){
    let err  = e1;

      let searchDirectorys = fs.stat(`${DT.path.js}/${fileOrDirectory}.js`,function(e2){

          if(e1 === null && e2 === null){
            let callback = function(stdRead){
              stdRead = stdRead.trim()

              if(stdRead === '1'){
                child_process.exec(`${self.cmd.windows.explorer} "${DT.path.directorys}\\${fileOrDirectory}"`);

                process.exit();
              }else if(stdRead === '2'){
                child_process.exec(`${self.cmd.windows.editor()} "${DT.path.js}\\${fileOrDirectory}.js"`);
                process.exit();
              }else{process.exit()}
            }
            self.stdout(`Directory ${fileOrDirectory}(1) exists and JStemplate ${fileOrDirectory}.js(2). Use 1 or 2 to select.` ,callback)
          }else if(e1 === null && e2 !== null){
            child_process.exec(`${self.cmd.windows.explorer} "${DT.path.directorys}\\${fileOrDirectory}"`);
          }else if(e2 === null && e1 !==null){
            child_process.exec(`${self.cmd.windows.editor()} "${DT.path.js}\\${fileOrDirectory}.js"`);
          }else{
            console.log(`no file or directory "${fileOrDirectory}" found`)
          }
        });
  });


}
