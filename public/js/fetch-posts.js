/* global document */
'use strict';

import ModalHandler from './modal.js';

export async function fetchPosts(page) {
	const res = await fetch(`/api/v1/photos?page=${page}`);
	if (!res.ok) return [];

	const data = await res.json();
	return data.map(createPhotoCard);
}

function createPhotoCard(post) {
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
			setPostComments(photo_name)
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
			if (res.message) throw new Error(res.message);
			if (!res.comments || res.comments.length === 0)
				throw new Error('No comments here');

			res.comments
				.forEach((comment) => createCommentCard(comment))
				.forEach((comment) => {
					document.getElementById('ViewPostModalComments').appendChild(comment);
				});
		})
		.catch(
			(err) =>
				(document.getElementById('ViewPostModalComments').innerHTML =
					err.message)
		);
}

function createCommentCard(comment) {
	return `
		<div class="comment">
			<p>${comment.comment}</p>
		</div>
		`;
}
