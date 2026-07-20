/* ============================================
   DrivenByLight — JavaScript
   Vanilla JS · Zero Dependencies · Deferred Loading
   Features: Mobile Menu, Scroll Header, FAQ Accordion, Counter Animation,
             Scroll Reveal, Form Validation, Back to Top, Cookie Banner
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {

    // ===== EMAILJS INITIALIZATION (protected) =====
    if (typeof emailjs !== 'undefined') {
      try {
        emailjs.init("-AuM0rkO4Pswl9mVE");
      } catch (e) {
        console.warn('EmailJS init failed:', e);
      }
    }

    // ===== DARK MODE TOGGLE (default: dark mode) =====
    var themeToggle = document.getElementById('theme-toggle');

    // Dark mode is the default — only switch to light if user explicitly chose it
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-mode');
    } else {
      // Default: dark mode (no class needed, already applied in HTML)
      document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        var isDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }

    /* ===== Mobile Menu Toggle ===== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close menu on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ===== Header Scroll Effect ===== */
    var header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    /* ===== FAQ Accordion ===== */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', function () {
          var isOpen = item.classList.contains('open');

          // Close all other items
          faqItems.forEach(function (otherItem) {
            otherItem.classList.remove('open');
          });

          // Toggle current item
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      }
    });

    /* ===== Animated Counters ===== */
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');
    var countersAnimated = false;

    function animateCounters() {
      if (countersAnimated) return;

      var statsSection = document.querySelector('.stats-section');
      if (!statsSection) return;

      var rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersAnimated = true;

        statNumbers.forEach(function (counter) {
          var target = parseInt(counter.getAttribute('data-target'), 10);
          var duration = 2000; // ms
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var suffix = counter.getAttribute('data-suffix') || '+';
            counter.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              counter.textContent = target + suffix;
            }
          }

          requestAnimationFrame(step);
        });
      }
    }

    // Listen for scroll to trigger counters
    window.addEventListener('scroll', animateCounters, { passive: true });
    // Also check on load in case section is already visible
    animateCounters();

    /* ===== Scroll Reveal Animation ===== */
    var revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all elements immediately
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }

    /* ===== Back to Top Button ===== */
    var backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }, { passive: true });

      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ===== Cookie Banner ===== */
    var cookieBanner = document.querySelector('.cookie-banner');
    var cookieAccept = document.querySelector('.cookie-btn-accept');
    var cookieDecline = document.querySelector('.cookie-btn-decline');

    if (cookieBanner) {
      // Check if user already made a choice
      if (!localStorage.getItem('cookieConsent')) {
        // Show banner after a short delay
        setTimeout(function () {
          cookieBanner.classList.add('show');
        }, 1000);
      }
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }

    /* ===== Form Validation (contatti.html) ===== */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      // Real-time validation on blur and input
      var formFields = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');

      formFields.forEach(function (field) {
        field.addEventListener('blur', function () {
          validateField(field);
        });

        field.addEventListener('input', function () {
          if (field.classList.contains('error')) {
            validateField(field);
          }
        });
      });

      // GDPR Checkbox validation
      var gdprCheckbox = document.getElementById('gdpr-consent');
      if (gdprCheckbox) {
        gdprCheckbox.addEventListener('change', function () {
          var errorEl = gdprCheckbox.closest('.form-group').querySelector('.gdpr-error');
          if (!this.checked && errorEl) {
            this.classList.add('error');
            errorEl.textContent = 'Devi accettare l\'informativa privacy per inviare il modulo.';
          } else {
            this.classList.remove('error');
            if (errorEl) errorEl.textContent = '';
          }
        });
      }

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var isValid = true;
        formFields.forEach(function (field) {
          if (!validateField(field)) {
            isValid = false;
          }
        });

        // Check GDPR consent checkbox
        if (gdprCheckbox && !gdprCheckbox.checked) {
          isValid = false;
          gdprCheckbox.classList.add('error');
          var gdprErrorEl = gdprCheckbox.closest('.form-group').querySelector('.gdpr-error');
          if (gdprErrorEl) gdprErrorEl.textContent = 'Devi accettare l\'informativa privacy per inviare il modulo.';
        }

        if (isValid) {
          // ===== EMAILJS SEND =====
          var submitBtn = contactForm.querySelector('.btn-primary[type="submit"]');
          if (submitBtn) {
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;
          }

          if (typeof emailjs !== 'undefined') {
            var now = new Date();
            var dateStr = now.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
            emailjs.send("service_eesi0gp", "template_h7k2ei4", {
              from_name: document.getElementById('nome').value,
              email: document.getElementById('email').value,
              telefono: document.getElementById('telefono').value,
              servizio: document.getElementById('servizio').value,
              orario_preferito: document.getElementById('orario').value,
              messaggio: document.getElementById('messaggio').value,
              date: dateStr
            })
            .then(function(response) {
              alert('Messaggio inviato con successo! Ti risponderemo entro 24 ore.');
              contactForm.reset();
              if (submitBtn) {
                submitBtn.textContent = 'Invia Messaggio';
                submitBtn.disabled = false;
              }
            }, function(error) {
              alert('Errore nell\'invio. Riprova o contattaci via WhatsApp.');
              if (submitBtn) {
                submitBtn.textContent = 'Invia Messaggio';
                submitBtn.disabled = false;
              }
            });
          } else {
            // Fallback se EmailJS non è disponibile
            alert('Servizio di invio temporaneamente non disponibile. Contattaci via WhatsApp.');
            if (submitBtn) {
              submitBtn.textContent = 'Invia Messaggio';
              submitBtn.disabled = false;
            }
          }
        }
      });

      function validateField(field) {
        var value = field.value.trim();
        var type = field.type || field.tagName.toLowerCase();
        var isValid = true;
        var errorMsg = '';

        // Required check
        if (field.hasAttribute('required') && !value) {
          isValid = false;
          errorMsg = 'Questo campo è obbligatorio.';
        }

        // Email validation
        if (type === 'email' && value) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            errorMsg = 'Inserisci un indirizzo email valido.';
          }
        }

        // Phone validation (Italian numbers)
        if (field.id === 'telefono' && value) {
          var phoneRegex = /^[\d\s+()-]{8,15}$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            errorMsg = 'Inserisci un numero di telefono valido.';
          }
        }

        // Apply result
        if (isValid) {
          field.classList.remove('error');
        } else {
          field.classList.add('error');
          var errorEl = field.parentElement.querySelector('.form-error-msg');
          if (errorEl && errorMsg) {
            errorEl.textContent = errorMsg;
          }
        }

        return isValid;
      }
    }

    /* ===== Active Nav Link on Scroll (Scroll Spy) ===== */
    var navLinksAll = document.querySelectorAll('.nav-links a');
    if (navLinksAll.length > 0 && window.location.pathname.includes('index.html')) {
      var sections = [];
      navLinksAll.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          var section = document.querySelector(href);
          if (section) {
            sections.push({ id: href.substring(1), el: section, link: link });
          }
        }
      });

      window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 200;
        var currentSection = '';

        sections.forEach(function (s) {
          if (s.el.offsetTop <= scrollPos) {
            currentSection = s.id;
          }
        });

        navLinksAll.forEach(function (link) {
          link.classList.remove('active-link');
          if (currentSection && link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active-link');
          }
        });
      }, { passive: true });
    }

    /* ===== LIGHTBOX — Gallery Viewer ===== */
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var lightboxClose = document.getElementById('lightbox-close');
    var lightboxPrev = document.getElementById('lightbox-prev');
    var lightboxNext = document.getElementById('lightbox-next');
    var lightboxBackdrop = lightbox ? lightbox.querySelector('.lightbox-backdrop') : null;

    if (lightbox && lightboxImg) {
      // Collect all gallery images across the page
      var galleryItems = document.querySelectorAll('.gallery-item');
      var galleryImages = [];
      galleryItems.forEach(function (item) {
        var img = item.querySelector('img');
        if (img) {
          galleryImages.push({
            src: img.src,
            alt: img.alt || 'Foto DrivenByLight'
          });
        }
      });

      var currentIndex = 0;
      var isAnimating = false;

      function openLightbox(index) {
        if (index < 0 || index >= galleryImages.length) return;
        currentIndex = index;
        updateLightboxImage();
        lightbox.removeAttribute('hidden');
        // Force reflow then activate for transition
        requestAnimationFrame(function () {
          lightbox.classList.add('active');
        });
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Wait for transition to finish before hiding
        setTimeout(function () {
          if (!lightbox.classList.contains('active')) {
            lightbox.setAttribute('hidden', '');
          }
        }, 300);
      }

      function updateLightboxImage() {
        var data = galleryImages[currentIndex];
        lightboxImg.src = data.src;
        lightboxImg.alt = data.alt;
        if (lightboxCounter) {
          lightboxCounter.textContent = currentIndex + 1 + ' / ' + galleryImages.length;
        }
      }

      function showNext() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightboxImage();
        setTimeout(function () { isAnimating = false; }, 200);
      }

      function showPrev() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
        setTimeout(function () { isAnimating = false; }, 200);
      }

      // Click handlers on gallery items
      galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
          openLightbox(index);
        });
      });

      // Close button
      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

      // Backdrop click
      if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

      // Navigation buttons
      if (lightboxNext) lightboxNext.addEventListener('click', showNext);
      if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (lightbox.hasAttribute('hidden')) return;
        switch (e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowRight':
            showNext();
            break;
          case 'ArrowLeft':
            showPrev();
            break;
        }
      });

      // Touch swipe support for mobile
      var touchStartX = 0;
      var touchEndX = 0;
      var minSwipeDistance = 50;

      lightbox.addEventListener('touchstart', function (e) {
        // Only track swipes on the image area, not buttons
        if (e.target.closest('.lightbox-close') || e.target.closest('.lightbox-nav')) return;
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', function (e) {
        // Only track swipes on the image area, not buttons
        if (e.target.closest('.lightbox-close') || e.target.closest('.lightbox-nav')) return;
        touchEndX = e.changedTouches[0].screenX;
        var distance = touchStartX - touchEndX;

        if (Math.abs(distance) >= minSwipeDistance) {
          if (distance > 0) {
            showNext(); // Swipe left → next
          } else {
            showPrev(); // Swipe right → prev
          }
        }
      }, { passive: true });
    }

  }); // end DOMContentLoaded

})(); // end IIFE
