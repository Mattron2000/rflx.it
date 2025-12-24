/* global document */
'use strict';

import { loadSession, getSession } from './session.js';
import { setupNavbar } from './navbar.js';

export default function () {
	loadSession()
		.then(setupNavbar)
		.then(() => {
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
		});
}
