const body = document.querySelector('body');
const themeToggleBtn = document.querySelector('.theme-toggle');
const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('.todos');
const todoListItems = [];

function addTodo(text) {
	const todo = {
		text: text,
		isCompleted: false,
		id: Date.now(),
	};

	todoListItems.push(todo);
	showTodo(todo);
}

function deleteTodo(key) {
	const index = todoListItems.findIndex((todo) => todo.id === Number(key));
	const todo = {
		deleted: true,
		...todoListItems[index],
	};

	todoListItems.splice(index, 1);
	showTodo(todo);
	console.log(todoListItems);
}

function showTodo(todo) {
	const item = document.querySelector(`[data-key='${todo.id}']`);

	const isCompleted = todo.isCompleted ? 'done' : '';
	const li = document.createElement('li');

	if (todo.deleted) {
		item.remove();
		return;
	}

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

	if (item) {
		item.replaceWith(li);
	} else {
		todoList.append(li);
	}
}

function toggleComplete(key) {
	const index = todoListItems.findIndex((todo) => todo.id === Number(key));

	todoListItems[index].isCompleted = !todoListItems[index].isCompleted;
	showTodo(todoListItems[index]);
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

themeToggleBtn.addEventListener('click', switchTheme);

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
	if (e.target.classList.contains('check')) {
		const itemKey =
			e.target.parentElement.parentElement.parentElement.dataset.key;
		toggleComplete(itemKey);
	}

	if (e.target.classList.contains('close')) {
		const itemKey = e.target.parentElement.dataset.key;
		deleteTodo(itemKey);
	}
});
