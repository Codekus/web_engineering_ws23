import Product from './product.js';
import ShoppingCart from './shoppingCart.js';

const myCart = new ShoppingCart();

const product1 = new Product(1, "Laptop", 899.99);
const product2 = new Product(2, "Smartphone", 599.99);

myCart.addToCart(product1);
myCart.addToCart(product2);

myCart.listCartItems();

const productListElement = document.getElementById("productList");

myCart.items.forEach((product) => {
    productListElement.appendChild((() => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.getProductInfo()}`;
        return listItem;
    })());
});
