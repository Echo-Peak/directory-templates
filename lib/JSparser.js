var fs = require('fs');

module.exports = function(templateJS ,callback){
  //ease of use for the user...
  fs.readFile(templateJS ,'utf8',function(err ,data){
    if(err){
      console.log('file not found')
      process.exit();
    }
    let pass1 = data.replace(/(\/\*(?:(?!\*\/).|[\n\r])*\*\/)/igm ,''); //mutil-line comments
    let pass2 = pass1.replace(/\/\/[^\n\r]*[\n\r]+/igm ,''); //single -line comments
    let pass3 = pass2.replace(/(var|const|let)\s\w+\s=\s+/im ,''); //remove var something =
    let pass4 = pass3.replace(/[a-z0-9\-]+:/gmi ,function(found ,index){ //souround each object property with ""
      return found = `"${found.replace(':','')}":`;
    });
    let finalPass = pass4.replace(/'/gm ,'"'); //replace any ' with "
    let parse;
    try{
      parse =JSON.parse(finalPass);
    }catch(e){
      console.log('error parsing file');
      process.exit()
    }
    callback(parse)


  })
}
