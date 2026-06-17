<script lang="ts">
	import { generate, validate, mnemonicToSeed } from '$lib/ciphers/bip39';
	import type { GenerateResult, ValidateResult } from '$lib/ciphers/bip39';

	// --- generate panel ---
	let length = $state<12 | 24>(12);
	let result = $state<GenerateResult | null>(null);
	let genError = $state('');
	let showEntropy = $state(false);
	let copied = $state(false);

	let passphrase = $state('');
	let seedHex = $state('');
	let seedError = $state('');

	// --- validate panel ---
	let validateInput = $state('');
	let validateResult = $state<ValidateResult | null>(null);
	let validateError = $state('');

	async function handleGenerate() {
		genError = '';
		seedHex = '';
		copied = false;
		try {
			result = await generate(length);
		} catch (e) {
			result = null;
			genError = (e as Error).message;
		}
	}

	async function handleCopy() {
		if (!result) return;
		try {
			await navigator.clipboard.writeText(result.phrase);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			genError = 'Clipboard unavailable in this context';
		}
	}

	async function handleDeriveSeed() {
		seedError = '';
		if (!result) return;
		try {
			seedHex = await mnemonicToSeed(result.phrase, passphrase);
		} catch (e) {
			seedHex = '';
			seedError = (e as Error).message;
		}
	}

	async function handleValidate() {
		validateError = '';
		validateResult = null;
		try {
			validateResult = await validate(validateInput);
		} catch (e) {
			validateError = (e as Error).message;
		}
	}
</script>

<div class="seed-warning">
	⚠ Educational only. A seed phrase generated in a web page is NOT secure. Never use it to store real
	funds.
</div>

<div class="cryptage">
	<section>
		<div>
			<p class="field-label">Generate a mnemonic</p>
			<div class="length-toggle">
				<button class:active={length === 12} onclick={() => (length = 12)}>12 words</button>
				<button class:active={length === 24} onclick={() => (length = 24)}>24 words</button>
			</div>
			<button class="primary" onclick={handleGenerate}>▶ Generate</button>
		</div>
		<div>
			<p class="field-label">Seed phrase</p>
			{#if genError}
				<p class="error-msg">{genError}</p>
			{:else if result}
				<div class="word-grid">
					{#each result.words as word, i}
						<div class="word-chip">
							<span class="word-num">{i + 1}</span>
							<span class="word-text">{word}</span>
						</div>
					{/each}
				</div>
				<button class="copy-btn" onclick={handleCopy}>{copied ? '✓ Copied' : '⧉ Copy phrase'}</button>
			{:else}
				<div class="word-grid word-empty"></div>
			{/if}
		</div>
	</section>

	{#if result}
		<div class="entropy-wrap">
			<button class="link-btn" onclick={() => (showEntropy = !showEntropy)}>
				{showEntropy ? '▼' : '▶'} Entropy view
			</button>
			{#if showEntropy}
				<div class="entropy-box">
					<p><span class="k">Entropy (hex):</span> <code>{result.entropyHex}</code></p>
					<p><span class="k">Checksum bits:</span> <code>{result.checksumBits}</code></p>
					<table class="entropy-table">
						<thead>
							<tr><th>#</th><th>index</th><th>11-bit</th><th>word</th></tr>
						</thead>
						<tbody>
							{#each result.indices as idx, i}
								<tr>
									<td>{i + 1}</td>
									<td>{idx}</td>
									<td><code>{idx.toString(2).padStart(11, '0')}</code></td>
									<td>{result.words[i]}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>

		<div class="seed-derive">
			<p class="field-label">Derive 512-bit seed (PBKDF2-HMAC-SHA512)</p>
			<input
				class="key-input"
				type="text"
				placeholder="Optional passphrase (BIP39 25th word)"
				bind:value={passphrase}
			/>
			<button onclick={handleDeriveSeed}>Derive seed</button>
			{#if seedError}
				<p class="error-msg">{seedError}</p>
			{:else if seedHex}
				<code class="seed-output">{seedHex}</code>
			{/if}
		</div>
	{/if}
</div>

<br />
<hr />
<br />

<div class="decryptage">
	<section>
		<div>
			<p class="field-label">Validate / decode a phrase</p>
			<textarea bind:value={validateInput} placeholder="Paste a 12- or 24-word phrase..."></textarea>
			<button onclick={handleValidate}>▶ Validate</button>
		</div>
		<div>
			<p class="field-label">Result</p>
			{#if validateError}
				<p class="error-msg">{validateError}</p>
			{:else if validateResult}
				{#if validateResult.valid}
					<p class="valid-msg">✓ Valid phrase</p>
					<p><span class="k">Recovered entropy:</span> <code>{validateResult.entropyHex}</code></p>
				{:else}
					<p class="error-msg">✗ Invalid — {validateResult.reason}</p>
				{/if}
			{:else}
				<div class="word-grid word-empty"></div>
			{/if}
		</div>
	</section>
</div>

<style>
	.seed-warning {
		border: 1px solid var(--accent);
		background: var(--surface-2);
		color: var(--text);
		padding: 12px 14px;
		margin-bottom: 18px;
		font-size: 0.9rem;
		line-height: 1.4;
	}
	.field-label {
		margin-bottom: 4px;
		color: var(--text-dim);
		font-size: 0.85rem;
		letter-spacing: 1px;
	}
	.length-toggle {
		display: flex;
		gap: 8px;
		margin-bottom: 10px;
	}
	.length-toggle button {
		flex: 1;
		opacity: 0.6;
	}
	.length-toggle button.active {
		opacity: 1;
		border-color: var(--accent);
		color: var(--accent);
	}
	.word-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		padding: 12px;
		background: var(--surface-2);
		border: 1px solid var(--text-dim);
		min-height: 68px;
		margin-top: 8px;
	}
	.word-empty {
		opacity: 0.3;
	}
	.word-chip {
		display: flex;
		align-items: baseline;
		gap: 6px;
		background: var(--surface);
		border: 1px solid var(--text-dim);
		padding: 4px 8px;
	}
	.word-num {
		color: var(--text-dim);
		font-size: 0.75rem;
		min-width: 18px;
	}
	.word-text {
		color: var(--text);
		font-family: 'VT323', monospace;
		font-size: 1.05rem;
	}
	.copy-btn {
		margin-top: 8px;
	}
	.entropy-wrap {
		margin-top: 16px;
	}
	.link-btn {
		background: none;
		border: none;
		color: var(--accent);
		cursor: pointer;
		padding: 0;
		font-family: 'VT323', monospace;
		font-size: 1rem;
		letter-spacing: 1px;
	}
	.entropy-box {
		margin-top: 10px;
		padding: 12px;
		background: var(--surface);
		border: 1px solid var(--text-dim);
		overflow-x: auto;
	}
	.entropy-box .k {
		color: var(--text-dim);
	}
	.entropy-box code {
		color: var(--accent);
		word-break: break-all;
	}
	.entropy-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 10px;
		font-size: 0.85rem;
	}
	.entropy-table th,
	.entropy-table td {
		text-align: left;
		padding: 2px 8px 2px 0;
		color: var(--text);
	}
	.entropy-table th {
		color: var(--text-dim);
		border-bottom: 1px solid var(--text-dim);
	}
	.entropy-table code {
		color: var(--accent);
	}
	.seed-derive {
		margin-top: 16px;
	}
	.seed-output {
		display: block;
		margin-top: 8px;
		padding: 10px;
		background: var(--surface);
		border: 1px solid var(--text-dim);
		color: var(--accent);
		word-break: break-all;
		font-size: 0.85rem;
	}
	.valid-msg {
		color: var(--accent);
	}
	.k {
		color: var(--text-dim);
	}
</style>
