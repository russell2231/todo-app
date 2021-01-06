const input = document.querySelector('.new-todo');
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('form');
const filter = document.querySelector('.filter');
const clearCompleted = document.querySelector('.clear p');
const themeSwitch = document.querySelector('.theme-toggle');

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

// Filter List

function filterList() {
	const items = document.querySelectorAll('.item');
	const filterEvent = document.querySelector('.filter .selected');

	if (filterEvent.innerText.includes('Active')) {
		for (const item of items) {
			item.style.display = 'flex';
			if (item.classList.contains('complete')) {
				item.style.display = 'none';
			}
		}
	} else if (filterEvent.innerText.includes('Completed')) {
		for (const item of items) {
			item.style.display = 'flex';
			if (!item.classList.contains('complete')) {
				item.style.display = 'none';
			}
		}
	} else {
		for (const item of items) {
			item.style.display = 'flex';
		}
	}
}

// Event Listeners

themeSwitch.addEventListener('click', () => {
	document.querySelector('body').classList.toggle('light');
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	createTodo();
	input.value = '';
	itemsLeft();
	filterList();
});

todoList.addEventListener('click', (e) => {
	// Mark Complete
	if (e.target.classList.contains('checkbox')) {
		e.target.parentElement.parentElement.classList.toggle('complete');
	}

	// Remove Todo
	if (e.target.classList.contains('close')) {
		e.target.parentElement.parentElement.remove();
	}
	itemsLeft();
	filterList();
});

filter.addEventListener('click', (e) => {
	const filterEvents = document.querySelectorAll('.filter p');
	for (const filterEvent of filterEvents) {
		filterEvent.classList.remove('selected');
	}

	if (e.target.innerText.includes('Active')) {
		e.target.classList.add('selected');
	} else if (e.target.innerText.includes('Completed')) {
		e.target.classList.add('selected');
	} else if (e.target.innerText.includes('All')) {
		e.target.classList.add('selected');
	}

	filterList();
});

clearCompleted.addEventListener('click', () => {
	const items = document.querySelectorAll('.item');

	for (const item of items) {
		item.classList.remove('complete');
	}
	itemsLeft();
	filterList();
});
