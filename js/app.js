//////////////////////////////
//      Selectores         //
//////////////////////////////

const todobar = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
let todos;

//////////////////////////////
//      Functions         //
//////////////////////////////
const addTodo = (event) => {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    const todoCompleted = document.createElement('button');
    const edit = document.createElement('button');
    const todoli = document.createElement('li');
    const todoDelete = document.createElement('button');
    todos.forEach(element => {
        if (todoli.innerText === element) {
            alert("La tarea ya existe");
        } else {

            todoCompleted.innerHTML = '<i class="fas fa-check"></i>';
            todoCompleted.classList.add("complete-btn");
            todoDiv.appendChild(todoCompleted);

            todoli.innerHTML = todobar.value;
            todoDiv.classList.add('todo');
            todoDiv.appendChild(todoli);



            edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
            edit.classList.add("edit-btn");
            todoDiv.appendChild(edit);


            todoDelete.innerHTML = '<i class="fas fa-trash"></i>';
            todoDelete.classList.add("delete-btn");
            todoDiv.appendChild(todoDelete);
            todolist.appendChild(todoDiv);


        }
    });
    SaveTodoLocalStorage(todobar.value);
    todobar.value = '';

}
const deleteChecked = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('fa-trash')) {
        e.target.parentElement.parentElement.remove();
        removeTodoLocalStorage(e.target.parentElement.parentElement);
    }
}



const TodoTaskCompleted = (e) => {
    if (e.target.classList.contains('complete-btn')) {
        e.target.parentElement.classList.toggle('completed');
    }
}

const ValidationInputEmpty = (e) => {
    if (todobar.value.length < 4) {
        e.preventDefault();
        alert("Ingrese una tarea");
    } else {
        addTodo(event);
    }
}

const SaveTodoLocalStorage = (todo) => {
    if (!localStorage.getItem('todos')) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(todos);

}

const getTodoLocalStorage = () => {
    if (!localStorage.getItem('todos')) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        const todoli = document.createElement('li');
        todoli.innerHTML = todo;
        const todoCompleted = document.createElement('button');
        todoCompleted.innerHTML = '<i class="fas fa-check"></i>';
        todoCompleted.classList.add("complete-btn");
        todoDiv.appendChild(todoCompleted);
        todoDiv.classList.add('todo');
        todoDiv.appendChild(todoli);

        const edit = document.createElement('button');
        edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
        edit.classList.add("edit-btn");
        todoDiv.appendChild(edit);

        const todoDelete = document.createElement('button');
        todoDelete.innerHTML = '<i class="fas fa-trash"></i>';
        todoDelete.classList.add("delete-btn");
        todoDiv.appendChild(todoDelete);
        todolist.appendChild(todoDiv);
    })
    console.log(todos);
}

const removeTodoLocalStorage = (todo) => {
        if (!localStorage.getItem("todos")) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[1].innerText;
        console.log(todos.indexOf(todoIndex));
        console.log(todo);
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    //////////////////////////////
    //      Event Listeners    //
    //////////////////////////////
document.addEventListener('DOMContentLoaded', getTodoLocalStorage);
todoButton.addEventListener('click', ValidationInputEmpty);
todolist.addEventListener('click', deleteChecked);