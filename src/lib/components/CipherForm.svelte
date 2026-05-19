<script lang="ts">
	type EncryptResult = string | { result: string; key: string };

	interface Props {
		encryptFn: (text: string, key?: string) => EncryptResult;
		decryptFn: (text: string, key?: string) => string;
		needsEncryptKey?: boolean;
		needsDecryptKey?: boolean;
		encryptKeyLabel?: string;
		decryptKeyLabel?: string;
		encryptKeyType?: 'text' | 'number';
		decryptKeyType?: 'text' | 'number';
		showGeneratedKey?: boolean;
	}

	let {
		encryptFn,
		decryptFn,
		needsEncryptKey = false,
		needsDecryptKey = false,
		encryptKeyLabel = 'Clé',
		decryptKeyLabel = 'Clé',
		encryptKeyType = 'text',
		decryptKeyType = 'text',
		showGeneratedKey = false
	}: Props = $props();

	let encryptInput = $state('');
	let encryptOutput = $state('');
	let encryptKey = $state('');
	let generatedKey = $state('');
	let encryptError = $state('');

	let decryptInput = $state('');
	let decryptOutput = $state('');
	let decryptKey = $state('');
	let decryptError = $state('');

	function handleEncrypt() {
		encryptError = '';
		generatedKey = '';
		try {
			const result = encryptFn(encryptInput, encryptKey || undefined);
			if (typeof result === 'string') {
				encryptOutput = result;
			} else {
				encryptOutput = result.result;
				generatedKey = result.key;
			}
		} catch (e) {
			encryptError = e instanceof Error ? e.message : 'Erreur inconnue';
		}
	}

	function handleDecrypt() {
		decryptError = '';
		try {
			decryptOutput = decryptFn(decryptInput, decryptKey || undefined);
		} catch (e) {
			decryptError = e instanceof Error ? e.message : 'Erreur inconnue';
		}
	}
</script>

<section class="cryptage">
	<section>
		<div>
			<label for="encryptInput">Ecrit ton message ici :</label>
			{#if needsEncryptKey}
				<input
					class="key-input"
					type={encryptKeyType}
					placeholder={encryptKeyLabel}
					bind:value={encryptKey}
				/>
			{/if}
			<textarea id="encryptInput" placeholder="Ton message" bind:value={encryptInput}></textarea>
		</div>
		<div>
			<p>Ton message encrypter :</p>
			<textarea placeholder="Résultat encrypter" disabled value={encryptOutput}></textarea>
			{#if showGeneratedKey && generatedKey}
				<p class="generated-key">
					Clé secrète (usage unique) :
					<code>{generatedKey}</code>
				</p>
			{/if}
		</div>
	</section>
	{#if encryptError}
		<p class="error-msg">{encryptError}</p>
	{/if}
	<button onclick={handleEncrypt}>Encrypter</button>
</section>

<br />
<hr />
<br />

<section class="decryptage">
	<section>
		<div>
			<label for="decryptInput">Ecrit ton message secret ici :</label>
			{#if needsDecryptKey}
				<input
					class="key-input"
					type={decryptKeyType}
					placeholder={decryptKeyLabel}
					bind:value={decryptKey}
				/>
			{/if}
			<textarea id="decryptInput" placeholder="Ton message encrypter" bind:value={decryptInput}></textarea>
		</div>
		<div>
			<p>Ton message décrypter :</p>
			<textarea placeholder="Résultat décrypter" disabled value={decryptOutput}></textarea>
		</div>
	</section>
	{#if decryptError}
		<p class="error-msg">{decryptError}</p>
	{/if}
	<button onclick={handleDecrypt}>Décrypter</button>
</section>
