export function sample<T>(arr: Array<T>, size: number): Array<T> {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

export const range = (n: number) => Array.from({ length: n }, (value, key) => key);