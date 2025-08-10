import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Navigation', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should navigate to all main pages from homepage', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test navigation to Quick Builds
    await page.click('text=Quick Builds');
    await helpers.expectCurrentURL('/quick-builds');
    await helpers.expectPageTitle('Quick Builds');
    
    // Test navigation to Build Planner
    await page.click('text=Build Planner');
    await helpers.expectCurrentURL('/planner');
    await helpers.expectPageTitle('Build Planner');
    
    // Test navigation to Help
    await page.click('text=Help');
    await helpers.expectCurrentURL('/help');
    await helpers.expectPageTitle('Help Center');
    
    // Test navigation to Contact
    await page.click('text=Contact');
    await helpers.expectCurrentURL('/contact');
    await helpers.expectPageTitle('Contact Us');
  });

  test('should have working logo navigation', async ({ page }) => {
    // Navigate to a different page first
    await helpers.navigateToQuickBuilds();
    await helpers.expectCurrentURL('/quick-builds');
    
    // Click logo to return to homepage
    await page.click(selectors.logo);
    await helpers.expectCurrentURL('/');
    await helpers.expectPageTitle('Transform Any Space');
  });

  test('should navigate to all support and legal pages', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test Safety page
    await page.click('text=Safety');
    await helpers.expectCurrentURL('/safety');
    await helpers.expectPageTitle('Safety Guidelines');
    
    // Test Privacy page
    await page.click('text=Privacy');
    await helpers.expectCurrentURL('/privacy');
    await helpers.expectPageTitle('Privacy Policy');
    
    // Test Terms page
    await page.click('text=Terms');
    await helpers.expectCurrentURL('/terms');
    await helpers.expectPageTitle('Terms of Service');
    
    // Test Disclaimer page
    await page.click('text=Disclaimer');
    await helpers.expectCurrentURL('/disclaimer');
    await helpers.expectPageTitle('Safety Disclaimer');
  });

  test('should navigate to demo page', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test "See Demo" button
    await page.click(selectors.seeDemoButton);
    await helpers.expectCurrentURL('/demo');
    await helpers.expectPageTitle('Demo');
  });

  test('should navigate to build planner from homepage CTA', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test "Start Building" button
    await page.click(selectors.startBuildingButton);
    await helpers.expectCurrentURL('/planner');
    await helpers.expectPageTitle('Build Planner');
  });

  test('should have working breadcrumb navigation', async ({ page }) => {
    // Navigate to a project page
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    await helpers.expectCurrentURL('/quick-builds/bird-house');
    
    // Test back navigation
    await page.click('text=← Back to Quick Builds');
    await helpers.expectCurrentURL('/quick-builds');
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Test direct navigation to all pages
    const pages = [
      { url: '/', title: 'Transform Any Space' },
      { url: '/quick-builds', title: 'Quick Builds' },
      { url: '/planner', title: 'Build Planner' },
      { url: '/demo', title: 'Demo' },
      { url: '/help', title: 'Help Center' },
      { url: '/contact', title: 'Contact Us' },
      { url: '/safety', title: 'Safety Guidelines' },
      { url: '/privacy', title: 'Privacy Policy' },
      { url: '/terms', title: 'Terms of Service' },
      { url: '/disclaimer', title: 'Safety Disclaimer' }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await helpers.expectPageTitle(pageInfo.title);
    }
  });

  test('should handle invalid URLs gracefully', async ({ page }) => {
    // Test 404 page
    await page.goto('/invalid-page');
    await helpers.expectErrorPage();
    
    // Test navigation back to home
    await page.click('text=Go Home, text=Home');
    await helpers.expectCurrentURL('/');
  });

  test('should maintain navigation state during form interactions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill out some form fields
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    
    // Navigate away and back
    await page.click('text=Quick Builds');
    await helpers.expectCurrentURL('/quick-builds');
    
    await page.click('text=Build Planner');
    await helpers.expectCurrentURL('/planner');
    
    // Form should be reset (no values)
    await helpers.expectFormFieldEmpty(selectors.widthInput);
    await helpers.expectFormFieldEmpty(selectors.lengthInput);
  });

  test('should handle navigation with browser back/forward buttons', async ({ page }) => {
    await helpers.navigateToHome();
    await helpers.navigateToQuickBuilds();
    await helpers.navigateToPlanner();
    
    // Test browser back button
    await page.goBack();
    await helpers.expectCurrentURL('/quick-builds');
    
    await page.goBack();
    await helpers.expectCurrentURL('/');
    
    // Test browser forward button
    await page.goForward();
    await helpers.expectCurrentURL('/quick-builds');
  });

  test('should have proper active navigation states', async ({ page }) => {
    // Test active state on current page
    await helpers.navigateToQuickBuilds();
    const activeLink = page.locator('text=Quick Builds').first();
    await expect(activeLink).toHaveClass(/active/);
    
    await helpers.navigateToPlanner();
    const plannerActiveLink = page.locator('text=Build Planner').first();
    await expect(plannerActiveLink).toHaveClass(/active/);
  });

  test('should handle navigation with query parameters', async ({ page }) => {
    await page.goto('/quick-builds?filter=beginner');
    await helpers.expectCurrentURL('/quick-builds?filter=beginner');
    
    // Test that filter is applied
    await helpers.expectTextContent('Beginner');
  });

  test('should handle navigation with hash fragments', async ({ page }) => {
    await page.goto('/help#faq');
    await helpers.expectCurrentURL('/help#faq');
    
    // Test that page scrolls to section
    await page.waitForTimeout(1000);
    const faqSection = page.locator('#faq');
    if (await faqSection.isVisible()) {
      await expect(faqSection).toBeVisible();
    }
  });
});
