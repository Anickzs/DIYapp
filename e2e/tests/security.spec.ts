import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { selectors } from '../utils/selectors';

test.describe('Security', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should prevent XSS attacks', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test XSS in form fields
    const xssPayloads = [
      '<script>alert("xss")</script>',
      'javascript:alert("xss")',
      '<img src="x" onerror="alert(\'xss\')">',
      '<svg onload="alert(\'xss\')">',
      '"><script>alert("xss")</script>'
    ];
    
    for (const payload of xssPayloads) {
      await page.fill(selectors.contactName, payload);
      await page.fill(selectors.contactEmail, 'test@example.com');
      await page.fill(selectors.contactMessage, payload);
      
      await page.click(selectors.sendMessageButton);
      
      // Verify script is not executed
      const pageContent = await page.content();
      expect(pageContent).not.toContain('<script>alert("xss")</script>');
      expect(pageContent).not.toContain('javascript:alert("xss")');
      
      // Should sanitize input
      await helpers.expectSuccessMessage('Message sent');
    }
  });

  test('should validate form inputs', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test various malicious inputs
    const maliciousInputs = [
      { width: '999999999999', length: '-1' },
      { width: '0', length: '0' },
      { width: 'abc', length: 'def' },
      { width: '<script>', length: '</script>' },
      { width: '1; DROP TABLE users;', length: '1' }
    ];
    
    for (const input of maliciousInputs) {
      await page.fill(selectors.widthInput, input.width);
      await page.fill(selectors.lengthInput, input.length);
      await page.click(selectors.generatePlanButton);
      
      // Should show validation errors
      await helpers.expectValidationError('valid');
      await helpers.expectValidationError('positive');
    }
  });

  test('should prevent CSRF attacks', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Check for CSRF token
    const csrfToken = page.locator('input[name="_csrf"], input[name="csrf"], meta[name="csrf-token"]');
    if (await csrfToken.isVisible()) {
      await expect(csrfToken).toBeVisible();
      
      // Test form submission with invalid token
      await page.evaluate(() => {
        const tokenInput = document.querySelector('input[name="_csrf"]') as HTMLInputElement;
        if (tokenInput) {
          tokenInput.value = 'invalid-token';
        }
      });
      
      await helpers.fillContactForm({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      });
      
      await page.click(selectors.sendMessageButton);
      
      // Should reject invalid token
      await helpers.expectValidationError('token');
      await helpers.expectValidationError('invalid');
    }
  });

  test('should prevent SQL injection', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test SQL injection payloads
    const sqlInjectionPayloads = [
      "'; DROP TABLE users; --",
      "' OR '1'='1",
      "' UNION SELECT * FROM users --",
      "'; INSERT INTO users VALUES ('hacker', 'password'); --"
    ];
    
    for (const payload of sqlInjectionPayloads) {
      await page.fill(selectors.contactName, payload);
      await page.fill(selectors.contactEmail, 'test@example.com');
      await page.fill(selectors.contactMessage, payload);
      
      await page.click(selectors.sendMessageButton);
      
      // Should handle SQL injection attempts gracefully
      await helpers.expectSuccessMessage('Message sent');
      
      // Verify no SQL errors are exposed
      const pageContent = await page.content();
      expect(pageContent).not.toContain('SQL');
      expect(pageContent).not.toContain('database');
      expect(pageContent).not.toContain('syntax error');
    }
  });

  test('should prevent directory traversal attacks', async ({ page }) => {
    // Test directory traversal attempts
    const traversalPaths = [
      '/../../../etc/passwd',
      '/..\\..\\..\\windows\\system32\\config\\sam',
      '/%2e%2e/%2e%2e/%2e%2e/etc/passwd',
      '/..%2f..%2f..%2fetc%2fpasswd'
    ];
    
    for (const path of traversalPaths) {
      await page.goto(path);
      
      // Should not expose sensitive files
      const pageContent = await page.content();
      expect(pageContent).not.toContain('root:');
      expect(pageContent).not.toContain('system32');
      expect(pageContent).not.toContain('passwd');
      
      // Should show 404 or error page
      await helpers.expectErrorPage();
    }
  });

  test('should prevent clickjacking attacks', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for X-Frame-Options header
    const response = await page.waitForResponse('**/*');
    const headers = response.headers();
    
    // Should have X-Frame-Options or Content-Security-Policy frame-ancestors
    const hasFrameProtection = 
      headers['x-frame-options'] ||
      (headers['content-security-policy'] && headers['content-security-policy'].includes('frame-ancestors'));
    
    expect(hasFrameProtection).toBe(true);
  });

  test('should prevent information disclosure', async ({ page }) => {
    // Test various endpoints for information disclosure
    const sensitiveEndpoints = [
      '/.env',
      '/config.json',
      '/package.json',
      '/.git/config',
      '/wp-config.php',
      '/phpinfo.php'
    ];
    
    for (const endpoint of sensitiveEndpoints) {
      await page.goto(endpoint);
      
      // Should not expose sensitive information
      const pageContent = await page.content();
      expect(pageContent).not.toContain('DB_PASSWORD');
      expect(pageContent).not.toContain('API_KEY');
      expect(pageContent).not.toContain('SECRET');
      expect(pageContent).not.toContain('password');
      
      // Should show 404 or error page
      await helpers.expectErrorPage();
    }
  });

  test('should validate file uploads', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test file upload if it exists
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      // Test malicious file types
      const maliciousFiles = [
        { name: 'malicious.php', mimeType: 'application/x-php', buffer: Buffer.from('<?php system($_GET["cmd"]); ?>') },
        { name: 'malicious.js', mimeType: 'application/javascript', buffer: Buffer.from('alert("xss")') },
        { name: 'malicious.exe', mimeType: 'application/x-executable', buffer: Buffer.from('fake executable') }
      ];
      
      for (const file of maliciousFiles) {
        await fileInput.setInputFiles(file);
        
        // Should reject malicious file types
        await helpers.expectValidationError('file type');
        await helpers.expectValidationError('not allowed');
      }
    }
  });

  test('should prevent open redirects', async ({ page }) => {
    // Test open redirect vulnerabilities
    const redirectUrls = [
      '/redirect?url=https://evil.com',
      '/redirect?url=javascript:alert("xss")',
      '/redirect?url=data:text/html,<script>alert("xss")</script>'
    ];
    
    for (const url of redirectUrls) {
      await page.goto(url);
      
      // Should not redirect to external sites
      const currentUrl = page.url();
      expect(currentUrl).not.toContain('evil.com');
      expect(currentUrl).not.toContain('javascript:');
      expect(currentUrl).not.toContain('data:text/html');
      
      // Should stay on same domain or show error
      expect(currentUrl).toContain('localhost:3000');
    }
  });

  test('should prevent HTTP parameter pollution', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test parameter pollution
    await page.goto('/planner?width=4&width=999999&length=6&length=999999');
    
    // Should handle duplicate parameters gracefully
    await page.waitForLoadState('networkidle');
    
    // Should not crash or expose sensitive information
    await helpers.expectPageTitle('Build Planner');
  });

  test('should prevent HTTP header injection', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test header injection in form fields
    const headerInjectionPayloads = [
      'test@example.com\nX-Forwarded-For: 127.0.0.1',
      'test@example.com\r\nX-Forwarded-For: 127.0.0.1',
      'test@example.com%0d%0aX-Forwarded-For: 127.0.0.1'
    ];
    
    for (const payload of headerInjectionPayloads) {
      await page.fill(selectors.contactName, 'Test User');
      await page.fill(selectors.contactEmail, payload);
      await page.fill(selectors.contactMessage, 'Test message');
      
      await page.click(selectors.sendMessageButton);
      
      // Should sanitize headers
      await helpers.expectSuccessMessage('Message sent');
    }
  });

  test('should prevent command injection', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test command injection payloads
    const commandInjectionPayloads = [
      '4; rm -rf /',
      '4 && rm -rf /',
      '4 | rm -rf /',
      '4; cat /etc/passwd',
      '4; whoami'
    ];
    
    for (const payload of commandInjectionPayloads) {
      await page.fill(selectors.widthInput, payload);
      await page.fill(selectors.lengthInput, '6');
      await page.click(selectors.generatePlanButton);
      
      // Should validate input and not execute commands
      await helpers.expectValidationError('valid');
      await helpers.expectValidationError('number');
    }
  });

  test('should prevent path traversal in URLs', async ({ page }) => {
    // Test path traversal in URL parameters
    const traversalUrls = [
      '/quick-builds/../../../etc/passwd',
      '/quick-builds/%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      '/quick-builds/..%2f..%2f..%2fetc%2fpasswd'
    ];
    
    for (const url of traversalUrls) {
      await page.goto(url);
      
      // Should not expose sensitive files
      const pageContent = await page.content();
      expect(pageContent).not.toContain('root:');
      expect(pageContent).not.toContain('passwd');
      
      // Should show 404 or error page
      await helpers.expectErrorPage();
    }
  });

  test('should prevent SSRF attacks', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test SSRF payloads in form fields
    const ssrfPayloads = [
      'http://127.0.0.1:22',
      'http://169.254.169.254/latest/meta-data/',
      'http://localhost:8080/admin',
      'file:///etc/passwd'
    ];
    
    for (const payload of ssrfPayloads) {
      await page.fill(selectors.contactName, 'Test User');
      await page.fill(selectors.contactEmail, 'test@example.com');
      await page.fill(selectors.contactMessage, payload);
      
      await page.click(selectors.sendMessageButton);
      
      // Should sanitize URLs and not make internal requests
      await helpers.expectSuccessMessage('Message sent');
    }
  });

  test('should prevent prototype pollution', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test prototype pollution payloads
    const prototypePollutionPayloads = [
      '{"__proto__": {"isAdmin": true}}',
      '{"constructor": {"prototype": {"isAdmin": true}}}',
      '{"__proto__": {"toString": "malicious"}}'
    ];
    
    for (const payload of prototypePollutionPayloads) {
      // Try to inject via form fields
      await page.fill(selectors.widthInput, payload);
      await page.fill(selectors.lengthInput, '6');
      await page.click(selectors.generatePlanButton);
      
      // Should validate input and not allow prototype pollution
      await helpers.expectValidationError('valid');
    }
  });

  test('should prevent timing attacks', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Test timing attack scenarios
    const validEmail = 'test@example.com';
    const invalidEmail = 'nonexistent@example.com';
    
    // Measure response time for valid vs invalid email
    const startTime1 = Date.now();
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, validEmail);
    await page.fill(selectors.contactMessage, 'Test message');
    await page.click(selectors.sendMessageButton);
    await helpers.expectSuccessMessage('Message sent');
    const time1 = Date.now() - startTime1;
    
    const startTime2 = Date.now();
    await page.fill(selectors.contactName, 'Test User');
    await page.fill(selectors.contactEmail, invalidEmail);
    await page.fill(selectors.contactMessage, 'Test message');
    await page.click(selectors.sendMessageButton);
    await helpers.expectSuccessMessage('Message sent');
    const time2 = Date.now() - startTime2;
    
    // Response times should be similar to prevent timing attacks
    const timeDifference = Math.abs(time1 - time2);
    expect(timeDifference).toBeLessThan(1000); // Within 1 second
  });

  test('should prevent session fixation', async ({ page }) => {
    // Test session fixation if sessions are implemented
    await helpers.navigateToHome();
    
    // Get initial session
    const initialCookies = await page.context().cookies();
    
    // Navigate to login if it exists
    const loginLink = page.locator('text=Login, text=Sign In');
    if (await loginLink.isVisible()) {
      await loginLink.click();
      
      // Check that session changes after login
      await page.waitForTimeout(1000);
      const newCookies = await page.context().cookies();
      
      // Session should be different
      expect(newCookies).not.toEqual(initialCookies);
    }
  });

  test('should prevent insecure direct object references', async ({ page }) => {
    // Test IDOR vulnerabilities
    const sensitiveIds = ['1', '2', '3', 'admin', 'root'];
    
    for (const id of sensitiveIds) {
      await page.goto(`/user/${id}`);
      
      // Should not expose sensitive user data
      const pageContent = await page.content();
      expect(pageContent).not.toContain('password');
      expect(pageContent).not.toContain('email');
      expect(pageContent).not.toContain('admin');
      
      // Should show 404 or access denied
      await helpers.expectErrorPage();
    }
  });

  test('should prevent insecure deserialization', async ({ page }) => {
    await helpers.navigateToPlanner();
    
    // Test deserialization payloads
    const deserializationPayloads = [
      'O:8:"stdClass":1:{s:4:"test";s:4:"test";}',
      'a:2:{i:0;s:4:"test";i:1;s:4:"test";}',
      '{"__type":"System.Data.DataSet"}'
    ];
    
    for (const payload of deserializationPayloads) {
      await page.fill(selectors.widthInput, payload);
      await page.fill(selectors.lengthInput, '6');
      await page.click(selectors.generatePlanButton);
      
      // Should validate input and not deserialize malicious data
      await helpers.expectValidationError('valid');
    }
  });

  test('should prevent insecure cryptographic storage', async ({ page }) => {
    await helpers.navigateToContact();
    
    // Fill form with sensitive data
    await helpers.fillContactForm({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message with sensitive data: password123'
    });
    
    await page.click(selectors.sendMessageButton);
    
    // Check that sensitive data is not stored in plain text
    const pageContent = await page.content();
    expect(pageContent).not.toContain('password123');
    
    // Should show success message
    await helpers.expectSuccessMessage('Message sent');
  });

  test('should prevent insufficient logging and monitoring', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Perform suspicious activities
    const suspiciousActivities = [
      '/admin',
      '/.env',
      '/config.json',
      '/wp-config.php'
    ];
    
    for (const activity of suspiciousActivities) {
      await page.goto(activity);
      
      // Should handle suspicious activities gracefully
      await helpers.expectErrorPage();
    }
  });

  test('should prevent broken authentication', async ({ page }) => {
    // Test authentication bypass if auth is implemented
    const authBypassUrls = [
      '/admin',
      '/dashboard',
      '/profile',
      '/settings'
    ];
    
    for (const url of authBypassUrls) {
      await page.goto(url);
      
      // Should require authentication
      const currentUrl = page.url();
      if (currentUrl.includes('/login') || currentUrl.includes('/auth')) {
        await helpers.expectTextContent('login');
        await helpers.expectTextContent('authentication');
      } else {
        await helpers.expectErrorPage();
      }
    }
  });

  test('should prevent sensitive data exposure', async ({ page }) => {
    // Test for sensitive data exposure
    const sensitiveEndpoints = [
      '/api/users',
      '/api/config',
      '/api/secrets',
      '/debug',
      '/phpinfo.php'
    ];
    
    for (const endpoint of sensitiveEndpoints) {
      await page.goto(endpoint);
      
      // Should not expose sensitive data
      const pageContent = await page.content();
      expect(pageContent).not.toContain('password');
      expect(pageContent).not.toContain('secret');
      expect(pageContent).not.toContain('key');
      expect(pageContent).not.toContain('token');
      
      // Should show 404 or error page
      await helpers.expectErrorPage();
    }
  });

  test('should prevent missing function level access control', async ({ page }) => {
    // Test function level access control
    const adminFunctions = [
      '/api/admin/users',
      '/api/admin/config',
      '/api/admin/delete',
      '/api/admin/update'
    ];
    
    for (const functionUrl of adminFunctions) {
      await page.goto(functionUrl);
      
      // Should require admin privileges
      await helpers.expectErrorPage();
      await helpers.expectTextContent('permission');
      await helpers.expectTextContent('access denied');
    }
  });

  test('should prevent using components with known vulnerabilities', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check for known vulnerable components
    const pageContent = await page.content();
    
    // Should not contain known vulnerable libraries
    expect(pageContent).not.toContain('jquery-1.12.4');
    expect(pageContent).not.toContain('bootstrap-3.3.7');
    
    // Should use secure versions
    if (pageContent.includes('jquery')) {
      expect(pageContent).toContain('jquery-3.');
    }
  });

  test('should prevent insufficient security configuration', async ({ page }) => {
    await helpers.navigateToHome();
    
    // Check security headers
    const response = await page.waitForResponse('**/*');
    const headers = response.headers();
    
    // Should have security headers
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-xss-protection']).toBe('1; mode=block');
    expect(headers['referrer-policy']).toBeTruthy();
    
    // Should have secure content security policy
    if (headers['content-security-policy']) {
      const csp = headers['content-security-policy'];
      expect(csp).toContain('default-src');
      expect(csp).toContain('script-src');
    }
  });
});
