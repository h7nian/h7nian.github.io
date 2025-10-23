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
    
    // Initialize visitor map
    initVisitorMap();
});

// ==================== Visitor Map Functionality ====================

let visitorMap;
let heatLayer;

// Initialize the visitor map
function initVisitorMap() {
    // Initialize map
    const mapElement = document.getElementById('visitorMap');
    if (!mapElement) return;
    
    // Clean up demo data from localStorage on first load
    cleanupDemoData();
    
    visitorMap = L.map('visitorMap', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 8,
        worldCopyJump: true,
        zoomControl: true
    });
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(visitorMap);
    
    // Load visitor data
    loadVisitorData();
    
    // Track current visitor
    trackCurrentVisitor();
}

// Clean up demo data from localStorage
function cleanupDemoData() {
    const data = localStorage.getItem('visitorData');
    if (data) {
        try {
            const visitors = JSON.parse(data);
            // Remove all demo data
            const realVisitors = visitors.filter(v => v.ip !== 'demo');
            
            if (realVisitors.length !== visitors.length) {
                // Update localStorage with only real visitors
                if (realVisitors.length > 0) {
                    localStorage.setItem('visitorData', JSON.stringify(realVisitors));
                } else {
                    // Remove the key if no real visitors
                    localStorage.removeItem('visitorData');
                }
                console.log(`Cleaned up ${visitors.length - realVisitors.length} demo entries. Keeping ${realVisitors.length} real visitors.`);
            }
        } catch (e) {
            console.error('Error cleaning up demo data:', e);
        }
    }
}

// Load visitor data from localStorage and display on map
function loadVisitorData() {
    const visitors = getVisitorsFromStorage();
    
    // Filter out demo data - only show real visitors
    const realVisitors = visitors.filter(v => v.ip !== 'demo');
    
    if (realVisitors && realVisitors.length > 0) {
        displayHeatmap(realVisitors);
        updateStats(realVisitors);
    } else {
        // Show demo data only for display (not saved to localStorage)
        const demoData = generateDemoData();
        displayHeatmap(demoData);
        updateStats(demoData);
    }
}

// Get visitors from localStorage
function getVisitorsFromStorage() {
    const data = localStorage.getItem('visitorData');
    if (data) {
        try {
            const visitors = JSON.parse(data);
            // Filter out demo data when loading
            return visitors.filter(v => v.ip !== 'demo');
        } catch (e) {
            console.error('Error parsing visitor data:', e);
            return [];
        }
    }
    return [];
}

// Save visitor to localStorage
function saveVisitorToStorage(visitor) {
    let visitors = getVisitorsFromStorage();
    
    // Add timestamp
    visitor.timestamp = new Date().toISOString();
    
    // Add visitor (limit to 1000 most recent visitors)
    visitors.push(visitor);
    if (visitors.length > 1000) {
        visitors = visitors.slice(-1000);
    }
    
    localStorage.setItem('visitorData', JSON.stringify(visitors));
    
    // Update map
    loadVisitorData();
}

// Track current visitor using IP geolocation
async function trackCurrentVisitor() {
    try {
        // Check if visitor was already tracked in this session
        if (sessionStorage.getItem('visitorTracked')) {
            console.log('Visitor already tracked in this session');
            return;
        }
        
        // Use ipapi.co for geolocation (free tier: 1000 requests/day)
        const response = await fetch('https://ipapi.co/json/');
        
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        
        if (data.latitude && data.longitude) {
            const visitor = {
                lat: data.latitude,
                lng: data.longitude,
                city: data.city || 'Unknown',
                country: data.country_name || 'Unknown',
                countryCode: data.country_code || 'XX',
                ip: data.ip || 'Unknown'
            };
            
            saveVisitorToStorage(visitor);
            
            // Mark as tracked in this session
            sessionStorage.setItem('visitorTracked', 'true');
            
            // Add a marker for the current visitor
            const marker = L.marker([visitor.lat, visitor.lng], {
                icon: L.divIcon({
                    className: 'current-visitor-marker',
                    html: '<div style="background: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                    iconSize: [12, 12]
                })
            }).addTo(visitorMap);
            
            marker.bindPopup(`
                <div class="popup-content">
                    <h4>🎯 Your Location</h4>
                    <p><strong>City:</strong> ${visitor.city}</p>
                    <p><strong>Country:</strong> ${visitor.country}</p>
                </div>
            `);
            
            // Animate to the visitor's location
            setTimeout(() => {
                visitorMap.flyTo([visitor.lat, visitor.lng], 5, {
                    duration: 2
                });
            }, 1000);
        }
    } catch (error) {
        console.error('Error tracking visitor:', error);
        // If geolocation fails, still show demo data
    }
}

// Display heatmap on the map
function displayHeatmap(visitors) {
    // Remove existing heat layer if any
    if (heatLayer) {
        visitorMap.removeLayer(heatLayer);
    }
    
    // Prepare heat data: [lat, lng, intensity]
    const heatData = visitors.map(v => [v.lat, v.lng, 1]);
    
    // Create heat layer
    heatLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 35,
        maxZoom: 10,
        max: 1.0,
        gradient: {
            0.0: '#3b82f6',
            0.2: '#06b6d4',
            0.4: '#10b981',
            0.6: '#f59e0b',
            0.8: '#ef4444',
            1.0: '#dc2626'
        }
    }).addTo(visitorMap);
    
    // Add markers for major clusters (top 10 locations)
    const locationCounts = {};
    visitors.forEach(v => {
        const key = `${v.city}-${v.country}`;
        if (!locationCounts[key]) {
            locationCounts[key] = {
                count: 0,
                lat: v.lat,
                lng: v.lng,
                city: v.city,
                country: v.country
            };
        }
        locationCounts[key].count++;
    });
    
    // Sort by count and take top 10
    const topLocations = Object.values(locationCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    
    // Add markers for top locations
    topLocations.forEach(loc => {
        if (loc.count > 1) {
            const marker = L.circleMarker([loc.lat, loc.lng], {
                radius: Math.min(8 + Math.log(loc.count) * 3, 20),
                fillColor: '#6366f1',
                color: '#ffffff',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            }).addTo(visitorMap);
            
            marker.bindPopup(`
                <div class="popup-content">
                    <h4>📍 ${loc.city}</h4>
                    <p><strong>Country:</strong> ${loc.country}</p>
                    <p><strong>Visitors:</strong> ${loc.count}</p>
                </div>
            `);
        }
    });
}

// Update visitor statistics
function updateStats(visitors) {
    const totalVisitors = visitors.length;
    const uniqueCountries = new Set(visitors.map(v => v.countryCode)).size;
    
    // Animate numbers
    animateNumber('totalVisitors', totalVisitors);
    animateNumber('uniqueCountries', uniqueCountries);
}

// Animate number counter
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOutCubic);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// Generate demo data for initial display
function generateDemoData() {
    const cities = [
        { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'United States', countryCode: 'US' },
        { lat: 51.5074, lng: -0.1278, city: 'London', country: 'United Kingdom', countryCode: 'GB' },
        { lat: 35.6762, lng: 139.6503, city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
        { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France', countryCode: 'FR' },
        { lat: -33.8688, lng: 151.2093, city: 'Sydney', country: 'Australia', countryCode: 'AU' },
        { lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'United States', countryCode: 'US' },
        { lat: 52.5200, lng: 13.4050, city: 'Berlin', country: 'Germany', countryCode: 'DE' },
        { lat: 55.7558, lng: 37.6173, city: 'Moscow', country: 'Russia', countryCode: 'RU' },
        { lat: 39.9042, lng: 116.4074, city: 'Beijing', country: 'China', countryCode: 'CN' },
        { lat: 19.4326, lng: -99.1332, city: 'Mexico City', country: 'Mexico', countryCode: 'MX' },
        { lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
        { lat: 41.9028, lng: 12.4964, city: 'Rome', country: 'Italy', countryCode: 'IT' },
        { lat: -23.5505, lng: -46.6333, city: 'São Paulo', country: 'Brazil', countryCode: 'BR' },
        { lat: 28.6139, lng: 77.2090, city: 'New Delhi', country: 'India', countryCode: 'IN' },
        { lat: 25.2048, lng: 55.2708, city: 'Dubai', country: 'UAE', countryCode: 'AE' }
    ];
    
    const demoVisitors = [];
    cities.forEach(city => {
        // Add multiple visitors per city with slight variations
        const count = Math.floor(Math.random() * 8) + 3;
        for (let i = 0; i < count; i++) {
            demoVisitors.push({
                lat: city.lat + (Math.random() - 0.5) * 0.5,
                lng: city.lng + (Math.random() - 0.5) * 0.5,
                city: city.city,
                country: city.country,
                countryCode: city.countryCode,
                ip: 'demo',
                timestamp: new Date().toISOString()
            });
        }
    });
    
    return demoVisitors;
}

