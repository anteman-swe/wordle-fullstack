import { test, describe } from 'node:test';
import assert from 'node:assert';
import wordSelect from '../wordSelect.js';
import { wordList } from "../wordList.js";
const limitWordNoDupChar = 10;
const limitWordDupChar = 18;
// Check that we get correct length of words when asking for any length  without duplicate chars
describe('Looping through wordlengths from 3 to limit when not allowing duplicate chars', () => {
    for (let len = 3; len <= limitWordNoDupChar; len++) {
        test(`Check that we get some random word with length ${len}`, () => {
            const testResult = wordSelect(wordList, len, false);
            assert.strictEqual(testResult.length, len);
        });
    }
});
// Check that we get correct length of words when asking for any length  with duplicate chars
describe('Looping through wordlengths from 3 to limit when allowing duplicate chars', () => {
    for (let len = 3; len <= limitWordDupChar; len++) {
        test(`Check that we get some random word with length ${len}`, () => {
            const testResult = wordSelect(wordList, len, true);
            assert.strictEqual(testResult.length, len);
        });
    }
});
// Check that when we ask for a word without duplicates we always get a word with unique characters
describe('Check that words always is without duplicate chars', () => {
    test('Check that we get the only word without duplicates', () => {
        const testResult = wordSelect(["PALT", "RATT", "NAPP", "PUSS", "PAPP"], 4, false);
        assert.strictEqual(testResult, "PALT");
    });
    test('When no words without duplicate chars we should get null', () => {
        const testResult = wordSelect(["RATT", "NAPP", "PUSS", "PAPP", "KÄNN"], 4, false);
        assert.strictEqual(testResult, null);
    });
});
// Check that we get null when asking for too long words with or without duplicate chars
describe('Getting null when asking for a too long word', () => {
    test(`Check that we get null when trying for longer words than ${limitWordDupChar} characters, allowing dups`, () => {
        const testResult = wordSelect(wordList, limitWordDupChar + 1, true);
        assert.strictEqual(testResult, null);
    });
    test(`Check that we get null when trying for longer words than ${limitWordNoDupChar} characters, not allowing dups`, () => {
        const testResult = wordSelect(wordList, limitWordNoDupChar + 1, false);
        assert.strictEqual(testResult, null);
    });
});
//  Testing that we always get some word when running multiple tests with same conditions
describe('Test to se that we always get some word when running multiple tests with same conditions', () => {
    test('Running wordSelect a 100 times allowing duplicate chars', () => {
        for (let i = 0; i < 100; i++) {
            const testResult = wordSelect(wordList, 6, true);
            assert.strictEqual(testResult.length, 6);
        }
    });
    test('Running wordSelect a 100 times not allowing duplicate chars', () => {
        for (let i = 0; i < 100; i++) {
            const testResult = wordSelect(wordList, 6, false);
            const uniqueChars = new Set(testResult);
            assert.strictEqual(testResult.length, uniqueChars.size);
        }
    });
});
//# sourceMappingURL=wordSelect.test.js.map