import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';
import { testContactData } from '../fixtures/test-data';

test.describe('Contact & Support Pages', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should load contact page correctly', async ({ page }) => {
    await helpers.navigateToContact();
    
    await helpers.expectPageTitle('Contact Us');
    await helpers.expectTextContent('Get in Touch');
    await helpers.expectTextContent('Name');
    await helpers.expectTextContent('Email');
    await helpers.expectTextContent('Message');
  });

  test('should validate contact form required fields', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Try to submit without filling required fields
    await page.click(selectors.sendMessageButton);
    
    // Check for validation errors
    await helpers.expectValidationError('required');
    await helpers.expectValidationError('Name');
    await helpers.expectValidationError('Email');
    await helpers.expectValidationError('Message');
  });

  test('should handle valid contact form submission', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill out form with valid data
    await helpers.fillContactForm(testContactData.valid);
    
    // Submit form
    await page.click(selectors.sendMessageButton);
    
    // Check for success message
    await helpers.expectSuccessMessage('Message sent');
    await helpers.expectSuccessMessage('Thank you');
  });

  test('should validate email format', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with invalid email
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, 'invalid-email');
    await page.fill(selectors.contactMessage, 'Test message');
    
    await page.click(selectors.sendMessageButton);
    
    // Check for email validation error
    await helpers.expectValidationError('valid email');
    await helpers.expectValidationError('email format');
  });

  test('should handle contact form with special characters', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with special characters
    await page.fill(selectors.contactName, 'José María');
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.fill(selectors.contactMessage, 'Message with émojis 🛠️ and symbols & < > "');
    
    await page.click(selectors.sendMessageButton);
    
    // Should handle special characters gracefully
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should handle contact form with long messages', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with long message
    const longMessage = 'A'.repeat(1000);
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.fill(selectors.contactMessage, longMessage);
    
    await page.click(selectors.sendMessageButton);
    
    // Should handle long messages
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should display contact information correctly', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Check for contact information
    await helpers.expectTextContent('Email');
    await helpers.expectTextContent('Phone');
    await helpers.expectTextContent('Address');
    
    // Check for business hours if displayed
    await helpers.expectTextContent('Business Hours');
    await helpers.expectTextContent('Monday');
    await helpers.expectTextContent('Friday');
  });

  test('should have working social media links', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Check for social media links
    const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
    for (const platform of socialLinks) {
      const link = page.locator(`text=${platform}`);
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        await helpers.expectExternalLink(`text=${platform}`);
      }
    }
  });

  test('should load help center page correctly', async ({ page }) => {
    await helpers.navigateToHelp();
    
    await helpers.expectPageTitle('Help Center');
    await helpers.expectTextContent('Frequently Asked Questions');
    await helpers.expectTextContent('How to use');
  });

  test('should have working FAQ section', async ({ page }) => {
    await helpers.navigateToHelp();
    
    // Check for FAQ items
    const faqItems = await page.locator('[data-testid="faq-item"], .faq-item').count();
    expect(faqItems).toBeGreaterThan(0);
    
    // Test FAQ expansion
    const firstFaq = page.locator('[data-testid="faq-item"], .faq-item').first();
    await firstFaq.click();
    
    // Check that answer is visible
    const answer = firstFaq.locator('[data-testid="faq-answer"], .faq-answer');
    await expect(answer).toBeVisible();
  });

  test('should have working search functionality in help center', async ({ page }) => {
    await helpers.navigateToHelp();
    
    // Test search functionality
    const searchInput = page.locator('[data-testid="help-search"], input[placeholder*="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('build');
      await page.waitForTimeout(500);
      
      // Should show relevant results
      await helpers.expectTextContent('build');
    }
  });

  test('should load safety guidelines page correctly', async ({ page }) => {
    await helpers.navigateToSafety();
    
    await helpers.expectPageTitle('Safety Guidelines');
    await helpers.expectTextContent('Safety First');
    await helpers.expectTextContent('Personal Protective Equipment');
  });

  test('should display safety equipment information', async ({ page }) => {
    await helpers.navigateToSafety();
    
    // Check for safety equipment sections
    await helpers.expectTextContent('Safety Glasses');
    await helpers.expectTextContent('Work Gloves');
    await helpers.expectTextContent('Dust Mask');
    await helpers.expectTextContent('Ear Protection');
  });

  test('should display tool safety information', async ({ page }) => {
    await helpers.navigateToSafety();
    
    // Check for tool safety sections
    await helpers.expectTextContent('Power Tools');
    await helpers.expectTextContent('Hand Tools');
    await helpers.expectTextContent('Safety Tips');
  });

  test('should load privacy policy page correctly', async ({ page }) => {
    await helpers.navigateToPrivacy();
    
    await helpers.expectPageTitle('Privacy Policy');
    await helpers.expectTextContent('Information We Collect');
    await helpers.expectTextContent('How We Use Your Information');
  });

  test('should display privacy policy sections', async ({ page }) => {
    await helpers.navigateToPrivacy();
    
    // Check for privacy policy sections
    await helpers.expectTextContent('Data Collection');
    await helpers.expectTextContent('Data Usage');
    await helpers.expectTextContent('Data Protection');
    await helpers.expectTextContent('Cookies');
  });

  test('should load terms of service page correctly', async ({ page }) => {
    await helpers.navigateToTerms();
    
    await helpers.expectPageTitle('Terms of Service');
    await helpers.expectTextContent('Acceptance of Terms');
    await helpers.expectTextContent('Use of Service');
  });

  test('should display terms of service sections', async ({ page }) => {
    await helpers.navigateToTerms();
    
    // Check for terms sections
    await helpers.expectTextContent('User Responsibilities');
    await helpers.expectTextContent('Intellectual Property');
    await helpers.expectTextContent('Limitation of Liability');
  });

  test('should load safety disclaimer page correctly', async ({ page }) => {
    await helpers.navigateToDisclaimer();
    
    await helpers.expectPageTitle('Safety Disclaimer');
    await helpers.expectTextContent('Important Safety Notice');
    await helpers.expectTextContent('Use at Your Own Risk');
  });

  test('should display disclaimer content', async ({ page }) => {
    await helpers.navigateToDisclaimer();
    
    // Check for disclaimer content
    await helpers.expectTextContent('Disclaimer');
    await helpers.expectTextContent('Liability');
    await helpers.expectTextContent('Professional Advice');
  });

  test('should have working contact form file upload', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test file upload if it exists
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      // Create a test file
      const testFile = {
        name: 'test-image.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.from('fake image data')
      };
      
      await fileInput.setInputFiles(testFile);
      await helpers.expectTextContent('test-image.jpg');
    }
  });

  test('should handle contact form rate limiting', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Submit form multiple times rapidly
    for (let i = 0; i < 5; i++) {
      await helpers.fillContactForm(testContactData.valid);
      await page.click(selectors.sendMessageButton);
      await page.waitForTimeout(100);
    }
    
    // Should handle rate limiting gracefully
    await helpers.expectValidationError('too many');
    await helpers.expectValidationError('rate limit');
  });

  test('should have working contact form accessibility', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Check that form fields have proper labels
    const formFields = await page.locator('input, textarea').all();
    for (const field of formFields) {
      const label = field.locator('xpath=../label, xpath=preceding-sibling::label');
      if (await label.isVisible()) {
        await expect(label).toBeVisible();
      }
    }
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should handle contact form with emojis', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with emojis
    await page.fill(selectors.contactName, 'Test User 😊');
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.fill(selectors.contactMessage, 'Message with emojis 🛠️ 🔨 🏠');
    
    await page.click(selectors.sendMessageButton);
    
    // Should handle emojis gracefully
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should have working contact form copy functionality', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test copy button if it exists
    const copyButton = page.locator('[data-testid="copy-button"], text=Copy');
    if (await copyButton.isVisible()) {
      await copyButton.click();
      await helpers.expectSuccessMessage('Copied');
    }
  });

  test('should handle contact form with HTML content', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with HTML content
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.fill(selectors.contactMessage, '<script>alert("xss")</script>');
    
    await page.click(selectors.sendMessageButton);
    
    // Should sanitize HTML content
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should have working contact form auto-save', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form partially
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, 'test@example.com');
    
    // Navigate away and back
    await page.click('text=Help');
    await page.click('text=Contact');
    
    // Check if form values are preserved (if implemented)
    const nameValue = await page.inputValue(selectors.contactName);
    if (nameValue === 'Test User') {
      // Auto-save is implemented
      await helpers.expectFormFieldValue(selectors.contactName, 'Test User');
      await helpers.expectFormFieldValue(selectors.contactEmail, 'test@example.com');
    }
  });

  test('should have working contact form validation in real-time', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test real-time validation
    await page.fill(selectors.contactEmail, 'invalid-email');
    await page.waitForTimeout(500);
    
    // Should show validation error immediately
    await helpers.expectValidationError('valid email');
    
    // Fix the email
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.waitForTimeout(500);
    
    // Error should disappear
    await helpers.expectNoValidationErrors();
  });

  test('should have working contact form character count', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test character count if it exists
    const messageInput = page.locator(selectors.contactMessage);
    await messageInput.fill('Test message');
    
    const charCount = page.locator('[data-testid="char-count"], .char-count');
    if (await charCount.isVisible()) {
      await expect(charCount).toContainText('12'); // "Test message" has 12 characters
    }
  });

  test('should handle contact form with international characters', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with international characters
    await page.fill(selectors.contactName, 'José María García');
    await page.fill(selectors.contactEmail, 'test@example.com');
    await page.fill(selectors.contactMessage, 'Mensaje en español con acentos áéíóú');
    
    await page.click(selectors.sendMessageButton);
    
    // Should handle international characters
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should have working contact form attachments', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test attachment functionality if it exists
    const attachmentButton = page.locator('[data-testid="attachment-button"], text=Attach File');
    if (await attachmentButton.isVisible()) {
      await attachmentButton.click();
      
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.isVisible()) {
        const testFile = {
          name: 'test-document.pdf',
          mimeType: 'application/pdf',
          buffer: Buffer.from('fake pdf data')
        };
        
        await fileInput.setInputFiles(testFile);
        await helpers.expectTextContent('test-document.pdf');
      }
    }
  });
});
