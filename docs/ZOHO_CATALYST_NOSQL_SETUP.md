# Zoho Catalyst NoSQL Database Setup Guide

Complete guide to setting up Zoho Catalyst NoSQL database for your jewelry website.

## 📋 Table of Contents

- [Overview](#overview)
- [Free Tier Details](#free-tier-details)
- [Prerequisites](#prerequisites)
- [Step 1: Create Zoho Catalyst Account](#step-1-create-zoho-catalyst-account)
- [Step 2: Create a Project](#step-2-create-a-project)
- [Step 3: Set Up NoSQL Database](#step-3-set-up-nosql-database)
- [Step 4: Install Catalyst SDK](#step-4-install-catalyst-sdk)
- [Step 5: Configure Environment Variables](#step-5-configure-environment-variables)
- [Step 6: Create Database Models](#step-6-create-database-models)
- [Step 7: Migrate Existing JSON Data](#step-7-migrate-existing-json-data)
- [Step 8: Update API Routes](#step-8-update-api-routes)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**Zoho Catalyst NoSQL** is a fully managed, serverless NoSQL database service that provides:

- ✅ **Schema-less Data Storage** - Store documents with varying structures
- ✅ **High-Performance Querying** - Partition, sort, and primary keys
- ✅ **Fully Managed** - Zoho handles setup, maintenance, and scaling
- ✅ **Serverless** - Auto-scales based on demand
- ✅ **Developer-Friendly SDKs** - Node.js, Python, Java support

**Perfect for:**
- Products catalog
- Site settings
- Categories
- Contact form submissions
- User data

---

## 💰 Free Tier Details

### Monthly Free Limits

| Resource | Free Tier Limit |
|----------|----------------|
| **Storage** | 2 GB |
| **Select (Read) Requests** | 10,000/month |
| **Insert (Create) Requests** | 5,000/month |
| **Update (Modify) Requests** | 1,000/month |
| **Delete (Remove) Requests** | 1,000/month |
| **Total Operations** | 17,000/month |

### Additional Free Tier Benefits

- ✅ **$250 Cloud Credits** - New accounts get $250 in credits (valid 6 months)
- ✅ **No Credit Card Required** - Sign up without payment info
- ✅ **Monthly Renewal** - Free tier resets every month
- ✅ **Global Data Centers** - US, IN, AU, EU regions

### Important Notes

- ⚠️ **Minimum Billing**: If you exceed free tier limits, minimum $5/project/month applies
- ⚠️ **Usage Alerts**: You'll be notified at 90% of limits
- 💡 **Tip**: Delete unused projects to avoid charges

### Is This Enough for Your Jewelry Website?

**Yes!** For a small to medium jewelry website:
- **2GB storage** = Thousands of products with metadata
- **10,000 reads/month** = ~333 reads/day (sufficient for moderate traffic)
- **5,000 inserts/month** = ~166 inserts/day (enough for adding products)
- **1,000 updates/month** = ~33 updates/day (sufficient for inventory/price updates)

---

## 📦 Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18+ installed
- ✅ A Zoho account (create at [zoho.com](https://www.zoho.com))
- ✅ Your domain name (jewelsbynavkush.com) - optional but recommended
- ✅ Access to your domain's DNS settings (if using custom domain)

---

## 🚀 Step 1: Create Zoho Catalyst Account

1. **Visit Zoho Catalyst**
   - Go to [catalyst.zoho.com](https://catalyst.zoho.com)
   - Click **"Sign Up"** or **"Get Started"**

2. **Sign Up**
   - Use your existing Zoho account or create a new one
   - No credit card required for free tier

3. **Verify Email**
   - Check your email for verification link
   - Click to verify your account

4. **Complete Profile**
   - Fill in your organization details
   - Select your preferred data center region (US, IN, AU, EU)

---

## 🏗️ Step 2: Create a Project

1. **Navigate to Projects**
   - After logging in, click **"Projects"** in the sidebar
   - Click **"Create Project"**

2. **Project Details**
   - **Project Name**: `jewelry-website` (or your preferred name)
   - **Description**: "Jewelry website database for products, categories, and settings"
   - **Region**: Choose closest to your users (US, IN, AU, EU)

3. **Create Project**
   - Click **"Create"**
   - Wait for project initialization (takes ~30 seconds)

4. **Note Your Project Details**
   - **Project ID**: Found in project settings
   - **Project Key**: Needed for SDK authentication

---

## 🗄️ Step 3: Set Up NoSQL Database

1. **Navigate to Data Store**
   - In your project dashboard, go to **"Backend Services"**
   - Click **"Data Store"** (NoSQL Database)

2. **Create Tables**
   You'll need tables for:
   - `products` - Jewelry products
   - `categories` - Product categories
   - `site_settings` - Site configuration
   - `contact_submissions` - Contact form data (optional)

3. **Create Products Table**
   - Click **"Create Table"**
   - **Table Name**: `products`
   - **Partition Key**: `id` (String)
   - **Sort Key**: `createdAt` (String) - optional
   - Click **"Create"**

4. **Create Categories Table**
   - Click **"Create Table"**
   - **Table Name**: `categories`
   - **Partition Key**: `slug` (String)
   - Click **"Create"**

5. **Create Site Settings Table**
   - Click **"Create Table"**
   - **Table Name**: `site_settings`
   - **Partition Key**: `key` (String)
   - Click **"Create"**

6. **Create Contact Submissions Table** (Optional)
   - Click **"Create Table"**
   - **Table Name**: `contact_submissions`
   - **Partition Key**: `id` (String)
   - **Sort Key**: `timestamp` (String)
   - Click **"Create"**

---

## 📥 Step 4: Install Catalyst SDK

1. **Install Catalyst Node.js SDK**
   ```bash
   cd jewelry-website
   npm install zcatalyst-sdk-node
   ```

2. **Verify Installation**
   ```bash
   npm list zcatalyst-sdk-node
   ```

---

## 🔐 Step 5: Configure Environment Variables

1. **Get Your Catalyst Credentials**
   - Go to your Catalyst project
   - Navigate to **"Settings"** → **"Project Settings"**
   - Copy the following:
     - **Project ID**
     - **Project Key** (Client ID)
     - **Client Secret**

2. **Create/Update `.env.local`**
   ```bash
   # Create .env.local if it doesn't exist
   touch .env.local
   ```

3. **Add Catalyst Variables**
   Add these to your `.env.local`:
   ```env
   # Zoho Catalyst Configuration
   CATALYST_PROJECT_ID=your_project_id_here
   CATALYST_CLIENT_ID=your_client_id_here
   CATALYST_CLIENT_SECRET=your_client_secret_here
   CATALYST_ENVIRONMENT=production
   ```

4. **Update `.gitignore`**
   Ensure `.env.local` is in `.gitignore`:
   ```gitignore
   .env.local
   .env*.local
   ```

5. **For Production (Vercel)**
   - Go to Vercel project settings
   - Add the same environment variables
   - Deploy to apply changes

---

## 📝 Step 6: Create Database Models

Create a Catalyst client utility and data models.

### 6.1: Create Catalyst Client

Create `lib/catalyst/client.ts`:

```typescript
import { CatalystApp } from 'zcatalyst-sdk-node';

let catalystApp: CatalystApp | null = null;

export function getCatalystApp(): CatalystApp {
  if (!catalystApp) {
    const projectId = process.env.CATALYST_PROJECT_ID;
    const clientId = process.env.CATALYST_CLIENT_ID;
    const clientSecret = process.env.CATALYST_CLIENT_SECRET;

    if (!projectId || !clientId || !clientSecret) {
      throw new Error('Missing Catalyst environment variables');
    }

    catalystApp = CatalystApp.initialize({
      projectId,
      clientId,
      clientSecret,
    });
  }

  return catalystApp;
}

export async function getDataStore() {
  const app = getCatalystApp();
  return app.datastore();
}
```

### 6.2: Create Product Model

Create `lib/catalyst/models/product.ts`:

```typescript
import { getDataStore } from '../client';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  price: number;
  category: string;
  material: string;
  inStock: boolean;
  mostLoved: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const datastore = await getDataStore();
  const table = datastore.table('products');
  
  const response = await table.getAllRows();
  return response.map((row: any) => row.getJSONValue()) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const datastore = await getDataStore();
  const table = datastore.table('products');
  
  try {
    const row = await table.getRow(id);
    return row ? (row.getJSONValue() as Product) : null;
  } catch (error) {
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find(p => p.slug === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(p => p.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(p => p.featured);
}

export async function getMostLovedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(p => p.mostLoved);
}

export async function createProduct(product: Product): Promise<Product> {
  const datastore = await getDataStore();
  const table = datastore.table('products');
  
  const row = table.getRowInstance();
  row.setJSONValue(product);
  await row.save();
  
  return product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const datastore = await getDataStore();
  const table = datastore.table('products');
  
  try {
    const row = await table.getRow(id);
    if (!row) return null;
    
    const current = row.getJSONValue() as Product;
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    
    row.setJSONValue(updated);
    await row.save();
    
    return updated as Product;
  } catch (error) {
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  const datastore = await getDataStore();
  const table = datastore.table('products');
  
  try {
    const row = await table.getRow(id);
    if (row) {
      await row.delete();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
```

### 6.3: Create Category Model

Create `lib/catalyst/models/category.ts`:

```typescript
import { getDataStore } from '../client';

export interface Category {
  slug: string;
  name: string;
  displayName: string;
  image: string;
  alt: string;
  description: string;
}

export async function getAllCategories(): Promise<Category[]> {
  const datastore = await getDataStore();
  const table = datastore.table('categories');
  
  const response = await table.getAllRows();
  return response.map((row: any) => row.getJSONValue()) as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const datastore = await getDataStore();
  const table = datastore.table('categories');
  
  try {
    const row = await table.getRow(slug);
    return row ? (row.getJSONValue() as Category) : null;
  } catch (error) {
    return null;
  }
}

export async function createCategory(category: Category): Promise<Category> {
  const datastore = await getDataStore();
  const table = datastore.table('categories');
  
  const row = table.getRowInstance();
  row.setJSONValue(category);
  await row.save();
  
  return category;
}
```

### 6.4: Create Site Settings Model

Create `lib/catalyst/models/site-settings.ts`:

```typescript
import { getDataStore } from '../client';

export interface SiteSettings {
  brand: {
    name: string;
    tagline: string;
  };
  hero: {
    title: string;
    description: string;
    buttonText: string;
    image: string;
    alt: string;
  };
  about: {
    title: string;
    content: string[];
    image: string;
    alt: string;
    buttonText: string;
  };
  mostLoved: {
    title: string;
    slogan: string;
  };
  products: {
    title: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
    pinterest: string;
  };
  intro: {
    rightColumnSlogan: string;
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const datastore = await getDataStore();
  const table = datastore.table('site_settings');
  
  try {
    const row = await table.getRow('main');
    return row ? (row.getJSONValue() as SiteSettings) : null;
  } catch (error) {
    return null;
  }
}

export async function updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const datastore = await getDataStore();
  const table = datastore.table('site_settings');
  
  const row = table.getRowInstance();
  row.setJSONValue({ key: 'main', ...settings });
  await row.save();
  
  return settings;
}
```

---

## 🔄 Step 7: Migrate Existing JSON Data

Create a migration script to move your JSON data to Catalyst.

### 7.1: Create Migration Script

Create `scripts/migrate-to-catalyst.ts`:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
import { createProduct, Product } from '../lib/catalyst/models/product';
import { createCategory, Category } from '../lib/catalyst/models/category';
import { updateSiteSettings, SiteSettings } from '../lib/catalyst/models/site-settings';

async function migrate() {
  console.log('🚀 Starting migration to Zoho Catalyst...\n');

  try {
    // Migrate Products
    console.log('📦 Migrating products...');
    const productsData = JSON.parse(
      readFileSync(join(process.cwd(), 'data/products.json'), 'utf-8')
    );
    
    for (const product of productsData.products) {
      await createProduct(product as Product);
      console.log(`  ✅ Migrated: ${product.title}`);
    }
    console.log(`✅ Migrated ${productsData.products.length} products\n`);

    // Migrate Categories
    console.log('📁 Migrating categories...');
    const categoriesData = JSON.parse(
      readFileSync(join(process.cwd(), 'data/categories.json'), 'utf-8')
    );
    
    for (const category of categoriesData.categories) {
      await createCategory(category as Category);
      console.log(`  ✅ Migrated: ${category.name}`);
    }
    console.log(`✅ Migrated ${categoriesData.categories.length} categories\n`);

    // Migrate Site Settings
    console.log('⚙️  Migrating site settings...');
    const settingsData = JSON.parse(
      readFileSync(join(process.cwd(), 'data/site-settings.json'), 'utf-8')
    );
    
    await updateSiteSettings(settingsData as SiteSettings);
    console.log('✅ Migrated site settings\n');

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
```

### 7.2: Run Migration

```bash
# Make sure your .env.local is configured
npx tsx scripts/migrate-to-catalyst.ts
```

---

## 🔌 Step 8: Update API Routes

Update your existing API routes to use Catalyst instead of JSON files.

### 8.1: Update Products API

Update `app/api/products/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory } from '@/lib/catalyst/models/product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let products;
    if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json({
      products,
      meta: {
        total: products.length,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

### 8.2: Update Categories API

Update `app/api/categories/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/catalyst/models/category';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
```

### 8.3: Update Site Settings API

Update `app/api/site-settings/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '@/lib/catalyst/models/site-settings';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    if (!settings) {
      return NextResponse.json(
        { error: 'Site settings not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const settings = await request.json();
    const updated = await updateSiteSettings(settings);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
```

---

## ✅ Best Practices

### 1. Error Handling
- Always wrap Catalyst calls in try-catch blocks
- Return meaningful error messages
- Log errors for debugging

### 2. Caching
- Consider caching frequently accessed data
- Use Next.js caching strategies
- Implement cache invalidation

### 3. Rate Limiting
- Monitor your free tier usage
- Implement rate limiting in API routes
- Use Catalyst's built-in rate limiting

### 4. Data Validation
- Validate data before saving
- Use TypeScript interfaces
- Sanitize user inputs

### 5. Performance
- Use batch operations when possible
- Optimize queries
- Index frequently queried fields

### 6. Security
- Never expose credentials in client-side code
- Use environment variables
- Implement proper authentication

---

## 🔧 Troubleshooting

### Issue: "Missing Catalyst environment variables"
**Solution**: Ensure `.env.local` has all required variables:
- `CATALYST_PROJECT_ID`
- `CATALYST_CLIENT_ID`
- `CATALYST_CLIENT_SECRET`

### Issue: "Table not found"
**Solution**: 
- Verify table exists in Catalyst dashboard
- Check table name spelling
- Ensure table is created in correct project

### Issue: "Rate limit exceeded"
**Solution**:
- Check your usage in Catalyst dashboard
- Implement caching
- Optimize queries
- Consider upgrading if needed

### Issue: "Authentication failed"
**Solution**:
- Verify credentials in Catalyst dashboard
- Check project ID matches
- Ensure client ID and secret are correct

### Issue: "Data not saving"
**Solution**:
- Check partition key is set correctly
- Verify data structure matches table schema
- Check Catalyst dashboard for errors

---

## 📚 Additional Resources

- [Zoho Catalyst Documentation](https://www.zoho.com/catalyst/help/)
- [Catalyst NoSQL Guide](https://www.zoho.com/catalyst/help/backend-services/datastore.html)
- [Node.js SDK Documentation](https://www.zoho.com/catalyst/help/server-side-sdks/nodejs-sdk.html)
- [Catalyst Free Tier](https://www.zoho.com/catalyst/free-tier.html)

---

## 🎉 Next Steps

1. ✅ Set up Zoho Catalyst account
2. ✅ Create tables
3. ✅ Install SDK
4. ✅ Configure environment variables
5. ✅ Create models
6. ✅ Migrate data
7. ✅ Update API routes
8. ✅ Test endpoints
9. ✅ Deploy to production

---

**Need Help?** Check the troubleshooting section or refer to Zoho Catalyst documentation.
