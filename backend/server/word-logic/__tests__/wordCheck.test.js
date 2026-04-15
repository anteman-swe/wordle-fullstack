import { test, describe } from 'node:test';
import assert from 'node:assert';
import wordCheck from '../wordCheck.js';
// Identical words: Check that alla characters gets marked as correct
test('All characters is correct', () => {
    const testResult = wordCheck('CYKLA', 'CYKLA');
    testResult.forEach((r) => assert.strictEqual(r.result, 'correct'));
});
// Completely different words: Check that all characters gets marked as incorrect
test('All characters is incorrect', () => {
    const testResult = wordCheck('ZZZZZ', 'CYKLA');
    testResult.forEach((r) => assert.strictEqual(r.result, 'incorrect'));
});
// Only one character is correct: Check that only one character gets marked as correct and all others as incorrect
test('If only one character is correct', () => {
    const testResult = wordCheck('XXXXA', 'CYKLA');
    assert.strictEqual(testResult[0].result, 'incorrect');
    assert.strictEqual(testResult[1].result, 'incorrect');
    assert.strictEqual(testResult[2].result, 'incorrect');
    assert.strictEqual(testResult[3].result, 'incorrect');
    assert.strictEqual(testResult[4].result, 'correct');
});
// One character is correct but misplaced: Check that only one character gets marked as misplaced
test('If only one character is misplaced', () => {
    const testResult = wordCheck('XXXAX', 'CYKLA');
    assert.strictEqual(testResult[0].result, 'incorrect');
    assert.strictEqual(testResult[1].result, 'incorrect');
    assert.strictEqual(testResult[2].result, 'incorrect');
    assert.strictEqual(testResult[3].result, 'misplaced');
    assert.strictEqual(testResult[4].result, 'incorrect');
});
// One character is misplaced and one character is correct: check that only one of each is marked and the rest is incorrect
test('If one character is correct, one misplaced and the rest incorrect', () => {
    const testResult = wordCheck('XAXLX', 'cykla');
    assert.strictEqual(testResult[0].result, 'incorrect');
    assert.strictEqual(testResult[1].result, 'misplaced');
    assert.strictEqual(testResult[2].result, 'incorrect');
    assert.strictEqual(testResult[3].result, 'correct');
    assert.strictEqual(testResult[4].result, 'incorrect');
});
//Duplicates: If the guess has two of the same character, check that only one gets marked as either correct or misplaced, the other one gets marked as incorrect
test('If one character of duplicates is correct, the rest incorrect', () => {
    const testResult = wordCheck('LLLLL', 'cykla');
    assert.strictEqual(testResult[0].result, 'incorrect');
    assert.strictEqual(testResult[1].result, 'incorrect');
    assert.strictEqual(testResult[2].result, 'incorrect');
    assert.strictEqual(testResult[3].result, 'correct');
    assert.strictEqual(testResult[4].result, 'incorrect');
});
test('One character of duplicates is misplaced, the rest incorrect', () => {
    const testResult = wordCheck('LLXXX', 'cykla');
    assert.strictEqual(testResult[0].result, 'misplaced');
    assert.strictEqual(testResult[1].result, 'incorrect');
    assert.strictEqual(testResult[2].result, 'incorrect');
    assert.strictEqual(testResult[3].result, 'incorrect');
    assert.strictEqual(testResult[4].result, 'incorrect');
});
// Case of characters: Upper case and lower case words should give the same result
describe('Upper case and lower case should not matter and give the same result', () => {
    test('Upper case guess vs lower case secret', () => {
        const testResult = wordCheck('CYKLA', 'cykla');
        testResult.forEach((r) => assert.strictEqual(r.result, 'correct'));
    });
    test('Lower case guess vs upper case secret', () => {
        const testResult = wordCheck('cykla', 'CYKLA');
        testResult.forEach((r) => assert.strictEqual(r.result, 'correct'));
    });
    test('Upper/lower case vs lower/upper case', () => {
        const testUpperLower = wordCheck('CYKLA', 'cykla');
        const testLowerUpper = wordCheck('cykla', 'CYKLA');
        for (let index = 0; index < testUpperLower.length; index++) {
            assert.strictEqual(testUpperLower[index].letter, testLowerUpper[index].letter);
            assert.strictEqual(testUpperLower[index].result, testLowerUpper[index].result);
        }
    });
});
//# sourceMappingURL=wordCheck.test.js.map