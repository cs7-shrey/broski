const path = require('path');
const fs = require('fs');

const appFolder = path.join(process.env.ZDOTDIR, '.local/share', 'myTodoApp');
// if the app folder does not exist, we create such a folder
if (!fs.existsSync(appFolder)) {
  fs.mkdirSync(appFolder, { recursive: true });
}
const filePath = path.join(appFolder, 'todos.json');
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{"todos": []}', 'utf8');
    console.log('Todo file created');
  }
console.log(filePath)

async function readTodos() {
    const fileData = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    const todos = fileData.todos; // array of todos
    // console.log(todos);
    return todos;
}

async function createTodo(todoContent) {
    const todos = await readTodos();
    const newTodo = todoContent;
    newTodo['id'] = todos.length + 1;
    console.log(newTodo);
    todos.push(newTodo);
    await fs.promises.writeFile(filePath, JSON.stringify({ todos }), 'utf8');
}

async function deleteTodo(todoId) {
    console.log('Deleting todo with id:', todoId);
    let todos = await readTodos();
    let updatedTodos = todos.filter((todo) => {
        return todo.id !== todoId;
    });
    updatedTodos = updatedTodos.map((todo, index) => {
        todo.id = index + 1;
        return todo;
    })
    // console.log(updatedTodos);
    await fs.promises.writeFile(filePath, JSON.stringify({ todos: updatedTodos }), 'utf8');
}

module.exports = { readTodos, createTodo, deleteTodo };