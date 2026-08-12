/*==============================================
            VAULT MODULE

    Keeps the GitHub token encrypted at rest, with
    two ways to unlock it.

    Encryption needs a key, and a key kept next to
    the ciphertext protects nothing — so the key is
    never stored. It is reconstructed at unlock time
    from something you supply:

      PIN       PBKDF2-SHA256 stretches the digits
                into an AES-GCM key.
      Passkey   WebAuthn's PRF extension returns a
                secret bound to the device's
                authenticator, released only after
                Face ID / a fingerprint. It never
                touches disk.

    The token is encrypted separately under each, so
    either unlocks it and neither can derive the
    other. A wrong PIN fails AES-GCM's integrity
    check — there is no stored answer to compare
    against or skip past.
================================================*/

const VAULT_KEY = 'admin.vault';
const VAULT_VERSION = 2;

// A PIN has little entropy, so lean on iteration count to make each guess
// expensive for anyone brute-forcing a copied vault offline.
const PIN_ITERATIONS = 600000;
const MIN_PIN_LENGTH = 4;

const SALT_BYTES = 16;
const IV_BYTES = 12;
const CHALLENGE_BYTES = 32;
const WEBAUTHN_TIMEOUT_MS = 60000;
const RP_NAME = 'Portfolio Admin';
const CREDENTIAL_LABEL = 'Portfolio admin';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/*==============================================
            ENCODING HELPERS
================================================*/

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

function randomBytes(length) {
    return crypto.getRandomValues(new Uint8Array(length));
}

/*==============================================
            KEYS
================================================*/

async function keyFromPin(pin, salt, iterations) {
    const material = await crypto.subtle.importKey(
        'raw',
        encoder.encode(pin),
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

/**
 * The PRF output is already 32 bytes of key material from the authenticator's
 * own derivation, so it is imported directly rather than stretched again.
 */
async function keyFromPrf(output) {
    return crypto.subtle.importKey(
        'raw',
        output,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );
}

async function seal(key, token) {
    const iv = randomBytes(IV_BYTES);
    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoder.encode(token)
    );
    return { iv: toBase64(iv), data: toBase64(new Uint8Array(ciphertext)) };
}

async function open(key, wrapped, wrongKeyMessage) {
    try {
        const plaintext = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: fromBase64(wrapped.iv) },
            key,
            fromBase64(wrapped.data)
        );
        return decoder.decode(plaintext);
    } catch {
        throw new Error(wrongKeyMessage);
    }
}

/*==============================================
            WEBAUTHN
================================================*/

/**
 * Register a platform authenticator (Face ID, Touch ID, Android biometrics)
 * and confirm it can do PRF. Returns the credential id.
 */
async function registerCredential() {
    const credential = await navigator.credentials.create({
        publicKey: {
            challenge: randomBytes(CHALLENGE_BYTES),
            rp: { name: RP_NAME, id: window.location.hostname },
            user: {
                id: randomBytes(16),
                name: CREDENTIAL_LABEL,
                displayName: CREDENTIAL_LABEL
            },
            pubKeyCredParams: [
                { type: 'public-key', alg: -7 },
                { type: 'public-key', alg: -257 }
            ],
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
                userVerification: 'required',
                residentKey: 'preferred'
            },
            timeout: WEBAUTHN_TIMEOUT_MS,
            extensions: { prf: {} }
        }
    });

    if (!credential) throw new Error('No passkey was created.');

    // Browsers report PRF availability at registration but generally won't
    // return its output until an assertion, so this only checks support.
    if (!credential.getClientExtensionResults()?.prf?.enabled) {
        throw new Error(
            'This browser can register a passkey but cannot derive an encryption ' +
            'key from it (no WebAuthn PRF support), so it cannot protect the token. ' +
            'Your PIN still works.'
        );
    }

    return new Uint8Array(credential.rawId);
}

/** Ask the authenticator for the PRF secret behind a biometric check. */
async function evaluatePrf(credentialId, salt) {
    const assertion = await navigator.credentials.get({
        publicKey: {
            challenge: randomBytes(CHALLENGE_BYTES),
            rpId: window.location.hostname,
            allowCredentials: [{ type: 'public-key', id: credentialId }],
            userVerification: 'required',
            timeout: WEBAUTHN_TIMEOUT_MS,
            extensions: { prf: { eval: { first: salt } } }
        }
    });

    const output = assertion?.getClientExtensionResults()?.prf?.results?.first;
    if (!output) {
        throw new Error('The passkey did not return an encryption key. Use your PIN instead.');
    }

    return new Uint8Array(output);
}

/** Turn WebAuthn's error vocabulary into something worth reading. */
function describeWebAuthnError(error) {
    if (error.name === 'NotAllowedError') {
        return 'Biometric unlock was cancelled or timed out.';
    }
    if (error.name === 'InvalidStateError') {
        return 'This device already has a passkey registered for the panel.';
    }
    if (error.name === 'NotSupportedError') {
        return 'This device has no biometric authenticator available.';
    }
    return error.message;
}

/*==============================================
            PUBLIC API
================================================*/

function read() {
    const raw = localStorage.getItem(VAULT_KEY);
    return raw ? JSON.parse(raw) : null;
}

function write(data) {
    localStorage.setItem(VAULT_KEY, JSON.stringify(data));
}

export const vault = {
    minPinLength: MIN_PIN_LENGTH,

    exists() {
        return read() !== null;
    },

    hasPasskey() {
        return Boolean(read()?.passkey);
    },

    /** Whether biometric unlock is worth offering on this device at all. */
    async isPasskeySupported() {
        if (!window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable) {
            return false;
        }
        try {
            return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        } catch {
            return false;
        }
    },

    /** Create the vault, protected by a PIN. Replaces anything already there. */
    async create(token, pin) {
        if (pin.length < MIN_PIN_LENGTH) {
            throw new Error(`The PIN needs at least ${MIN_PIN_LENGTH} digits.`);
        }

        const salt = randomBytes(SALT_BYTES);
        const key = await keyFromPin(pin, salt, PIN_ITERATIONS);

        write({
            version: VAULT_VERSION,
            pin: {
                salt: toBase64(salt),
                iterations: PIN_ITERATIONS,
                ...await seal(key, token)
            },
            passkey: null
        });
    },

    async unlockWithPin(pin) {
        const stored = read();
        if (!stored) throw new Error('Nothing is set up on this device yet.');

        const key = await keyFromPin(
            pin,
            fromBase64(stored.pin.salt),
            stored.pin.iterations || PIN_ITERATIONS
        );

        return open(key, stored.pin, 'Wrong PIN.');
    },

    /** Add a biometric unlock alongside the PIN. Needs the plaintext token. */
    async enablePasskey(token) {
        const stored = read();
        if (!stored) throw new Error('Set up a PIN before adding biometric unlock.');

        try {
            const credentialId = await registerCredential();
            const salt = randomBytes(SALT_BYTES);
            const key = await keyFromPrf(await evaluatePrf(credentialId, salt));

            stored.passkey = {
                credentialId: toBase64(credentialId),
                salt: toBase64(salt),
                ...await seal(key, token)
            };
            write(stored);
        } catch (error) {
            throw new Error(describeWebAuthnError(error));
        }
    },

    async unlockWithPasskey() {
        const stored = read();
        if (!stored?.passkey) throw new Error('No biometric unlock is set up on this device.');

        let key;
        try {
            key = await keyFromPrf(await evaluatePrf(
                fromBase64(stored.passkey.credentialId),
                fromBase64(stored.passkey.salt)
            ));
        } catch (error) {
            throw new Error(describeWebAuthnError(error));
        }

        return open(key, stored.passkey, 'That passkey does not unlock this token. Use your PIN.');
    },

    clear() {
        localStorage.removeItem(VAULT_KEY);
    }
};
