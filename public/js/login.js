/* global document */
'use strict';

export function init() {
	const loginForm = document.forms['loginForm'];
	const loginButton = loginForm.elements['loginSubmit'];

	loginButton.addEventListener('click', (event) => {
		event.preventDefault();
		console.log('submit');
	});
}
