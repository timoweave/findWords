export interface Signature {
    text: string;
    spectrum: Record<string, number> | null;
}

export function makeSpectrum(input: string): Record<string, number> | null {
    const spectrum = input
        .split('') // split into characters
        .reduce<Record<string, number>>((acc, word) => {
            if (acc[word] == null) {
                acc[word] = 0;
            }
            acc[word]++; // count the number of times the character appears
            return acc;
        }, {});
    const hasNoKey = Object.keys(spectrum).length === 0;
    return hasNoKey ? null : spectrum;
}

export function doesSpectrumCover(
    big: Record<string, number> | null,
    small: Record<string, number> | null,
): boolean {
    if (big == null) {
        throw new Error(`Invalid first input: ${big}`);
    }
    if (small == null) {
        throw new Error(`Invalid second input: ${small}`);
    }

    const isSubset = Object.entries(small).every(([key, value]) => {
        if (big[key] == null) {
            return false;
        }

        return big[key] >= value;
    });

    return (
        isSubset &&
        Object.entries(small).length > 0 &&
        Object.entries(big).length > 0
    );
}

export function findWords(inputString: string, dictionary: string[]): string[] {
    const inputSpectrum = makeSpectrum(inputString);
    if (inputSpectrum == null) {
        return dictionary;
    }

    const inputSpectrumCoveredStrings = dictionary
        .map<Signature>((dictionaryEntry) => ({
            text: dictionaryEntry,
            spectrum: makeSpectrum(dictionaryEntry),
        }))
        .filter(
            (dictionarySignature) =>
                dictionarySignature.spectrum != null &&
                doesSpectrumCover(inputSpectrum, dictionarySignature.spectrum),
        )
        .map<string>((dictionarySignature) => dictionarySignature.text);

    return inputSpectrumCoveredStrings;
}
