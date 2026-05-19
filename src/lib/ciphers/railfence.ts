export function encrypt(text: string, rails: number): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (isNaN(rails) || rails < 2) throw new Error('Le nombre de rails doit être au moins 2');
	if (rails >= text.length) return text;

	const fence: string[][] = Array.from({ length: rails }, () => []);
	let rail = 0;
	let direction = 1;

	for (const char of text) {
		fence[rail].push(char);
		if (rail === 0) direction = 1;
		else if (rail === rails - 1) direction = -1;
		rail += direction;
	}

	return fence.map(row => row.join('')).join('');
}

export function decrypt(text: string, rails: number): string {
	if (!text) throw new Error('Le message ne doit pas être vide');
	if (isNaN(rails) || rails < 2) throw new Error('Le nombre de rails doit être au moins 2');
	if (rails >= text.length) return text;

	const n = text.length;
	const railIndex: number[] = new Array(n);
	let rail = 0;
	let direction = 1;
	for (let i = 0; i < n; i++) {
		railIndex[i] = rail;
		if (rail === 0) direction = 1;
		else if (rail === rails - 1) direction = -1;
		rail += direction;
	}

	const railLengths: number[] = new Array(rails).fill(0);
	for (const r of railIndex) railLengths[r]++;

	const railStart: number[] = new Array(rails).fill(0);
	for (let r = 1; r < rails; r++) {
		railStart[r] = railStart[r - 1] + railLengths[r - 1];
	}

	const railPos = [...railStart];
	const result: string[] = new Array(n);
	for (let i = 0; i < n; i++) {
		const r = railIndex[i];
		result[i] = text[railPos[r]];
		railPos[r]++;
	}

	return result.join('');
}
