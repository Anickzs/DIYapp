import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

test.describe('Visual Regression', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should match homepage screenshot', async ({ page }) => {
    await helpers.navigateToHome();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png');
  });

  test('should match all page layouts', async ({ page }) => {
    const pages = [
      { path: '/quick-builds', name: 'quick-builds' },
      { path: '/planner', name: 'planner' },
      { path: '/help', name: 'help' },
      { path: '/contact', name: 'contact' },
      { path: '/safety', name: 'safety' },
      { path: '/privacy', name: 'privacy' },
      { path: '/terms', name: 'terms' },
      { path: '/disclaimer', name: 'disclaimer' },
      { path: '/demo', name: 'demo' }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${pageInfo.name}.png`);
    }
  });

  test('should match responsive layouts', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Desktop
    await helpers.setDesktopViewport();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-desktop.png');
    
    // Tablet
    await helpers.setTabletViewport();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-tablet.png');
    
    // Mobile
    await helpers.setMobileViewport();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });

  test('should match form states', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Empty form
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('planner-empty.png');
    
    // Filled form
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
    await expect(page).toHaveScreenshot('planner-filled.png');
    
    // Form with errors
    await page.fill(selectors.widthInput, '0');
    await page.click(selectors.generatePlanButton);
    await expect(page).toHaveScreenshot('planner-errors.png');
  });

  test('should match project detail pages', async ({ page }) => {
    const projects = [
      { slug: 'bird-house', name: 'bird-house' },
      { slug: 'outdoor-bench', name: 'outdoor-bench' },
      { slug: 'wooden-toy-car', name: 'wooden-toy-car' },
      { slug: 'floating-shelf', name: 'floating-shelf' },
      { slug: 'planter-box', name: 'planter-box' },
      { slug: 'coat-rack', name: 'coat-rack' }
    ];

    for (const project of projects) {
      await page.goto(`/quick-builds/${project.slug}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${project.name}-detail.png`);
    }
  });

  test('should match build plan results', async ({ page }) => {
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
    await helpers.expectTextContent('Your Custom Build Plan');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('build-plan-results.png');
  });

  test('should match contact form states', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Empty form
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('contact-empty.png');
    
    // Filled form
    await helpers.fillContactForm({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message for visual regression testing.'
    });
    await expect(page).toHaveScreenshot('contact-filled.png');
    
    // Form with errors
    await page.fill(selectors.contactName, '');
    await page.fill(selectors.contactEmail, 'invalid-email');
    await page.fill(selectors.contactMessage, '');
    await page.click(selectors.sendMessageButton);
    await expect(page).toHaveScreenshot('contact-errors.png');
  });

  test('should match navigation states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Default navigation
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('navigation-default.png');
    
    // Mobile navigation open
    await helpers.setMobileViewport();
    const mobileMenuButton = page.locator(selectors.mobileMenuButton);
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('navigation-mobile-open.png');
    }
  });

  test('should match loading states', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Fill form
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
    
    // Submit form and capture loading state
    await page.click(selectors.generatePlanButton);
    
    // Check for loading indicator
    const loadingElement = page.locator(selectors.loadingSpinner);
    if (await loadingElement.isVisible()) {
      await expect(page).toHaveScreenshot('loading-state.png');
    }
  });

  test('should match error states', async ({ page }) => {
    // Test 404 page
    await page.goto('/invalid-page');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('error-404.png');
    
    // Test form validation errors
    await helpers.navigateToPlanner();
    await page.click(selectors.generatePlanButton);
    await expect(page).toHaveScreenshot('form-validation-errors.png');
  });

  test('should match success states', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill and submit form
    await helpers.fillContactForm({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message'
    });
    
    await page.click(selectors.sendMessageButton);
    await helpers.expectSuccessMessage('Message sent');
    await expect(page).toHaveScreenshot('success-state.png');
  });

  test('should match different viewport orientations', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Landscape orientation
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-landscape.png');
    
    // Portrait orientation
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-portrait.png');
  });

  test('should match different color schemes', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Light mode (default)
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-light.png');
    
    // Dark mode (if implemented)
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('homepage-dark.png');
  });

  test('should match focus states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Focus on first interactive element
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    if (await focusedElement.isVisible()) {
      await expect(page).toHaveScreenshot('focus-state.png');
    }
  });

  test('should match hover states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Hover over navigation links
    const navLinks = page.locator('nav a, nav button');
    const firstLink = navLinks.first();
    if (await firstLink.isVisible()) {
      await firstLink.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('hover-state.png');
    }
  });

  test('should match modal states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Test modal if it exists
    const modalTrigger = page.locator('[data-testid="modal-trigger"], .modal-trigger');
    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();
      
      const modal = page.locator('[data-testid="modal"], .modal');
      if (await modal.isVisible()) {
        await expect(page).toHaveScreenshot('modal-open.png');
        
        // Close modal
        const closeButton = modal.locator('[data-testid="modal-close"], .modal-close');
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await page.waitForTimeout(500);
          await expect(page).toHaveScreenshot('modal-closed.png');
        }
      }
    }
  });

  test('should match dropdown states', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Open dropdown
    await page.click(selectors.spaceTypeSelect);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('dropdown-open.png');
    
    // Select option
    await page.selectOption(selectors.spaceTypeSelect, 'room');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('dropdown-selected.png');
  });

  test('should match tooltip states', async ({ page }) => {
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
        await expect(page).toHaveScreenshot('tooltip-visible.png');
      }
    }
  });

  test('should match animation states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for animations
    const animatedElements = page.locator('[class*="animate"], [class*="transition"]');
    const animationCount = await animatedElements.count();
    
    if (animationCount > 0) {
      // Capture initial state
      await expect(page).toHaveScreenshot('animation-initial.png');
      
      // Trigger animation
      await page.evaluate(() => {
        const elements = document.querySelectorAll('[class*="animate"], [class*="transition"]');
        elements.forEach(el => {
          el.classList.add('animate');
        });
      });
      
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot('animation-triggered.png');
    }
  });

  test('should match scroll states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Top of page
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('scroll-top.png');
    
    // Middle of page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('scroll-middle.png');
    
    // Bottom of page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('scroll-bottom.png');
  });

  test('should match different content states', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Default state
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('quick-builds-default.png');
    
    // Filtered state
    await page.click('text=Beginner');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('quick-builds-filtered.png');
    
    // Search state
    const searchInput = page.locator('[data-testid="search-input"], input[placeholder*="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('bird');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('quick-builds-search.png');
    }
  });

  test('should match different data states', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test different form combinations
    const formCombinations = [
      {
        name: 'small-project',
        data: {
          spaceType: 'room',
          width: '2',
          length: '3',
          projectType: 'shelf',
          projectSize: 'small',
          style: 'minimal',
          skillLevel: 'beginner',
          budget: 'budget'
        }
      },
      {
        name: 'large-project',
        data: {
          spaceType: 'room',
          width: '10',
          length: '15',
          projectType: 'shelf',
          projectSize: 'large',
          style: 'luxury',
          skillLevel: 'expert',
          budget: 'premium'
        }
      }
    ];

    for (const combination of formCombinations) {
      await helpers.fillBuildPlannerForm(combination.data);
      await expect(page).toHaveScreenshot(`planner-${combination.name}.png`);
    }
  });

  test('should match accessibility states', async ({ page }) => {
    await helpers.navigateToHome();
    
    // High contrast mode simulation
    await page.evaluate(() => {
      document.documentElement.style.filter = 'contrast(200%)';
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('accessibility-high-contrast.png');
    
    // Reset contrast
    await page.evaluate(() => {
      document.documentElement.style.filter = '';
    });
  });

  test('should match print styles', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Simulate print media
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = '@media print { body { background: white !important; } }';
      document.head.appendChild(style);
    });
    
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('print-style.png');
  });

  test('should match different font sizes', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Large font size
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '20px';
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('large-font.png');
    
    // Reset font size
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '';
    });
  });

  test('should match different zoom levels', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Zoom in
    await page.evaluate(() => {
      document.body.style.zoom = '1.5';
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('zoom-150.png');
    
    // Zoom out
    await page.evaluate(() => {
      document.body.style.zoom = '0.75';
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('zoom-75.png');
    
    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '';
    });
  });
});
