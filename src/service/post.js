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

	// TODO: implement search
}

export default { addNewPost, getPostById, getPostsByPageNumber, getPostsBySearchQuery };
