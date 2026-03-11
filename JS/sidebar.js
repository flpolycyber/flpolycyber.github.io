
const sidebar_SVG = document.getElementById('sidebarSVG');
const toggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

sidebar_SVG.addEventListener('load', () => {
    const svgDoc = sidebar_SVG.contentDocument; 
    
    const svgRoot = svgDoc.documentElement;

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        toggle.classList.toggle('active');
        
        svgRoot.classList.toggle('active');
    });
});