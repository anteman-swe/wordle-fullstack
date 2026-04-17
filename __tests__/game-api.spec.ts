import { test, expect } from "@playwright/test";

const localhost = "http://localhost:5080/api";

// Set tests to run one by one, no parallell for now
test.describe.configure({ mode: "serial" });

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