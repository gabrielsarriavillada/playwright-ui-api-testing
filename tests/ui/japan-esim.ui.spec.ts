import { test, expect } from '@playwright/test';

test('shows the selected 7 days unlimited Japan eSIM price in the cart', async ({ page }) => {
  // Navigate to the Airalo website
  await page.goto('/');

  // Search "Japan"
  await page.locator("[data-testid=search-input_text-field]").fill("Japan");

  // Select "Japan" option
  await page.getByRole("link", { name: /Japan/i }).click();

  // Select "Unlimited" plans tab
  await page.getByRole("tab", { name: /unlimited/i }).click();

  // Select "7 days" plan
  const sevenDaysUnlimitedPlan = page.getByRole("button", { name: /Select Unlimited - 7 days/i });
  await sevenDaysUnlimitedPlan.click();

  // Validate package price is correct
  const packagePrice = await sevenDaysUnlimitedPlan.getByTestId("price_amount").innerText();
  await expect(page.getByTestId("cart-navigation_container").getByTestId("price_amount")).toHaveText(packagePrice);
});
