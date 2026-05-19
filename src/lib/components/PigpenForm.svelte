<script lang="ts">
	import { encrypt, TABLE } from '$lib/ciphers/pigpen';
	import type { PigpenSymbol } from '$lib/ciphers/pigpen';

	let inputText = $state('');
	let symbols = $state<PigpenSymbol[]>([]);
	let error = $state('');

	function getPath(sym: PigpenSymbol): string {
		const paths: string[] = [];
		if (sym.lines.includes('top'))    paths.push('M 2,2 L 22,2');
		if (sym.lines.includes('bottom')) paths.push('M 2,22 L 22,22');
		if (sym.lines.includes('left'))   paths.push('M 2,2 L 2,22');
		if (sym.lines.includes('right'))  paths.push('M 22,2 L 22,22');
		if (sym.lines.includes('tl'))     paths.push('M 2,2 L 12,12');
		if (sym.lines.includes('tr'))     paths.push('M 22,2 L 12,12');
		if (sym.lines.includes('bl'))     paths.push('M 2,22 L 12,12');
		if (sym.lines.includes('br'))     paths.push('M 22,22 L 12,12');
		return paths.join(' ');
	}

	function handleEncrypt() {
		try {
			error = '';
			symbols = encrypt(inputText);
		} catch (e) {
			error = (e as Error).message;
			symbols = [];
		}
	}
</script>

<div class="cryptage">
	<section>
		<div>
			<p class="field-label">Message</p>
			<textarea bind:value={inputText} placeholder="Enter text (A–Z and spaces)..."></textarea>
			<button onclick={handleEncrypt}>▶ Encrypt</button>
		</div>
		<div>
			<p class="field-label">Pigpen Symbols</p>
			{#if error}
				<p class="error-msg">{error}</p>
			{:else if symbols.length > 0}
				<div class="pigpen-output">
					{#each symbols as sym}
						{#if sym.char === ' '}
							<div class="pigpen-space"></div>
						{:else}
							<div class="pigpen-cell" title={sym.char}>
								<svg viewBox="0 0 24 24" width="36" height="36">
									<path d={getPath(sym)} stroke="var(--text)" stroke-width="2" fill="none" stroke-linecap="square" />
									{#if sym.dot}
										<circle cx="12" cy="12" r="2.5" fill="var(--text)" />
									{/if}
								</svg>
							</div>
						{/if}
					{/each}
				</div>
			{:else}
				<div class="pigpen-output pigpen-empty"></div>
			{/if}
		</div>
	</section>
</div>

<div class="pigpen-reference-wrap">
	<h4>[REFERENCE CHART]</h4>
	<div class="pigpen-reference">
		{#each Object.entries(TABLE) as [letter, sym]}
			<div class="pigpen-ref-cell">
				<svg viewBox="0 0 24 24" width="28" height="28">
					<path d={getPath(sym)} stroke="var(--text)" stroke-width="2" fill="none" stroke-linecap="square" />
					{#if sym.dot}
						<circle cx="12" cy="12" r="2.5" fill="var(--text)" />
					{/if}
				</svg>
				<span class="ref-letter">{letter}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.pigpen-output {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		padding: 12px;
		background: var(--surface-2);
		border: 1px solid var(--text-dim);
		min-height: 68px;
		margin-top: 8px;
	}
	.field-label {
		margin-bottom: 4px;
		color: var(--text-dim);
		font-size: 0.85rem;
		letter-spacing: 1px;
	}
	.pigpen-empty {
		opacity: 0.3;
	}
	.pigpen-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
	}
	.pigpen-space {
		width: 16px;
	}
	.pigpen-reference-wrap {
		margin-top: 28px;
	}
	.pigpen-reference-wrap h4 {
		font-family: 'VT323', monospace;
		color: var(--accent);
		font-size: 1.1rem;
		letter-spacing: 2px;
		margin-bottom: 10px;
	}
	.pigpen-reference {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		gap: 8px;
		background: var(--surface);
		border: 1px solid var(--text-dim);
		padding: 14px;
	}
	.pigpen-ref-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}
	.ref-letter {
		font-family: 'VT323', monospace;
		font-size: 14px;
		color: var(--accent);
	}
</style>
