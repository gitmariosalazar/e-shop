import CryptoJS from "crypto-js";

var secretkey = process.env.SECRET_KEY

function cipherPassword (password) {
    var cipherpwd = CryptoJS.AES.encrypt(password, secretkey).toString();
    return cipherpwd
}

function decryptPassword (password) {
    var bytes = CryptoJS.AES.decrypt(password, secretkey);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword
}

function ComparePasswords (text, cipher) {
    var cipher_pwd = decryptPassword(cipher)
    if (cipher_pwd == text) {
        return true
    }
    else {
        return false
    }
}


// Lista negra de tokens inválidos
let blacklistedTokens = [];

// Función para agregar un token a la lista negra
function addToBlacklist (token) {
    blacklistedTokens.push(token);
}

// Función para verificar si un token está en la lista negra
function isBlacklisted (token) {
    return blacklistedTokens.includes(token);
}

function convertirStringAFecha (fechaString) {
    const fecha = new Date(fechaString);
    if (isNaN(fecha) || fecha.toString() === "Invalid Date") {
        console.error("La cadena proporcionada no es una fecha válida.");
        return null;
    }
    return fecha;
}

export {
    cipherPassword,
    decryptPassword, ComparePasswords, addToBlacklist, isBlacklisted, convertirStringAFecha
}