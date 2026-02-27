// Navigation functionality
function setupNavigation() {
    // Get all navigation buttons
    const desktopNavBtns = document.querySelectorAll('.subject-nav-btn');
    const mobileNavBtns = document.querySelectorAll('.mobile-subject-nav .subject-nav-btn');
    const quickNavBtns = document.querySelectorAll('.quick-nav-btn');
    
    // Function to scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Update active states
            const allNavBtns = document.querySelectorAll('.subject-nav-btn, .quick-nav-btn');
            allNavBtns.forEach(btn => btn.classList.remove('active'));
            
            // Activate current section button
            document.querySelectorAll(`[data-target="${sectionId}"]`).forEach(btn => {
                btn.classList.add('active');
            });
            
            // Scroll to section with offset for fixed header
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile nav if open
            const mobileSubjectNav = document.getElementById('mobileSubjectNav');
            const mobileNavToggle = document.getElementById('mobileNavToggle');
            
            if (mobileSubjectNav && mobileSubjectNav.classList.contains('active')) {
                mobileSubjectNav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-list');
            }
        }
    }
    
    // Add event listeners to desktop nav buttons
    desktopNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            scrollToSection(target);
        });
    });
    
    // Add event listeners to mobile nav buttons
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            scrollToSection(target);
        });
    });
    
    // Add event listeners to quick nav buttons
    quickNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            scrollToSection(target);
        });
    });
}

// Scroll spy to update active nav
function setupScrollSpy() {
    const sections = document.querySelectorAll('.subject-section');
    const navButtons = document.querySelectorAll('.subject-nav-btn, .quick-nav-btn');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === current) {
                btn.classList.add('active');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileSubjectNav = document.getElementById('mobileSubjectNav');
    
    if (mobileNavToggle && mobileSubjectNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileSubjectNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (mobileSubjectNav.classList.contains('active')) {
                icon.classList.remove('fa-list');
                icon.classList.add('fa-times');
                mobileNavToggle.setAttribute('aria-label', 'Close subject navigation');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-list');
                mobileNavToggle.setAttribute('aria-label', 'Open subject navigation');
            }
        });
    }

    // Dark mode toggle
    const modeToggle = document.getElementById('modeToggle');
    const modeIcon = modeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
    
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                modeIcon.classList.remove('fa-moon');
                modeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
                modeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                modeIcon.classList.remove('fa-sun');
                modeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
                modeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        });
    }

    setupNavigation();
    setupScrollSpy();
});