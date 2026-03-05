/* ============================================================
   BSc Subject Catalog — honours.js  (optimised UX/UI build)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. DARK-MODE (persisted)
    ───────────────────────────────────────── */
    const modeToggle  = document.getElementById('modeToggle');
    const modeIcon    = modeToggle?.querySelector('i');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            modeIcon?.classList.replace('fa-moon', 'fa-sun');
            modeToggle?.setAttribute('aria-label', 'Switch to light mode');
        } else {
            document.body.classList.remove('dark-mode');
            modeIcon?.classList.replace('fa-sun', 'fa-moon');
            modeToggle?.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    applyTheme(localStorage.getItem('theme') || 'light');

    modeToggle?.addEventListener('click', () => {
        const next = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });


    /* ─────────────────────────────────────────
       2. MOBILE NAV TOGGLE
    ───────────────────────────────────────── */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileSubjectNav = document.getElementById('mobileSubjectNav');

    function closeMobileNav() {
        mobileSubjectNav?.classList.remove('active');
        const icon = mobileNavToggle?.querySelector('i');
        icon?.classList.replace('fa-times', 'fa-list');
        mobileNavToggle?.setAttribute('aria-label', 'Open subject navigation');
        mobileNavToggle?.setAttribute('aria-expanded', 'false');
    }

    mobileNavToggle?.addEventListener('click', () => {
        const isOpen = mobileSubjectNav.classList.toggle('active');
        const icon   = mobileNavToggle.querySelector('i');
        if (isOpen) {
            icon.classList.replace('fa-list', 'fa-times');
            mobileNavToggle.setAttribute('aria-label',   'Close subject navigation');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
        } else {
            closeMobileNav();
        }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (
            mobileSubjectNav?.classList.contains('active') &&
            !mobileSubjectNav.contains(e.target) &&
            !mobileNavToggle?.contains(e.target)
        ) {
            closeMobileNav();
        }
    });


    /* ─────────────────────────────────────────
       3. NAVIGATION — scroll to section
    ───────────────────────────────────────── */
    const HEADER_OFFSET = 90; // px — keeps section header clear of fixed nav

    function getHeaderHeight() {
        const header = document.querySelector('header');
        return header ? header.offsetHeight : HEADER_OFFSET;
    }

    function setActiveNav(sectionId) {
        document.querySelectorAll('.subject-nav-btn, .quick-nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === sectionId);
        });
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const top = section.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - 10;
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveNav(sectionId);
        closeMobileNav();

        // Announce to screen-readers
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
    }

    document.querySelectorAll('.subject-nav-btn, .quick-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target) scrollToSection(target);
        });
    });


    /* ─────────────────────────────────────────
       4. SCROLL SPY  (IntersectionObserver — no jank)
    ───────────────────────────────────────── */
    const sections = document.querySelectorAll('.subject-section[id]');

    const spyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        {
            rootMargin: `-${HEADER_OFFSET + 20}px 0px -55% 0px`,
            threshold: 0
        }
    );

    sections.forEach(s => spyObserver.observe(s));


    /* ─────────────────────────────────────────
       5. QUICK-NAV TOOLTIPS  (CSS-powered, built in JS)
    ───────────────────────────────────────── */
    const quickNavLabels = {
        major: 'Major Subjects',
        minor: 'Minor Subjects',
        sec:   'SEC Courses',
        aec:   'AEC Courses',
        cvac:  'CVAC Courses'
    };

    document.querySelectorAll('.quick-nav-btn').forEach(btn => {
        const target = btn.getAttribute('data-target');
        if (quickNavLabels[target]) {
            btn.setAttribute('title', quickNavLabels[target]);
            btn.setAttribute('aria-label', quickNavLabels[target]);
        }
    });


    /* ─────────────────────────────────────────
       6. SEARCH  (rebuilt for correctness & UX)
    ───────────────────────────────────────── */
    const searchInput   = document.getElementById('subjectSearch');
    const searchResults = document.getElementById('searchResults');
    const clearBtn      = document.getElementById('clearSearch');

    if (!searchInput || !searchResults || !clearBtn) return;

    // Build subject index from DOM once
    const subjectIndex = [];
    document.querySelectorAll('.subject-card').forEach(card => {
        const link = card.closest('a');
        if (!link) return;
        subjectIndex.push({
            name:        card.querySelector('h3')?.textContent.trim()             || '',
            code:        card.querySelector('.subject-code')?.textContent.trim()  || '',
            description: card.querySelector('.subject-description')?.textContent.trim() || '',
            url:         link.getAttribute('href') || '#',
            sectionId:   card.closest('.subject-section')?.id || '',
            card,          // reference for highlight-scroll
        });
    });

    const categoryNames = {
        major: 'Major Subjects',
        minor: 'Minor Specializations',
        sec:   'SEC Courses',
        aec:   'AEC Courses',
        cvac:  'CVAC Courses'
    };

    // Highlight matched text
    function highlight(text, query) {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${escaped})`, 'gi'),
            '<mark style="background:var(--accent-color);color:var(--primary-color);border-radius:2px;padding:0 2px;">$1</mark>');
    }

    let activeResultIndex = -1;

    function renderResults(matches, query) {
        activeResultIndex = -1;

        if (!query || query.length < 2) {
            closeResults();
            return;
        }

        if (matches.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size:1.5rem;display:block;margin-bottom:.5rem;opacity:.4;"></i>
                    No subjects found for "<strong>${query}</strong>"
                </div>`;
            openResults();
            return;
        }

        const shown   = matches.slice(0, 10);
        const surplus = matches.length - shown.length;

        const html = shown.map((s, i) => `
            <div class="search-result-item" role="option" tabindex="-1" data-index="${i}"
                 data-url="${s.url}" data-section="${s.sectionId}"
                 aria-label="${s.name}">
                <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:.3rem;">
                    <h4 style="margin:0;">${highlight(s.name, query)}</h4>
                    <span style="color:var(--accent-color);font-size:.78rem;font-weight:600;">${highlight(s.code, query)}</span>
                </div>
                <p style="margin:.3rem 0 .2rem;">${highlight(s.description.substring(0, 110), query)}${s.description.length > 110 ? '…' : ''}</p>
                <small style="color:var(--accent-color);opacity:.8;">
                    <i class="fas fa-tag" style="margin-right:.25rem;"></i>${categoryNames[s.sectionId] || s.sectionId}
                </small>
            </div>`
        ).join('');

        const surplusNote = surplus > 0
            ? `<div class="search-result-item" style="text-align:center;color:var(--secondary-color);font-size:.85rem;cursor:default;">
                   +${surplus} more — refine your search
               </div>`
            : '';

        searchResults.innerHTML = html + surplusNote;
        openResults();
        attachResultListeners();
    }

    function attachResultListeners() {
        searchResults.querySelectorAll('.search-result-item[data-url]').forEach(item => {
            item.addEventListener('click', () => navigateToResult(item));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateToResult(item);
                }
            });
        });
    }

    function navigateToResult(item) {
        const url     = item.getAttribute('data-url');
        const section = item.getAttribute('data-section');
        closeResults();
        searchInput.blur();

        // If URL is a real page, navigate; otherwise scroll to section
        if (url && url !== '#' && !url.startsWith('#')) {
            window.location.href = url;
        } else if (section) {
            scrollToSection(section);
        }
    }

    function openResults()  { searchResults.classList.add('active');    searchResults.setAttribute('aria-hidden', 'false'); }
    function closeResults() { searchResults.classList.remove('active'); searchResults.setAttribute('aria-hidden', 'true');  activeResultIndex = -1; }

    // Debounce helper
    function debounce(fn, ms) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    }

    function performSearch(query) {
        query = query.trim();
        if (query.length < 2) { closeResults(); return; }

        const q = query.toLowerCase();
        const matches = subjectIndex.filter(s =>
            s.name.toLowerCase().includes(q)        ||
            s.code.toLowerCase().includes(q)        ||
            s.description.toLowerCase().includes(q)
        );
        renderResults(matches, query);
    }

    const debouncedSearch = debounce(performSearch, 180);

    searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        clearBtn.style.display = val.length > 0 ? 'block' : 'none';
        debouncedSearch(val);
    });

    // Re-show results if user clicks back into a non-empty field
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) performSearch(searchInput.value);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        closeResults();
        searchInput.focus();
    });

    // Keyboard navigation inside results (↑ ↓ Esc)
    searchInput.addEventListener('keydown', (e) => {
        const items = [...searchResults.querySelectorAll('.search-result-item[data-url]')];
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeResultIndex = Math.min(activeResultIndex + 1, items.length - 1);
            items[activeResultIndex]?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeResultIndex <= 0) { activeResultIndex = -1; searchInput.focus(); return; }
            activeResultIndex--;
            items[activeResultIndex]?.focus();
        } else if (e.key === 'Escape') {
            closeResults();
            searchInput.blur();
        } else if (e.key === 'Enter' && activeResultIndex === -1 && items.length) {
            e.preventDefault();
            navigateToResult(items[0]);
        }
    });

    // Allow ↑/↓ navigation within result items
    searchResults.addEventListener('keydown', (e) => {
        const items = [...searchResults.querySelectorAll('.search-result-item[data-url]')];
        const focused = document.activeElement;
        const idx = items.indexOf(focused);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = Math.min(idx + 1, items.length - 1);
            items[next]?.focus();
            activeResultIndex = next;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (idx <= 0) { searchInput.focus(); activeResultIndex = -1; return; }
            items[idx - 1]?.focus();
            activeResultIndex = idx - 1;
        } else if (e.key === 'Escape') {
            closeResults();
            searchInput.focus();
        }
    });

    // Close results when clicking outside the search container
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) closeResults();
    });


    /* ─────────────────────────────────────────
       7. CARD ENTRANCE ANIMATION  (lazy, on scroll)
    ───────────────────────────────────────── */
    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // stagger by DOM order within its grid
                    const siblings = [...entry.target.parentElement.children];
                    const delay    = siblings.indexOf(entry.target) * 40;
                    entry.target.style.animationDelay = `${delay}ms`;
                    entry.target.classList.add('card-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.add('card-hidden');
        cardObserver.observe(card);
    });


    /* ─────────────────────────────────────────
       8. SCROLL-TO-TOP  (auto-inject button)
    ───────────────────────────────────────── */
    const topBtn = document.createElement('button');
    topBtn.id             = 'scrollTopBtn';
    topBtn.innerHTML      = '<i class="fas fa-chevron-up"></i>';
    topBtn.setAttribute('aria-label', 'Scroll to top');
    topBtn.setAttribute('title',       'Back to top');
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', () => {
        topBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});