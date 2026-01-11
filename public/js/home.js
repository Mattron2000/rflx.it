/* global document */
'use strict';

import { loadSession, getSession } from './session.js';
import InfiniteScroll from "./infinite-scroll.js";
import { fetchPosts } from "./fetch-posts.js";
import setupNavbar from './navbar.js';
import setupUploadForm from './upload-form-setup.js';

export default function () {
	setupNavbar();

	setupUploadBtn();

	setupUploadForm();

	setupScrollSentinel();
}

async function setupUploadBtn() {
	await loadSession();

	const uploadBtnStart = document.getElementById('upload-post-btn-start');

	const { authenticated, user } = getSession();
	if (!authenticated || user.role !== 'photographer') {
		uploadBtnStart.classList.add('d-none');
		return;
	}

	uploadBtnStart.classList.remove('d-none');
}


function setupScrollSentinel() {
	const feed = document.getElementById('photo-feed');
	const sentinel = document.getElementById('scroll-sentinel');

	new InfiniteScroll(feed, sentinel, fetchPosts);
}
