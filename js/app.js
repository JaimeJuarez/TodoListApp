//////////////////////////////
//      Selectores         //
//////////////////////////////

const todobar = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-select');
var oldValueOftext;
let todos;

//////////////////////////////
//      Functions         //
//////////////////////////////
const addTodo = (event) => {
    event.preventDefault();
    if (todos.includes(todobar.value)) {
        alert("La tarea ya existe");
    } else if (!todos.includes(todobar.value)) {
        const todoDiv = document.createElement('div');

        const todoCompleted = document.createElement('button');
        todoCompleted.innerHTML = '<i class="fas fa-check"></i>';
        todoCompleted.classList.add("complete-btn");
        todoDiv.appendChild(todoCompleted);

        const todoli = document.createElement('li');
        todoli.innerHTML = todobar.value;
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
        SaveTodoLocalStorage(todobar.value);
        todobar.value = '';
    }

}

const CompleteCheked = (e) => {
    const item = e.target;
    e.preventDefault();
    if (item.classList.contains('fa-check')) {
        const todo = item.parentElement.parentElement;
        console.log(todo);
        console.log(item);
        item.classList.remove('fas', 'fa-check');
        item.classList.add('fa-solid', 'fa-x');
        todo.classList.add('completed');
    } else {
        if (item.classList.contains('fa-x')) {
            const todo = item.parentElement.parentElement;
            item.classList.remove('fa-solid', 'fa-x');
            item.classList.add('fas', 'fa-check');
            todo.classList.remove('completed');
        }
    }
}

//Make a function to make the edit todo
const editTodo = (e) => {
    const item = e.target;
    e.preventDefault();
    const editInput = document.createElement('input');
    if (item.classList.contains("fa-pen")) {
        const todo = item.parentElement.parentElement;
        const todoText = todo.children[1].innerText;
        oldValueOftext = todoText;
        editInput.classList.add("edit-input");
        editInput.value = todoText;
        todo.replaceChild(editInput, todo.children[1]);
        editInput.focus();
        editInput.addEventListener('blur', () => {
            todo.replaceChild(todo.children[1], editInput);
        });

        const todoEditSaveButton = document.createElement('button');
        todoEditSaveButton.innerHTML = 'Guardar';
        todoEditSaveButton.classList.add('TodoSaveEditBtn');
        item.parentElement.parentElement.appendChild(todoEditSaveButton);
        item.parentElement.parentElement.children[2].style.display = "none";
    }
}

const SaveEditTodo = (e) => {
    const item = e.target;
    e.preventDefault();
    if (item.classList.contains('TodoSaveEditBtn')) {
        // console.log(item.parentElement.children[1].value);
        // console.log(todos.indexOf(oldValueOftext));
        const todo = item.parentElement;
        const todoText = todo.children[1].value;

        const todoli = document.createElement('li');
        todoli.innerHTML = todoText;
        todo.replaceChild(todoli, todo.children[1]);
        item.parentElement.removeChild(item.parentElement.children[4]);
        todo.children[2].style.display = "block";
        console.log(todos);
        const TodoOldValueIndex = todos.indexOf(oldValueOftext);

        if (TodoOldValueIndex !== -1) {
            todos[TodoOldValueIndex] = todoText;
            console.log(todos);
        }
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

const deleteChecked = (e) => {
    const item = e.target;
    e.preventDefault();
    // console.log(item.classList);
    if (item.classList.contains('fa-trash')) {
        const todo = item.parentElement.parentElement;
        console.log(todo);
        todo.remove();
        removeTodoLocalStorage(todo);
    }
    if (item.classList.contains("complete-btn")) {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }
}

const ValidationInputEmpty = (e) => {
    if (todobar.value.length < 4) {
        e.preventDefault();
        alert("Ingrese una tarea");
    } else {
        addTodo(e);
    }
}

const filterTodo = (e) => {
    const todos = todolist.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
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
}

const removeTodoLocalStorage = (todo) => {
        if (!localStorage.getItem("todos")) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[1].innerText;
        console.log(todos.indexOf(todoIndex));
        console.log(todoIndex);
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    //////////////////////////////
    //      Event Listeners    //
    //////////////////////////////
document.addEventListener('DOMContentLoaded', getTodoLocalStorage);
todoButton.addEventListener('click', ValidationInputEmpty);
todolist.addEventListener('click', deleteChecked);
todolist.addEventListener('click', SaveEditTodo);
todolist.addEventListener('click', editTodo);
todolist.addEventListener('click', CompleteCheked);
filterOption.addEventListener('click', filterTodo);