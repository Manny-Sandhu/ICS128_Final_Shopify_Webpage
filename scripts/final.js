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
                                <select id="currency-type" class="form-select" aria-label="cartSelect">
                                    <option value="cad" selected>Canadian Dollar</option>
                                    <option value="usd">US Dollar</option>
                                    <option value="gbp">British Pound</option>
                                </select>
                                <table id="cart-items" class="table border-0"></table>
                                <div id="cart_buttons" class="d-flex flex-row">
                                    <button class="btn btn-dark" id="clear">Clear Cart</button>
                                    <button class=btn btn-dark" id="checkout">Checkout</button>
                                </div>
                            </div>
                        </div>
                     </div>
                     <div id="shopping" class="bg-success">
                        <div id="products" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 d-flex flex-row justify-content-center"></div>
                     </div>
                     <div class="modal fade" id="checkoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="checkoutModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                            </div>
                        </div>
                    </div>`
    );

    // hides the checkout and clear button //
    $('#clear').hide(); 
    $('#checkout').hide();


    // function for creating cards used in the fetch call //
    function createCard(prod){
        $('#products').html('');
        for(let i = 0; i<prod.length; i++){
            $('#products').append(
                `<div class="cart-div card ms-3 me-3 mt-2 mb-2">
                    <img src="${prod[i].image}" class="card-img-top" alt="${prod[i].title}">
                    <div class="card-body">
                        <h5 class="card-title">${prod[i].title}</h5>
                        <p class="card-text">${prod[i].description}</p>
                    </div>
                    <div class="card-footer d-flex flex-row border-0 bg-transparent">
                        <h5 id="${prod[i].id}-price" class="card-title me-auto price">${"$" + prod[i].price}</h5>
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
    function setCartList(cart){
        let j = 1;
        let cart_list = [];

        for (let i = 0; i < items.length; i++){
            let item = items[i];
            if(cart[j] != undefined){
                cart_list.push(item);
            }
            j++;
        }
        return cart_list;
    }
    function setCartTable(cart_list, cart, exchange){
        let table = document.querySelector("#cart-items");
        
        table.innerHTML =`<tr>
                            <th></td>
                            <th>Item</td>
                            <th>Quantity</td>
                            <th>Price</td>
                            <th>Total</td>
                          </tr>`;

        for(let i = 0; i < cart_list.length; i++){

            let row = table.insertRow(-1);
            row.setAttribute("id", cart_list[i].id + "-cart");
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            cell1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash rm-cart-btn" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>`
            cell2.innerHTML = cart_list[i].title;
            cell3.innerHTML = cart[cart_list[i].id];
            test = cart[cart_list[i].id];
            cell4.innerHTML = parseFloat(cart_list[i].price * exchange).toFixed(2);
            cell5.innerHTML = parseFloat(cart_list[i].price * cart[cart_list[i].id] * exchange).toFixed(2);
        }
    }

    async function setCart(cart){
        let cart_list = setCartList(cart);

        let exchange = await setPrice();

        setCartTable(cart_list, cart, exchange);

        $('#clear').show(); 
        $('#checkout').show();
    }

    function changePrice(rate){
        let currency = $('#currency-type').val();
        if(currency == 'gbp'){
            for(let i = 0; i < items.length; i++){
                $(`#${items[i].id}-price`).html(`<span>&#163;</span>${parseFloat(items[i].price * rate).toFixed(2)}`);
            }
        } else {
            for(let i = 0; i < items.length; i++){
                $(`#${items[i].id}-price`).html(`${"$" + parseFloat(items[i].price * rate).toFixed(2)}`);
            }
        }
    }

    async function setPrice(){
        let currency = $('#currency-type').val();
        let rate = await moneyFetchCall(currency);
        return rate;
    }

    async function updatePrice(){
        let exchange = await setPrice();
        changePrice(exchange);
    }

    async function updateCartPrice(){
        let exchange = await setPrice();
    
        $('tr td:nth-child(4)').each(function(){
            let this_id = $(this).parent().attr('id').split("-");
            for(let i = 0; i < items.length; i++){
                if(this_id[0] == items[i].id){
                    $(this).empty().append(parseFloat(items[i].price * exchange).toFixed(2));
                    let price_cell = parseFloat($(this).text());
                    let quantity_cell = parseFloat($(this).prev().text());
                    $(this).next().empty().append(parseFloat(price_cell * quantity_cell).toFixed(2))
                }
            }
        });

    }
    
    // fetch call from fake store api for cards and catlog items //

    let storeURL = 'https://fakestoreapi.com/products/';

    function moneyFetchCall(code){
        let moneyURL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad/${code}.json`;
        return fetch(moneyURL)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('broken api');
            })
            .then((data)=> {
                let code = $('#currency-type').val();
                if(code == 'cad'){ return data.cad};
                if(code == 'usd'){ return data.usd};
                if(code == 'gbp'){ return data.gbp};
                })
            .catch((e) => {
                console.log(e);
            });
    }
    
    function storeFetchCall(url){
        fetch(url)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('broken api');
        }
        )
        .then((data)=> {
            items = createItems(data);
            createCard(items);
        })
        .catch((e) => {
            let url = 'https://deepblue.camosun.bc.ca/~c0180354/ics128/final/fakestoreapi.json';
            storeFetchCall(url);
        });
    }
    storeFetchCall(storeURL);

    // makes sure there isnt anything in the shopping cart items cookie //
    set_cookie("shopping_cart_items", null);

    // on click for the add cart buttons //
    $(document).on('click', '.cart-btn', function(){

        var product_id = $(this).attr("id");

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

        setCart(cart_items);
    });

    $(document).on('click', '.rm-cart-btn', function(){
        var product_id = $(this).closest("tr").attr("id");
        let row = document.getElementById(product_id);

        row.parentNode.removeChild(row);

        product_id = parseInt(product_id.split("-"));
        var cart_items = get_cookie("shopping_cart_items");
        cart_items[product_id] = undefined;
        set_cookie("shopping_cart_items", cart_items);

        if($("#cart-items tr").length == 1){
            $('#cart-items').hide();
            $('#clear').hide(); 
            $('#checkout').hide();
        }
    });

    $('#clear').on('click', function(){
        set_cookie("shopping_cart_items", null);

        $('#cart-items').html('');
        $('#clear').hide(); 
        $('#checkout').hide();
    });

    $('#checkout').on('click',function(){
        $('#checkoutModal').modal('show').hide().fadeIn(300);
    });

    $("#currency-type").change(function () {

        updatePrice();
        updateCartPrice();
    });

});