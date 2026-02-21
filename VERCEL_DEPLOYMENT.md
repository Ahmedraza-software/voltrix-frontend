# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with this frontend code
- Backend API URL (for production)

## Setup Steps

### 1. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Paste your GitHub repo URL
5. Click "Import"

### 3. Configure Environment Variables
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add the following variables:

**For Production:**
- `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://api.yourdomain.com`)

**For Preview/Development:**
- `NEXT_PUBLIC_API_URL`: Your staging backend URL

### 4. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your frontend will be live at `https://your-project.vercel.app`

## Environment Variables Explained

- `NEXT_PUBLIC_API_URL`: The backend API endpoint. Must start with `NEXT_PUBLIC_` to be accessible in browser.

## Local Testing Before Deployment

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

**Build fails:**
- Check Node.js version compatibility (should be 18+)
- Ensure all dependencies are in package.json
- Check for TypeScript errors: `npm run build`

**API calls fail:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on backend
- Ensure backend is accessible from Vercel

**Blank page:**
- Check browser console for errors
- Verify environment variables are set
- Check network tab for failed API calls

## Redeployment

Any push to main branch will automatically trigger a new deployment.

To manually redeploy:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Redeploy"
