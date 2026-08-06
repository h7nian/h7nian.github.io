// ==================== Navigation ====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function setMenuOpen(open) {
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('active'));
});

// Close menu after clicking navigation link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

// Smooth scrolling.
// A bare "#" is not a valid CSS selector, so it must be filtered out before
// reaching querySelector.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset <= 0
        ? '0 2px 10px rgba(0, 0, 0, 0.1)'
        : '0 4px 20px rgba(0, 0, 0, 0.15)';
});

// ==================== Scroll-in animations ====================

const fadeInObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Respect users who have asked for reduced motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function addFadeIn(selector, startTransform) {
    if (prefersReducedMotion) return;
    document.querySelectorAll(selector).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = startTransform;
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });
}

addFadeIn('.publication-card', 'translateY(30px)');
addFadeIn('.contact-item', 'translateX(-30px)');

// ==================== Citations ====================

const citationModal = document.getElementById('citationModal');
const closeModal = document.querySelector('.modal-close');
const copyCitationBtn = document.getElementById('copyCitation');
let lastFocusedElement = null;

// Citation data for each publication
const citations = {
    'gualo': `@inproceedings{wang2026gualo,
  title={GUALO: A Generalizable Uncertainty-Aware AI Agent for Logic Optimization},
  author={Wang, Jingxin and Zhang, Sinian and Liang, Yun and Lin, Yibo and Ren, Pengpeng and Wang, Runsheng and Qian, Weikang},
  booktitle={IEEE/ACM International Conference on Computer-Aided Design (ICCAD)},
  year={2026}
}`,
    'selective_prediction': `@article{luo2026aligning,
  title={Aligning Language Models with Selective Prediction},
  author={Luo, Gaoxiang and Wu, Yifan and Zhang, Sinian and Deshwal, Aryan and Sun, Ju},
  journal={arXiv preprint arXiv:2607.03528},
  year={2026}
}`,
    'ad_worsening': `@article{venkatesh2026predicting,
  title={Predicting the timing of first sustained cognitive worsening in Alzheimer's disease using real-world clinical data and machine learning},
  author={Venkatesh, Shruthi and Zhang, Sinian and Zhu, Wen and Morris, Michele and Mercurio, Rocco and Berman, Sarah B and Mathys, Hansruedi and Olsen, Abby L and Shaaban, C. Elizabeth and Visweswaran, Shyam and Lopez, Oscar L and Cai, Tianxi and Hou, Jue and Xia, Zongqi},
  journal={medRxiv},
  doi={10.64898/2026.06.02.26354764},
  year={2026}
}`,
    'antidiabetic_hf': `@article{jodlowskasiewert2026antidiabetic,
  title={Antidiabetic Drug Associations With Heart Failure Outcomes: Real-World Evidence Study Using Electronic Health Records},
  author={Jodlowska-Siewert, Elzbieta and Chen, Yunhui and Zhang, Sinian and Li, Jia and Dellavalle, Robert and Zhang, Rui and Hou, Jue},
  journal={JMIR Diabetes},
  volume={11},
  pages={e85083},
  doi={10.2196/85083},
  year={2026},
  publisher={JMIR Publications Toronto, Canada}
}`,
    'glmdp': `@article{zhang2025generalized,
  title={Generalized Linear Markov Decision Process},
  author={Zhang, Sinian and Zhang, Kaicheng and Xu, Ziping and Cai, Tianxi and Zhou, Doudou},
  journal={arXiv preprint arXiv:2506.00818},
  year={2025}
}`,
    'ehr_tutorial': `@article{huang2025advancing,
  title={Advancing the Use of Longitudinal Electronic Health Records: Tutorial for Uncovering Real-World Evidence in Chronic Disease Outcomes},
  author={Huang, Feiqing and Hou, Jue and Zhou, Ningxuan and Greco, Kimberly and Lin, Chenyu and Sweet, Sara Morini and Wen, Jun and Shen, Lechen and Gonzalez, Nicolas and Zhang, Sinian and others},
  journal={Journal of Medical Internet Research},
  volume={27},
  pages={e71873},
  year={2025},
  publisher={JMIR Publications Toronto, Canada}
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
    'wasserstein': `@inproceedings{zhang2025wasserstein,
  title={Wasserstein Transfer Learning},
  author={Zhang, Kaicheng and Zhang, Sinian and Zhou, Doudou and Zhou, Yidong},
  booktitle={Advances in Neural Information Processing Systems},
  year={2025}
}`,
    'wreaths': `@article{liang2024wreaths,
  title={The wreaths of KHAN: Uniform graph feature selection with false discovery rate control},
  author={Liang, Jiajun and Liu, Yue and Zhou, Doudou and Zhang, Sinian and Lu, Junwei},
  journal={arXiv preprint arXiv:2403.12284},
  year={2024}
}`,
    'drkgc': `@inproceedings{xiao2025drkgc,
  title={DrKGC: Dynamic Subgraph Retrieval-Augmented LLMs for Knowledge Graph Completion across General and Biomedical Domains},
  author={Xiao, Yongkang and Zhang, Sinian and Dai, Yi and Zhou, Huixue and Hou, Jue and Ding, Jie and Zhang, Rui},
  booktitle={Findings of the Association for Computational Linguistics: EMNLP 2025},
  pages={16432--16445},
  doi={10.18653/v1/2025.findings-emnlp.892},
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
    'activity_recognition': `@inproceedings{huang2023post,
  title={A post-processing machine learning for activity recognition challenge with OpenStreetMap data},
  author={Huang, Shiyao and Lyu, Junliang and Zhang, Sinian and Tang, Ruiying and Xiao, Huan and Zhang, Yuanyuan and Lu, Xiaoling},
  booktitle={Adjunct Proceedings of the 2023 ACM International Joint Conference on Pervasive and Ubiquitous Computing \& the 2023 ACM International Symposium on Wearable Computing},
  pages={557--562},
  year={2023}
}`
};

function openCitation(citationKey) {
    lastFocusedElement = document.activeElement;
    document.getElementById('citationText').textContent =
        citations[citationKey] || 'Citation not available';
    citationModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeModal.focus();
}

function closeCitation() {
    citationModal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
}

closeModal.addEventListener('click', closeCitation);

// Click on the backdrop (but not inside the dialog) closes the modal.
citationModal.addEventListener('click', (event) => {
    if (event.target === citationModal) closeCitation();
});

document.addEventListener('keydown', (event) => {
    if (!citationModal.classList.contains('open')) return;

    if (event.key === 'Escape') {
        closeCitation();
        return;
    }

    // Keep Tab focus inside the dialog while it is open.
    if (event.key === 'Tab') {
        const focusable = citationModal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

// Copy citation to clipboard (with a fallback for older Safari)
copyCitationBtn.addEventListener('click', function() {
    const citationText = document.getElementById('citationText').textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citationText)
            .then(showCopySuccess)
            .catch(function(err) {
                console.warn('Clipboard API failed, trying fallback method:', err);
                fallbackCopyToClipboard(citationText);
            });
    } else {
        fallbackCopyToClipboard(citationText);
    }

    function showCopySuccess() {
        const originalText = copyCitationBtn.innerHTML;
        copyCitationBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied!';
        copyCitationBtn.style.background = '#10b981';
        setTimeout(function() {
            copyCitationBtn.innerHTML = originalText;
            copyCitationBtn.style.background = '';
        }, 2000);
    }

    function fallbackCopyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            if (document.execCommand('copy')) {
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
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cite-btn').forEach(button => {
        button.addEventListener('click', function() {
            openCitation(this.getAttribute('data-citation'));
        });
    });

    initVisitorMap();
});

// ==================== Visitor Map ====================
//
// Privacy note: visitor records deliberately contain no IP address and no
// precise coordinates. Coordinates are rounded to ~1 km and the record key is
// a Firebase push id, so nothing stored in the database identifies a person.

let visitorMap;
let heatLayer;
let firebaseDatabase;
let visitorsRef;

// Coordinates are rounded to two decimals (~1.1 km). The map never zooms in
// past level 8, so this costs nothing visually.
const COORD_PRECISION = 2;

function roundCoord(value) {
    return Math.round(value * 10 ** COORD_PRECISION) / 10 ** COORD_PRECISION;
}

// Records come from a database that clients can write to, so treat every
// string field as untrusted and never interpolate it into innerHTML.
function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[ch]);
}

// Helper function to normalize country names
function normalizeCountryName(country) {
    // Normalize Hong Kong, Taiwan, and Macau to China
    if (country === 'Hong Kong' || country === 'Taiwan' || country === 'Macau' || country === 'Macao') {
        return 'China';
    }
    return country;
}

// Drop anything that is not a well-formed visitor record.
function isValidVisitor(v) {
    return v &&
        typeof v.lat === 'number' &&
        typeof v.lng === 'number' &&
        !isNaN(v.lat) &&
        !isNaN(v.lng) &&
        v.lat >= -90 && v.lat <= 90 &&
        v.lng >= -180 && v.lng <= 180;
}

// Initialize the visitor map
function initVisitorMap() {
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

    // CartoDB Voyager: clean, clear borders, no CORS issues.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(visitorMap);

    initFirebase();
    trackCurrentVisitor();
}

// Initialize Firebase and setup real-time listener
function initFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK not loaded');
            fallbackToLocalStorage();
            return;
        }

        if (!firebase.apps || firebase.apps.length === 0) {
            console.error('Firebase not initialized. Check firebase-config.js');
            fallbackToLocalStorage();
            return;
        }

        firebaseDatabase = firebase.database();
        visitorsRef = firebaseDatabase.ref('visitors');

        visitorsRef.on('value', (snapshot) => {
            const visitors = [];
            snapshot.forEach((childSnapshot) => {
                const v = childSnapshot.val();
                if (isValidVisitor(v)) visitors.push(v);
            });

            if (visitors.length > 0) {
                displayHeatmap(visitors);
            }
            updateStats(visitors);
        }, (error) => {
            console.error('Firebase read error:', error.code, error.message);
            fallbackToLocalStorage();
        });

    } catch (error) {
        console.error('Firebase initialization error:', error.message);
        fallbackToLocalStorage();
    }
}

// Fallback to localStorage if Firebase fails
function fallbackToLocalStorage() {
    console.warn('Using localStorage fallback');
    const visitors = getVisitorsFromLocalStorage();
    if (visitors.length > 0) {
        displayHeatmap(visitors);
    }
    updateStats(visitors);
}

// Get visitors from localStorage (fallback only)
function getVisitorsFromLocalStorage() {
    const data = localStorage.getItem('visitorData');
    if (!data) return [];

    try {
        const visitors = JSON.parse(data);
        return Array.isArray(visitors) ? visitors.filter(isValidVisitor) : [];
    } catch (e) {
        console.error('Error parsing visitor data:', e);
        return [];
    }
}

// Save visitor to Firebase under a generated push id.
async function saveVisitorToFirebase(visitor) {
    try {
        if (!visitorsRef) {
            throw new Error('Firebase reference not available');
        }
        // push() generates a random, non-identifying key.
        await visitorsRef.push(visitor);
        saveToLocalStorageBackup(visitor);
    } catch (error) {
        console.error('Error saving to Firebase:', error.message);
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

// Track current visitor using IP geolocation.
// The IP itself is used only to resolve a city and is never stored.
async function trackCurrentVisitor() {
    try {
        if (sessionStorage.getItem('visitorTracked')) return;

        // ipapi.co free tier: 1000 requests/day
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }

        const data = await response.json();
        if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') return;

        const visitor = {
            lat: roundCoord(data.latitude),
            lng: roundCoord(data.longitude),
            city: data.city || 'Unknown',
            country: normalizeCountryName(data.country_name || 'Unknown'),
            countryCode: data.country_code || 'XX',
            timestamp: new Date().toISOString()
        };

        await saveVisitorToFirebase(visitor);
        sessionStorage.setItem('visitorTracked', 'true');

        const marker = L.marker([visitor.lat, visitor.lng], {
            icon: L.divIcon({
                className: 'current-visitor-marker',
                html: '<div style="background: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                iconSize: [12, 12]
            })
        }).addTo(visitorMap);

        marker.bindPopup(`
            <div class="popup-content">
                <h4>Your Location</h4>
                <p><strong>City:</strong> ${escapeHtml(visitor.city)}</p>
                <p><strong>Country:</strong> ${escapeHtml(visitor.country)}</p>
            </div>
        `);

        if (!prefersReducedMotion) {
            setTimeout(() => {
                visitorMap.flyTo([visitor.lat, visitor.lng], 5, { duration: 2 });
            }, 1000);
        }
    } catch (error) {
        console.error('Error tracking visitor:', error);
    }
}

// Display heatmap on the map
function displayHeatmap(visitors) {
    if (heatLayer) {
        visitorMap.removeLayer(heatLayer);
    }

    // Heat data: [lat, lng, intensity]
    heatLayer = L.heatLayer(visitors.map(v => [v.lat, v.lng, 1]), {
        radius: 30,
        blur: 40,
        maxZoom: 10,
        max: 0.8,
        minOpacity: 0.4,
        gradient: {
            0.0: '#3b82f6',
            0.2: '#06b6d4',
            0.4: '#10b981',
            0.6: '#f59e0b',
            0.8: '#ef4444',
            1.0: '#dc2626'
        }
    }).addTo(visitorMap);

    // Aggregate into one marker per unique city
    const locationCounts = {};
    visitors.forEach(v => {
        const country = normalizeCountryName(v.country);
        const key = `${v.city}-${country}`;
        if (!locationCounts[key]) {
            locationCounts[key] = {
                count: 0,
                lat: v.lat,
                lng: v.lng,
                city: v.city,
                country: country
            };
        }
        locationCounts[key].count++;
    });

    Object.values(locationCounts)
        .sort((a, b) => b.count - a.count)
        .forEach(loc => {
            L.circleMarker([loc.lat, loc.lng], {
                radius: Math.min(8 + Math.log(Math.max(loc.count, 1.5)) * 3, 20),
                fillColor: loc.count > 1 ? '#6366f1' : '#10b981',
                color: '#ffffff',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            }).addTo(visitorMap).bindPopup(`
                <div class="popup-content">
                    <h4>${escapeHtml(loc.city)}</h4>
                    <p><strong>Country:</strong> ${escapeHtml(loc.country)}</p>
                    <p><strong>Visits:</strong> ${Number(loc.count)}</p>
                </div>
            `);
        });
}

// Update visitor statistics
function updateStats(visitors) {
    const uniqueCountries = new Set(visitors.map(v => normalizeCountryName(v.country))).size;
    animateNumber('totalVisits', visitors.length);
    animateNumber('uniqueCountries', uniqueCountries);
}

// Animate number counter
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (prefersReducedMotion) {
        element.textContent = target;
        return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(target * easeOutCubic);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}
