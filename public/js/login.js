/* global document bootstrap page */
'use strict';

function hideSubmitButton() {
	document.getElementById('loginFeedbackSubmit').classList.add('d-none');
}

function showSubmitButton() {
	document.getElementById('loginFeedbackSubmit').classList.remove('d-none');
}

function resetModal() {
	document.getElementById('loginFeedbackTitle').innerHTML = '';
	document.getElementById('loginFeedbackLabel').innerHTML = '';

	hideSubmitButton();
}

function showModal() {
	const modalEl = document.getElementById('loginFeedback');
	const modal = new bootstrap.Modal(modalEl);

	modal.show();
}

function hideModal() {
	bootstrap.Modal.getInstance(document.getElementById('loginFeedback')).hide();
}

function setupModal(response) {
	resetModal();

	// it's all ok (login success) make submit button visible
	if (response.ok) showSubmitButton();

	// standard passport missing credentials
	if (!response.title) {
		document.getElementById('loginFeedbackTitle').innerHTML = response.messages;
		showModal();
		return;
	} else
		document.getElementById('loginFeedbackTitle').innerHTML = response.title;

	let output;

	// array of error causes
	try {
		const feedbacks = response.messages;
		output = '<ul>';
		feedbacks.forEach((message) => (output += '<li>' + message + '</li>'));
		output += '</ul>';
		// eslint-disable-next-line no-unused-vars
	} catch (e) {
		// single cause string
		output = '<ul><li>' + response.messages + '</li></ul>';
	}

	document.getElementById('loginFeedbackLabel').innerHTML = output;

	showModal();
}

export function init() {
	const loginEmail = document.getElementById('loginEmail');
	const loginPassword = document.getElementById('loginPassword');

	const loginButton = document.getElementById('loginSubmit');

	loginButton.addEventListener('click', () => {
		const email = loginEmail.value;
		const password = loginPassword.value;

		fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ email: email, password: password })
		})
			.then((response) => response.json())
			.then((res) => setupModal(res));
	});

	const loginFeedbackSubmit = document.getElementById('loginFeedbackSubmit');

	loginFeedbackSubmit.addEventListener('click', () => {
		page('/home');
		hideModal();
	});
}
