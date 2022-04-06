const inputValue = document.getElementById('todoInput')
const submitBtn = document.getElementById('submitBtn')
const listWrapper = document.getElementById('ulList')
const placeholderInput = document.getElementsByName('todo')[0]
const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
let dateTime
function updateTime() {
	let today = new Date()
	let currentYear = today.getFullYear()
	let date = `${monthNames[today.getMonth()]} ${today.getDate()}`
	let time = `${today.getHours()}:${
		today.getMinutes() < 10 ? '0' : ''
	}${today.getMinutes()}`
	dateTime = `${date}, ${currentYear}, ${time}`
	setTimeout(updateTime, 1000)
}
updateTime()

let tasks = []
!localStorage.tasks
	? (tasks = [])
	: (tasks = JSON.parse(localStorage.getItem('tasks')))

function Task(taskName, time) {
	this.taskName = taskName
	this.completed = false
	this.createdTime = time
}
function updateLocal() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createTemplate(task, index) {
	if (task.taskName === '') return ''
	return `
		<li class="list-style">
    	<div class="flex flex-col">
        <p class="text-black ${
					!task.completed ? '' : 'line-through text-gray-600 italic'
				}">
            ${task.taskName}
        </p>
	      <p class="text-gray-500 italic">${task.createdTime}</p>
      </div>
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
	tasks.unshift(new Task(inputValue.value, dateTime))
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
