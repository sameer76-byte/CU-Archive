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

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('subjectSearch');
    const searchResults = document.getElementById('searchResults');
    const clearButton = document.getElementById('clearSearch');
    
    // Get all subject cards
    const subjectCards = document.querySelectorAll('.subject-card');
    const subjects = [];
    
    // Build subjects array with their data
    subjectCards.forEach(card => {
        const link = card.closest('a');
        if (link) {
            subjects.push({
                name: card.querySelector('h3').textContent,
                code: card.querySelector('.subject-code')?.textContent || '',
                description: card.querySelector('.subject-description')?.textContent || '',
                url: link.getAttribute('href'),
                category: card.closest('.subject-section')?.id || ''
            });
        }
    });
    
    // Search function
    function performSearch(query) {
        query = query.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const matches = subjects.filter(subject => 
            subject.name.toLowerCase().includes(query) ||
            subject.code.toLowerCase().includes(query) ||
            subject.description.toLowerCase().includes(query)
        );
        
        displayResults(matches);
    }
    
    // Display search results
    function displayResults(matches) {
        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No subjects found matching your search.</div>';
            searchResults.classList.add('active');
            return;
        }
        
        let html = '';
        matches.slice(0, 10).forEach(subject => {
            const categoryName = getCategoryName(subject.category);
            html += `
                <a href="${subject.url}" style="text-decoration: none;">
                    <div class="search-result-item">
                        <h4>${subject.name} <span style="color: var(--accent-color); font-size: 0.8rem;">${subject.code}</span></h4>
                        <p>${subject.description.substring(0, 100)}${subject.description.length > 100 ? '...' : ''}</p>
                        <small style="color: var(--accent-color);">${categoryName}</small>
                    </div>
                </a>
            `;
        });
        
        if (matches.length > 10) {
            html += `<div class="search-result-item" style="text-align: center; color: var(--accent-color);">
                + ${matches.length - 10} more results. Refine your search.
            </div>`;
        }
        
        searchResults.innerHTML = html;
        searchResults.classList.add('active');
    }
    
    // Helper function to get category name
    function getCategoryName(category) {
        const categories = {
            'major': 'Major Subjects',
            'minor': 'Minor Specializations',
            'sec': 'SEC Courses',
            'aec': 'AEC Courses',
            'cvac': 'CVAC Courses'
        };
        return categories[category] || category;
    }
    
    // Event listeners
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        performSearch(query);
        clearButton.style.display = query.length > 0 ? 'block' : 'none';
    });
    
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        clearButton.style.display = 'none';
        searchResults.classList.remove('active');
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
});