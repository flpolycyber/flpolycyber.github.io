// usage
// <link rel="stylesheet" href="/components/popup/popup.css">
// <script type="module" src="/components/popup/popup.js"></script>
// <pop-up title="My Title">
//     <button slot="button"> Button to open the popup</button>
//     <p>This is the main content</p>
// </pop-up>

class PopUp extends HTMLElement {
    constructor() {
        super();
    }

    get title(){
        return this.getAttribute('title') || '';
    }

    connectedCallback() {
        const providedButton = this.querySelector('[slot="button"]');
        const providedContent = Array.from(this.childNodes).filter(node => node !== providedButton);

        this.innerHTML = `
            <span id="popopen-btn"></span>
            
            <dialog id="popmy-dialog">
                <div class="poptitle">
                    <h1>${this.title}</h1>
                    <div class="popimg-container">
                        <img src="/assets/icons/close.svg" id="popclose-icon" alt="Close dialog">
                    </div>
                </div>
                <hr class="popline">
                <main id="popmain"></main>
            </dialog>
        `;

        if (providedButton) {
            this.querySelector('#popopen-btn').appendChild(providedButton);
        }
        
        const mainContainer = this.querySelector('#popmain');
        providedContent.forEach(node => mainContainer.appendChild(node));

        const dialog = this.querySelector('#popmy-dialog');
        const openBtn = this.querySelector('#popopen-btn');
        const closeIcon = this.querySelector('.popimg-container');

        openBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent <a> from navigating
            dialog.showModal();
        });

        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });

        closeIcon.addEventListener('click', () => dialog.close());

        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') dialog.close();
        });
    }
}

customElements.define('pop-up', PopUp);