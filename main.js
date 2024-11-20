function switchMode(evt, mode) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(mode).style.display = "block";
    evt.currentTarget.className += " active";
  }

/* =================================================================== */
/* ========================== Morse ================================== */
/* =================================================================== */
let toMorse = document.getElementById('toMorse');
let Morsed = document.getElementById('Morsed');
let toUnMorse = document.getElementById('toUnMorse');
let unMorsed = document.getElementById('unMorsed');

var table = [
    { char: 'A', code: '.-' }, { char: 'B', code: '-...' }, { char: 'C', code: '-.-.' }, { char: 'D', code: '-..' }, { char: 'E', code: '.' }, { char: 'F', code: '..-.' }, { char: 'G', code: '--.' }, { char: 'H', code: '....' }, { char: 'I', code: '..' }, { char: 'J', code: '.---' }, { char: 'K', code: '-.-' }, { char: 'L', code: '.-..' }, { char: 'M', code: '--' }, { char: 'N', code: '-.' }, { char: 'O', code: '---' }, { char: 'P', code: '.--.' }, { char: 'Q', code: '--.-' }, { char: 'R', code: '.-.' }, { char: 'S', code: '...' }, { char: 'T', code: '-' }, { char: 'U', code: '..-' }, { char: 'V', code: '...-' }, { char: 'W', code: '.--' }, { char: 'X', code: '-..-' }, { char: 'Y', code: '-.--' }, { char: 'Z', code: '--..' }, { char: '1', code: '.----' }, { char: '2', code: '..---' }, { char: '3', code: '...--' }, { char: '4', code: '....-' }, { char: '5', code: '.....' }, { char: '6', code: '-....' }, { char: '7', code: '--...' }, { char: '8', code: '---..' }, { char: '9', code: '----.' }, { char: '0', code: '-----' }, { char: ' ', code: '/' }, { char: '.', code: '.-.-.-'}, { char: ',', code: '--..--' }, { char: '?', code: '..--..' }, { char: '!', code: '-.-.--' }
];


function morseEncrypte() { 

    let string = toMorse.value;

    if (typeof string !== 'string') {
        return alert('The input must be a type string');
    };

    if (string === '') {
        return alert('The input must not be empty');
    };

    var chars = string.split('');
    var encryptedChars = [];

    if (chars.some((char) => !table.some((item) => item.char === char.toUpperCase()))) {
        return alert('A character is not suported.');
    };

    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var isUpperCase = char === char.toUpperCase();
        var index = table.findIndex((item) => item.char === char.toUpperCase());

        if (index === -1) {
            encryptedChars.push(char);
        } else {
            var encryptedChar = table[index].code;
            encryptedChars.push(isUpperCase ? encryptedChar : encryptedChar);
        };
    };

    Morsed.value = encryptedChars.join(' ');

};

function morseDecrypte() {

    let string = toUnMorse.value;

    if (typeof string !== 'string') {
        return alert('The input must be a type string');
    };

    if (string === '') {
        return alert('The input must not be empty');
    };

    var chars = string.split(' ');
    var decryptedChars = [];

    if (chars.some((char) => !table.some((item) => item.code === char))) {
        return alert('A character is not suported');
    };

    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var index = table.findIndex((item) => item.code === char);

        if (index === -1) {
            decryptedChars.push(char);
        } else {
            var decryptedChar = table[index].char;
            decryptedChars.push(decryptedChar);
        };
    };

    unMorsed.value = decryptedChars.join('');

};


/* =================================================================== */
/* ========================== César ================================== */
/* =================================================================== */
let toCesar = document.getElementById('toCesar');
let Cesared = document.getElementById('Cesared');
let toUnCesar = document.getElementById('toUnCesar');
let unCesared = document.getElementById('unCesared');

function cesarEncrypte() {

    let shift = prompt('Enter your shift (must be a number):');

    if (shift == null || shift === '') {
        alert("You must use a shift");
        return; 
    };

    shift = parseInt(shift);
    if (isNaN(shift)) {
        alert("Shift must be a valid number");
        return; 
    };

    let string = toCesar.value.toUpperCase(); 
    let result = "";

    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (char.match(/[A-Z]/)) { 
            let charCode = string.charCodeAt(i);
            let base = 65; 

            result += String.fromCharCode(((charCode - base + shift) % 26) + base);
        } else {
            result += char;
        };
    };

    Cesared.value = result;
};

function cesarDecrypte() {
    let shift = prompt('Enter your shift (must be a number):');

    if (shift == null || shift === '') {
        alert("You must use a shift");
        return; 
    };

    shift = parseInt(shift);
    if (isNaN(shift)) {
        alert("Shift must be a valid number");
        return; 
    };

    shift = shift % 26;

    let string = toUnCesar.value.toUpperCase(); 
    let result = "";

    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (char.match(/[A-Z]/)) { 
            let charCode = string.charCodeAt(i);
            let base = 65; 

            result += String.fromCharCode(((charCode - base - shift + 26) % 26) + base);
        } else {
            
            result += char;
        };
    };

    unCesared.value = result; 
};

/* =================================================================== */
/* ========================== Vigener ================================ */
/* =================================================================== */
let toVigener = document.getElementById('toVigener');
let Vigenered = document.getElementById('Vigenered');
let toUnVigener = document.getElementById('toUnVigener');
let unVigenered = document.getElementById('unVigenered');

function vigenereEncrypte () {

    let key = prompt('Enter your key :');

    if (key == null || key == '') {
        alert("You must use a key")
    };

    let text = toVigener.value

    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const forbiddenChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', ';', '<', '>', '/'];

    if (typeof key !== 'string' || typeof text !== 'string') {
        alert('The input must be a type string');
    };

    if (key === '' || text === '') {
        alert('The input must not be empty');
    };



    const keyChars = key.split('');
    const textChars = text.split('');
    const encryptedChars = [];
    let keyIndex = 0;

    // if (keyChars.some((char) => forbiddenChars.includes(char))) {
    //     alert('A character is not suported in the Key');
    // };

    for (let i = 0; i < textChars.length; i++) {
        const char = textChars[i];
        const isUpperCase = char === char.toUpperCase();
        const index = alphabets.indexOf(char.toLowerCase());

        if (index === -1) {
            encryptedChars.push(char);
        } else {
            const keyChar = keyChars[keyIndex % keyChars.length];
            const keyIndexInAlphabet = alphabets.indexOf(keyChar.toLowerCase());
            const newIndex = (index + keyIndexInAlphabet) % alphabets.length;
            const encryptedChar = alphabets[newIndex];
            encryptedChars.push(isUpperCase ? encryptedChar.toUpperCase() : encryptedChar);
            keyIndex++;
        };
    };

    Vigenered.value = encryptedChars.join('');

};

function vigenereDecrypte() {

    let key = prompt('Enter your key :');

    if (key == null || key == '') {
        alert("You must use a key")
    };

    let text = toUnVigener.value;

    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const forbiddenChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', ';', '<', '>', '/'];

    if (typeof key !== 'string' || typeof text !== 'string') {
        alert('The input must be a type string ' + typeof key + '   ' +  typeof text);
    };

    if (key === '' || text === '') {
        alert('The input must not be empty');
    };

    const keyChars = key.split('');
    const textChars = text.split('');
    const decryptedChars = [];
    let keyIndex = 0;

    if (keyChars.some((char) => forbiddenChars.includes(char))) {
        alert('A character is not suported in the Key');
    };

    for (let i = 0; i < textChars.length; i++) {
        const char = textChars[i];
        const isUpperCase = char === char.toUpperCase();
        const index = alphabets.indexOf(char.toLowerCase());

        if (index === -1) {
            decryptedChars.push(char);
        } else {
            const keyChar = keyChars[keyIndex % keyChars.length];
            const keyIndexInAlphabet = alphabets.indexOf(keyChar.toLowerCase());
            const newIndex = (index - keyIndexInAlphabet + alphabets.length) % alphabets.length;
            const decryptedChar = alphabets[newIndex];
            decryptedChars.push(isUpperCase ? decryptedChar.toUpperCase() : decryptedChar);
            keyIndex++;
        };
    };

    unVigenered.value = decryptedChars.join('');

};


/* =================================================================== */
/* ========================== Fibonaci =============================== */
/* =================================================================== */
let toFibonaci = document.getElementById('toFibonaci');
let Fibonacied = document.getElementById('Fibonacied');
let toUnFibonaci = document.getElementById('toUnFibonaci');
let unFibonaci = document.getElementById('unFibonaci');

function fiboCrypte() {

    let string = toFibonaci.value;

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    if (typeof string !== 'string') {
        return alert('The input must be a type string');
    };
 
    function fibo(length) {
        var key = [0];
        var a = 0;    
        var b = 1;
        for (var i = 1; i < length; i++) {
            key.push(b);
            [a, b] = [b, a + b];
        };
        return key;
    };
 
    var chars = string.split('');
    var encryptedChars = [];
    var key = fibo(chars.length);

 
    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];

        if (char === 'é' || char === 'è' || char === 'ê' || char === 'ë') {
            char = 'e';
        };
    
        if (char === 'à' || char === 'â' || char === 'ä') {
            char = 'a';
        };
    
        if (char === 'ù' || char === 'û' || char === 'ü') {
            char = 'u';
        };
    
        if (char === 'î' || char === 'ï') {
            char = 'i';
        };
    
        if ( char === 'ô' || char === 'ö') {
            char = 'o';
        };
    
        if (char === 'ç') {
            char = 'c';
        };

        var isUpperCase = char === char.toUpperCase();
        var index = alphabet.indexOf(char.toLowerCase());
 
        if (index === -1) {
            encryptedChars.push(char);
        } else {
            var encryptedIndex = (index + key[i]) % 26;
            var encryptedChar = alphabet[encryptedIndex];
            encryptedChars.push(isUpperCase ? encryptedChar.toUpperCase() : encryptedChar);
        };
    };
    return Fibonacied.value = encryptedChars.join('');
};

function fiboDecrypte() {

    let encryptedString = toUnFibonaci.value;

    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    if (typeof encryptedString !== 'string') {
        return alert('The input must be a type string');
    };
 
    function fibo(length) {
        var key = [0];
        var a = 0;    
        var b = 1;
        for (var i = 1; i < length; i++) {
            key.push(b);
            [a, b] = [b, a + b];
        };
        return key;
    };
 
    var encryptedChars = encryptedString.split('');
    var decryptedChars = [];
    var key = fibo(encryptedChars.length);
 
    for (var i = 0; i < encryptedChars.length; i++) {
        var char = encryptedChars[i];

        if (char === 'é' || char === 'è' || char === 'ê' || char === 'ë') {
            char = 'e';
        };
    
        if (char === 'à' || char === 'â' || char === 'ä') {
            char = 'a';
        };
    
        if (char === 'ù' || char === 'û' || char === 'ü') {
            char = 'u';
        };
    
        if (char === 'î' || char === 'ï') {
            char = 'i';
        };
    
        if ( char === 'ô' || char === 'ö') {
            char = 'o';
        };
    
        if (char === 'ç') {
            char = 'c';
        };

        var isUpperCase = char === char.toUpperCase();
        var index = alphabet.indexOf(char.toLowerCase());
        if (index === -1) {
            decryptedChars.push(char);
        } else {
            var decryptedIndex = (index - key[i] + 26) % 26;

            if (decryptedIndex < 0) {
                decryptedIndex = decryptedIndex + 26;
            }
 
            var decryptedChar = alphabet[decryptedIndex];
            let temp = isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
            decryptedChars.push(temp);
        };
    };
    return unFibonaci.value = decryptedChars.join('');
};

/* =================================================================== */
/* ========================== Vernam ================================= */
/* =================================================================== */
let toVernam = document.getElementById('toVernam');
let Vernamed = document.getElementById('Vernamed');
let toUnVernam = document.getElementById('toUnVernam');
let unVernam = document.getElementById('unVernam');


function toBase64(input) {
    return btoa(unescape(encodeURIComponent(input)));
}

function fromBase64(input) {
    return decodeURIComponent(escape(atob(input))); 
}

function vernamEncrypte() {
    let string = toVernam.value;

    if (typeof string !== 'string' || string === '') {
        return alert('The input must be a non-empty string');
    }

    var chars = string.split('');
    var encryptedString = [];
    var randomKey = '';

    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var randomKeyChar = Math.floor(Math.random() * 256);
        randomKey += String.fromCharCode(randomKeyChar);
        var encryptedChar = char.charCodeAt(0) ^ randomKeyChar;
        encryptedString.push(String.fromCharCode(encryptedChar));
    }

    Vernamed.value = toBase64(encryptedString.join(''));
    alert('The secret key, for unique usage, is: ' + toBase64(randomKey));
};

function vernamDecrypte() {
    let string = toUnVernam.value;

    if (typeof string !== 'string' || string === '') {
        return alert('The input must be a non-empty string');
    }

    var chars = fromBase64(string).split('');
    var decryptedChars = [];
    var userKey = prompt('Enter your secret key for unique usage:');

    if (!userKey) {
        return alert('You must provide a valid secret key');
    }

    userKey = fromBase64(userKey);

    if (userKey.length !== chars.length) {
        return alert('The secret key must match the length of the encrypted text');
    }

    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var decryptedChar = char.charCodeAt(0) ^ userKey.charCodeAt(i);
        decryptedChars.push(String.fromCharCode(decryptedChar)); 
    }

    unVernam.value = decryptedChars.join('');
};


/* =================================================================== */
/* ========================== Bineare ================================= */
/* =================================================================== */
let toBinaire = document.getElementById('toBinaire');
let Binaireed = document.getElementById('Binaireed');
let toUnBinaire = document.getElementById('toUnBinaire');
let unBinaire = document.getElementById('unBinaire');

const alphabetBinaire = [
    { lettre: 'A', binaire: '01000001' },
    { lettre: 'B', binaire: '01000010' },
    { lettre: 'C', binaire: '01000011' },
    { lettre: 'D', binaire: '01000100' },
    { lettre: 'E', binaire: '01000101' },
    { lettre: 'F', binaire: '01000110' },
    { lettre: 'G', binaire: '01000111' },
    { lettre: 'H', binaire: '01001000' },
    { lettre: 'I', binaire: '01001001' },
    { lettre: 'J', binaire: '01001010' },
    { lettre: 'K', binaire: '01001011' },
    { lettre: 'L', binaire: '01001100' },
    { lettre: 'M', binaire: '01001101' },
    { lettre: 'N', binaire: '01001110' },
    { lettre: 'O', binaire: '01001111' },
    { lettre: 'P', binaire: '01010000' },
    { lettre: 'Q', binaire: '01010001' },
    { lettre: 'R', binaire: '01010010' },
    { lettre: 'S', binaire: '01010011' },
    { lettre: 'T', binaire: '01010100' },
    { lettre: 'U', binaire: '01010101' },
    { lettre: 'V', binaire: '01010110' },
    { lettre: 'W', binaire: '01010111' },
    { lettre: 'X', binaire: '01011000' },
    { lettre: 'Y', binaire: '01011001' },
    { lettre: 'Z', binaire: '01011010' },
    { lettre: '?', binaire: '00111111' },
    { lettre: ',', binaire: '00101100' },
    { lettre: '.', binaire: '00101110' },
    { lettre: '!', binaire: '00100001' },
    { lettre: '-', binaire: '00101101' },
    { lettre: ' ', binaire: '00100000' } 
];

function binaireEncrypte() {
    let string = toBinaire.value ;

    var lettres = string.split('');
    var encryptedLettres = [];

    if (lettres.some((lettre) => !alphabetBinaire.some((item) => item.lettre === lettre.toUpperCase()))) {
        return alert('A character is not suported.');
    };

    for (var i = 0; i < lettres.length; i++) {
        var lettre = lettres[i];
        var isUpperCase = lettre === lettre.toUpperCase();
        var index = alphabetBinaire.findIndex((item) => item.lettre === lettre.toUpperCase());

        if (index === -1) {
            encryptedLettres.push(lettre);
        } else {
            var encryptedLettre = alphabetBinaire[index].binaire;
            encryptedLettres.push(isUpperCase ? encryptedLettre : encryptedLettre);
        };
    };

    Binaireed.value = encryptedLettres.join(' ');
};

function binaireDecrypte(){
    let string = toUnBinaire.value;

    var binaryCodes = string.trim().split(' ');
    var decryptedLettres = [];

    for (var i = 0; i < binaryCodes.length; i++) {

        var binaryCode = binaryCodes[i];
        var item = alphabetBinaire.find((item) => item.binaire === binaryCode);

        if (item) {
            decryptedLettres.push(item.lettre);
        } else {
            decryptedLettres.push('?'); 
        }
    }

    unBinaire.value = decryptedLettres.join('');
};