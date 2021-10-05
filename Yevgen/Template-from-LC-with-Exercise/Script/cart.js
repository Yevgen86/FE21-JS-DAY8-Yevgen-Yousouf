var products = [{
    name: "Cube 2019",
    image: "Images/cube2019.jpeg",
    price: 3200.00,
    qtty: 1
}, {
    name: "GT Avalanche",
    image: "Images/gtavalanche.jpg",
    price: 2100.00,
    qtty: 1
}, {
    name: "Trek 8",
    image: "Images/trekfull8.jpg",
    price: 4500.00,
    qtty: 1
}];

for (let val of products) {
    document.getElementById("products").innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class ="product-title h3 m-3">${val.name}</p>
    <img class ="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
        <p class="product-price h4 m-3">${ val.price} €</p>
        <button class="btn btn-primary product-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `;
}

var cart = [];

function addToCart(product) {
    if (cart.length == 0) {
        cart.push(product);
    } else if (cart.find((val) => val.name == product.name)) {
        product.qtty++;
    } else {
        cart.push(product);
    }
    createRow();
    total();
    showAmountOfItems(); // Showing the amount of items in the cart
}

var buttons = document.getElementsByClassName("product-button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // movies[i].likes++;
        // document.getElementsByClassName("product-title")[i].innerHTML = movies[i].likes;
        addToCart(products[i]);
    })
}

function createRow() {
    document.getElementById("cart-items").innerHTML = "";
    for (let val of cart) {

        document.getElementById("cart-items").innerHTML += `

    <div class="cart-row row d-flex">

        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>

        <span class="cart-price col-3 h4 my-3 align-self-center">${val.price} €</span>

        <div class="cart-qtty-action col-3 d-flex align-items-end">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>        
            <button class="del btn btn-danger rounded-circle my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>

    </div>
    `;
    }

    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            total();
            showAmountOfItems(); // Showing the amount of items in the cart
        })

        del[i].addEventListener("click", function() {
            deleteItem(i);
            total();
            showAmountOfItems(); // Showing the amount of items in the cart
        })

        minus[i].addEventListener("click", function() {
            minusQtty(i);
            total();
            showAmountOfItems(); // Showing the amount of items in the cart
        })
    }
}

function total() {
    let total = 0;
    let discount = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
        // total = 0 + (3200 * 3); 
        // total = 9600 + (2100 * 4)
    }
    // Giving and displaying a discount if the amount is over a certain amount (e.g. 10% on EUR 100,- purchase)
    if(total >= 5000) {
        discount = ((total / 100) * 10);
        total = total - discount;
    }
    document.getElementById("price").innerHTML = total.toFixed(2) + " €";
    document.getElementById("discount").innerHTML = discount.toFixed(2) + " €";
}

function plusQtty(index) {
    cart[index].qtty++; // 2
    document.getElementsByClassName("cart-quantity")[index].innerHTML = cart[index].qtty; // 2
}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        // console.table(cart);
        createRow();
    } else {
        cart[i].qtty--;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRow();
}

/* Javascript | Day 8 | Exercises
You will create a shopping cart today for a florist that sells a variety of flowers.

Additionally to the standard features(add to cart, change quantity, remove from cart and showing total sum), you should implement the following:

+ showing the amount of items in the cart
+ giving and displaying a discount if the amount is over a certain amount (e.g. 10% on EUR 100,- purchase) */

// Showing the amount of items in the cart
function showAmountOfItems() {
    let totalAmount = 0;
    for(let val of cart) {
        totalAmount = totalAmount + val.qtty;
    }
    document.getElementById("itemsTotal").innerHTML = totalAmount;
}