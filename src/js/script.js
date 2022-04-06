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
        <div class="inline-block pr-0  md:space-x-1 space-y-2 text-right no-underline ">
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
	updatingTodo()
}

submitBtn.addEventListener('click', (e) => {
	e.preventDefault()
	tasks.unshift(new Task(inputValue.value))
	if (inputValue.value === '') {
		inputValue.classList.add('required')
		placeholderInput.placeholder = 'Required title'
		return
	}
	if (inputValue.value !== '') {
		inputValue.classList.remove('required')
		placeholderInput.placeholder = 'Todo'
	}
	inputValue.value = ''
	updatingTodo()
})

function deleteTask(index) {
	tasks.splice(index, 1)
	updatingTodo()
}
function updatingTodo() {
	updateLocal()
	fillList()
}
