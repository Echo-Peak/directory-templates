let fs = require('fs');

module.exports = function(DT){

  fs.readdir(DT.path.js ,function(err, dir){
    let str = dir.reduce(function(start ,item){
      return start+= ' ' +item.replace(/\.js/,'') + ' '
    },'');
    console.log('\n');
    console.log('Templates found');
    console.log('\x1b[36m'+ str + '\x1b[0m');
    console.log('\n');
  });
  fs.readdir(DT.path.directorys ,function(err,dir){
    let str = dir.reduce(function(start ,item){
      return start+= ' ' +item + ' '
    },'');

    console.log('\n');
    console.log('Directorys found');
    console.log('\x1b[36m'+ str + '\x1b[0m');
    console.log('\n');
  });
}
