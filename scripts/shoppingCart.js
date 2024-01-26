export default class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addToCart(product) {
        this.items.push(product);
    }

    listCartItems() {
        this.items.forEach((product, index) => {
            console.log(`${index + 1}. ${product.getProductInfo()}`);
        });
    }
}
