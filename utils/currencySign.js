function currencySign(amount) {
    if (amount == null || isNaN(amount)) {
        return '₹0';
    }
    return `₹${amount}`;
}

export default currencySign;