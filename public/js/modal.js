/* global document bootstrap */
'use strict';

class ModalHandler {
	constructor(modalName = 'modalComponent') {
		this.modal = document.getElementById(modalName);
		this.title = document.getElementById(modalName + 'Title');
		this.dismiss = document.getElementById(modalName + 'Dismiss');
		this.body = document.getElementById(modalName + 'Body');
		this.footer = document.getElementById(modalName + 'Footer');
		this.close = document.getElementById(modalName + 'Close');
		this.submit = document.getElementById(modalName + 'Submit');

		if (modalName === 'modalComponent') this.reset();
	}

	reset() {
		this.title.innerHTML = '';
		this.body.innerHTML = '';
		this.body.classList.add('d-none');
		this.footer.classList.add('d-none');
		this.close.classList.add('d-none');
		this.submit.classList.add('d-none');
		this.submit.removeEventListener('click', this.callback);
	}

	showSubmitButton() {
		this.submit.classList.remove('d-none');
	}

	setSubmitButton(message, callback, dismiss = false) {
		this.callback = callback;
		this.submit.innerHTML = message;
		this.submit.addEventListener('click', this.callback);

		if (dismiss)
			this.submit.addEventListener('click', () =>
				this.submit.removeEventListener('click', this.callback)
			);
		this.showSubmitButton();
		this.showFooter();
	}

	showTitle() {
		this.title.classList.remove('d-none');
	}

	setTitle(title) {
		this.title.innerHTML = title;
		this.showTitle();
	}

	launch() {
		bootstrap.Modal.getOrCreateInstance(this.modal).show();
	}

	setBody(body) {
		this.body.innerHTML = body;
		this.showBody();
	}

	showBody() {
		this.body.classList.remove('d-none');
	}

	hide() {
		bootstrap.Modal.getOrCreateInstance(this.modal).hide();
	}

	showFooter() {
		this.footer.classList.remove('d-none');
	}
}

export default ModalHandler;
