const input = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('form');
const filter = document.querySelector('.filter');

// Create New Todo

function createTodo() {
	const item = document.createElement('div');
	const checkboxContainer = document.createElement('div');
	const checkbox = document.createElement('div');
	const task = document.createElement('p');
	const closeBtn = document.createElement('button');

	item.classList.add('item');
	checkboxContainer.classList.add('checkbox-container');
	checkbox.classList.add('checkbox');
	task.innerText = input.value;
	closeBtn.classList.add('close');

	item.appendChild(checkboxContainer);
	checkboxContainer.appendChild(checkbox);
	item.appendChild(task);
	task.appendChild(closeBtn);

	todoList.appendChild(item);
}

// Items Left Counter
function itemsLeft() {
	const item = document.querySelectorAll('.item');
	const countEl = document.querySelector('.number');
	let count = 0;

	for (let todo of item) {
		if (!todo.classList.contains('complete')) {
			count++;
		}
	}

	countEl.innerText = count;
}

// New Todo Listener

form.addEventListener('submit', (e) => {
	e.preventDefault();

	createTodo();
	input.value = '';
	itemsLeft();
});

todoList.addEventListener('click', (e) => {
	// Mark Complete
	if (e.target.classList.contains('checkbox')) {
		e.target.parentElement.parentElement.classList.toggle('complete');
	}
	itemsLeft();
});
