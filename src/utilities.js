export function formatPrice(cents) {
    console.log('in formatPrice with ', cents, ' and type is ', typeof cents, ' and the index is ', cents.indexOf('.'));
    if (typeof cents !== 'string') {
        console.log('in here, not a string: ', cents)
        return cents
    }
    if (cents.indexOf('.') === -1) {
        return (cents / 100);
    } else {
        return cents;
    }
}

export function formatToCents(amount) {
    console.log('in formatToCents with ', amount)

    return ((amount * 100).toString());
}