/* global document */
'use strict';

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

	return card;
}
