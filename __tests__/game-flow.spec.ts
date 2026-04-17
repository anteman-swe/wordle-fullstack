import testServerStart from "./test-server-start";
import { test, expect } from "@playwright/test";

const localhost = "http://localhost:5080/api";

// Set tests to run one by one, no parallell for now
test.describe.configure({ mode: "serial" });

// const testWordlist: string[] = ["bästa", "testa"];
// test.beforeAll(() => {
//   testServerStart(testWordlist);
// });

test.describe("First testing simple API steps", async () => {
  // Complete test suit must be run, if run step by step gameId will be lost between tests
  let gameId: string;

  test("Should start a new game", async ({ request }) => {
    const response = await request.get(localhost + "/start-game", {
      params: {
        wl: 5,
        dup: "false",
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body.gameID).toBeDefined();
    expect(body.gameID.length).toBe(8);

    // Save gameID to use in next tests
    gameId = body.gameID;
  });

  test("Response when testing a word against secret word", async ({
    request,
  }) => {
    const response = await request.post(localhost + "/testword", {
      data: {
        gameId: gameId,
        word: "TRYCK", // The guess
      },
    });

    expect(response.status()).toBe(200);
    const result = await response.json();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
  });

  test("Response when game is ended", async ({ request }) => {
    const response = await request.post(localhost + "/end-game", {
      data: {
        gameId: gameId,
      },
    });
    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(typeof result.duration).toBe("number");
    expect(result.theWord.length).toBe(5);
    expect(result.theWord).toBe("bästa");
  });

  test("Trying to end game with faulty gameID", async ({ request }) => {
    const response = await request.post(localhost + "/end-game", {
      data: {
        gameId: "0",
      },
    });
    expect(response.status()).toBe(404);
    const result = await response.json();
    expect(result.error).toContain("not");
  });
});

test.describe("Testing happy flow", async () => {
  const WORDLE_URL = "http://localhost:5080";
  test("Test winning with word without duplicates", async ({ page }) => {
    // Open page and check that title is showing
    await page.goto(WORDLE_URL);
    await expect(page).toHaveTitle(/Wordle/);

    //Start a new game
    const startButton = page.getByRole("button", {
      name: "START",
      exact: false,
    });
    await expect(startButton).toBeEnabled();
    await startButton.click();

    await expect(page).toHaveURL(WORDLE_URL + "/game");
    await page.locator("input").fill("TRYCK");
    await page.keyboard.press("Enter");

    const firstRow = page.locator(".matrixrow").nth(0);
    const firstLetter = firstRow.locator(".matrixsquare").nth(0);
    const secondLetter = firstRow.locator(".matrixsquare").nth(1);
    const thirdLetter = firstRow.locator(".matrixsquare").nth(2);
    const fourthLetter = firstRow.locator(".matrixsquare").nth(3);
    const fifthLetter = firstRow.locator(".matrixsquare").nth(4);
    expect(firstLetter).toContainText("T");
    expect(firstLetter).toHaveCSS("background-color", "rgb(255, 255, 0)");
    expect(secondLetter).toContainText("R");
    expect(secondLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    expect(thirdLetter).toContainText("Y");
    expect(thirdLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    expect(fourthLetter).toContainText("C");
    expect(fourthLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    expect(fifthLetter).toContainText("K");
    expect(fifthLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");

    await page.locator("input").fill("BÄSTA");
    await page.keyboard.press("Enter");

    const secondRow = page.locator(".matrixrow").nth(1);
    const firstLetterSR = secondRow.locator(".matrixsquare").nth(0);
    const secondLetterSR = secondRow.locator(".matrixsquare").nth(1);
    const thirdLetterSR = secondRow.locator(".matrixsquare").nth(2);
    const fourthLetterSR = secondRow.locator(".matrixsquare").nth(3);
    const fifthLetterSR = secondRow.locator(".matrixsquare").nth(4);
    expect(firstLetterSR).toContainText("B");
    expect(firstLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(secondLetterSR).toContainText("Ä");
    expect(secondLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(thirdLetterSR).toContainText("S");
    expect(thirdLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(fourthLetterSR).toContainText("T");
    expect(fourthLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(fifthLetterSR).toContainText("A");
    expect(fifthLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");

    await page.waitForTimeout(600);
    await expect(page.getByTestId("celebration")).toContainText(/Grattis!/);
  });

  test("Test winning with word with duplicates", async ({ page }) => {
    await page.goto(WORDLE_URL);
    await expect(page).toHaveTitle(/Wordle/);

    await page.getByText('Spel', {exact: true}).click();
    await page.getByTestId('toggle-dups').click();
    await page.getByText('X', {exact: true}).click();

    await page.waitForTimeout(100);

    //Start a new game
    const startButton = page.getByRole("button", {
      name: "START",
      exact: false,
    });
    await expect(startButton).toBeEnabled();
    await startButton.click();

    await expect(page).toHaveURL(WORDLE_URL + "/game");
    await page.locator("input").fill("TRYCK");
    await page.keyboard.press("Enter");

    const firstRow = page.locator(".matrixrow").nth(0);
    const firstLetter = firstRow.locator(".matrixsquare").nth(0);
    const secondLetter = firstRow.locator(".matrixsquare").nth(1);
    const thirdLetter = firstRow.locator(".matrixsquare").nth(2);
    const fourthLetter = firstRow.locator(".matrixsquare").nth(3);
    const fifthLetter = firstRow.locator(".matrixsquare").nth(4);
    expect(firstLetter).toContainText("T");
    expect(firstLetter).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(secondLetter).toContainText("R");
    expect(secondLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    expect(thirdLetter).toContainText("Y");
    expect(thirdLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    expect(fourthLetter).toContainText("C");
    expect(fourthLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");
    expect(fifthLetter).toContainText("K");
    expect(fifthLetter).toHaveCSS("background-color", "rgb(255, 0, 0)");

    await page.locator("input").fill("TESTA");
    await page.keyboard.press("Enter");

    const secondRow = page.locator(".matrixrow").nth(1);
    const firstLetterSR = secondRow.locator(".matrixsquare").nth(0);
    const secondLetterSR = secondRow.locator(".matrixsquare").nth(1);
    const thirdLetterSR = secondRow.locator(".matrixsquare").nth(2);
    const fourthLetterSR = secondRow.locator(".matrixsquare").nth(3);
    const fifthLetterSR = secondRow.locator(".matrixsquare").nth(4);
    expect(firstLetterSR).toContainText("T");
    expect(firstLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(secondLetterSR).toContainText("E");
    expect(secondLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(thirdLetterSR).toContainText("S");
    expect(thirdLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(fourthLetterSR).toContainText("T");
    expect(fourthLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");
    expect(fifthLetterSR).toContainText("A");
    expect(fifthLetterSR).toHaveCSS("background-color", "rgb(0, 128, 0)");

    await page.waitForTimeout(600);
    await expect(page.getByTestId("celebration")).toContainText(/Grattis!/);
  });
});
