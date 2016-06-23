function  generatePaths(o, root = "", result = []){
  var keys = Object.keys(o);

  return keys.reduce((starting,key) => {

    let path = root + key + "\\";
    let isObject = typeof o[key] == "object" && o[key] !== null;
    let isArray = Array.isArray(o[key]);

         if(key == '_files' && isArray){

            let split = path.split('\\');
            split.splice(-2 ,1);
            path = split.join('\\');
            o[key].forEach(f => starting.push(path + f));
          }

    if(isObject && isArray){

       o[key].length ? o[key].forEach((f) => {
        if(key == '_files'){
          return
        }
        starting.push(path += f)
      }) : starting.push(path)


    }else{
      if(isArray || isObject){
        generatePaths(o[key],path,starting);
      }
    }
     return starting;
    },result);
}

module.exports = generatePaths
