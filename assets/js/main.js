/* =====================================================
   SHREE GLOBAL - PREVIEW 1 MAIN JS
   - Mobile menu
   - Active links
   - Scroll reveal
   - Product modal with multiple images/specs/sizes/MOQ
   - Google Sheets form submission via Apps Script
===================================================== */

/*
  STEP 1:
  Paste your deployed Google Apps Script Web App URL below.

  Example:
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxx/exec";
*/
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4j5UYm8uxRTqhgLTYYog7tzgskOsAX-6ivFbaE_eY1x97fEoZZRP04gH4AeCBEKwB/exec";

const products = {
  "jute-shopping-bags": {
    title: "Jute Shopping Bags",
    category: "Retail essential",
    description: "Strong reusable bags suited for supermarkets, specialty stores, exhibitions, and eco-conscious retail programs. A practical product for grocery, everyday carry, branding, and seasonal collections.",
    images: [
      "assets/images/category-jute-bags.png",
      "assets/images/hero-trade-showcase.png",
      "assets/images/category-promotional-totes.png",
      "assets/images/category-gift-bags.png"
    ],
    specs: {
      Material: "Natural Jute",
      GSM: "250 GSM",
      Handle: "Cotton Padded",
      Printing: "Customizable",
      Color: "Natural Brown",
      Usage: "Shopping / Promotion"
    },
    sizes: {
      Small: "30 × 30 × 10 cm",
      Medium: "35 × 40 × 12 cm",
      Large: "40 × 45 × 15 cm",
      XL: "45 × 50 × 18 cm",
      Custom: "Available"
    },
    moq: "1000 Pcs"
  },
  "promotional-tote-bags": {
    title: "Promotional Tote Bags",
    category: "Marketing and events",
    description: "Ideal for events, universities, conferences, brand activations, and corporate campaigns looking for repeat visibility with a reusable format.",
    images: [
      "assets/images/category-promotional-totes.png",
      "assets/images/category-jute-bags.png",
      "assets/images/hero-trade-showcase.png",
      "assets/images/category-gift-bags.png"
    ],
    specs: {
      Material: "Cotton / Canvas / Jute",
      GSM: "180–300 GSM",
      Handle: "Self / Cotton",
      Printing: "Logo / Screen Print",
      Color: "Custom Options",
      Usage: "Events / Campaigns"
    },
    sizes: {
      Standard: "38 × 42 cm",
      Medium: "35 × 40 cm",
      Large: "42 × 45 cm",
      Gusset: "Optional",
      Custom: "Available"
    },
    moq: "1000 Pcs"
  },
  "gift-packaging-bags": {
    title: "Gift and Packaging Bags",
    category: "Premium packaging",
    description: "Well suited for boutiques, curated hampers, festive gifting, jewelry packaging, and premium presentation needs with a more sustainable material story.",
    images: [
      "assets/images/category-gift-bags.png",
      "assets/images/category-jute-bags.png",
      "assets/images/category-promotional-totes.png",
      "assets/images/hero-trade-showcase.png"
    ],
    specs: {
      Material: "Jute / Cotton Blend",
      Finish: "Premium Natural",
      Handle: "Rope / Cotton",
      Printing: "Custom Tag / Logo",
      Color: "Natural / Dyed",
      Usage: "Retail / Gifting"
    },
    sizes: {
      Small: "20 × 25 cm",
      Medium: "25 × 30 cm",
      Large: "30 × 40 cm",
      Bottle: "Available",
      Custom: "Available"
    },
    moq: "1000 Pcs"
  },
  "bottle-wine-bags": {
    title: "Bottle and Wine Bags",
    category: "Gifting and beverage",
    description: "Presentation-friendly bags for beverage gifting, winery promotions, festive packs, and specialty stores looking for reusable packaging appeal.",
    images: [
      "assets/images/hero-trade-showcase.png",
      "assets/images/category-gift-bags.png",
      "assets/images/category-jute-bags.png",
      "assets/images/category-promotional-totes.png"
    ],
    specs: {
      Material: "Jute / Cotton",
      Capacity: "Single / Double Bottle",
      Handle: "Rope / Cotton",
      Printing: "Logo Available",
      Finish: "Gift Ready",
      Usage: "Wine / Beverage"
    },
    sizes: {
      Single: "12 × 35 × 10 cm",
      Double: "22 × 35 × 10 cm",
      Tall: "Available",
      Premium: "Available",
      Custom: "Available"
    },
    moq: "1000 Pcs"
  },
  "drawstring-pouches": {
    title: "Drawstring Pouches and Utility Bags",
    category: "Flexible utility line",
    description: "Useful for packaging, product kits, accessories, small gifts, and organized brand presentations that benefit from lower-waste packaging formats.",
    images: [
      "assets/images/category-gift-bags.png",
      "assets/images/category-promotional-totes.png",
      "assets/images/category-jute-bags.png",
      "assets/images/hero-trade-showcase.png"
    ],
    specs: {
      Material: "Cotton / Jute / Canvas",
      Closure: "Drawstring",
      Printing: "Logo / Tag",
      Finish: "Natural / Dyed",
      Packing: "Bulk Carton",
      Usage: "Kits / Packaging"
    },
    sizes: {
      Small: "10 × 15 cm",
      Medium: "15 × 20 cm",
      Large: "20 × 30 cm",
      XL: "30 × 40 cm",
      Custom: "Available"
    },
    moq: "1000 Pcs"
  },
  "custom-sourcing": {
    title: "Custom Sourcing Program",
    category: "Open brief sourcing",
    description: "For buyers who need a conversation beyond a fixed catalog, including private label development and category-specific sourcing from India with sustainability goals in mind.",
    images: [
      "assets/images/hero-trade-showcase.png",
      "assets/images/category-jute-bags.png",
      "assets/images/category-gift-bags.png",
      "assets/images/category-promotional-totes.png"
    ],
    specs: {
      Category: "Custom",
      Material: "As Required",
      Branding: "Private Label",
      Sampling: "On Request",
      Packaging: "Customizable",
      Usage: "Project Based"
    },
    sizes: {
      Standard: "As per product",
      Custom: "Available",
      Packaging: "Available",
      Branding: "Available",
      Sampling: "Discuss"
    },
    moq: "Depends on Product"
  }
};

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const trigger = window.innerHeight * 0.86;

  reveals.forEach(element => {
    if (element.getBoundingClientRect().top < trigger) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const modal = document.querySelector("#productModal");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalMainImage = document.querySelector("#modalMainImage");
const modalThumbs = document.querySelector("#modalThumbs");
const modalSpecs = document.querySelector("#modalSpecs");
const modalSizes = document.querySelector("#modalSizes");
const modalMoq = document.querySelector("#modalMoq");
const modalInquiry = document.querySelector("#modalInquiry");

function listItems(object) {
  return Object.entries(object)
    .map(([key, value]) => `<li><strong>${key}</strong><span>${value}</span></li>`)
    .join("");
}

function productNameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/and/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function openProductModal(productKey) {
  const product = products[productKey];
  if (!product || !modal) return;

  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;
  modalMainImage.src = product.images[0];
  modalMainImage.alt = product.title;
  modalSpecs.innerHTML = listItems(product.specs);
  modalSizes.innerHTML = listItems(product.sizes);
  modalMoq.textContent = product.moq;
  modalInquiry.href = `inquiry.html?product=${encodeURIComponent(product.title)}`;

  modalThumbs.innerHTML = product.images
    .map((image, index) => `
      <button class="thumb ${index === 0 ? "active" : ""}" type="button" data-image="${image}">
        <img src="${image}" alt="${product.title} image ${index + 1}">
      </button>
    `)
    .join("");

  modalThumbs.querySelectorAll(".thumb").forEach(button => {
    button.addEventListener("click", () => {
      if (button.classList.contains("active")) return;
      modalThumbs.querySelectorAll(".thumb").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      
      // Smooth fade transition
      modalMainImage.classList.add("image-transition");
      setTimeout(() => {
        modalMainImage.src = button.dataset.image;
        // Handle load or fallback timeout in case load doesn't fire
        modalMainImage.onload = () => {
          modalMainImage.classList.remove("image-transition");
        };
        setTimeout(() => {
          modalMainImage.classList.remove("image-transition");
        }, 300);
      }, 200);
    });
  });

  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeProductModal() {
  if (!modal) return;
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-product]");
  if (button) {
    event.preventDefault();
    openProductModal(button.dataset.product);
  }
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
  button.addEventListener("click", closeProductModal);
});

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeProductModal();
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProductModal();
  }
});

/* Auto-select product on inquiry page from URL:
   inquiry.html?product=Jute%20Shopping%20Bags
*/
function prefillProductFromURL() {
  const params = new URLSearchParams(window.location.search);
  const productFromURL = params.get("product");
  const productSelect = document.querySelector('[name="product"]');

  if (!productFromURL || !productSelect) return;

  [...productSelect.options].forEach(option => {
    if (option.value === productFromURL || option.textContent.trim() === productFromURL) {
      productSelect.value = option.value;
    }
  });
}

prefillProductFromURL();

function showFormMessage(form, type, message) {
  let messageBox = form.querySelector(".form-message");

  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.className = "form-message";
    form.appendChild(messageBox);
  }

  messageBox.className = `form-message ${type}`;
  messageBox.textContent = message;
}

function collectFormData(form) {
  const formData = new FormData(form);
  const payload = {};

  formData.forEach((value, key) => {
    payload[key] = value;
  });

  payload.page = document.title;
  payload.url = window.location.href;
  payload.submittedAt = new Date().toISOString();

  return payload;
}

async function submitToGoogleSheets(form) {
  const submitButton = form.querySelector('[type="submit"]');
  const originalText = submitButton ? submitButton.textContent : "";

  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT")) {
    showFormMessage(
      form,
      "error",
      "Google Sheets is not connected yet. Paste your Apps Script Web App URL in assets/js/main.js."
    );
    return;
  }

  const payload = collectFormData(form);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  showFormMessage(form, "loading", "Sending your inquiry...");

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    showFormMessage(form, "success", "Thank you. Your inquiry has been submitted successfully.");
    form.reset();
    prefillProductFromURL();
  } catch (error) {
    console.error(error);
    showFormMessage(form, "error", "Something went wrong. Please try again or email us directly.");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}

document.querySelectorAll("form[data-google-sheet]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    submitToGoogleSheets(form);
  });
});

/* =====================================================
   SHREE GLOBAL - PRODUCT SEARCH & FILTER LOGIC
   ===================================================== */
const searchInput = document.querySelector("#productSearch");
const filterPills = document.querySelectorAll(".pill");

let currentCategory = "all";
let searchQuery = "";

function applyFilters() {
  const currentProductCards = document.querySelectorAll(".product-card");
  currentProductCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();
    const category = card.dataset.category || "";
    
    const matchesCategory = currentCategory === "all" || category === currentCategory;
    const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);
    
    if (matchesCategory && matchesSearch) {
      card.classList.remove("filtered-out");
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 50);
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        if (card.style.opacity === "0") {
          card.classList.add("filtered-out");
        }
      }, 300);
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });
}

if (filterPills) {
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.filter;
      applyFilters();
    });
  });
}

/* =====================================================
   SHREE GLOBAL - SERVERLESS GOOGLE SHEETS CMS INTEGRATION
   ===================================================== */

function createProductCardHTML(key, product) {
  // Normalize category string to slug
  let catSlug = (product.category || "").toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ and /g, "-")
    .replace(/ /g, "-");
  
  // Custom mapping for local fallback categories
  if (catSlug === "retail-essential") catSlug = "retail-essential";
  else if (catSlug === "marketing-events") catSlug = "marketing";
  else if (catSlug === "premium-packaging") catSlug = "packaging";
  else if (catSlug === "gifting-beverage") catSlug = "gifting";
  else if (catSlug === "flexible-utility-line" || catSlug === "utility-line") catSlug = "utility";
  else if (catSlug === "open-brief-sourcing" || catSlug === "custom-sourcing") catSlug = "custom";
  
  const badgeMap = {
    "retail-essential": "Retail essential",
    "marketing": "Marketing",
    "packaging": "Packaging",
    "gifting": "Gifting",
    "utility": "Utility",
    "custom": "Custom Sourcing"
  };
  
  const badge = badgeMap[catSlug] || product.category || "New Category";
  const mainImg = product.images && product.images.length > 0 ? product.images[0] : "assets/images/category-jute-bags.png";
  
  return `
<article class="product-card glow-card reveal-spring active" data-category="${catSlug}">
  <div class="glow-overlay"></div>
  <div class="product-image">
    <img src="${mainImg}" alt="${product.title}" onerror="this.src='assets/images/category-jute-bags.png'">
    <span class="product-badge">${badge}</span>
  </div>
  <div class="product-body">
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <div class="product-actions">
      <button class="link-btn" type="button" data-product="${key}">View Details →</button>
      <a class="btn btn-dark" href="inquiry.html?product=${encodeURIComponent(product.title)}">Request Inquiry</a>
    </div>
  </div>
</article>
  `;
}

function renderPartnersGrid(fetchedPartners) {
  const partnerGrid = document.querySelector("#partnerGrid");
  if (!partnerGrid) return;
  
  const staticLogos = [
    "assets/images/company1.png",
    "assets/images/company2.png",
    "assets/images/company3.png",
    "assets/images/Bls.jpeg",
    "assets/images/Zaira.jpeg",
    "assets/images/Anurodh.jpeg"
  ];
  
  const allLogos = [
    ...staticLogos.map(url => ({ name: "Logo", logoUrl: url })),
    ...fetchedPartners
  ];
  
  const doubleLogos = [...allLogos, ...allLogos];
  
  partnerGrid.innerHTML = doubleLogos.map(part => {
    return `
      <div class="marquee-item">
        <img src="${part.logoUrl}" alt="${part.name}" onerror="this.src='assets/images/logo.png'">
      </div>
    `;
  }).join("");
}

async function initCMS() {
  let cmsData = { products: [], partners: [] };
  let loadedSuccessfully = false;

  if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT")) {
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getData`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          cmsData = data;
          loadedSuccessfully = true;
        }
      }
    } catch (err) {
      console.warn("Could not fetch Google Sheets CMS data, trying local storage fallback.", err);
    }
  }

  // Fallback to localStorage if sheets call failed
  if (!loadedSuccessfully) {
    try {
      const localProds = localStorage.getItem("shree_products");
      const localParts = localStorage.getItem("shree_partners");
      if (localProds) cmsData.products = JSON.parse(localProds);
      if (localParts) cmsData.partners = JSON.parse(localParts);
    } catch (e) {
      console.error("Error reading fallback local storage", e);
    }
  }

  // 1. Merge products into global products object
  if (cmsData.products && cmsData.products.length > 0) {
    cmsData.products.forEach(prod => {
      const key = productNameToSlug(prod.title);
      products[key] = {
        title: prod.title,
        category: prod.category,
        description: prod.description,
        images: prod.images && prod.images.length > 0 ? prod.images : ["assets/images/category-jute-bags.png"],
        specs: prod.specs || {},
        sizes: prod.sizes || {},
        moq: prod.moq || "1000 Pcs"
      };
    });
  }

  // 2. Render product grid on products.html
  const productGrid = document.querySelector("#productGrid");
  if (productGrid) {
    const allProductsHTML = Object.entries(products).map(([key, prod]) => {
      return createProductCardHTML(key, prod);
    }).join("");
    productGrid.innerHTML = allProductsHTML;
    applyFilters();
  }

  // 3. Render partners grid on collections.html
  if (cmsData.partners && cmsData.partners.length > 0) {
    renderPartnersGrid(cmsData.partners);
  }
}

initCMS();

/* =====================================================
   SHREE GLOBAL - PREMIUM UI STYLE IMPLEMENTATIONS
   ===================================================== */

// 1. Preloader Fade Out helper
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 600);
    }, 1100);
  }
});

// 2. Floating Glass Navbar toggle on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".navbar");
  if (header) {
    if (window.scrollY > 80) {
      header.classList.add("floating-active");
    } else {
      header.classList.remove("floating-active");
    }
  }
});

// 3. Cursor Glow Position Tracker
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".glow-card");
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// 4. Spring Reveal Scroll Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const springObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Bind observer to elements
  document.querySelectorAll(".reveal-spring").forEach(el => {
    springObserver.observe(el);
  });
});

// 5. Magnetic Button Micro-Interactions
document.addEventListener("DOMContentLoaded", () => {
  const magneticEls = document.querySelectorAll(".magnetic");
  
  magneticEls.forEach(el => {
    el.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
    
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      const maxMove = 12; // Cap maximum movement to 12px
      const dx = x * 0.08; // Reduce pull factor to 8%
      const dy = y * 0.08;
      
      const clampedX = Math.max(-maxMove, Math.min(maxMove, dx));
      const clampedY = Math.max(-maxMove, Math.min(maxMove, dy));
      
      el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
    });
    
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px)";
    });
  });
});

// FAQ Accordion Click Handler
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");
  
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isActive = item.classList.contains("active");
      
      // Close all open items
      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
