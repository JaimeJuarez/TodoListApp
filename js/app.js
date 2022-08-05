//////////////////////////////
//      Selectores         //
//////////////////////////////

const todobar = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-select');
const DBI = '../task';
let oldValueOftext;
let todos;

//////////////////////////////
//   Async Functions (Fetch)//
//////////////////////////////

async function getDataBaseTodos() {
    const response = await fetch(DBI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => task = data)
        .then(() => {
            setTimeout(() => {
                if (todos === null) {
                    todos = task;
                    todos.forEach(todo => {
                        console.log(todo);
                        SaveTodoLocalStorage(todo);
                    })
                    console.log(todos);
                    getTodoLocalStorage(todos);
                }
            }, 90);
        })
        .then(() => {
            if (todos !== task && todos !== null) {
                todos = [];
                localStorage.clear();
                todos = task
                localStorage.setItem('todos', JSON.stringify(todos));
                getTodoLocalStorage(todos)
            }
        })
    return response;
}

async function postDataBaseTodos(event) {
    const data = {
        id: todos.length + 1,
        title: todobar.value,
        completed: false
    }
    event.preventDefault();
    console.log(todos.map(todo => todo.title));
    console.log(todobar.value);
    if (todos.map(todo => todo.title).includes(todobar.value)) {
        console.log(todobar.value);
        alert("La tarea ya existe");
        return;
    } else {
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

        SaveTodoLocalStorage(data);
        console.log(todos);
        todobar.value = '';
    }
    const response = await fetch(DBI, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    return response;
}

async function deleteDataBaseTodos(e) {
    const item = e.target;
    e.preventDefault();
    if (item.classList.contains('fa-trash')) {
        const todo = item.parentElement.parentElement;
        const TodoValue = todo.children[1].innerText;
        if (item.classList.contains('fa-trash')) {
            console.log(todo);
            const data = {
                title: TodoValue
            }
            fetch(DBI, {
                    method: 'DELETE',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
        }
        removeTodoLocalStorage(todo);
        todo.remove();
    }
}

async function putDataBaseSaveEditTodo(e) {
    const item = e.target;
    e.preventDefault();
    if (item.classList.contains('TodoSaveEditBtn')) {
        const todo = item.parentElement;
        const todoText = todo.children[1].value;
        if (todos.map(todo => todo.title).includes(todoText)) {
            alert("La tarea ya existe");
            return;
        } else {
            const todoli = document.createElement('li');
            todoli.innerHTML = todoText;
            todo.replaceChild(todoli, todo.children[1]);
            item.parentElement.removeChild(item.parentElement.children[4]);
            todo.children[2].style.display = "block";
            todo.children[3].style.display = "block";
            todo.children[4].remove();
            const TodoOldValueIndex = todos.findIndex(index => index.title == oldValueOftext);
            if (TodoOldValueIndex !== -1) {
                todos[TodoOldValueIndex].title = todoText;
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            const data = {
                titlep: oldValueOftext,
                title: todoText,
                completed: todos[todos.findIndex(index => index.title == (todo.children[1].innerText))].completed
            }
            fetch(DBI, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
        }
    }
}
//////////////////////////////
//      Functions         //
//////////////////////////////

const CompleteCheked = (e) => {
    const item = e.target;
    e.preventDefault();
    if (item.classList.contains('fa-check')) {
        const todo = item.parentElement.parentElement;
        console.log(todos);
        console.log(todo.children[1].innerText);
        item.classList.remove('fas', 'fa-check');
        item.classList.add('fa-solid', 'fa-x');
        todo.classList.add('completed');
        todos[todos.findIndex(index => index.title == (todo.children[1].innerText))].completed = true;
        const IsCompletedValue = todos[todos.findIndex(index => index.title == (todo.children[1].innerText))].completed;
        const todotextvalue = todo.children[1].innerText;
        localStorage.setItem('todos', JSON.stringify(todos));

        console.log(IsCompletedValue);
        console.log(todotextvalue);
        const data = {
            titlep: todotextvalue,
            title: todotextvalue,
            completed: IsCompletedValue
        }
        fetch(DBI, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())

    } else {
        if (item.classList.contains('fa-x')) {
            const todo = item.parentElement.parentElement;
            console.log(todo);
            item.classList.remove('fa-solid', 'fa-x');
            item.classList.add('fas', 'fa-check');
            todo.classList.remove('completed');
            todos[todos.findIndex(index => index.title == (todo.children[1].innerText))].completed = false;
            const IsCompletedValue = todos[todos.findIndex(index => index.title == (todo.children[1].innerText))].completed;
            const todotextvalue = todo.children[1].innerText;
            localStorage.setItem('todos', JSON.stringify(todos));

            const data = {
                titlep: todotextvalue,
                title: todotextvalue,
                completed: IsCompletedValue
            }
            fetch(DBI, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
        }
    }
}
const editTodos = (e) => {
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
        const todoCancelSaveButton = document.createElement('button');
        todoEditSaveButton.innerHTML = 'Guardar';
        todoEditSaveButton.classList.add('TodoSaveEditBtn');
        todoCancelSaveButton.innerHTML = 'Cancelar';
        todoCancelSaveButton.classList.add('TodoCancelEditBtn');
        item.parentElement.parentElement.appendChild(todoEditSaveButton);
        item.parentElement.parentElement.appendChild(todoCancelSaveButton);
        item.parentElement.parentElement.children[2].style.display = "none";
        item.parentElement.parentElement.children[3].style.display = "none";
    }
}

const cancelEditTodos = (e) => {
    const item = e.target;
    e.preventDefault();
    if (item.classList.contains("TodoCancelEditBtn")) {
        const todo = item.parentElement;
        const todovalue = todo.children[1].value;
        const todoli = document.createElement('li');
        todoli.innerText = oldValueOftext;
        todo.replaceChild(todoli, todo.children[1]);
        item.parentElement.removeChild(item.parentElement.children[4]);
        todo.children[2].style.display = "block";
        todo.children[3].style.display = "block";
        todo.children[4].remove();
    }
}

const ValidationInputEmpty = (e) => {
    if (todobar.value.length < 4) {
        e.preventDefault();
        alert("Ingrese una tarea");
    } else {
        postDataBaseTodos(e);
    }
}

const renderTodo = (todos) => {
    if (todos == null) {
        return;
    } else {
        todos.forEach(todo => {
            const todoDiv = document.createElement('div');
            const todoCompleted = document.createElement('button');
            if (todo.completed === true) {
                todoDiv.classList.add("completed");
                todoCompleted.innerHTML = '<i class="fas fa-x"></i>';
                todoCompleted.classList.add("complete-btn");
                todoDiv.appendChild(todoCompleted);

            } else {
                todoDiv.classList.remove("completed");
                todoCompleted.innerHTML = '<i class="fas fa-check"></i>';
                todoCompleted.classList.add("complete-btn");
                todoDiv.appendChild(todoCompleted);
            }
            const todoli = document.createElement('li');
            todoli.innerHTML = todo.title;
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

//////////////////////////////
//  LocalStorage Functions  //
//////////////////////////////

const SaveTodoLocalStorage = (todo) => {
    if (!localStorage.getItem('todos')) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}
const getTodoLocalStorage = (task) => {
    if (!localStorage.getItem('todos')) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        renderTodo(task);
    }
}
const removeTodoLocalStorage = (todo) => {
        if (!localStorage.getItem("todos")) {
            todos = todos;
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[1].innerText;
        console.log(todos.findIndex(index => index.title === todoIndex));
        console.log(todoIndex);
        todos.splice(todos.findIndex(index => index.title === todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    //////////////////////////////
    //      Event Listeners    //
    //////////////////////////////
document.addEventListener('DOMContentLoaded', getDataBaseTodos);
todoButton.addEventListener('click', ValidationInputEmpty);
todolist.addEventListener('click', deleteDataBaseTodos);
todolist.addEventListener('click', putDataBaseSaveEditTodo);
todolist.addEventListener('click', editTodos);
todolist.addEventListener('click', cancelEditTodos);
todolist.addEventListener('click', CompleteCheked);
filterOption.addEventListener('click', filterTodo);