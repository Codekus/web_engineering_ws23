export default class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getProductInfo() {
        return `${this.name} (ID: ${this.id}) - €${this.price.toFixed(2)}`;
    }
}
