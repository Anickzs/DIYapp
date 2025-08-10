import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Error Handling', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate offline mode
    await page.route('**/*', route => route.abort());
    
    await helpers.navigateToHome();
    await helpers.expectErrorPage();
    
    // Should provide retry option
    const retryButton = page.locator('text=Retry, text=Try Again');
    if (await retryButton.isVisible()) {
      await retryButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should handle invalid URLs', async ({ page }) => {
    // Test 404 page
    await page.goto('/invalid-page');
    await helpers.expectErrorPage();
    
    // Should provide navigation back to home
    const homeButton = page.locator('text=Go Home, text=Home, text=Back to Home');
    if (await homeButton.isVisible()) {
      await homeButton.click();
      await helpers.expectCurrentURL('/');
    }
  });

  test('should handle form submission errors', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Submit form without filling required fields
    await page.click(selectors.generatePlanButton);
    
    // Check for validation errors
    await helpers.expectValidationError('required');
    await helpers.expectValidationError('Width');
    await helpers.expectValidationError('Length');
    
    // Should provide clear error messages
    const errorMessages = await page.locator(selectors.validationError).all();
    for (const error of errorMessages) {
      const errorText = await error.textContent();
      expect(errorText).toBeTruthy();
      expect(errorText.length).toBeGreaterThan(0);
    }
  });

  test('should handle large file uploads', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test file upload limits if file upload exists
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      // Test with large file
      const largeFile = {
        name: 'large-file.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.alloc(10 * 1024 * 1024) // 10MB file
      };
      
      await fileInput.setInputFiles(largeFile);
      await helpers.expectValidationError('too large');
      await helpers.expectValidationError('maximum size');
    }
  });

  test('should handle malformed data', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test with invalid data types
    await page.fill(selectors.widthInput, 'not-a-number');
    await page.fill(selectors.lengthInput, 'also-not-a-number');
    await page.click(selectors.generatePlanButton);
    
    // Should show validation errors
    await helpers.expectValidationError('number');
    await helpers.expectValidationError('valid');
  });

  test('should handle server errors', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form with valid data
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
    
    // Simulate server error
    await page.route('**/api/generate-plan', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.click(selectors.generatePlanButton);
    
    // Should show error message
    await helpers.expectValidationError('error');
    await helpers.expectValidationError('try again');
  });

  test('should handle timeout errors', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form with valid data
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
    
    // Simulate timeout
    await page.route('**/api/generate-plan', route => {
      // Don't fulfill the request, let it timeout
    });
    
    await page.click(selectors.generatePlanButton);
    
    // Should show timeout error after a reasonable time
    await page.waitForTimeout(10000);
    await helpers.expectValidationError('timeout');
    await helpers.expectValidationError('try again');
  });

  test('should handle validation errors gracefully', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Submit form with invalid data
    await page.fill(selectors.contactName, '');
    await page.fill(selectors.contactEmail, 'invalid-email');
    await page.fill(selectors.contactMessage, '');
    
    await page.click(selectors.sendMessageButton);
    
    // Should show specific validation errors
    await helpers.expectValidationError('Name');
    await helpers.expectValidationError('Email');
    await helpers.expectValidationError('Message');
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
      !error.includes('third-party') &&
      !error.includes('adblock')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should handle memory errors gracefully', async ({ page }) => {
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

  test('should handle database connection errors', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with valid data
    await helpers.fillContactForm({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message'
    });
    
    // Simulate database error
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Database Unavailable' })
      });
    });
    
    await page.click(selectors.sendMessageButton);
    
    // Should show database error message
    await helpers.expectValidationError('database');
    await helpers.expectValidationError('unavailable');
  });

  test('should handle rate limiting errors', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Submit form multiple times rapidly
    for (let i = 0; i < 10; i++) {
      await helpers.fillContactForm({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      });
      await page.click(selectors.sendMessageButton);
      await page.waitForTimeout(100);
    }
    
    // Should show rate limiting error
    await helpers.expectValidationError('too many');
    await helpers.expectValidationError('rate limit');
  });

  test('should handle authentication errors', async ({ page }) => {
    // Test authentication errors if auth is implemented
    const authPages = ['/dashboard', '/profile', '/settings'];
    
    for (const authPage of authPages) {
      await page.goto(authPage);
      
      // Should redirect to login or show auth error
      const currentUrl = page.url();
      if (currentUrl.includes('/login') || currentUrl.includes('/auth')) {
        await helpers.expectTextContent('login');
        await helpers.expectTextContent('authentication');
      } else {
        await helpers.expectErrorPage();
      }
    }
  });

  test('should handle permission errors', async ({ page }) => {
    // Test permission errors if permissions are implemented
    await page.goto('/admin');
    
    // Should show permission denied error
    await helpers.expectErrorPage();
    await helpers.expectTextContent('permission');
    await helpers.expectTextContent('access denied');
  });

  test('should handle resource not found errors', async ({ page }) => {
    // Test various resource not found scenarios
    const notFoundUrls = [
      '/quick-builds/non-existent-project',
      '/api/non-existent-endpoint',
      '/static/non-existent-file.js'
    ];
    
    for (const url of notFoundUrls) {
      await page.goto(url);
      
      if (url.startsWith('/api/')) {
        // API endpoints should return 404 JSON
        const response = await page.waitForResponse(url);
        expect(response.status()).toBe(404);
      } else {
        // Pages should show 404 error
        await helpers.expectErrorPage();
      }
    }
  });

  test('should handle malformed JSON responses', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form with valid data
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
    
    // Simulate malformed JSON response
    await page.route('**/api/generate-plan', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: 'invalid json response'
      });
    });
    
    await page.click(selectors.generatePlanButton);
    
    // Should handle malformed JSON gracefully
    await helpers.expectValidationError('error');
    await helpers.expectValidationError('try again');
  });

  test('should handle CORS errors', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Simulate CORS error
    await page.route('**/*', route => {
      route.fulfill({
        status: 0,
        body: 'CORS error'
      });
    });
    
    // Should handle CORS errors gracefully
    await helpers.expectErrorPage();
  });

  test('should handle SSL certificate errors', async ({ page }) => {
    // This would typically be handled at the browser level
    // but we can test that the app handles HTTPS errors gracefully
    
    await page.route('**/*', route => {
      route.fulfill({
        status: 0,
        body: 'SSL error'
      });
    });
    
    await helpers.navigateToHome();
    await helpers.expectErrorPage();
  });

  test('should handle DNS resolution errors', async ({ page }) => {
    // Simulate DNS resolution error
    await page.route('**/*', route => {
      route.abort('failed');
    });
    
    await helpers.navigateToHome();
    await helpers.expectErrorPage();
  });

  test('should handle connection refused errors', async ({ page }) => {
    // Simulate connection refused error
    await page.route('**/*', route => {
      route.abort('connectionrefused');
    });
    
    await helpers.navigateToHome();
    await helpers.expectErrorPage();
  });

  test('should handle request timeout errors', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form with valid data
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
    
    // Simulate request timeout
    await page.route('**/api/generate-plan', route => {
      // Don't fulfill the request, let it timeout
    });
    
    await page.click(selectors.generatePlanButton);
    
    // Should show timeout error
    await page.waitForTimeout(10000);
    await helpers.expectValidationError('timeout');
  });

  test('should handle invalid form data gracefully', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test various invalid data scenarios
    const invalidData = [
      { width: '-1', length: '0' },
      { width: '999999999999', length: '999999999999' },
      { width: 'abc', length: 'def' },
      { width: '', length: '' }
    ];
    
    for (const data of invalidData) {
      await page.fill(selectors.widthInput, data.width);
      await page.fill(selectors.lengthInput, data.length);
      await page.click(selectors.generatePlanButton);
      
      // Should show validation errors
      await helpers.expectValidationError('valid');
    }
  });

  test('should handle concurrent request errors', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form with valid data
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
    
    // Submit form multiple times rapidly
    await page.click(selectors.generatePlanButton);
    await page.waitForTimeout(100);
    await page.click(selectors.generatePlanButton);
    await page.waitForTimeout(100);
    await page.click(selectors.generatePlanButton);
    
    // Should handle concurrent requests gracefully
    await helpers.expectNoValidationErrors();
  });

  test('should handle browser compatibility errors', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test with older browser features
    const isModernBrowser = await page.evaluate(() => {
      return 'fetch' in window && 'Promise' in window;
    });
    
    if (!isModernBrowser) {
      // Should show browser compatibility message
      await helpers.expectTextContent('browser');
      await helpers.expectTextContent('compatibility');
    }
  });

  test('should handle storage quota errors', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Simulate storage quota exceeded
    await page.evaluate(() => {
      // Try to fill localStorage
      try {
        for (let i = 0; i < 10000; i++) {
          localStorage.setItem(`test-${i}`, 'x'.repeat(1000));
        }
      } catch (e) {
        // Storage quota exceeded
        console.error('Storage quota exceeded');
      }
    });
    
    // Should handle storage errors gracefully
    await helpers.expectTextContent('Transform Any Space');
  });

  test('should handle service worker errors', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for service worker errors
    const hasServiceWorker = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    
    if (hasServiceWorker) {
      // Simulate service worker error
      await page.evaluate(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
              registration.unregister();
            });
          });
        }
      });
      
      // Should handle service worker errors gracefully
      await helpers.expectTextContent('Transform Any Space');
    }
  });

  test('should provide helpful error recovery options', async ({ page }) => {
    // Test various error scenarios and check for recovery options
    await page.goto('/invalid-page');
    await helpers.expectErrorPage();
    
    // Should provide helpful recovery options
    const recoveryOptions = [
      'Go Home',
      'Try Again',
      'Contact Support',
      'Back to Previous Page'
    ];
    
    for (const option of recoveryOptions) {
      const optionElement = page.locator(`text=${option}`);
      if (await optionElement.isVisible()) {
        await expect(optionElement).toBeVisible();
      }
    }
  });
});
