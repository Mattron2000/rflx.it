/* global document */
'use strict';

async function streamToText(stream) {
	const chunks = [];
	const reader = stream.getReader();

	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
	}

	const decoder = new TextDecoder();
	return chunks
		.map((chunk) => decoder.decode(chunk, { stream: true }))
		.join('');
}

export function init() {
	const loginEmail = document.getElementById('loginEmail');
	const loginPassword = document.getElementById('loginPassword');
	const loginFeedback = document.getElementById('loginFeedback');

	const loginButton = document.getElementById('loginSubmit');

	loginButton.addEventListener('click', () => {
		const email = loginEmail.value;
		const password = loginPassword.value;

		fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ email: email, password: password })
		})
			.then(async (response) => {
				const text = streamToText(response.body);

				const alert = document.querySelector('.alert');
				alert.classList.toggle('alert-success', response.ok);
				alert.classList.toggle('alert-warning', !response.ok);

				return text;
			})
			.then((text) => {
				loginFeedback.innerHTML = text;
				document.querySelector('.alert').classList.remove('d-none');

			});
	});
}
