function toBase64(input: string): string {
	return btoa(unescape(encodeURIComponent(input)));
}

function fromBase64(input: string): string {
	return decodeURIComponent(escape(atob(input)));
}

export function encrypt(text: string): { result: string; key: string } {
	if (!text) throw new Error('Le message ne doit pas être vide');
	let randomKey = '';
	const encrypted = text.split('').map(char => {
		const keyChar = Math.floor(Math.random() * 256);
		randomKey += String.fromCharCode(keyChar);
		return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
	});
	return {
		result: toBase64(encrypted.join('')),
		key: toBase64(randomKey)
	};
}

export function decrypt(text: string, key: string): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (!key) throw new Error('La clé ne doit pas être vide');
	const chars = fromBase64(text).split('');
	const decodedKey = fromBase64(key);
	if (decodedKey.length !== chars.length) {
		throw new Error('La clé ne correspond pas à la longueur du texte chiffré');
	}
	return chars.map((char, i) =>
		String.fromCharCode(char.charCodeAt(0) ^ decodedKey.charCodeAt(i))
	).join('');
}
