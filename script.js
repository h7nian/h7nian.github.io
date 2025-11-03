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

// Copy citation to clipboard (compatible with all browsers including Safari)
copyCitationBtn.onclick = function() {
    const citationTextElement = document.getElementById('citationText');
    const citationText = citationTextElement.textContent;
    
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(citationText).then(function() {
            showCopySuccess();
        }).catch(function(err) {
            console.warn('Clipboard API failed, trying fallback method:', err);
            // Fallback to execCommand for Safari and older browsers
            fallbackCopyToClipboard(citationText);
        });
    } else {
        // Use fallback for browsers that don't support Clipboard API
        fallbackCopyToClipboard(citationText);
    }
    
    function showCopySuccess() {
        const originalText = copyCitationBtn.innerHTML;
        copyCitationBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyCitationBtn.style.background = '#10b981';
        setTimeout(function() {
            copyCitationBtn.innerHTML = originalText;
            copyCitationBtn.style.background = '';
        }, 2000);
    }
    
    function fallbackCopyToClipboard(text) {
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '2em';
        textarea.style.height = '2em';
        textarea.style.padding = '0';
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        textarea.style.opacity = '0';
        
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess();
            } else {
                alert('Failed to copy citation. Please manually select and copy the text.');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Failed to copy citation. Please manually select and copy the text.');
        }
        
        document.body.removeChild(textarea);
    }
};

// Fix Canvas performance warning
// Override getContext to automatically add willReadFrequently for 2d contexts
(function() {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, attributes) {
        if (type === '2d') {
            attributes = attributes || {};
            attributes.willReadFrequently = true;
        }
        return originalGetContext.call(this, type, attributes);
    };
})();

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
let firebaseDatabase;
let visitorsRef;

// Initialize the visitor map
function initVisitorMap() {
    // Initialize map
    const mapElement = document.getElementById('visitorMap');
    if (!mapElement) return;
    
    visitorMap = L.map('visitorMap', {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 8,
        worldCopyJump: true,
        zoomControl: true
    });
    
    // Map Tile Options - Choose one by uncommenting:
    
    // Option 1: CartoDB Voyager - Clean, clear borders, colorful
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(visitorMap);
    
    // Option 2: CartoDB Positron - Light, minimal style with clear borders
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(visitorMap);
    
    // Option 3: CartoDB Dark Matter - Dark theme with excellent contrast
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(visitorMap);
    
    // Option 4: Esri World Street Map (Current) - Very clear boundaries, professional look
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        maxZoom: 19
    }).addTo(visitorMap);
    
    // Initialize Firebase Database
    initFirebase();
    
    // Track current visitor
    trackCurrentVisitor();
}

// Initialize Firebase and setup real-time listener
function initFirebase() {
    try {
        // Check if Firebase is loaded
        if (typeof firebase === 'undefined') {
            console.error('❌ Firebase SDK not loaded');
            fallbackToLocalStorage();
            return;
        }
        
        // Check if Firebase is initialized
        if (!firebase.apps || firebase.apps.length === 0) {
            console.error('❌ Firebase not initialized. Check firebase-config.js');
            fallbackToLocalStorage();
            return;
        }
        
        firebaseDatabase = firebase.database();
        visitorsRef = firebaseDatabase.ref('visitors');
        
        console.log('🔄 Setting up Firebase real-time listener...');
        
        // Listen for real-time updates
        visitorsRef.on('value', (snapshot) => {
            const visitors = [];
            snapshot.forEach((childSnapshot) => {
                visitors.push(childSnapshot.val());
            });
            
            console.log(`📊 Loaded ${visitors.length} visitors from Firebase`);
            
            if (visitors.length > 0) {
                displayHeatmap(visitors);
                updateStats(visitors);
            } else {
                console.log('📭 No visitors in database yet');
                updateStats([]);
            }
        }, (error) => {
            console.error('❌ Firebase read error:', error);
            console.error('Error details:', error.code, error.message);
            // Fallback to localStorage if Firebase fails
            fallbackToLocalStorage();
        });
        
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        console.error('Error details:', error.message);
        // Fallback to localStorage if Firebase is not available
        fallbackToLocalStorage();
    }
}

// Fallback to localStorage if Firebase fails
function fallbackToLocalStorage() {
    console.warn('⚠️ Using localStorage fallback');
    const visitors = getVisitorsFromLocalStorage();
    if (visitors.length > 0) {
        displayHeatmap(visitors);
        updateStats(visitors);
    } else {
        updateStats([]);
    }
}

// Get visitors from localStorage (fallback only)
function getVisitorsFromLocalStorage() {
    const data = localStorage.getItem('visitorData');
    if (data) {
        try {
            const visitors = JSON.parse(data);
            return visitors.filter(v => v.ip !== 'demo');
        } catch (e) {
            console.error('Error parsing visitor data:', e);
            return [];
        }
    }
    return [];
}

// Save visitor to Firebase
async function saveVisitorToFirebase(visitor) {
    try {
        // Add timestamp
        visitor.timestamp = new Date().toISOString();
        
        // Create unique ID based on IP and timestamp to prevent duplicates
        const visitorId = btoa(visitor.ip + visitor.timestamp).replace(/[^a-zA-Z0-9]/g, '');
        
        console.log('💾 Attempting to save visitor to Firebase...', visitor.city, visitor.country);
        
        // Check if Firebase is available
        if (!visitorsRef) {
            throw new Error('Firebase reference not available');
        }
        
        // Save to Firebase
        await visitorsRef.child(visitorId).set(visitor);
        
        console.log('✅ Visitor saved to Firebase successfully!');
        
        // Also save to localStorage as backup
        saveToLocalStorageBackup(visitor);
        
    } catch (error) {
        console.error('❌ Error saving to Firebase:', error.message);
        console.error('Full error:', error);
        console.log('📝 Saving to localStorage instead...');
        // Fallback: save to localStorage
        saveToLocalStorageBackup(visitor);
    }
}

// Save to localStorage as backup
function saveToLocalStorageBackup(visitor) {
    let visitors = getVisitorsFromLocalStorage();
    visitors.push(visitor);
    if (visitors.length > 1000) {
        visitors = visitors.slice(-1000);
    }
    localStorage.setItem('visitorData', JSON.stringify(visitors));
}

// Track current visitor using IP geolocation
async function trackCurrentVisitor() {
    try {
        // Check if visitor was already tracked in this session
        if (sessionStorage.getItem('visitorTracked')) {
            console.log('✓ Visitor already tracked in this session');
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
            
            // Save to Firebase
            await saveVisitorToFirebase(visitor);
            
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
        console.error('❌ Error tracking visitor:', error);
    }
}

// Display heatmap on the map
function displayHeatmap(visitors) {
    // Remove existing heat layer if any
    if (heatLayer) {
        visitorMap.removeLayer(heatLayer);
    }
    
    // Filter out visitors with invalid coordinates and prepare heat data
    const validVisitors = visitors.filter(v => 
        v && 
        typeof v.lat === 'number' && 
        typeof v.lng === 'number' && 
        !isNaN(v.lat) && 
        !isNaN(v.lng) &&
        v.lat >= -90 && v.lat <= 90 &&
        v.lng >= -180 && v.lng <= 180
    );
    
    console.log(`📍 Valid visitors with coordinates: ${validVisitors.length} out of ${visitors.length}`);
    
    if (validVisitors.length === 0) {
        console.warn('⚠️ No valid visitor coordinates to display');
        return;
    }
    
    // Prepare heat data: [lat, lng, intensity]
    const heatData = validVisitors.map(v => [v.lat, v.lng, 1]);
    
    // Create heat layer with better visibility for sparse data
    heatLayer = L.heatLayer(heatData, {
        radius: 30,           // Increased from 25 for better visibility
        blur: 40,             // Increased from 35 for smoother appearance
        maxZoom: 10,
        max: 0.8,             // Reduced from 1.0 to make sparse points more visible
        minOpacity: 0.4,      // Added minimum opacity for sparse points
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
    validVisitors.forEach(v => {
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
    
    // Add markers for top locations (show all locations, even with count=1)
    topLocations.forEach(loc => {
        const marker = L.circleMarker([loc.lat, loc.lng], {
            radius: Math.min(8 + Math.log(Math.max(loc.count, 1.5)) * 3, 20),
            fillColor: loc.count > 1 ? '#6366f1' : '#10b981',  // Green for single visitor
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
