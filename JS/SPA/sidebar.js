fetch('/assets/sidebar/hamburger.svg')
  .then(response => response.text())
  .then(svgString => {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.documentElement;
    toggle.appendChild(svgElement);

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        svgElement.classList.toggle('active');
    });


  })
  .catch(error => console.error(error));