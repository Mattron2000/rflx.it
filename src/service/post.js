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

export default { addNewPost };
