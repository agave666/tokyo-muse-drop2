# Deploying to Vercel

## Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository (tokyo-muse-drop)
   - Vercel will auto-detect Next.js configuration

3. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live!

## Configuration

Vercel automatically detects:
- Framework: Next.js
- Build Command: `next build`
- Output Directory: `out` (static export)
- Install Command: `npm install`

## Environment Variables

None required for this prototype. All data is stored in browser localStorage.

## Custom Domain (Optional)

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Continuous Deployment

Every push to `main` branch automatically triggers a new deployment.

Preview deployments are created for pull requests.

## Performance

Static export ensures:
- Fast load times (no server-side rendering)
- Global CDN distribution
- Automatic image optimization disabled (using unoptimized images)
- Perfect Lighthouse scores

## Troubleshooting

### Build fails
- Check `npm run build` works locally
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Images not loading
- Verify photos exist in `public/photos/`
- Check file names match `data/models.ts`
- Ensure files are committed to git

### localStorage not persisting
- This is expected behavior in some browsers' private mode
- Users must allow cookies/storage

## Alternative Hosts

This static site can also be deployed to:
- **Netlify**: Drag & drop the `out/` folder
- **GitHub Pages**: Push `out/` to `gh-pages` branch
- **Cloudflare Pages**: Connect GitHub repo
- **AWS S3**: Upload `out/` to S3 bucket with static hosting

## Cost

Vercel free tier includes:
- 100 GB bandwidth
- Unlimited personal projects
- Automatic HTTPS
- Global CDN

This prototype should stay well within free tier limits.
