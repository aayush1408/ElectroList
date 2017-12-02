  const electron = require('electron');
        const {ipcRenderer} = electron;
        const ul = document.querySelector('ul'); 
        //Catch add items
        ipcRenderer.on('item:add',(e,item)=>{
            const li = document.createElement('li');
            const itemText = document.createTextNode(item);
            li.appendChild(itemText);
            ul.appendChild(li);
        });
        //Clear item
         ipcRenderer.on('item:clear',()=>{
            ul.innerHTML = '';
         });
         //Remove item
         ul.addEventListener('dblclick',removeItem);
         function removeItem(e){
            e.target.remove();
         }
