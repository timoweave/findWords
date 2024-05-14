import { doesSignatureCover, findWords, makeSignature } from '@src/findWords';
import { describe, expect, test } from 'vitest';

describe('string dict', () => {
    test('doesSignatureCover: empty inputs', () => {
        expect(() => doesSignatureCover(null, null)).toThrow(
            'Invalid first input: null',
        );
        expect(doesSignatureCover({}, {})).toBe(false);
        expect(() => doesSignatureCover(null, {})).toThrow(
            'Invalid first input: null',
        );
        expect(() => doesSignatureCover({}, null)).toThrow(
            'Invalid second input: null',
        );
    });

    test('makeSignature: removing space', () => {
        expect(makeSignature('')).toEqual(null);
        expect(makeSignature('   ')).toEqual(null);
        expect(makeSignature('\t\t\t')).toEqual(null);
        expect(makeSignature('\n\n\n')).toEqual(null);
        expect(makeSignature(' \n\t\r \n \r \t')).toEqual(null);
    });

    test('makeSignature: make dict from string', () => {
        expect(makeSignature('aaaa')).toEqual({ a: 4 });
        expect(makeSignature('ate')).toEqual({ a: 1, t: 1, e: 1 });
        expect(makeSignature('eat')).toEqual({ a: 1, t: 1, e: 1 });
        expect(makeSignature('good')).toEqual({ g: 1, o: 2, d: 1 });
        expect(makeSignature(' a t\te\n')).toEqual({ a: 1, t: 1, e: 1 });
        expect(makeSignature(' g \t\r\no o\rd ')).toEqual({ g: 1, o: 2, d: 1 });
        expect(makeSignature('good')).toEqual(makeSignature('odog'));
    });

    test('isSignatureCover: make dict from string with spaces', () => {
        const ate = makeSignature('ate');
        const eta = makeSignature('eta');
        const gate = makeSignature('gate');

        expect(doesSignatureCover(ate, ate)).toBe(true);
        expect(doesSignatureCover(ate, eta)).toBe(true);
        expect(doesSignatureCover(gate, ate)).toBe(true);
        expect(doesSignatureCover(ate, gate)).toBe(false);
    });

    test('findWords: handle empty inputs', () => {
        expect(findWords('', [])).toEqual([]);
        expect(findWords('   ', [])).toEqual([]);
        expect(findWords('hello', [])).toEqual([]);
        expect(findWords('   ', ['apple', 'banana'])).toEqual([
            'apple',
            'banana',
        ]);
        expect(findWords(' \t\r\n', [' ', '  ', '   \r\t\n'])).toEqual([
            ' ',
            '  ',
            '   \r\t\n',
        ]);
        expect(findWords(' \t\r\n', ['a', 'b  ', '   \r\t\n'])).toEqual([
            'a',
            'b  ',
            '   \r\t\n',
        ]);
        expect(findWords('', ['a', 'b'])).toEqual(['a', 'b']);
    });

    test('findWords: a... strings', () => {
        expect(findWords('a', ['a', 'aa', 'aaa', 'aaaa'])).toEqual(['a']);

        expect(findWords('aa', ['a', 'aa', 'aaa', 'aaaa'])).toEqual([
            'a',
            'aa',
        ]);

        expect(findWords('aaa', ['a', 'aa', 'aaa', 'aaaa'])).toEqual([
            'a',
            'aa',
            'aaa',
        ]);

        expect(findWords('a', ['a', 'ab', 'abc', 'abcd'])).toEqual(['a']);

        expect(findWords('aa', ['a', 'aa', 'aab', 'aabc'])).toEqual([
            'a',
            'aa',
        ]);

        expect(findWords('aaa', ['a', 'aa', 'aaa', 'aaab'])).toEqual([
            'a',
            'aa',
            'aaa',
        ]);
    });

    test('findWords: ab... strings', () => {
        expect(findWords('ab', ['a', 'aa', 'aaa', 'aaaa'])).toEqual(['a']);

        expect(findWords('aab', ['a', 'aa', 'aaa', 'aaaa'])).toEqual([
            'a',
            'aa',
        ]);

        expect(findWords('aaab', ['a', 'aa', 'aaa', 'aaaa'])).toEqual([
            'a',
            'aa',
            'aaa',
        ]);

        expect(findWords('ab', ['a', 'ab', 'abb', 'abcd'])).toEqual([
            'a',
            'ab',
        ]);

        expect(findWords('aab', ['a', 'aa', 'aab', 'aabb'])).toEqual([
            'a',
            'aa',
            'aab',
        ]);

        expect(findWords('aaab', ['a', 'aa', 'aaa', 'aaab'])).toEqual([
            'a',
            'aa',
            'aaa',
            'aaab',
        ]);
    });

    test('findWords: long examples', () => {
        expect(findWords('ate', ['ate', 'eat', 'tea', 'good'])).toEqual([
            'ate',
            'eat',
            'tea',
        ]);

        expect(
            findWords('ate', [
                'ate',
                'eat',
                'tea',
                'dog',
                'do',
                'god',
                'goo',
                'go',
                'good',
            ]),
        ).toEqual(['ate', 'eat', 'tea']);

        expect(
            findWords('oogd', [
                'ate',
                'eat',
                'tea',
                'dog',
                'do',
                'god',
                'goo',
                'go',
                'good',
            ]),
        ).toEqual(['dog', 'do', 'god', 'goo', 'go', 'good']);
    });

    test('findWords: log examples with spaces', () => {
        expect(
            findWords('at\ne', ['\rate', 'e\tat', 'te\na', 'g ood']),
        ).toEqual(['\rate', 'e\tat', 'te\na']);

        expect(
            findWords('at e', [
                'ate',
                'e at',
                ' tea',
                'dog',
                'd\to',
                'go\nd',
                'goo',
                'go',
                'good',
            ]),
        ).toEqual(['ate', 'e at', ' tea']);

        expect(
            findWords('oogd', [
                'ate',
                'eat',
                'tea',
                'dog',
                'do',
                'god',
                'goo',
                'go',
                'good',
            ]),
        ).toEqual(['dog', 'do', 'god', 'goo', 'go', 'good']);
    });

    test('findWords: unicode examples', () => {
        expect(
            findWords('åäö', ['åäö', 'åte', 'äat', 'öa', 'dog', 'do', 'god']),
        ).toEqual(['åäö']);
    });

    test('findWords: emoji examples', () => {
        expect(findWords('😀', ['😀', 'tea', 'ate'])).toEqual(['😀']);
        expect(findWords('😀', ['eat😀', 'tea', 'ate'])).toEqual([]);
        expect(
            findWords('🍎🍌🍇', ['😀', '😀🍎🍌🍇', '🍎🍌🍇', '🍎', '🍌🍇']),
        ).toEqual(['🍎🍌🍇', '🍎', '🍌🍇']);
    });
});
