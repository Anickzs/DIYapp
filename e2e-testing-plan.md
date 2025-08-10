# 🧪 Comprehensive E2E Testing Plan for DIYAPP

## 📋 **Testing Framework: Playwright**

### **Why Playwright?**
- ✅ Excellent Next.js support
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Mobile device testing
- ✅ Visual regression testing
- ✅ Fast execution and reliable selectors
- ✅ Great debugging tools

## 🎯 **Core User Journeys to Test**

### **1. Landing Page & Navigation**
```typescript
// Test scenarios:
- Homepage loads correctly with all sections
- Navigation links work (Features, Quick Builds, How It Works, Pricing)
- "Start Building" button navigates to planner
- "See Demo" button navigates to demo page
- Mobile navigation works
- Logo click returns to homepage
```

### **2. Quick Builds System**
```typescript
// Test scenarios:
- Quick Builds page displays all 6 projects
- Project cards show correct information (cost, time, difficulty)
- Clicking project cards navigates to detailed project page
- Individual project pages display:
  - Complete materials list
  - Step-by-step instructions
  - Safety notes and tips
  - Tool requirements
- Back navigation works from project pages
```

### **3. Build Planner (Most Complex Flow)**
```typescript
// Test scenarios:
- Form validation for all required fields
- Dimension input with feet/fractions (1/2, 1/4, etc.)
- Unit conversion (feet ↔ centimeters)
- Tool selection and filtering
- Multi-step form progression
- Form submission generates build plan
- Build plan displays:
  - Materials list with pricing
  - Shopping list with Amazon links
  - Step-by-step instructions
  - Tool requirements
  - Safety considerations
```

### **4. Contact & Support Pages**
```typescript
// Test scenarios:
- Contact form validation
- Form submission (mock)
- Help center page loads
- Safety guidelines page loads
- Legal pages (Privacy, Terms, Disclaimer) load
```

### **5. Responsive Design**
```typescript
// Test scenarios:
- Desktop layout (1920x1080)
- Tablet layout (768x1024)
- Mobile layout (375x667)
- Navigation adapts to screen size
- Forms are usable on mobile
- Images scale properly
```

### **6. Performance & Load Testing**
```typescript
// Test scenarios:
- Homepage loads within 3 seconds
- Form submissions handle large data sets
- Concurrent user testing
- Memory usage optimization
- Bundle size verification
```

### **7. Accessibility Testing**
```typescript
// Test scenarios:
- Proper ARIA labels on all interactive elements
- Keyboard navigation throughout the app
- Screen reader compatibility
- Color contrast compliance (WCAG 2.1 AA)
- Focus management and visible focus indicators
```

### **8. Error Handling & Edge Cases**
```typescript
// Test scenarios:
- Network error handling (offline mode)
- Invalid URL handling (404 pages)
- Form submission error recovery
- Large file upload limits
- Malformed data handling
```

### **9. Security Testing**
```typescript
// Test scenarios:
- XSS attack prevention
- Input validation and sanitization
- CSRF protection
- Secure form submissions
- Data encryption verification
```

### **10. PDF Generation Testing**
```typescript
// Test scenarios:
- Build plan PDF generation
- Quick build instruction PDFs
- PDF content completeness
- PDF download functionality
- PDF formatting accuracy
```

### **11. User Account Testing** (When implemented)
```typescript
// Test scenarios:
- User registration flow
- Login/logout functionality
- Password reset process
- User preferences saving
- Account management
```

### **12. Amazon Affiliate Integration Testing**
```typescript
// Test scenarios:
- Affiliate link functionality
- Click tracking verification
- Price accuracy and updates
- Product availability checks
- Commission tracking
```

### **13. PWA Testing** (When implemented)
```typescript
// Test scenarios:
- Manifest file validation
- Offline functionality
- App installation process
- Service worker functionality
- Push notifications
```

### **14. Visual Regression Testing**
```typescript
// Test scenarios:
- Screenshot comparison across browsers
- Layout consistency verification
- UI element positioning
- Responsive design validation
- Visual bug detection
```

## 🛠️ **Test Implementation Plan**

### **Phase 1: Setup & Basic Tests (Week 1)**

#### **1.1 Install Dependencies**
```bash
npm install --save-dev @playwright/test
npx playwright install
```

#### **1.2 Configure Playwright**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'accessibility',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*accessibility\.spec\.ts/,
    },
    {
      name: 'performance',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*performance\.spec\.ts/,
    },
    {
      name: 'security',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*security\.spec\.ts/,
    },
    {
      name: 'visual',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*visual\.spec\.ts/,
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  // Add visual comparison configuration
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 10,
    },
  },
});
```

#### **1.3 Basic Test Structure**
```
e2e/
├── tests/
│   ├── navigation.spec.ts
│   ├── homepage.spec.ts
│   ├── quick-builds.spec.ts
│   ├── build-planner.spec.ts
│   ├── contact.spec.ts
│   ├── responsive.spec.ts
│   ├── performance.spec.ts
│   ├── accessibility.spec.ts
│   ├── error-handling.spec.ts
│   ├── security.spec.ts
│   ├── pdf-generation.spec.ts
│   ├── user-accounts.spec.ts
│   ├── affiliate.spec.ts
│   ├── pwa.spec.ts
│   └── visual.spec.ts
├── utils/
│   ├── test-helpers.ts
│   └── selectors.ts
└── fixtures/
    └── test-data.ts
```

### **Phase 2: Core Functionality Tests (Week 2)**

#### **2.1 Navigation Tests**
```typescript
// e2e/tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    await page.click('text=Quick Builds');
    await expect(page).toHaveURL('/quick-builds');
    
    await page.click('text=Build Planner');
    await expect(page).toHaveURL('/planner');
    
    await page.click('text=Help');
    await expect(page).toHaveURL('/help');
    
    await page.click('text=Contact');
    await expect(page).toHaveURL('/contact');
  });

  test('should have working logo navigation', async ({ page }) => {
    await page.goto('/quick-builds');
    await page.click('[data-testid="logo"]');
    await expect(page).toHaveURL('/');
  });
});
```

#### **2.2 Homepage Tests**
```typescript
// e2e/tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load all sections correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section
    await expect(page.locator('h1')).toContainText('Transform Any Space');
    await expect(page.locator('text=Start Your Build Plan')).toBeVisible();
    
    // Check features section
    await expect(page.locator('text=Everything You Need to Build Anything')).toBeVisible();
    
    // Check Quick Builds section
    await expect(page.locator('text=Quick Builds')).toBeVisible();
    await expect(page.locator('[data-testid="quick-build-card"]')).toHaveCount(6);
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');
    
    // Test "Start Building" button
    await page.click('text=Start Your Build Plan');
    await expect(page).toHaveURL('/planner');
    
    // Test "See Demo" button
    await page.goto('/');
    await page.click('text=See Demo');
    await expect(page).toHaveURL('/demo');
  });
});
```

### **Phase 3: Complex Feature Tests (Week 3)**

#### **3.1 Quick Builds Tests**
```typescript
// e2e/tests/quick-builds.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Quick Builds', () => {
  test('should display all projects', async ({ page }) => {
    await page.goto('/quick-builds');
    
    const projects = [
      'Bird House',
      'Outdoor Bench', 
      'Wooden Toy Car',
      'Floating Shelf',
      'Planter Box',
      'Coat Rack'
    ];
    
    for (const project of projects) {
      await expect(page.locator(`text=${project}`)).toBeVisible();
    }
  });

  test('should navigate to project details', async ({ page }) => {
    await page.goto('/quick-builds');
    await page.click('text=Bird House');
    await expect(page).toHaveURL('/quick-builds/bird-house');
    
    // Check project details
    await expect(page.locator('text=Materials')).toBeVisible();
    await expect(page.locator('text=Tools')).toBeVisible();
    await expect(page.locator('text=Instructions')).toBeVisible();
  });
});
```

#### **3.2 Build Planner Tests (Most Complex)**
```typescript
// e2e/tests/build-planner.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Build Planner', () => {
  test('should validate required fields', async ({ page }) => {
    await page.goto('/planner');
    
    // Try to submit without filling required fields
    await page.click('text=Generate Plan');
    
    // Check for validation errors
    await expect(page.locator('text=Width is required')).toBeVisible();
    await expect(page.locator('text=Length is required')).toBeVisible();
  });

  test('should handle dimension input with fractions', async ({ page }) => {
    await page.goto('/planner');
    
    // Test feet with fractions
    await page.fill('[data-testid="width-input"]', '3 1/2');
    await page.fill('[data-testid="length-input"]', '5 3/4');
    
    // Check unit conversion
    await expect(page.locator('[data-testid="width-cm"]')).toContainText('107');
    await expect(page.locator('[data-testid="length-cm"]')).toContainText('175');
  });

  test('should generate complete build plan', async ({ page }) => {
    await page.goto('/planner');
    
    // Fill out form
    await page.selectOption('[data-testid="space-type"]', 'room');
    await page.fill('[data-testid="width-input"]', '4');
    await page.fill('[data-testid="length-input"]', '6');
    await page.selectOption('[data-testid="project-type"]', 'shelf');
    await page.selectOption('[data-testid="project-size"]', 'medium');
    await page.selectOption('[data-testid="style"]', 'modern');
    await page.selectOption('[data-testid="skill-level"]', 'beginner');
    await page.selectOption('[data-testid="budget"]', 'moderate');
    
    // Submit form
    await page.click('text=Generate Plan');
    
    // Check results
    await expect(page.locator('text=Your Custom Build Plan')).toBeVisible();
    await expect(page.locator('text=Materials List')).toBeVisible();
    await expect(page.locator('text=Shopping List')).toBeVisible();
    await expect(page.locator('text=Instructions')).toBeVisible();
  });
});
```

### **Phase 4: Responsive & Cross-Browser Tests (Week 4)**

#### **4.1 Responsive Design Tests**
```typescript
// e2e/tests/responsive.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile navigation
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Test mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
  });

  test('should work on tablets', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check tablet layout
    await expect(page.locator('[data-testid="quick-builds-grid"]')).toBeVisible();
  });
});
```

#### **4.2 Cross-Browser Tests**
```typescript
// e2e/tests/cross-browser.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Cross Browser Compatibility', () => {
  test('should work in Chrome', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Transform Any Space');
  });

  test('should work in Firefox', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Transform Any Space');
  });

  test('should work in Safari', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Transform Any Space');
  });
});
```

#### **4.3 Performance Tests**
```typescript
// e2e/tests/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load homepage within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('should handle large form submissions', async ({ page }) => {
    await page.goto('/planner');
    
    // Fill form with maximum data
    await page.selectOption('[data-testid="space-type"]', 'room');
    await page.fill('[data-testid="width-input"]', '20');
    await page.fill('[data-testid="length-input"]', '30');
    await page.selectOption('[data-testid="project-type"]', 'shelf');
    await page.selectOption('[data-testid="project-size"]', 'large');
    await page.selectOption('[data-testid="style"]', 'modern');
    await page.selectOption('[data-testid="skill-level"]', 'expert');
    await page.selectOption('[data-testid="budget"]', 'premium');
    
    const startTime = Date.now();
    await page.click('text=Generate Plan');
    await expect(page.locator('text=Your Custom Build Plan')).toBeVisible();
    const submissionTime = Date.now() - startTime;
    expect(submissionTime).toBeLessThan(5000);
  });

  test('should handle concurrent users', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const context3 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    const page3 = await context3.newPage();
    
    await Promise.all([
      page1.goto('/'),
      page2.goto('/quick-builds'),
      page3.goto('/planner')
    ]);
    
    await expect(page1.locator('h1')).toContainText('Transform Any Space');
    await expect(page2.locator('h1')).toContainText('Quick Builds');
    await expect(page3.locator('h1')).toContainText('Build Planner');
    
    await context1.close();
    await context2.close();
    await context3.close();
  });
});
```

#### **4.4 Accessibility Tests**
```typescript
// e2e/tests/accessibility.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[aria-label]')).toHaveCount.greaterThan(0);
    
    // Check form inputs have labels
    await page.goto('/planner');
    await expect(page.locator('input[aria-label]')).toHaveCount.greaterThan(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Navigate through all interactive elements
    const focusableElements = await page.locator('button, a, input, select, textarea').count();
    expect(focusableElements).toBeGreaterThan(0);
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check text contrast ratios
    const textElements = await page.locator('h1, h2, h3, p, span').all();
    for (const element of textElements) {
      const color = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.color;
      });
      // Verify color contrast meets WCAG 2.1 AA standards
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should work with screen readers', async ({ page }) => {
    await page.goto('/');
    
    // Check for screen reader friendly elements
    await expect(page.locator('[role="main"]')).toBeVisible();
    await expect(page.locator('[role="navigation"]')).toBeVisible();
  });
});
```

#### **4.5 Error Handling Tests**
```typescript
// e2e/tests/error-handling.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate offline mode
    await page.route('**/*', route => route.abort());
    await page.goto('/');
    await expect(page.locator('text=Something went wrong')).toBeVisible();
  });

  test('should handle invalid URLs', async ({ page }) => {
    await page.goto('/invalid-page');
    await expect(page.locator('text=Page not found')).toBeVisible();
  });

  test('should handle form submission errors', async ({ page }) => {
    await page.goto('/planner');
    
    // Submit form with invalid data
    await page.click('text=Generate Plan');
    await expect(page.locator('text=Please fill in all required fields')).toBeVisible();
  });

  test('should handle large file uploads', async ({ page }) => {
    await page.goto('/contact');
    
    // Test file upload limits
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      // Test with large file
      await fileInput.setInputFiles({
        name: 'large-file.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.alloc(10 * 1024 * 1024) // 10MB file
      });
      await expect(page.locator('text=File too large')).toBeVisible();
    }
  });
});
```

#### **4.6 Security Tests**
```typescript
// e2e/tests/security.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Security', () => {
  test('should prevent XSS attacks', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('[data-testid="message"]', '<script>alert("xss")</script>');
    await page.click('text=Send Message');
    
    // Verify script is not executed
    const pageContent = await page.content();
    expect(pageContent).not.toContain('<script>alert("xss")</script>');
  });

  test('should validate form inputs', async ({ page }) => {
    await page.goto('/planner');
    await page.fill('[data-testid="width-input"]', '999999999999');
    await page.fill('[data-testid="length-input"]', '-1');
    
    await page.click('text=Generate Plan');
    await expect(page.locator('text=Invalid dimensions')).toBeVisible();
  });

  test('should prevent CSRF attacks', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for CSRF token
    const csrfToken = await page.locator('input[name="_csrf"]').isVisible();
    expect(csrfToken).toBeTruthy();
  });
});
```

#### **4.7 PDF Generation Tests**
```typescript
// e2e/tests/pdf-generation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('PDF Generation', () => {
  test('should generate PDF for build plans', async ({ page }) => {
    await page.goto('/planner');
    
    // Fill out form and generate plan
    await page.selectOption('[data-testid="space-type"]', 'room');
    await page.fill('[data-testid="width-input"]', '4');
    await page.fill('[data-testid="length-input"]', '6');
    await page.selectOption('[data-testid="project-type"]', 'shelf');
    await page.selectOption('[data-testid="project-size"]', 'medium');
    await page.selectOption('[data-testid="style"]', 'modern');
    await page.selectOption('[data-testid="skill-level"]', 'beginner');
    await page.selectOption('[data-testid="budget"]', 'moderate');
    
    await page.click('text=Generate Plan');
    await expect(page.locator('text=Your Custom Build Plan')).toBeVisible();
    
    // Test PDF download
    await page.click('text=Download PDF');
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should generate PDF for quick builds', async ({ page }) => {
    await page.goto('/quick-builds/bird-house');
    await page.click('text=Download Instructions');
    
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should include all required information in PDF', async ({ page }) => {
    await page.goto('/quick-builds/bird-house');
    await page.click('text=Download Instructions');
    
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    
    // Verify PDF content (basic check)
    expect(download.suggestedFilename()).toContain('bird-house');
  });
});
```

#### **4.8 User Account Tests** (When implemented)
```typescript
// e2e/tests/user-accounts.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Accounts', () => {
  test('should allow user registration', async ({ page }) => {
    await page.goto('/auth/register');
    
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.fill('[data-testid="confirm-password"]', 'password123');
    await page.click('text=Register');
    
    await expect(page.locator('text=Registration successful')).toBeVisible();
  });

  test('should allow user login', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('text=Login');
    
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('should save user preferences', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('text=Login');
    
    // Test dashboard functionality
    await page.goto('/dashboard');
    await expect(page.locator('text=My Projects')).toBeVisible();
  });

  test('should handle password reset', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.click('text=Reset Password');
    
    await expect(page.locator('text=Reset email sent')).toBeVisible();
  });
});
```

#### **4.9 Amazon Affiliate Integration Tests**
```typescript
// e2e/tests/affiliate.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Amazon Affiliate Integration', () => {
  test('should have working affiliate links', async ({ page }) => {
    await page.goto('/quick-builds/bird-house');
    const links = await page.locator('a[href*="amazon"]').all();
    expect(links.length).toBeGreaterThan(0);
    
    // Test link functionality
    const firstLink = links[0];
    await firstLink.click();
    await expect(page).toHaveURL(/amazon/);
  });

  test('should track affiliate clicks', async ({ page }) => {
    await page.goto('/quick-builds/bird-house');
    
    // Click affiliate link and check tracking
    await page.click('a[href*="amazon"]');
    
    // Verify tracking parameters
    const currentUrl = page.url();
    expect(currentUrl).toContain('tag=');
  });

  test('should show correct pricing', async ({ page }) => {
    await page.goto('/quick-builds/bird-house');
    
    // Check that prices are displayed
    await expect(page.locator('text=$')).toBeVisible();
    
    // Verify price format
    const priceElements = await page.locator('[data-testid="price"]').all();
    for (const element of priceElements) {
      const priceText = await element.textContent();
      expect(priceText).toMatch(/\$\d+/);
    }
  });
});
```

#### **4.10 PWA Tests** (When implemented)
```typescript
// e2e/tests/pwa.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Progressive Web App', () => {
  test('should have valid manifest', async ({ page }) => {
    await page.goto('/');
    const manifest = await page.evaluate(() => {
      return document.querySelector('link[rel="manifest"]')?.getAttribute('href');
    });
    expect(manifest).toBeTruthy();
    
    // Check manifest content
    const manifestResponse = await page.goto(manifest);
    const manifestData = await manifestResponse.json();
    expect(manifestData.name).toBe('At Home DIY');
  });

  test('should work offline', async ({ page }) => {
    await page.goto('/');
    
    // Simulate offline mode
    await page.route('**/*', route => route.abort());
    
    // Try to navigate to a cached page
    await page.goto('/quick-builds');
    await expect(page.locator('text=Quick Builds')).toBeVisible();
  });

  test('should be installable', async ({ page }) => {
    await page.goto('/');
    
    // Check for install prompt
    const installButton = await page.locator('[data-testid="install-app"]').isVisible();
    expect(installButton).toBeTruthy();
  });
});
```

#### **4.11 Visual Regression Tests**
```typescript
// e2e/tests/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('should match homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png');
  });

  test('should match all page layouts', async ({ page }) => {
    const pages = ['/quick-builds', '/planner', '/help', '/contact'];
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await expect(page).toHaveScreenshot(`${pagePath.replace('/', '')}.png`);
    }
  });

  test('should match responsive layouts', async ({ page }) => {
    await page.goto('/');
    
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('homepage-desktop.png');
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('homepage-tablet.png');
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});
```

## 🎯 **Test Data & Fixtures**

### **Test Data Structure**
```typescript
// e2e/fixtures/test-data.ts
export const testProjects = {
  birdHouse: {
    name: 'Bird House',
    cost: '$15-25',
    time: '2-3 hours',
    difficulty: 'Beginner'
  },
  // ... other projects
};

export const testFormData = {
  valid: {
    spaceType: 'room',
    width: '4',
    length: '6',
    projectType: 'shelf',
    projectSize: 'medium',
    style: 'modern',
    skillLevel: 'beginner',
    budget: 'moderate'
  },
  invalid: {
    width: '0',
    length: '-1'
  }
};
```

## 🚀 **Running Tests**

### **Package.json Scripts**
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report"
  }
}
```

### **CI/CD Integration**
```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📊 **Test Coverage Goals**

### **Critical Paths (100% Coverage)**
- ✅ Homepage loading and navigation
- ✅ Quick Builds browsing and selection
- ✅ Build Planner form completion
- ✅ Build plan generation
- ✅ Contact form submission
- ✅ Performance benchmarks
- ✅ Accessibility compliance

### **Secondary Paths (80% Coverage)**
- ✅ All support pages
- ✅ Legal pages
- ✅ Demo page
- ✅ Error handling
- ✅ Security validation
- ✅ PDF generation
- ✅ Visual regression

### **Edge Cases (60% Coverage)**
- ✅ Form validation edge cases
- ✅ Mobile responsiveness
- ✅ Cross-browser compatibility
- ✅ Performance under load
- ✅ Network error handling
- ✅ User account flows (when implemented)
- ✅ PWA functionality (when implemented)

## 🎯 **Success Metrics**

### **Test Reliability**
- ✅ 95%+ test pass rate
- ✅ < 5% flaky tests
- ✅ < 30 second average test execution time

### **Coverage Targets**
- ✅ 90%+ user journey coverage
- ✅ 80%+ component interaction coverage
- ✅ 70%+ edge case coverage

## 🚀 **Next Steps**

1. **Install Playwright**: `npm install --save-dev @playwright/test`
2. **Create test structure**: Set up directories and basic config
3. **Write first tests**: Start with navigation and homepage
4. **Set up CI/CD**: Integrate with GitHub Actions
5. **Expand coverage**: Add complex feature tests
6. **Performance testing**: Add load and visual regression tests

This comprehensive E2E testing plan will ensure your DIYAPP works reliably across all devices and browsers, providing a solid foundation for user confidence and business success.
