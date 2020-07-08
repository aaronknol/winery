export function formatPrice(cents) {
    console.log('in formatPrice with ', cents);
    if (cents.indexOf('.') === -1) {
        return (cents / 100);
    } else {
        return cents;
    }
}

// export function formatToCents(amount) {
//     console.log('in formatToCents with ', amount)
//     if (amount.indexOf('.'))
//     return (amount * 100);
// }