// Theme toggle functionality - Solo cambia la navbar
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const navbar = document.getElementById('navbar');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        themeIcon.textContent = '🌙';
        navbar.classList.add('dark-mode');
        themeToggle.classList.add('dark-mode');
      
    } else {
        themeIcon.textContent = '☀️';
        navbar.classList.remove('dark-mode');
        themeToggle.classList.remove('dark-mode');
        
    }
});

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navbarNav = document.getElementById('navbarNav');
let isMobileMenuOpen = false;

mobileMenuToggle.addEventListener('click', () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        navbarNav.classList.add('show');
        mobileMenuToggle.textContent = '✕';
    } else {
        navbarNav.classList.remove('show');
        mobileMenuToggle.textContent = '☰';
    }
});

// Navigation links functionality
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get page name

        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            navbarNav.classList.remove('show');
            mobileMenuToggle.textContent = '☰';
            isMobileMenuOpen = false;
        }
    });
});

// User menu functionality
const userMenu = document.getElementById('userMenu');
const userDropdown = document.getElementById('userDropdown');
let isDropdownOpen = false;

userMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    
    if (isDropdownOpen) {
        userDropdown.classList.add('show');
    } else {
        userDropdown.classList.remove('show');
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userMenu.contains(e.target) && isDropdownOpen) {
        userDropdown.classList.remove('show');
        isDropdownOpen = false;
    }
});



// Language selector functionality
const languageSelect = document.getElementById('languageSelect');
languageSelect.addEventListener('change', (e) => {
    const languageNames = {
        'en': 'English',
        'es': 'Español', 
        'fr': 'Français',
        'de': 'Deutsch'
    };
    

});




// Close mobile menu when window is resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
        navbarNav.classList.remove('show');
        mobileMenuToggle.textContent = '☰';
        isMobileMenuOpen = false;
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (isDropdownOpen) {
            userDropdown.classList.remove('show');
            isDropdownOpen = false;
        }
        if (isMobileMenuOpen) {
            navbarNav.classList.remove('show');
            mobileMenuToggle.textContent = '☰';
            isMobileMenuOpen = false;
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNotification('LMS Portal loaded successfully!', 'success');
    console.log('LMS Portal Navigation loaded successfully with enhanced functionality!');
});