// Common selectors used across e2e tests
export const selectors = {
  // Navigation
  logo: '[data-testid="logo"], a[href="/"]',
  navigation: 'nav',
  mobileMenu: '[data-testid="mobile-menu"]',
  mobileMenuButton: '[data-testid="mobile-menu-button"]',
  
  // Homepage
  heroTitle: 'h1',
  startBuildingButton: 'text=Start Your Build Plan, text=Start Building',
  seeDemoButton: 'text=See Demo',
  quickBuildsSection: 'text=Quick Builds',
  quickBuildCard: '[data-testid="quick-build-card"]',
  
  // Quick Builds
  projectCard: '[data-testid="project-card"]',
  projectTitle: '[data-testid="project-title"]',
  projectCost: '[data-testid="project-cost"]',
  projectTime: '[data-testid="project-time"]',
  projectDifficulty: '[data-testid="project-difficulty"]',
  
  // Build Planner
  spaceTypeSelect: '[data-testid="space-type"], select[name="spaceType"]',
  widthInput: '[data-testid="width-input"], input[name="width"]',
  lengthInput: '[data-testid="length-input"], input[name="length"]',
  projectTypeSelect: '[data-testid="project-type"], select[name="projectType"]',
  projectSizeSelect: '[data-testid="project-size"], select[name="projectSize"]',
  styleSelect: '[data-testid="style"], select[name="style"]',
  skillLevelSelect: '[data-testid="skill-level"], select[name="skillLevel"]',
  budgetSelect: '[data-testid="budget"], select[name="budget"]',
  generatePlanButton: 'text=Generate Plan, button[type="submit"]',
  
  // Build Plan Results
  buildPlanTitle: 'text=Your Custom Build Plan, text=Build Plan',
  materialsList: 'text=Materials List, text=Materials',
  shoppingList: 'text=Shopping List',
  instructions: 'text=Instructions, text=Step-by-Step',
  toolsRequired: 'text=Tools Required, text=Tools',
  
  // Contact Form
  contactName: '[data-testid="contact-name"], input[name="name"]',
  contactEmail: '[data-testid="contact-email"], input[name="email"]',
  contactMessage: '[data-testid="contact-message"], textarea[name="message"]',
  sendMessageButton: 'text=Send Message, button[type="submit"]',
  
  // Error Messages
  validationError: '[data-testid="validation-error"], .error, .text-red-500',
  requiredFieldError: 'text=is required, text=required',
  
  // Loading States
  loadingSpinner: '[data-testid="loading"], .loading, .spinner',
  
  // PDF Download
  downloadPDFButton: 'text=Download PDF, text=Download Instructions',
  
  // User Account (when implemented)
  loginEmail: '[data-testid="login-email"], input[name="email"]',
  loginPassword: '[data-testid="login-password"], input[name="password"]',
  loginButton: 'text=Login, button[type="submit"]',
  registerButton: 'text=Register, button[type="submit"]',
  
  // Accessibility
  mainContent: '[role="main"], main',
  navigationRole: '[role="navigation"], nav',
  buttonRole: '[role="button"]',
  
  // Links
  amazonLinks: 'a[href*="amazon"]',
  externalLinks: 'a[target="_blank"]',
  
  // Forms
  formInputs: 'input, select, textarea',
  submitButtons: 'button[type="submit"]',
  
  // Content
  headings: 'h1, h2, h3, h4, h5, h6',
  paragraphs: 'p',
  lists: 'ul, ol',
  images: 'img',
  
  // Interactive Elements
  buttons: 'button',
  links: 'a',
  focusableElements: 'button, a, input, select, textarea, [tabindex]'
};
