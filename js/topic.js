// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileNavToggle.setAttribute('aria-label', 'Close navigation menu');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileNavToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    }
    
    // Dark Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    const modeIcon = modeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
    
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

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileNavToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const paperCards = document.querySelectorAll('.paper-card');
    const searchInput = document.getElementById('paperSearch');

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');
                
                paperCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            paperCards.forEach(card => {
                const title = card.querySelector('.paper-title').textContent.toLowerCase();
                const year = card.getAttribute('data-year');
                
                if (title.includes(searchTerm) || (year && year.includes(searchTerm))) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Prevent event bubbling on action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const shareModal = document.getElementById('shareModal');
        const pdfViewerModal = document.getElementById('pdfViewerModal');
        
        if (e.target === shareModal) {
            closeShareModal();
        }
        if (e.target === pdfViewerModal) {
            closePdfViewer();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeShareModal();
            closePdfViewer();
        }
    });
});

// Google Drive Helper Functions
function getDriveViewerUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
}

function getDriveDownloadUrl(fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function getDriveShareUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

// Share Modal Functions
function sharePaper(paperName, fileId) {
    const shareModal = document.getElementById('shareModal');
    const sharePaperInfo = document.getElementById('sharePaperInfo');
    const shareLink = document.getElementById('shareLink');
    
    if (sharePaperInfo) {
        sharePaperInfo.innerHTML = `
            <strong>${paperName}</strong>
            <div class="drive-link-info">
                <i class="fab fa-google-drive"></i> Stored in Google Drive
            </div>
        `;
    }
    if (shareLink) {
        shareLink.value = getDriveShareUrl(fileId);
    }
    if (shareModal) {
        shareModal.classList.add('active');
    }
}

function closeShareModal() {
    const shareModal = document.getElementById('shareModal');
    const copySuccess = document.getElementById('copySuccess');
    if (shareModal) {
        shareModal.classList.remove('active');
    }
    if (copySuccess) {
        copySuccess.classList.remove('show');
    }
}

function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    const copySuccess = document.getElementById('copySuccess');
    
    if (shareLink) {
        shareLink.select();
        shareLink.setSelectionRange(0, 99999);
        document.execCommand('copy');
        
        if (copySuccess) {
            copySuccess.classList.add('show');
            setTimeout(() => {
                copySuccess.classList.remove('show');
            }, 2000);
        }
    }
}

function shareViaWhatsApp() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        const text = encodeURIComponent(`Check out this question paper from CU Archive:`);
        const url = encodeURIComponent(shareLink.value);
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    }
}

function shareViaTelegram() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        const url = encodeURIComponent(shareLink.value);
        const text = encodeURIComponent('CU Archive Question Paper');
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    }
}

function shareViaEmail() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        const subject = encodeURIComponent('Question Paper from CU Archive');
        const body = encodeURIComponent(`Check out this question paper:\n\n${shareLink.value}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    }
}

// PDF Viewer Functions
function viewPaper(paperName, fileId) {
    const pdfViewerModal = document.getElementById('pdfViewerModal');
    const pdfViewerTitle = document.getElementById('pdfViewerTitle');
    const pdfViewerFrame = document.getElementById('pdfViewerFrame');
    
    if (pdfViewerTitle) {
        pdfViewerTitle.textContent = paperName;
    }
    if (pdfViewerFrame) {
        pdfViewerFrame.src = getDriveViewerUrl(fileId);
    }
    if (pdfViewerModal) {
        pdfViewerModal.classList.add('active');
    }
}

function closePdfViewer() {
    const pdfViewerModal = document.getElementById('pdfViewerModal');
    const pdfViewerFrame = document.getElementById('pdfViewerFrame');
    
    if (pdfViewerModal) {
        pdfViewerModal.classList.remove('active');
    }
    if (pdfViewerFrame) {
        pdfViewerFrame.src = 'about:blank';
    }
}

function downloadPaper(paperName, fileId) {
    // Trigger download from Google Drive
    window.open(getDriveDownloadUrl(fileId), '_blank');
}