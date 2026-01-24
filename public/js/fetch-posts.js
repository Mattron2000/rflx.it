/* global document alert */

'use strict';

import ModalHandler from './modal.js';

export async function fetchPosts(page) {
	const res = await fetch(`/api/v1/posts?page=${page}`);
	if (!res.ok) return [];

	const data = await res.json();
	return data.map(createPhotoCard);
}

export function createPhotoCard(post) {
	const { photo_name } = post;

	const card = document.createElement('article');
	card.classList.add('photo-card', 'card');

	card.innerHTML = `
		<img src="/images/posts/${photo_name}"
			alt="${photo_name}"
			class="card-img-top" />
	`;

	card.addEventListener('click', () => {
		const modal_name = 'ViewPostModal';
		const modal = new ModalHandler(modal_name);
		const image = document.getElementById(modal_name + 'Image');

		image.innerHTML = `
			<img
			src="/images/posts/${photo_name}"
			alt="${photo_name}"
			class="img-fluid" />
		`;

		let promises = [
			setPostDescription(photo_name),
			setPostComments(photo_name),
			setUploadComment(photo_name)
		];

		Promise.all(promises);

		modal.launch();
	});

	return card;
}

async function setPostDescription(photo_name) {
	return fetch(`/api/v1/posts/${photo_name}`)
		.then((res) => (!res.ok ? 'No description here' : res.json()))
		.then((res) => res.description)
		.then(
			(description) =>
				(document.getElementById('ViewPostModalDescription').innerHTML =
					description)
		);
}

async function setPostComments(photo_name) {
	return fetch(`/api/v1/posts/${photo_name}/comments`)
		.then((res) => res.json())
		.then((res) => {
			if (!res.comments || res.comments.length === 0)
				throw new Error('No comments here');

			let template = '';
			for (const comment of res.comments)
				template += createCommentCard(comment);

			document.getElementById('ViewPostModalComments').innerHTML = template;
		});
}

function createCommentCard(comment) {
	return `
		<div class="comment-box">
			<span class="comment">
				<b class="px-2">${comment.user_nickname}</b>
				<p>${comment.comment}</p>
			</span>
			<p class = "coment-datetime">${comment.created_at}</p>
		</div>
		`;
}

function setUploadComment(photo_name) {
	const form = document.getElementById('ViewPostModalCommentForm');
	return new Promise(() => {
		document
			.getElementById('ViewPostModalCommentForm')
			.addEventListener('submit', (e) => {
				e.preventDefault();
				const formData = new FormData(form);

				const body = { comment: formData.get('comment') };

				if (body.comment.length === 0) return;

				document.getElementById('ViewPostModalComment').value = '';

				fetch(`/api/v1/posts/${photo_name}/comments`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				})
					.then((res) => res.json())
					.then((res) => {
						const template = createCommentCard(res.comment);

						document
							.getElementById('ViewPostModalComments')
							.insertAdjacentHTML('afterbegin', template);
					})
					.catch(() =>
						alert('Ti devi autenticare per sfruttare questa funzione')
					);
			});
	});
}
