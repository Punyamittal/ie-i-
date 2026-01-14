# Deployment Guide

This guide will help you deploy the IE(I) website to production.

## Prerequisites

- Node.js 18+ installed
- Git repository access
- Account on your chosen hosting platform (Vercel, Netlify, etc.)

## Pre-Deployment Checklist

### 1. Build the Project Locally

Test the production build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

Verify that:
- ✅ The build completes without errors
- ✅ All pages load correctly
- ✅ Images and assets are loading
- ✅ Forms are working (if Supabase is configured)

### 2. Environment Variables

The project uses Supabase. Ensure your Supabase credentials are configured:

- Supabase URL: `https://ktmrbmjfcttzbpwfyzyg.supabase.co`
- Supabase Anon Key: Already configured in `src/lib/supabase.js`

**Note:** For better security, consider moving these to environment variables in production.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is optimized for React/Vite applications and offers free hosting.

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via GitHub** (Recommended):
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository: `Punyamittal/ie-i-`
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `IE-I--main`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   cd IE-I--main
   vercel
   ```

4. **Custom Domain** (Optional):
   - In Vercel dashboard, go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

#### Vercel Configuration File (Optional)

Create `vercel.json` in the root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Option 2: Netlify

Netlify offers excellent static site hosting with continuous deployment.

#### Steps:

1. **Deploy via GitHub**:
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository: `Punyamittal/ie-i-`
   - Configure:
     - **Base directory:** `IE-I--main`
     - **Build command:** `npm run build`
     - **Publish directory:** `IE-I--main/dist`
   - Click "Deploy site"

2. **Deploy via CLI**:
   ```bash
   npm install -g netlify-cli
   cd IE-I--main
   npm run build
   netlify deploy --prod --dir=dist
   ```

#### Netlify Configuration File

Create `netlify.toml` in the root:

```toml
[build]
  base = "IE-I--main"
  command = "npm run build"
  publish = "IE-I--main/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

#### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist -b gh-pages"
     },
     "homepage": "https://Punyamittal.github.io/ie-i-"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

### Option 4: Traditional Hosting (cPanel, FTP)

For shared hosting or VPS:

#### Steps:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload the entire `dist` folder contents to your web server
   - Place files in `public_html` or `www` directory

3. **Configure server**:
   - Ensure your server supports SPA routing
   - Add `.htaccess` (Apache) or `nginx.conf` (Nginx) for routing

#### Apache `.htaccess` (in dist folder):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx Configuration:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Post-Deployment

### 1. Verify Deployment

- ✅ Check all pages load correctly
- ✅ Test navigation
- ✅ Verify forms submit successfully
- ✅ Check mobile responsiveness
- ✅ Test on different browsers

### 2. Performance Optimization

- Enable compression (gzip/brotli) on your hosting
- Set up CDN for static assets
- Configure caching headers

### 3. Monitoring

- Set up error tracking (Sentry, etc.)
- Monitor form submissions
- Check Supabase logs for errors

### 4. SEO

- Verify meta tags are correct
- Submit sitemap to search engines
- Test with Google Search Console

---

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### 404 Errors on Routes

- Ensure SPA routing is configured (see server configs above)
- Check that `index.html` is served for all routes

### Images Not Loading

- Verify image paths are correct (should start with `/`)
- Check that images are in the `public` folder
- Ensure build includes all assets

### Supabase Errors

- Verify Supabase script is loaded in `index.html`
- Check browser console for errors
- Verify Supabase project is active

---

## Quick Deploy Commands

```bash
# Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod

# Deploy to GitHub Pages
npm run deploy
```

---

## Support

For issues or questions:
- Check the [GitHub repository](https://github.com/Punyamittal/ie-i-)
- Review Vite documentation: https://vitejs.dev
- Check hosting platform documentation
