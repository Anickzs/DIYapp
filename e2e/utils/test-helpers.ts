import { Page, expect } from '@playwright/test';
import { selectors } from './selectors';

export class TestHelpers {
  constructor(private page: Page) {}

  // Navigation helpers
  async navigateToHome() {
    await this.page.goto('/');
  }

  async navigateToQuickBuilds() {
    await this.page.goto('/quick-builds');
  }

  async navigateToPlanner() {
    await this.page.goto('/planner');
  }

  async navigateToContact() {
    await this.page.goto('/contact');
  }

  async navigateToHelp() {
    await this.page.goto('/help');
  }

  async navigateToSafety() {
    await this.page.goto('/safety');
  }

  async navigateToPrivacy() {
    await this.page.goto('/privacy');
  }

  async navigateToTerms() {
    await this.page.goto('/terms');
  }

  async navigateToDisclaimer() {
    await this.page.goto('/disclaimer');
  }

  async navigateToDemo() {
    await this.page.goto('/demo');
  }

  // Form helpers
  async fillBuildPlannerForm(formData: any) {
    if (formData.spaceType) {
      await this.page.selectOption(selectors.spaceTypeSelect, formData.spaceType);
    }
    if (formData.width) {
      await this.page.fill(selectors.widthInput, formData.width);
    }
    if (formData.length) {
      await this.page.fill(selectors.lengthInput, formData.length);
    }
    if (formData.projectType) {
      await this.page.selectOption(selectors.projectTypeSelect, formData.projectType);
    }
    if (formData.projectSize) {
      await this.page.selectOption(selectors.projectSizeSelect, formData.projectSize);
    }
    if (formData.style) {
      await this.page.selectOption(selectors.styleSelect, formData.style);
    }
    if (formData.skillLevel) {
      await this.page.selectOption(selectors.skillLevelSelect, formData.skillLevel);
    }
    if (formData.budget) {
      await this.page.selectOption(selectors.budgetSelect, formData.budget);
    }
  }

  async fillContactForm(contactData: any) {
    if (contactData.name) {
      await this.page.fill(selectors.contactName, contactData.name);
    }
    if (contactData.email) {
      await this.page.fill(selectors.contactEmail, contactData.email);
    }
    if (contactData.message) {
      await this.page.fill(selectors.contactMessage, contactData.message);
    }
  }

  // Validation helpers
  async expectValidationError(message: string) {
    await expect(this.page.locator(selectors.validationError)).toContainText(message);
  }

  async expectNoValidationErrors() {
    await expect(this.page.locator(selectors.validationError)).toHaveCount(0);
  }

  // Content helpers
  async expectPageTitle(title: string) {
    await expect(this.page.locator('h1')).toContainText(title);
  }

  async expectElementVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectElementNotVisible(selector: string) {
    await expect(this.page.locator(selector)).not.toBeVisible();
  }

  async expectElementCount(selector: string, count: number) {
    await expect(this.page.locator(selector)).toHaveCount(count);
  }

  // URL helpers
  async expectCurrentURL(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async expectURLContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  // Performance helpers
  async measurePageLoadTime(): Promise<number> {
    const startTime = Date.now();
    await this.page.waitForLoadState('networkidle');
    return Date.now() - startTime;
  }

  async expectPageLoadsWithin(ms: number) {
    const loadTime = await this.measurePageLoadTime();
    expect(loadTime).toBeLessThan(ms);
  }

  // Accessibility helpers
  async expectAriaLabel(element: string) {
    await expect(this.page.locator(element)).toHaveAttribute('aria-label');
  }

  async expectRole(element: string, role: string) {
    await expect(this.page.locator(element)).toHaveAttribute('role', role);
  }

  // Mobile helpers
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  // Screenshot helpers
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `e2e/screenshots/${name}.png` });
  }

  // Wait helpers
  async waitForElement(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  // Click helpers
  async clickAndWaitForNavigation(selector: string) {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(selector)
    ]);
  }

  // Form submission helpers
  async submitFormAndWait(selector: string) {
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/api/') || response.status() === 200),
      this.page.click(selector)
    ]);
  }

  // Error handling helpers
  async expectErrorPage() {
    await expect(this.page.locator('text=Something went wrong, text=Error, text=Page not found')).toBeVisible();
  }

  // Network helpers
  async simulateOffline() {
    await this.page.route('**/*', route => route.abort());
  }

  async simulateSlowNetwork() {
    await this.page.route('**/*', route => {
      route.continue();
    });
    // Add artificial delay
    await this.page.waitForTimeout(2000);
  }

  // Keyboard navigation helpers
  async tabThroughElements() {
    const focusableElements = await this.page.locator(selectors.focusableElements).count();
    for (let i = 0; i < Math.min(focusableElements, 10); i++) {
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(100);
    }
  }

  // File upload helpers
  async uploadFile(selector: string, filePath: string) {
    await this.page.setInputFiles(selector, filePath);
  }

  // Download helpers
  async waitForDownload() {
    const downloadPromise = this.page.waitForEvent('download');
    return downloadPromise;
  }

  // Content verification helpers
  async expectTextContent(text: string) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
  }

  async expectNoTextContent(text: string) {
    await expect(this.page.locator(`text=${text}`)).not.toBeVisible();
  }

  // Link verification helpers
  async expectExternalLink(selector: string) {
    await expect(this.page.locator(selector)).toHaveAttribute('target', '_blank');
  }

  async expectAmazonLink(selector: string) {
    await expect(this.page.locator(selector)).toHaveAttribute('href', /amazon/);
  }

  // Form state helpers
  async expectFormFieldValue(selector: string, value: string) {
    await expect(this.page.locator(selector)).toHaveValue(value);
  }

  async expectFormFieldEmpty(selector: string) {
    await expect(this.page.locator(selector)).toHaveValue('');
  }

  // Loading state helpers
  async expectLoadingState() {
    await expect(this.page.locator(selectors.loadingSpinner)).toBeVisible();
  }

  async expectNoLoadingState() {
    await expect(this.page.locator(selectors.loadingSpinner)).not.toBeVisible();
  }

  // Success message helpers
  async expectSuccessMessage(message: string) {
    await expect(this.page.locator(`text=${message}`)).toBeVisible();
  }
}
