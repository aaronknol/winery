export function formatPrice(cents) {
    return (cents / 100);
}

export default function formatToCents(amount) {
    return (amount * 100);
}