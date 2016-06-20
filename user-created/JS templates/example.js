//Treat this file like json with comments
//this would be the folder structure
const example = {
  src:{
    jade:['main.jade'],
    scripts:{
      modules:{
        render:['index.js'],
        winodws:['index.js'],
        header:['header.js' ,'controller.js'],
        SCSS:['index.scss' ,'setup.scss']
      }
    }
  },
  compiled:['angular.js','angular-material.js' ,'fallback.js'],
  built:{
    assets:{
      fontAwesome:['font-awesome.css']
    }
  }
}
