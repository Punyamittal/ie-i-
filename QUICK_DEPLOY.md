# Quick Deployment Guide

## ✅ Production Ready Checklist

- [x] Build optimized (minified, chunked)
- [x] Console logs removed from production
- [x] Vite config optimized
- [x] Deployment configs created (Vercel, Netlify)
- [x] Build tested successfully

## 🚀 Fastest Deployment: Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import: `Punyamittal/ie-i-`
5. Configure:
   - **Root Directory:** `IE-I--main`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
6. Click "Deploy"

**Done!** Your site will be live in ~2 minutes.

---

## 📋 Alternative: Netlify (5 minutes)

1. Go to https://netlify.com
2. Sign in with GitHub
3. "Add new site" → "Import an existing project"
4. Select: `Punyamittal/ie-i-`
5. Settings:
   - Base directory: `IE-I--main`
   - Build command: `npm run build`
   - Publish directory: `IE-I--main/dist`
6. Deploy

---

## 🔧 Manual Build & Deploy

```bash
# 1. Build
cd IE-I--main
npm install
npm run build

# 2. Upload dist/ folder to your hosting
# - Upload all contents of dist/ to public_html or www
# - Configure SPA routing (see DEPLOYMENT.md)
```

---

## 📝 Important Notes

- ✅ Build tested and working
- ✅ All assets optimized
- ✅ Supabase configured
- ✅ Forms ready for production
- ⚠️ Ensure Supabase tables exist: `membership_applications` and `contact_messages`

---

## 🐛 Troubleshooting

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**404 on routes?**
- Ensure SPA routing is configured (see DEPLOYMENT.md)
- Vercel/Netlify configs already include this

**Need help?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
