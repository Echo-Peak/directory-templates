**Directory-templates** is simple command-line utility that allows you to add,clone the contents a folder from any location via the command-line.

**Directory-templates** contains a folder called `templates where you can add folders to and clone from

##Install
```npm i -g directory-templates```

##Usage
Directory-templates uses 'dt' as command-line namespace

dt has 4 options

 - -add
 - -clone
 - -open
 - -list

`-add` takes a name you specify as the name of the folder to create within `directory templates`.
Example: `dt -add=somename`

`-clone` takes a name you specify as the name from within **directory templates** and clones the contents of the `template folder` to the working directory.
Example: `dt -clone=somename`.

`-open` opens the `template folder` with the name provided, if no name is pass then it will ask to create a new folder to be created inside **directory templates** with that name then opens that folder.
Example: `dt -open=somename`.

`-list` outputs an array of templates found within **directory templates** to the command-line
