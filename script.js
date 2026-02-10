// =========================================
// SLIDER FUNCTIONS
// =========================================

const senaraiGambar = [
    'images/ui1.png', 
    'images/ui2.png', 
    'images/ui3.png',
    'images/ui4.png'
];

let indexSekarang = 0;
const imgElement = document.getElementById('mainSlider');

function kemaskiniGambar() {
    const gambarUrl = senaraiGambar[indexSekarang];
    
    imgElement.style.transform = 'scale(1.1) rotate(1deg)';
    imgElement.style.opacity = '0';
    imgElement.style.filter = 'blur(5px)';
    
    setTimeout(() => {
        imgElement.src = gambarUrl;
        imgElement.alt = `UI Sistem ${indexSekarang + 1}`;
        
        imgElement.style.transform = 'scale(1) rotate(0deg)';
        imgElement.style.opacity = '1';
        imgElement.style.filter = 'blur(0)';
        imgElement.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        imgElement.style.boxShadow = '0 0 30px rgba(255, 204, 0, 0.5)';
        setTimeout(() => {
            imgElement.style.boxShadow = 'none';
        }, 1000);
        
    }, 300);
}

document.getElementById('next').addEventListener('click', () => {
    const btn = document.getElementById('next');
    btn.style.transform = 'scale(1.2) rotate(5deg)';
    btn.style.backgroundColor = '#ffcc00';
    btn.style.boxShadow = '0 0 20px #ffcc00';
    
    indexSekarang = (indexSekarang + 1) % senaraiGambar.length;
    kemaskiniGambar();
    
    setTimeout(() => {
        btn.style.transform = 'scale(1) rotate(0deg)';
        btn.style.backgroundColor = '#0099cc';
        btn.style.boxShadow = '0 0 10px rgba(0, 153, 204, 0.5)';
    }, 300);
});

document.getElementById('prev').addEventListener('click', () => {
    const btn = document.getElementById('prev');
    btn.style.transform = 'scale(1.2) rotate(-5deg)';
    btn.style.backgroundColor = '#ffcc00';
    btn.style.boxShadow = '0 0 20px #ffcc00';
    
    indexSekarang = (indexSekarang - 1 + senaraiGambar.length) % senaraiGambar.length;
    kemaskiniGambar();
    
    setTimeout(() => {
        btn.style.transform = 'scale(1) rotate(0deg)';
        btn.style.backgroundColor = '#0099cc';
        btn.style.boxShadow = '0 0 10px rgba(0, 153, 204, 0.5)';
    }, 300);
});

// =========================================
// VIDEO MODAL FUNCTIONS (BARU)
// =========================================

// Setup Video Modal
function setupVideoModal() {
    const videoBtn = document.getElementById('videoBtn');
    const systemBtn = document.getElementById('systemBtn');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!videoBtn || !videoModal) {
        console.log('Video elements not found');
        return;
    }
    
    // Update button texts
    if (videoBtn) {
        videoBtn.innerHTML = '🎬 Video Semasa Sistem Digunakan';
    }
    
    if (systemBtn) {
        systemBtn.innerHTML = '🌐 Sistem E-KokuPro';
    }
    
    // Open video modal
    videoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Particle effect
        createParticles(e, this);
        
        // Auto-play video jika ada
        const video = videoModal.querySelector('video');
        if (video) {
            video.play().catch(err => {
                console.log('Auto-play blocked:', err);
            });
        }
    });
    
    // Open system link
    if (systemBtn) {
        systemBtn.addEventListener('click', function(e) {
            createParticles(e, this);
            setTimeout(() => {
                window.open('https://ekokupro.teknokomsp1.com/', '_blank');
            }, 300);
        });
    }
    
    // Close modal
    closeModal.addEventListener('click', function() {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Pause video jika sedang main
        const video = videoModal.querySelector('video');
        if (video) {
            video.pause();
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            const video = videoModal.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            const video = videoModal.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
}

// =========================================
// HELPER FUNCTIONS (dari code asal)
// =========================================

// Touch/Swipe Support
let touchStartX = 0;
let touchEndX = 0;

const sliderBox = document.querySelector('.slider-box');
if (sliderBox) {
    sliderBox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderBox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        document.getElementById('next').click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        document.getElementById('prev').click();
    }
}

// Particle Effect
function createParticles(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = '#ffcc00';
        particle.style.borderRadius = '50%';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        button.style.position = 'relative';
        button.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const duration = 800 + Math.random() * 400;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${Math.cos(angle) * speed * 50}px, ${Math.sin(angle) * speed * 50}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        setTimeout(() => {
            particle.remove();
        }, duration);
    }
}

// Floating Particles
function createFloatingParticles() {
    const colors = ['#0099cc', '#ffcc00', '#ffffff'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = '0.3';
        particle.style.zIndex = '-1';
        particle.style.pointerEvents = 'none';
        
        document.body.appendChild(particle);
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${Math.sin(Date.now() * 0.001) * 50}px, ${Math.cos(Date.now() * 0.001) * 50}px)` }
    ], {
        duration: 5000 + Math.random() * 10000,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// Typing Effect
function typingEffect() {
    const title = document.querySelector('.main-title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            
            if (i < originalText.length) {
                title.style.borderRight = '2px solid #ffcc00';
            } else {
                title.style.borderRight = 'none';
                clearInterval(typing);
                
                title.style.textShadow = '0 0 20px rgba(255, 204, 0, 0.8)';
                setTimeout(() => {
                    title.style.textShadow = '2px 2px 15px rgba(0, 153, 204, 0.8)';
                }, 1000);
            }
        }
    }, 50);
}

// =========================================
// MOBILE NAVIGATION FUNCTIONS
// =========================================

function setupMobileNavigation() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburgerBtn) return;
    
    // Toggle menu when hamburger clicked
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('show');
        hamburgerBtn.classList.toggle('active');
        
        // Particle effect for fun
        createParticles(e, this);
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
        }
    });
    
    // Close menu on scroll (optional)
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
        }
    });
    
    // Add touch/swipe to close menu (mobile only)
    let touchStartX = 0;
    let touchEndX = 0;
    
    navMenu.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].clientX;
    });
    
    navMenu.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        // Swipe right to close
        if (touchEndX - touchStartX > 100) {
            navMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
        }
    });
}

// Update the initialization function
window.addEventListener('load', function() {
    console.log('🚀 E-KokuPro System Ready!');
    
    // Load gambar pertama
    kemaskiniGambar();
    
    // Setup semua fungsi
    setupVideoModal();
    setupMobileNavigation(); // ← TAMBAH INI
    typingEffect();
    createFloatingParticles();
    
    // Auto slide setiap 8 saat
    setInterval(() => {
        document.getElementById('next').click();
    }, 8000);
    
    console.log('🎮 Keyboard Shortcuts:');
    console.log('   ← → : Navigate slider');
    console.log('   Escape : Close video modal');
    console.log('   Touch/Swipe : Mobile navigation');
});

console.log('✨ Sistem video siap! Klik button video untuk buka demo.');
// Highlight active section in nav
function setupActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
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
}

// Call function dalam load event:
// setupActiveSection();
