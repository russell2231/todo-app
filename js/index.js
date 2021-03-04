const body = document.querySelector('body');
const themeToggleBtn = document.querySelector('.theme-toggle');
const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('.todos');
const filterList = document.querySelector('.list-filter .list');
const clearCompletedBtn = document.querySelector('.clear');
const todoListItems = localStorage.getItem('todoList')
	? JSON.parse(localStorage.getItem('todoList'))
	: [];

// Add Todo

function addTodo(text) {
	const todo = {
		text: text,
		isCompleted: false,
		id: Date.now(),
	};

	todoListItems.push(todo);
	showTodo(todo);
}

// Remove Todo

function deleteTodo(key) {
	const index = todoListItems.findIndex((todo) => todo.id === Number(key));
	const todo = {
		deleted: true,
		...todoListItems[index],
	};

	todoListItems.splice(index, 1);
	showTodo(todo);
}

// Render Todo

function showTodo(todo) {
	localStorage.setItem('todoList', JSON.stringify(todoListItems));

	const item = document.querySelector(`[data-key='${todo.id}']`);
	const itemsLeft = document.querySelector('.items-left');
	const isCompleted = todo.isCompleted ? 'done' : '';
	const li = document.createElement('li');

	li.setAttribute('class', `list-item ${isCompleted}`);
	li.setAttribute('data-key', todo.id);
	li.innerHTML = `
    <div class="item">
      <div class="checkbox">
        <div class="check"></div>
      </div>
      <span class="text">${todo.text}</span>
    </div>

    <img class="close" src="images/icon-cross.svg" alt="" />
  `;

	itemsLeft.textContent = `${isLeft(todoListItems)} items left`;

	if (todo.deleted) {
		item.remove();
		itemsLeft.textContent = `${isLeft(todoListItems)} items left`;
		return;
	}

	if (item) {
		item.replaceWith(li);
		filterTodo();
	} else {
		todoList.append(li);
		filterTodo();
	}
}

// Mark Todo Complete

function toggleComplete(key) {
	const index = todoListItems.findIndex((todo) => todo.id === Number(key));

	todoListItems[index].isCompleted = !todoListItems[index].isCompleted;
	showTodo(todoListItems[index]);
}

// Items Left

function isLeft(list) {
	let todoLeft = 0;
	list.forEach((todo) => {
		if (!todo.isCompleted) {
			todoLeft++;
		}
	});
	return todoLeft;
}

// Filter List

function filterTodo() {
	const todoList = document.querySelectorAll('.todos .list-item');
	const filterOption = document.querySelector('.list-filter .selected');

	if (filterOption.textContent === 'Active') {
		todoList.forEach((todo) => {
			if (todo.classList.contains('done')) {
				todo.style.display = 'none';
			} else {
				todo.style.display = 'flex';
			}
		});
	} else if (filterOption.textContent === 'Completed') {
		todoList.forEach((todo) => {
			if (todo.classList.contains('done')) {
				todo.style.display = 'flex';
			} else {
				todo.style.display = 'none';
			}
		});
	} else {
		todoList.forEach((todo) => {
			todo.style.display = 'flex';
		});
	}
}

// Switch between light and dark theme
function switchTheme() {
	if (body.classList.contains('light')) {
		body.classList.remove('light');
		body.classList.add('dark');
	} else {
		body.classList.remove('dark');
		body.classList.add('light');
	}
}

// Event Listeners

// Render stored todo list
document.addEventListener('DOMContentLoaded', () => {
	const storage = localStorage.getItem('todoList');

	if (storage) {
		todoListItems.forEach((todo) => {
			showTodo(todo);
		});
	}
});

// Switch between themes
themeToggleBtn.addEventListener('click', switchTheme);

// Create todo text
todoForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const input = document.querySelector('.new-todo');
	const text = input.value.trim();
	if (text !== '') {
		addTodo(text);
		input.value = '';
		input.focus();
		console.log(todoListItems);
	}
});

todoList.addEventListener('click', (e) => {
	// Mark Complete
	if (e.target.classList.contains('check')) {
		const itemKey =
			e.target.parentElement.parentElement.parentElement.dataset.key;
		toggleComplete(itemKey);
	}

	// Delete Todo
	if (e.target.classList.contains('close')) {
		const itemKey = e.target.parentElement.dataset.key;
		deleteTodo(itemKey);
	}
});

// Clear All Completed Tasks
clearCompletedBtn.addEventListener('click', () => {
	todoListItems.forEach((todo) => {
		todo.isCompleted = false;
		showTodo(todo);
	});
});

// Filter Todo List
filterList.addEventListener('click', (e) => {
	const filterOptions = document.querySelectorAll('.list-filter li');

	filterOptions.forEach((option) => option.classList.remove('selected'));

	e.target.classList.add('selected');

	filterTodo();
});
