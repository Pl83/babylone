// BIP39 mnemonic seed phrase logic.
//
// Standard reference: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
//
// Pipeline (generate):
//   entropy (128 or 256 bits) -> checksum (first ENT/32 bits of SHA-256(entropy))
//   -> entropy bits + checksum bits -> split into 11-bit groups
//   -> indices into WORDLIST -> mnemonic words.
//
// All functions are async because they use the Web Crypto SubtleCrypto API.

import { WORDLIST } from './bip39-wordlist';

export interface GenerateResult {
	phrase: string; // space-joined words
	words: string[];
	entropyHex: string;
	checksumBits: string; // e.g. "0110"
	indices: number[]; // 11-bit indices, for the entropy view
}

export interface ValidateResult {
	valid: boolean;
	entropyHex?: string; // present when valid
	reason?: string; // present when invalid (e.g. "unknown word: foo")
}

// --- byte / bit helpers -------------------------------------------------------

function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

function bytesToBits(bytes: Uint8Array): string {
	return Array.from(bytes)
		.map((b) => b.toString(2).padStart(8, '0'))
		.join('');
}

function bitsToBytes(bits: string): Uint8Array {
	const out = new Uint8Array(bits.length / 8);
	for (let i = 0; i < out.length; i++) {
		out[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
	}
	return out;
}

async function sha256(bytes: Uint8Array): Promise<Uint8Array> {
	// Uint8Array.from yields an ArrayBuffer-backed view (not ArrayBufferLike),
	// which satisfies the BufferSource type expected by SubtleCrypto.
	const data = Uint8Array.from(bytes);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return new Uint8Array(digest);
}

// First ENT/32 bits of SHA-256(entropy), as a bit string.
async function checksumBits(entropy: Uint8Array): Promise<string> {
	const hash = await sha256(entropy);
	const checksumLength = (entropy.length * 8) / 32; // 4 bits per 128, 8 per 256
	return bytesToBits(hash).slice(0, checksumLength);
}

// --- public API ---------------------------------------------------------------

export async function generate(words: 12 | 24): Promise<GenerateResult> {
	if (words !== 12 && words !== 24) {
		throw new Error('Word count must be 12 or 24');
	}
	const entropyBytes = words === 12 ? 16 : 32; // 128 or 256 bits
	const entropy = crypto.getRandomValues(new Uint8Array(entropyBytes));

	const cs = await checksumBits(entropy);
	const bits = bytesToBits(entropy) + cs;

	const indices: number[] = [];
	for (let i = 0; i < bits.length; i += 11) {
		indices.push(parseInt(bits.slice(i, i + 11), 2));
	}
	const wordList = indices.map((i) => WORDLIST[i]);

	return {
		phrase: wordList.join(' '),
		words: wordList,
		entropyHex: bytesToHex(entropy),
		checksumBits: cs,
		indices
	};
}

export async function validate(phrase: string): Promise<ValidateResult> {
	const words = phrase.trim().toLowerCase().split(/\s+/).filter(Boolean);

	if (words.length !== 12 && words.length !== 24) {
		return { valid: false, reason: `Expected 12 or 24 words, got ${words.length}` };
	}

	const indices: number[] = [];
	for (const word of words) {
		const index = WORDLIST.indexOf(word);
		if (index === -1) {
			return { valid: false, reason: `Unknown word: ${word}` };
		}
		indices.push(index);
	}

	const bits = indices.map((i) => i.toString(2).padStart(11, '0')).join('');
	const checksumLength = bits.length / 33; // total = ENT + ENT/32 = ENT * 33/32
	const entropyBits = bits.slice(0, bits.length - checksumLength);
	const providedChecksum = bits.slice(bits.length - checksumLength);

	const entropy = bitsToBytes(entropyBits);
	const expectedChecksum = await checksumBits(entropy);

	if (providedChecksum !== expectedChecksum) {
		return { valid: false, reason: 'Invalid checksum' };
	}

	return { valid: true, entropyHex: bytesToHex(entropy) };
}

export async function mnemonicToSeed(phrase: string, passphrase = ''): Promise<string> {
	const encoder = new TextEncoder();
	const password = encoder.encode(phrase.normalize('NFKD'));
	const salt = encoder.encode(('mnemonic' + passphrase).normalize('NFKD'));

	const key = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, ['deriveBits']);
	const seed = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', hash: 'SHA-512', salt, iterations: 2048 },
		key,
		512
	);

	return bytesToHex(new Uint8Array(seed));
}
