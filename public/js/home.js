'use strict';

import setupScrollSentinel from './infinite-scroll.js';
import setupNavbar from './navbar.js';
import { setupUploadBtn, setupUploadForm } from './upload-post-setup.js';

export default function () {
	// navbar
	setupNavbar();

	// setup upload post
	setupUploadBtn();
	setupUploadForm();

	// infinite scroll photo feed
	setupScrollSentinel('photo-feed', 'scroll-sentinel');
}
