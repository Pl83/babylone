<script lang="ts">
	import CipherForm from '$lib/components/CipherForm.svelte';
	import { encrypt as morseEncrypt, decrypt as morseDecrypt } from '$lib/ciphers/morse';
	import { encrypt as cesarEncrypt, decrypt as cesarDecrypt } from '$lib/ciphers/cesar';
	import { encrypt as vigenereEncrypt, decrypt as vigenereDecrypt } from '$lib/ciphers/vigenere';
	import { encrypt as fibEncrypt, decrypt as fibDecrypt } from '$lib/ciphers/fibonacci';
	import { encrypt as vernamEncrypt, decrypt as vernamDecrypt } from '$lib/ciphers/vernam';
	import { encrypt as binaryEncrypt, decrypt as binaryDecrypt } from '$lib/ciphers/binary';

	const tabs = [
		{ id: 'Morse', label: 'Morse' },
		{ id: 'Cesar', label: 'César' },
		{ id: 'Vigener', label: 'Vigener' },
		{ id: 'Fibonaci', label: 'Fibonaci' },
		{ id: 'Vernam', label: 'Vernam' },
		{ id: 'Binaire', label: 'Binaire' }
	];

	let activeTab = $state('Morse');
</script>

<svelte:head>
	<title>Verba Enigma</title>
</svelte:head>

<header>
	<div>
		<h1>Verba Enigma</h1>
		<p>Cryptage &amp; Décryptage</p>
	</div>
</header>

<main>
	<h2>Bienvenue sur Verba Enigma</h2>
	<p>Plongez dans l'univers fascinant de la cryptologie, où secrets et énigmes s'entrelacent. Ce site pédagogique et ludique vous invite à explorer les techniques de cryptage classiques, des messages codés en Morse aux subtilités du chiffre de Vigenère, en passant par le binaire et des méthodes originales comme le décalage basé sur la suite de Fibonacci. Chaque outil est accompagné d'explications sur son origine, son fonctionnement et ses usages, pour vous initier à l'art du cryptage tout en vous amusant. Que vous soyez curieux, étudiant ou passionné, Verba Enigma est votre portail vers le monde des codes et des mystères.</p>

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
			<h2>Le Morse</h2>
			<h3>Origine</h3>
			<p>Le code Morse est un système de communication inventé par Samuel Morse et son collaborateur Alfred Vail dans les années 1830 et 1840, en vue de faciliter la transmission de messages à travers le télégraphe électrique. Avant l'invention du téléphone, ce système représentait une avancée majeure en permettant une communication rapide sur de longues distances. À l'origine, Samuel Morse voulait un code simple qui puisse être transmis par des impulsions électriques, ces dernières étant facilement interprétables comme des "bips".</p>
			<section>
				<div>
					<h3>Fonctionnement</h3>
					<p>Le code Morse repose sur une série de signaux courts et longs, appelés points et traits, pour représenter les lettres de l'alphabet, les chiffres et certains caractères spéciaux. Un point est un signal court, tandis qu'un trait est un signal long. Ces signaux sont séparés par des pauses pour former les caractères, et des pauses plus longues séparent les mots. Par exemple, la lettre "S" est représentée par trois points (•••), tandis que la lettre "O" est formée par trois traits (–––), donnant ainsi "SOS" pour les messages d'urgence.</p>
				</div>
				<div>
					<h3>Applications Pratiques</h3>
					<p>Le code Morse a longtemps été essentiel pour la télégraphie, puis pour les communications radio dans le milieu maritime et aéronautique. Il reste encore utilisé aujourd'hui pour certaines applications, notamment dans le domaine du sauvetage en mer, où le célèbre signal "SOS" (••• ––– •••) est universellement reconnu. De plus, il est utilisé pour l'apprentissage des transmissions codées dans certaines armées et pour les communications d'urgence, car il peut être transmis par diverses méthodes : signaux lumineux, sons, ou même gestes, permettant une communication dans des situations où d'autres systèmes seraient inefficaces. Le code Morse demeure ainsi un outil simple mais puissant, à la fois dans l'histoire des télécommunications et dans certains usages contemporains de communication de secours.</p>
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
			<h2>Le Chiffre de César</h2>
			<h3>Origine</h3>
			<p>Le chiffre de César, aussi connu sous le nom de chiffrement par décalage, est une méthode de cryptographie simple attribuée à Jules César, qui l'aurait utilisée pour transmettre des messages confidentiels. Cette technique remonte à l'époque romaine, ce qui en fait l'un des systèmes de chiffrement les plus anciens connus. Malgré sa simplicité, il a marqué un tournant dans l'histoire de la cryptographie en introduisant l'idée de substitution systématique.</p>
			<section>
				<div>
					<h3>Fonctionnement</h3>
					<p>Le chiffre de César repose sur le principe du décalage des lettres de l'alphabet. La clé est un nombre qui indique de combien de positions chaque lettre du message clair sera décalée. Par exemple, avec une clé de 3, la lettre "A" devient "D", "B" devient "E", et ainsi de suite. Chaque lettre du message est remplacée par une lettre située un certain nombre de places plus loin dans l'alphabet, selon la clé. À la fin de l'alphabet, on revient au début (ce qui fait du chiffrement un système circulaire). Le processus inverse consiste à reculer chaque lettre du même nombre de positions pour retrouver le texte original. Par exemple, avec une clé de 3, le mot "CHAT" devient "FKDW". Pour le déchiffrer, il suffit de reculer chaque lettre de 3 positions.</p>
				</div>
				<div>
					<h3>Applications Pratiques</h3>
					<p>À l'époque de Jules César, ce chiffrement était utilisé pour protéger des communications militaires. Bien que ce système soit extrêmement simple et facile à casser aujourd'hui avec des outils modernes comme l'analyse de fréquences, il reste un excellent point de départ pour comprendre les concepts fondamentaux de la cryptographie. De nos jours, le chiffre de César est principalement utilisé à des fins pédagogiques pour illustrer les bases du chiffrement par substitution. Il est également parfois employé dans des énigmes, des jeux ou pour des messages codés de manière ludique. Le chiffre de César, bien que rudimentaire, est un exemple emblématique de l'ingéniosité humaine dans la quête de confidentialité des communications. Il ouvre la voie à des méthodes de cryptographie plus complexes et sophistiquées.</p>
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
				encryptKeyLabel="Décalage (nombre)"
				decryptKeyLabel="Décalage (nombre)"
				encryptKeyType="number"
				decryptKeyType="number"
			/>
		</section>
	{/if}

	{#if activeTab === 'Vigener'}
		<section class="tabcontent">
			<h2>Le Chiffre de Vigenère</h2>
			<h3>Origine</h3>
			<p>Le chiffre de Vigenère est une méthode de cryptographie classique développée au XVIe siècle par le diplomate français Blaise de Vigenère. Cette technique, considérée comme une amélioration du chiffre de César, était révolutionnaire pour son époque, car elle rendait les messages codés beaucoup plus difficiles à déchiffrer sans la clé appropriée. Elle a longtemps été surnommée "chiffre indéchiffrable" avant que des méthodes d'analyse cryptographique plus avancées n'émergent.</p>
			<section>
				<div>
					<h3>Fonctionnement</h3>
					<p>Le chiffre de Vigenère repose sur une clé, qui est un mot ou une phrase, et utilise une table appelée tableau de Vigenère. Ce tableau est une grille alphabétique où chaque ligne représente une version décalée de l'alphabet. La clé est répétée autant de fois que nécessaire pour correspondre à la longueur du message à chiffrer. Chaque lettre du message est décalée dans l'alphabet en fonction de la lettre correspondante de la clé. Par exemple, si la clé est "BAC", le décalage pour la première lettre sera de 1 (B étant la deuxième lettre de l'alphabet), pour la deuxième de 0 (A = aucun décalage), et pour la troisième de 2 (C = troisième lettre). Le processus inverse est utilisé pour retrouver le message original, en connaissant la clé.</p>
				</div>
				<div>
					<h3>Applications Pratiques</h3>
					<p>Le chiffre de Vigenère a été largement utilisé entre le XVIe et le XIXe siècle, notamment dans les correspondances militaires et diplomatiques. Sa simplicité et sa relative sécurité en faisaient un choix populaire avant l'arrivée des machines de cryptographie, comme l'Enigma. Bien que ce chiffre soit désormais vulnérable aux attaques cryptographiques modernes, comme l'analyse de fréquences, il reste un outil éducatif important pour apprendre les bases de la cryptographie et des chiffres polyalphabétiques. Par ailleurs, des variantes modernes basées sur le même principe sont utilisées dans des systèmes de sécurité informatique pour des tâches moins sensibles. Le chiffre de Vigenère illustre à merveille l'évolution de la cryptographie et son importance dans la protection des informations sensibles à travers les siècles.</p>
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
				encryptKeyLabel="Clé (mot)"
				decryptKeyLabel="Clé (mot)"
			/>
		</section>
	{/if}

	{#if activeTab === 'Fibonaci'}
		<section class="tabcontent">
			<h2>La suite de Fibonaci</h2>
			<h3>Origine</h3>
			<p>La suite de Fibonacci tire son nom de Leonardo Fibonacci, un mathématicien italien du XIIIᵉ siècle. Elle apparaît dans son ouvrage célèbre, Liber Abaci (1202), où Fibonacci utilise cette suite pour résoudre un problème de reproduction de lapins. Bien que ce mathématicien en soit le vulgarisateur en Occident, des formes similaires de cette suite existaient déjà dans des textes mathématiques indiens plus anciens. La suite est définie de manière simple : chaque nombre est la somme des deux précédents, en commençant par 0 et 1.</p>
			<section>
				<div>
					<h3>Fonctionnement</h3>
					<p>Chaque nouveau terme résulte de l'addition des deux précédents, ce qui génère une croissance rapide. Cette propriété d'auto-réplication reflète des motifs naturels de croissance, ce qui explique pourquoi cette suite apparaît dans divers contextes biologiques. Mathématiquement, cela s'écrit : F(n)=F(n−1)+F(n−2) avec 𝐹(0) = 0 et 𝐹(1) = 1. Les premiers termes sont donc : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, …</p>
				</div>
				<div>
					<h3>Applications Pratiques</h3>
					<p>La suite de Fibonacci est utilisée dans plusieurs domaines. Nature : On la retrouve dans des phénomènes naturels comme les spirales des coquilles d'escargots, la disposition des graines de tournesol ou des pommes de pin, et la structure des galaxies spirales. Architecture et art : En lien avec le nombre d'or (𝜙), une valeur approximative de 1,618 obtenue par le rapport entre deux termes consécutifs de la suite, elle inspire des proportions harmonieuses dans la peinture, l'architecture et le design. Informatique : Elle est utilisée pour optimiser les algorithmes, comme les recherches dans des arbres binaires ou la compression de données. Finance : Les traders emploient des retracements basés sur le nombre d'or pour prévoir des niveaux de support et de résistance. Modélisation biologique : La suite est utile pour modéliser la croissance des populations, les structures organiques ou même l'ADN. Ici : Sur ce site la suite de Fibonaci est utiliser pour effectuer un chiffrement par décalage avec un décalage unique a chaques lettres.</p>
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
			<h2>Le chiffre de Vernam</h2>
			<h3>Origine</h3>
			<p>La méthode manuelle du chiffre de Vernam s'inspire des principes proposés par Gilbert Vernam en 1917, adaptés à un usage sans outils électroniques. Ces adaptations sont utilisées dans des situations où les moyens techniques ne sont pas disponibles, ou pour des opérations de cryptographie nécessitant une simplicité apparente et une fiabilité extrême. Le chiffre manuel peut être vu comme une extension des chiffres polyalphabétiques comme celui de Vigenère, mais avec une clé qui n'est ni répétitive ni prévisible.</p>
			<section>
				<div>
					<h3>Fonctionnement</h3>
					<p>Le fonctionnement du chiffre de Vernam manuel repose sur une correspondance entre les lettres de l'alphabet et une clé aléatoire. Pour chiffrer un message, chaque lettre du texte clair est d'abord convertie en un nombre, où A correspond à 0, B à 1, et ainsi de suite jusqu'à Z, qui correspond à 25. La même conversion est effectuée pour les lettres de la clé. Ensuite, on additionne le nombre associé à chaque lettre du message clair avec le nombre correspondant de la clé. Si le résultat dépasse 25, on applique une opération de modulo 26, qui revient à soustraire 26 pour obtenir un résultat compris entre 0 et 25. Le nombre obtenu est alors reconverti en lettre pour former le texte chiffré. Pour déchiffrer, le processus inverse est utilisé. On soustrait le nombre associé à la lettre de la clé de celui de la lettre du message chiffré. Si le résultat est négatif, on ajoute 26 pour rester dans la plage de 0 à 25. Le résultat est ensuite reconverti en lettre pour retrouver le texte original. Ce procédé garantit une correspondance exacte entre les lettres du message clair et celles du message chiffré grâce à l'utilisation exclusive de la clé aléatoire.</p>
				</div>
				<div>
					<h3>Applications Pratiques</h3>
					<p>La méthode manuelle du chiffre de Vernam a été utilisée dans des situations où des moyens électroniques ne sont pas disponibles ou pratiques. Parmi ses usages notables : Communication militaire ou diplomatique, surtout dans des contextes où les dispositifs électroniques ne sont pas fiables ou détectables. Opérations clandestines, où la simplicité des outils (papier, crayon, table d'alphabet) permet de chiffrer sans attirer l'attention. Cette méthode est encore enseignée comme un exemple fondamental des bases de la cryptographie et est utilisée dans des jeux éducatifs ou pour sensibiliser aux principes de sécurité des données.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm
				encryptFn={vernamEncrypt}
				decryptFn={(text, key) => vernamDecrypt(text, key ?? '')}
				needsDecryptKey={true}
				decryptKeyLabel="Clé secrète (Base64)"
				showGeneratedKey={true}
			/>
		</section>
	{/if}

	{#if activeTab === 'Binaire'}
		<section class="tabcontent">
			<h2>Le système Binaire</h2>
			<h3>Origine</h3>
			<p>Le système binaire est un système de numération basé sur deux chiffres seulement : 0 et 1. Contrairement au système décimal, qui utilise dix chiffres (de 0 à 9), le système binaire est particulièrement adapté aux machines, car il repose sur des états simples, tels que "on/off" ou "vrai/faux". Ce système est à la base du fonctionnement des ordinateurs modernes et de nombreux appareils électroniques.</p>
			<section>
				<div>
					<h3>Fonctionnement</h3>
					<p>Le système binaire fonctionne en positionnant les chiffres 0 et 1 dans des colonnes correspondant à des puissances successives de 2, en commençant par 2⁰ à droite. Chaque position ou "bit" représente une valeur spécifique, et le nombre total est obtenu en additionnant ces valeurs. Par exemple, le nombre binaire 1011 équivaut à 1 * 2³ + 0 * 2² + 1 * 2¹ + 1 * 2⁰ = 11 en décimal. Les opérations mathématiques telles que l'addition, la soustraction, la multiplication et la division peuvent également être effectuées en binaire, bien que leur application soit différente du système décimal. Dans le contexte informatique, chaque "bit" (binary digit) représente un état. Une série de bits peut coder des nombres, des caractères ou des instructions, permettant ainsi de stocker et de traiter des informations.</p>
				</div>
				<div>
					<h3>Applications Pratiques</h3>
					<p>Le système binaire est fondamental pour le fonctionnement des technologies numériques. Voici ses principales applications, Informatique : Les ordinateurs utilisent des transistors pour représenter les bits sous forme de signaux électriques (0 pour "off", 1 pour "on"). Cela permet aux machines d'effectuer des calculs, de stocker des données et d'exécuter des programmes. Communications : Les réseaux, y compris l'internet, transmettent des données en binaire sous forme de signaux numériques. Électronique : De nombreux appareils électroniques (smartphones, calculatrices, télévisions) utilisent le binaire pour traiter des informations et contrôler leurs fonctions. Cryptographie : Les algorithmes de cryptage reposent souvent sur des opérations en binaire pour assurer la sécurité des communications. Grâce à sa simplicité et son efficacité, le système binaire est devenu la pierre angulaire des technologies modernes, jouant un rôle crucial dans le traitement et la transmission de l'information.</p>
				</div>
			</section>
			<br />
			<hr />
			<br />
			<CipherForm encryptFn={binaryEncrypt} decryptFn={binaryDecrypt} />
		</section>
	{/if}
</main>
