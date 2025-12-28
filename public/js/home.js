/* global document */
'use strict';

import { getSession } from './session.js';
import setupNavbar from './navbar.js';

export default async function () {
	await setupNavbar();

	setupSessionData();

	setupUploader();

	setupPhotoCards();
}

function handleModal(res) {
	console.log(res);
}

function setupUploader() {
	const uploadForm = document.getElementById('photo-uploader');

	uploadForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(uploadForm);

		fetch('/api/v1/photos', { method: 'POST', body: formData })
			.then((res) => res.json())
			.then((res) => handleModal(res));
	});
}

function setupPhotoCards() {
	const buttons = document.querySelectorAll('.photo-card-btn');

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const img = button.querySelector('img');
			const imageSrc = img.getAttribute('src');
			console.log(`Link dell'immagine: ${imageSrc}`);
		});
	});
}

function setupSessionData() {
			const session = getSession();
			if (!session.authenticated) {
				document.getElementById('dati-utente').innerHTML =
					'Dati utente non disponibili';
				return;
			}

			const { nickname, email, role } = session.user;
			document.getElementById('dati-utente').innerHTML = `
			<p>Nickname: ${nickname}</p>
			<p>Email: ${email}</p>
			<p>Role: ${role}</p>
			`;
		}
