/* global document */

'use strict';

import ModalHandler from './modal.js';

export async function fetchPosts(page) {
	const res = await fetch(`/api/v1/posts?page=${page}`);
	if (!res.ok) return [];

	const data = await res.json();
	return data.map(createPhotoCard);
}

export function createPhotoCard(post) {
	const { photo_name, user_nickname } = post;

	const card = document.createElement('article');
	card.classList.add('photo-card', 'card');

	card.innerHTML = `
		<img
			src="/images/posts/${photo_name}"
			alt="${photo_name}"
			class="card-img-top" />
	`;

	card.addEventListener('click', () => {
		const modal_name = 'ViewPostModal';
		const modal = new ModalHandler(modal_name);

		modal.setTitle(user_nickname);

		const image = document.getElementById(modal_name + 'Image');

		image.innerHTML = `
			<img
			src="/images/posts/${photo_name}"
			alt="${photo_name}"
			class="img-fluid" />
		`;

		setPostDescription(photo_name);
		setPostComments(photo_name);
		setUploadComment();

		modal.launch();
	});

	return card;
}

async function setPostDescription(photo_name) {
	return fetch(`/api/v1/posts/${photo_name}`)
		.then((res) => (!res.ok ? 'No description here' : res.json()))
		.then((res) => res.description)
		.then((description) => (description = description || 'No description here'))
		.then((description) =>
			description.replace(
				/(#[a-zA-Z0-9_]+)/g,
				'<span class="hashtag">$1</span>'
			)
		)
		.then(
			(description) =>
				(document.getElementById('ViewPostModalDescription').innerHTML =
					description)
		);
}

async function setPostComments(photo_name) {
	const comments = document.getElementById('ViewPostModalComments');
	comments.innerHTML = '';

	return fetch(`/api/v1/posts/${photo_name}/comments`)
		.then((res) => res.json())
		.then((res) => {
			if (!res.comments || res.comments.length === 0) {
				comments.innerHTML = `<p>No comments here</p>`;
				return;
			}

			let template = '';
			for (const comment of res.comments)
				template += createCommentCard(comment);

			comments.innerHTML = template;
		});
}

function createCommentCard(comment) {
	return `
		<div class="comment-box">
			<span class="comment">
				<b class="px-2">${comment.user_nickname}</b>
				<p>${comment.comment}</p>
			</span>
			<p class = "comment-datetime">${comment.created_at}</p>
		</div>
		`;
}

function setUploadComment() {
	const form = document.getElementById('ViewPostModalCommentForm');

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(form);

		const body = { comment: formData.get('comment') };

		if (body.comment.length === 0) return;

		document.getElementById('ViewPostModalComment').value = '';

		const imageDiv = document.getElementById('ViewPostModalImage');
		const imageNode = imageDiv.querySelector('img');
		const photo_name = imageNode.getAttribute('alt');

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
			.catch(() => {
				const modal = new ModalHandler();

				modal.setTitle('Errore');
				modal.setBody('Ti devi autenticare per sfruttare questa funzione');

				modal.launch();
			});
	});
}
