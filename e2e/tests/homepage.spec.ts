import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Homepage', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should load all sections correctly', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check hero section
    await helpers.expectPageTitle('Transform Any Space');
    await helpers.expectTextContent('Start Your Build Plan');
    await helpers.expectTextContent('See Demo');
    
    // Check features section
    await helpers.expectTextContent('Everything You Need to Build Anything');
    await helpers.expectTextContent('AI-Powered Planning');
    await helpers.expectTextContent('Step-by-Step Instructions');
    await helpers.expectTextContent('Material Lists');
    
    // Check Quick Builds section
    await helpers.expectTextContent('Quick Builds');
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
    
    // Check footer
    await helpers.expectTextContent('Contact');
    await helpers.expectTextContent('Privacy');
    await helpers.expectTextContent('Terms');
  });

  test('should have working CTA buttons', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test "Start Building" button
    await page.click(selectors.startBuildingButton);
    await helpers.expectCurrentURL('/planner');
    await helpers.expectPageTitle('Build Planner');
    
    // Test "See Demo" button
    await helpers.navigateToHome();
    await page.click(selectors.seeDemoButton);
    await helpers.expectCurrentURL('/demo');
    await helpers.expectPageTitle('Demo');
  });

  test('should display all Quick Build projects', async ({ page }) => {
    await helpers.navigateToHome();
    
    const projects = [
      'Bird House',
      'Outdoor Bench', 
      'Wooden Toy Car',
      'Floating Shelf',
      'Planter Box',
      'Coat Rack'
    ];
    
    for (const project of projects) {
      await helpers.expectTextContent(project);
    }
  });

  test('should navigate to Quick Build project details', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Click on Bird House project
    await page.click('text=Bird House');
    await helpers.expectCurrentURL('/quick-builds/bird-house');
    await helpers.expectPageTitle('Bird House');
    
    // Verify project details are displayed
    await helpers.expectTextContent('Materials');
    await helpers.expectTextContent('Tools');
    await helpers.expectTextContent('Instructions');
  });

  test('should display project information correctly', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that project cards show cost, time, and difficulty
    await helpers.expectTextContent('$15-25');
    await helpers.expectTextContent('2-3 hours');
    await helpers.expectTextContent('Beginner');
  });

  test('should have proper meta tags and SEO elements', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check title
    await expect(page).toHaveTitle(/At Home DIY/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');
    
    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1');
  });

  test('should load within performance benchmarks', async ({ page }) => {
    const startTime = Date.now();
    await helpers.navigateToHome();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that there's only one h1
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);
    
    // Check that h2 elements exist for sections
    const h2Elements = await page.locator('h2').count();
    expect(h2Elements).toBeGreaterThan(0);
  });

  test('should have working navigation links', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test all navigation links
    const navLinks = [
      { text: 'Quick Builds', url: '/quick-builds' },
      { text: 'Build Planner', url: '/planner' },
      { text: 'Help', url: '/help' },
      { text: 'Contact', url: '/contact' }
    ];
    
    for (const link of navLinks) {
      await page.click(`text=${link.text}`);
      await helpers.expectCurrentURL(link.url);
      await helpers.navigateToHome();
    }
  });

  test('should have proper images and alt text', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that images have alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
    }
  });

  test('should handle scroll behavior correctly', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Check that footer is visible
    await helpers.expectTextContent('Contact');
    
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    // Check that hero section is visible
    await helpers.expectTextContent('Transform Any Space');
  });

  test('should have proper focus management', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test that focus moves through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const newFocusedElement = page.locator(':focus');
    await expect(newFocusedElement).toBeVisible();
  });

  test('should handle window resize correctly', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test mobile viewport
    await helpers.setMobileViewport();
    await helpers.expectElementVisible(selectors.mobileMenu);
    
    // Test tablet viewport
    await helpers.setTabletViewport();
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
    
    // Test desktop viewport
    await helpers.setDesktopViewport();
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
  });

  test('should have proper link relationships', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that external links open in new tab
    const externalLinks = await page.locator(selectors.externalLinks).all();
    for (const link of externalLinks) {
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that no critical errors occurred
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('analytics') &&
      !error.includes('third-party')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should have proper color contrast', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that text is readable
    const textElements = await page.locator('h1, h2, h3, p, span').all();
    for (const element of textElements) {
      const color = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.color;
      });
      
      // Verify color is not transparent
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).not.toBe('transparent');
    }
  });

  test('should handle rapid navigation correctly', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Rapidly click different navigation links
    await page.click('text=Quick Builds');
    await page.waitForTimeout(100);
    await page.click('text=Build Planner');
    await page.waitForTimeout(100);
    await page.click('text=Help');
    await page.waitForTimeout(100);
    await page.click('text=Contact');
    
    // Should end up on contact page
    await helpers.expectCurrentURL('/contact');
    await helpers.expectPageTitle('Contact Us');
  });

  test('should have proper loading states', async ({ page }) => {
    // Simulate slow network
    await helpers.simulateSlowNetwork();
    
    await helpers.navigateToHome();
    
    // Check for loading indicators if they exist
    const loadingElements = await page.locator(selectors.loadingSpinner).count();
    if (loadingElements > 0) {
      await helpers.expectLoadingState();
      await helpers.expectNoLoadingState();
    }
  });
});
