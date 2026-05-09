import { test, expect } from '@playwright/test'

test.describe('Solar Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="#calculator"]').click()
    await page.locator('section#calculator').scrollIntoViewIfNeeded()
  })

  test('should display calculator section', async ({ page }) => {
    const calculator = page.locator('section#calculator')
    await expect(calculator).toBeVisible()

    const title = page.locator('h2:has-text("Solar Savings Calculator")')
    await expect(title).toBeVisible()
  })

  test('should display input controls', async ({ page }) => {
    const billInput = page.locator('input[type="range"]').first()
    const sunHoursInput = page.locator('input[type="range"]').nth(1)
    const rateInput = page.locator('input[type="range"]').nth(2)

    await expect(billInput).toBeVisible()
    await expect(sunHoursInput).toBeVisible()
    await expect(rateInput).toBeVisible()
  })

  test('should update results when inputs change', async ({ page }) => {
    const billInput = page.locator('input[type="range"]').first()

    // Get initial value
    const initialValue = await page.locator('text=/PKR \\d+/').first().textContent()

    // Change input
    await billInput.fill('20000')

    // Wait for update and verify value changed
    await page.waitForTimeout(500)
    const newValue = await page.locator('text=/PKR \\d+/').first().textContent()

    expect(newValue).not.toBe(initialValue)
  })

  test('should display financial metrics', async ({ page }) => {
    const systemSize = page.locator('text=/\\d+\\.\\d+ kW/')
    const annualSavings = page.locator('text=/PKR \\d+(,\\d+)*/')
    const roi = page.locator('text=/\\d+%/')

    await expect(systemSize).toBeVisible()
    await expect(annualSavings).toBeVisible()
    await expect(roi).toBeVisible()
  })

  test('should have get quote button', async ({ page }) => {
    const quoteButton = page.locator('button:has-text("Get Detailed Quote")')
    await expect(quoteButton).toBeVisible()
  })

  test('quote button should scroll to contact section', async ({ page }) => {
    const quoteButton = page.locator('button:has-text("Get Detailed Quote")')
    await quoteButton.click()

    const contactSection = page.locator('section#contact')
    await expect(contactSection).toBeInViewport({ timeout: 2000 })
  })
})
