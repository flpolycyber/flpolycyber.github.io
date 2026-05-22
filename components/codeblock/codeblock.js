// usage
// <link rel="stylesheet" href="/components/codeblock/codeblock.css">
// <script type="module" src="/components/codeblock/codeblock.js"></script>
// 
// <code-block language="python" title="Hello World">
//     print("Hello World")
// </code-block>
//
// <code-block language="python" title="Hello World" src="/code.py">
// </code-block>
// 
// uses the Shiki to convert code to HTML 
// supported languages: https://shiki.style/languages
// themes: https://shiki.style/themes - https://textmate-grammars-themes.netlify.app/
//
// To-do https://shiki.style/guide/best-performance
// Markdown support: https://shiki.style/packages/markdown-exit

import { codeToHtml } from 'https://esm.sh/shiki@4.0.2';
const theme = 'laserwave';


class CodeBlock extends HTMLElement{
    constructor() {
        super();
    }

    async connectedCallback() {
        this.render();

    }

    get language(){
        return this.getAttribute('language');
    }

    get title(){
        return this.getAttribute('title') || '';
    }

    async getCode(){
        const src = this.getAttribute('src');
        if (src){
            const response = await fetch(src);
            return await response.text();
        }

        return this.textContent;
    }

    async render(){
        this.code = await this.getCode();

        const htmlCode  = await codeToHtml(this.code, {
            lang: this.language,
            theme: theme
        })

        this.innerHTML = `
        <div>
            <div class="code-titlebar">
                <div class="code-buttons">
                    <div class="code-close code-button"></div>
                    <div class="code-minimize code-button"></div>
                    <div class="code-zoom code-button"></div>
                </div>
                <div class="code-title">${this.title}</div>
            </div>
            </div>
            <div>
                ${htmlCode}
            </div>
        </div>
        `;
    }

}

customElements.define('code-block', CodeBlock);