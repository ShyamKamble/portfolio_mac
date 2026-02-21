# Deployment Guide

This guide covers deploying your macOS Portfolio to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/macos-portfolio)

### Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Environment Variables

Set these in your Vercel dashboard:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 📦 Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### netlify.toml Configuration

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t macos-portfolio .
```

### Run Container

```bash
docker run -p 3000:3000 macos-portfolio
```

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## ☁️ Deploy to AWS

### Using AWS Amplify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy

### Using EC2

1. SSH into your EC2 instance
2. Install Node.js and npm
3. Clone your repository
4. Install dependencies: `npm install`
5. Build: `npm run build`
6. Start with PM2: `pm2 start npm --name "portfolio" -- start`

## 🌐 Custom Domain Setup

### Vercel

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### DNS Configuration

Add these records to your DNS provider:

```
Type: A
Name: @
Value: [Vercel IP]

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔒 SSL/HTTPS

All recommended platforms (Vercel, Netlify) provide automatic SSL certificates via Let's Encrypt.

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Use next/image for automatic optimization
   ```

2. **Analyze Bundle**
   ```bash
   npm run build
   # Check .next/analyze for bundle size
   ```

3. **Test Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Test on real devices

### Post-Deployment

1. **Enable Caching**
   - Configure CDN caching headers
   - Use Vercel Edge Network

2. **Monitor Performance**
   - Set up Vercel Analytics
   - Monitor Core Web Vitals
   - Track user metrics

## 🔍 SEO Checklist

- [x] Sitemap generated (`/sitemap.xml`)
- [x] Robots.txt configured
- [x] Meta tags optimized
- [x] Open Graph images
- [x] Structured data (if applicable)
- [x] Mobile-friendly
- [x] Fast loading times
- [x] HTTPS enabled

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart development server after adding variables
- Check Vercel dashboard for production variables

### Images Not Loading

- Verify image paths are correct
- Check `next.config.ts` for image domains
- Ensure images are in the `public` folder

## 📱 Testing Before Deployment

```bash
# Build and test locally
npm run build
npm start

# Test on different devices
# Use browser dev tools device emulation
```

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📈 Post-Deployment

1. **Verify Deployment**
   - Check all pages load correctly
   - Test interactive features
   - Verify responsive design

2. **Set Up Monitoring**
   - Configure error tracking (Sentry)
   - Set up uptime monitoring
   - Enable analytics

3. **Update Documentation**
   - Update README with live URL
   - Document any custom configurations
   - Share with stakeholders

## 🎉 Success!

Your macOS Portfolio is now live! Share it with the world:

- 🌐 Live Site: https://your-domain.com
- 📱 Mobile-friendly
- ⚡ Lightning fast
- 🔒 Secure HTTPS

---

Need help? Check the [main README](README.md) or open an issue.
