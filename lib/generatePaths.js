module.exports = function(fromPath , obj){
    function recurse(item, path, result) {
      result = result || [];

    for (let key in item) {
      let value = item[key];
      let newPath = path + "\\" + key;

      if (typeof value === "string") {
        result.push(newPath + "\\" + value);
      } else if (Array.isArray(value)) {

        if (value.length === 0) {
          result.push(newPath + "\\");
        } else {

          value.forEach(function(arrayItem) {
            result.push(newPath + "\\" + arrayItem);
          });
        }
      } else {
        recurse(value, newPath, result);
      }
    }

    return result;
  }
return recurse(obj ,fromPath);
}
