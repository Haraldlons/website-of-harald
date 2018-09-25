# Start of homepage for Harald Lønsethagen

## I started out a long time ago building the fundation for my personal homepage. Thise ended up taking alot of time just getting the fundation build. Now I'm on vocation on Crete and have some hours to try to get this working.


# Prerequisite 
- [npm](https://www.npmjs.com/get-npm) version: >=6.4.1  
- [node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) version: >= v8.12.0
- [gulp](https://gulpjs.com/) cli version: >= 2.0.1, local version: >=3.9.1

# Getting started
1. 
```bash
git clone https://github.com/Haraldlons/simple-firebase-login-chat-project.git
cd simple-firebase-login-chat-project
sudo npm install
```
2. 
```bash
# Test if you have the environment setup successfully
gulp clean 
gulp default
```

3. 
Start local hosting
```bash
gulp watch
```

## Explanation
### gulp / gulp default 
Development code is in 'development' folder, while generated code by gulp is stored in distribution. When running 'gulp default' files are copied from the development folder into distribution folder. Javascript files are concatenated, and css-file the same. Dependencies in node_modules are also concatonated into a single file, which is named 'script_dependencies'. Therefor the final hosted folder 'distribution' should be a fast. 

### gulp clean
When running gulp clean, mosts file in the distr

# Usefull tips
## When adding a new page and controller
1. Make a new controller by making a new file called "<pageName>Ctrl.js"
2. Copy the entire content of another controller as a template and delete what you don't need and rename what you should
3. Make a new html file by putting it in the html folder. The convention is that the filename should be "<pageName>.html" 
4. Link the new controller in the app.js. Add a ".state('<controllerName>', {..." section
5. Link the new controller in the scripts.json. Commas can easily f**k up stuff
6. Start "gulp watch" again
