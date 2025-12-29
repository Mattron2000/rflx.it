/* global document bootstrap IntersectionObserver */
'use strict';

import { getSession } from './session.js';
import setupNavbar from './navbar.js';

export default async function () {
	await setupNavbar();

	setupSessionData();

	setupUploader();

	const feed = document.getElementById('photo-feed');
	const sentinel = document.getElementById('scroll-sentinel');

	new InfiniteScroll(feed, sentinel, fetchPosts);
}

function handleModal(res) {
	if (res.message)
		document.getElementById('uploadFeedbackLabel').innerHTML = res.message;

	if (res.photo_name)
		document.getElementById('uploadFeedbackLabel').innerHTML =
			`<p>Immagine caricata con successo</p>
			<p>Nome immagine: ${res.photo_name}</p>
			`;

	const modalEl = document.getElementById('uploadFeedback');
	const modal = new bootstrap.Modal(modalEl);

	modal.show();
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

class InfiniteScroll {
	constructor(feedEl, sentinelEl, loadFn) {
		this.feedEl = feedEl;
		this.loadFn = loadFn;
		this.page = 1;

		this.observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) this.loadMore();
			},
			{ rootMargin: '200px' }
		);

		this.observer.observe(sentinelEl);
	}

	async loadMore() {
		const posts = await this.loadFn(this.page++);

		posts.forEach((post) => this.feedEl.appendChild(post));
	}
}

async function fetchPosts(page) {
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
		<img
			src="/images/posts/${photo_name}"
			alt="${photo_name}"
			class="card-img-top" />
		`;

	card.addEventListener('click', () => {
		console.log(`Link dell'immagine: /api/v1/photos/${photo_name}`);
	});

	return card;
}
