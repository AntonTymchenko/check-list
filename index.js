let input = document.querySelector("#input");
let list = document.querySelector("#list");

let todoId = 0; //для дата атрибутов

input.addEventListener("change", inputChange);
list.addEventListener("click", onTodoListClick);

function inputChange(e) {
  if (!e.target.value.trim()) {
    e.target.value = "";
    return;
  }
  if (checkDuplicateTodo(e.target.value)) {
    e.target.value = "";
    return;
  }
  todoId += 1;
  let li = `<li data-num=${todoId} class="list-item"><p data-span=${todoId}>${e.target.value}</p>
    <button type="button"  data-num=${todoId} class="delete">delete</button>
    <button type="button" data-num=${todoId} class="selected">completed</button></li>`;
  list.insertAdjacentHTML("afterbegin", li);
  e.target.value = "";
}

function onTodoListClick(e) {
  const todoCollection = document.querySelectorAll("li");
  const newCollection = [...todoCollection];
  if (e.target.className === "delete") {
    //логика для кнопки делит
    let id = findTodoIndex(e.target.dataset.num, newCollection);
    newCollection.splice(id, 1);
    list.innerHTML = "";
    list.append(...newCollection);
  }
  if (e.target.className === "selected") {
    // логика для кнопки выполнено
    let id = findTodoIndex(e.target.dataset.num, newCollection);
    newCollection[id].childNodes[0].classList.toggle("completed");
  }
  if (e.target.localName === "p") {
    // логика для изменения текста тyду
    e.target.classList.add("display-none");

    let li = e.target.parentNode;
    let input = document.createElement("input");
    input.value = e.target.textContent;
    input.setAttribute("data-input", e.target.dataset.span);
    li.appendChild(input);
    input.focus();

    input.addEventListener("keypress", keyPressInputHandler);

    li.classList.add("row-reverse");
  }
}

function keyPressInputHandler(e) {
  if (e.key === "Enter") {
    const todoCollection = document.querySelectorAll("li");
    const newCollection = [...todoCollection];

    let li = e.target.parentNode;
    li.classList.remove("row-reverse");
    let changeTodoText = e.target.value;
    let indx = findTodoIndex(e.target.dataset.input, newCollection);
    todoCollection[indx].childNodes[0].textContent = changeTodoText;
    todoCollection[indx].childNodes[0].classList.remove("display-none");
    e.target.remove();
  }
}

function checkDuplicateTodo(text) {
  const todoCollection = document.querySelectorAll("li");
  const newCollection = [...todoCollection];
  if (todoCollection.length === 0) {
    return;
  }
  if (newCollection.some((item) => item.childNodes[0].textContent === text)) {
    alert(`You have already ${text} in todo list`);
    return true;
  }
}

function findTodoIndex(num, arr) {
  let indx = num;
  return arr.findIndex((item) => +item.dataset.num === +indx);
}
