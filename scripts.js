/* ============================================
   BONWAPITSE FARM - JAVASCRIPT
   scripts.js
   Author: [Your Name]
   Description: Interactive features and form
   validation for Bonwapitse Farm website
   ============================================ */


/* ================================================
   1. NAVBAR — SHRINK ON SCROLL
   Makes the navbar smaller when user scrolls down
   ================================================ */

window.addEventListener('scroll', function () {
  var navbar = document.getElementById('main-nav');
  if (navbar) {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }
});


/* ================================================
   2. ACTIVE NAV LINK — HIGHLIGHT CURRENT PAGE
   Automatically highlights the correct nav link
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var currentPage = window.location.pathname.split('/').pop();
  if (currentPage === '') { currentPage = 'index.html'; }
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
});


/* ================================================
   3. MOBILE MENU — AUTO CLOSE ON LINK CLICK
   Closes the mobile menu when a link is clicked
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.nav-link');
  var navMenu  = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu && navMenu.classList.contains('show')) {
        var toggler = document.querySelector('.navbar-toggler');
        if (toggler) { toggler.click(); }
      }
    });
  });
});


/* ================================================
   4. SMOOTH SCROLL — ANCHOR LINKS
   Smooth scrolling for any in-page anchor links
   ================================================ */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ================================================
   5. FADE IN ON SCROLL — ANIMATION
   Elements fade in as the user scrolls down
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var fadeElements = document.querySelectorAll(
    '.offering-card, .specimen-card, .livestock-card, .stat-item, .section-title'
  );

  fadeElements.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  function checkFade() {
    fadeElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', checkFade);
  checkFade(); // Run on load too
});


/* ================================================
   6. BACK TO TOP BUTTON
   Shows a button to scroll back to the top
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Create the button
  var backToTop       = document.createElement('button');
  backToTop.id        = 'back-to-top';
  backToTop.innerHTML = '&#8679;';
  backToTop.title     = 'Back to top';
  backToTop.style.cssText = [
    'position: fixed',
    'bottom: 2rem',
    'right: 2rem',
    'width: 44px',
    'height: 44px',
    'border-radius: 50%',
    'background-color: #D4711A',
    'color: white',
    'border: none',
    'font-size: 1.4rem',
    'cursor: pointer',
    'display: none',
    'z-index: 9999',
    'box-shadow: 0 2px 10px rgba(0,0,0,0.3)',
    'transition: background-color 0.3s ease'
  ].join(';');

  document.body.appendChild(backToTop);

  // Show/hide on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  // Scroll to top on click
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hover colour change
  backToTop.addEventListener('mouseover', function () {
    this.style.backgroundColor = '#6B3F1F';
  });
  backToTop.addEventListener('mouseout', function () {
    this.style.backgroundColor = '#D4711A';
  });
});


/* ================================================
   7. MESSAGE CHARACTER COUNTER
   Shows character count on the contact form textarea
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var messageBox = document.getElementById('message');
  if (messageBox) {
    var counter       = document.createElement('small');
    counter.id        = 'char-counter';
    counter.style.cssText = 'display:block; text-align:right; color:#888; margin-top:0.2rem; font-size:0.78rem;';
    counter.textContent   = '0 / 500 characters';
    messageBox.parentNode.appendChild(counter);

    messageBox.addEventListener('input', function () {
      var len = this.value.length;
      counter.textContent = len + ' / 500 characters';
      if (len > 450) {
        counter.style.color = '#D4711A';
      } else {
        counter.style.color = '#888';
      }
      if (len >= 500) {
        this.value = this.value.substring(0, 500);
        counter.style.color = 'red';
      }
    });
  }
});


/* ================================================
   8. CONTACT FORM VALIDATION
   Validates all fields before form submission
   ================================================ */

function submitForm() {

  var fullName    = document.getElementById('full-name');
  var email       = document.getElementById('email');
  var phone       = document.getElementById('phone');
  var enquiryType = document.getElementById('enquiry-type');
  var message     = document.getElementById('message');
  var privacy     = document.getElementById('privacy');

  var successAlert = document.getElementById('form-success');
  var errorAlert   = document.getElementById('form-error');
  var isValid      = true;

  // Hide previous alerts
  successAlert.classList.add('d-none');
  errorAlert.classList.add('d-none');

  // Reset all validation classes
  var fields = [fullName, email, phone, enquiryType, message, privacy];
  fields.forEach(function (field) {
    field.classList.remove('is-invalid', 'is-valid');
  });

  // Validate Full Name
  if (!fullName.value.trim() || fullName.value.trim().length < 2) {
    fullName.classList.add('is-invalid');
    isValid = false;
  } else {
    fullName.classList.add('is-valid');
  }

  // Validate Email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
    email.classList.add('is-invalid');
    isValid = false;
  } else {
    email.classList.add('is-valid');
  }

  // Validate Phone
  var phonePattern = /^[+]?[0-9\s]{7,15}$/;
  if (!phone.value.trim() || !phonePattern.test(phone.value.trim())) {
    phone.classList.add('is-invalid');
    isValid = false;
  } else {
    phone.classList.add('is-valid');
  }

  // Validate Enquiry Type (dropdown)
  if (!enquiryType.value) {
    enquiryType.classList.add('is-invalid');
    isValid = false;
  } else {
    enquiryType.classList.add('is-valid');
  }

  // Validate Message (min 10 characters)
  if (!message.value.trim() || message.value.trim().length < 10) {
    message.classList.add('is-invalid');
    isValid = false;
  } else {
    message.classList.add('is-valid');
  }

  // Validate Privacy Checkbox
  if (!privacy.checked) {
    privacy.classList.add('is-invalid');
    isValid = false;
  } else {
    privacy.classList.add('is-valid');
  }

  // Submit or show error
  if (isValid) {
    successAlert.classList.remove('d-none');
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Clear all fields
    document.getElementById('full-name').value       = '';
    document.getElementById('email').value           = '';
    document.getElementById('phone').value           = '';
    document.getElementById('enquiry-type').value    = '';
    document.getElementById('organisation').value    = '';
    document.getElementById('message').value         = '';
    document.getElementById('privacy').checked       = false;

    // Reset char counter
    var counter = document.getElementById('char-counter');
    if (counter) { counter.textContent = '0 / 500 characters'; }

    // Remove green valid classes
    fields.forEach(function (field) {
      field.classList.remove('is-valid');
    });

  } else {
    errorAlert.classList.remove('d-none');
    errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


/* ================================================
   9. YEAR — AUTO UPDATE COPYRIGHT IN FOOTER
   Keeps the copyright year always current
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    var year = new Date().getFullYear();
    copyEl.innerHTML = '&copy; ' + year + ' Bonwapitse Farm. All rights reserved.';
  }
});
