# LAN-File-Server
A simple LAN File Server , with Electron

You can use this simple app as a local lan file sever
Support different kinds of file types.

Scenarios：
* App development: your app may need to download some packages, you can use this app to provide test package file(*.zip...)
* Simple file share, Watch movies from your computer at home by your phone(need to in same lan)

Choose folder - set port number or use default(9876) - Click start button . 

Then you can visit your file from `http://[your computer's ip in lan]:[port]/[file name in folder]`

I began to learn js just recently, so there may be some bugs or 'bad code', issues are welcome~ 

------

#### How to package (building app that can run at MacOS or Windows)

https://www.christianengvall.se/electron-packager-tutorial/

1. Install Electron packager
```bash
# for use in npm scripts
npm install electron-packager --save-dev

# for use from cli
npm install electron-packager -g
```
2. Setting productname and electron version
```bash
npm install --save-dev electron
```
change `package.json` content if needed.

3. Building MacOS, Windows and Linux package from the terminal
```bash
# MacOS
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds

# Windows
electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="LAN-File-Server"

# Linux
electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
```

----

#### Screenshot

![sc](https://raw.githubusercontent.com/hulioran/LAN-File-Server/master/sc.jpg)

