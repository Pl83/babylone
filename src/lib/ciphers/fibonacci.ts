const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function fibo(length: number): number[] {
	const key = [0];
	let a = 0, b = 1;
	for (let i = 1; i < length; i++) {
		key.push(b);
		[a, b] = [b, a + b];
	}
	return key;
}

function normalize(char: string): string {
	if ('éèêë'.includes(char)) return 'e';
	if ('àâä'.includes(char)) return 'a';
	if ('ùûü'.includes(char)) return 'u';
	if ('îï'.includes(char)) return 'i';
	if ('ôö'.includes(char)) return 'o';
	if (char === 'ç') return 'c';
	return char;
}

export function encrypt(text: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	const chars = text.split('');
	const key = fibo(chars.length);
	return chars.map((c, i) => {
		const norm = normalize(c);
		const isUpperCase = norm === norm.toUpperCase();
		const index = alphabet.indexOf(norm.toLowerCase());
		if (index === -1) return norm;
		const encryptedIndex = (index + key[i]) % 26;
		return isUpperCase ? alphabet[encryptedIndex].toUpperCase() : alphabet[encryptedIndex];
	}).join('');
}

export function decrypt(text: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	const chars = text.split('');
	const key = fibo(chars.length);
	return chars.map((c, i) => {
		const norm = normalize(c);
		const isUpperCase = norm === norm.toUpperCase();
		const index = alphabet.indexOf(norm.toLowerCase());
		if (index === -1) return norm;
		const decryptedIndex = ((index - key[i]) % 26 + 26) % 26;
		return isUpperCase ? alphabet[decryptedIndex].toUpperCase() : alphabet[decryptedIndex];
	}).join('');
}
