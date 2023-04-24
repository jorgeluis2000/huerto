import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, SECRET_KEY_ENCRYPT, SECRET_KEY_TOKEN } from '../../app/environments/security.env.js';


/**
* Toma una cadena y la encripta usando el algoritmo de encriptación AES
* @param {string | JSON} str - La cadena que se va a cifrar.
* @param {string} [publicKey] - La clave utilizada para cifrar la cadena.
* @returns {string} La cadena encriptada.
*/
export function encrypt(str, publicKey = SECRET_KEY_ENCRYPT) {
    return CryptoJS.AES.encrypt(str, publicKey).toString();
}


/**
* Descifra la cadena usando la clave privada.
* @param {string | JSON} str - La cadena que se va a cifrar.
* @param {string} [priveteKey] - La clave utilizada para cifrar y descifrar los datos.
* @returns {string | JSON} La cadena descifrada.
*/
export function decrypt(str, priveteKey = SECRET_KEY_ENCRYPT) {
    return CryptoJS.AES.decrypt(str, priveteKey).toString(CryptoJS.enc.Latin1);
}


/**
* Hashear cualquier texto o objeto en 256.
*
* @param {string | JSON} str texto o objeto.
* @return {string} texto en Hexadecimal.
*/
export function encryptSHA256(str) {
    return CryptoJS.SHA256(str, SECRET_KEY).toString(CryptoJS.enc.Hex)
}

/**
* Hashear cualquier texto o objeto en 512.
*
* @param {string | JSON} str texto o objeto.
* @return {string} texto en Hexadecimal.
*/
export function encryptSHA512(str) {
    return CryptoJS.SHA512(str, SECRET_KEY).toString(CryptoJS.enc.Hex)
}


/**
* Crear un token sin limite de expiracion.
*
* @param {string | JSON} str texto o objeto.
* @param {'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512' | 'none'} [hashEncode='HS512'] tipo de hash que se va usar en la cabecera.
* @param {string} [keyPrivate=SECRET_KEY_TOKEN] llave privada para crear el token.
* @return {string} Token en formato texto.
*/
export function createToken(str, hashEncode = 'HS512', keyPrivate = SECRET_KEY_TOKEN) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const timestap = today.toISOString();
    const payLoad = {
        credential: str,
        check: true,
        date: timestap
    };
    return jwt.sign(payLoad, keyPrivate, { algorithm: hashEncode });
}


/**
* Crear un token con limite de expiracion si se requiere.
*
* @param {*} str texto o objeto.
* @param {string | number} expira texto o numerico, por ejemplo: '1d', '1m', 60, 60*60, '1h'.
* @param {string} [hashEncode='HS512'] tipo de hash que se va usar en la cabecera.
* @param {string} [keyPrivate=SECRET_KEY_TOKEN] llave privada para crear el token.
* @return {string} Token en formato texto
*/
export function createTokenWithExpirence(str, expira, hashEncode = 'HS512', keyPrivate = SECRET_KEY_TOKEN) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const timestap = today.toISOString();
    const payLoad = {
        credential: str,
        check: true,
        date: timestap
    };
    return jwt.sign(payLoad, keyPrivate, { algorithm: hashEncode, expiresIn: expira });
}


/**
* Decodificar o revelar el token, ademas revisa si el token se expiro si este tiene fecha de expiracion.
*
* @param {string} tokenText - Token desencriptado.
* @param {string} [keyPublic=SECRET_KEY_TOKEN] - llave publica para revelar el token.
* @param {'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512' | 'none'} [hashEncode='HS512'] - algoritmo de códificación.
* @return {{credential: any,check: boolean, date: date}} objeto en formato JSON, este seria el payload almacenado en el token.
*/
export function decodeJsonWebToken(tokenText, keyPublic = SECRET_KEY_TOKEN, hashEncode = 'HS512') {
    try {
        const response = jwt.verify(tokenText, keyPublic, { algorithms: hashEncode });
        return response;
    } catch (error) {
        console.log("❌ Error System:", error)
        return null;
    }
}

/**
* Valida si el token se expiro y si la clave almacenada esla misma pasada por parametro.
*
* @param {string} tokenText Token desencriptado.
* @param {string} [passValid=''] Contrasña que será verificada.
* @param {string} [keyPublic=security.SECRETKEYTOKEN] llave publica para revelar el token.
* @return {boolean} Confirma si la validacion fue exitosa con un **True** y si esta falla devuelve un **False**.
*/
export function verifyJsonWebToken(tokenText, passValid = '', keyPublic = SECRET_KEY_TOKEN) {
    try {
        const response = jwt.verify(tokenText, keyPublic);

        if (response.credential && response.credential === passValid) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("❌ Error System:", error)
        return false;
    }
}