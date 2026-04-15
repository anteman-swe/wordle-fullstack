import { test, expect } from '@playwright/test';

test('kontrollera titeln på en sida', async ({ page }) => {
  // Gå till en webbsida
  await page.goto('https://playwright.dev/');

  // Kontrollera att titeln innehåller ordet "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});