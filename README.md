# The Urban Plate - Modern Casual Dining Restaurant Website

A premium, responsive restaurant portfolio website designed and developed for **The Urban Plate**, situated in Buldhana, Maharashtra.

> **Portfolio Showcase Notice:** This project is created as a demonstration website. All business information, pricing, menu items, guest reviews, and contact phone numbers are sample/placeholder content.

---

## 🌟 Key Highlights & Design Features
- **Visual Aesthetic:** Refined dark-luxury theme with gold and terracotta accents, soft ambient glows, and clean typography.
- **Typography:** `Playfair Display` (editorial serif for titles) paired with `Plus Jakarta Sans` (modern geometric sans-serif for readability).
- **Responsive Architecture:** Fully mobile-first design optimized for phones, tablets, laptops, and ultra-wide screens.
- **Micro-Interactions:** Smooth scrolling, active navigation spy, mobile slide-in drawer, interactive category menu filter, full-screen image lightbox, and simulated table reservation system.
- **WhatsApp Integration:** Direct click-to-chat links with pre-filled order/inquiry templates (`https://wa.me/919876543210`).
- **Zero-Dependency Stack:** Built with pure HTML5, modern CSS3, and ES6 JavaScript without external build steps, frameworks, or paid dependencies.

---

## 🍽️ Website Structure & Sections
1. **Top Notice Bar:** Clear portfolio demonstration disclosure.
2. **Sticky Header & Navigation:** Monogram branding, navigation links, quick call button, and mobile hamburger drawer.
3. **Hero Section:** High-impact heading, culinary photography, dual action CTAs, live kitchen status badge, and key feature metrics.
4. **About The Restaurant:** Culinary philosophy, local Buldhana connection, 3 core pillars (Farm-to-fork, Master Craft, Warm Ambiance), and Chef quote.
5. **Featured Specialties:** Marquee dish cards with dietary indicators (Veg/Non-Veg dots), pricing in INR (₹), portion sizing, and WhatsApp order triggers.
6. **Complete Categorized Menu:** Filter tabs (`All`, `Starters & Tandoor`, `Main Courses`, `Biryani & Breads`, `Desserts`, `Beverages & Mocktails`) with 12+ items and dietary customizations.
7. **Food Gallery with Lightbox:** Responsive image mosaic with click-to-enlarge lightbox modal.
8. **Customer Testimonials:** Verified guest review cards with 5-star ratings, clearly labeled as sample content.
9. **Restaurant Opening Hours:** Weekday vs. weekend lunch & dinner schedules, takeaway timings, and weekend rush alerts.
10. **Location & Google Map:** Buldhana address, parking/amenity details, embedded Google Map, and direct direction CTA.
11. **Contact & Table Booking:**
    - Direct WhatsApp chat card
    - Phone and email reservation channels
    - Interactive Table Reservation Form with client validation and toast notification
12. **Floating WhatsApp & Back-to-Top:** Fixed bottom-right buttons with hover tooltips and smooth transitions.
13. **Footer:** Comprehensive navigation links, contact summary, portfolio disclaimer, and copyright.

---

## 🚀 How to Preview and Run the Website

### Option 1: Direct Browser Launch (Easiest & Instant)
Since this project uses pure vanilla HTML, CSS, and JS:
1. Navigate to the project folder:
   `c:\Users\Abhi\Desktop\Local-Website-Agency\restaurant-demo`
2. Double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python's Built-in HTTP Server
If you have Python installed, you can run a local web server:
```bash
cd c:\Users\Abhi\Desktop\Local-Website-Agency\restaurant-demo
python -m http.server 3000
```
Open your browser and visit: `http://localhost:3000`

### Option 3: Using VS Code / IDE Live Server
1. Open the `restaurant-demo` folder in VS Code or Antigravity IDE.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## ⚙️ Maintenance & Customization Guide

### 1. Replacing Placeholder Phone & WhatsApp Number
The demo uses the placeholder number `+91 98765 43210` (`919876543210`).
To update it with a real restaurant number:
- Open `index.html` and search for `9876543210`. Replace with your 10-digit phone number with country code (e.g. `91XXXXXXXXXX`).

### 2. Updating Menu Items & Pricing
In `index.html`, locate the `<section id="menu">` block. Each menu item follows this clean structure:
```html
<div class="menu-item-row" data-category="starters">
  <div class="menu-item-thumb">
    <img src="your-image-url.jpg" alt="Dish Name">
  </div>
  <div class="menu-item-info">
    <div class="menu-item-top">
      <div class="menu-item-name-group">
        <span class="diet-icon veg"></span> <!-- or non-veg -->
        <span class="menu-item-name">Dish Name</span>
      </div>
      <span class="menu-item-price">₹320</span>
    </div>
    <p class="menu-item-desc">Dish description...</p>
  </div>
</div>
```

### 3. Updating Opening Hours
Edit the timings under `<section id="hours">` in `index.html`. The live status logic in `js/main.js` (`initLiveHoursStatus`) can also be customized with any lunch/dinner time window.

---

## 📁 File Structure
```
restaurant-demo/
│
├── index.html          # Semantic HTML5 document containing all 9 sections
├── css/
│   └── style.css       # Complete design system, responsive styles, animations
├── js/
│   └── main.js         # Mobile drawer, filters, lightbox, form, toast & hours
└── README.md           # Documentation, preview instructions & maintenance guide
```
