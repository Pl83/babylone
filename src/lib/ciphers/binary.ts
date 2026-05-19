const alphabetBinaire = [
	{ lettre: 'A', binaire: '01000001' }, { lettre: 'B', binaire: '01000010' },
	{ lettre: 'C', binaire: '01000011' }, { lettre: 'D', binaire: '01000100' },
	{ lettre: 'E', binaire: '01000101' }, { lettre: 'F', binaire: '01000110' },
	{ lettre: 'G', binaire: '01000111' }, { lettre: 'H', binaire: '01001000' },
	{ lettre: 'I', binaire: '01001001' }, { lettre: 'J', binaire: '01001010' },
	{ lettre: 'K', binaire: '01001011' }, { lettre: 'L', binaire: '01001100' },
	{ lettre: 'M', binaire: '01001101' }, { lettre: 'N', binaire: '01001110' },
	{ lettre: 'O', binaire: '01001111' }, { lettre: 'P', binaire: '01010000' },
	{ lettre: 'Q', binaire: '01010001' }, { lettre: 'R', binaire: '01010010' },
	{ lettre: 'S', binaire: '01010011' }, { lettre: 'T', binaire: '01010100' },
	{ lettre: 'U', binaire: '01010101' }, { lettre: 'V', binaire: '01010110' },
	{ lettre: 'W', binaire: '01010111' }, { lettre: 'X', binaire: '01011000' },
	{ lettre: 'Y', binaire: '01011001' }, { lettre: 'Z', binaire: '01011010' },
	{ lettre: '?', binaire: '00111111' }, { lettre: ',', binaire: '00101100' },
	{ lettre: '.', binaire: '00101110' }, { lettre: '!', binaire: '00100001' },
	{ lettre: '-', binaire: '00101101' }, { lettre: ' ', binaire: '00100000' }
];

export function encrypt(text: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	const lettres = text.split('');
	const unsupported = lettres.find(l => !alphabetBinaire.some(item => item.lettre === l.toUpperCase()));
	if (unsupported) throw new Error(`Caractère non supporté : "${unsupported}"`);
	return lettres.map(l => {
		const item = alphabetBinaire.find(item => item.lettre === l.toUpperCase());
		return item ? item.binaire : l;
	}).join(' ');
}

export function decrypt(text: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	return text.trim().split(' ').map(code => {
		const item = alphabetBinaire.find(item => item.binaire === code);
		return item ? item.lettre : '?';
	}).join('');
}
