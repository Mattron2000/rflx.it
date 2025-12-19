/* global document page */
'use strict';

const app = document.getElementById('app');

const loadPage = (name) =>
	fetch(`/pages/${name}`)
		.then((res) => res.text())
		.then((template) => (app.innerHTML = template))
		.then(() => import(`/js/${name}.js`))
		.then((module) => module.default?.());

page('/', () => page.redirect('/home'));
page('/:page_name', (ctx) => loadPage(ctx.params.page_name));

page('/scripts/logout', () =>
	fetch('/api/v1/auth/logout', { method: 'DELETE' })
		.then((res) => {
			if (res.ok) page.redirect('/home');
		})
);
page('*', () => loadPage('notfound'));

page();
