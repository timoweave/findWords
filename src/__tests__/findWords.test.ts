import { doesSpectrumCover, findWords, makeSpectrum } from '@src/findWords';
import { describe, expect, test } from 'vitest';

describe('string dict', () => {
    test('doesSignatureCover: empty inputs', () => {
        expect(() => doesSpectrumCover(null, null)).toThrow(
            'Invalid first input: null',
        );
        expect(doesSpectrumCover({}, {})).toBe(false);
        expect(() => doesSpectrumCover(null, {})).toThrow(
            'Invalid first input: null',
        );
        expect(() => doesSpectrumCover({}, null)).toThrow(
            'Invalid second input: null',
        );
    });

    test('makeSignature: removing space', () => {
        expect(makeSpectrum('')).toEqual(null);
        expect(makeSpectrum('   ')).toEqual({ ' ': 3 });
        expect(makeSpectrum('\t\t\t')).toEqual({ '\t': 3 });
        expect(makeSpectrum('\n\n\n')).toEqual({ '\n': 3 });
        expect(makeSpectrum(' \n\t\r \n \r \t')).toEqual({
            ' ': 4,
            '\n': 2,
            '\t': 2,
            '\r': 2,
        });
    });

    test('makeSignature: make dict from string', () => {
        expect(makeSpectrum('aaaa')).toEqual({ a: 4 });
        expect(makeSpectrum('ate')).toEqual({ a: 1, t: 1, e: 1 });
        expect(makeSpectrum('eat')).toEqual({ a: 1, t: 1, e: 1 });
        expect(makeSpectrum('good')).toEqual({ g: 1, o: 2, d: 1 });
        expect(makeSpectrum(' a t\te\n')).toEqual({
            a: 1,
            t: 1,
            e: 1,
            ' ': 2,
            '\t': 1,
            '\n': 1,
        });
        expect(makeSpectrum(' g \t\r\no o\rd ')).toEqual({
            g: 1,
            o: 2,
            d: 1,
            ' ': 4,
            '\r': 2,
            '\t': 1,
            '\n': 1,
        });
        expect(makeSpectrum('good')).toEqual(makeSpectrum('odog'));
    });

    test('isSignatureCover: make dict from string with spaces', () => {
        const ate = makeSpectrum('ate');
        const eta = makeSpectrum('eta');
        const gate = makeSpectrum('gate');

        expect(doesSpectrumCover(ate, ate)).toBe(true);
        expect(doesSpectrumCover(ate, eta)).toBe(true);
        expect(doesSpectrumCover(gate, ate)).toBe(true);
        expect(doesSpectrumCover(ate, gate)).toBe(false);
    });

    test('findWords: handle empty inputs', () => {
        expect(findWords('', [])).toEqual([]);
        expect(findWords('   ', [])).toEqual([]);
        expect(findWords('hello', [])).toEqual([]);
        expect(findWords('   ', ['apple', 'banana'])).toEqual([]);
        expect(
            findWords(' \t\r\n', [' ', '  ', '   \r\t\n', '\r\t\n']),
        ).toEqual([' ', '\r\t\n']);
        expect(findWords(' \t\r\n', ['a', 'b  ', '   \r\t\n'])).toEqual([]);
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
        ).toEqual(['te\na']);

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
		 expect(
             findWords('élève', ['élève', 'école', 'étudiant', 'université']),
         ).toEqual(['élève']);
         expect(findWords('こんこん', ['こんにちは', 'こん'])).toEqual([
             'こん',
         ]);
         expect(findWords('こんにこんにちは', ['ちは', 'こんに'])).toEqual([
             'ちは',
             'こんに',
         ]);
    });

    test('findWords: emoji examples', () => {
        expect(findWords('😀', ['😀', 'tea', 'ate'])).toEqual(['😀']);
        expect(findWords('😀', ['eat😀', 'tea', 'ate'])).toEqual([]);
        expect(
            findWords('🍎🍌🍇', ['😀', '😀🍎🍌🍇', '🍎🍌🍇', '🍎', '🍌🍇']),
        ).toEqual(['🍎🍌🍇', '🍎', '🍌🍇']);
    });
});
