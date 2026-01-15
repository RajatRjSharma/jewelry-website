# Import Patterns Guide

## What does `@` mean?

The `@` symbol is a **path alias** (also called a path mapping) configured in your TypeScript configuration. It's a shortcut that maps to a specific directory in your project.

### Configuration

In your `tsconfig.json` file (line 21-23), you have:

```json
"paths": {
  "@/*": ["./*"]
}
```

This means:
- `@/*` maps to `./*` (the root directory of your project)
- So `@/lib/utils/price-formatting` resolves to `./lib/utils/price-formatting`
- And `@/types/data` resolves to `./types/data`

### Why use `@` alias?

**Benefits:**
1. **Cleaner imports** - No need for relative paths like `../../../lib/utils/price-formatting`
2. **Easier refactoring** - Moving files doesn't break imports
3. **Better readability** - Clear indication of project structure
4. **Consistent paths** - Same import path regardless of file location

**Example:**
```typescript
// ❌ Without alias (relative path - breaks if file moves)
import { formatPrice } from '../../../lib/utils/price-formatting';

// ✅ With alias (absolute path - always works)
import { formatPrice } from '@/lib/utils/price-formatting';
```

---

## All Import Patterns Used in This Codebase

### 1. **Path Alias Imports** (Using `@`)

These imports use the `@` alias to reference files from the project root:

```typescript
// Types
import { Product } from '@/types/data';
import { CategoryType } from '@/lib/utils/image-helpers';

// Utilities
import { formatPrice } from '@/lib/utils/price-formatting';
import { cn } from '@/lib/utils/cn';

// Constants
import { TILT_3D, SCALE, DURATION } from '@/lib/animations/constants';

// Components
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
```

**When to use:** For any file within your project structure (types, utils, components, lib, etc.)

---

### 2. **Relative Imports** (Using `./` or `../`)

These imports use relative paths to reference files in the same directory or parent directories:

```typescript
// Same directory (sibling files)
import ProductBadge from './ProductBadge';
import ImagePlaceholder from './ImagePlaceholder';
import FormField from './FormField';

// Parent directory
import { BREAKPOINTS } from '../constants';

// Multiple levels up
import { something } from '../../../lib/utils';
```

**When to use:** 
- For files in the same directory (sibling components)
- When the relative path is shorter than the alias path
- For closely related files that are always together

**Example from ProductCard.tsx:**
```typescript
import ProductBadge from './ProductBadge';  // Same directory
import ImagePlaceholder from './ImagePlaceholder';  // Same directory
```

---

### 3. **Node Modules Imports** (npm packages)

These imports reference packages installed via npm/yarn:

```typescript
// React
import { useState, useRef } from 'react';
import { ReactNode } from 'react';
import { MouseEvent } from 'react';

// Next.js
import Link from 'next/link';
import Image from 'next/image';

// Third-party libraries
import { motion, useMotionValue, useSpring } from 'framer-motion';
```

**When to use:** For any external package installed in `node_modules`

**Common packages in this project:**
- `react` - React library
- `next/*` - Next.js framework modules
- `framer-motion` - Animation library
- `zod` - Schema validation (if used)

---

### 4. **Type-Only Imports** (TypeScript)

These imports are used specifically for TypeScript types (not runtime code):

```typescript
// Type imports (using 'type' keyword)
import type { NextConfig } from "next";
import type { Product } from '@/types/data';

// Or inline type imports
import { type Product } from '@/types/data';
```

**When to use:** When you only need types and want to ensure they're stripped from the compiled JavaScript

---

### 5. **Default vs Named Imports**

```typescript
// Default import (single export)
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';

// Named import (multiple exports)
import { useState, useRef } from 'react';
import { formatPrice } from '@/lib/utils/price-formatting';
import { TILT_3D, SCALE, DURATION } from '@/lib/animations/constants';

// Mixed (default + named)
import React, { useState, useEffect } from 'react';
```

**When to use:**
- **Default:** When a module exports a single main thing (component, function, class)
- **Named:** When a module exports multiple things or you only need specific exports

---

### 6. **Import Order Convention** (Best Practice)

Your codebase follows this import order:

```typescript
// 1. React imports
import { useState, useRef } from 'react';

// 2. Next.js imports
import Link from 'next/link';
import Image from 'next/image';

// 3. Third-party libraries
import { motion, useMotionValue } from 'framer-motion';

// 4. Local imports (using @ alias)
import { Product } from '@/types/data';
import { formatPrice } from '@/lib/utils/price-formatting';

// 5. Relative imports (same directory)
import ProductBadge from './ProductBadge';
import ImagePlaceholder from './ImagePlaceholder';
```

**Why this order?**
- Groups imports logically
- Makes dependencies clear
- Easier to read and maintain
- Standard convention in React/Next.js projects

---

## Complete Examples from Your Codebase

### Example 1: ProductCard.tsx
```typescript
// React
import { useState, useRef } from 'react';

// Next.js
import Link from 'next/link';
import Image from 'next/image';

// Third-party
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Local (alias)
import { Product } from '@/types/data';
import { formatPrice } from '@/lib/utils/price-formatting';
import { TILT_3D, SCALE, DURATION } from '@/lib/animations/constants';

// Relative (same directory)
import ProductBadge from './ProductBadge';
import ImagePlaceholder from './ImagePlaceholder';
```

### Example 2: CategoryImage3D.tsx
```typescript
// React
import { useRef, useState } from 'react';

// Next.js
import Link from 'next/link';
import Image from 'next/image';

// Third-party
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Local (alias)
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { TILT_3D, SCALE, DURATION } from '@/lib/animations/constants';
import { CategoryImageSource, CategoryType } from '@/lib/utils/image-helpers';
```

---

## Quick Reference Table

| Import Type | Syntax | Example | When to Use |
|------------|--------|---------|-------------|
| **Path Alias** | `@/...` | `@/lib/utils/price-formatting` | Project files (preferred) |
| **Relative (same dir)** | `./filename` | `./ProductBadge` | Sibling files |
| **Relative (parent)** | `../filename` | `../constants` | Parent directory |
| **Node Module** | `package-name` | `'react'` | npm packages |
| **Next.js Module** | `next/...` | `'next/link'` | Next.js built-ins |
| **Type Import** | `import type` | `import type { Product }` | TypeScript types only |

---

## Tips & Best Practices

1. **Prefer `@` alias** for project files - it's cleaner and more maintainable
2. **Use relative imports** for closely related files in the same directory
3. **Group imports** by category (React → Next.js → Third-party → Local → Relative)
4. **Use type imports** when you only need types (helps with tree-shaking)
5. **Keep imports organized** - easier to read and maintain

---

## Troubleshooting

### "Cannot find module '@/...'"
- Check `tsconfig.json` has the `paths` configuration
- Restart your TypeScript server/IDE
- Verify the file path exists

### "Module not found"
- Check if the package is installed (`node_modules`)
- Verify the import path is correct
- Check for typos in the path

### Relative path issues
- Count the `../` levels correctly
- Consider using `@` alias instead for cleaner paths

---

## Summary

The `@` symbol is a **path alias** that maps to your project root, making imports cleaner and more maintainable. Your codebase uses:

1. ✅ **`@/...`** - Path alias (preferred for project files)
2. ✅ **`./...`** - Relative imports (for sibling files)
3. ✅ **`'package-name'`** - Node modules (npm packages)
4. ✅ **`'next/...'`** - Next.js modules
5. ✅ **`import type`** - Type-only imports

This organization makes your code more readable and maintainable! 🎉
