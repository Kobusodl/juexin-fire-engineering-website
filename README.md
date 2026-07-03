# Juexin Fire Engineering Multipage Website Concept

This is a modern, premium, fully responsive static website concept for **Juexin Fire Engineering (Pty) Ltd**.

The website is built with:

- HTML
- CSS
- Vanilla JavaScript
- No external JavaScript frameworks
- Google Fonts only
- Real Juexin-related source imagery copied from the local `Photos/` folder into web-ready asset folders

## Image Sources And Asset Folders

### `Photos/`

`Photos/` is the untouched source folder. It contains the original screenshots, logos, social media graphics, branded service images, project/site photos, maps and compliance visuals supplied for this concept.

Do not reference files from `Photos/` directly in website code. Copy selected images into the correct asset folder first and rename them with lowercase, web-friendly filenames.

### `assets/images/`

Use `assets/images/` for images used directly in the page layouts:

- Header and footer logos
- Logo mark accents
- Hero images
- About, solutions, industries and contact images
- Service card images
- Contact map/location image

Examples now in use:

- `juexin-logo-horizontal.png`
- `juexin-logo-mark.png`
- `book-consultation-inspection.png`
- `fire-safety-consultants.png`
- `industrial-conveyor-site.png`
- `gas-suppression-corridor.png`
- `mineguard-compliance-namibia.png`

### `assets/gallery/`

Use `assets/gallery/` for images shown by the gallery page. The gallery is static, so the browser cannot scan this folder automatically on GitHub Pages, Netlify or Cloudflare Pages.

Every gallery image must also be added to the `galleryImages` manifest in `script.js`.

## Replacing Hero Images

Homepage and inner page hero backgrounds are controlled directly on each hero section with a CSS custom property:

```html
<section class="page-hero" style="--hero-image: url('assets/images/example.png'); --hero-position: center;">
```

The shared full-width hero styling lives in `styles.css` under:

- `.hero`
- `.hero-home`
- `.hero-full`
- `.hero-bg`
- `.hero-content`
- `.page-hero`
- `.page-hero-content`

To replace a hero background image:

1. Copy the approved image into `assets/images/`.
2. Rename it with a clean lowercase filename, for example `industrial-fire-safety-hero.png`.
3. Open the relevant page, such as `index.html`, `about.html`, `solutions.html`, `industries.html`, `gallery.html` or `contact.html`.
4. Update the `--hero-image` URL on the top `<section>`.
5. Adjust `--hero-position` if the subject needs a better crop, for example `center right` or `center top`.
6. Check the page at desktop and mobile sizes to confirm the crop still works.

Hero backgrounds use `background-size: cover`, so choose images with enough visual space around the subject.

## Service And Industry Images

Service preview images are controlled in:

- `index.html` for the homepage service preview cards and Featured DHA section
- `solutions.html` for the full service cards

Industry card images are controlled in:

- `industries.html`

Use real project, site, system, consulting or plans imagery from `assets/images/` for these content sections. Keep branded social graphics mainly for the gallery unless the graphic is approved and fits the section without looking like a cropped social post.

## Adding Gallery Images

To add a new gallery image:

1. Copy the approved image into `assets/gallery/`.
2. Rename it with a clean lowercase filename, for example `gallery-industrial-project-04.png`.
3. Open `script.js`.
4. Add a new object to the `galleryImages` array:

```js
{
  src: 'assets/gallery/gallery-industrial-project-04.png',
  title: 'Industrial Project Review',
  category: 'Industrial',
  alt: 'Juexin fire engineering project review at an industrial facility',
  ratio: '4 / 3'
}
```

Supported gallery categories are:

- `Consulting`
- `Systems`
- `Industrial`
- `Compliance`
- `Brand`

The gallery filter buttons in `gallery.html` should match these category names.

## Contact Form

The contact form is Web3Forms-ready.

1. Open `contact.html`.
2. Search for `YOUR_WEB3FORMS_ACCESS_KEY`.
3. Replace it with the real Web3Forms access key.
4. Redeploy the static site.

Until the key is replaced, the form shows a demo-mode message instead of attempting to submit.

Before going live, replace `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html` with the final Web3Forms access key.

## Current Pages

- `index.html` - Home page with real hero imagery, service previews, DHA feature and CTA.
- `about.html` - About page with consulting imagery, brand proof and regional footprint visual.
- `solutions.html` - Eight service cards with relevant image pairings.
- `industries.html` - Visual industry cards for commercial, industrial, mining, retail, residential, hospitality and public infrastructure work.
- `gallery.html` - Manifest-driven gallery with filters and a vanilla JavaScript lightbox.
- `contact.html` - Contact page with Web3Forms-ready form, direct contact details and location visual.

## Deployment

This site is static and can be deployed to GitHub Pages, Cloudflare Pages, Netlify or Vercel without a build step.

For static hosting:

- Build command: leave blank.
- Output/publish directory: project root.
- Ensure `index.html`, `styles.css`, `script.js`, `assets/`, `robots.txt` and `sitemap.xml` are all deployed.

## Client Confirmation Before Publishing

Before publishing as the final official website, confirm:

- Final approved logo files.
- Image usage rights for every supplied photo or graphic.
- Final company registration and legal footer wording.
- Final service descriptions and naming.
- Formal memberships, registrations, accreditations and certification claims.
- Whether NFPA, SANS, ECSA, ASIB, IFE and CFPA should appear and exactly how they may be referenced.
- Final SEO title/description wording.
- Web3Forms access key and preferred form recipient.
- Whether WhatsApp should be shown publicly.
- Privacy policy and POPIA-related wording for the contact form if required.

Images used in this concept should be confirmed as client-owned, licensed, or approved for website use before publishing.
