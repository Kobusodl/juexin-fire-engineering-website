/*
  Juexin Fire Engineering website concept JS
  - Mobile menu
  - Sticky header styling
  - Reveal-on-scroll animation
  - Web3Forms-ready contact form handling
*/

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');
const navLinks = document.querySelectorAll('.site-nav a');

function setHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 10);
}

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.classList.remove('active');
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  if (!menuToggle || !siteNav) return;
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
}

menuToggle?.addEventListener('click', toggleMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', (event) => {
  if (!siteNav || !menuToggle) return;
  if (!siteNav.classList.contains('open')) return;
  const target = event.target;
  if (!siteNav.contains(target) && !menuToggle.contains(target)) closeMenu();
});
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Gallery manifest: when new gallery photos are added later, copy them to /assets/gallery/
// with a clean lowercase filename, then add a matching object to this array.
const galleryImages = [
  { src: 'assets/gallery/gallery-exhibition-stand-01.png', title: 'Juexin Exhibition Stand', category: 'Brand', alt: 'Juexin branded exhibition stand at an outdoor event', ratio: '4 / 3' },
  { src: 'assets/gallery/gallery-exhibition-stand-02.png', title: 'Branded Outdoor Display', category: 'Brand', alt: 'Juexin fire engineering branded outdoor display', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-exhibition-stand-03.png', title: 'Event Consultation Stand', category: 'Brand', alt: 'Juexin event consultation stand with branded canopy', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-gas-suppression-room.png', title: 'Gas Suppression Room', category: 'Systems', alt: 'Modular gas suppression cylinders in a plant room', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-gas-suppression-corridor.png', title: 'Suppression System Corridor', category: 'Systems', alt: 'Gas suppression cylinders installed along a corridor', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-fire-extinguisher-system.png', title: 'Fire Extinguisher System', category: 'Systems', alt: 'Red fire extinguishers and suppression system installation', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-industrial-conveyor-site.png', title: 'Industrial Conveyor Site', category: 'Industrial', alt: 'Industrial conveyor site requiring fire risk review', ratio: '3 / 4' },
  { src: 'assets/gallery/gallery-industrial-fire-equipment-installation.png', title: 'Site Equipment Installation', category: 'Industrial', alt: 'Industrial fire equipment installation beside a brick structure', ratio: '3 / 4' },
  { src: 'assets/gallery/gallery-industrial-valve-assembly.png', title: 'Industrial Valve Assembly', category: 'Industrial', alt: 'Industrial valve assembly and fire protection piping', ratio: '4 / 5' },
  { src: 'assets/gallery/gallery-industrial-skid-fire-protection.png', title: 'Skid Fire Protection', category: 'Industrial', alt: 'Industrial skid mounted fire protection equipment', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-fire-safety-consultants.png', title: 'Fire Safety Consultants', category: 'Consulting', alt: 'Fire safety consultant holding a clipboard', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-fire-consulting-engineers-plans.png', title: 'Fire Consulting Engineers', category: 'Consulting', alt: 'Engineering plans with Juexin fire consulting engineers branding', ratio: '16 / 9' },
  { src: 'assets/gallery/gallery-performance-based-design-plans.png', title: 'Performance-Based Design', category: 'Consulting', alt: 'Performance based fire solutions over building drawings', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-book-consultation-inspection.png', title: 'Book a Consultation', category: 'Consulting', alt: 'Fire safety consultant inspecting a building interior', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-mineguard-compliance-namibia.png', title: 'Mineguard Compliance', category: 'Compliance', alt: 'Mineguard mandatory compliance visual for Namibia', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-namibia-mining-compliance-map.png', title: 'Namibia Mining Compliance', category: 'Compliance', alt: 'Map of Namibia with Juexin mining compliance branding', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-prevention-smoke-detector.png', title: 'Prevention Systems', category: 'Systems', alt: 'Smoke detector visual with prevention message', ratio: '1 / 1' },
  { src: 'assets/gallery/gallery-service-offering-overview.png', title: 'Service Offering Overview', category: 'Brand', alt: 'Juexin service offering overview graphic', ratio: '4 / 3' },
  { src: 'assets/gallery/gallery-why-choose-juexin.png', title: 'Why Choose Juexin', category: 'Brand', alt: 'Why choose Juexin fire consulting engineers graphic', ratio: '3 / 2' }
];

const galleryGrid = document.querySelector('[data-gallery-grid]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxCaption = document.querySelector('[data-lightbox-caption]');
const lightboxClose = document.querySelector('[data-lightbox-close]');
const lightboxPrev = document.querySelector('[data-lightbox-prev]');
const lightboxNext = document.querySelector('[data-lightbox-next]');
let activeGalleryImages = [...galleryImages];
let activeGalleryIndex = 0;

function renderGallery() {
  if (!galleryGrid) return;
  activeGalleryImages = [...galleryImages];

  galleryGrid.innerHTML = activeGalleryImages.map((image, index) => `
    <button class="gallery-item reveal is-visible" type="button" data-gallery-index="${index}" style="--ratio: ${image.ratio}">
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <span class="gallery-overlay"><strong>${image.title}</strong><span>${image.category}</span></span>
    </button>
  `).join('');
}

function openLightbox(index) {
  if (!lightbox || !lightboxImage || !lightboxCaption || !activeGalleryImages[index]) return;
  activeGalleryIndex = index;
  const image = activeGalleryImages[activeGalleryIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = `${image.title} | ${image.category}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.classList.remove('menu-open');
}

function moveLightbox(direction) {
  if (!activeGalleryImages.length) return;
  const nextIndex = (activeGalleryIndex + direction + activeGalleryImages.length) % activeGalleryImages.length;
  openLightbox(nextIndex);
}

if (galleryGrid) {
  renderGallery();
  galleryGrid.addEventListener('click', (event) => {
    const item = event.target.closest('[data-gallery-index]');
    if (!item) return;
    openLightbox(Number(item.dataset.galleryIndex));
  });
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => moveLightbox(-1));
lightboxNext?.addEventListener('click', () => moveLightbox(1));
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});

const contactForm = document.querySelector('[data-contact-form]');
const formMessage = document.querySelector('[data-form-message]');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!formMessage) return;
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const accessKey = String(formData.get('access_key') || '').trim();

  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    formMessage.textContent = 'Demo mode: replace YOUR_WEB3FORMS_ACCESS_KEY in contact.html to activate Web3Forms.';
    formMessage.classList.remove('error');
    return;
  }

  try {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formMessage.textContent = '';

    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    const result = await response.json();

    if (response.ok && result.success) {
      contactForm.reset();
      formMessage.textContent = 'Thank you. Your enquiry has been sent successfully.';
      formMessage.classList.remove('error');
    } else {
      throw new Error(result.message || 'Unable to send the form.');
    }
  } catch (error) {
    formMessage.textContent = 'The form could not be sent. Please email info@juexin.co.za directly.';
    formMessage.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send enquiry';
  }
});
