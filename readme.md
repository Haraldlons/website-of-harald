# Start of homepage for Harald Lønsethagen

## I started out a long time ago building the fundation for my personal homepage. Thise ended up taking alot of time just getting the fundation build. Now I'm on vocation on Crete and have some hours to try to get this working.


# Usefull tips
## When adding a new page and controller
1. Make a new controller by making a new file called "<pageName>Ctrl.js"
2. Copy the entire content of another controller as a template and delete what you don't need and rename what you should
3. Make a new html file by putting it in the html folder. The convention is that the filename should be "<pageName>.html" 
4. Link the new controller in the app.js. Add a ".state('<controllerName>', {..." section
5. Link the new controller in the scripts.json. Commas can easily f**k up stuff
6. Start "gulp watch" again