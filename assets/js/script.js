document.addEventListener("DOMContentLoaded", function () {
    // Off-canvas menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    if (menuToggle && navList) {
        menuToggle.onclick = function() {
            navList.classList.toggle('open');
        };
    }

    // Close menu on nav link click (mobile)
    document.querySelectorAll('#nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 700) {
                navList.classList.remove('open');
            }
        });
    });

    // Render projects
    if (typeof projects !== "undefined") {
        const workList = document.getElementById('work-list');
        if (workList) {
            workList.innerHTML = projects.map(project => `
                <div class="work-item">
                    <img src="${project.image}" alt="${project.title}" class="work-img" style="width:100%;border-radius:8px 8px 0 0;object-fit:cover;max-height:140px;">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-used">
                        ${project.technology_used.map(tech => `<span class="tech-badge">${tech}</span>`).join(' ')}
                    </div>
                    <a href="${project.preview_link}" class="preview-link" target="_blank" rel="noopener">Preview</a>
                </div>
            `).join('');
        }
    }

    // Highlight nav link for current section
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-list a');

    function activateNavLink() {
        let scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').replace('#','') === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Initial call
});