// usage
// <link rel="stylesheet" href="/components/cards/cards.css">
// <script type="module" src="/components/cards/cards.js"></script>
// 
//<cards-card>
//     <data src="/assets/img.png" name="default name" time="Next Fall" color="grey">
//         This is the description
//     </data>
//     <data src="/assets/img.png" name="default name 2" time="Next Fall" color="grey">
//         This is the second description
//     </data>
// </cards-card>
//
// bgcolor: HTML color name

import getResourceAsString from '/JS/utils/fetchResource.js';

const sheet = new CSSStyleSheet();
sheet.replaceSync(await getResourceAsString('/components/cards/cards.css'));


class ListCards extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.data = Array.from(this.children);


        this.shadow.adoptedStyleSheets = [sheet];


        this.render();
    }

    render() {
        const cards = this.data.map(data => {
            const desc = data.textContent;
            const src = data.getAttribute('src');
            const name = data.getAttribute('name');
            const time = data.getAttribute('time');
            const color = data.getAttribute('color');
            return `
            <div class="cards">
                <div class="bg-img" style="background: ${color}">
                    <img class="main-img" src="${src}" alt="${name}">
                </div>
                <div class="card-content">
                    <h3 class="name">${name}</h3>
                    <hr class="linebreak">
                    <p class="desc">${desc}</p>
                    <div class="timecontainer">
                        <p class="time-label">&#9672; <b>Time:</b></p>
                        <p class="time-input">${time}</p>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        this.shadow.innerHTML = `
            <div class="list-container">
                ${cards}
            </div>
        `;
    }
}


customElements.define('list-cards', ListCards);