type Line = 'top' | 'bottom' | 'left' | 'right' | 'tl' | 'tr' | 'bl' | 'br';

export type PigpenSymbol = {
	lines: Line[];
	dot: boolean;
	char: string;
};

export const TABLE: Record<string, PigpenSymbol> = {
	'A': { lines: ['bottom', 'right'],               dot: false, char: 'A' },
	'B': { lines: ['bottom', 'left', 'right'],        dot: false, char: 'B' },
	'C': { lines: ['bottom', 'left'],                 dot: false, char: 'C' },
	'D': { lines: ['top', 'bottom', 'right'],         dot: false, char: 'D' },
	'E': { lines: ['top', 'bottom', 'left', 'right'], dot: false, char: 'E' },
	'F': { lines: ['top', 'bottom', 'left'],          dot: false, char: 'F' },
	'G': { lines: ['top', 'right'],                   dot: false, char: 'G' },
	'H': { lines: ['top', 'left', 'right'],           dot: false, char: 'H' },
	'I': { lines: ['top', 'left'],                    dot: false, char: 'I' },
	'J': { lines: ['bottom', 'right'],               dot: true,  char: 'J' },
	'K': { lines: ['bottom', 'left', 'right'],        dot: true,  char: 'K' },
	'L': { lines: ['bottom', 'left'],                 dot: true,  char: 'L' },
	'M': { lines: ['top', 'bottom', 'right'],         dot: true,  char: 'M' },
	'N': { lines: ['top', 'bottom', 'left', 'right'], dot: true,  char: 'N' },
	'O': { lines: ['top', 'bottom', 'left'],          dot: true,  char: 'O' },
	'P': { lines: ['top', 'right'],                   dot: true,  char: 'P' },
	'Q': { lines: ['top', 'left', 'right'],           dot: true,  char: 'Q' },
	'R': { lines: ['top', 'left'],                    dot: true,  char: 'R' },
	'S': { lines: ['tl', 'bl'],                       dot: false, char: 'S' },
	'T': { lines: ['tl', 'tr'],                       dot: false, char: 'T' },
	'U': { lines: ['tr', 'br'],                       dot: false, char: 'U' },
	'V': { lines: ['bl', 'br'],                       dot: false, char: 'V' },
	'W': { lines: ['tl', 'bl'],                       dot: true,  char: 'W' },
	'X': { lines: ['tl', 'tr'],                       dot: true,  char: 'X' },
	'Y': { lines: ['tr', 'br'],                       dot: true,  char: 'Y' },
	'Z': { lines: ['bl', 'br'],                       dot: true,  char: 'Z' },
};

export function encrypt(text: string): PigpenSymbol[] {
	if (!text) throw new Error('Le message ne doit pas être vide');
	const upper = text.toUpperCase();
	return upper.split('').map(c => {
		if (c === ' ') return { lines: [], dot: false, char: ' ' };
		const sym = TABLE[c];
		if (!sym) throw new Error(`Unsupported character: "${c}" — only A–Z and spaces`);
		return sym;
	});
}
