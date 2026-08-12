/*==============================================
            ADMIN AUTH MODULE

    A static site has no server to log in to, so
    "logging in" here means unlocking a GitHub
    token that lives — encrypted — in this
    browser's localStorage.

    Setup (once per device): you paste a token and
    choose a password. The password is stretched
    with PBKDF2-SHA256 into an AES-GCM key, which
    encrypts the token. Only the ciphertext is
    stored; the password itself never is.

    Login (every time): the password re-derives the
    key and decrypts the token. A wrong password
    fails AES-GCM's authentication tag, so there is
    no "check the password against a stored copy"
    step to bypass — without the right password the
    token simply cannot be recovered.

    The decrypted token is held in memory only, and
    is dropped on logout, on tab close, and after
    an idle timeout.
================================================*/

const VAULT_KEY = 'admin.vault';
const VAULT_VERSION = 1;
const PBKDF2_ITERATIONS = 310000;
const SALT_BYTES = 16;
const IV_BYTES = 12;
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const MIN_PASSWORD_LENGTH = 8;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes) {
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function fromBase64(text) {
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

async function deriveKey(password, salt, iterations) {
    const material = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
        material,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

export class AdminAuth {
    constructor() {
        this.credentials = null;
        this.onLock = null;
        this._idleTimer = null;
    }

    /**
     * WebCrypto's subtle API only exists in a secure context (https or
     * localhost). Without it there is no honest way to store the token, so
     * the panel refuses to run rather than falling back to plaintext.
     */
    static isSupported() {
        return Boolean(window.isSecureContext && window.crypto?.subtle);
    }

    static get minPasswordLength() {
        return MIN_PASSWORD_LENGTH;
    }

    hasVault() {
        return localStorage.getItem(VAULT_KEY) !== null;
    }

    get isUnlocked() {
        return this.credentials !== null;
    }

    /**
     * Encrypt `credentials` under `password` and store the result. Replaces
     * any existing vault — that is also how "change my password" works.
     */
    async createVault(password, credentials) {
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
        }

        const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
        const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
        const key = await deriveKey(password, salt, PBKDF2_ITERATIONS);

        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encoder.encode(JSON.stringify(credentials))
        );

        localStorage.setItem(VAULT_KEY, JSON.stringify({
            version: VAULT_VERSION,
            iterations: PBKDF2_ITERATIONS,
            salt: toBase64(salt),
            iv: toBase64(iv),
            data: toBase64(new Uint8Array(ciphertext))
        }));

        this._activate(credentials);
        return credentials;
    }

    /**
     * Decrypt the stored vault. Throws on a wrong password — AES-GCM's
     * integrity check is what rejects it, not a comparison we could get wrong.
     */
    async unlock(password) {
        const raw = localStorage.getItem(VAULT_KEY);
        if (!raw) throw new Error('No admin access is set up in this browser yet.');

        const vault = JSON.parse(raw);
        const key = await deriveKey(
            password,
            fromBase64(vault.salt),
            vault.iterations || PBKDF2_ITERATIONS
        );

        let plaintext;
        try {
            plaintext = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: fromBase64(vault.iv) },
                key,
                fromBase64(vault.data)
            );
        } catch {
            throw new Error('Wrong password.');
        }

        this._activate(JSON.parse(decoder.decode(plaintext)));
        return this.credentials;
    }

    /** Drop the decrypted token but keep the vault, so you can log back in. */
    lock() {
        this.credentials = null;
        clearTimeout(this._idleTimer);
        this._idleTimer = null;
    }

    /** Remove the vault entirely — this device forgets the token. */
    forget() {
        this.lock();
        localStorage.removeItem(VAULT_KEY);
    }

    /** Restart the idle countdown. Called on any activity in the panel. */
    touch() {
        if (!this.isUnlocked) return;
        clearTimeout(this._idleTimer);
        this._idleTimer = setTimeout(() => {
            this.lock();
            if (this.onLock) this.onLock();
        }, IDLE_TIMEOUT_MS);
    }

    _activate(credentials) {
        this.credentials = credentials;
        this.touch();
    }
}
