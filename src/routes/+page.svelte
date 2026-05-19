<script lang="ts">
	import CipherForm from '$lib/components/CipherForm.svelte';
	import { encrypt as morseEncrypt, decrypt as morseDecrypt } from '$lib/ciphers/morse';
	import { encrypt as cesarEncrypt, decrypt as cesarDecrypt } from '$lib/ciphers/cesar';
	import { encrypt as vigenereEncrypt, decrypt as vigenereDecrypt } from '$lib/ciphers/vigenere';
	import { encrypt as fibEncrypt, decrypt as fibDecrypt } from '$lib/ciphers/fibonacci';
	import { encrypt as vernamEncrypt, decrypt as vernamDecrypt } from '$lib/ciphers/vernam';
	import { encrypt as binaryEncrypt, decrypt as binaryDecrypt } from '$lib/ciphers/binary';
	import { encrypt as railFenceEncrypt, decrypt as railFenceDecrypt } from '$lib/ciphers/railfence';
	import PigpenForm from '$lib/components/PigpenForm.svelte';

	const tabs = [
		{ id: 'Morse', label: 'Morse' },
		{ id: 'Cesar', label: 'Caesar' },
		{ id: 'Vigener', label: 'Vigenère' },
		{ id: 'Fibonaci', label: 'Fibonacci' },
		{ id: 'Vernam', label: 'Vernam' },
		{ id: 'Binaire', label: 'Binary' },
		{ id: 'RailFence', label: 'Rail Fence' },
		{ id: 'Pigpen', label: 'Pigpen' }
	];

	let activeTab = $state('Morse');
</script>

<svelte:head>
	<title>Verba Enigma</title>
</svelte:head>

<header>
	<div>
		<h1>Verba Enigma</h1>
		<p>Encryption &amp; Decryption</p>
	</div>
</header>

<main>
	<h2>Welcome to Verba Enigma</h2>
	<p>Dive into the fascinating world of cryptology, where secrets and enigmas intertwine. This educational and playful site invites you to explore classical encryption techniques, from messages coded in Morse to the subtleties of the Vigenère cipher, through binary and original methods such as shift encoding based on the Fibonacci sequence. Each tool is accompanied by explanations of its origin, how it works, and its uses, to initiate you into the art of encryption while having fun. Whether you are curious, a student, or an enthusiast, Verba Enigma is your portal to the world of codes and mysteries.</p>

	<div class="tab">
		{#each tabs as tab}
			<button
				class="tablinks"
				class:active={activeTab === tab.id}
				onclick={() => (activeTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	{#if activeTab === 'Morse'}
		<section class="tabcontent">
			<h2>Morse Code</h2>
			<h3>Origin</h3>
			<p>Morse code is a communication system invented by Samuel Morse and his collaborator Alfred Vail in the 1830s and 1840s, designed to facilitate the transmission of messages over the electric telegraph. Before the invention of the telephone, this system represented a major breakthrough by enabling rapid communication over long distances. Originally, Samuel Morse wanted a simple code that could be transmitted via electrical pulses, which could easily be interpreted as "beeps".</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>Morse code relies on a series of short and long signals, called dots and dashes, to represent the letters of the alphabet, digits, and certain special characters. A dot is a short signal, while a dash is a long signal. These signals are separated by pauses to form characters, and longer pauses separate words. For example, the letter "S" is represented by three dots (•••), while the letter "O" is formed by three dashes (–––), giving "SOS" for emergency messages.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>Morse code was long essential for telegraphy, then for radio communications in maritime and aeronautical contexts. It is still used today in certain applications, particularly in maritime rescue, where the famous "SOS" signal (••• ––– •••) is universally recognised. It is also used for training in coded transmissions in some armies and for emergency communications, as it can be transmitted by various methods: light signals, sounds, or even gestures, enabling communication in situations where other systems would be ineffective. Morse code thus remains a simple yet powerful tool, both in the history of telecommunications and in certain contemporary emergency communication uses.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm encryptFn={morseEncrypt} decryptFn={morseDecrypt} />
		</section>
	{/if}

	{#if activeTab === 'Cesar'}
		<section class="tabcontent">
			<h2>The Caesar Cipher</h2>
			<h3>Origin</h3>
			<p>The Caesar cipher, also known as the shift cipher, is a simple cryptographic method attributed to Julius Caesar, who is said to have used it to transmit confidential messages. This technique dates back to the Roman era, making it one of the oldest known encryption systems. Despite its simplicity, it marked a turning point in the history of cryptography by introducing the idea of systematic substitution.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>The Caesar cipher relies on the principle of shifting letters of the alphabet. The key is a number that indicates by how many positions each letter of the plaintext will be shifted. For example, with a key of 3, the letter "A" becomes "D", "B" becomes "E", and so on. Each letter of the message is replaced by a letter located a certain number of places further in the alphabet, according to the key. At the end of the alphabet, it wraps back to the beginning (making the cipher a circular system). The reverse process consists of moving each letter back by the same number of positions to recover the original text. For example, with a key of 3, the word "CHAT" becomes "FKDW". To decrypt it, simply move each letter back 3 positions.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>In Julius Caesar's time, this cipher was used to protect military communications. Although this system is extremely simple and easy to break today with modern tools such as frequency analysis, it remains an excellent starting point for understanding the fundamental concepts of cryptography. Today, the Caesar cipher is mainly used for educational purposes to illustrate the basics of substitution ciphers. It is also sometimes used in puzzles, games, or for coded messages in a playful way. The Caesar cipher, though rudimentary, is an emblematic example of human ingenuity in the quest for communication privacy. It paves the way for more complex and sophisticated cryptographic methods.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm
				encryptFn={(text, key) => cesarEncrypt(text, parseInt(key ?? '3'))}
				decryptFn={(text, key) => cesarDecrypt(text, parseInt(key ?? '3'))}
				needsEncryptKey={true}
				needsDecryptKey={true}
				encryptKeyLabel="Shift (number)"
				decryptKeyLabel="Shift (number)"
				encryptKeyType="number"
				decryptKeyType="number"
			/>
		</section>
	{/if}

	{#if activeTab === 'Vigener'}
		<section class="tabcontent">
			<h2>The Vigenère Cipher</h2>
			<h3>Origin</h3>
			<p>The Vigenère cipher is a classical cryptographic method developed in the 16th century by French diplomat Blaise de Vigenère. This technique, considered an improvement on the Caesar cipher, was revolutionary for its time, as it made coded messages much harder to decipher without the appropriate key. It was long nicknamed the "unbreakable cipher" before more advanced cryptanalytic methods emerged.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>The Vigenère cipher relies on a key, which is a word or phrase, and uses a table called the Vigenère square. This table is an alphabetical grid where each row represents a shifted version of the alphabet. The key is repeated as many times as needed to match the length of the message to be encrypted. Each letter of the message is shifted in the alphabet according to the corresponding letter of the key. For example, if the key is "BAC", the shift for the first letter will be 1 (B being the second letter of the alphabet), for the second it will be 0 (A = no shift), and for the third it will be 2 (C = third letter). The reverse process is used to recover the original message, given knowledge of the key.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>The Vigenère cipher was widely used between the 16th and 19th centuries, particularly in military and diplomatic correspondence. Its simplicity and relative security made it a popular choice before the advent of cryptographic machines such as Enigma. Although this cipher is now vulnerable to modern cryptographic attacks such as frequency analysis, it remains an important educational tool for learning the basics of cryptography and polyalphabetic ciphers. Furthermore, modern variants based on the same principle are used in computer security systems for less sensitive tasks. The Vigenère cipher beautifully illustrates the evolution of cryptography and its importance in protecting sensitive information across the centuries.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm
				encryptFn={(text, key) => vigenereEncrypt(text, key ?? '')}
				decryptFn={(text, key) => vigenereDecrypt(text, key ?? '')}
				needsEncryptKey={true}
				needsDecryptKey={true}
				encryptKeyLabel="Key (word)"
				decryptKeyLabel="Key (word)"
			/>
		</section>
	{/if}

	{#if activeTab === 'Fibonaci'}
		<section class="tabcontent">
			<h2>The Fibonacci Sequence</h2>
			<h3>Origin</h3>
			<p>The Fibonacci sequence takes its name from Leonardo Fibonacci, an Italian mathematician of the 13th century. It appears in his famous work, Liber Abaci (1202), where Fibonacci uses this sequence to solve a problem of rabbit reproduction. Although this mathematician popularised it in the West, similar forms of this sequence already existed in older Indian mathematical texts. The sequence is defined simply: each number is the sum of the two preceding ones, starting with 0 and 1.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>Each new term results from the addition of the two preceding ones, generating rapid growth. This self-replication property mirrors natural growth patterns, which explains why this sequence appears in various biological contexts. Mathematically, this is written: F(n) = F(n−1) + F(n−2), with F(0) = 0 and F(1) = 1. The first terms are: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, …</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>The Fibonacci sequence is used in several fields. Nature: It can be found in natural phenomena such as the spirals of snail shells, the arrangement of sunflower seeds or pine cones, and the structure of spiral galaxies. Architecture and art: Linked to the golden ratio (φ), an approximate value of 1.618 obtained by the ratio between two consecutive terms of the sequence, it inspires harmonious proportions in painting, architecture, and design. Computer science: It is used to optimise algorithms, such as searches in binary trees or data compression. Finance: Traders use retracements based on the golden ratio to predict support and resistance levels. Biological modelling: The sequence is useful for modelling population growth, organic structures, or even DNA. Here: On this site, the Fibonacci sequence is used to perform a shift cipher with a unique shift applied to each letter.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm encryptFn={fibEncrypt} decryptFn={fibDecrypt} />
		</section>
	{/if}

	{#if activeTab === 'Vernam'}
		<section class="tabcontent">
			<h2>The Vernam Cipher</h2>
			<h3>Origin</h3>
			<p>The manual method of the Vernam cipher is inspired by the principles proposed by Gilbert Vernam in 1917, adapted for use without electronic tools. These adaptations are used in situations where technical means are not available, or for cryptographic operations requiring apparent simplicity and extreme reliability. The manual cipher can be seen as an extension of polyalphabetic ciphers such as Vigenère, but with a key that is neither repetitive nor predictable.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>The functioning of the manual Vernam cipher relies on a correspondence between the letters of the alphabet and a random key. To encrypt a message, each letter of the plaintext is first converted to a number, where A corresponds to 0, B to 1, and so on up to Z, which corresponds to 25. The same conversion is performed for the letters of the key. Each number associated with a letter of the plaintext is then added to the corresponding number of the key. If the result exceeds 25, a modulo 26 operation is applied, which amounts to subtracting 26 to obtain a result between 0 and 25. The resulting number is then converted back to a letter to form the ciphertext. To decrypt, the reverse process is used. The number associated with the key letter is subtracted from the ciphertext letter's number. If the result is negative, 26 is added to stay within the 0–25 range. The result is then converted back to a letter to recover the original text. This process guarantees an exact correspondence between the letters of the plaintext and those of the ciphertext through the exclusive use of the random key.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>The manual method of the Vernam cipher has been used in situations where electronic means are not available or practical. Among its notable uses: military or diplomatic communication, especially in contexts where electronic devices are unreliable or detectable; clandestine operations, where the simplicity of tools (paper, pencil, alphabet table) allows encryption without drawing attention. This method is still taught as a fundamental example of the basics of cryptography and is used in educational games or to raise awareness of data security principles.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm
				encryptFn={vernamEncrypt}
				decryptFn={(text, key) => vernamDecrypt(text, key ?? '')}
				needsDecryptKey={true}
				decryptKeyLabel="Secret Key (Base64)"
				showGeneratedKey={true}
			/>
		</section>
	{/if}

	{#if activeTab === 'Binaire'}
		<section class="tabcontent">
			<h2>The Binary System</h2>
			<h3>Origin</h3>
			<p>The binary system is a numeral system based on only two digits: 0 and 1. Unlike the decimal system, which uses ten digits (from 0 to 9), the binary system is particularly well suited to machines, as it relies on simple states, such as "on/off" or "true/false". This system underpins the operation of modern computers and many electronic devices.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>The binary system works by positioning the digits 0 and 1 in columns corresponding to successive powers of 2, starting with 2⁰ on the right. Each position or "bit" represents a specific value, and the total number is obtained by summing these values. For example, the binary number 1011 equals 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 11 in decimal. Mathematical operations such as addition, subtraction, multiplication, and division can also be performed in binary, though their application differs from the decimal system. In computing, each "bit" (binary digit) represents a state. A series of bits can encode numbers, characters, or instructions, enabling information to be stored and processed.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>The binary system is fundamental to the operation of digital technologies. Its main applications include: Computing — computers use transistors to represent bits as electrical signals (0 for "off", 1 for "on"), enabling machines to perform calculations, store data, and execute programs. Communications — networks, including the internet, transmit data in binary as digital signals. Electronics — many electronic devices (smartphones, calculators, televisions) use binary to process information and control their functions. Cryptography — encryption algorithms often rely on binary operations to ensure the security of communications. Thanks to its simplicity and efficiency, the binary system has become the cornerstone of modern technologies, playing a crucial role in the processing and transmission of information.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm encryptFn={binaryEncrypt} decryptFn={binaryDecrypt} />
		</section>
	{/if}

	{#if activeTab === 'RailFence'}
		<section class="tabcontent">
			<h2>Rail Fence Cipher</h2>
			<h3>Origin</h3>
			<p>The Rail Fence cipher is one of the oldest known transposition ciphers. Unlike all other ciphers on this site, which replace each letter with a different symbol (substitution), the Rail Fence cipher keeps every letter unchanged but scrambles their order. Its exact origin is uncertain — it was in use in ancient Greece and Rome — and it saw renewed popularity during the American Civil War for quick field communications. The name evokes the visual appearance of the zigzag pattern, which resembles the alternating rails and posts of a wooden fence.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>To encrypt, write the plaintext diagonally downward across N rails, bouncing back up when you hit the bottom rail, until every letter is placed. Read each rail left-to-right and concatenate to get the ciphertext. To decrypt, replay the same zigzag on blank positions to find out how many characters belong to each rail, slice the ciphertext into those segments, then read them off in zigzag order. The key is simply the number of rails. Example with 3 rails and "HELLOWORLD": rail 0 → H,O,L — rail 1 → E,L,W,R,D — rail 2 → L,O. Ciphertext: HOLELWRDLO.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>The Rail Fence cipher was used in military and espionage contexts as a fast, equipment-free way to obscure a message. Both Union and Confederate forces used transposition ciphers of this family for tactical dispatches during the American Civil War. Today it has no practical security value — it can be broken by hand in seconds — but it remains an essential teaching tool: it illustrates transposition (scrambling positions) as opposed to substitution (replacing letters), which is the foundation for understanding more complex systems like columnar transposition and the Enigma machine. It also builds intuition for the permutation layer found in modern block ciphers such as AES.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm
				encryptFn={(text, key) => railFenceEncrypt(text, parseInt(key ?? '3'))}
				decryptFn={(text, key) => railFenceDecrypt(text, parseInt(key ?? '3'))}
				needsEncryptKey={true}
				needsDecryptKey={true}
				encryptKeyLabel="Number of rails"
				decryptKeyLabel="Number of rails"
				encryptKeyType="number"
				decryptKeyType="number"
			/>
		</section>
	{/if}

	{#if activeTab === 'Pigpen'}
		<section class="tabcontent">
			<h2>Pigpen Cipher</h2>
			<h3>Origin</h3>
			<p>The Pigpen cipher (also called the Masonic cipher or Freemason cipher) is a geometric substitution cipher dating to at least the 18th century. It was widely used by Freemasons to keep their correspondence private, and later appeared in the American Civil War. Each letter of the alphabet is represented by a portion of a grid or X shape, making the ciphertext look like a series of abstract symbols rather than any recognisable script.</p>
			<section>
				<div>
					<h3>How It Works</h3>
					<p>The 26 letters are split across two systems. Letters A–I occupy cells in a 3×3 tic-tac-toe grid: each letter's symbol shows only the lines that surround its cell (corner, edge, or center). Letters J–R use the same grid, but with a dot added inside the symbol. Letters S–V occupy four quadrant positions around an X shape (two diagonal lines meeting at center), and W–Z repeat those quadrants with a dot. To decrypt, identify which grid or X a symbol belongs to, note its position, and look up the letter. The reference chart below serves as your decode key.</p>
				</div>
				<div>
					<h3>Practical Applications</h3>
					<p>The Pigpen cipher has no modern cryptographic value — its small key space and fixed visual alphabet make it trivial to crack — but it remains culturally significant. It appears in treasure hunt puzzles, escape rooms, Freemasonic documents, and works of fiction such as Arthur Conan Doyle's "The Adventure of the Dancing Men." It is an excellent introduction to the idea that symbols do not have to look like letters to carry linguistic meaning, and to the concept of a fixed-substitution key (the grid layout), which is the philosophical ancestor of codebooks and lookup tables used in modern cryptographic key exchange.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<PigpenForm />
		</section>
	{/if}
</main>
