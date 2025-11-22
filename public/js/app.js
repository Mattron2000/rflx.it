/* global document ejs page */
'use strict';

const main = document.getElementsByTagName('main')[0];

const fetchTemplate = (name) => fetch(name).then((res) => res.text());

const renderTemplate = (target, name, data = {}) =>
	fetchTemplate(`ejs/${name}.ejs`, data).then(
		(template) => (target.innerHTML = ejs.render(template, data))
	);

page('/', () => renderTemplate(main, 'home'));
page('/login', () => renderTemplate(main, 'login'));
page('*', () => renderTemplate(main, 'notfound'));

page();
