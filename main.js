const addSubmit = document.querySelector('.addSubmit');
const addCheckbox = document.querySelector('.addCheckbox');
const addInput = document.querySelector('.addInput');
const messageError = document.querySelector('.messageError');
const taskList = document.querySelector('.taskList');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const editInput = document.querySelector('.editInput');
const saveEdit = document.querySelector('.saveEdit');

let tasks = [];


if(localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

addInput.addEventListener('input', function () {
  const textInput = addInput.value.trim();
  if (textInput.length >= 3) {
    addSubmit.setAttribute('data-bs-dismiss', 'modal');
    addSubmit.setAttribute('aria-label', 'Close');
    messageError.style.display = 'none';
  } else {
    addSubmit.removeAttribute('data-bs-dismiss', 'modal');
    addSubmit.removeAttribute('aria-label', 'Close');
    messageError.style.display = 'block';
  }
});

addSubmit.addEventListener('click', function () {
  const textInput = addInput.value.trim();
  const isDuplicate = tasks.some((task) => task.taskName === textInput);

  if(isDuplicate) {
    alert("You have same world")
  }else if (textInput.length >= 3) {
    let newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      taskName: textInput,
      isDone: false,
      isImportant: addCheckbox.checked,
    };

    tasks.push(newTask);
    addInput.value = '';
    addCheckbox.checked = '';
    addInput.focus();
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
  addTask();
});

overlay.addEventListener('click', function(e) {
  if(e.target.className == 'overlay') {
    overlay.style.display = 'none';
  }
 
})

saveEdit.addEventListener('click', function() {
  const textEdit = editInput.value.trim()
     tasks = tasks.map((item) => {
      if(item && item.id == saveEdit.dataset.id) {
        return {...item, taskName: textEdit}
      } else {
        return item
      }
     })
     overlay.style.display = 'none'
     localStorage.setItem('tasks', JSON.stringify(tasks))
     addTask() 
})

function addTask() {
  taskList.innerHTML = '';
  tasks.forEach((item) => {
    taskList.innerHTML +=`
    <tr class="align-bottom">
      <td>${item.id}</td>
      <td>${item.taskName}</td>
      <td>${item.isDone ? 'Done' : 'inProgress'}</td>
      <td><button data-id="${item.id}" type="button" class="btn allIsDoneBtn ${
      item.isDone ? 'btn-info' : 'btn-outline-info'
    }">Done</button></td>
      <td><button data-id="${item.id}" type="button" class="btn allIsImportantBtn ${
      item.isImportant ? 'btn-warning' : 'btn-outline-warning'
    }">Important</button></td>
      <td>
      <button data-name='${item.taskName}' data-id='${item.id}' type="button" class="btn allEditBtn btn-secondary">Edit</button>
      </td>
      <td>
      <button data-id='${item.id}' type="button" class="btn allDeleteBtn btn-danger">Delete</button>
      </td>
    </tr>
  `;

    const allIsImportantBtn = document.querySelectorAll('.allIsImportantBtn');
    const allIsDoneBtn = document.querySelectorAll('.allIsDoneBtn');
    const allDeleteBtn = document.querySelectorAll('.allDeleteBtn');
    const allEditBtn = document.querySelectorAll('.allEditBtn');
    

    allIsImportantBtn.forEach((item) => {
      item.addEventListener('click', function () {
        tasks = tasks.map((el) => {
          if (el.id == item.dataset.id) {
            return { ...el, isImportant: !el.isImportant };
          }
          return el;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
        addTask();
      });
    });
    allIsDoneBtn.forEach((item) => {
      item.addEventListener('click', function () {
        tasks = tasks.map((el) => {
          if (el.id == item.dataset.id) {
            return { ...el, isDone: !el.isDone };
          }
          return el;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
        addTask();
      });
    });
    allDeleteBtn.forEach((item) => {
      item.addEventListener('click', function () {
        console.log(item)
        tasks = tasks.filter((el) =>  {
          return el.id !== Number(item.dataset.id)
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        addTask();
      });
    });
    allEditBtn.forEach((item) => {
      item.addEventListener('click', function (e) {
        overlay.style.display = 'flex'
        editInput.value = item.dataset.name
        saveEdit.dataset.id = item.dataset.id
        localStorage.setItem('tasks', JSON.stringify(tasks))
      });

    });
  });
}


addTask() 