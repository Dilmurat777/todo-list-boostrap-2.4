const addSubmit = document.querySelector('.addSubmit');
const addCheckbox = document.querySelector('.addCheckbox');
const addInput = document.querySelector('.addInput');
const messageError = document.querySelector('.messageError');
const taskList = document.querySelector('.taskList');
const overlay = document.querySelector('.overlay');
const editPopup = document.querySelector('.editPopup');

let tasks = [
  {
    id: 1,
    taskName: 'I have finish my Task',
    isDone: false,
    isImportant: false,
  },
];

addInput.addEventListener('input', changeInput);
addSubmit.addEventListener('click', addTask);

overlay.addEventListener('click', function(e) {
 if(e.target.className === 'overlay') {
  overlay.style.display = 'none'
 }
})

function changeInput() {
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
}

function addTask() {
  const textInput = addInput.value.trim();
  const isDuplicate = tasks.some((task) => task.taskName === textInput)
  if (isDuplicate) {
    alert('You already have same world');
  }else if (textInput.length >= 3) {
    let newTask = {
      id: tasks.length ? tasks.at(-1).id + 1 : 1,
      taskName: textInput,
      isDone: false,
      isImportant: addCheckbox.checked,
    };
    messageError.style.display = 'none';
    addInput.value = '';
    addInput.focus();
    addCheckbox.checked = '';
    tasks.push(newTask);
  } else {
    messageError.style.display = 'block';
  }

  fillTask();
}

function fillTask() {
  taskList.innerHTML = '';
  tasks.forEach((item) => {
    taskList.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.taskName}</td>
        <td>${item.isDone ? 'Done' : 'inProgress'}</td>
        <td>
        <button data-id='${item.id}' type="button" class="btn addDone ${item.isDone ? 'btn-info' : 'btn-outline-info'}">Done</button></td>
        <td>
        <button data-id='${item.id}' type="button" class="btn addImportant ${item.isImportant ? 'btn-warning' : 'btn-outline-warning'}">Important</button>
        </td>
        <td>
        <button data-id='${item.id}' data-name='${item.taskName}' type="button" class="btn addEdit btn-secondary">Edit</button>
        </td>
        <td>
        <button data-id='${item.id}' type="button" class="btn btn-danger deleteBtn">Delete</button>
        </td>
      </tr>
    `;
  });

  const addImportant = document.querySelectorAll('.addImportant');
  const addDone = document.querySelectorAll('.addDone');
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  const addEdit = document.querySelectorAll('.addEdit');

  deleteBtn.forEach((item) => {
    item.addEventListener('click', function() {
    tasks = tasks.filter((el) => {
        return el.id !== Number(item.dataset.id)
      })
      fillTask()
  })
  })

  addDone.forEach((item) => {
    item.addEventListener('click', function() {
      tasks = tasks.map((el) => {
        if(el.id == item.dataset.id) {
          return {...el, isDone : !el.isDone}
        }
        return el;
      })
      fillTask()
    })
  })

  addImportant.forEach((item) => {
    item.addEventListener('click', function() {
      tasks = tasks.map((el) => {
        if(el.id == item.dataset.id) {
          return {...el, isImportant : !el.isImportant}
        }
        return el;
      })
      fillTask()
    })
  })

  Array.from(addEdit).forEach((item) => {
    item.addEventListener('click', function() {
      overlay.style.display = 'flex'

      editPopup.value = item.dataset.name

    })
  })

}
