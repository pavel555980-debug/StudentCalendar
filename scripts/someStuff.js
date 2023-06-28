export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function getCookie(document, name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}