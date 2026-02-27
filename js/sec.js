// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
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
        } else {
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
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
        });
    });

    // Prevent event bubbling on action buttons
    const actionButtons = document.querySelectorAll('.paper-action');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('shareModal')) {
            closeShareModal();
        }
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('shareModal').classList.contains('active')) {
            closeShareModal();
        }
    });
});

// Google Drive Helper Functions
const DRIVE_FILE_ID = '17p46iWoyDBGReFI6JBW9rs0FyDpKNba1';

function getDriveViewerUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
}

function getDriveDownloadUrl(fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function getDriveShareUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

// View Paper
function viewPaper(fileId) {
    window.open(getDriveViewerUrl(fileId), '_blank');
}

// Download Paper
function downloadPaper(fileId) {
    window.open(getDriveDownloadUrl(fileId), '_blank');
}

// Share Modal Functions
let currentFileName = '';

function sharePaper(fileId, fileName) {
    const shareModal = document.getElementById('shareModal');
    const shareLink = document.getElementById('shareLink');
    const sharePaperInfo = document.getElementById('sharePaperInfo');
    
    currentFileName = fileName;
    sharePaperInfo.innerHTML = `<i class="fab fa-google-drive"></i> ${fileName}`;
    shareLink.value = getDriveShareUrl(fileId);
    shareModal.classList.add('active');
}

function closeShareModal() {
    const shareModal = document.getElementById('shareModal');
    const copySuccess = document.getElementById('copySuccess');
    shareModal.classList.remove('active');
    if (copySuccess) copySuccess.classList.remove('show');
}

function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    const copySuccess = document.getElementById('copySuccess');
    
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    copySuccess.classList.add('show');
    setTimeout(() => {
        copySuccess.classList.remove('show');
    }, 2000);
}