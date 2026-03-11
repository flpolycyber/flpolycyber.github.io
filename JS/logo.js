// to animate the logo when hovered
// SVG follow cursor using CSS and JS https://dev.to/anomaly3108/make-svg-follow-cursor-using-css-and-js-2okp
const doc = document.querySelector('.logo-wrap');
const obj = document.querySelector('#logo');


obj.addEventListener('load', () => {
    const svgDoc = obj.contentDocument;
    const clipCircle = svgDoc.querySelector('#circleclip');
    const svgElement = svgDoc.documentElement;

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

    doc.addEventListener('mouseleave', () => { /* ⁶🤷⁷ */
        clipCircle.setAttribute('cx', 676767.676767);
        clipCircle.setAttribute('cy', 676767.676767);
    });
});