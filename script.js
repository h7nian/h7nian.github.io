// Drop a square image into this folder under any of these names and it becomes
// the avatar; until one exists, show initials rather than a broken-image icon.
const AVATAR_FILES = ['avatar.png', 'avatar.jpg', 'avatar.jpeg', 'avatar.webp'];

const avatar = document.getElementById('avatar');
if (avatar) {
    let attempt = 0;

    const next = () => {
        attempt += 1;
        if (attempt < AVATAR_FILES.length) {
            avatar.src = AVATAR_FILES[attempt];
            return;
        }
        const fallback = document.createElement('div');
        fallback.className = 'avatar avatar-fallback';
        fallback.textContent = 'SZ';
        fallback.setAttribute('aria-hidden', 'true');
        avatar.replaceWith(fallback);
    };

    avatar.addEventListener('error', next);

    // This script runs at the end of the body, so a missing first file will
    // already have failed and its error event will never reach us.
    if (avatar.complete && avatar.naturalWidth === 0) next();
}

// Smooth scrolling for the section tabs.
// A bare "#" is not a valid CSS selector, so it must be filtered out before
// reaching querySelector.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Keep the URL and the keyboard focus in step with the jump.
        history.replaceState(null, '', href);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    });
});
