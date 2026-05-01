function toggleMenu() {
    document.querySelector('.nav-shape').classList.toggle('show');
}

function toggleDropdown(e, el) {
    e.preventDefault();
    e.stopPropagation();
    
    const panel = el.nextElementSibling;
    
    // Toggle class
    panel.classList.toggle('open');
    
    // Optional: Chevron icon ko rotate karne ke liye logic (agar zaroorat ho)
    const icon = el.querySelector('i');
    if (panel.classList.contains('open')) {
        icon.style.transform = "rotate(180deg)";
    } else {
        icon.style.transform = "rotate(0deg)";
    }
}
// Auto set active nav link based on current page
(function() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-shape a').forEach(function(link) {
        var href = link.getAttribute('href');
        link.classList.remove('active');
        if (!href || href.startsWith('http')) return;
        var linkFile = href.split('/').pop();
        if (linkFile === currentFile) {
            link.classList.add('active');
        }
    });
})();


    // home slider


    let slideIndex = 0;
let slideTimer;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    if (!slides.length) return;

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("active"));

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].style.display = "block";

    document.querySelectorAll(`.pagination`).forEach(p => {
        p.children[slideIndex - 1].classList.add("active");
    });

    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 3000);
}

// Manual click function
function currentSlide(n) {
    slideIndex = n; // slideIndex ko update karein (0-based for array)
    showSlidesManually();
}

function showSlidesManually() {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("active"));

    if (slideIndex >= slides.length) { slideIndex = 0 }

    slides[slideIndex].style.display = "block";
    
    document.querySelectorAll(`.pagination`).forEach(p => {
        p.children[slideIndex].classList.add("active");
    });

    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 3000);
}

// Start initial slider
showSlides();


// testmonial StaticRange





function handleCardToggle(element) {
    const grid = document.getElementById('exerciseGrid');
    const allCards = grid.querySelectorAll('.exercise-card');

    // Remove active class from all other cards
    allCards.forEach(card => {
        if (card !== element) {
            card.classList.remove('is-active');
        }
    });

    // Toggle the clicked card
    element.classList.toggle('is-active');
}
// Auto-scroll slider with dots
function initSlider(sliderId, dotsId, interval) {
    const slider = document.getElementById(sliderId);
    const dots = document.querySelectorAll('#' + dotsId + ' .sdot');
    if (!slider || !dots.length) return;

    const total = dots.length;
    let current = 0;
    let timer = null;
    let isPaused = false;

    function getCardWidth() {
        const first = slider.firstElementChild;
        return first ? first.offsetWidth + 16 : slider.offsetWidth;
    }

    // Animate scrollLeft directly — bypasses scroll-snap conflict
    function animateScroll(target, duration) {
        const start = slider.scrollLeft;
        const change = target - start;
        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const p = Math.min(elapsed / duration, 1);
            const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            slider.scrollLeft = start + change * ease;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function goTo(index) {
        current = (index + total) % total;
        animateScroll(current * getCardWidth(), 600);
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
        clearInterval(timer);
        timer = setInterval(() => { if (!isPaused) goTo(current + 1); }, interval || 3000);
    }

    function pause() { isPaused = true; clearInterval(timer); }
    function resume() { isPaused = false; startAuto(); }

    // Sync dots on manual swipe
    slider.addEventListener('scroll', () => {
        const index = Math.min(Math.round(slider.scrollLeft / getCardWidth()), total - 1);
        current = index;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    });

    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);
    slider.addEventListener('touchstart', pause, { passive: true });
    slider.addEventListener('touchend', () => setTimeout(resume, 1500));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { pause(); goTo(i); setTimeout(resume, 3000); });
    });

    startAuto();
}

// Use window load so card widths are fully calculated
window.addEventListener('load', () => {
    initSlider('f24Slider', 'f24Dots', 3000);
    initSlider('pricingSlider', 'pricingDots', 3500);
});

// Spec tabs (Bestgyminbury page)
function openSpec(e, tabId) {
    e.preventDefault();
    document.querySelectorAll('.spec-tab-content').forEach(function(t) { t.style.display = 'none'; });
    document.querySelectorAll('.spec-nav-item').forEach(function(b) { b.classList.remove('active'); });
    var tab = document.getElementById(tabId);
    if (tab) tab.style.display = 'block';
    e.currentTarget.classList.add('active');
}
// Show first tab on load
(function() {
    var first = document.querySelector('.spec-tab-content');
    if (first) {
        document.querySelectorAll('.spec-tab-content').forEach(function(t) { t.style.display = 'none'; });
        first.style.display = 'block';
    }
})();

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = this.closest('.faq-item');
        var isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
        if (!isOpen) item.classList.add('active');
    });
});

// Scroll reveal animations
(function() {
    var els = document.querySelectorAll('.anim-reveal');
    if (!els.length) return;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(function(el) { observer.observe(el); });
})();






