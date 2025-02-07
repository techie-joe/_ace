## Development pre-requisites

You'll need the following setup to use this project to build your web project.

### Install software
- Visual Studio Code (VsCode) or any suitable code editor.
- Node.js JavaScript runtime and NPM package manager.  
  Visit `https://nodejs.org/`.
- GitHub or any suitable git for version control.  
  Visit `https://desktop.github.com/download/`.
- VsCode Extension : HTML CSS Support.
- VsCode Extension : pug (jade) formatter.
- VsCode Extension : Pug beautify.
- VsCode Extension : SCSS Formatter.
- VsCode Extension : SCSS ItelliSense.
- (optional) VsCode Extension : PHP Itellephense.
- (optional) VsCode Extension : Gulp extension. to help you manage your tasks more efficiently.
- (optional) VsCode Extension : TypeScript.

### Setup project
- Clone the project from git to your local workspace.
- Run command terminal `cmd`.
- Run `cd path/to/your/project` to go to your project directory.
- Run `node -v` to check Node.js version.
- Run `npm -v` to check NPM version.
- Run `git init` to initialize a git repository.
- Run `npm init` to initialize `package.json`.
- Run `npm i` to install project dependencies.

## Directory notes
- builder : are used to create some files for this builder.
- files : will be copied as is into deployment.
- pages : will be gulped and deployed into production.
- pugs  : are shared pug files being referenced by pages.
- scripts : are used to generate javascript assets for the project.
- styles  : are used to generate css assets for the project.
- todos   : are development notes to drive progress.