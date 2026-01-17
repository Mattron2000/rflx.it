/* global IntersectionObserver document */
'use strict';

import { fetchPosts } from './fetch-posts.js';

export default function setupScrollSentinel(feedId, sentinelId) {
	const feed = document.getElementById(feedId);
	const sentinel = document.getElementById(sentinelId);

	new InfiniteScroll(feed, sentinel, fetchPosts);
}

class InfiniteScroll {
	constructor(feedEl, sentinelEl, loadFn) {
		this.feedEl = feedEl;
		this.loadFn = loadFn;
		this.page = 1;

		this.observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) this.loadMore();
			},
			{ rootMargin: '200px' }
		);

		this.observer.observe(sentinelEl);
	}

	async loadMore() {
		const posts = await this.loadFn(this.page++);

		posts.forEach((post) => this.feedEl.appendChild(post));
	}
}
