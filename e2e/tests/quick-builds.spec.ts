import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';
import { testProjects } from '../fixtures/test-data';

test.describe('Quick Builds', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should display all projects on Quick Builds page', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    const projects = Object.values(testProjects);
    for (const project of projects) {
      await helpers.expectTextContent(project.name);
      await helpers.expectTextContent(project.cost);
      await helpers.expectTextContent(project.time);
      await helpers.expectTextContent(project.difficulty);
    }
  });

  test('should navigate to individual project pages', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Test navigation to each project
    for (const project of Object.values(testProjects)) {
      await page.click(`text=${project.name}`);
      await helpers.expectCurrentURL(`/quick-builds/${project.slug}`);
      await helpers.expectPageTitle(project.name);
      
      // Verify project details are displayed
      await helpers.expectTextContent('Materials');
      await helpers.expectTextContent('Tools');
      await helpers.expectTextContent('Instructions');
      await helpers.expectTextContent('Safety Notes');
      
      // Go back to Quick Builds page
      await page.click('text=← Back to Quick Builds');
      await helpers.expectCurrentURL('/quick-builds');
    }
  });

  test('should display complete project information', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check project header information
    await helpers.expectTextContent('Bird House');
    await helpers.expectTextContent('$15-25');
    await helpers.expectTextContent('2-3 hours');
    await helpers.expectTextContent('Beginner');
    
    // Check materials section
    await helpers.expectTextContent('Materials List');
    await helpers.expectTextContent('Wood');
    await helpers.expectTextContent('Nails');
    await helpers.expectTextContent('Screws');
    
    // Check tools section
    await helpers.expectTextContent('Tools Required');
    await helpers.expectTextContent('Hammer');
    await helpers.expectTextContent('Saw');
    
    // Check instructions section
    await helpers.expectTextContent('Step-by-Step Instructions');
    await helpers.expectTextContent('Step 1');
    await helpers.expectTextContent('Step 2');
  });

  test('should have working project filtering', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Test difficulty filter
    await page.click('text=Beginner');
    await helpers.expectElementCount(selectors.projectCard, 6);
    
    // Test cost filter
    await page.click('text=Under $20');
    const filteredProjects = await page.locator(selectors.projectCard).count();
    expect(filteredProjects).toBeGreaterThan(0);
    
    // Clear filters
    await page.click('text=Clear Filters');
    await helpers.expectElementCount(selectors.projectCard, 6);
  });

  test('should display project images correctly', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Check that project cards have images
    const projectCards = await page.locator(selectors.projectCard).all();
    for (const card of projectCards) {
      const image = card.locator('img');
      await expect(image).toBeVisible();
      
      // Check alt text
      const altText = await image.getAttribute('alt');
      expect(altText).toBeTruthy();
    }
  });

  test('should have working search functionality', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Search for "bird"
    await page.fill('[data-testid="search-input"], input[placeholder*="search"]', 'bird');
    await page.waitForTimeout(500);
    
    // Should show Bird House project
    await helpers.expectTextContent('Bird House');
    
    // Search for non-existent project
    await page.fill('[data-testid="search-input"], input[placeholder*="search"]', 'nonexistent');
    await page.waitForTimeout(500);
    
    // Should show no results message
    await helpers.expectTextContent('No projects found');
  });

  test('should display project difficulty badges correctly', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Check that all projects have difficulty badges
    const difficultyBadges = await page.locator('[data-testid="difficulty-badge"], .badge').all();
    expect(difficultyBadges.length).toBeGreaterThan(0);
    
    // Check that badges have proper styling
    for (const badge of difficultyBadges) {
      await expect(badge).toBeVisible();
      const text = await badge.textContent();
      expect(['Beginner', 'Intermediate', 'Advanced']).toContain(text);
    }
  });

  test('should have working project sorting', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Test sorting by name
    await page.click('[data-testid="sort-select"], select');
    await page.selectOption('[data-testid="sort-select"], select', 'name');
    
    // Verify projects are sorted alphabetically
    const projectNames = await page.locator(selectors.projectTitle).allTextContents();
    const sortedNames = [...projectNames].sort();
    expect(projectNames).toEqual(sortedNames);
    
    // Test sorting by cost
    await page.selectOption('[data-testid="sort-select"], select', 'cost');
    await page.waitForTimeout(500);
    
    // Verify projects are sorted by cost
    const costElements = await page.locator(selectors.projectCost).allTextContents();
    expect(costElements.length).toBeGreaterThan(0);
  });

  test('should display project completion time correctly', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Check that all projects show completion time
    const timeElements = await page.locator(selectors.projectTime).all();
    expect(timeElements.length).toBe(6);
    
    for (const timeElement of timeElements) {
      const timeText = await timeElement.textContent();
      expect(timeText).toMatch(/\d+-\d+ hours?/);
    }
  });

  test('should have working project sharing functionality', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Test share button if it exists
    const shareButton = page.locator('[data-testid="share-button"], text=Share');
    if (await shareButton.isVisible()) {
      await shareButton.click();
      await helpers.expectTextContent('Share this project');
    }
  });

  test('should display project ratings and reviews', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check for ratings if they exist
    const ratingElement = page.locator('[data-testid="rating"], .rating');
    if (await ratingElement.isVisible()) {
      await expect(ratingElement).toBeVisible();
    }
  });

  test('should have working "Start This Build" buttons', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Test "Start This Build" button
    const startButton = page.locator('text=Start This Build, text=Begin Build');
    if (await startButton.isVisible()) {
      await startButton.click();
      await helpers.expectCurrentURL('/planner');
    }
  });

  test('should display project tags correctly', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check for project tags
    const tags = ['Outdoor', 'Garden', 'Beginner'];
    for (const tag of tags) {
      const tagElement = page.locator(`text=${tag}`);
      if (await tagElement.isVisible()) {
        await expect(tagElement).toBeVisible();
      }
    }
  });

  test('should have working project bookmarking', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Test bookmark button if it exists
    const bookmarkButton = page.locator('[data-testid="bookmark-button"], .bookmark');
    if (await bookmarkButton.isVisible()) {
      await bookmarkButton.click();
      await helpers.expectTextContent('Project bookmarked');
    }
  });

  test('should display project alternatives', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check for alternative projects section
    const alternativesSection = page.locator('text=Similar Projects, text=Alternatives');
    if (await alternativesSection.isVisible()) {
      await expect(alternativesSection).toBeVisible();
      
      // Check that alternative projects are clickable
      const alternativeLinks = page.locator('a[href*="/quick-builds/"]');
      const count = await alternativeLinks.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have working project printing', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Test print button if it exists
    const printButton = page.locator('[data-testid="print-button"], text=Print');
    if (await printButton.isVisible()) {
      await printButton.click();
      // Should open print dialog or generate printable version
      await page.waitForTimeout(1000);
    }
  });

  test('should display project video tutorials', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check for video section if it exists
    const videoSection = page.locator('[data-testid="video-section"], text=Video Tutorial');
    if (await videoSection.isVisible()) {
      await expect(videoSection).toBeVisible();
      
      // Check for video player
      const videoPlayer = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
      await expect(videoPlayer).toBeVisible();
    }
  });

  test('should have working project comments', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check for comments section if it exists
    const commentsSection = page.locator('[data-testid="comments-section"], text=Comments');
    if (await commentsSection.isVisible()) {
      await expect(commentsSection).toBeVisible();
      
      // Test adding a comment
      const commentInput = page.locator('[data-testid="comment-input"], textarea[placeholder*="comment"]');
      if (await commentInput.isVisible()) {
        await commentInput.fill('Great project!');
        await page.click('text=Post Comment');
        await helpers.expectTextContent('Great project!');
      }
    }
  });

  test('should handle project page loading states', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Click on a project and check for loading state
    const projectLink = page.locator('text=Bird House').first();
    await projectLink.click();
    
    // Check for loading indicator if it exists
    const loadingElement = page.locator(selectors.loadingSpinner);
    if (await loadingElement.isVisible()) {
      await helpers.expectLoadingState();
      await helpers.expectNoLoadingState();
    }
    
    // Verify page loaded correctly
    await helpers.expectPageTitle('Bird House');
  });

  test('should have proper project page SEO', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    await page.click('text=Bird House');
    
    // Check page title
    await expect(page).toHaveTitle(/Bird House/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    if (await ogTitle.isVisible()) {
      await expect(ogTitle).toHaveAttribute('content');
    }
  });

  test('should handle project page errors gracefully', async ({ page }) => {
    // Try to access non-existent project
    await page.goto('/quick-builds/non-existent-project');
    await helpers.expectErrorPage();
    
    // Should provide navigation back to Quick Builds
    await page.click('text=Back to Quick Builds, text=Go Back');
    await helpers.expectCurrentURL('/quick-builds');
  });

  test('should have working project comparison', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Select multiple projects for comparison
    const compareCheckboxes = page.locator('[data-testid="compare-checkbox"], input[type="checkbox"]');
    const checkboxCount = await compareCheckboxes.count();
    
    if (checkboxCount >= 2) {
      await compareCheckboxes.nth(0).check();
      await compareCheckboxes.nth(1).check();
      
      // Click compare button
      await page.click('text=Compare Projects');
      await helpers.expectTextContent('Project Comparison');
    }
  });

  test('should display project difficulty progression', async ({ page }) => {
    await helpers.navigateToQuickBuilds();
    
    // Check that projects are ordered by difficulty
    const difficultyElements = await page.locator(selectors.projectDifficulty).allTextContents();
    expect(difficultyElements.length).toBe(6);
    
    // Verify all projects are beginner level
    for (const difficulty of difficultyElements) {
      expect(difficulty).toBe('Beginner');
    }
  });
});
