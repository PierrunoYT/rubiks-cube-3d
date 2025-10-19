# 🚀 Deployment Guide for Rubik's Cube 3D

This guide will help you deploy your Rubik's Cube to GitHub Pages.

## 📋 Steps to Deploy

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: **`rubiks-cube-3d`**
4. Description: **"Interactive 3D Rubik's Cube with solve functionality - built with Three.js"**
5. Make it **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (we already have them!)
7. Click **"Create repository"**

### 2. Push Your Code

After creating the repository, GitHub will show you commands. Use these instead:

```bash
# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/rubiks-cube-3d.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin master
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: **`master`** (or `main`)
   - Folder: **`/ (root)`**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment

### 4. Access Your Live Site! 🎉

Your site will be available at:
```
https://YOUR_USERNAME.github.io/rubiks-cube-3d/rubikscube.html
```

## 🔄 Updating Your Site

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

GitHub Pages will automatically update within 1-2 minutes!

## 📝 Don't Forget

After deployment, update the README.md links:
- Replace `yourusername` with your actual GitHub username

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages)

