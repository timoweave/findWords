# Find Words

1. Implement a function
```
findWords(inputString: string, dictionary: string[]): string[]
```
that return a string array from `dictionary` that is strictly covered only by all available characters from `inputString`. It is not necessary to use every available character, but it can not take any character not found in the `inputString`. the source code for `findWords` is in `src/findWords.ts`

# Implemenation detail
1. If the input is empty, there is no character to rerranged. It will just return `dictionary`.
1. We will remove any space from consideration such as space ` `, tab `\t`, return `\r`, or newline `\n` in the `inputString` and `dictionary`.
1. The approach to implement `findWords` is to make a signature out of each string in `O(n)`, where `n` is the length of the string. And then compare the signatures to see if a string from `dictionary` is fully covered by available  `inputString` characters (signature). Overall run time complexity is `O(n*m)`, where `n` is the average length of the string and `m` is the number of strings. ie `findWords('abc', ['xyz', 'ijk'])` run time is `O(3*3)` where `n = 3`, `m = 3`.
1. The solution to this `findWords` is similar to spectrum analysis where "wavelength x-axis" is the character (`a`, `b`, `c`, ..., `z`) and "absorbance y-axis" is the number of character (`1`, `2`, `3`, ...). Below is a screenshot mimic `findWords(blue_line, [red_line, yellow_line])`, where yellow_line = "abbcefgggh" and blue_line ="aabbbcceeffgggghh", and red_line = "aaaaabbbbbcccceeeeffffggggggggghhhh".
 <img width="408" alt="Screenshot 2024-05-14 at 3 25 31 PM" src="https://github.com/timoweave/findWords/assets/13225610/b6a48e22-1d37-4554-aec7-fb1574c0f933">

# Testing
1. Located in file `src/__tests__/findWords.test.ts`
1. Run `npm run test` to check all the testcases and coverage
1. generated coverage data is saved to directory `coverage/`
1. List of tests:
   - [✓] doesSignatureCover: empty inputs
   - [✓] makeSignature: removing space
   - [✓] makeSignature: make dict from string
   - [✓] isSignatureCover: make dict from string with spaces
   - [✓] findWords: handle empty inputs
   - [✓] findWords: a... strings
   - [✓] findWords: ab... strings
   - [✓] findWords: long examples
   - [✓] findWords: log examples with spaces
   - [✓] findWords: unicode examples
   - [✓] findWords: emoji examples

# Packages/Tools
1. The 3rd parties packages and tools:
   - `vite`
   - `typescript`
   - `vite-tsconfig-paths`
   - `vitest` (testing)
   - `@vitest/coverage-v8`
   - `prettier` (formatting)
   - `prettier-plugin-organize-imports`
