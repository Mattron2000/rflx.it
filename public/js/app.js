/* global document ejs */
'use strict';

const app = document.getElementById('app');

const fetchTemplate = (name) => fetch(name).then((res) => res.text());

const renderTemplate = (target, name, data = {}) =>
	fetchTemplate(`ejs/${name}.ejs`, data).then(
		(template) => (target.innerHTML = ejs.render(template, data))
	);

renderTemplate(app, 'body');
