import { test, expect } from "@playwright/test";

// Set tests to run one by one, no parallell for now
test.describe.configure({ mode: "serial" });

test.describe("Testing happy flow", async () => {
  const WORDLE_URL = "http://localhost:5080";

  test.beforeEach(async ({ page }) => {
    await page.goto('about:blank');
    await page.goto(WORDLE_URL, {waitUntil: 'networkidle'});
  });

  test("Test winning without duplicate characters", async ({ page }) => {
    // Open page and check that title is showing
    await page.goto('about:blank');
    await page.goto(WORDLE_URL, {waitUntil: 'networkidle'});
    await expect(page).toHaveTitle(/Wordle/);

    //Start a new game
    const startButton = page.getByRole("button", {
      name: "START",
      exact: false,
    });
    await expect(startButton).toBeEnabled();
    await startButton.click();
    page.waitForTimeout(500);

    await expect(page).toHaveURL(WORDLE_URL + "/game");
    const firstSquare = page
      .locator(".matrixrow")
      .nth(0)
      .locator(".matrixsquare")
      .nth(0);
    await expect(firstSquare).toHaveText("");

    await page.locator("input").fill("TRYCK");
    await page.keyboard.press("Enter");

    const firstRow = page.locator(".matrixrow").nth(0);
    const firstLetter = firstRow.locator(".matrixsquare").nth(0);
    const secondLetter = firstRow.locator(".matrixsquare").nth(1);
    const thirdLetter = firstRow.locator(".matrixsquare").nth(2);
    const fourthLetter = firstRow.locator(".matrixsquare").nth(3);
    const fifthLetter = firstRow.locator(".matrixsquare").nth(4);
    await expect(firstLetter).toContainText("T");
    await expect(firstLetter).toHaveCSS("background-color", "rgb(255, 255, 0)");
    await expect(secondLetter).toContainText("R");
    await expect(secondLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    await expect(thirdLetter).toContainText("Y");
    await expect(thirdLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    await expect(fourthLetter).toContainText("C");
    await expect(fourthLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    await expect(fifthLetter).toContainText("K");
    await expect(fifthLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");

    await page.locator("input").fill("BÄSTA");
    await page.keyboard.press("Enter");

    const secondRow = page.locator(".matrixrow").nth(1);
    const firstLetterSR = secondRow.locator(".matrixsquare").nth(0);
    const secondLetterSR = secondRow.locator(".matrixsquare").nth(1);
    const thirdLetterSR = secondRow.locator(".matrixsquare").nth(2);
    const fourthLetterSR = secondRow.locator(".matrixsquare").nth(3);
    const fifthLetterSR = secondRow.locator(".matrixsquare").nth(4);
    await expect(firstLetterSR).toContainText("B");
    await expect(firstLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    await expect(secondLetterSR).toContainText("Ä");
    await expect(secondLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    await expect(thirdLetterSR).toContainText("S");
    await expect(thirdLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    await expect(fourthLetterSR).toContainText("T");
    await expect(fourthLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    await expect(fifthLetterSR).toContainText("A");
    await expect(fifthLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");

    await page.waitForTimeout(600);
    await expect(page.getByTestId("celebration")).toContainText(/Grattis!/);
  });
});

