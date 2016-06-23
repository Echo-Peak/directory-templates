**Directory-templates** is simple command-line utility that allows you to add , build , open templates generated from json or copy the contents of a saved directory to your CWD.

##Install
```npm i -g directory-templates```

##Usage

Commands `add` , `build-from` ,`open`, `list`.


* `add` will add  a template or directory to **Directory-templates**
- `build-from` builds directory-structure at CWD based on template name or directory name given
- `open` with no parameters passed opens the root directory otherwise opens the        template in a text-editor or directory 
- `list` shows a list of templates & directories you created

Flags `-delete` , `-o`
- `-delete` deletes everything from both template folder & directories folder
- `-o` Used in conjunction with `add` to open explorer or a text-editor

Example

```
dt add angular-skeleton -o
```

##Template Example
CWD: `C:/very-important-path/`
```
dt build-from some-template
```
some-template.js
```
const someTemplate = {
  src:{
    jade:['main.jade' ,'fallback-scripts.jade'],
    scripts:{
      _files:['one.js' ,'two.js','three.js'],
      modules:{
        render:['index.js'],
        winodws:['index.js'],
        header:['header.js' ,'controller.js'],
        SCSS:['index.scss' ,'setup.scss'],
      }
    }
  },
  compiled:['angular.js','angular-material.js' ,'fallback.js'],
  built:{
    frontEnd:[],
    backEnd:[],
    assets:{
      _files:['styles.css' ,'external-styles.css'],
      fontAwesome:['font-awesome.css'],
      img:[],
      svg:[],
      unrelated:{
        _files:['boot.js']
      }
    }
  }
}
```
For each **file** in `_files` would be would be placed at the parent directory
###Result
```
 C:/very-important-path/src/jade/main.jade
 C:/very-important-path/src/jade/main.jadefallback-scripts.jade
 C:/very-important-path/src/scripts/one.js
 C:/very-important-path/src/scripts/two.js
 C:/very-important-path/src/scripts/three.js
 C:/very-important-path/src/scripts/modules/render/index.js
 C:/very-important-path/src/scripts/modules/winodws/index.js
 C:/very-important-path/src/scripts/modules/header/header.js
 C:/very-important-path/src/scripts/modules/header/header.jscontroller.js
 C:/very-important-path/src/scripts/modules/SCSS/index.scss
 C:/very-important-path/src/scripts/modules/SCSS/index.scsssetup.scss
 C:/very-important-path/compiled/angular.js
 C:/very-important-path/compiled/angular.jsangular-material.js
 C:/very-important-path/compiled/angular.jsangular-material.jsfallback.js
 C:/very-important-path/built/frontEnd/
 C:/very-important-path/built/backEnd/
 C:/very-important-path/built/assets/styles.css
 C:/very-important-path/built/assets/external-styles.css
 C:/very-important-path/built/assets/fontAwesome/font-awesome.css
 C:/very-important-path/built/assets/img/
 C:/very-important-path/built/assets/svg/
 C:/very-important-path/built/assets/unrelated/boot.js
```
