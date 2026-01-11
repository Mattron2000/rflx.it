/* global document page */
'use strict';

import ModalHandler from './modal.js';

export default function () {
	const loginButton = document.getElementById('loginSubmit');

	loginButton.addEventListener('click', () => {
		const form = document.getElementById('loginForm');
		const formData = new FormData(form);

		const email = formData.get('email');
		const password = formData.get('password');

		fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
			.then((res) => res.json())
			.then((res) => setupModal(res));
	});
}

function setupModal(res) {
	const modal = new ModalHandler();

	modal.reset();

	// it's all ok (login success) make submit button visible
	if (res.ok) {
		const submitHandler = () => {
			modal.hide();
			page('/home');
		};

		modal.setSubmitButton('Enter', submitHandler, true);
	}

	modal.showTitle();
	if (!res.title) {
		modal.setTitle(res.messages);
		modal.launch();
		return;
	}
	modal.setTitle(res.title);

	let output = '<ul>';

	// array of error causes
	try {
		const feedbacks = res.messages;
		feedbacks.forEach((message) => (output += '<li>' + message + '</li>'));
		// eslint-disable-next-line no-unused-vars
	} catch (e) {
		output = '<li>' + res.messages + '</li>';
	} finally {
		output += '</ul>';
	}

	modal.setBody(output);

	modal.launch();
}
