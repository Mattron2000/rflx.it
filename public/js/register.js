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
	const registerName = document.getElementById('registerName');
	const registerSurname = document.getElementById('registerSurname');
	const registerEmail = document.getElementById('registerEmail');
	const registerPassword = document.getElementById('registerPassword');
	const registerFeedback = document.getElementById('registerFeedback');

	const registerButton = document.getElementById('registerSubmit');

	registerButton.addEventListener('click', () => {
		const name = registerName.value;
		const surname = registerSurname.value;
		const email = registerEmail.value;
		const password = registerPassword.value;

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
			.then(async (response) => await streamToText(response.body))
			.then((text) => (registerFeedback.innerHTML = text));
	});
}
