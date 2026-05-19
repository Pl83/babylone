export function encrypt(text: string, shift: number): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (isNaN(shift)) throw new Error('Le décalage doit être un nombre');
	return text.toUpperCase().split('').map(char => {
		if (/[A-Z]/.test(char)) {
			return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
		}
		return char;
	}).join('');
}

export function decrypt(text: string, shift: number): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (isNaN(shift)) throw new Error('Le décalage doit être un nombre');
	const normalizedShift = ((shift % 26) + 26) % 26;
	return text.toUpperCase().split('').map(char => {
		if (/[A-Z]/.test(char)) {
			return String.fromCharCode(((char.charCodeAt(0) - 65 - normalizedShift + 26) % 26) + 65);
		}
		return char;
	}).join('');
}
