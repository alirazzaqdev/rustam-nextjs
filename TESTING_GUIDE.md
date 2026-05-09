# Testing Guide

## Overview

The project includes comprehensive testing setup:
- **Unit Tests** - Vitest + React Testing Library
- **Component Tests** - React Testing Library
- **E2E Tests** - Playwright (Chrome, Firefox, Safari, Mobile)
- **Coverage Reporting** - V8 coverage provider

---

## Running Tests

### Unit & Component Tests

```bash
# Run all tests in watch mode (development)
npm run test

# Run tests once (CI/CD)
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run e2e

# Run with UI (recommended for development)
npm run e2e:ui

# Debug tests step-by-step
npm run e2e:debug
```

---

## Test Structure

```
src/
├── __tests__/               # Unit & component tests
│   ├── button.test.tsx      # Button component test
│   └── calculator.test.tsx  # Calculator test (example)
└── components/

e2e/                         # End-to-end tests
├── navigation.spec.ts       # Navigation test
├── calculator.spec.ts       # Calculator test
└── forms.spec.ts           # Forms test (example)
```

---

## Unit Testing with Vitest

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest'

describe('Component Name', () => {
  it('should do something', () => {
    expect(true).toBe(true)
  })

  it('should do another thing', () => {
    expect([1, 2, 3]).toContain(2)
  })
})
```

### Component Testing Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyButton } from '@/components/MyButton'

describe('MyButton', () => {
  it('renders with text', () => {
    render(<MyButton>Click me</MyButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler', async () => {
    const handleClick = vi.fn()
    const { user } = render(<MyButton onClick={handleClick}>Click</MyButton>)
    
    await user.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Common Assertions

```typescript
// Existence
expect(element).toBeInTheDocument()
expect(element).toBeVisible()

// Content
expect(element).toHaveTextContent('text')
expect(element).toHaveAttribute('href', '/path')

// Classes/Styles
expect(element).toHaveClass('active')
expect(element).toHaveStyle('color: red')

// State
expect(element).toBeDisabled()
expect(element).toBeChecked()

// Values
expect(input).toHaveValue('text')
expect(select).toHaveValue('option')
```

---

## E2E Testing with Playwright

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should do something', async ({ page }) => {
    await page.click('button:has-text("Click me")')
    await expect(page.locator('text=Result')).toBeVisible()
  })
})
```

### Common Playwright Actions

```typescript
// Navigation
await page.goto('/products')
await page.goBack()
await page.reload()

// Clicking
await page.click('button')
await page.locator('button').click()

// Typing
await page.fill('input', 'text')
await page.type('input', 'text')

// Scrolling
await page.locator('section').scrollIntoViewIfNeeded()

// Waiting
await page.waitForNavigation()
await page.waitForSelector('text=Loaded')
await page.waitForTimeout(1000)

// Assertions
await expect(page.locator('h1')).toContainText('Title')
await expect(page.locator('button')).toBeEnabled()
await expect(page.locator('input')).toHaveValue('text')
```

### Selectors

```typescript
// By text
page.locator('text=Click me')
page.locator('button:has-text("Click")')

// By attribute
page.locator('input[type="email"]')
page.locator('a[href*="products"]')

// By role
page.locator('button')
page.locator('input[role="textbox"]')

// By test ID
page.locator('[data-testid="submit-btn"]')

// CSS selectors
page.locator('.button.primary')
page.locator('#sidebar > nav')

// XPath
page.locator('//button[contains(text(), "Save")]')
```

---

## Example Tests

### Test: Calculator Inputs

```typescript
test('should update results when input changes', async ({ page }) => {
  // Navigate to calculator
  await page.goto('/')
  await page.locator('a[href="#calculator"]').click()

  // Get initial result
  const initialResult = await page.locator('text=/PKR \\d+/').textContent()

  // Change input
  const slider = page.locator('input[type="range"]').first()
  await slider.fill('20000')

  // Verify result changed
  await page.waitForTimeout(500)
  const newResult = await page.locator('text=/PKR \\d+/').textContent()
  
  expect(newResult).not.toBe(initialResult)
})
```

### Test: Form Submission

```typescript
test('should submit contact form', async ({ page }) => {
  await page.goto('/')
  await page.locator('a[href="#contact"]').click()

  // Fill form
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('textarea[name="message"]', 'Hello, I am interested...')

  // Submit
  await page.click('button:has-text("Send Message")')

  // Verify success
  await expect(page.locator('text=Message sent successfully')).toBeVisible()
})
```

### Test: Navigation

```typescript
test('should navigate to products when link clicked', async ({ page }) => {
  await page.goto('/')

  // Click products link
  await page.locator('a:has-text("Products")').click()

  // Verify section is in view
  await expect(page.locator('section#products')).toBeInViewport()
})
```

---

## Test Coverage

### Generate Coverage Report

```bash
npm run test:coverage
```

This creates an HTML report in `coverage/` directory.

### Coverage Targets

- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

### View Coverage

```bash
# Open in browser
open coverage/index.html

# Check specific file
open coverage/src/components/Button.tsx.html
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm run test:run
      - run: npm run e2e
```

---

## Best Practices

### Do's ✅

- Test user behavior, not implementation
- Keep tests simple and focused
- Use descriptive test names
- Test edge cases
- Run tests before committing
- Keep tests maintainable

### Don'ts ❌

- Mock too much (mock external APIs, not components)
- Test internal state directly
- Make tests dependent on each other
- Use vague selectors
- Ignore test failures
- Write tests after code is done

---

## Debugging Tests

### Vitest UI

```bash
npm run test:ui
```

Interactive UI with:
- Real-time test results
- Coverage visualization
- Detailed error messages

### Playwright UI

```bash
npm run e2e:ui
```

Interactive UI with:
- Step-through debugging
- Screenshot capture
- Trace replay

### Debug Mode

```bash
npm run e2e:debug
```

Step-by-step debugging with inspector.

---

## Common Issues

### Tests Failing Locally

```bash
# Clear cache
rm -rf node_modules/.vite
npm run test:run

# Update snapshots
npm run test -- -u
```

### E2E Tests Timeout

- Increase timeout: `test.setTimeout(60000)` (60 seconds)
- Check if server is running: `npm run dev`
- Verify baseURL in `playwright.config.ts`

### Flaky Tests

Causes:
- Race conditions
- Timing issues
- External dependencies

Solutions:
- Use `waitFor` instead of `waitForTimeout`
- Await state changes: `await expect(element).toBeVisible()`
- Mock external APIs

---

## Next Steps

1. ✅ Testing framework is configured
2. ⬜ Write unit tests for components
3. ⬜ Write E2E tests for user journeys
4. ⬜ Aim for 80%+ coverage
5. ⬜ Integrate with CI/CD
6. ⬜ Run tests on every PR

---

**Happy testing!** Write tests that give you confidence. 🧪
