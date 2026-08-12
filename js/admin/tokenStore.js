/*==============================================
            TOKEN STORE MODULE

    The panel's only credential is a GitHub token,
    kept in localStorage so it survives reloads and
    you aren't retyping it on a phone.

    It is stored as-is: anything with access to this
    browser can read it, so the token should be
    fine-grained (this repo, Contents: Read and
    write) and carry an expiry date. Logging out
    removes it.
================================================*/

const TOKEN_KEY = 'admin.token';

export const tokenStore = {
    get() {
        return localStorage.getItem(TOKEN_KEY);
    },

    save(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    clear() {
        localStorage.removeItem(TOKEN_KEY);
    }
};
