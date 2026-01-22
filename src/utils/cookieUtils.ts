export const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

export const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '') || null;
};

export const deleteCookie = (name: string) => {
    setCookie(name, '', -1);
};
