export function ensureArray(value: unknown) {
    return Array.isArray(value) ? value : [value]
}