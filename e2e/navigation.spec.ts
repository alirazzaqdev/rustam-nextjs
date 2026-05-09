import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have header with navigation links', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    const homeLink = page.locator('a:has-text("Home")')
    const productsLink = page.locator('a:has-text("Products")')
    const servicesLink = page.locator('a:has-text("Services")')

    await expect(homeLink).toBeVisible()
    await expect(productsLink).toBeVisible()
    await expect(servicesLink).toBeVisible()
  })

  test('should have get quote button', async ({ page }) => {
    const quoteButton = page.locator('button:has-text("Get Quote")')
    await expect(quoteButton).toBeVisible()
  })

  test('should scroll to section when nav link clicked', async ({ page }) => {
    const productsLink = page.locator('a[href="#products"]')
    await productsLink.click()

    const productsSection = page.locator('section#products')
    await expect(productsSection).toBeInViewport()
  })

  test('should have footer with contact info', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()

    const phone = page.locator('text=+92 300 1234567')
    const email = page.locator('text=info@rustambattery.com')

    await expect(phone).toBeVisible()
    await expect(email).toBeVisible()
  })

  test('mobile menu should toggle', async ({ page }) => {
    // Start with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.locator('button[aria-label*="Menu"]')
    if (await menuButton.isVisible()) {
      await menuButton.click()

      const mobileMenu = page.locator('nav').filter({ has: page.locator('a:has-text("Home")') })
      await expect(mobileMenu).toBeVisible()
    }
  })
})
