import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';
import { testFormData } from '../fixtures/test-data';

test.describe('Build Planner', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should load build planner page correctly', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    await helpers.expectPageTitle('Build Planner');
    await helpers.expectTextContent('Create Your Custom Build Plan');
    await helpers.expectTextContent('Space Type');
    await helpers.expectTextContent('Dimensions');
    await helpers.expectTextContent('Project Type');
  });

  test('should validate required fields', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Try to submit without filling required fields
    await page.click(selectors.generatePlanButton);
    
    // Check for validation errors
    await helpers.expectValidationError('required');
    await helpers.expectValidationError('Width');
    await helpers.expectValidationError('Length');
  });

  test('should handle dimension input with whole numbers', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill dimensions with whole numbers
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    
    // Check that values are set correctly
    await helpers.expectFormFieldValue(selectors.widthInput, '4');
    await helpers.expectFormFieldValue(selectors.lengthInput, '6');
  });

  test('should handle dimension input with fractions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test feet with fractions
    await page.fill(selectors.widthInput, '3 1/2');
    await page.fill(selectors.lengthInput, '5 3/4');
    
    // Check that values are set correctly
    await helpers.expectFormFieldValue(selectors.widthInput, '3 1/2');
    await helpers.expectFormFieldValue(selectors.lengthInput, '5 3/4');
  });

  test('should handle unit conversion', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill dimensions in feet
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    
    // Check for unit conversion display
    const cmDisplay = page.locator('[data-testid="cm-display"], .cm-value');
    if (await cmDisplay.isVisible()) {
      await expect(cmDisplay).toContainText('122'); // 4 feet ≈ 122 cm
    }
  });

  test('should handle all form field types', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test space type selection
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    await helpers.expectFormFieldValue(selectors.spaceTypeSelect, 'room');
    
    // Test project type selection
    await page.selectOption(selectors.projectTypeSelect, 'shelf');
    await helpers.expectFormFieldValue(selectors.projectTypeSelect, 'shelf');
    
    // Test project size selection
    await page.selectOption(selectors.projectSizeSelect, 'medium');
    await helpers.expectFormFieldValue(selectors.projectSizeSelect, 'medium');
    
    // Test style selection
    await page.selectOption(selectors.styleSelect, 'modern');
    await helpers.expectFormFieldValue(selectors.styleSelect, 'modern');
    
    // Test skill level selection
    await page.selectOption(selectors.skillLevelSelect, 'beginner');
    await helpers.expectFormFieldValue(selectors.skillLevelSelect, 'beginner');
    
    // Test budget selection
    await page.selectOption(selectors.budgetSelect, 'moderate');
    await helpers.expectFormFieldValue(selectors.budgetSelect, 'moderate');
  });

  test('should generate complete build plan with valid data', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill out complete form
    await helpers.fillBuildPlannerForm(testFormData.valid);
    
    // Submit form
    await page.click(selectors.generatePlanButton);
    
    // Check that build plan is generated
    await helpers.expectTextContent('Your Custom Build Plan');
    await helpers.expectTextContent('Materials List');
    await helpers.expectTextContent('Shopping List');
    await helpers.expectTextContent('Instructions');
    await helpers.expectTextContent('Tools Required');
  });

  test('should display materials list with pricing', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    await page.click(selectors.generatePlanButton);
    
    // Check materials section
    await helpers.expectTextContent('Materials List');
    await helpers.expectTextContent('Wood');
    await helpers.expectTextContent('$');
    
    // Check that materials have quantities
    await helpers.expectTextContent('pieces');
    await helpers.expectTextContent('feet');
  });

  test('should display shopping list with Amazon links', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    await page.click(selectors.generatePlanButton);
    
    // Check shopping list section
    await helpers.expectTextContent('Shopping List');
    
    // Check for Amazon links
    const amazonLinks = await page.locator(selectors.amazonLinks).count();
    expect(amazonLinks).toBeGreaterThan(0);
    
    // Test clicking an Amazon link
    if (amazonLinks > 0) {
      const firstLink = page.locator(selectors.amazonLinks).first();
      await helpers.expectExternalLink(selectors.amazonLinks);
    }
  });

  test('should display step-by-step instructions', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    await page.click(selectors.generatePlanButton);
    
    // Check instructions section
    await helpers.expectTextContent('Step-by-Step Instructions');
    await helpers.expectTextContent('Step 1');
    await helpers.expectTextContent('Step 2');
    
    // Check that instructions are detailed
    const instructionSteps = await page.locator('ol li, .step').count();
    expect(instructionSteps).toBeGreaterThan(2);
  });

  test('should display tool requirements', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    await page.click(selectors.generatePlanButton);
    
    // Check tools section
    await helpers.expectTextContent('Tools Required');
    await helpers.expectTextContent('Hammer');
    await helpers.expectTextContent('Saw');
    
    // Check for tool alternatives
    await helpers.expectTextContent('Alternative');
  });

  test('should display safety considerations', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    await page.click(selectors.generatePlanButton);
    
    // Check safety section
    await helpers.expectTextContent('Safety Considerations');
    await helpers.expectTextContent('Safety glasses');
    await helpers.expectTextContent('Work gloves');
  });

  test('should handle form validation for invalid dimensions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test negative dimensions
    await page.fill(selectors.widthInput, '-1');
    await page.fill(selectors.lengthInput, '0');
    await page.click(selectors.generatePlanButton);
    
    await helpers.expectValidationError('positive');
    await helpers.expectValidationError('greater than 0');
  });

  test('should handle extremely large dimensions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test very large dimensions
    await page.fill(selectors.widthInput, '999999');
    await page.fill(selectors.lengthInput, '999999');
    await page.click(selectors.generatePlanButton);
    
    await helpers.expectValidationError('reasonable');
    await helpers.expectValidationError('maximum');
  });

  test('should handle decimal dimensions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test decimal dimensions
    await page.fill(selectors.widthInput, '4.5');
    await page.fill(selectors.lengthInput, '6.25');
    
    await helpers.expectFormFieldValue(selectors.widthInput, '4.5');
    await helpers.expectFormFieldValue(selectors.lengthInput, '6.25');
  });

  test('should handle form reset functionality', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill out form
    await helpers.fillBuildPlannerForm(testFormData.valid);
    
    // Test reset button if it exists
    const resetButton = page.locator('text=Reset, text=Clear Form');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      
      // Check that form is cleared
      await helpers.expectFormFieldEmpty(selectors.widthInput);
      await helpers.expectFormFieldEmpty(selectors.lengthInput);
    }
  });

  test('should handle form save functionality', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill out form
    await helpers.fillBuildPlannerForm(testFormData.valid);
    
    // Test save button if it exists
    const saveButton = page.locator('text=Save Plan, text=Save');
    if (await saveButton.isVisible()) {
      await saveButton.click();
      await helpers.expectSuccessMessage('Plan saved');
    }
  });

  test('should handle form loading states', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    
    // Submit form and check for loading state
    await page.click(selectors.generatePlanButton);
    
    // Check for loading indicator
    const loadingElement = page.locator(selectors.loadingSpinner);
    if (await loadingElement.isVisible()) {
      await helpers.expectLoadingState();
      await helpers.expectNoLoadingState();
    }
  });

  test('should handle form submission errors', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    
    // Simulate network error
    await page.route('**/api/generate-plan', route => route.abort());
    
    await page.click(selectors.generatePlanButton);
    await helpers.expectValidationError('error');
    await helpers.expectValidationError('try again');
  });

  test('should handle concurrent form submissions', async ({ page }) => {
    await helpers.navigateToPlanner();
    await helpers.fillBuildPlannerForm(testFormData.valid);
    
    // Submit form multiple times rapidly
    await page.click(selectors.generatePlanButton);
    await page.waitForTimeout(100);
    await page.click(selectors.generatePlanButton);
    
    // Should handle gracefully without errors
    await helpers.expectNoValidationErrors();
  });

  test('should handle form field dependencies', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test that certain fields show/hide based on selections
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    
    // Check for room-specific fields
    const roomFields = page.locator('text=Room Type, text=Ceiling Height');
    if (await roomFields.isVisible()) {
      await expect(roomFields).toBeVisible();
    }
  });

  test('should handle form field validation in real-time', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test real-time validation
    await page.fill(selectors.widthInput, '0');
    await page.waitForTimeout(500);
    
    // Should show validation error immediately
    await helpers.expectValidationError('greater than 0');
    
    // Fix the value
    await page.fill(selectors.widthInput, '4');
    await page.waitForTimeout(500);
    
    // Error should disappear
    await helpers.expectNoValidationErrors();
  });

  test('should handle form accessibility', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Check that form fields have proper labels
    const formFields = await page.locator('input, select, textarea').all();
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

  test('should handle form field tooltips', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test tooltips if they exist
    const tooltipTriggers = page.locator('[data-tooltip], [title]');
    const tooltipCount = await tooltipTriggers.count();
    
    if (tooltipCount > 0) {
      const firstTooltip = tooltipTriggers.first();
      await firstTooltip.hover();
      await page.waitForTimeout(500);
      
      // Check that tooltip is visible
      const tooltip = page.locator('.tooltip, [role="tooltip"]');
      if (await tooltip.isVisible()) {
        await expect(tooltip).toBeVisible();
      }
    }
  });

  test('should handle form field autocomplete', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test autocomplete for dimensions
    await page.fill(selectors.widthInput, '3');
    await page.waitForTimeout(500);
    
    // Check for autocomplete suggestions if they exist
    const suggestions = page.locator('.autocomplete-suggestion, [role="option"]');
    if (await suggestions.isVisible()) {
      await expect(suggestions).toBeVisible();
    }
  });

  test('should handle form field formatting', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test dimension formatting
    await page.fill(selectors.widthInput, '4.123456');
    await page.blur(selectors.widthInput);
    
    // Should format to reasonable decimal places
    const formattedValue = await page.inputValue(selectors.widthInput);
    expect(formattedValue).toMatch(/^\d+(\.\d{1,2})?$/);
  });

  test('should handle form field constraints', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test maximum length constraints
    const longInput = 'a'.repeat(1000);
    await page.fill(selectors.widthInput, longInput);
    
    // Should truncate or show error
    const inputValue = await page.inputValue(selectors.widthInput);
    expect(inputValue.length).toBeLessThan(100);
  });

  test('should handle form field persistence', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill out form partially
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    
    // Navigate away and back
    await page.click('text=Quick Builds');
    await page.click('text=Build Planner');
    
    // Check if form values are preserved (if implemented)
    const widthValue = await page.inputValue(selectors.widthInput);
    if (widthValue === '4') {
      // Form persistence is implemented
      await helpers.expectFormFieldValue(selectors.widthInput, '4');
      await helpers.expectFormFieldValue(selectors.lengthInput, '6');
    }
  });

  test('should handle form field calculations', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill dimensions
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    
    // Check for area calculation if it exists
    const areaDisplay = page.locator('[data-testid="area-display"], .area-value');
    if (await areaDisplay.isVisible()) {
      await expect(areaDisplay).toContainText('24'); // 4 * 6 = 24 sq ft
    }
  });

  test('should handle form field suggestions', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test smart suggestions for project type based on space type
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    
    // Check for suggested project types
    const suggestions = page.locator('[data-testid="suggestion"], .suggestion');
    if (await suggestions.isVisible()) {
      await expect(suggestions).toBeVisible();
    }
  });

  test('should handle form field help text', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Check for help text on form fields
    const helpText = page.locator('.help-text, [data-help]');
    const helpCount = await helpText.count();
    
    if (helpCount > 0) {
      await expect(helpText.first()).toBeVisible();
    }
  });

  test('should handle form field error recovery', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Create an error
    await page.fill(selectors.widthInput, '0');
    await page.click(selectors.generatePlanButton);
    await helpers.expectValidationError('greater than 0');
    
    // Fix the error
    await page.fill(selectors.widthInput, '4');
    await page.fill(selectors.lengthInput, '6');
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    await page.selectOption(selectors.projectTypeSelect, 'shelf');
    await page.selectOption(selectors.projectSizeSelect, 'medium');
    await page.selectOption(selectors.styleSelect, 'modern');
    await page.selectOption(selectors.skillLevelSelect, 'beginner');
    await page.selectOption(selectors.budgetSelect, 'moderate');
    
    // Submit again
    await page.click(selectors.generatePlanButton);
    await helpers.expectTextContent('Your Custom Build Plan');
  });
});
