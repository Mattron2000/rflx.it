/*global page document ejs*/
'use strict';

const h1 = document.getElementsByTagName('h1')[0];

const fetchTemplate = (name) =>
	fetch(`views/${name}.ejs`).then((res) => res.text());

const renderTemplate = async (target, name, data = {}) =>
	target.innerHTML = await fetchTemplate(name).then((template) =>
		ejs.render(template, data)
	);

page('/', () => renderTemplate(h1, 'home'));

page();
