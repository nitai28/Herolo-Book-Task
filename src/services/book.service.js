// import utilService from './util.service.js'

import storageService from "./storage.service.js";

const KEY = "todoAppKey";
const USER_KEY = "userData";

(() => {
  if (!localStorage[KEY]) {
    localStorage[KEY] = JSON.stringify([
      { id: 1, text: "dog clean", isDone: true },
      { id: 2, text: "clean", isDone: false },
      { id: 3, text: "buy", isDone: true }
    ]);
  }
  if (!localStorage[USER_KEY]) {
    localStorage[USER_KEY] = JSON.stringify([
      {
        userName: "Nitai Shavit",
        actions: [{ name: "addTodo", at: 1523873242735 }]
      }
    ]);
  }
})();

function query(filter = null) {
  return storageService.load(KEY).then(todos => {
    if (filter === null || filter === "All" || filter === "") return todos;
    else {
      if (filter === "Active")
        return todos.filter(todo => todo.isDone === false);
      else if (filter === "Done")
        return todos.filter(todo => todo.isDone === true);
      else
        return (todos = todos.filter(todo =>
          todo.text.toLowerCase().includes(filter.toLowerCase())
        ));
    }
  });
}

function getUserAction(){
  return storageService.load(USER_KEY).then(user =>  user.actions)

}
function saveUserAction(action){
  storageService.load(USER_KEY).then(actions => {
    actions.unshift(action)
  return storageService.store(USER_KEY,actions)
  })
}

function getById(todoId) {
  return storageService.load(KEY).then(todos => {
    return todos.find(todo => todo.id === todoId);
  });
}

function deleteTodo(todoId) {
  return storageService.load(KEY).then(todos => {
    todos = todos.filter(todo => todo.id !== todoId);
    return storageService.store(KEY, todos);
  });
}

function saveTodo(todo) {
  return new Promise((resolve, reject) => {
    storageService.load(KEY).then(todos => {
      if (todo.id) {
        var todoIdx = todos.findIndex(currTodo => currTodo.id === todo.id);
        todos.splice(todoIdx, 1, todo);
      } else {
        todo.id = Date.now() % 1000;
        todos.unshift(todo);
      }
      storageService.store(KEY, todos);
      resolve(todo);
    });
  });
}

export default {
  query,
  getById,
  saveTodo,
  deleteTodo,
  saveUserAction
};
