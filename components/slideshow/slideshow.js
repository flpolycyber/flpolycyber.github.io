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

    connectedCallback() {
        this.render();
        this.slides = this.shadow.querySelectorAll(".mySlides");
        this.dots = this.shadow.querySelectorAll(".dot");
        this.automove = true;
        this.slideIndex = 0;
        this.startAuto();
        
    }

    get items() {
        try {
            return JSON.parse(this.getAttribute('items') || '[]');
        } catch (e) {
            console.error("Invalid JSON in items attribute", e);
            return [];
        }
    }

    set slideIndex(num){
        const total = this.dots.length;
        if (total === 0) {
            this._slideIndex = 0;
            return;
        }

        this._slideIndex = ((num % total) + total) % total;
        this.showSlides();
    }

    get slideIndex(){
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
        }, 4000); // 4 seconds
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

    render() {
        const items = this.items;
        
        // Generate the slide HTML dynamically
        const slidesHTML = items.map((item, index) => `
            <div class="mySlides fade">
                <div class="numbertext">${index + 1} / ${items.length}</div>
                <div class="center">
                    <img class="slideimg" src="${item.img}" alt="${item.title}">
                </div>
            </div>
        `).join('');

        const dots = items.map((item, index) => `
            <span class="dot" data-slide="${index}"> ${item.title} </span>
        `).join('');

        this.shadow.innerHTML = `
            <link rel="stylesheet" href="/CSS/main.css" />
            <link rel="stylesheet" href="/components/slideshow/slideshow.css">
            <style>
                ${this.css}
            </style>

            <div style="text-align:center">
                ${dots}
            </div>
            
            <div class="slideshow-container">
                ${slidesHTML}
                <a id="prev">❮</a>
                <a id="next">❯</a>
            </div>
        `;

        // Add Event Listeners
        this.shadow.getElementById('prev').addEventListener('click', () => this.plusSlides(-1));
        this.shadow.getElementById('next').addEventListener('click', () => this.plusSlides(1));

        this.shadow.querySelectorAll('.dot').forEach((dot) => {
            dot.addEventListener('click', () => {
                const slide = Number(dot.dataset.slide);
                this.currentSlide(slide);
            });
        });

        // Initialize the first slide
        this.showSlides();
    }
}

customElements.define('slide-show', SlideShow);


// usage
// <script type="module" src="/components/slideshow/main.js"></script>
// 
// <slide-show items='[
//     {"title": "title1", "img": "/img/img.png"},
//     {"title": "title2", "img": "/img/img.png"},
//     {"title": "title3", "img": "/img/img.png"}]'>
// </slide-show>

