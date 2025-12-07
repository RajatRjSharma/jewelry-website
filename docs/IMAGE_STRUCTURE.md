# Image Structure Guide

**Date:** December 2024

---

## 📁 **IMAGE DIRECTORY STRUCTURE**

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

## 📝 **HOW TO ADD PRODUCT IMAGES**

1. **Add product images** to the appropriate category folder:
   - `public/assets/products/rings/your-ring-name.png`
   - `public/assets/products/earrings/your-earring-name.png`
   - `public/assets/products/necklaces/your-necklace-name.png`
   - `public/assets/products/bracelets/your-bracelet-name.png`

2. **Update `data/products.json`** with the image path:
   ```json
   {
     "id": "ring-002",
     "slug": "your-ring-slug",
     "title": "Your Ring Name",
     "image": "/assets/products/rings/your-ring-name.png",
     ...
   }
   ```

---

## 🖼️ **IMAGE NAMING CONVENTIONS**

- **Product images:** Use kebab-case (e.g., `elegant-gold-ring.png`)
- **Category images:** Use category name (e.g., `rings.png`)
- **Hero/About images:** Use descriptive names (e.g., `hero-image.png`)

---

## ✅ **CURRENT IMAGE SETUP**

✅ **Hero Image:** `public/assets/hero/hero-image.png`  
✅ **About Image:** `public/assets/about/about-image.png`  
✅ **Category Images:** All 4 categories have images  
✅ **Product Images:** 2 sample products have images  

---

## 📋 **TO ADD MORE PRODUCTS**

1. Add image file to appropriate folder
2. Update `data/products.json` with product data
3. Use the image path: `/assets/products/{category}/{image-name}.png`

---

**Note:** All images should be in PNG or JPG format. Update the file extension in JSON if you use JPG files.

