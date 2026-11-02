# ORCHID CREATIONS — OFFICIAL STUDIO WEBSITE

> **Premium Dark Liquid Glass Multi-Page Video Post-Production Portfolio**  
> Founded by **Sourav Roy** • Established 2019 • West Bengal, India  
> Live Website: [https://sroy9584.github.io/orchid-creations/](https://sroy9584.github.io/orchid-creations/)

---

## 🌟 Overview & Architecture

**Orchid Creations** is a modern, high-performance, multi-page web platform designed for video post-production studios. Built with Apple-inspired **Dark Liquid Glass aesthetics**, frosted glass navigation, smooth spring motion, and automated cloud synchronization for unlisted YouTube portfolio playlists.

### Key Features
- **Multi-Page Experience**: Dedicated pages for **Home**, **Portfolio**, **Services**, **Pricing**, **About**, and **Contact**.
- **Liquid Glass Design System**: Frosted glass navigation, transparent glass cards, backdrop blur, ambient reflections, and refined typography.
- **Automated YouTube Playlist Synchronization**: Scheduled GitHub Actions workflow automatically syncs new unlisted videos from YouTube playlists every 30 minutes.
- **Embedded Modal Player**: Plays unlisted YouTube videos directly in-app using official `youtube-nocookie.com` 16:9 embeds without redirecting visitors to YouTube.
- **Zero-Maintenance Pricing & Services**: Centralized TypeScript configuration files allow instant price and service updates without touching UI components.
- **GitHub Pages Routing**: Built with React Router `HashRouter` for zero-configuration, 100% reliable direct links and browser refresh support.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Bundler & Tooling** | Vite 5 |
| **Styling** | Tailwind CSS (Custom Dark Glass Theme) |
| **Animations** | Framer Motion (respects reduced-motion) |
| **Icons** | Lucide React |
| **Routing** | React Router DOM (`HashRouter`) |
| **Automation** | GitHub Actions (`sync-youtube-playlists.yml`, `deploy.yml`) |
| **Hosting** | GitHub Pages (Static Hosting) |

---

## 📂 Project Structure

```text
e:/Orchid Creation/
├── .github/
│   └── workflows/
│       ├── deploy.yml                   # Automated GitHub Pages builder & deployment
│       └── sync-youtube-playlists.yml   # Scheduled 30-min YouTube API playlist synchronizer
├── public/
│   ├── assets/
│   │   ├── logo/
│   │   │   ├── orchid-logo.svg          # Official brand logo (SVG)
│   │   │   └── orchid-logo.png          # Official brand logo (PNG alternative)
│   │   └── images/
│   │       ├── founder-placeholder.svg  # Silhouette placeholder for Sourav Roy
│   │       └── sourav-roy.jpg           # (Upload your actual founder photo here)
│   ├── robots.txt                       # SEO Crawler directions
│   └── sitemap.xml                      # XML Sitemap
├── scripts/
│   └── sync-youtube.cjs                 # Node.js automated YouTube playlist fetcher
├── src/
│   ├── assets/                          # Internal design assets
│   ├── components/                      # Reusable Liquid Glass UI components
│   │   ├── AboutSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturedWorks.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── PortfolioFilters.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── PricingCard.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── SyncBadge.tsx
│   │   ├── VideoCard.tsx
│   │   └── VideoModal.tsx
│   ├── data/                            # ⭐ CENTRALIZED BUSINESS & PORTFOLIO DATA ⭐
│   │   ├── portfolioConfig.ts           # YouTube playlist IDs & category names
│   │   ├── portfolioVideos.json         # Synced video cache (auto-updated by GitHub Action)
│   │   ├── pricingConfig.ts             # Packages, prices (₹), deliverables & WhatsApp prompts
│   │   ├── servicesConfig.ts            # 18 post-production services & descriptions
│   │   ├── siteConfig.ts                # Studio details, phone, email, bio & software
│   │   └── socialLinks.ts               # WhatsApp, Instagram, YouTube, Facebook & Email URLs
│   ├── hooks/
│   │   ├── usePortfolio.ts              # Portfolio filtering, search & modal controller
│   │   └── useReducedMotion.ts          # Accessibility hook for motion sensitivity
│   ├── pages/                           # 6 dedicated pages
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Pricing.tsx
│   │   └── Services.tsx
│   ├── styles/
│   │   └── globals.css                  # Liquid glass utilities & ambient glow styles
│   ├── types/                           # Strongly-typed TypeScript interfaces
│   ├── App.tsx                          # Main shell & HashRouter configuration
│   └── main.tsx                         # React root entry
├── .env.example                         # Environment secret guide
├── package.json                         # Scripts & dependencies
├── tailwind.config.js                   # Color palette & glass tokens
├── tsconfig.json                        # TypeScript rules
└── vite.config.ts                       # Vite base path configuration
```

---

## 📖 HOW TO UPDATE YOUR WEBSITE

You can manage almost every aspect of Orchid Creations simply by updating files in the `src/data/` folder and `public/assets/` directory.

---

### 1. Uploading Your Official Logo
The website expects your official logo in `public/assets/logo/`:
1. Save your logo file as `orchid-logo.svg` or `orchid-logo.png`.
2. Copy it into `public/assets/logo/orchid-logo.svg` (or `.png`).
3. If using `.png`, open `src/data/siteConfig.ts` and update line:
   ```ts
   logoPath: './assets/logo/orchid-logo.png',
   ```
*The logo will immediately appear in the sticky navigation bar, mobile menu, and footer.*

---

### 2. Uploading Founder Photograph (Sourav Roy)
1. Prepare your photograph in portrait ratio (e.g. 800 × 1000 px).
2. Save it as `public/assets/images/sourav-roy.jpg`.
3. Open `src/data/siteConfig.ts` and set:
   ```ts
   founderPhotoPath: './assets/images/sourav-roy.jpg',
   ```
*This replaces the silhouette placeholder on both the Home preview and the About page.*

---

### 3. Automatic YouTube Playlist Synchronization

Whenever you add a new video to your YouTube playlists as **UNLISTED**, it will appear automatically on your website!

#### Step A: Configure Your YouTube Playlist IDs
Open `src/data/portfolioConfig.ts`. Replace placeholder playlist IDs (`PL_..._REPLACE_ID`) with your real YouTube playlist IDs:

```ts
{
  id: 'bengali-weddings',
  title: 'Bengali Weddings',
  playlistId: 'PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Paste your real playlist ID here
  description: 'Traditional Bengali rituals and cinematic ceremony films.',
  featured: true,
  displayOrder: 1,
}
```

#### Step B: Add Your YouTube API Key to GitHub Repository Secrets
1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Create a project and enable **YouTube Data API v3**.
3. Generate an API Key under **APIs & Services -> Credentials**.
4. *(Recommended)* Restrict the key's API access to **YouTube Data API v3** only.
5. In your GitHub repository, navigate to:  
   **Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ **New repository secret**.
6. Set the Secret Name to:
   ```text
   YOUTUBE_API_KEY
   ```
7. Paste your API key in the Secret value field and click **Add secret**.

#### How the Automated Sync Works
- Every **30 minutes**, GitHub Actions runs `.github/workflows/sync-youtube-playlists.yml`.
- It fetches newly added unlisted videos from all configured playlists.
- It detects additions, updates `src/data/portfolioVideos.json`, and commits the changes.
- This automatically triggers `.github/workflows/deploy.yml` to publish the new videos to GitHub Pages!
- You can also trigger an instant sync anytime by going to the **Actions** tab on GitHub, clicking **Sync YouTube Playlists to Portfolio**, and clicking **Run workflow**.

---

### 4. Updating Pricing & Packages (₹)
Open `src/data/pricingConfig.ts`. You can edit:
- Package title & price (e.g. `price: '₹5,000'`)
- Included deliverables (e.g. `Full Video (30–40 minutes)`, `Teaser`)
- Features checklist
- WhatsApp message pre-filled for each package
- Payment terms (e.g. 50% advance notice)

---

### 5. Updating Services
Open `src/data/servicesConfig.ts`. You can:
- Add, edit, or remove any of the 18 post-production services.
- Adjust short descriptions, full descriptions, or deliverables.
- Toggle `featuredInHome: true/false` to control which services appear on the homepage.

---

### 6. Updating Contact Details & Social Media Links
Open `src/data/siteConfig.ts` and `src/data/socialLinks.ts`:
- **WhatsApp Phone**: Edit `whatsappNumber: '919876543210'` (without `+` or spaces).
- **Email**: Edit `contactEmail: 'your-email@gmail.com'`.
- **Social Links**: In `src/data/socialLinks.ts`, update URLs for Facebook, Instagram, YouTube, and WhatsApp.

---

### 7. Connecting the Contact Form (Formspree)
GitHub Pages is a static host and does not run server code.
- By default, submitting the form prepares a structured WhatsApp message directly to Sourav Roy.
- If you prefer direct email submissions, create a free form endpoint at **[Formspree.io](https://formspree.io/)** (e.g. `https://formspree.io/f/xyzabcde`).
- Open `src/data/siteConfig.ts` and set:
  ```ts
  formspreeEndpoint: 'https://formspree.io/f/your_form_id',
  ```
- Submissions will now go directly to your email inbox!

---

## 🚀 Local Development & Testing

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Test automated YouTube sync locally (requires YOUTUBE_API_KEY)
$env:YOUTUBE_API_KEY="your_api_key"; npm run sync-youtube

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

1. Commit and push all files to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete Orchid Creations premium portfolio website"
   git push origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** ➔ **Pages**.
   - Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow will automatically run, build, and deploy your site to:
   ```text
   https://sroy9584.github.io/orchid-creations/
   ```

---

## 🔒 Security & Privacy Notice
- **Unlisted YouTube Videos**: Unlisted videos are viewable by anyone with the link. The website securely embeds them via standard YouTube nocookie players.
- **YouTube API Key**: Your API key is stored only inside **GitHub Repository Secrets** (`YOUTUBE_API_KEY`) and is used during server-side GitHub Actions workflows. It is **never** bundled into public frontend code.

---

© 2026 **ORCHID CREATIONS**. Crafted with cinematic precision for **Sourav Roy**.

