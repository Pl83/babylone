import { describe, it, expect } from 'vitest';
import { generate, validate, mnemonicToSeed } from './bip39';

// Official BIP39 English test vectors (Trezor), passphrase "TREZOR".
// https://github.com/trezor/python-mnemonic/blob/master/vectors.json

const ZERO_128 = '00000000000000000000000000000000';
const ZERO_128_PHRASE =
	'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const ZERO_128_SEED =
	'c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04';

const ZERO_256 =
	'0000000000000000000000000000000000000000000000000000000000000000';
const ZERO_256_PHRASE =
	'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';

const LEGAL_PHRASE =
	'legal winner thank year wave sausage worth useful legal winner thank yellow';
const LEGAL_ENTROPY = '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f';
const LEGAL_SEED =
	'2e8905819b8723fe2c1d161860e5ee1830318dbf49a83bd451cfb8440c28bd6fa457fe1296106559a3c80937a1c1069be3a3a5bd381ee6260e8d9739fce1f607';

describe('validate (mnemonic -> entropy)', () => {
	it('recovers all-zero 128-bit entropy', async () => {
		const r = await validate(ZERO_128_PHRASE);
		expect(r.valid).toBe(true);
		expect(r.entropyHex).toBe(ZERO_128);
	});

	it('recovers all-zero 256-bit entropy (24 words ending in "art")', async () => {
		const r = await validate(ZERO_256_PHRASE);
		expect(r.valid).toBe(true);
		expect(r.entropyHex).toBe(ZERO_256);
	});

	it('recovers a mixed 128-bit vector', async () => {
		const r = await validate(LEGAL_PHRASE);
		expect(r.valid).toBe(true);
		expect(r.entropyHex).toBe(LEGAL_ENTROPY);
	});

	it('rejects an unknown word', async () => {
		const r = await validate(ZERO_128_PHRASE.replace(/about$/, 'notaword'));
		expect(r.valid).toBe(false);
		expect(r.reason).toMatch(/unknown word/i);
	});

	it('rejects a wrong word count', async () => {
		const r = await validate('abandon abandon abandon');
		expect(r.valid).toBe(false);
	});

	it('rejects a bad checksum (single-word tamper)', async () => {
		// Swap the final word for another valid wordlist entry -> checksum breaks.
		const tampered = ZERO_128_PHRASE.replace(/about$/, 'zoo');
		const r = await validate(tampered);
		expect(r.valid).toBe(false);
		expect(r.reason).toMatch(/checksum/i);
	});
});

describe('mnemonicToSeed (PBKDF2-HMAC-SHA512, "TREZOR")', () => {
	it('derives the seed for the all-zero 128-bit vector', async () => {
		expect(await mnemonicToSeed(ZERO_128_PHRASE, 'TREZOR')).toBe(ZERO_128_SEED);
	});

	it('derives the seed for the legal-winner vector', async () => {
		expect(await mnemonicToSeed(LEGAL_PHRASE, 'TREZOR')).toBe(LEGAL_SEED);
	});
});

describe('generate', () => {
	it('produces 12 valid words with 128-bit entropy', async () => {
		const r = await generate(12);
		expect(r.words).toHaveLength(12);
		expect(r.entropyHex).toHaveLength(32); // 16 bytes
		expect(r.checksumBits).toHaveLength(4);
		expect(r.indices.every((i) => i >= 0 && i < 2048)).toBe(true);
		expect((await validate(r.phrase)).valid).toBe(true);
	});

	it('produces 24 valid words with 256-bit entropy', async () => {
		const r = await generate(24);
		expect(r.words).toHaveLength(24);
		expect(r.entropyHex).toHaveLength(64); // 32 bytes
		expect(r.checksumBits).toHaveLength(8);
		expect((await validate(r.phrase)).valid).toBe(true);
	});

	it('round-trips: a generated phrase validates back to its own entropy', async () => {
		const r = await generate(12);
		const v = await validate(r.phrase);
		expect(v.valid).toBe(true);
		expect(v.entropyHex).toBe(r.entropyHex);
	});
});
