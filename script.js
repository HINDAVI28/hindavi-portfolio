
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// CLOSE MENU AFTER CLICKING A LINK

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});


/* =====================================
   SELECTED WORK - HORIZONTAL SLIDER
===================================== */

const workTrack = document.getElementById("work-track");
const workViewport = document.getElementById("work-viewport");
const workNext = document.getElementById("work-next");
const workProgress = document.getElementById("work-progress-bar");

if (workTrack && workViewport && workNext && workProgress) {

    let currentPosition = 0;

    function getMaxScroll() {
        return Math.max(
            0,
            workTrack.scrollWidth - workViewport.clientWidth
        );
    }

    function updateWorkSlider() {

        const maxScroll = getMaxScroll();

        currentPosition = Math.max(
            0,
            Math.min(currentPosition, maxScroll)
        );

        workTrack.style.transform =
            `translateX(-${currentPosition}px)`;

        const progress = maxScroll > 0
            ? Math.max(33.33, (currentPosition / maxScroll) * 100)
            : 100;

        workProgress.style.width = `${progress}%`;

        workNext.setAttribute(
            "aria-label",
            currentPosition >= maxScroll - 2
                ? "Back to first projects"
                : "View next projects"
        );
    }

    workNext.addEventListener("click", () => {

        const cards = workTrack.querySelectorAll(".work-card");
        const maxScroll = getMaxScroll();

        if (!cards.length || maxScroll <= 0) return;

        const gap = parseFloat(
            getComputedStyle(workTrack).gap
        ) || 0;

        const step = cards[0].getBoundingClientRect().width + gap;

        if (currentPosition >= maxScroll - 2) {
            currentPosition = 0;
        } else {
            currentPosition = Math.min(
                currentPosition + step,
                maxScroll
            );
        }

        updateWorkSlider();
    });

    window.addEventListener("resize", updateWorkSlider);

    updateWorkSlider();
}
