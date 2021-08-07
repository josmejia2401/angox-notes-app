export function getRandom(min = 0, max = 1000000) {
    return Math.random() * (max - min) + min;
}

export function getKey(min = 0, max = 1000000) {
    const result = Math.random() * (max - min) + min;
    return result.toString();
}