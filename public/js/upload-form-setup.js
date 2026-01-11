/* global document alert page */
'use strict';

import ModalHandler from './modal.js';

export default function setupUploadForm() {
	const modal = new ModalHandler('uploadPostModal');
	const form = document.getElementById('uploadPostForm');

	const submitHandler = () => {
		const formData = new FormData(form);

		if (formData.get('photo').size === 0) {
			alert('To Upload a post, the image is required');
			return;
		}

		fetch('/api/v1/posts', { method: 'POST', body: formData })
			.then((res) => res.json())
			.then((res) => {
				modal.hide();
				handleModal(res);
			});
	};

	modal.setSubmitButton('Publish', submitHandler);

	// Image preview of the uploaded image
	const input = form.querySelector('.upload-post_input');
	const preview = form.querySelector('.upload-post_img');
	const placeholder = form.querySelector('.upload-post_placeholder');

	input.addEventListener('change', () => {
		const file = input.files[0];
		if (!file) return;

		preview.src = URL.createObjectURL(file);
		preview.classList.remove('d-none');
		placeholder.classList.add('d-none');
	});

	const description = form.querySelector('.upload-post_description');
	const resetBtn = modal.modal.querySelector('#uploadPostModalReset');
	resetBtn.addEventListener('click', () => {
		input.value = '';
		preview.classList.add('d-none');
		preview.src = '';
		placeholder.classList.remove('d-none');
		description.value = '';
	});
}

function handleModal(res) {
	const modal = new ModalHandler();

	if (res.message) modal.setBody(res.message);

	if (res.photo_name)
		modal.setBody(`<p>Immagine caricata con successo</p>
			<p>Nome immagine: ${res.photo_name}</p>`);

	modal.setSubmitButton('Close', () => {
		modal.hide();
		page('/home');
	});

	modal.launch();
}
