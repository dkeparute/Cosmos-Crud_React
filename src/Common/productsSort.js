function productsSort(state, by) {
    const list = state.slice();

    switch (by) {
        case 'product_asc':
            list.sort(function (a, b) {
                const productA = a.product.toUpperCase(); // ignore upper and lowercase
                const productB = b.product.toUpperCase(); // ignore upper and lowercase
                if (productA < productB) {
                    return -1;
                }
                if (productA > productB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
            break;
        case 'product_desc':
            list.sort((a, b) => {
                const productA = a.product.toUpperCase(); // ignore upper and lowercase
                const productB = b.product.toUpperCase(); // ignore upper and lowercase
                if (productA < productB) {
                    return 1;
                }
                if (productA > productB) {
                    return -1;
                }
                // names must be equal
                return 0;
            });
            break;
        case 'quantity_asc':
            list.sort((a, b) => {
                return a.quantity - b.quantity;
            });
            break;
        case 'quantity_desc':
            list.sort((a, b) => {
                return b.quantity - a.quantity;
            });
            break;
        default:
    }
    return list;
}
export default productsSort;