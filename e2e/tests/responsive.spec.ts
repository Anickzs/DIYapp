import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Responsive Design', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should work on mobile devices (375x667)', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Check mobile navigation
    const mobileMenu = page.locator(selectors.mobileMenu);
    if (await mobileMenu.isVisible()) {
      await expect(mobileMenu).toBeVisible();
    }
    
    // Test mobile menu functionality
    const mobileMenuButton = page.locator(selectors.mobileMenuButton);
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      
      // Check that mobile navigation is expanded
      const mobileNav = page.locator(selectors.mobileMenu);
      await expect(mobileNav).toBeVisible();
    }
    
    // Check that content is properly sized for mobile
    const heroSection = page.locator('h1');
    const heroText = await heroSection.textContent();
    expect(heroText).toContain('Transform Any Space');
  });

  test('should work on tablets (768x1024)', async ({ page }) => {
    await helpers.setTabletViewport();
    await helpers.navigateToHome();
    
    // Check tablet layout
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
    
    // Check that navigation is accessible
    await page.click('text=Quick Builds');
    await helpers.expectCurrentURL('/quick-builds');
    
    // Check that forms are usable on tablet
    await helpers.navigateToPlanner();
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    await helpers.expectFormFieldValue(selectors.widthInput, '4');
  });

  test('should work on desktop (1920x1080)', async ({ page }) => {
    await helpers.setDesktopViewport();
    await helpers.navigateToHome();
    
    // Check desktop layout
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
    
    // Check that all navigation elements are visible
    await helpers.expectTextContent('Quick Builds');
    await helpers.expectTextContent('Build Planner');
    await helpers.expectTextContent('Help');
    await helpers.expectTextContent('Contact');
  });

  test('should handle responsive navigation correctly', async ({ page }) => {
    // Test mobile navigation
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    const mobileMenuButton = page.locator(selectors.mobileMenuButton);
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      
      // Test navigation links in mobile menu
      await page.click('text=Quick Builds');
      await helpers.expectCurrentURL('/quick-builds');
      
      // Open mobile menu again
      await helpers.navigateToHome();
      await mobileMenuButton.click();
      await page.click('text=Build Planner');
      await helpers.expectCurrentURL('/planner');
    }
  });

  test('should handle responsive forms correctly', async ({ page }) => {
    // Test mobile form
    await helpers.setMobileViewport();
    await helpers.navigateToPlanner();
    
    // Check that form fields are properly sized
    const widthInput = page.locator(selectors.widthInput);
    const inputBox = await widthInput.boundingBox();
    expect(inputBox.width).toBeGreaterThan(200); // Should be wide enough to type
    
    // Fill form on mobile
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    await page.selectOption(selectors.projectTypeSelect, 'shelf');
    await page.selectOption(selectors.projectSizeSelect, 'medium');
    await page.selectOption(selectors.styleSelect, 'modern');
    await page.selectOption(selectors.skillLevelSelect, 'beginner');
    await page.selectOption(selectors.budgetSelect, 'moderate');
    
    // Submit form
    await page.click(selectors.generatePlanButton);
    await helpers.expectTextContent('Your Custom Build Plan');
  });

  test('should handle responsive contact forms', async ({ page }) => {
    // Test mobile contact form
    await helpers.setMobileViewport();
    await helpers.navigateToContact();
    
    // Fill contact form on mobile
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.fill(selectors.contactMessage, 'Test message from mobile');
    
    // Submit form
    await page.click(selectors.sendMessageButton);
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should handle responsive project cards', async ({ page }) => {
    // Test mobile project cards
    await helpers.setMobileViewport();
    await helpers.navigateToQuickBuilds();
    
    // Check that project cards are properly sized
    const projectCards = await page.locator(selectors.projectCard).all();
    for (const card of projectCards) {
      const cardBox = await card.boundingBox();
      expect(cardBox.width).toBeGreaterThan(300); // Should be wide enough
      expect(cardBox.height).toBeGreaterThan(200); // Should be tall enough
    }
    
    // Test clicking on project cards
    await page.click('text=Bird House');
    await helpers.expectCurrentURL('/quick-builds/bird-house');
  });

  test('should handle responsive images', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Check that images scale properly
    const images = await page.locator('img').all();
    for (const img of images) {
      const imgBox = await img.boundingBox();
      expect(imgBox.width).toBeLessThan(400); // Should not be too wide on mobile
      expect(imgBox.height).toBeGreaterThan(0); // Should have height
    }
  });

  test('should handle responsive text sizing', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Check that text is readable on mobile
    const headings = await page.locator('h1, h2, h3').all();
    for (const heading of headings) {
      const headingBox = await heading.boundingBox();
      const fontSize = await heading.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      // Font size should be reasonable for mobile
      const fontSizeNum = parseInt(fontSize);
      expect(fontSizeNum).toBeGreaterThan(12);
      expect(fontSizeNum).toBeLessThan(48);
    }
  });

  test('should handle responsive buttons', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Check that buttons are properly sized for touch
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const buttonBox = await button.boundingBox();
      expect(buttonBox.width).toBeGreaterThan(44); // Minimum touch target size
      expect(buttonBox.height).toBeGreaterThan(44); // Minimum touch target size
    }
  });

  test('should handle responsive tables', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToQuickBuilds();
    
    // Check that tables are responsive if they exist
    const tables = await page.locator('table').all();
    for (const table of tables) {
      if (await table.isVisible()) {
        const tableBox = await table.boundingBox();
        expect(tableBox.width).toBeLessThan(400); // Should fit on mobile
      }
    }
  });

  test('should handle responsive modals', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Test modal functionality if it exists
    const modalTrigger = page.locator('[data-testid="modal-trigger"], .modal-trigger');
    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();
      
      const modal = page.locator('[data-testid="modal"], .modal');
      if (await modal.isVisible()) {
        await expect(modal).toBeVisible();
        
        // Check that modal is properly sized for mobile
        const modalBox = await modal.boundingBox();
        expect(modalBox.width).toBeLessThan(400);
        
        // Test modal close
        const closeButton = modal.locator('[data-testid="modal-close"], .modal-close');
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await expect(modal).not.toBeVisible();
        }
      }
    }
  });

  test('should handle responsive dropdowns', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToPlanner();
    
    // Test dropdown functionality on mobile
    await page.click(selectors.spaceTypeSelect);
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    await helpers.expectFormFieldValue(selectors.spaceTypeSelect, 'room');
    
    await page.click(selectors.projectTypeSelect);
    await page.selectOption(selectors.projectTypeSelect, 'shelf');
    await helpers.expectFormFieldValue(selectors.projectTypeSelect, 'shelf');
  });

  test('should handle responsive scrolling', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Test scrolling behavior
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Check that footer is accessible
    await helpers.expectTextContent('Contact');
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    // Check that hero section is visible
    await helpers.expectTextContent('Transform Any Space');
  });

  test('should handle responsive touch interactions', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Test touch interactions (simulated with mouse)
    await page.click('text=Quick Builds');
    await helpers.expectCurrentURL('/quick-builds');
    
    // Test swipe-like behavior if implemented
    const swipeableElement = page.locator('[data-testid="swipeable"], .swipeable');
    if (await swipeableElement.isVisible()) {
      // Simulate swipe
      await swipeableElement.hover();
      await page.mouse.down();
      await page.mouse.move(100, 0);
      await page.mouse.up();
    }
  });

  test('should handle responsive keyboard navigation', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Test keyboard navigation on mobile
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Navigate through focusable elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const newFocusedElement = page.locator(':focus');
    await expect(newFocusedElement).toBeVisible();
  });

  test('should handle responsive loading states', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToPlanner();
    
    // Fill form and submit
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
    
    await page.click(selectors.generatePlanButton);
    
    // Check for loading state
    const loadingElement = page.locator(selectors.loadingSpinner);
    if (await loadingElement.isVisible()) {
      await helpers.expectLoadingState();
      await helpers.expectNoLoadingState();
    }
    
    // Check that results are properly displayed on mobile
    await helpers.expectTextContent('Your Custom Build Plan');
  });

  test('should handle responsive error states', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToContact();
    
    // Submit form without filling required fields
    await page.click(selectors.sendMessageButton);
    
    // Check that error messages are properly displayed on mobile
    await helpers.expectValidationError('required');
    
    // Check that error messages are readable
    const errorElements = await page.locator(selectors.validationError).all();
    for (const error of errorElements) {
      const errorBox = await error.boundingBox();
      expect(errorBox.width).toBeGreaterThan(0);
      expect(errorBox.height).toBeGreaterThan(0);
    }
  });

  test('should handle responsive success states', async ({ page }) => {
    await helpers.setMobileViewport();
    await helpers.navigateToContact();
    
    // Fill and submit form
    await helpers.fillContactForm({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message'
    });
    await page.click(selectors.sendMessageButton);
    
    // Check that success message is properly displayed on mobile
    await helpers.expectSuccessMessage('Message sent');
    
    // Check that success message is readable
    const successElement = page.locator('text=Message sent');
    const successBox = await successElement.boundingBox();
    expect(successBox.width).toBeGreaterThan(0);
    expect(successBox.height).toBeGreaterThan(0);
  });

  test('should handle responsive viewport changes', async ({ page }) => {
    // Start with mobile viewport
    await helpers.setMobileViewport();
    await helpers.navigateToHome();
    
    // Change to tablet viewport
    await helpers.setTabletViewport();
    await page.waitForTimeout(1000);
    
    // Check that layout adapts
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
    
    // Change to desktop viewport
    await helpers.setDesktopViewport();
    await page.waitForTimeout(1000);
    
    // Check that layout adapts again
    await helpers.expectElementCount(selectors.quickBuildCard, 6);
  });

  test('should handle responsive orientation changes', async ({ page }) => {
    // Test landscape orientation
    await page.setViewportSize({ width: 667, height: 375 }); // Mobile landscape
    await helpers.navigateToHome();
    
    // Check that content is properly displayed
    await helpers.expectTextContent('Transform Any Space');
    
    // Test portrait orientation
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile portrait
    await page.waitForTimeout(1000);
    
    // Check that content is still properly displayed
    await helpers.expectTextContent('Transform Any Space');
  });

  test('should handle responsive performance', async ({ page }) => {
    await helpers.setMobileViewport();
    
    // Test page load performance on mobile
    const startTime = Date.now();
    await helpers.navigateToHome();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds on mobile
    
    // Test navigation performance
    const navStartTime = Date.now();
    await page.click('text=Quick Builds');
    await page.waitForLoadState('networkidle');
    const navTime = Date.now() - navStartTime;
    
    expect(navTime).toBeLessThan(3000); // Should navigate within 3 seconds
  });
});
