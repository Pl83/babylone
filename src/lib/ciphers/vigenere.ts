const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function encrypt(text: string, key: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (!key) throw new Error('La clé ne doit pas être vide');
	let keyIndex = 0;
	return text.split('').map(char => {
		const isUpperCase = char === char.toUpperCase();
		const index = alphabet.indexOf(char.toLowerCase());
		if (index === -1) return char;
		const keyChar = key[keyIndex % key.length];
		const keyPos = alphabet.indexOf(keyChar.toLowerCase());
		const newIndex = (index + keyPos) % alphabet.length;
		keyIndex++;
		return isUpperCase ? alphabet[newIndex].toUpperCase() : alphabet[newIndex];
	}).join('');
}

export function decrypt(text: string, key: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (!key) throw new Error('La clé ne doit pas être vide');
	let keyIndex = 0;
	return text.split('').map(char => {
		const isUpperCase = char === char.toUpperCase();
		const index = alphabet.indexOf(char.toLowerCase());
		if (index === -1) return char;
		const keyChar = key[keyIndex % key.length];
		const keyPos = alphabet.indexOf(keyChar.toLowerCase());
		const newIndex = (index - keyPos + alphabet.length) % alphabet.length;
		keyIndex++;
		return isUpperCase ? alphabet[newIndex].toUpperCase() : alphabet[newIndex];
	}).join('');
}
