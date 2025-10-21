// Mobile navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu after clicking navigation link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Skills progress bar animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-progress').forEach(progress => {
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Publication card hover effect
document.querySelectorAll('.publication-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll animation observer
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Add fade-in animation to all publication cards
document.querySelectorAll('.publication-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Add fade-in animation to contact info items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(item);
});

// Typewriter effect (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// When the page loads, you can add typewriter effect to some elements
window.addEventListener('load', () => {
    // Example: Add typewriter effect to hero title (commented out, uncomment to use)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }
});

// GitHub API integration (optional)
// For dynamically fetching GitHub repository information
async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        
        // You can dynamically update publications section here
        console.log('GitHub Repos:', repos);
        
        // Example: Update publication cards
        // updatePublicationCards(repos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
}

// Uncomment and replace username to use
// fetchGitHubRepos('yourusername');

// Add theme toggle functionality (optional)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Uncomment to enable theme toggle
// createThemeToggle();

// Citation Modal Functionality
const citationModal = document.getElementById('citationModal');
const closeModal = document.querySelector('.close');
const copyCitationBtn = document.getElementById('copyCitation');

// Citation data for each publication
const citations = {
    'glmdp': `@article{zhang2025generalized,
  title={Generalized Linear Markov Decision Process},
  author={Zhang, Sinian and Zhang, Kaicheng and Xu, Ziping and Cai, Tianxi and Zhou, Doudou},
  journal={arXiv preprint arXiv:2506.00818},
  year={2025}
}`,
    'ehr_tutorial': `@inproceedings{huang2023post,
  title={A post-processing machine learning for activity recognition challenge with OpenStreetMap data},
  author={Huang, Shiyao and Lyu, Junliang and Zhang, Sinian and Tang, Ruiying and Xiao, Huan and Zhang, Yuanyuan and Lu, Xiaoling},
  booktitle={Adjunct Proceedings of the 2023 ACM International Joint Conference on Pervasive and Ubiquitous Computing \& the 2023 ACM International Symposium on Wearable Computing},
  pages={557--562},
  year={2023}
}`,
    'fuselinker': `@article{xiao2024fuselinker,
  title={FuseLinker: Leveraging LLM's pre-trained text embeddings and domain knowledge to enhance GNN-based link prediction on biomedical knowledge graphs},
  author={Xiao, Yongkang and Zhang, Sinian and Zhou, Huixue and Li, Mingchen and Yang, Han and Zhang, Rui},
  journal={Journal of Biomedical Informatics},
  volume={158},
  pages={104730},
  year={2024},
  publisher={Elsevier}
}`,
    'wasserstein': `@article{zhang2025wasserstein,
  title={Wasserstein Transfer Learning},
  author={Zhang, Kaicheng and Zhang, Sinian and Zhou, Doudou and Zhou, Yidong},
  journal={arXiv preprint arXiv:2505.17404},
  year={2025}
}`,
    'wreaths': `@article{liang2024wreaths,
  title={The wreaths of khan: Uniform graph feature selection with false discovery rate control},
  author={Liang, Jiajun and Liu, Yue and Zhou, Doudou and Zhang, Sinian and Lu, Junwei},
  journal={arXiv preprint arXiv:2403.12284},
  year={2024}
}`,
    'drkgc': `@article{xiao2025drkgc,
  title={DrKGC: Dynamic Subgraph Retrieval-Augmented LLMs for Knowledge Graph Completion across General and Biomedical Domains},
  author={Xiao, Yongkang and Zhang, Sinian and Dai, Yi and Zhou, Huixue and Hou, Jue and Ding, Jie and Zhang, Rui},
  journal={arXiv preprint arXiv:2506.00708},
  year={2025}
}`,
    'ehr_tutorial_2023': `@article{hou2023generate,
  title={Generate analysis-ready data for real-world evidence: tutorial for harnessing electronic health records with advanced informatic technologies},
  author={Hou, Jue and Zhao, Rachel and Gronsbell, Jessica and Lin, Yucong and Bonzel, Clara-Lea and Zeng, Qingyi and Zhang, Sinian and Beaulieu-Jones, Brett K and Weber, Griffin M and Jemielita, Thomas and others},
  journal={Journal of medical Internet research},
  volume={25},
  pages={e45662},
  year={2023},
  publisher={JMIR Publications Toronto, Canada}
}`,
    'activity_recognition': `@article{huang2025advancing,
  title={Advancing the Use of Longitudinal Electronic Health Records: Tutorial for Uncovering Real-World Evidence in Chronic Disease Outcomes},
  author={Huang, Feiqing and Hou, Jue and Zhou, Ningxuan and Greco, Kimberly and Lin, Chenyu and Sweet, Sara Morini and Wen, Jun and Shen, Lechen and Gonzalez, Nicolas and Zhang, Sinian and others},
  journal={Journal of Medical Internet Research},
  volume={27},
  pages={e71873},
  year={2025},
  publisher={JMIR Publications Toronto, Canada}
}`
};

// Show citation modal
function showCitation(citationKey) {
    const citationText = document.getElementById('citationText');
    citationText.textContent = citations[citationKey] || 'Citation not available';
    citationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.onclick = function() {
    citationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == citationModal) {
        citationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Copy citation to clipboard
copyCitationBtn.onclick = function() {
    const citationText = document.getElementById('citationText').textContent;
    navigator.clipboard.writeText(citationText).then(function() {
        const originalText = copyCitationBtn.innerHTML;
        copyCitationBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyCitationBtn.style.background = '#10b981';
        setTimeout(function() {
            copyCitationBtn.innerHTML = originalText;
            copyCitationBtn.style.background = '';
        }, 2000);
    }).catch(function(err) {
        alert('Failed to copy citation. Please try again.');
    });
}

// Add click handlers to all citation buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cite-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const citationKey = this.getAttribute('data-citation');
            showCitation(citationKey);
        });
    });
});

