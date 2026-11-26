/**
 * NOVLO - Multipurpose Services & Repair Theme
 * Clean, lightweight, custom JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Navigation
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Sticky Header and Back To Top Button
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Header shadow
        if (scrollPos > 60) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollPos > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }

        highlightActiveNav();
    });

    // 3. ScrollSpy Navigation
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightActiveNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. Animated Counters on Scroll
    const counters = document.querySelectorAll('.stat-number-val');
    let countersStarted = false;

    if (counters.length > 0) {
        const counterSection = document.querySelector('.counters-section');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const increment = target / 40;

                    const updateCounter = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count).toLocaleString() + "+";
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString() + "+";
                        }
                    };
                    updateCounter();
                });
                countersStarted = true;
                observer.disconnect();
            }
        }, { threshold: 0.4 });

        if (counterSection) {
            observer.observe(counterSection);
        }
    }

    // 5. Projects Filter Tabs
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. Set Min Date for Booking
    const dateInput = document.getElementById('custDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Initial estimate calculation
    calculateEstimate();
});

// 7. Real-Time Estimate Calculator
function calculateEstimate() {
    const serviceBase = parseFloat(document.getElementById('calcService')?.value || 150);
    const sizeMultiplier = parseFloat(document.getElementById('calcSize')?.value || 1.5);
    const urgency = parseFloat(document.querySelector('input[name="urgency"]:checked')?.value || 1);

    const baseEstimate = Math.round(serviceBase * sizeMultiplier * urgency);
    const highEstimate = Math.round(baseEstimate * 1.25);

    const priceDisplay = document.getElementById('calcPriceDisplay');
    if (priceDisplay) {
        priceDisplay.innerText = `$${baseEstimate} - $${highEstimate}`;
    }
}

// 8. Express Booking Form Handler
function handleFormSubmission(event) {
    event.preventDefault();
    const successBox = document.getElementById('bookingSuccessBox');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';
    }

    setTimeout(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Booking Request</span> <i class="fa-solid fa-paper-plane"></i>';
        }

        if (successBox) {
            successBox.style.display = 'flex';
            event.target.reset();

            const dateInput = document.getElementById('custDate');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }

            setTimeout(() => {
                successBox.style.display = 'none';
            }, 7000);
        }
    }, 900);
}
