// ^ Write your JavaScript code here


//navbar active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
    activeLinks()
})
activeLinks()

function activeLinks() {
    let currentsection;

    for (let i = 0; i < sections.length; i++) {
        if (scrollY >= sections[i].offsetTop) {
            currentsection = sections[i].getAttribute("id")
        }
    }

    for (let j = 0; j < navLinks.length; j++) {
        if (navLinks[j].getAttribute("href") == `#${currentsection}`) {
            navLinks[j].classList.add('active')
        }
        else {
            navLinks[j].classList.remove('active')
        }
    }
}


// dark mode
const savedMode = localStorage.getItem('theme');
if (savedMode === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}

function darkMode() {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}


//navs & tabs
const filterButtons = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        filterButtons.forEach(btn => {
            btn.classList.remove('active', 'from-primary', 'to-secondary');
            btn.classList.add('dark:bg-slate-800');
        });

        button.classList.add('active', 'bg-linear-to-r', 'from-primary', 'to-secondary');
        button.classList.remove('text-slate-600', 'dark:text-slate-300');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 1);
            } else {
                item.style.opacity = '0';
                item.style.display = 'none';
            }
        });
    });
});



//scroll button
const backToTopBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove("opacity-0", "invisible");
        backToTopBtn.classList.add("opacity-100", "visible");
    } else {
        backToTopBtn.classList.remove("opacity-100", "visible");
        backToTopBtn.classList.add("opacity-0", "invisible");
    }
});
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



//sidebar
document.addEventListener('DOMContentLoaded', () => {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsSidebar = document.getElementById('settings-sidebar');
    const closeSettings = document.getElementById('close-settings');

    const openSidebar = () => {
        settingsSidebar.classList.remove('translate-x-full');
        settingsSidebar.classList.add('translate-x-0');
        settingsToggle.style.right = '320px';
        settingsToggle.setAttribute('aria-expanded', 'true');
        settingsSidebar.setAttribute('aria-hidden', 'false');
    };

    const closeSidebar = () => {
        settingsSidebar.classList.remove('translate-x-0');
        settingsSidebar.classList.add('translate-x-full');
        settingsToggle.style.right = '0';
        settingsToggle.setAttribute('aria-expanded', 'false');
        settingsSidebar.setAttribute('aria-hidden', 'true');
    };

    settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = settingsSidebar.classList.contains('translate-x-0');
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    closeSettings.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSidebar();
    });

    document.addEventListener('click', (event) => {
        if (!settingsSidebar.contains(event.target) && !settingsToggle.contains(event.target)) {
            if (settingsSidebar.classList.contains('translate-x-0')) {
                closeSidebar();
            }
        }
    });

    //fonts
    const fontOptions = document.querySelectorAll('.font-option');
    const allFontClasses = ['font-alexandria', 'font-tajawal', 'font-cairo'];
    const applyFont = (selectedFont) => {
        document.body.classList.remove(...allFontClasses);
        document.body.classList.add(`font-${selectedFont}`);
        fontOptions.forEach(button => {
            const fontAttribute = button.getAttribute('data-font');

            if (fontAttribute === selectedFont) {
                button.classList.add('active');
                button.setAttribute('aria-checked', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-checked', 'false');
            }
        });
        localStorage.setItem('selected-font', selectedFont);
    };

    fontOptions.forEach(button => {
        button.addEventListener('click', () => {
            const fontName = button.getAttribute('data-font');
            applyFont(fontName);
        });
    });

    const savedFont = localStorage.getItem('selected-font') || 'tajawal';
    applyFont(savedFont);


    //colors
    const colorOptions = document.querySelectorAll('.color-option');
    const applyColor = (selectedColor) => {
        document.documentElement.style.setProperty('--color-primary', selectedColor);
        colorOptions.forEach(button => {
            const buttonColor = button.getAttribute('data-color');

            if (buttonColor === selectedColor) {
                button.classList.add('active', 'ring-4', 'ring-offset-2', 'ring-slate-400');
                button.setAttribute('aria-checked', 'true');
            } else {
                button.classList.remove('active', 'ring-4', 'ring-offset-2', 'ring-slate-400');
                button.setAttribute('aria-checked', 'false');
            }
        });
        localStorage.setItem('selected-color', selectedColor);
    };
    colorOptions.forEach(button => {
        button.addEventListener('click', () => {
            const colorValue = button.getAttribute('data-color');
            applyColor(colorValue);
        });
    });
    const savedColor = localStorage.getItem('selected-color') || '#8B5CF6';
    applyColor(savedColor);

    // Reset button
    const resetBtn = document.getElementById('reset-settings');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            applyFont('tajawal');
            applyColor('#8B5CF6');
        });
    }
});




// carousel
const cards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.querySelector("#next-testimonial");
const prevBtn = document.querySelector("#prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;

function getVisibleCardCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function updateCarousel() {
    const visibleCount = getVisibleCardCount();

    cards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + visibleCount) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });

    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

nextBtn.addEventListener("click", function () {
    const visibleCount = getVisibleCardCount();
    const maxIndex = cards.length - visibleCount;

    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener("click", function () {
    const visibleCount = getVisibleCardCount();
    const maxIndex = cards.length - visibleCount;

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateCarousel();
});

indicators.forEach((btn, btnIndex) => {
    btn.addEventListener("click", function () {
        const visibleCount = getVisibleCardCount();
        const maxIndex = cards.length - visibleCount;

        if (btnIndex <= maxIndex) {
            currentIndex = btnIndex;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });
});

window.addEventListener("resize", updateCarousel);
document.addEventListener("DOMContentLoaded", updateCarousel);
updateCarousel();






