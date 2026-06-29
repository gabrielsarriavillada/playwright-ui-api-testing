import { test } from '@playwright/test';
import { HomePage } from '../../pages/Homepage';
import { ESimPage } from '../../pages/ESimPage';

test('shows the selected 7 days unlimited Japan eSIM price in the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const eSimPage = new ESimPage(page);
  const location = "Japan";

  // Navigate to the Airalo website
  await homePage.open();

  // Search "Japan"
  await homePage.searchLocation(location);

  // Select "Japan" option
  await homePage.selectLocation(location);

  // Select "Unlimited" plans tab
  await eSimPage.selectTab("unlimited");

  // Select "7 days" plan
  const packagePrice = await eSimPage.getPackagePrice("Select Unlimited - 7 days");
  await eSimPage.selectPlan("Select Unlimited - 7 days");

  // Validate package price is correct
  await eSimPage.expectCartPriceToBe(packagePrice);
});
