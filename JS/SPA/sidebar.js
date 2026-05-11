import getResourceAsString from '../utils/fetchResource.js'

let sidebar_hidden = true;


// to animate the hamburger icon
getResourceAsString('/assets/sidebar/hamburger.svg').
then(svgString => {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.documentElement;
    toggle.appendChild(svgElement);

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        svgElement.classList.toggle('active');
        sidebar_hidden = !sidebar_hidden;
    });
});


// to animate the logo when hovered
// SVG follow cursor using CSS and JS https://dev.to/anomaly3108/make-svg-follow-cursor-using-css-and-js-2okp

getResourceAsString('/assets/sidebar/logo.svg').
then(svgString => {
    const sidebar_logo_parent = document.getElementById('sidebar_logo');
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.documentElement;
    sidebar_logo_parent.appendChild(svgElement);

    const clipCircle = svgElement.getElementById('circleclip');
    let ticket;
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = () => {
        const rect = sidebar_logo_parent.getBoundingClientRect();
        const viewBox = svgElement.viewBox.baseVal;

        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        const x = (mouseX - rect.left) * scaleX;
        const y = (mouseY - rect.top) * scaleY;

        clipCircle.setAttribute('cx', x);
        clipCircle.setAttribute('cy', y);

        ticket = null;
    };

    svgElement.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!ticket) {
            ticket = requestAnimationFrame(updatePosition);
        }
    });

    svgElement.addEventListener('mouseleave', () => {
        clipCircle.setAttribute('cx', 676767.676767);
        clipCircle.setAttribute('cy', 676767.676767);
    });


});