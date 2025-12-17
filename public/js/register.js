/* global document bootstrap */
'use strict';

function hideSubmitButton() {
	document.getElementById('registerFeedbackSubmit').classList.add('d-none');
}

function showSubmitButton() {
	document.getElementById('registerFeedbackSubmit').classList.remove('d-none');
}

function resetModal() {
	document.getElementById('registerFeedbackTitle').innerHTML = '';

	hideSubmitButton();
}

function showModal() {
	const modalEl = document.getElementById('registerFeedback');
	const modal = new bootstrap.Modal(modalEl);
	modal.show();
}

function setupModal(response) {
	resetModal();

	if (response.ok) showSubmitButton();

	document.getElementById('registerFeedbackTitle').innerHTML = response.message;

	showModal();
}

export function init() {
	const registerName = document.getElementById('registerName');
	const registerSurname = document.getElementById('registerSurname');
	const registerEmail = document.getElementById('registerEmail');
	const registerPassword = document.getElementById('registerPassword');
	const registerConfirmPassword = document.getElementById('registerConfirmPassword');

	const registerButton = document.getElementById('registerSubmit');

	registerButton.addEventListener('click', () => {
		const name = registerName.value;
		const surname = registerSurname.value;
		const email = registerEmail.value;
		const password = registerPassword.value;
		const confirmPassword = registerConfirmPassword.value;

		if (!name || !surname || !email || !password || !confirmPassword) {
			setupModal({
				ok: false,
				message: 'Name, surname, email and password are required!'
			});
			return;
		}

		if (confirmPassword !== registerPassword) {
			setupModal({ ok: false, message: 'You put two different passwords' });
			return;
		}

		fetch('/api/v1/auth/register', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				name: name,
				surname: surname,
				email: email,
				password: password
			})
		})
			.then((response) => response.json())
			.then((res) => setupModal(res));
	});
}
