export function formatPrice(cents) {
    console.log('in format with ', cents);
    if (typeof cents !== 'string') {
        console.log('in here, not a string: ', cents)
        return cents
    }
    if (cents.indexOf('.') === -1) {
        console.log('hey im returning ', (cents / 100));
        return (cents / 100);
    } else {
        return cents;
    }
}

export function formatToCents(amount) {
    console.log('in formatToCents with ', amount)

    return ((amount * 100).toString());
}