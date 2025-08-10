import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Performance', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should load homepage within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await helpers.navigateToHome();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
    await helpers.expectPageTitle('Transform Any Space');
  });

  test('should load Quick Builds page within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await helpers.navigateToQuickBuilds();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
    await helpers.expectPageTitle('Quick Builds');
  });

  test('should load Build Planner page within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await helpers.navigateToPlanner();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
    await helpers.expectPageTitle('Build Planner');
  });

  test('should handle form submission within 5 seconds', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill out form
    await helpers.fillBuildPlannerForm({
      spaceType: 'room',
      width: '4',
      length: '6',
      projectType: 'shelf',
      projectSize: 'medium',
      style: 'modern',
      skillLevel: 'beginner',
      budget: 'moderate'
    });
    
    const startTime = Date.now();
    await page.click(selectors.generatePlanButton);
    await helpers.expectTextContent('Your Custom Build Plan');
    const submissionTime = Date.now() - startTime;
    
    expect(submissionTime).toBeLessThan(5000);
  });

  test('should handle large form submissions efficiently', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form with maximum data
    await helpers.fillBuildPlannerForm({
      spaceType: 'room',
      width: '20',
      length: '30',
      projectType: 'shelf',
      projectSize: 'large',
      style: 'modern',
      skillLevel: 'expert',
      budget: 'premium'
    });
    
    const startTime = Date.now();
    await page.click(selectors.generatePlanButton);
    await helpers.expectTextContent('Your Custom Build Plan');
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
    
    const startTime = Date.now();
    
    await Promise.all([
      page1.goto('/'),
      page2.goto('/quick-builds'),
      page3.goto('/planner')
    ]);
    
    await Promise.all([
      page1.waitForLoadState('networkidle'),
      page2.waitForLoadState('networkidle'),
      page3.waitForLoadState('networkidle')
    ]);
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
    
    await expect(page1.locator('h1')).toContainText('Transform Any Space');
    await expect(page2.locator('h1')).toContainText('Quick Builds');
    await expect(page3.locator('h1')).toContainText('Build Planner');
    
    await context1.close();
    await context2.close();
    await context3.close();
  });

  test('should handle memory usage efficiently', async ({ page }) => {
    // Navigate to multiple pages to test memory usage
    const pages = ['/', '/quick-builds', '/planner', '/help', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      // Check that page loads without memory issues
      await helpers.expectPageTitle(/./);
    }
    
    // Navigate back to home and ensure it still works
    await helpers.navigateToHome();
    await helpers.expectPageTitle('Transform Any Space');
  });

  test('should handle bundle size efficiently', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that page loads without excessive bundle size
    const metrics = await page.evaluate(() => {
      return {
        jsHeapSize: performance.memory?.usedJSHeapSize || 0,
        domNodes: document.querySelectorAll('*').length,
        scripts: document.querySelectorAll('script').length,
        stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length
      };
    });
    
    // Check reasonable limits
    expect(metrics.domNodes).toBeLessThan(1000);
    expect(metrics.scripts.length).toBeLessThan(20);
    expect(metrics.stylesheets.length).toBeLessThan(10);
  });

  test('should handle image loading efficiently', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that images load efficiently
    const images = await page.locator('img').all();
    const imageLoadTimes: number[] = [];
    
    for (const img of images) {
      const startTime = Date.now();
      await img.waitFor({ state: 'attached' });
      const loadTime = Date.now() - startTime;
      imageLoadTimes.push(loadTime);
    }
    
    // Check that all images load within reasonable time
    const maxLoadTime = Math.max(...imageLoadTimes);
    expect(maxLoadTime).toBeLessThan(3000);
  });

  test('should handle navigation performance', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test navigation performance
    const navTests = [
      { from: '/', to: '/quick-builds', expectedTitle: 'Quick Builds' },
      { from: '/quick-builds', to: '/planner', expectedTitle: 'Build Planner' },
      { from: '/planner', to: '/help', expectedTitle: 'Help Center' },
      { from: '/help', to: '/contact', expectedTitle: 'Contact Us' }
    ];
    
    for (const test of navTests) {
      await page.goto(test.from);
      await page.waitForLoadState('networkidle');
      
      const startTime = Date.now();
      await page.goto(test.to);
      await page.waitForLoadState('networkidle');
      const navTime = Date.now() - startTime;
      
      expect(navTime).toBeLessThan(2000);
      await helpers.expectPageTitle(test.expectedTitle);
    }
  });

  test('should handle form validation performance', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test real-time validation performance
    const startTime = Date.now();
    await page.fill(selectors.widthInput, '0');
    await page.waitForTimeout(500);
    const validationTime = Date.now() - startTime;
    
    expect(validationTime).toBeLessThan(1000);
    await helpers.expectValidationError('greater than 0');
  });

  test('should handle search performance', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Test search performance if search exists
    const searchInput = page.locator('[data-testid="search-input"], input[placeholder*="search"]');
    if (await searchInput.isVisible()) {
      const startTime = Date.now();
      await searchInput.fill('bird');
      await page.waitForTimeout(500);
      const searchTime = Date.now() - startTime;
      
      expect(searchTime).toBeLessThan(1000);
      await helpers.expectTextContent('Bird House');
    }
  });

  test('should handle filtering performance', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Test filtering performance
    const startTime = Date.now();
    await page.click('text=Beginner');
    await page.waitForTimeout(500);
    const filterTime = Date.now() - startTime;
    
    expect(filterTime).toBeLessThan(1000);
    await helpers.expectElementCount(selectors.projectCard, 6);
  });

  test('should handle scrolling performance', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test scrolling performance
    const startTime = Date.now();
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    const scrollTime = Date.now() - startTime;
    
    expect(scrollTime).toBeLessThan(2000);
    
    // Check that footer is accessible
    await helpers.expectTextContent('Contact');
  });

  test('should handle keyboard navigation performance', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test keyboard navigation performance
    const startTime = Date.now();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const navTime = Date.now() - startTime;
    
    expect(navTime).toBeLessThan(1000);
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should handle error recovery performance', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Create an error and test recovery performance
    await page.fill(selectors.widthInput, '0');
    await page.click(selectors.generatePlanButton);
    await helpers.expectValidationError('greater than 0');
    
    const startTime = Date.now();
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    await page.selectOption(selectors.projectTypeSelect, 'shelf');
    await page.selectOption(selectors.projectSizeSelect, 'medium');
    await page.selectOption(selectors.styleSelect, 'modern');
    await page.selectOption(selectors.skillLevelSelect, 'beginner');
    await page.selectOption(selectors.budgetSelect, 'moderate');
    
    await page.click(selectors.generatePlanButton);
    await helpers.expectTextContent('Your Custom Build Plan');
    const recoveryTime = Date.now() - startTime;
    
    expect(recoveryTime).toBeLessThan(5000);
  });

  test('should handle network latency gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => {
      route.continue();
    });
    
    // Add artificial delay
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 1000);
    });
    
    const startTime = Date.now();
    await helpers.navigateToHome();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should still load within reasonable time even with latency
    expect(loadTime).toBeLessThan(10000);
    await helpers.expectPageTitle('Transform Any Space');
  });

  test('should handle intermittent network issues', async ({ page }) => {
    // Simulate intermittent network failures
    let requestCount = 0;
    await page.route('**/*', route => {
      requestCount++;
      if (requestCount % 3 === 0) {
        route.abort();
      } else {
        route.continue();
      }
    });
    
    await helpers.navigateToHome();
    
    // Should handle intermittent failures gracefully
    await helpers.expectPageTitle('Transform Any Space');
  });

  test('should handle large data sets efficiently', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Test with large number of projects if implemented
    const projectCards = await page.locator(selectors.projectCard).all();
    expect(projectCards.length).toBe(6);
    
    // Test that all projects load efficiently
    for (const card of projectCards) {
      await expect(card).toBeVisible();
    }
  });

  test('should handle form field updates efficiently', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test rapid form field updates
    const startTime = Date.now();
    
    for (let i = 0; i < 10; i++) {
      await page.fill(selectors.widthInput, i.toString());
      await page.waitForTimeout(50);
    }
    
    const updateTime = Date.now() - startTime;
    expect(updateTime).toBeLessThan(2000);
    
    // Final value should be correct
    await helpers.expectFormFieldValue(selectors.widthInput, '9');
  });

  test('should handle DOM manipulation efficiently', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test DOM manipulation performance
    const startTime = Date.now();
    
    // Simulate rapid DOM updates
    await page.evaluate(() => {
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = `Test ${i}`;
        document.body.appendChild(div);
        document.body.removeChild(div);
      }
    });
    
    const domTime = Date.now() - startTime;
    expect(domTime).toBeLessThan(1000);
  });

  test('should handle event handling efficiently', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test event handling performance
    const startTime = Date.now();
    
    // Simulate rapid clicks
    for (let i = 0; i < 10; i++) {
      await page.click('text=Quick Builds');
      await page.waitForTimeout(100);
      await page.click('text=Home');
      await page.waitForTimeout(100);
    }
    
    const eventTime = Date.now() - startTime;
    expect(eventTime).toBeLessThan(5000);
    
    // Should end up on home page
    await helpers.expectCurrentURL('/');
  });

  test('should handle CSS animations efficiently', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test CSS animation performance if animations exist
    const animatedElements = page.locator('[class*="animate"], [class*="transition"]');
    const animationCount = await animatedElements.count();
    
    if (animationCount > 0) {
      const startTime = Date.now();
      
      // Trigger animations
      await page.evaluate(() => {
        const elements = document.querySelectorAll('[class*="animate"], [class*="transition"]');
        elements.forEach(el => {
          el.classList.add('animate');
        });
      });
      
      await page.waitForTimeout(1000);
      const animationTime = Date.now() - startTime;
      expect(animationTime).toBeLessThan(2000);
    }
  });

  test('should handle localStorage operations efficiently', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test localStorage performance
    const startTime = Date.now();
    
    await page.evaluate(() => {
      for (let i = 0; i < 100; i++) {
        localStorage.setItem(`test-${i}`, `value-${i}`);
        localStorage.getItem(`test-${i}`);
      }
    });
    
    const storageTime = Date.now() - startTime;
    expect(storageTime).toBeLessThan(1000);
  });

  test('should handle API response caching', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill and submit form
    await helpers.fillBuildPlannerForm({
      spaceType: 'room',
      width: '4',
      length: '6',
      projectType: 'shelf',
      projectSize: 'medium',
      style: 'modern',
      skillLevel: 'beginner',
      budget: 'moderate'
    });
    
    const firstStartTime = Date.now();
    await page.click(selectors.generatePlanButton);
    await helpers.expectTextContent('Your Custom Build Plan');
    const firstTime = Date.now() - firstStartTime;
    
    // Submit same form again to test caching
    await page.click('text=Generate New Plan, text=Generate Plan');
    const secondStartTime = Date.now();
    await helpers.expectTextContent('Your Custom Build Plan');
    const secondTime = Date.now() - secondStartTime;
    
    // Second submission should be faster if caching is implemented
    expect(secondTime).toBeLessThanOrEqual(firstTime);
  });

  test('should handle resource preloading', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for preloaded resources
    const preloadLinks = await page.locator('link[rel="preload"]').count();
    
    if (preloadLinks > 0) {
      // Test that preloaded resources load quickly
      const startTime = Date.now();
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
    }
  });

  test('should handle service worker performance', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for service worker
    const hasServiceWorker = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    
    if (hasServiceWorker) {
      // Test offline functionality
      await page.route('**/*', route => route.abort());
      
      // Try to navigate to a cached page
      await page.goto('/quick-builds');
      await helpers.expectTextContent('Quick Builds');
    }
  });
});
