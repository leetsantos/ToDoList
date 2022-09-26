'use strict';

let database = [];

const getDatabase = () => JSON.parse(localStorage.getItem('toDoList')) ?? [];
const setDatabase = (database) => localStorage.setItem('toDoList', JSON.stringify(database));

const createItem = (task, state, index) =>{
    const item = document.createElement('label');
    item.classList.add('toDo-Item');
    item.innerHTML = `
        <input type="checkbox" ${state} data-indice=${index} >
        <div>${task}</div>
        <input type="button" value="x" data-indice=${index}>
        ` ;
    document.getElementById('toDoList').appendChild(item);
}

const cleanTasks = () => {
    const toDoList = document.getElementById('toDoList');
    while (toDoList.firstChild){
        toDoList.removeChild(toDoList.lastChild);
    }
}

const updateList = () => {
     cleanTasks();
     const database = getDatabase();
     database.forEach((item, index) => 
        createItem (item.task, item.state, index)
     );
}

const setItem = (occasion) => {
    const key = occasion.key;
    const text = occasion.target.value;
    if (key === 'Enter'){
        const database = getDatabase();
        database.push({'task': text, 'state': ''});
        setDatabase(database);
        updateList();
        occasion.target.value = '';    
    }
}

const removeItem = (index) => {
    const database = getDatabase();
    database.splice(index, 1);
    setDatabase(database);
    updateList();
}

const updateItem = (index) => {
    const database = getDatabase();
    database[index].state = database[index].state === '' ? 'checked': '';
    setDatabase(database);
    updateList();
}

const clickEvent = (occasion) => {
    const element = occasion.target;
    console.log (element.type);
    if(element.type==='button'){
        const index = element.dataset.index;
        removeItem(index);
    } else if (element.type === 'checkbox'){
        const index = element.dataset.index;
        updateItem(index);
    } 
}

document.getElementById('newItem').addEventListener('keypress', setItem);
document.getElementById('toDoList').addEventListener('click', clickEvent);

updateList();