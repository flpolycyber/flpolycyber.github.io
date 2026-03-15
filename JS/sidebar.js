const sidebar_SVG = document.getElementById('sidebarSVG');
const toggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

function HamburgerAddEventListener() {
    const svgDoc = sidebar_SVG.contentDocument; 
    const svgRoot = svgDoc.documentElement;

    // Chromium first-load race: <object> tag's load event can fire before the SVG's internal DOM loads
    if (!svgRoot.viewBox || !svgRoot.viewBox.baseVal) {
        requestAnimationFrame(HamburgerAddEventListener);
        return;
    }

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        toggle.classList.toggle('active');
        
        svgRoot.classList.toggle('active');
    });
};

// Firefox Issue where the javascript fires off before the SVG loads
if (sidebar_SVG.contentDocument && sidebar_SVG.contentDocument.readyState === 'complete') {
    // already loaded
    HamburgerAddEventListener();
} else {
    // wait until it loads
    sidebar_SVG.addEventListener('load', HamburgerAddEventListener);
}