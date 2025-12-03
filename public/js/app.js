/* global document page */
'use strict';

const main = document.getElementsByTagName('main')[0];

const fetchTemplate = (name) =>
	fetch('/pages/' + name).then((res) => res.text());

const renderTemplate = (target, name, data = {}) =>
	fetchTemplate(name, data).then((template) => (target.innerHTML = template));

page('/', () => renderTemplate(main, 'home'));
page('/login', () => renderTemplate(main, 'login'));
page('*', () => renderTemplate(main, 'notfound'));

page();
