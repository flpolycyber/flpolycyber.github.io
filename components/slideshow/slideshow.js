// usage
// <link rel="stylesheet" href="/components/slideshow/slideshow.css">
//
// <slide-show durationMS="5000">
//     <img alt="Involve" src="/assets/connected/involve_8bit.png">
//     <img alt="Instagram" src="/assets/connected/instagram_8bit.png">
// </slide-show>
// 
// duration is optional: default is 5000 ms

import getResourceAsString from '/JS/utils/fetchResource.js';

const sheet = new CSSStyleSheet();
sheet.replaceSync(await getResourceAsString('/components/slideshow/slideshow.css'));

class SlideShow extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this._slideIndex = 0;
        this.automove = true;
        this.slides = [];
        this.dots = [];
        this._autoTimer = null;
    }

    async connectedCallback() {
        this.shadow.adoptedStyleSheets = [sheet];
        const imgs = Array.from(this.querySelectorAll(':scope > img'));

        this.render(imgs);

        this.slides = this.shadow.querySelectorAll(".myzlides");
        this.dots = this.shadow.querySelectorAll(".zlidedot");
        this.automove = true;
        this.slideIndex = 0;
        this.startAuto();
        this.showSlides();
    }

    disconnectedCallback() {
        if (this._autoTimer) {
            clearInterval(this._autoTimer);
            this._autoTimer = null;
        }
    }

    get duration() {
        return parseInt(this.getAttribute('duration'), 10) || 5000;
    }

    set slideIndex(num) {
        const total = this.dots.length;
        if (total === 0) {
            this._slideIndex = 0;
            return;
        }

        this._slideIndex = ((num % total) + total) % total;
        this.showSlides();
    }

    get slideIndex() {
        return this._slideIndex;
    }

    plusSlides(n) {
        this.automove = false;
        this.slideIndex = this._slideIndex + n;
    }

    currentSlide(n) {
        this.automove = false;
        this.slideIndex = n;
    }

    startAuto() {
        if (this._autoTimer) {
            clearInterval(this._autoTimer);
        }

        this._autoTimer = setInterval(() => {
            if (this.automove) {
                this.slideIndex = this._slideIndex + 1;
            }
        }, this.duration);
    }

    showSlides() {
        const slides = this.slides;
        const dots = this.dots;

        // Hide all slides
        slides.forEach(slide => slide.style.display = "none");

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Show the active slide
        if (slides.length > 0) {
            slides[this.slideIndex].style.display = "block";
            dots[this.slideIndex].className += " active";
        }
    }

    printHex(num) {
        return '0x' + num.toString(16).padStart(2, '0');
    }

    render(imgs) {
        // Build the skeleton
        this.shadow.innerHTML = `
        <div>
            <div class="zlidedots"></div>

            <div class="zlideimg-container">
                <a id="zlideprev">❮</a>
                <a id="zlidenext">❯</a>
            </div>
        </div>
        `;

        const dotsContainer = this.shadow.querySelector('.zlidedots');
        const imgContainer = this.shadow.querySelector('.zlideimg-container');
        const nextBtn = this.shadow.querySelector('#zlidenext');

        imgs.forEach((img, index) => {
            const title = img.getAttribute('alt') || '';

            const slide = document.createElement('div');
            slide.className = 'myzlides zlidefade';

            const numberText = document.createElement('div');
            numberText.className = 'zlidenumbertext';
            numberText.textContent = this.printHex(index);

            const center = document.createElement('div');
            center.className = 'zlidecenter slideimage-container';

            img.classList.add('zlideimg');
            center.appendChild(img);

            slide.appendChild(numberText);
            slide.appendChild(center);

            imgContainer.insertBefore(slide, nextBtn.previousElementSibling || nextBtn);

            const dot = document.createElement('span');
            dot.className = 'zlidedot';
            dot.dataset.slide = index;
            dot.textContent = ` ${title} `;
            dot.addEventListener('click', () => this.currentSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.shadow.querySelector('#zlideprev').addEventListener('click', () => this.plusSlides(-1));
        nextBtn.addEventListener('click', () => this.plusSlides(1));
    }
}

customElements.define('slide-show', SlideShow);