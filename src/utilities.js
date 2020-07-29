export function formatPrice(cents) {
    console.log('in format with ', cents);

    if (cents === '') {
        return cents
    } else {
        if (cents.indexOf('.') !== -1) {
            return cents;
        }
        return (cents / 100);
    }
}

export function formatToCents(amount) {
    console.log('in formatToCents with ', amount)

    if (amount.indexOf('.') !== -1) {
        return amount;
    }

    return ((amount * 100).toString());
}