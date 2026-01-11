/* global document */
'use strict';

import { loadSession, getSession } from './session.js';

const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');

const setupNavbar = async () => {
	await loadSession();

	const session = getSession();

	if (session.authenticated) {
		loginButton.classList.add('d-none');
		logoutButton.classList.remove('d-none');
	} else {
		loginButton.classList.remove('d-none');
		logoutButton.classList.add('d-none');
	}
};

export default setupNavbar;
