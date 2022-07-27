// Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import { Modal } from 'bootstrap';
import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui';
import Swiper, { Pagination, Navigation, Thumbs, Controller } from 'swiper';

Swiper.use([Pagination, Navigation, Thumbs, Controller]);


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
	const burgerBtn = document.querySelector('.header-burger-btn');
	const mmenuCloseBtn = mmenu.querySelector('.mmenu-heading .btn-close');
	const mmenuNavLinks = mmenu.querySelectorAll('.mmenu-navigation > li > a');

	burgerBtn.addEventListener('click', () => {
		showMobileMenu();
	});

	mmenuCloseBtn.addEventListener('click', () => {
		hideMobileMenu();
	});

	mmenuNavLinks.forEach((link) => {
		link.addEventListener('click', () => {
			hideMobileMenu();
		});
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

	/**
	 * Rooms slider
	 */
	const stylingRoomsSecondarySwiper = new Swiper('.s-rooms-slider-secondary', {
		loop: true,
		allowTouchMove: false,
		autoHeight: true,
		centeredSlides: true,
		slideToClickedSlide: false,
		slidesPerView: 3,
		spaceBetween: 20,
		speed: 600,
		navigation: {
			prevEl: '.s-rooms-slider-secondary-navigation .swiper-button-prev',
			nextEl: '.s-rooms-slider-secondary-navigation .swiper-button-next',
		},
		breakpoints: {
			768: {
				centeredSlides: true,
				slidesPerView: 4,
				slideToClickedSlide: false,
			},
			992: {
				centeredSlides: false,
				initialSlide: 1,
				slidesPerView: 1.5,
				slideToClickedSlide: true,
			},
		},
	});

	const stylingRoomsMainSwiper = new Swiper('.s-rooms-slider-main', {
		loop: true,
		allowTouchMove: false,
		spaceBetween: 20,
		speed: 600,
	});

	stylingRoomsSecondarySwiper.on('slideNextTransitionStart', (swiper) => {
		stylingRoomsMainSwiper.slideNext();
	});

	stylingRoomsSecondarySwiper.on('slidePrevTransitionStart', (swiper) => {
		stylingRoomsMainSwiper.slidePrev();
	});

	/**
	 * Services slider
	 */
	const stylingPackagesSwiper = new Swiper('.s-packages-slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 500,
		navigation: {
			prevEl: '.s-packages-slider-navigation .swiper-button-prev',
			nextEl: '.s-packages-slider-navigation .swiper-button-next',
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			}
		},
	});

});