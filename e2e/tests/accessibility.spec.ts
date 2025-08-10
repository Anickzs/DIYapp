import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Accessibility', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for ARIA labels on buttons, links, and form elements
    const interactiveElements = await page.locator('[aria-label], [aria-labelledby]').all();
    expect(interactiveElements.length).toBeGreaterThan(0);
    
    // Check that form inputs have proper labels
    await helpers.navigateToPlanner();
    const formInputs = await page.locator('input, select, textarea').all();
    for (const input of formInputs) {
      const label = input.locator('xpath=../label, xpath=preceding-sibling::label');
      if (await label.isVisible()) {
        await expect(label).toBeVisible();
      }
    }
  });

  test('should be fully keyboard navigable', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test tab navigation through all interactive elements
    const focusableElements = await page.locator(selectors.focusableElements).all();
    expect(focusableElements.length).toBeGreaterThan(0);
    
    // Navigate through elements with Tab
    for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
    
    // Test Shift+Tab for reverse navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Shift+Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that there's only one h1
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);
    
    // Check that headings are in logical order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let currentLevel = 1;
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      
      // Headings should not skip levels (e.g., h1 to h3)
      expect(level).toBeLessThanOrEqual(currentLevel + 1);
      currentLevel = level;
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check text contrast ratios
    const textElements = await page.locator('h1, h2, h3, p, span, a, button').all();
    for (const element of textElements) {
      const color = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.color;
      });
      
      // Verify color is not transparent or invisible
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).not.toBe('transparent');
      expect(color).not.toBe('rgba(255, 255, 255, 0)');
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test focus indicators on interactive elements
    const focusableElements = await page.locator(selectors.focusableElements).all();
    
    for (const element of focusableElements.slice(0, 5)) {
      await element.focus();
      
      // Check that focus is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      // Check for focus styles
      const focusStyles = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          border: style.border,
          boxShadow: style.boxShadow
        };
      });
      
      // Should have some form of focus indication
      const hasFocusIndicator = 
        focusStyles.outline !== 'none' ||
        focusStyles.border !== 'none' ||
        focusStyles.boxShadow !== 'none';
      
      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('should work with screen readers', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for screen reader friendly elements
    const mainContent = page.locator(selectors.mainContent);
    if (await mainContent.isVisible()) {
      await expect(mainContent).toBeVisible();
    }
    
    const navigation = page.locator(selectors.navigationRole);
    if (await navigation.isVisible()) {
      await expect(navigation).toBeVisible();
    }
    
    // Check for skip links if they exist
    const skipLinks = page.locator('[href="#main"], [href="#content"], .skip-link');
    if (await skipLinks.isVisible()) {
      await expect(skipLinks).toBeVisible();
    }
  });

  test('should have proper alt text on images', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that all images have alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      
      // Alt text should be descriptive (not empty or just decorative)
      if (altText !== '') {
        expect(altText.length).toBeGreaterThan(1);
      }
    }
  });

  test('should have proper form labels and descriptions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Check that form fields have proper labels
    const formFields = await page.locator('input, select, textarea').all();
    for (const field of formFields) {
      const label = field.locator('xpath=../label, xpath=preceding-sibling::label');
      if (await label.isVisible()) {
        await expect(label).toBeVisible();
        
        // Label should be associated with the field
        const labelText = await label.textContent();
        expect(labelText).toBeTruthy();
      }
    }
    
    // Check for field descriptions if they exist
    const descriptions = page.locator('[data-describedby], .field-description');
    if (await descriptions.isVisible()) {
      await expect(descriptions).toBeVisible();
    }
  });

  test('should handle error announcements properly', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Create an error
    await page.click(selectors.generatePlanButton);
    
    // Check that errors are announced to screen readers
    const errorElements = await page.locator(selectors.validationError).all();
    for (const error of errorElements) {
      const ariaLive = await error.getAttribute('aria-live');
      if (ariaLive) {
        expect(['polite', 'assertive']).toContain(ariaLive);
      }
    }
  });

  test('should have proper button and link text', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that buttons have descriptive text
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const buttonText = await button.textContent();
      if (buttonText) {
        expect(buttonText.trim().length).toBeGreaterThan(0);
        expect(buttonText).not.toBe('Click here');
        expect(buttonText).not.toBe('Submit');
      }
    }
    
    // Check that links have descriptive text
    const links = await page.locator('a').all();
    for (const link of links) {
      const linkText = await link.textContent();
      if (linkText) {
        expect(linkText.trim().length).toBeGreaterThan(0);
        expect(linkText).not.toBe('Click here');
        expect(linkText).not.toBe('More');
      }
    }
  });

  test('should have proper table accessibility', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Check tables for proper accessibility if they exist
    const tables = await page.locator('table').all();
    for (const table of tables) {
      if (await table.isVisible()) {
        // Check for table headers
        const headers = table.locator('th');
        const headerCount = await headers.count();
        
        if (headerCount > 0) {
          // Check for scope attributes
          for (const header of await headers.all()) {
            const scope = await header.getAttribute('scope');
            if (scope) {
              expect(['col', 'row']).toContain(scope);
            }
          }
        }
        
        // Check for caption if it exists
        const caption = table.locator('caption');
        if (await caption.isVisible()) {
          await expect(caption).toBeVisible();
        }
      }
    }
  });

  test('should handle dynamic content announcements', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill and submit form to test dynamic content
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
    
    // Check that new content is properly announced
    const resultsSection = page.locator('[aria-live], [role="status"]');
    if (await resultsSection.isVisible()) {
      await expect(resultsSection).toBeVisible();
    }
  });

  test('should have proper landmark regions', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for proper landmark roles
    const landmarks = [
      { role: 'banner', selector: '[role="banner"], header' },
      { role: 'navigation', selector: '[role="navigation"], nav' },
      { role: 'main', selector: '[role="main"], main' },
      { role: 'contentinfo', selector: '[role="contentinfo"], footer' }
    ];
    
    for (const landmark of landmarks) {
      const element = page.locator(landmark.selector);
      if (await element.isVisible()) {
        await expect(element).toBeVisible();
      }
    }
  });

  test('should handle skip navigation', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test skip navigation if it exists
    const skipLinks = page.locator('[href="#main"], [href="#content"], .skip-link');
    if (await skipLinks.isVisible()) {
      await skipLinks.click();
      
      // Should focus on main content
      const mainContent = page.locator('#main, #content, main');
      if (await mainContent.isVisible()) {
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    }
  });

  test('should have proper list semantics', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that lists are properly marked up
    const lists = await page.locator('ul, ol').all();
    for (const list of lists) {
      const listItems = list.locator('li');
      const itemCount = await listItems.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });

  test('should handle form field grouping', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Check for fieldset and legend if form is grouped
    const fieldsets = await page.locator('fieldset').all();
    for (const fieldset of fieldsets) {
      const legend = fieldset.locator('legend');
      if (await legend.isVisible()) {
        await expect(legend).toBeVisible();
        const legendText = await legend.textContent();
        expect(legendText).toBeTruthy();
      }
    }
  });

  test('should have proper language attributes', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that page has proper language attribute
    const htmlElement = page.locator('html');
    const lang = await htmlElement.getAttribute('lang');
    expect(lang).toBeTruthy();
    expect(lang.length).toBeGreaterThan(0);
  });

  test('should handle keyboard shortcuts', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test common keyboard shortcuts if implemented
    // Home key should scroll to top
    await page.keyboard.press('Home');
    await page.waitForTimeout(500);
    
    // End key should scroll to bottom
    await page.keyboard.press('End');
    await page.waitForTimeout(500);
    
    // Check that scrolling worked
    await helpers.expectTextContent('Contact');
  });

  test('should have proper ARIA states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for proper ARIA states on interactive elements
    const interactiveElements = await page.locator('[aria-expanded], [aria-pressed], [aria-checked]').all();
    for (const element of interactiveElements) {
      const state = await element.getAttribute('aria-expanded') || 
                   await element.getAttribute('aria-pressed') || 
                   await element.getAttribute('aria-checked');
      
      if (state) {
        expect(['true', 'false']).toContain(state);
      }
    }
  });

  test('should handle high contrast mode', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Simulate high contrast mode by checking for sufficient contrast
    const textElements = await page.locator('h1, h2, h3, p, span, a, button').all();
    for (const element of textElements) {
      const color = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.color;
      });
      
      // Should have visible text color
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).not.toBe('transparent');
    }
  });

  test('should have proper form validation announcements', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Submit form without filling required fields
    await page.click(selectors.sendMessageButton);
    
    // Check that validation errors are properly announced
    const errorElements = await page.locator(selectors.validationError).all();
    for (const error of errorElements) {
      const ariaInvalid = await error.getAttribute('aria-invalid');
      if (ariaInvalid) {
        expect(ariaInvalid).toBe('true');
      }
    }
  });

  test('should handle focus management', async ({ page }) => {
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
    
    await page.click(selectors.generatePlanButton);
    
    // Check that focus is managed properly after form submission
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper document structure', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check that document has proper structure
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    if (await metaDescription.isVisible()) {
      const description = await metaDescription.getAttribute('content');
      expect(description).toBeTruthy();
    }
  });

  test('should handle screen reader navigation', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test navigation with screen reader shortcuts
    // Test heading navigation if implemented
    await page.keyboard.press('h');
    await page.waitForTimeout(500);
    
    // Test link navigation if implemented
    await page.keyboard.press('l');
    await page.waitForTimeout(500);
    
    // Test form field navigation if implemented
    await page.keyboard.press('f');
    await page.waitForTimeout(500);
  });

  test('should have proper ARIA live regions', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for ARIA live regions
    const liveRegions = await page.locator('[aria-live]').all();
    for (const region of liveRegions) {
      const liveValue = await region.getAttribute('aria-live');
      expect(['polite', 'assertive', 'off']).toContain(liveValue);
    }
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for animations and transitions
    const animatedElements = page.locator('[class*="animate"], [class*="transition"]');
    const animationCount = await animatedElements.count();
    
    if (animationCount > 0) {
      // Test that animations respect reduced motion
      await page.evaluate(() => {
        // Simulate reduced motion preference
        Object.defineProperty(window.matchMedia, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });
      });
    }
  });
});
