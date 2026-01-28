# PickleFest

A modern, responsive website for PickleFest - The Ultimate Pickle Celebration!

## Features

- 🎨 Modern, clean design inspired by top pickle festivals
- 📱 Fully responsive (mobile, tablet, desktop)
- ⏰ Live countdown timer
- 🛍️ Vendor information section
- 📸 Gallery section (ready for your images)
- 📧 Contact form
- 🎯 Smooth scrolling navigation
- ✨ Beautiful animations and transitions

## Getting Started

### View Locally

1. Simply open `index.html` in your web browser, or
2. Use a local server:

**Python:**
```bash
python -m http.server 8000
```

**Node.js (with http-server):**
```bash
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## Customization

### Update Event Date
Edit the countdown timer date in `script.js`:
```javascript
const eventDate = new Date('2026-08-21 10:00:00').getTime();
```

### Add Your Information
Fill in the placeholder text in `index.html`:
- Location address
- Email address
- Phone number
- Social media links

### Add Images
Replace the gallery placeholders with your actual images by updating the `gallery-placeholder` divs in `index.html`.

### Colors
Customize colors in `styles.css` by modifying the CSS variables in the `:root` selector.

## File Structure

```
PickleFest/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)