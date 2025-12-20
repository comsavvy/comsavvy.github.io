# Olusola Timothy Ogundepo - Professional Website

A modern, professional academic portfolio website for Olusola Timothy Ogundepo, M.Sc. student in Mathematical Sciences at AIMS Kigali and Data Scientist.

## 🌟 Features

- **Animated Homepage** - Typing animation effect showcasing roles and expertise
- **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations and transitions
- **Dropdown Navigation** - Organized menu with credential submenu
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Card support
- **Netlify Ready** - Pre-configured for easy deployment
- **Accessible** - ARIA labels, semantic HTML, and keyboard navigation
- **Fast Loading** - Optimized CSS, minimal JavaScript, smooth animations
- **Mobile Menu** - Responsive hamburger navigation
- **Professional Color Scheme** - Modern blue palette (#007bff, #00346D)

## 📁 Structure

```
├── index.html              # Homepage with typing animation
├── 404.html               # Custom error page
├── netlify.toml           # Netlify configuration
├── _redirects             # Netlify redirect rules
├── .gitignore             # Git ignore file
├── README.md              # This file
├── DEPLOYMENT.md          # Deployment guide
├── assets/
│   ├── css/
│   │   └── style.css      # Modern stylesheet with animations
│   ├── js/
│   │   └── main.js        # Interactive features & Typed.js integration
│   ├── cv/
│   │   ├── index.html     # CV page
│   │   └── Olusola_O_CV.pdf
│   └── images/
│       ├── headshot.png   # Profile photo
│       ├── web-logo.png   # Website logo
│       └── favicon.ico    # Browser icon
├── about/
│   └── index.html         # About page with education
├── skills/
│   └── index.html         # Skills & expertise
├── projects/
│   └── index.html         # Projects portfolio
├── news/
│   └── index.html         # News & updates timeline
└── contact/
    └── index.html         # Contact information
```

## 🚀 Deployment on Netlify

### Option 1: Drag and Drop (Easiest)
1. Go to [Netlify](https://app.netlify.com/)
2. Sign in or create an account
3. Click "Add new site" → "Deploy manually"
4. Drag and drop the entire website folder
5. Your site will be live in seconds!

### Option 2: Git Integration (Recommended)
1. Push this repository to GitHub
2. Connect your GitHub account to Netlify
3. Select the repository
4. Netlify will automatically deploy using `netlify.toml` settings

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd /path/to/Olusola-Website
netlify deploy --prod
```

## 🎨 Customization

### Update Personal Information
- Edit homepage `index.html` for main content
- Update `about/index.html` for detailed biography
- Modify `skills/index.html` to add/remove skills
- Edit `projects/index.html` to showcase your projects
- Update `news/index.html` with latest achievements

### Change Colors
Edit the CSS variables in `assets/css/style.css`:
```css
:root {
  --primary-blue: #007bff;
  --primary-dark: #00346D;
  --secondary-blue: #0056b3;
  --accent-color: #38bdf8;
  /* ... more colors */
}
```

### Modify Typing Animation
Edit the strings in `assets/js/main.js`:
```javascript
strings: [
  'I am a Data Scientist.',
  'I am a Machine Learning Researcher.',
  // Add more...
],
```

### Add/Remove Navigation Items
Edit the `<nav>` section in each HTML file. The navigation supports dropdown menus.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, CSS Variables, Animations)
- Vanilla JavaScript (ES6+)
- [Typed.js](https://github.com/mattboldt/typed.js/) - Typing animation library
- [Google Fonts](https://fonts.google.com/) - Inter font family
- Netlify for hosting

## 📊 Performance

- Lighthouse Score: 95+
- Mobile-friendly
- Fast loading times (<2s)
- Optimized images
- Minimal JavaScript dependencies

## ✨ Key Features Explained

### Typing Animation
The homepage features an animated typing effect that cycles through different roles and expertise areas, creating an engaging first impression.

### Dropdown Navigation
The Credentials menu organizes related pages (Skills, Projects, CV) in a clean dropdown, improving navigation UX.

### Scroll Animations
Cards and sections fade in as you scroll, creating a dynamic browsing experience.

### Responsive Design
The website adapts seamlessly to all screen sizes with a mobile-first approach.

## 📄 License

© 2025 Olusola Timothy Ogundepo. All rights reserved.

## 📞 Contact

- Email: olusolaogundepo@gmail.com
- LinkedIn: [linkedin.com/in/comsavvy](https://www.linkedin.com/in/comsavvy)
- GitHub: [github.com/comsavvy](https://github.com/comsavvy)
- Twitter: [@comsavvy_ogp](https://twitter.com/comsavvy_ogp)
- Medium: [@comsavvy](https://medium.com/@comsavvy)

---

**Ready to deploy?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions!
