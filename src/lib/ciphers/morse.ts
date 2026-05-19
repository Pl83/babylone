const table = [
	{ char: 'A', code: '.-' }, { char: 'B', code: '-...' }, { char: 'C', code: '-.-.' },
	{ char: 'D', code: '-..' }, { char: 'E', code: '.' }, { char: 'F', code: '..-.' },
	{ char: 'G', code: '--.' }, { char: 'H', code: '....' }, { char: 'I', code: '..' },
	{ char: 'J', code: '.---' }, { char: 'K', code: '-.-' }, { char: 'L', code: '.-..' },
	{ char: 'M', code: '--' }, { char: 'N', code: '-.' }, { char: 'O', code: '---' },
	{ char: 'P', code: '.--.' }, { char: 'Q', code: '--.-' }, { char: 'R', code: '.-.' },
	{ char: 'S', code: '...' }, { char: 'T', code: '-' }, { char: 'U', code: '..-' },
	{ char: 'V', code: '...-' }, { char: 'W', code: '.--' }, { char: 'X', code: '-..-' },
	{ char: 'Y', code: '-.--' }, { char: 'Z', code: '--..' },
	{ char: '1', code: '.----' }, { char: '2', code: '..---' }, { char: '3', code: '...--' },
	{ char: '4', code: '....-' }, { char: '5', code: '.....' }, { char: '6', code: '-....' },
	{ char: '7', code: '--...' }, { char: '8', code: '---..' }, { char: '9', code: '----.' },
	{ char: '0', code: '-----' }, { char: ' ', code: '/' },
	{ char: '.', code: '.-.-.-' }, { char: ',', code: '--..--' },
	{ char: '?', code: '..--..' }, { char: '!', code: '-.-.--' }
];

export function encrypt(text: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	const chars = text.split('');
	const unsupported = chars.find(c => !table.some(item => item.char === c.toUpperCase()));
	if (unsupported) throw new Error(`Caractère non supporté : "${unsupported}"`);
	return chars.map(c => {
		const entry = table.find(item => item.char === c.toUpperCase());
		return entry ? entry.code : c;
	}).join(' ');
}

export function decrypt(text: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	const codes = text.split(' ');
	const unsupported = codes.find(code => !table.some(item => item.code === code));
	if (unsupported) throw new Error(`Code non supporté : "${unsupported}"`);
	return codes.map(code => {
		const entry = table.find(item => item.code === code);
		return entry ? entry.char : code;
	}).join('');
}
