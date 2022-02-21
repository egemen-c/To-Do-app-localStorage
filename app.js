let addBtn = document.querySelector('#add-btn');
let itemList = document.querySelector('#ul');
let input = document.querySelector('#input');
let todos = [];
//
addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addTodos(input.value)
    input.value = "";
})

function addTodos(value) {
    if (!value == '') {
        const todo = {
            title: value,
            id: Date.now()
        }
        todos.push(todo)
        addLocal();
    }
}

function addLocal() {
    localStorage.setItem("todos", JSON.stringify(todos))
    getLocal()
}

function getLocal() {
    const ref = localStorage.getItem("todos")
    if (ref) {
        todos = JSON.parse(ref)
        renderDom(todos)
    }
}

function renderDom(todos) {
    itemList.innerHTML = " ";
    todos.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML =
        `
        ${element.title}
        <button class="delete-button" data-index="${element.id}" 
        onclick="deleteTodo(this.dataset.index)">X</button>
        `
        itemList.append(li)
    });
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    addLocal(todos);
}
getLocal();