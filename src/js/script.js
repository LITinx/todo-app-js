const inputValue = document.getElementById('todoInput')
const submitBtn = document.getElementById('submitBtn')
const listWrapper = document.getElementById('ulList')
const placeholderInput = document.getElementsByName('todo')[0]

let tasks = []
!localStorage.tasks
	? (tasks = [])
	: (tasks = JSON.parse(localStorage.getItem('tasks')))

function Task(taskName) {
	this.taskName = taskName
	this.completed = false
}
function updateLocal() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createTemplate(task, index) {
	if (task.taskName === '') return ''
	return `
		<li class="list-style">
    <p class="${!task.completed ? '' : 'line-through text-gray-600 italic'}">
      ${task.taskName}
    </p>
        <div class="inline-block space-x-1 no-underline">
          <button onclick="deleteTask(${index})" class="btn-primary border-red-500 bg-red-400 hover:bg-red-500">Delete              
          Task</button>
          <button onclick="completeTask(${index})" class="btn-primary border-green-500 bg-green-400 hover:bg-green-500">${
		!task.completed ? 'End Task' : 'Return'
	}</button>
	</div>
	</li>
	`
}
function filterTasks() {
	const activeTasks =
		tasks.length && tasks.filter((task) => task.completed === false)
	const unactiveTasks =
		tasks.length && tasks.filter((task) => task.completed === true)
	tasks = [...activeTasks, ...unactiveTasks]
}

function fillList() {
	listWrapper.innerHTML = ''
	if (tasks.length > 0) {
		filterTasks()
		tasks.forEach((task, index) => {
			listWrapper.innerHTML += createTemplate(task, index)
		})
		todosElements = document.querySelectorAll('.list-style')
	}
}
fillList()

function completeTask(index) {
	tasks[index].completed = !tasks[index].completed
	fillList()
	updateLocal()
}

submitBtn.addEventListener('click', (e) => {
	e.preventDefault()
	tasks.push(new Task(inputValue.value))
	if (inputValue.value === '') {
		inputValue.classList.add('placeholder:text-red-500', 'border-red-500')
		placeholderInput.placeholder = "Please write Todo's name "
		return
	}
	if (inputValue.value !== '') {
		inputValue.classList.remove('placeholder:text-red-500', 'border-red-500')
		placeholderInput.placeholder = 'Todo'
	}
	inputValue.value = ''
	updateLocal()
	fillList()
})

function deleteTask(index) {
	tasks.splice(index, 1)
	updateLocal()
	fillList()
}
