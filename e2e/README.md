# 🧪 E2E Testing Suite for At Home DIY

This directory contains comprehensive end-to-end tests for the At Home DIY application using Playwright.

## 📋 Test Coverage

### Core User Journeys
- ✅ **Navigation** - All page navigation and routing
- ✅ **Homepage** - Landing page functionality and content
- ✅ **Quick Builds** - Project browsing and selection
- ✅ **Build Planner** - Complex form interactions and plan generation
- ✅ **Contact & Support** - Form submissions and support pages
- ✅ **Responsive Design** - Mobile, tablet, and desktop layouts
- ✅ **Performance** - Load times and optimization
- ✅ **Accessibility** - WCAG 2.1 AA compliance
- ✅ **Error Handling** - Graceful error recovery
- ✅ **Security** - Vulnerability prevention
- ✅ **Visual Regression** - UI consistency across changes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Playwright browsers installed

### Installation
```bash
# Install dependencies (if not already done)
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

#### All Tests
```bash
npm run test:e2e
```

#### Specific Test Categories
```bash
# Navigation tests only
npx playwright test navigation.spec.ts

# Build planner tests only
npx playwright test build-planner.spec.ts

# Accessibility tests only
npx playwright test accessibility.spec.ts
```

#### Interactive Mode
```bash
# Run with UI for debugging
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
```

#### View Reports
```bash
npm run test:e2e:report
```

## 📁 Test Structure

```
e2e/
├── tests/                    # Test files
│   ├── navigation.spec.ts    # Navigation and routing tests
│   ├── homepage.spec.ts      # Homepage functionality tests
│   ├── quick-builds.spec.ts  # Quick builds system tests
│   ├── build-planner.spec.ts # Build planner form tests
│   ├── contact.spec.ts       # Contact and support tests
│   ├── responsive.spec.ts    # Responsive design tests
│   ├── performance.spec.ts   # Performance benchmarks
│   ├── accessibility.spec.ts # Accessibility compliance
│   ├── error-handling.spec.ts # Error handling tests
│   ├── security.spec.ts      # Security vulnerability tests
│   └── visual.spec.ts        # Visual regression tests
├── utils/                    # Test utilities
│   ├── test-helpers.ts       # Common test helper functions
│   └── selectors.ts          # Common CSS selectors
├── fixtures/                 # Test data
│   └── test-data.ts          # Test data and fixtures
└── README.md                 # This file
```

## 🛠️ Test Utilities

### TestHelpers Class
Provides common helper functions for:
- Navigation between pages
- Form filling and validation
- Element assertions
- Performance measurements
- Accessibility checks

### Selectors
Centralized CSS selectors for consistent element targeting across tests.

### Test Data
Reusable test data for forms, projects, and user interactions.

## 🎯 Test Categories

### 1. Navigation Tests (`navigation.spec.ts`)
- Page routing and navigation
- URL handling and redirects
- Browser back/forward functionality
- Active navigation states

### 2. Homepage Tests (`homepage.spec.ts`)
- Hero section functionality
- Quick builds showcase
- CTA button interactions
- Content loading and display

### 3. Quick Builds Tests (`quick-builds.spec.ts`)
- Project listing and filtering
- Individual project pages
- Project information display
- Search and sorting functionality

### 4. Build Planner Tests (`build-planner.spec.ts`)
- Form validation and submission
- Dimension input handling
- Unit conversion
- Build plan generation
- Results display

### 5. Contact & Support Tests (`contact.spec.ts`)
- Contact form validation
- Support page functionality
- Legal page content
- Form submission handling

### 6. Responsive Design Tests (`responsive.spec.ts`)
- Mobile layout testing
- Tablet layout testing
- Desktop layout testing
- Touch interactions
- Viewport adaptations

### 7. Performance Tests (`performance.spec.ts`)
- Page load times
- Form submission performance
- Concurrent user testing
- Memory usage optimization
- Bundle size verification

### 8. Accessibility Tests (`accessibility.spec.ts`)
- ARIA label compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast verification
- Focus management

### 9. Error Handling Tests (`error-handling.spec.ts`)
- Network error recovery
- Form validation errors
- 404 page handling
- Graceful degradation

### 10. Security Tests (`security.spec.ts`)
- XSS prevention
- CSRF protection
- Input validation
- File upload security
- Authentication bypass prevention

### 11. Visual Regression Tests (`visual.spec.ts`)
- Screenshot comparisons
- UI consistency verification
- Responsive layout validation
- State-based visual testing

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Parallel test execution
- Screenshot and video capture
- Custom test projects for different categories

### Test Projects
- **chromium**: Desktop Chrome testing
- **firefox**: Desktop Firefox testing  
- **webkit**: Desktop Safari testing
- **Mobile Chrome**: Mobile Chrome testing
- **Mobile Safari**: Mobile Safari testing
- **accessibility**: Accessibility-specific tests
- **performance**: Performance-specific tests
- **security**: Security-specific tests
- **visual**: Visual regression tests

## 📊 Test Metrics

### Coverage Goals
- **Critical Paths**: 100% coverage
- **Secondary Paths**: 80% coverage
- **Edge Cases**: 60% coverage

### Performance Benchmarks
- Homepage load time: < 3 seconds
- Form submission: < 5 seconds
- Navigation: < 2 seconds
- Mobile performance: < 5 seconds

### Accessibility Standards
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios

## 🐛 Debugging Tests

### Common Issues

#### Test Failures
1. Check if the development server is running
2. Verify selectors are still valid
3. Check for timing issues (add waits if needed)
4. Review browser console for errors

#### Flaky Tests
1. Add explicit waits for dynamic content
2. Use `waitForLoadState('networkidle')`
3. Check for race conditions
4. Verify test isolation

#### Selector Issues
1. Update selectors in `utils/selectors.ts`
2. Use more specific selectors
3. Add fallback selectors
4. Check for dynamic content

### Debug Commands
```bash
# Run specific test with debugging
npx playwright test navigation.spec.ts --debug

# Run with UI for step-by-step debugging
npx playwright test --ui

# Generate trace for failed test
npx playwright test --trace on
```

## 📈 Continuous Integration

### GitHub Actions
Tests can be integrated into CI/CD pipelines:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🔄 Maintenance

### Regular Tasks
1. **Update selectors** when UI changes
2. **Review test data** for accuracy
3. **Update performance benchmarks** as needed
4. **Add new test cases** for new features
5. **Remove obsolete tests** for removed features

### Test Data Management
- Keep test data in `fixtures/test-data.ts`
- Use realistic but safe test data
- Avoid hardcoded values in tests
- Update data when application changes

### Selector Management
- Use data-testid attributes when possible
- Provide fallback selectors
- Keep selectors in `utils/selectors.ts`
- Document selector strategies

## 📚 Best Practices

### Writing Tests
1. **Test user behavior**, not implementation
2. **Use descriptive test names**
3. **Keep tests independent**
4. **Use page object patterns**
5. **Handle async operations properly**

### Test Organization
1. **Group related tests** in describe blocks
2. **Use beforeEach for setup**
3. **Clean up after tests**
4. **Use meaningful assertions**
5. **Document complex test scenarios**

### Performance
1. **Run tests in parallel** when possible
2. **Use efficient selectors**
3. **Minimize page loads**
4. **Cache test data**
5. **Optimize test execution time**

## 🤝 Contributing

### Adding New Tests
1. Create test file in `tests/` directory
2. Follow naming convention: `feature.spec.ts`
3. Use existing utilities and helpers
4. Add test data to fixtures if needed
5. Update this README if adding new categories

### Test Standards
- All tests must pass consistently
- Tests should be self-contained
- Use descriptive test names
- Include proper error handling
- Follow accessibility guidelines

## 📞 Support

For questions about the e2e testing suite:
1. Check existing test examples
2. Review Playwright documentation
3. Check test utilities and helpers
4. Review this README
5. Create an issue for bugs or questions

---

**Last Updated**: Current Session  
**Test Coverage**: Comprehensive E2E testing suite for At Home DIY application
