/* global document page */

'use strict';

import { loadSession, getSession } from './session.js';
import { createPhotoCard } from './fetch-posts.js';

const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');

const setupNavbar = () => {
	setupLoginLogoutButtons();

	setupSearchBar();
};

async function setupLoginLogoutButtons() {
	await loadSession();

	const session = getSession();

	if (session.authenticated) {
		loginButton.classList.add('d-none');
		logoutButton.classList.remove('d-none');
	} else {
		loginButton.classList.remove('d-none');
		logoutButton.classList.add('d-none');
	}
}

function setupSearchBar() {
	const input = document.getElementById('navbar-search');

	input.addEventListener(
		'keydown',
		(e) => e.key === 'Enter' && handleSearch(e)
	);
}

function handleSearch(e) {
	e.preventDefault();

	const query = e.target.value.trim();

	if (query === '') {
		page('/home');
		return;
	}

	searchPosts(query);
}

async function searchPosts(query) {
	const res = await fetch(`/api/v1/posts?search=${encodeURIComponent(query)}`);

	const data = await res.json();

	const feed = document.getElementById('photo-feed');

	feed.innerHTML = '';

	if (res.ok) {
		const posts = data.posts.map(createPhotoCard);

		posts.forEach((post) => feed.appendChild(post));
	} else feed.innerHTML = `<p>${data.message}</p>`;
}

export default setupNavbar;
