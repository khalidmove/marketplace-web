function currencySign(amount) {
    if (amount == null || isNaN(amount)) {
        return '0 IQD';
    }
    return `${amount} IQD`;
}

export default currencySign;