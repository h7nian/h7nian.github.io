// Drop a square image into this folder under any of these names and it becomes
// the avatar; until one exists, show initials rather than a broken-image icon.
const AVATAR_FILES = ['avatar.png', 'avatar.jpg', 'avatar.jpeg', 'avatar.webp'];

const avatar = document.getElementById('avatar');
if (avatar) {
    // The <img> starts on whichever file its src names; queue every other
    // name so each is tried exactly once, whatever order the list is in.
    const remaining = AVATAR_FILES.filter(f => f !== avatar.getAttribute('src'));

    const next = () => {
        const file = remaining.shift();
        if (file) {
            avatar.src = file;
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

// Move keyboard focus with in-page navigation. The browser keeps ownership of
// the actual anchor jump, URL history, and smooth-scrolling preference.
// A bare "#" is not a valid CSS selector, so it must be filtered out before
// reaching querySelector.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function () {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        target.setAttribute('tabindex', '-1');
        // Wait until the native anchor navigation has updated the URL and
        // scroll position, then keep keyboard focus in step with the jump.
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
    });
});
