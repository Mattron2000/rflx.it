/* global IntersectionObserver */
'use strict';

export default class InfiniteScroll {
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
