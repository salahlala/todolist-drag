let todoTasks = document.querySelector(".todo-tasks"); // todo list
let doingTasks = document.querySelector(".doing-tasks"); // doing list
let doneTasks = document.querySelector(".done-tasks"); // done list
let allTasksList = document.querySelectorAll("ul");
let allDivs = document.querySelectorAll(".basic");
//#################################
let formTasks = document.querySelectorAll(".container form");
// ##############################################
let todoInput = document.getElementById("todo-input");
let doingInput = document.getElementById("doing-input");
let doneInput = document.getElementById("done-input");
// ####################################
let todoBtn = document.querySelector(".todo button");
let doingBtn = document.querySelector(".doing button");
let doneBtn = document.querySelector(".done button");

formTasks.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
loadTasks();

// add task to the list
function addTask(list, task) {
  let mainDiv = document.createElement("div");
  // let li = document.createElement("li");
  mainDiv.className = "task-div";
  mainDiv.setAttribute("draggable", "true");
  mainDiv.innerHTML = `
      <input value='${task}' readonly class='taskInput' />
      <div class='icons'>
      <i class="fa-regular fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash delete"></i>
      </div>
  `;
  {
    /* <li >${task}</li> */
  }
  // li.innerHTML = task;
  // li.setAttribute("draggable", "true");
  list.appendChild(mainDiv);

  dragItem();
}

// save tasks to local storage
// allInputs.forEach((input) => {
//   console.log(input);
//   input.readOnly = true;
// });
function save() {
  let todolist = todoTasks.innerHTML;
  let doinglist = doingTasks.innerHTML;
  let donelist = doneTasks.innerHTML;

  localStorage.setItem("todo", todolist);
  localStorage.setItem("doing", doinglist);
  localStorage.setItem("done", donelist);
}

// load tasks

function loadTasks() {
  let todoStore = localStorage.getItem("todo");
  let doingStore = localStorage.getItem("doing");
  let doneStore = localStorage.getItem("done");

  if (todoStore) {
    todoTasks.innerHTML = todoStore;
  }

  if (doingStore) {
    doingTasks.innerHTML = doingStore;
  }

  if (doneStore) {
    doneTasks.innerHTML = doneStore;
  }
  dragItem();
}

todoBtn.addEventListener("click", () => {
  let task = todoInput.value;
  if (task) {
    addTask(todoTasks, task);
    save();
    todoInput.value = "";
  }
});
doingBtn.addEventListener("click", () => {
  let task = doingInput.value;
  if (task) {
    addTask(doingTasks, task);
    save();
    doingInput.value = "";
  }
});
doneBtn.addEventListener("click", () => {
  let task = doneInput.value;
  if (task) {
    addTask(doneTasks, task);
    save();
    doneInput.value = "";
  }
});
let drag;
function dragItem() {
  let allInputs = document.querySelectorAll(".taskInput");

  allInputs.forEach((input) => {
    input.readOnly = true;
  });
  let allLis = document.querySelectorAll("ul .task-div");
  allLis.forEach((li) => {
    li.style.opacity = "1";

    li.addEventListener("dragstart", () => {
      li.style.opacity = ".6";
      drag = li;
    });

    li.addEventListener("dragend", () => {
      li.style.opacity = "1";
      drag = null;
    });

    li.querySelector("i.delete").addEventListener("click", () => {
      li.remove();
      save();
    });
    li.querySelector("i.edit").addEventListener("click", () => {
      let input = li.querySelector("input");
      input.readOnly = false;
      input.focus();

      li.classList.add("active");
      input.addEventListener("blur", () => {
        input.readOnly = true;
        li.classList.remove("active");
        save();
      });

      let text = input.value;
      input.addEventListener("input", (e) => {
        text = e.target.value;
        input.setAttribute("value", text);
        save();
      });
    });

    // console.log(li.querySelector("i.delete"));

    allTasksList.forEach((ul) => {
      ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        // this use to change colors
      });

      ul.addEventListener("drop", () => {
        ul.append(drag);
        save();
      });
    });

    allDivs.forEach((div) => {
      div.addEventListener("dragover", (e) => {
        e.preventDefault();
        div.style.backgroundColor = "#1fa77f";
      });
      div.addEventListener("drop", () => {
        div.style.backgroundColor = "#eee";
      });

      div.addEventListener("dragleave", () => {
        div.style.backgroundColor = "#eee";
      });
    });
  });
}

// Sortable.create(todoTasks, {
//   group: "kanban",
//   animation: 150,
//   onEnd: function () {
//     save();
//   },
// });

// Sortable.create(doingTasks, {
//   group: "kanban",
//   animation: 150,
//   onEnd: function () {
//     save();
//   },
// });
// Sortable.create(doneTasks, {
//   group: "kanban",
//   animation: 150,
//   onEnd: function () {
//     save();
//   },
// });
