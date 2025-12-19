'use strict';

let session = null;

export const loadSession = async () =>
	await fetch('/api/v1/auth/check')
		.then((res) => res.json())
		.then((res) => (session = res));

export const getSession = () => session;
