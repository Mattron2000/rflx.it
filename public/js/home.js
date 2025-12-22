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

			const { name, surname, email } = session.user;
			document.getElementById('dati-utente').innerHTML = `
			<p>Nome: ${name}</p>
			<p>Cognome: ${surname}</p>
			<p>Email: ${email}</p>`;
		});
}
