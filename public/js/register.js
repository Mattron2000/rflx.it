/* global document bootstrap page */
'use strict';

export default function () {
	const registerNickname = document.getElementById('registerNickname');
	const registerEmail = document.getElementById('registerEmail');
	const registerPassword = document.getElementById('registerPassword');
	const confirmPassword = document.getElementById('confirmPassword');

	const registerRole = document.getElementById('registerRole');

	const registerButton = document.getElementById('registerSubmit');
	const registerFeedbackSubmit = document.getElementById(
		'registerFeedbackSubmit'
	);

	registerButton.addEventListener('click', () => {
		const nickname = registerNickname.value;
		const email = registerEmail.value;
		const password = registerPassword.value;

		if (registerRole.selectedIndex === 0) {
			setupModal({ ok: false, message: 'Please select a role' });
			return;
		}

		const role = registerRole.value;

		if (password !== confirmPassword.value) {
			setupModal({ ok: false, message: 'Passwords do not match' });
			return;
		}

		fetch('/api/v1/auth/register', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({
				nickname: nickname,
				email: email,
				password: password,
				role: role
			})
		})
			.then((response) => response.json())
			.then((res) => setupModal(res));
	});

	registerFeedbackSubmit.addEventListener('click', () => {
		hideModal();
		page('/login');
	});
}

function setupModal(response) {
	resetModal();

	// it's all ok (register success) make submit button visible
	if (response.ok) showSubmitButton();

	document.getElementById('registerFeedbackTitle').innerHTML = response.message;

	showModal();
}

function resetModal() {
	document.getElementById('registerFeedbackTitle').innerHTML = '';

	hideSubmitButton();
}

function hideSubmitButton() {
	document.getElementById('registerFeedbackSubmit').classList.add('d-none');
}

function showSubmitButton() {
	document.getElementById('registerFeedbackSubmit').classList.remove('d-none');
}

function showModal() {
	const modalEl = document.getElementById('registerFeedback');
	const modal = new bootstrap.Modal(modalEl);

	modal.show();
}

function hideModal() {
	bootstrap.Modal.getInstance(
		document.getElementById('registerFeedback')
	).hide();
}
