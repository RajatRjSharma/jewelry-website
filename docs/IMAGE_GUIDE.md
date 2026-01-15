# Complete Image Guide

**Date:** Current  
**Status:** ✅ **COMPREHENSIVE GUIDE**

---

## 📋 **Table of Contents**

1. [Image Directory Structure](#image-directory-structure)
2. [Adding Product Images](#adding-product-images)
3. [Hero Image Setup](#hero-image-setup)
4. [About Us Image Setup](#about-us-image-setup)
5. [Category Images Setup](#category-images-setup)
6. [Image Naming Conventions](#image-naming-conventions)
7. [Image Specifications](#image-specifications)
8. [Troubleshooting](#troubleshooting)
9. [Historical Notes](#historical-notes)

---

## 📁 **Image Directory Structure**

All images are organized in `public/assets/` with the following structure:

```
public/assets/
├── products/
│   ├── rings/
│   │   └── elegant-gold-ring.png
│   ├── earrings/
│   │   └── pearl-drop-earrings.png
│   ├── necklaces/
│   │   └── (add your necklace images here)
│   └── bracelets/
│       └── (add your bracelet images here)
│
├── hero/
│   └── hero-image.png
│
├── about/
│   └── about-image.png
│
└── categories/
    ├── rings.png
    ├── earrings.png
    ├── necklaces.png
    └── bracelets.png
```

---

## 🖼️ **Adding Product Images**

### **Step 1: Add Image File**
1. Place your product image in the appropriate category folder:
   - `public/assets/products/rings/your-ring-name.png`
   - `public/assets/products/earrings/your-earring-name.png`
   - `public/assets/products/necklaces/your-necklace-name.png`
   - `public/assets/products/bracelets/your-bracelet-name.png`

### **Step 2: Update products.json**
Update `data/products.json` with the image path:

```json
{
  "id": "ring-002",
  "slug": "your-ring-slug",
  "title": "Your Ring Name",
  "image": "/assets/products/rings/your-ring-name.png",
  "alt": "Description of your ring",
  ...
}
```

### **Image Path Format:**
- Use: `/assets/products/{category}/{image-name}.png`
- Path starts with `/` because it's in the public folder
- Next.js automatically serves files from `public/` at the root URL

---

## 🎨 **Hero Image Setup**

### **Location:**
- **File Path:** `public/assets/hero/hero-image.png`
- **JSON Path:** Set in `data/site-settings.json` under `hero.image`

### **Image Specifications:**
- **Format:** PNG or JPG
- **Recommended Size:** 1200x1200px or 1200x1600px (square or portrait)
- **File Size:** Under 500KB for best performance
- **Aspect Ratio:** Square (1:1) or Portrait (3:4) works best

### **How to Add:**
1. Place your hero image at `public/assets/hero/hero-image.png`
2. Update `data/site-settings.json`:
   ```json
   {
     "hero": {
       "image": "/assets/hero/hero-image.png",
       "alt": "Elegant jewelry display"
     }
   }
   ```
3. Restart dev server if running: `npm run dev`

### **Display Location:**
- **Desktop/Tablet:** Center column of the 3-column intro section
- **Mobile:** Below the title and description, above the slogan

### **Background Color Fix:**
The hero image container uses `bg-[#CCC4BA]` to match the page background. The image uses `object-contain` to show the full image without cropping, allowing the background color to blend seamlessly.

---

## 📸 **About Us Image Setup**

### **Location:**
- **File Path:** `public/assets/about/about-image.png`
- **JSON Path:** Set in `data/site-settings.json` under `about.image`

### **Image Specifications:**
- **Format:** PNG or JPG
- **Recommended Size:** 1200x1200px or 1200x1600px (square or portrait)
- **File Size:** Under 500KB for best performance

### **How to Add:**
1. Place your about image at `public/assets/about/about-image.png`
2. Update `data/site-settings.json`:
   ```json
   {
     "about": {
       "image": "/assets/about/about-image.png",
       "alt": "About our jewelry business"
     }
   }
   ```
3. Restart dev server if running: `npm run dev`

### **Display Location:**
- **Desktop:** Right column of About Us section
- **Mobile:** Below the content

---

## 🏷️ **Category Images Setup**

### **Location:**
- **File Path:** `public/assets/categories/{category-name}.png`
- **Categories:** rings, earrings, necklaces, bracelets

### **Required Images:**
1. `public/assets/categories/rings.png` ✅
2. `public/assets/categories/earrings.png` ✅
3. `public/assets/categories/necklaces.png` ✅
4. `public/assets/categories/bracelets.png` ✅

### **Image Specifications:**
- **Format:** PNG (or JPG)
- **Recommended Size:** 800x800px (square aspect ratio)
- **File Naming:** Must match category slug exactly (case-sensitive)

### **How It Works:**
1. Category images are automatically loaded from `public/assets/categories/`
2. Used in the "Our Products" section
3. Displayed with 3D animations on hover

---

## 📝 **Image Naming Conventions**

### **Product Images:**
- Use kebab-case: `elegant-gold-ring.png`
- Include product name or identifier
- Example: `pearl-drop-earrings.png`, `diamond-engagement-ring.png`

### **Category Images:**
- Use category name: `rings.png`, `earrings.png`
- Must match category slug exactly

### **Hero/About Images:**
- Use descriptive names: `hero-image.png`, `about-image.png`
- Keep consistent naming for easy reference

---

## 🎯 **Image Specifications**

### **General Requirements:**
- **Formats:** PNG (preferred), JPG, WebP
- **File Size:** Under 500KB for best performance
- **Quality:** High resolution, well-lit, professional photography

### **Recommended Dimensions:**
- **Product Images:** 1200x1200px (square) or 1200x1600px (portrait)
- **Category Images:** 800x800px (square)
- **Hero Image:** 1200x1200px or 1200x1600px
- **About Image:** 1200x1200px or 1200x1600px

### **Best Practices:**
✅ **Good Images:**
- High resolution
- Professional lighting
- Clean, minimalist backgrounds
- Well-composed shots
- Proper file compression

❌ **Avoid:**
- Low resolution images
- Blurry or dark photos
- Images with text overlays
- Very large file sizes (>2MB)
- Inconsistent aspect ratios

---

## 🔧 **Troubleshooting**

### **Image Not Showing?**

1. **Check file path:**
   - Ensure image is in correct folder
   - Verify path in JSON matches actual file location
   - Path should start with `/assets/` (not `/public/assets/`)

2. **Check file extension:**
   - Ensure file extension matches JSON path
   - PNG files should have `.png` in JSON
   - JPG files should have `.jpg` in JSON

3. **Clear cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Clear browser cache
   - Restart dev server: `npm run dev`

4. **Check file size:**
   - Very large files (>5MB) may not load
   - Compress images before adding

### **Image Looks Distorted?**

1. **Check aspect ratio:**
   - Square or portrait images work best
   - Very wide images may be cropped

2. **Check CSS classes:**
   - Images use `object-contain` to show full image
   - Container has matching background color

### **Image Loading Slowly?**

1. **Optimize image:**
   - Compress before adding
   - Use tools like TinyPNG or ImageOptim
   - Target file size: 200-500KB

2. **Check Next.js Image optimization:**
   - Images are automatically optimized by Next.js
   - Ensure using Next.js `Image` component

---

## 📚 **Historical Notes**

### **Image Path Fix (December 2024)**
Previously, images were referenced with incorrect paths and file extensions. This has been fixed:
- ✅ Created structured directories in `public/assets/`
- ✅ Moved all images to correct locations
- ✅ Updated all JSON files with correct paths
- ✅ All images now use `.png` extension consistently

### **Background Color Fix**
The hero image background color was fixed to match the page background (#CCC4BA beige):
- ✅ Container uses `bg-[#CCC4BA]` to match section background
- ✅ Image uses `object-contain` to show full image
- ✅ Background colors blend seamlessly

### **Placeholder Images**
Placeholder images are available in `public/assets/placeholders/` for use during development. These can be replaced with actual product images when ready.

---

## ✅ **Quick Checklist**

Before adding images:

- [ ] Image file is in correct folder structure
- [ ] File name follows naming conventions
- [ ] Image is optimized (under 500KB)
- [ ] JSON file updated with correct path
- [ ] File extension matches in JSON
- [ ] Alt text added for accessibility
- [ ] Image displays correctly on website
- [ ] Image loads quickly

---

## 🎯 **Next Steps**

After setting up images:

1. **Test on different devices:**
   - Desktop
   - Tablet
   - Mobile

2. **Check loading speed:**
   - Use Google PageSpeed Insights
   - Ensure images load quickly

3. **Optimize further:**
   - Compress large images
   - Use WebP format if supported
   - Consider lazy loading for below-fold images

---

**Related Documentation:**
- [Project Structure](./PROJECT_STRUCTURE.md) - Complete technical documentation
- [Development Guide](./DEVELOPMENT_GUIDE.md) - Development workflow
