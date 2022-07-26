// Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui';

document.addEventListener('DOMContentLoaded', () => {

	/**
	 * Backdrop (overlay)
	 */
	const backdrop = document.querySelector('.backdrop');

	function toggleBackdrop(event) {
		if (event.type === 'mouseenter' || event === 'show') {
			backdrop.classList.add('show');
		}
		if (event.type === 'mouseleave' || event === 'hide') {
			backdrop.classList.remove('show');
		}
	}

	backdrop.addEventListener('click', () => {
		hideMobileMenu();
	});

	/**
	 * Mobile menu
	 */
	const mmenu = document.querySelector('.mmenu');
	const burgerBtn = document.querySelector('.header-burger');
	const mmenuCloseBtn = mmenu?.querySelector('.mmenu-heading .btn-close');

	burgerBtn.addEventListener('click', () => {
		showMobileMenu();
	});

	mmenuCloseBtn.addEventListener('click', () => {
		hideMobileMenu();
	});

	function showMobileMenu() {
		mmenu.classList.add('_is-active');
		toggleBackdrop('show');
	}

	function hideMobileMenu() {
		mmenu.classList.remove('_is-active');
		toggleBackdrop('hide');
	}

	/**
	 * Smooth scroll
	 */
	const linkAnchors = document.querySelectorAll('a[href^="#"');
	
	if (linkAnchors.length) {
		linkAnchors.forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();

				let href = this.getAttribute('href').substring(1);
				let scrollTarget = document.getElementById(href);
				let offset = +this.dataset.scrollOffset;

				if (scrollTarget) {
					const elementPosition = scrollTarget.getBoundingClientRect().top;
					let offsetPosition = elementPosition;

					if (offset) {
						offsetPosition = elementPosition - offset;
					}

					window.scrollBy({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}
			});
		});
	}

	// Varying modal: Styling package
	const packageModal = document.querySelector('#stlylingPackageModal');

	if (packageModal) {
		packageModal.addEventListener('show.bs.modal', function (event) {
			let button = event.relatedTarget;
			let packageName = button.getAttribute('data-bs-package');
			let packageTitle = packageModal.querySelector('#stlylingPackageTitle');
	
			packageTitle.value = packageName;
		});
	}

});