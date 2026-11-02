/**
 * The Urban Plate - Restaurant Portfolio Website
 * Modern Vanilla JavaScript (ES6+)
 * Zero dependencies, highly maintainable
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initSmoothScroll();
  initMenuFilter();
  initGalleryLightbox();
  initReservationForm();
  initBackToTop();
  initLiveHoursStatus();
  initImageFallbacks();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation & Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    toggleBtn.classList.add('active');
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close drawer if window is resized above mobile/tablet breakpoint (992px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && drawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Header Scroll Effect & Active Section Spy
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  function updateActiveLink() {
    const scrollPos = window.scrollY;

    // Header compact styling on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    let currentId = '';

    // Check if bottom of page reached
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
      currentId = 'contact';
    } else if (scrollPos < 150) {
      currentId = 'home';
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentId = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Run on initial page load
}

/* --------------------------------------------------------------------------
   3. Robust Smooth Scrolling for All Hash Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      if (targetId === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (history.pushState) history.pushState(null, null, '#home');
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 72;
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        if (history.pushState) history.pushState(null, null, targetId);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Menu Category Filter
   -------------------------------------------------------------------------- */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-row');

  if (!filterBtns.length || !menuItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      menuItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
          item.style.animation = 'fadeInItem 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Inject animation keyframe for filtering
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeInItem {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

/* --------------------------------------------------------------------------
   4. Culinary Gallery Lightbox
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg || !lightboxCaption || !closeBtn) return;

  function openLightbox(imgSrc, titleText) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = titleText || 'Gallery Preview';
    lightboxCaption.textContent = titleText || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      if (img) {
        openLightbox(img.src, title);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Reservation Form Simulation & Toast Feedback
   -------------------------------------------------------------------------- */
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('resName');
    const phoneInput = document.getElementById('resPhone');
    const guestsInput = document.getElementById('resGuests');
    const dateInput = document.getElementById('resDate');
    const timeInput = document.getElementById('resTime');
    const seatingInput = document.getElementById('resSeating');
    const notesInput = document.getElementById('resNotes');

    const name = nameInput ? nameInput.value.trim() : 'Guest';
    const guests = guestsInput ? guestsInput.value : '2';
    const date = dateInput ? dateInput.value : 'today';
    const time = timeInput ? timeInput.value : 'dinner';

    if (!nameInput.value || !phoneInput.value) {
      showToast('Please fill in your name and contact phone number.', 'error');
      return;
    }

    // Success notification
    showToast(
      `🎉 Table Request Received! Table for ${guests} guests on ${date} at ${time} requested for ${name}. (Sample Demo Mode: Request simulated successfully!)`,
      'success',
      7000
    );

    // Build pre-formatted WhatsApp text
    const waText = encodeURIComponent(
      `Hello The Urban Plate (Buldhana)! I would like to reserve a table.\n\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phoneInput.value}\n` +
      `• Guests: ${guests}\n` +
      `• Date: ${date}\n` +
      `• Time: ${time}\n` +
      `• Preference: ${seatingInput ? seatingInput.value : 'Indoor'}\n` +
      `• Notes: ${notesInput ? notesInput.value : 'None'}`
    );

    // Non-blocking toast with one-click direct WhatsApp link
    showToast(
      `<strong>🎉 Table Request Recorded!</strong><br>` +
      `Table for ${guests} guests on <em>${date}</em> at <em>${time}</em> for ${name}.<br>` +
      `<a href="https://wa.me/919876543210?text=${waText}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="margin-top: 10px; display: inline-flex; text-decoration: none;">` +
      `<span>Confirm via WhatsApp Chat</span> &rarr;</a>`,
      'success',
      9000
    );

    form.reset();
  });
}

/**
 * Modern floating toast message
 */
function showToast(message, type = 'info', duration = 5000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <div style="font-size: 1.25rem; flex-shrink: 0;">${type === 'success' ? '✅' : 'ℹ️'}</div>
    <div style="font-size: 0.88rem; line-height: 1.5; flex-grow: 1;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* --------------------------------------------------------------------------
   6. Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. Live Hours & Open/Closed Status Pill
   -------------------------------------------------------------------------- */
function initLiveHoursStatus() {
  const statusBadge = document.getElementById('liveStatusPill');
  if (!statusBadge) return;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const totalMins = currentHour * 60 + currentMinutes;

  // Lunch: 12:00 PM (720m) - 3:30 PM (930m)
  // Dinner: 7:00 PM (1140m) - 11:30 PM (1410m)
  const isLunchOpen = totalMins >= 720 && totalMins <= 930;
  const isDinnerOpen = totalMins >= 1140 && totalMins <= 1410;

  if (isLunchOpen || isDinnerOpen) {
    statusBadge.innerHTML = `<span class="status-pulse"></span> Open Now for ${isLunchOpen ? 'Lunch' : 'Dinner'}`;
  } else {
    let nextSlotText = '';
    if (totalMins < 720) {
      nextSlotText = 'Opens today at 12:00 PM';
    } else if (totalMins > 930 && totalMins < 1140) {
      nextSlotText = 'Opens for Dinner at 7:00 PM';
    } else {
      nextSlotText = 'Opens tomorrow at 12:00 PM';
    }
    statusBadge.innerHTML = `<span class="status-pulse" style="background:#F59E0B; box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);"></span> Kitchen Resting • ${nextSlotText}`;
  }
}

/* --------------------------------------------------------------------------
   8. Image Fallbacks
   -------------------------------------------------------------------------- */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  const fallbackSvg = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20fill%3D%22%231A2026%22%20width%3D%22600%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23D4AF37%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3EThe%20Urban%20Plate%20Culinary%3C%2Ftext%3E%3C%2Fsvg%3E";

  images.forEach(img => {
    // If image failed before script initialization
    if (img.complete && img.naturalWidth === 0) {
      img.src = fallbackSvg;
    }

    img.addEventListener('error', function() {
      if (this.src !== fallbackSvg) {
        this.src = fallbackSvg;
      }
    });
  });
}
