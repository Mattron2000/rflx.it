/* global document page */
'use strict';

import ModalHandler from './modal.js';

export default function () {
	const registerButton = document.getElementById('registerSubmit');

	registerButton.addEventListener('click', () => {
		const form = document.getElementById('registerForm');
		const formData = new FormData(form);

		const nickname = formData.get('nickname');
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');
		const role = formData.get('role');

		if (!(role === 'base' || role === 'photographer')) {
			setupModal({ ok: false, message: 'Please select a role' });
			return;
		}

		if (password !== confirmPassword) {
			setupModal({ ok: false, message: 'Passwords do not match' });
			return;
		}

		fetch('/api/v1/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nickname, email, password, role })
		})
			.then((res) => res.json())
			.then((res) => setupModal(res));
	});
}

function setupModal(res) {
	const modal = new ModalHandler();

	modal.reset();

	if (res.ok) {
		const submitHandler = () => {
			modal.hide();
			page('/login');
		};

		modal.setSubmitButton('Login', submitHandler, true);
	}

	modal.setTitle(res.message);
	modal.launch();
}
