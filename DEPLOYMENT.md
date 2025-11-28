# Deploying Your Secret Santa Website to GitHub

## Step 1: Add Your Photos
Before uploading, add your 8 photos to the `images` folder:
- photo1.jpg through photo8.jpg

## Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it something like `secret-santa-2025`
5. Make it **Public** (required for free GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

## Step 3: Upload Your Files

### Option A: Using GitHub Website (Easiest)

1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL files from your `secret-santa` folder:
   - index.html
   - wishlist.html
   - style.css
   - script.js
   - wishlist.js
   - slideshow.js
   - images folder (with all 8 photos)
   - README files
3. Add a commit message like "Initial commit - Secret Santa 2025"
4. Click "Commit changes"

### Option B: Using Git Command Line

Open Terminal and navigate to your secret-santa folder:

```bash
cd ~/Desktop/secret-santa

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Secret Santa 2025"

# Add your GitHub repository as remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select "main" and "/ (root)"
6. Click "Save"
7. Wait 1-2 minutes for deployment

## Step 5: Access Your Website

Your website will be available at:
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

For example: `https://anniesmith.github.io/secret-santa-2025/`

### Pages:
- Main page: `https://YOUR-USERNAME.github.io/REPO-NAME/index.html`
- Wishlist page: `https://YOUR-USERNAME.github.io/REPO-NAME/wishlist.html`

## Updating Your Website

Whenever you want to update the website:

### Using GitHub Website:
1. Go to your repository
2. Click on the file you want to edit
3. Click the pencil icon (Edit)
4. Make your changes
5. Commit changes

### Using Git Command Line:
```bash
cd ~/Desktop/secret-santa
# Make your changes to files
git add .
git commit -m "Description of changes"
git push
```

Changes will appear on your live website within 1-2 minutes.

## Sharing the Link

Once deployed, share the link with your Secret Santa participants:
- `https://YOUR-USERNAME.github.io/REPO-NAME/` for the main draw
- `https://YOUR-USERNAME.github.io/REPO-NAME/wishlist.html` for wishlists

## Troubleshooting

**Photos not showing?**
- Make sure photos are named exactly: photo1.jpg, photo2.jpg, etc.
- Check that photos are in the `images` folder
- File names are case-sensitive (use lowercase)

**Website not loading?**
- Wait 2-3 minutes after enabling GitHub Pages
- Check that repository is Public
- Verify the URL matches your username and repository name

**Need to make the repository private?**
- GitHub Pages requires a paid plan for private repositories
- Alternative: Use Netlify or Vercel (both offer free hosting for private repos)