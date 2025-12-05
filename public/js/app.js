/* global document page */
'use strict';

const main = document.getElementsByTagName('main')[0];

const fetchTemplate = (name) =>
	fetch('/pages/' + name).then((res) => res.text());

const renderTemplate = (target, name, data = {}) =>
	fetchTemplate(name, data).then((template) => (target.innerHTML = template));

const checkAuth = () => fetch('/api/v1/auth/me').then((res) => res.json());

page('/', () =>
	checkAuth().then((res) =>
		res.authenticated ? page.redirect('/home') : page.redirect('/welcome')
	)
);
page('/login', () =>
	renderTemplate(main, 'login')
		.then(() => import('/js/login.js'))
		.then((module) => module.init())
);
page('/:page_name', (ctx) => renderTemplate(main, ctx.params.page_name));
page('/scripts/logout', () =>
	fetch('/api/v1/auth/logout', { method: 'DELETE' }).then(() =>
		page.redirect('/')
	)
);
page('*', () => renderTemplate(main, 'notfound'));

page();
