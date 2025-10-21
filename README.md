# Personal Portfolio Website

A modern personal portfolio website to showcase your academic publications and skills.

## Features

- 📱 **Fully Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Beautiful gradients and animations
- ⚡ **Fast Loading** - Optimized code and resources
- 🌐 **Easy to Customize** - Simple HTML/CSS/JS structure
- 📚 **Publications Showcase** - Highlight your research papers and findings
- 📬 **Contact Form** - Easy way for visitors to reach you

## File Structure

```
personal-website/
├── index.html       # Main HTML file
├── styles.css       # All styles
├── script.js        # JavaScript interactions
└── README.md        # This file
```

## Usage Instructions

### 1. Basic Setup

Open `index.html` and update the following:

- **Personal Information**: Update your name and bio in the hero section
- **Social Links**: Update GitHub, LinkedIn, and email links
- **About Section**: Customize your personal introduction and skills
- **Publications**: Add or modify your academic papers and research outputs

### 2. Customize Publications

In the publications section of `index.html`, update for each paper:

```html
<div class="publication-card">
    <div class="publication-image">
        <i class="fas fa-file-alt"></i>
    </div>
    <div class="publication-content">
        <h3>Paper Title</h3>
        <p class="authors">Author Name et al. (2025)</p>
        <p class="journal"><i>Journal Name</i>, Volume(Issue), pages.</p>
        <p class="abstract">Abstract content...</p>
        <div class="publication-tags">
            <span class="tag">Research Area</span>
        </div>
        <div class="publication-links">
            <a href="paper-pdf-link" target="_blank">PDF</a>
            <a href="code-link" target="_blank">Code</a>
        </div>
    </div>
</div>
```

### 3. Customize Colors

Modify color variables in the `:root` section of `styles.css`:

```css
:root {
    --primary-color: #6366f1;  /* Primary color */
    --secondary-color: #8b5cf6; /* Secondary color */
    --dark-bg: #0f172a;         /* Dark background */
    --light-bg: #f8fafc;        /* Light background */
}
```

### 4. Skills Display

Update your skills and progress in the skills section of `index.html`:

```html
<div class="skill-card">
    <i class="fab fa-skill-icon"></i>
    <h3>Skill Name</h3>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 90%"></div>
    </div>
</div>
```

### 5. Contact Information

Update personal information in the contact section:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>Email</h4>
        <p>your.email@example.com</p>
    </div>
</div>
```

## Deploy to GitHub Pages

### Method 1: Via GitHub Web Interface

1. Create a new repository on GitHub named `username.github.io` (replace username with your GitHub username)
2. Upload all files to the repository
3. Visit `https://username.github.io` to view your website

### Method 2: Using Git Command Line

```bash
# In the personal-website folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

### Method 3: Deploy as Project Page

If you already have a `username.github.io` repository:

1. Create a new repository (e.g., `portfolio`)
2. Upload files
3. Enable GitHub Pages in Settings > Pages
4. Select main branch
5. Website will be available at `https://username.github.io/portfolio`

## Advanced Features

### GitHub API Integration

Uncomment the following code in `script.js` to automatically fetch your GitHub repositories:

```javascript
fetchGitHubRepos('yourusername');
```

### Theme Toggle

Uncomment the following code to enable dark/light theme switching:

```javascript
createThemeToggle();
```

### Form Integration

To make the contact form actually send emails, you can:

1. Use [Formspree](https://formspree.io/)
2. Use [EmailJS](https://www.emailjs.com/)
3. Integrate your own backend API

## Dependencies

- [Font Awesome 6.4.0](https://fontawesome.com/) - Icon library

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## License

This template is free to use and modify for personal and commercial projects.

## Support

For help, please check:

- [HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Changelog

### v1.0.0 (2025-10-20)
- Initial release
- Responsive design
- Academic publications showcase
- Contact form
- Smooth scrolling
- Animation effects

---

**Happy building!** 🚀

