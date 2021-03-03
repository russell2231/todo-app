const body = document.querySelector('body');
const themeToggleBtn = document.querySelector('.theme-toggle');

function switchTheme() {
	if (body.classList.contains('light')) {
		body.classList.remove('light');
		body.classList.add('dark');
	} else {
		body.classList.remove('dark');
		body.classList.add('light');
	}
}

themeToggleBtn.addEventListener('click', switchTheme);
