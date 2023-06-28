export function local(key, value = undefined, fallback = null) {
    if (value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));

        return value;
    }

    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }

    return fallback;
};

export function session(key, value = undefined, fallback = null) {
    if (value !== undefined) {
        sessionStorage.setItem(key, JSON.stringify(value));

        return value;
    }

    if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    return fallback;
};

export function cookie(key, value = undefined, expires = 3.154e+7) {
    if (value === undefined) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }

        return '';
    }

    document.cookie = `${key}=${value};expires=${expiration(expires).toUTCString()};path=/;secure=true`;
}

function expiration(expires) {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * expires;

    return now.setTime(expireTime);
}
