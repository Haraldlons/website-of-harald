# Start of homepage for Harald Lønsethagen

## I started out a long time ago building the fundation for my personal homepage. Thise ended up taking alot of time just getting the fundation build. Now I'm on vocation on Crete and have some hours to try to get this working.

# For development
## Dependencies
- npm
- gulp

## Installation
1. clone repository
git clone https://github.com/haraldlons/website-of-harald.git
2. change directory
cd website-of-harald
3. install dependencies
sudo npm install
4. 
gulp watch
5. PROFIT!

## Possible hickups
- Other applications are running on the same port
- You have not installed gulp correctly
- gulp watch  -> throw new Error(errors.unsupportedEnvironment());
=> then delete node_modules and run 'npm install' again

# Usefull tips
## When adding a new page and controller
1. Make a new controller by making a new file called "<pageName>Ctrl.js"
2. Copy the entire content of another controller as a template and delete what you don't need and rename what you should
3. Make a new html file by putting it in the html folder. The convention is that the filename should be "<pageName>.html" 
4. Link the new controller in the app.js. Add a ".state('<controllerName>', {..." section
5. Link the new controller in the scripts.json. Commas can easily f**k up stuff
6. Start "gulp watch" again

## When adding new dependencies
1. install with npm AND add to package.json
npm install --save <package_name>
2. PROFIT!
the --save tag adds the dependencie to package.json

##