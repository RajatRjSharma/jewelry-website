# NODE_ENV Environment Variable Guide

## ✅ **SHORT ANSWER: You DON'T Need to Set It Manually**

`NODE_ENV` is **automatically set** by Next.js and Vercel. You don't need to add it to `.env.local` or Vercel environment variables.

---

## 🔍 **HOW NODE_ENV WORKS**

### **Automatic Setting:**

1. **Development (`npm run dev`):**
   - Next.js automatically sets `NODE_ENV=development`
   - No manual configuration needed

2. **Production Build (`npm run build`):**
   - Next.js automatically sets `NODE_ENV=production`
   - Happens during the build process

3. **Vercel Deployment:**
   - Vercel automatically sets `NODE_ENV=production` for all deployments
   - No need to add it manually in Vercel dashboard

---

## 📋 **WHERE NODE_ENV IS USED IN YOUR APP**

### **1. Security & Error Handling** 🔒

**File:** `lib/security/error-handler.ts`
```typescript
const isDevelopment = process.env.NODE_ENV === 'development';
```
- **Development:** Shows detailed error messages for debugging
- **Production:** Shows generic error messages (no sensitive info)

### **2. API Route Security** 🔒

**File:** `app/api/contact/route.ts`
```typescript
if (process.env.NODE_ENV === 'production') {
  return false; // Stricter origin validation
}
```
- **Development:** Allows localhost and more lenient origin checks
- **Production:** Stricter security (only same-origin allowed)

### **3. Error Logging** 📝

**Files:** `lib/firebase/config.ts`, `lib/cms/client.ts`
```typescript
if (process.env.NODE_ENV === 'development') {
  console.error('Detailed error info');
}
```
- **Development:** Logs detailed errors to console
- **Production:** Fails silently to prevent exposing errors

### **4. Environment Validation** ✅

**File:** `lib/security/env-validation.ts`
```typescript
if (process.env.NODE_ENV === 'production') {
  validateFirebaseEnv();
  validateSanityEnv();
}
```
- **Development:** More lenient validation
- **Production:** Strict validation (fails build if missing)

### **5. Error Boundary** 🛡️

**File:** `components/ErrorBoundary.tsx`
```typescript
if (process.env.NODE_ENV === 'development') {
  console.error('ErrorBoundary errorInfo:', errorInfo);
}
```
- **Development:** Shows full error details
- **Production:** Shows user-friendly message only

---

## ⚠️ **WHEN YOU MIGHT NEED TO SET IT MANUALLY**

### **Only in These Rare Cases:**

1. **Custom Build Scripts:**
   ```bash
   NODE_ENV=production npm run build
   ```
   (Usually not needed - Next.js handles this)

2. **Testing Production Locally:**
   ```bash
   NODE_ENV=production npm run build
   NODE_ENV=production npm start
   ```
   (To test production behavior locally)

3. **Docker/Other Platforms:**
   - If deploying to non-Vercel platforms
   - Some platforms may not auto-set it

---

## ✅ **RECOMMENDED APPROACH**

### **For Development:**
- ✅ **Don't add `NODE_ENV` to `.env.local`**
- ✅ Let Next.js set it automatically
- ✅ `npm run dev` will use `development` mode

### **For Vercel:**
- ✅ **Don't add `NODE_ENV` in Vercel dashboard**
- ✅ Vercel automatically sets it to `production`
- ✅ All deployments use production mode

---

## 🔍 **HOW TO VERIFY IT'S WORKING**

### **Check in Development:**
```typescript
// Add this temporarily to any component
console.log('NODE_ENV:', process.env.NODE_ENV);
// Should output: "development"
```

### **Check in Production (Vercel):**
- Check Vercel build logs
- Should see `NODE_ENV=production` in build output
- Or add a temporary API route to check:
```typescript
// app/api/check-env/route.ts
export async function GET() {
  return Response.json({ 
    nodeEnv: process.env.NODE_ENV 
  });
}
```

---

## 📊 **SUMMARY**

| Environment | NODE_ENV Value | Set By | Action Required |
|-------------|----------------|--------|-----------------|
| **Local Dev** (`npm run dev`) | `development` | Next.js | ❌ None |
| **Local Build** (`npm run build`) | `production` | Next.js | ❌ None |
| **Vercel Production** | `production` | Vercel | ❌ None |
| **Vercel Preview** | `production` | Vercel | ❌ None |

---

## ✅ **CONCLUSION**

**You don't need to set `NODE_ENV` manually!**

- ✅ Next.js sets it automatically in development
- ✅ Next.js sets it automatically during builds
- ✅ Vercel sets it automatically in production
- ✅ Your code already handles both modes correctly

**Just focus on setting your other environment variables:**
- `NEXT_PUBLIC_FIREBASE_*`
- `NEXT_PUBLIC_SANITY_*`
- `NEXT_PUBLIC_BASE_URL`

---

## 🎯 **BEST PRACTICES**

1. **Never commit `NODE_ENV` to `.env.local`** - It's auto-set
2. **Never add `NODE_ENV` to Vercel** - It's auto-set
3. **Trust the framework** - Next.js and Vercel handle it
4. **Test both modes** - Use `npm run build` to test production locally

---

**Last Updated:** December 2024

