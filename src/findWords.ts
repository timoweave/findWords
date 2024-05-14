export interface DictionarySignature {
    text: string;
    signature: Record<string, number> | null;
}

export function makeSignature(input: string): Record<string, number> | null {
    const signature = input
        .replace(/[ \t\n\r]*/g, '') // strip spaces
        .split('') // split into characters
        .reduce<Record<string, number>>((acc, word) => {
            if (acc[word] == null) {
                acc[word] = 0;
            }
            acc[word]++; // count the number of times the character appears
            return acc;
        }, {});
    const hasNoKey = Object.keys(signature).length === 0;
    return hasNoKey ? null : signature;
}

export function doesSignatureCover(
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
    const inputSignature = makeSignature(inputString);
    if (inputSignature == null) {
        return dictionary;
    }

    const coveredStrings = dictionary
        .map<DictionarySignature>((dictionaryEntry) => ({
            text: dictionaryEntry,
            signature: makeSignature(dictionaryEntry),
        }))
        .filter(
            (item) =>
                item.signature != null &&
                doesSignatureCover(inputSignature, item.signature),
        )
        .map<string>((item) => item.text);

    return coveredStrings;
}
