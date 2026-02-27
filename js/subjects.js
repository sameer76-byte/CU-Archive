// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking links
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) {
                mobileNav.classList.remove('active');
                const icon = mobileNavToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Dark Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    
    if (modeToggle) {
        const modeIcon = modeToggle.querySelector('i');
        
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (modeIcon) {
                modeIcon.classList.remove('fa-moon');
                modeIcon.classList.add('fa-sun');
            }
        }
        
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (modeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    modeIcon.classList.remove('fa-moon');
                    modeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    modeIcon.classList.remove('fa-sun');
                    modeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            }
        });
    }
    
    // Prevent event bubbling on action icons
    const actionIcons = document.querySelectorAll('.action-icon');
    actionIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Close modals when clicking outside
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) {
            closePdfViewer();
            closeShareModal();
        }
    };
});

// Drive URL Helpers
const getDriveViewerUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;
const getDriveDownloadUrl = (id) => `https://drive.google.com/uc?export=download&id=${id}`;
const getDriveShareUrl = (id) => `https://drive.google.com/file/d/${id}/view?usp=sharing`;

// View Modal
function viewPaper(name, id) {
    const viewerTitle = document.getElementById('pdfViewerTitle');
    const viewerFrame = document.getElementById('pdfViewerFrame');
    const viewerModal = document.getElementById('pdfViewerModal');
    
    if (viewerTitle) viewerTitle.textContent = name;
    if (viewerFrame) viewerFrame.src = getDriveViewerUrl(id);
    if (viewerModal) viewerModal.classList.add('active');
}

function closePdfViewer() {
    const viewerModal = document.getElementById('pdfViewerModal');
    const viewerFrame = document.getElementById('pdfViewerFrame');
    
    if (viewerModal) viewerModal.classList.remove('active');
    if (viewerFrame) viewerFrame.src = '';
}

// Download
function downloadPaper(name, id) {
    window.open(getDriveDownloadUrl(id), '_blank');
}

// Share Modal
function sharePaper(name, id) {
    const shareInfo = document.getElementById('sharePaperInfo');
    const shareLink = document.getElementById('shareLink');
    const shareModal = document.getElementById('shareModal');
    
    if (shareInfo) shareInfo.textContent = name;
    if (shareLink) shareLink.value = getDriveShareUrl(id);
    if (shareModal) shareModal.classList.add('active');
}

function closeShareModal() {
    const shareModal = document.getElementById('shareModal');
    const copySuccess = document.getElementById('copySuccess');
    
    if (shareModal) shareModal.classList.remove('active');
    if (copySuccess) copySuccess.style.display = 'none';
}

function copyShareLink() {
    const linkInput = document.getElementById('shareLink');
    const copySuccess = document.getElementById('copySuccess');
    
    if (linkInput) {
        linkInput.select();
        document.execCommand('copy');
        
        if (copySuccess) {
            copySuccess.style.display = 'block';
            setTimeout(() => {
                copySuccess.style.display = 'none';
            }, 2000);
        }
    }
}

// Social Links
function shareViaWhatsApp() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        const url = encodeURIComponent(shareLink.value);
        window.open(`https://wa.me/?text=Check this syllabus: ${url}`, '_blank');
    }
}

function shareViaTelegram() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        const url = encodeURIComponent(shareLink.value);
        window.open(`https://t.me/share/url?url=${url}&text=CU Archive`, '_blank');
    }
}

function shareViaEmail() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        window.open(`mailto:?subject=Syllabus&body=Link: ${shareLink.value}`);
    }
}

// Placeholder functions (to be implemented)
function viewPapers(course) {
    alert(`Viewing papers for ${course}`);
    // In production: window.location.href = `${course.toLowerCase()}-papers.html`;
}

function downloadPapers(course) {
    alert(`Downloading all papers for ${course}`);
    // In production: window.location.href = `/api/download/${course}`;
}

function shareCourse(course) {
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert(`Link copied to clipboard!`);
        }).catch(() => {
            prompt(`Share this course:`, url);
        });
    } else {
        prompt(`Share this course:`, url);
    }
}