**Directory-templates** is simple command-line utility that allows you to add , build , open templates generated from json or copy the contents of a saved directory to your CWD.

##Install
```npm i -g directory-templates```

##Usage

Commands `add` , `build-from` ,`open`, `list`.


* `add` will add  a template or directorie to **Directory-templates**
- `build-from` builds directory-structure at CWD based on template name or directorie name given
- `open` with no parameters passed opens the root directory otherwise opens the        template or directory given
- `list` shows a list of templates & directories you created

Flags `-delete` , `-o`
- `-delete` deletes everything from both template folder & directories folder
- `-o` Used in conjunction with `add` to open explorer or a text-editor

Example
```
dt add some-template
```
