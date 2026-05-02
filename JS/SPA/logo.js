// to animate the logo when hovered
// SVG follow cursor using CSS and JS https://dev.to/anomaly3108/make-svg-follow-cursor-using-css-and-js-2okp

fetch('/assets/sidebar/logo.svg')
  .then(response => response.text())
  .then(svgString => {
    const parent = document.getElementById('sidebar_logo');

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.documentElement;
    parent.appendChild(svgElement);

    const clipCircle = svgElement.getElementById('circleclip');

    svgElement.setAttribute('width', '320');
    svgElement.setAttribute('height', '320');
    let ticket;
    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = () => {
        const rect = parent.getBoundingClientRect();
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


  })
  .catch(error => console.error(error));