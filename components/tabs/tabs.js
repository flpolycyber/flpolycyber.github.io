// usage
// <link rel="stylesheet" href="/components/tabs/tabs.css">
// <script type="module" src="/components/tabs/tabs.js"></script>
// 
// <doc-tab>
//     <h1 title="title1"> html body 1</h1>
//     <h1 title="title2"> html body 2</h1>
//     <h3 title="title3"> html body 3</h3>
// </doc-tab>

class DocTabs extends HTMLElement {
    constructor() {
        super();
        this.prev_index = null; 
    }

    connectedCallback() {
        this.savedChildren = Array.from(this.children);
        this.render();
    }

    showtab(num) {
        if (num === this.prev_index) return;

        if (this.tabs[num]) this.tabs[num].classList.add('active');
        if (this.bodies[num]) this.bodies[num].classList.add('active');

        if (this.prev_index !== null) {
            if (this.tabs[this.prev_index]) this.tabs[this.prev_index].classList.remove('active');
            if (this.bodies[this.prev_index]) this.bodies[this.prev_index].classList.remove('active');
        }

        this.prev_index = num;
    }

    render() {
        const tabsHTML = this.savedChildren.map((element) => `
            <a href="javascript:void(0)" class="taz-link-title">
                <div class="">${element.title}</div>
            </a>
        `).join('');

        this.innerHTML = `
        <div class="taz-main-container">
            <div class="taz-parent-container">
                ${tabsHTML}
            </div>
            <div class="tazs-container"></div>
        </div>
        `;

        const container = this.querySelector(".tazs-container");
        this.savedChildren.forEach(child => {
            container.appendChild(child);
            child.classList.add("taz");
        }
        );

        this.tabs = this.querySelectorAll(".taz-link-title");
        this.bodies = container.children;

        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.showtab(index);
            });
        });

        this.showtab(0);
    }
}

customElements.define('doc-tab', DocTabs);