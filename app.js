/* 
  Plan Teknik - Fit Up Clamp B2B Landing Page
  Interactive Logic & Micro-interactions
*/

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initScrollAnimations();
  initModals();
  initUnitToggle();
  initSearch();
  initQuoteForm();
  initGalleryTabs();
});

/* Gallery Tabs Switching */
function initGalleryTabs() {
  const tabBtns = document.querySelectorAll('.gallery-tab-btn');
  const tabPanes = document.querySelectorAll('.gallery-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });
}

function openHighResLightbox(imgSrc, title = 'Plan Teknik Fit Up Clamp', desc = 'Plan Teknik Fit Up Clamp high-resolution product photography.') {
  const backdrop = document.getElementById('modal-backdrop');
  const lightboxModal = document.getElementById('lightbox-modal');
  if (!backdrop || !lightboxModal) return;

  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-img').src = imgSrc;
  const descEl = document.getElementById('lightbox-desc');
  if (descEl) descEl.textContent = desc;

  const allModals = document.querySelectorAll('.modal-container');
  allModals.forEach(m => m.style.display = 'none');
  lightboxModal.style.display = 'block';
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}


/* Sticky Header Scroll Effect */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Scroll Reveal Animations */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* Modal Management System */
function initModals() {
  const backdrop = document.getElementById('modal-backdrop');
  const quoteModal = document.getElementById('quote-modal');
  const videoModal = document.getElementById('video-modal');
  const searchModal = document.getElementById('search-modal');
  const lightboxModal = document.getElementById('lightbox-modal');
  const datasheetModal = document.getElementById('datasheet-modal');

  const allModals = [quoteModal, videoModal, searchModal, lightboxModal, datasheetModal];

  function openModal(modal) {
    if (!modal) return;
    allModals.forEach(m => m && (m.style.display = 'none'));
    modal.style.display = 'block';
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    // Pause video if playing
    const videoEl = document.getElementById('modal-video-element');
    if (videoEl) videoEl.pause();
  }

  // Close triggers
  document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Open Quote Modal Triggers
  document.querySelectorAll('[data-open-quote]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const model = btn.getAttribute('data-model');
      if (model) {
        const select = document.getElementById('quote-model-select');
        if (select) select.value = model;
      }
      openModal(quoteModal);
    });
  });

  // Open Search Trigger
  document.querySelectorAll('[data-open-search]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(searchModal);
      const searchInput = document.getElementById('main-search-input');
      if (searchInput) setTimeout(() => searchInput.focus(), 100);
    });
  });

  // Open Video Modal Trigger
  document.querySelectorAll('[data-open-video]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(videoModal);
      const videoEl = document.getElementById('modal-video-element');
      if (videoEl) videoEl.play();
    });
  });

  // Open Datasheet Download Trigger
  document.querySelectorAll('[data-open-datasheet]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(datasheetModal);
    });
  });

  // Application Lightbox Triggers
  document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title') || card.querySelector('.app-title').textContent;
      const imgSrc = card.querySelector('img').src;
      
      document.getElementById('lightbox-title').textContent = `Application: ${title}`;
      document.getElementById('lightbox-img').src = imgSrc;
      openModal(lightboxModal);
    });
  });
}

/* Metric / Imperial Unit Toggle */
function initUnitToggle() {
  const toggleBtns = document.querySelectorAll('.unit-toggle-btn');
  if (!toggleBtns.length) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const unit = btn.getAttribute('data-unit');

      const mmCells = document.querySelectorAll('.cell-mm');
      const inchCells = document.querySelectorAll('.cell-inch');

      if (unit === 'inch') {
        mmCells.forEach(c => c.style.fontWeight = 'normal');
        inchCells.forEach(c => c.style.fontWeight = 'bold');
      } else {
        mmCells.forEach(c => c.style.fontWeight = 'bold');
        inchCells.forEach(c => c.style.fontWeight = 'normal');
      }
    });
  });
}

/* Search Modal Logic */
function initSearch() {
  const input = document.getElementById('main-search-input');
  const resultsContainer = document.getElementById('search-results-list');
  if (!input || !resultsContainer) return;

  const searchItems = [
    { title: 'Fit Up Clamp PBKK 1-2', category: 'Product Specs', desc: '1" - 2" (Ø33.4 - Ø60.3 mm) Trapezoidal screw alignment clamp', target: '#technical' },
    { title: 'Fit Up Clamp PBKK 2-6', category: 'Product Specs', desc: '2" - 6" (Ø60.3 - Ø168.3 mm) Heavy duty 3-point alignment clamp', target: '#technical' },
    { title: 'Fit Up Clamp PBKK 8-12', category: 'Product Specs', desc: '8" - 12" (Ø219.1 - Ø323.9 mm) Large diameter pipeline alignment clamp', target: '#technical' },
    { title: 'Fit Up Clamp PBKK 12-14', category: 'Product Specs', desc: '12" - 14" (Ø323.9 - Ø355.6 mm) Industrial pipeline welding clamp', target: '#technical' },
    { title: 'Fit Up Clamp PBKK 14-16', category: 'Product Specs', desc: '14" - 16" (Ø355.6 - Ø406.4 mm) Maximum capacity alignment clamp', target: '#technical' },
    { title: 'Manual Adjustable Pressure', category: 'Key Feature', desc: 'Pressure force easily adjusted manually without second personnel', target: '#features' },
    { title: '0° - 360° Adjustment', category: 'Key Feature', desc: 'Free rotational fastening around pipes between 0 and 360 degrees', target: '#features' },
    { title: 'Suitable for Coated Pipes', category: 'Key Feature', desc: 'Designed for wall thickness 1-8 mm on coated & stainless steel pipes', target: '#features' },
    { title: 'Elbow Alignment', category: 'Application', desc: 'Accurate fit-up for 90° and 45° pipe elbows', target: '#applications' },
    { title: 'Welding Neck Flange', category: 'Application', desc: 'Precise flange alignment before tack welding', target: '#applications' },
    { title: 'Packaging & Shipping', category: 'Logistics', desc: 'Wooden crates, individually wrapped clamps, worldwide delivery', target: '#packaging' }
  ];

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsContainer.innerHTML = '<p style="color:#64748B; text-align:center; padding: 1.5rem;">Type to search models, features, applications or specifications...</p>';
      return;
    }

    const filtered = searchItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p style="color:#64748B; text-align:center; padding: 1.5rem;">No results found for "${query}"</p>`;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <div class="search-result-item" onclick="navigateToSection('${item.target}')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
          <span class="search-result-title">${item.title}</span>
          <span style="font-size:0.75rem; background:rgba(227,6,19,0.1); color:#E30613; padding:0.2rem 0.5rem; border-radius:4px; font-weight:600;">${item.category}</span>
        </div>
        <p class="search-result-desc">${item.desc}</p>
      </div>
    `).join('');
  });
}

function navigateToSection(targetId) {
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
  
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
}

/* Quote Form Processing */
function initQuoteForm() {
  const form = document.getElementById('quote-request-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Quote Request...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '✔ Request Sent Successfully!';
      submitBtn.style.backgroundColor = '#10B981';

      setTimeout(() => {
        const backdrop = document.getElementById('modal-backdrop');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
        alert('Thank you! Your quote request for Plan Teknik Fit Up Clamp has been submitted. Our engineering team will contact you shortly.');
      }, 1200);
    }, 1000);
  });
}

/* Simulated Video Player */
function initVideoPlayer() {
  // Video interactions handled via modal HTML5 video tag
}
