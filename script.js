// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Menu Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const menuCategories = document.querySelectorAll('.menu-category');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and categories
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show target category
        const targetCategory = document.querySelector(`[data-category="${targetTab}"]`);
        if (targetCategory) {
            targetCategory.classList.add('active');
            // Smooth scroll to menu section
            setTimeout(() => {
                targetCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu categories
document.querySelectorAll('.menu-category').forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(category);
});

// Add hover effect to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Add click effect to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateX(-5px) scale(1.02)';
        }, 100);
    });
});

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add search functionality (optional - can be enhanced)
function searchMenuItems(searchTerm) {
    const menuItems = document.querySelectorAll('.menu-item');
    const searchLower = searchTerm.toLowerCase();
    
    menuItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchLower)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// Size Selector Functionality
document.querySelectorAll('.size-select').forEach(select => {
    select.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        const imgSrc = selectedOption.getAttribute('data-img');
        const menuItem = this.closest('.menu-item');
        
        // Update price
        const priceElement = menuItem.querySelector('.item-price');
        if (priceElement) {
            priceElement.textContent = price + ' JD';
        }
        
        // Update image
        const imgElement = menuItem.querySelector('.item-img');
        if (imgElement && imgSrc) {
            imgElement.style.opacity = '0.5';
            setTimeout(() => {
                imgElement.src = imgSrc;
                imgElement.onerror = function() {
                    this.src = 'https://via.placeholder.com/300x200/2d8659/ffffff?text=Food+Item';
                };
                imgElement.style.opacity = '1';
            }, 200);
        }
    });
});

// Hours Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hours-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Move slider
    const slider = document.getElementById('hoursSlider');
    if (slider) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
}

// Next button
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });
}

// Previous button
const prevBtn = document.getElementById('prevBtn');
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto slide
let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Start auto slide
if (slides.length > 0) {
    startAutoSlide();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.hours-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Initialize first slide
if (slides.length > 0) {
    showSlide(0);
}

// Console welcome message
console.log('%c🍽️ مطعم الدكتور | Doctor Restaurant 🍽️', 'color: #2d8659; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to our restaurant website!', 'color: #666; font-size: 14px;');

