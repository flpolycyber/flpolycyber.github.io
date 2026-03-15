// to animate the logo when hovered
// SVG follow cursor using CSS and JS https://dev.to/anomaly3108/make-svg-follow-cursor-using-css-and-js-2okp
const doc = document.querySelector('.logo-wrap');
const obj = document.querySelector('#logo');


function logoEventListener() {
    const svgDoc = obj.contentDocument;
    const clipCircle = svgDoc.querySelector('#circleclip');
    const svgElement = svgDoc.documentElement;

    // Chromium first-load race: <object> tag's load event can fire before the SVG's internal DOM loads
    if (!svgElement.viewBox || !svgElement.viewBox.baseVal) {
        requestAnimationFrame(logoEventListener);
        return;
    }

    let ticket;
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = () => {
        const rect = obj.getBoundingClientRect();
        const viewBox = svgElement.viewBox.baseVal;

        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        const x = (mouseX - rect.left) * scaleX;
        const y = (mouseY - rect.top) * scaleY;

        clipCircle.setAttribute('cx', x);
        clipCircle.setAttribute('cy', y);

        ticket = null;
    };

    doc.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!ticket) {
            ticket = requestAnimationFrame(updatePosition);
        }
    });

    doc.addEventListener('mouseleave', () => {
        clipCircle.setAttribute('cx', 676767.676767);
        clipCircle.setAttribute('cy', 676767.676767);
    });
}

// Firefox fix: JS can fire before the SVG loads
if (obj.contentDocument && obj.contentDocument.readyState === 'complete') {
    logoEventListener();
} else {
    obj.addEventListener('load', logoEventListener);
}