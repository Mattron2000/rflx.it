'use strict';

import postRepository from '../repository/post.js';

const addNewPost = (file, userNickname, description = '') => {
	if (!file || !userNickname)
		throw new Error('File and userNickname are required');

	const postData = {
		photo_name: file.filename,
		user_nickname: userNickname,
		description
	};

	return postRepository.insertPost(postData).catch((err) => err);
};

const getPostById = (id) => {
	return postRepository
		.selectPostWhereId(id)
		.catch((err) => err);
};

const getPostsByPageNumber = (page = 1) => {
	if (isNaN(page) || page < 1) throw new Error('Invalid page number');

	return postRepository.selectPostsWherePageNumber(page);
};

const getPostsBySearchQuery = (query = '') => {
	if (query === '') postRepository.selectPostsWherePageNumber();

	const nicknames = extractNicknames(query);
	const tags = extractTags(query);
	const description = extractPlainText(query) || '';

	return postRepository.selectPostsWhereSearchQuery(nicknames, tags, description);
}

function extractNicknames(text) {
	let nicknames = [];

	nicknames = text.match(/@[\w.-]+/g);

	if (nicknames) {
		nicknames = nicknames.map((nickname) => nickname.slice(1));
	}

	return nicknames || [];
}

function extractTags(text) {
	let tags = [];

	tags = text.match(/#[\w.-]+/g);

	if (tags) {
		tags = tags.map((tag) => tag.slice(1));
	}

	return tags || [];
}

function extractPlainText(text) {
  return text
    .replace(/[@#][\w.-]+/g, '')   // rimuove @ e #
    .replace(/\s+/g, ' ')          // normalizza spazi multipli
    .trim();                       // rimuove spazi ai bordi
}

export default { addNewPost, getPostById, getPostsByPageNumber, getPostsBySearchQuery };
