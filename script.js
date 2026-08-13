// Until an avatar.png is dropped into this folder, show initials rather than a
// broken-image icon.
const avatar = document.getElementById('avatar');
if (avatar) {
    const useInitials = () => {
        const fallback = document.createElement('div');
        fallback.className = 'avatar avatar-fallback';
        fallback.textContent = 'SZ';
        fallback.setAttribute('aria-hidden', 'true');
        avatar.replaceWith(fallback);
    };

    avatar.addEventListener('error', useInitials, { once: true });

    // This script runs at the end of the body, so a missing file will already
    // have failed by now and the error event will never reach us.
    if (avatar.complete && avatar.naturalWidth === 0) useInitials();
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
