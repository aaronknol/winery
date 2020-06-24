export function formatPrice(cents) {
    console.log('in formatToCents with: ', cents);
    return (cents / 100);
}

export default function formatToCents(amount) {
    console.log('in formatToCents with: ', amount);
    return (amount * 100);
}