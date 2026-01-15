# Sanity.io Complete Guide (Legacy - Historical Reference)

**Date:** Current  
**Status:** ⚠️ **LEGACY - NO LONGER USED**  
**Note:** This project now uses JSON-based architecture. This guide is kept for historical reference only.

---

## 📋 **Table of Contents**

1. [Overview](#overview)
2. [Setup Guide](#setup-guide)
3. [Schema Setup](#schema-setup)
4. [Schema Creation Methods](#schema-creation-methods)
5. [Studio Guide](#studio-guide)
6. [Troubleshooting](#troubleshooting)

---

## 📋 **Overview**

Sanity.io was previously used as a headless CMS for managing jewelry designs. The project has since migrated to a JSON-based architecture for simplicity and performance.

**Current Status:** ⚠️ **Not in use** - Project uses JSON files in `data/` directory instead.

---

## 🚀 **Setup Guide**

### **Step 1: Create Sanity.io Account**
1. Go to [Sanity.io](https://www.sanity.io/)
2. Click **"Get started"** or **"Sign up"**
3. Choose sign-up method:
   - **Google** (recommended - fastest)
   - **GitHub**
   - **Email**

### **Step 2: Create New Project**
1. After signing up, click **"Create new project"**
2. Enter project name: `jewelry-website` (or your preferred name)
3. Choose dataset: `production` (default)
4. Click **"Create project"**

### **Step 3: Get Project Configuration**
1. Go to **Project Settings** → **API** → **CORS origins**
2. Add your local development URL: `http://localhost:3000`
3. Get your **Project ID** from **Project Settings** → **API**

### **Step 4: Configure Environment Variables**
Create `.env.local` file:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## 📐 **Schema Setup**

### **What is a Schema?**
A schema is like a **form template** that tells Sanity.io what fields your jewelry designs should have. Think of it like a form with boxes for:
- Title (text box)
- Description (big text box)
- Image (image upload)
- Price (number)
- Category (dropdown)

**Without a schema:** Sanity doesn't know what fields to show when you try to add a design.  
**With a schema:** Sanity shows you a form with all the right fields to fill in.

### **Quick Setup (5 Minutes)**
1. **Open Sanity Studio:** Go to `http://localhost:3000/studio`
2. **Create Schema:** The schema is already created in code! Just add content.
3. **Add Design:** Click "Create" → "Jewelry Design" → Fill form → Publish
4. **Check Website:** Go to `http://localhost:3000/designs` - your design should appear!

---

## 🔧 **Schema Creation Methods**

### **Method 1: Sanity Studio Online (Visual Builder)**
- ✅ No coding required
- ✅ Visual interface
- ✅ Quick setup
- ⚠️ Limited customization

### **Method 2: Local Sanity Studio (Code-Based)**
- ✅ Full control
- ✅ Version control
- ✅ Advanced features
- ⚠️ Requires coding

### **Method 3: Sanity CLI Schema Commands**
- ✅ Automated setup
- ✅ Consistent structure
- ⚠️ Requires CLI knowledge

**Note:** Schema creation methods are documented in this guide. See the "Schema Creation Methods" section above.

---

## 🎨 **Studio Guide**

### **Accessing Sanity Studio**

#### **Option 1: Via Your Website (Recommended)**
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open your browser and go to:
   ```
   http://localhost:3000/studio
   ```
3. You'll see the Sanity Studio interface!

#### **Option 2: Standalone Studio (Alternative)**
If you want to run Studio separately:
```bash
# This will open Studio at http://localhost:3333
sanity start
```

### **Using the Studio**
1. **Create Content:**
   - Click "Create" button
   - Select document type (e.g., "Jewelry Design")
   - Fill in the form fields
   - Click "Publish"

2. **Edit Content:**
   - Click on existing document
   - Make changes
   - Click "Publish" to save

3. **Upload Images:**
   - Click image field
   - Click "Upload" or "Select"
   - Choose image file
   - Add alt text for accessibility

---

## 🔧 **Troubleshooting**

### **Schema Not Showing?**
1. Check if schema file exists in `sanity/schemas/`
2. Verify schema is exported in `sanity/schema.ts`
3. Restart dev server

### **Content Not Appearing?**
1. Check if content is published (not draft)
2. Verify environment variables are set
3. Check browser console for errors

### **Images Not Loading?**
1. Check CORS settings in Sanity dashboard
2. Verify image URLs are correct
3. Check network tab for 404 errors

---

## ⚠️ **Migration Note**

This project has migrated from Sanity.io to JSON-based architecture. The current setup uses:
- **Data Storage:** JSON files in `data/` directory
- **Content Management:** Direct file editing or future CMS integration
- **Benefits:** Simpler setup, faster performance, no external dependencies

For current setup instructions, see:
- [JSON-Based Architecture Plan](./JSON_BASED_ARCHITECTURE_PLAN.md)
- [Migration Complete](./MIGRATION_COMPLETE.md)
- [Quick Start Guide](./SETUP_QUICK_START.md)

---

**This guide is kept for historical reference. For current setup, see the Quick Start Guide.**
