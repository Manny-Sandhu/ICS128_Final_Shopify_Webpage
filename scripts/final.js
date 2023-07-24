let items; // golbal used for the list of catalog objects

$(document).ready(function(){
    // set up initial html for dynamic page //
    $('#page').html(
                    `<div id="cart" class="bg-warning d-flex flex-row">
                        <h1 class="me-auto ms-4">ICS Final Project</h2>
                        <button id="viewCart" class="btn btn-primary ms-auto me-4 mt-2 mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">View Cart</button>
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasCartLabel">Offcanvas</h5>
                                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <select class="form-select" aria-label="cartSelect">
                                    <option value="1" selected>One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <ul id="cart-items"></ul>
                            </div>
                        </div>
                     </div>
                     <div id="shopping" class="bg-success">
                        <div id="products" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 d-flex flex-row justify-content-center"></div>
                     </div>`
    );

    // function for creating cards used in the fetch call //
    function createCard(prod){
        for(let i = 0; i<prod.length; i++){
            $('#products').append(
                                `<div class="cart-div card ms-3 me-3 mt-2 mb-2">
                                    <img src="${prod[i].image}" class="card-img-top" alt="${prod[i].title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${prod[i].title}</h5>
                                        <p class="card-text">${prod[i].description}</p>
                                    </div>
                                    <div class="card-footer d-flex flex-row border-0 bg-transparent">
                                        <h5 class="card-title me-auto">${"$" + prod[i].price}</h5>
                                        <a id="${prod[i].id}" class="cart-btn btn btn-primary ms-auto">Add to Cart</a>
                                    </div>
                                </div>`);
        }
    }

    // function for creating a list of catalog items that is placed in the items global //
    function createItems(items){
        let itemList = [];
        for(let i = 0; i<items.length; i++){
            curItem = new Catalog(items[i].category, items[i].description, items[i].id, items[i].image, items[i].price, items[i].rating.rate, items[i].title);
            itemList.push(curItem);
        }
        return itemList;
    }

    // Function for settin the cart-items div //
    function setCart(cart){
        console.log(cart);
        let j = 1;
        let text = "";
        let cart_list = [];
        for (let i = 0; i < items.length; i++){
            let item = items[i];
            if(cart[j] != undefined){
                cart_list.push(item);
                console.log(item);      // remove this before handing in the project
            }
            j++;
        }
        for(let i = 0; i<cart_list.length; i++){
            text += `<li>${cart_list[i].title} price : ${cart_list[i].price} number: ${cart[cart_list[i].id]}</li>`;
        }
        console.log(text);      // remove this before handing in the project
        $('#cart-items').html(text);
    }

    // fetch call from fake store api for cards and catlog items //
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            items = createItems(data);
            createCard(items);
        });
    
    // makes sure there isnt anything in the shopping cart items cookie //
    set_cookie("shopping_cart_items", null);

    // on click for the add cart buttons //
    $(document).on('click', '.cart-btn', function(){

        var product_id = $(this).attr("id");
        // var product = items[product_id - 1];
        // console.log(product); 
        //console.log(product_id);
        var cart_items = get_cookie("shopping_cart_items"); // get the data stored as a "cookie"
        
        // initialize the cart items if it returns null
        if (cart_items === null) {
            cart_items = {};
        }
        // make sure the object is defined;
        if (cart_items[product_id] === undefined) {
            cart_items[product_id] = 0;
        }
    
        cart_items[product_id]++;
    
        set_cookie("shopping_cart_items", cart_items); // setting the cart items back to the "cookie" storage
        console.log(get_cookie('shopping_cart_items'));

        setCart(cart_items);
    });
});