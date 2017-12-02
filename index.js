const electron = require('electron');
const path = require('path');
const url = require('url');
const {app,BrowserWindow,Menu,ipcMain} = electron;
//SET ENV
process.env.NODE_ENV = 'production';

let mainWindow ,addWindow;
app.on('ready',()=>{
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
    pathname:path.join(__dirname, 'mainWindow.html'),   
    protocol:'file:',
    slashes:true
}));
    //Quit app
    mainWindow.on('closed',()=>{
        app.quit();
    });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        height:200,
        width:300,
        title:'Add List Items'
    });
    addWindow.loadURL(url.format({
    pathname:path.join(__dirname, 'addWindow.html'),   
    protocol:'file:',
    slashes:true
}));
}
//Catch add item
ipcMain.on('item:add',(e,item)=>{
    console.log(item);
    mainWindow.webContents.send('item:add',item);
    addWindow.close();
});

//Menu Template
const mainMenuTemplate = [
{
    label:'File',
    submenu:[
    {
        label:'Add Item',
        click(){
            createAddWindow();
        }
    },
    {
        label:'Clear Items',
        click(){
           mainWindow.webContents.send('item:clear'); 
        }
    },{
        label:'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q':'Ctrl+Q',
        click(){
            app.quit();
        }
    }
    ]
}
];
//if mac,add empty array
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
//add developer tools 
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tool',
        submenu:[
        {
            label:'Toogle DevTools',
            accelerator: process.platform == 'darwin' ? 'Command+I':'Ctrl+I',
            click(item,focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role:'reload'
        }
        ]
    })
}
