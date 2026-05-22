document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.getElementById('menuOverlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    const showSliderSlide = (n) => {
        if (!slides.length) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    const nextSliderSlide = () => showSliderSlide(currentSlide + 1);
    const prevSliderSlide = () => showSliderSlide(currentSlide - 1);

    const startSliderInterval = () => {
        slideInterval = setInterval(nextSliderSlide, 5000);
    };

    const resetSliderInterval = () => {
        clearInterval(slideInterval);
        startSliderInterval();
    };

    if (slides.length > 0) {
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSliderSlide(); resetSliderInterval(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSliderSlide(); resetSliderInterval(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSliderSlide(index);
                resetSliderInterval();
            });
        });

        startSliderInterval();
    }

    // --- Reviews Slider Logic ---
    const reviewsTrack = document.getElementById('reviewsTrack');
    const prevReview = document.getElementById('prevReview');
    const nextReview = document.getElementById('nextReview');
    const sliderMain = document.querySelector('.reviews-slider-main');

    if (reviewsTrack && prevReview && nextReview && sliderMain) {
        nextReview.addEventListener('click', () => {
            const cardWidth = sliderMain.clientWidth;
            reviewsTrack.scrollBy({ left: cardWidth -20, behavior: 'smooth' });
        });

        prevReview.addEventListener('click', () => {
            const cardWidth = sliderMain.clientWidth;
            reviewsTrack.scrollBy({ left: -cardWidth +20, behavior: 'smooth' });
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        reviewsTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - reviewsTrack.offsetLeft;
            scrollLeft = reviewsTrack.scrollLeft;
            reviewsTrack.style.cursor = 'grabbing';
        });

        reviewsTrack.addEventListener('mouseleave', () => {
            isDown = false;
            reviewsTrack.style.cursor = 'grab';
        });

        reviewsTrack.addEventListener('mouseup', () => {
            isDown = false;
            reviewsTrack.style.cursor = 'grab';
        });

        reviewsTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsTrack.offsetLeft;
            const walk = (x - startX) * 2;
            reviewsTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // --- Descriptions Toggle ---
    const toggleBtn = document.getElementById('toggleDescs');
    const extraDescs = document.getElementById('extraDescs');

    if (toggleBtn && extraDescs) {
        toggleBtn.addEventListener('click', () => {
            if (extraDescs.style.display === 'none') {
                extraDescs.style.display = 'flex';
                toggleBtn.textContent = 'Ver menos';
            } else {
                extraDescs.style.display = 'none';
                toggleBtn.textContent = 'Ver más';
                document.getElementById('descContainer').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});


// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Acceso denegado. Solo para mayores de 18 años.");
    window.close();
    window.location.href = "https://www.google.es";
});

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
        } else {
            warn.style.display = "";
        }
    });
}


const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three > span, .foot-cont-three > p");
city.addEventListener("click", toggleCont);
function toggleCont() {
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

