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
// VIDEO MODAL FUNCTIONS
// =========================================

function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    const video = videoModal.querySelector('video');
    if (video) video.pause();
}

function setupVideoModal() {
    const videoBtn = document.getElementById('videoBtn');
    const systemBtn = document.getElementById('systemBtn');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!videoBtn || !videoModal) {
        console.log('Video elements not found');
        return;
    }
    
    if (videoBtn) {
        videoBtn.innerHTML = '🎬 Video Demo Sistem';
    }
    
    if (systemBtn) {
        systemBtn.innerHTML = '🌐 Sistem E-KokuPro';
    }
    
    videoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        createParticles(e, this);
        
        const video = videoModal.querySelector('video');
        if (video) {
            video.play().catch(err => {
                console.log('Auto-play blocked:', err);
            });
        }
    });
    
    if (systemBtn) {
        systemBtn.addEventListener('click', function(e) {
            createParticles(e, this);
            setTimeout(() => {
                window.open('https://ekokupro.teknokomsp1.com/', '_blank');
            }, 300);
        });
    }
    
    closeModal.addEventListener('click', closeVideoModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
}

// =========================================
// PDF MODAL FUNCTIONS
// =========================================

function openPDFModal(type, event) {
    const modal = document.getElementById(`pdfModal${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const viewer = document.getElementById(`pdfViewer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    
    if (type === 'pelajar') {
        viewer.src = 'Manual Pengguna Pelajar.pdf';
    } else {
        viewer.src = 'Manual Pengguna Pensyarah.pdf';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (event) {
        createParticles(event, event.target);
    }
}

function closePDFModal(type) {
    const modal = document.getElementById(`pdfModal${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const viewer = document.getElementById(`pdfViewer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    viewer.src = '';
}

function printPDF(type) {
    const url = type === 'pelajar' ? 'Manual Pengguna Pelajar.pdf' : 'Manual Pengguna Pensyarah.pdf';
    const printWindow = window.open(url, '_blank');
    printWindow.onload = function() {
        printWindow.print();
    };
}

function setupPDFModals() {
    const buttonGroup = document.querySelector('.button-group');
    
    // Remove existing PDF buttons if any
    const existingPelajar = document.getElementById('pdfPelajarBtn');
    const existingPensyarah = document.getElementById('pdfPensyarahBtn');
    if (existingPelajar) existingPelajar.remove();
    if (existingPensyarah) existingPensyarah.remove();
    
    // Create Pelajar PDF button
    const pdfPelajarBtn = document.createElement('button');
    pdfPelajarBtn.className = 'long-btn';
    pdfPelajarBtn.id = 'pdfPelajarBtn';
    pdfPelajarBtn.innerHTML = '📘 Manual Pengguna Pelajar';
    pdfPelajarBtn.addEventListener('click', function(e) {
        openPDFModal('pelajar', e);
    });
    
    // Create Pensyarah PDF button
    const pdfPensyarahBtn = document.createElement('button');
    pdfPensyarahBtn.className = 'long-btn';
    pdfPensyarahBtn.id = 'pdfPensyarahBtn';
    pdfPensyarahBtn.innerHTML = '📙 Manual Pengguna Pensyarah';
    pdfPensyarahBtn.addEventListener('click', function(e) {
        openPDFModal('pensyarah', e);
    });
    
    // Add buttons to group
    buttonGroup.appendChild(pdfPelajarBtn);
    buttonGroup.appendChild(pdfPensyarahBtn);
}

// =========================================
// HELPER FUNCTIONS
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
    if (!button) return;
    
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
