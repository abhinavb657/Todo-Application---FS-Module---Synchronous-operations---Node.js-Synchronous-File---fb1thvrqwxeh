const fs = require('fs');

const getTodosSync = () => {
  const text = fs.readFileSync('db.txt', 'utf-8');
  return text;
};

const getTodoSync = (id) => {
  const text = fs.readFileSync('db.txt', 'utf-8');
  const arr = JSON.parse(`[${text.split("}\n{").join("},{")}]`);

  const obj = arr.find(d => d.id===id);
  return JSON.stringify(obj);
};

const createTodoSync = (todo) => {
  const obj = {
    title: todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const str = JSON.stringify(obj, null, 2);
  fs.appendFileSync('db.txt', str);
};

const updateTodoSync = (id, updates) => {
  const text = fs.readFileSync('db.txt', 'utf-8');
  const arr = JSON.parse(`[${text.trim().split("\n}\n{").join("},{")}]`);

  for(let i in arr) {
    let obj = arr[i];
    if(obj.id===id) {
      obj = {
        ...obj,
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      arr[i] = obj;
    }
  }
  let str="";
  for(let obj of arr) {
    str+=JSON.stringify(obj, null, 2)+"\n";
  }
  fs.writeFileSync('db.txt', str);
};

const deleteTodoSync = (id) => {
  const text = fs.readFileSync('db.txt', 'utf-8');
  const arr = JSON.parse(`[${text.trim().split("\n}\n{").join("},{")}]`);

  let str="";
  for(let obj of arr) {
    if(obj.id!==id) {
      str+=JSON.stringify(obj, null, 2)+"\n";
    }
  }
  fs.writeFileSync('db.txt', JSON.stringify(str, null, 2));
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
