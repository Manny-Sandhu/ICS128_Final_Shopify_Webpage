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
                     

                    <div class="modal modal-lg" id="paymentModal" aria-hidden="true" aria-labelledby="paymentModalLabel" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Chekout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row">
                                        <button class="btn btn-primary px-4" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn px-4" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn px-4" data-bs-target="#shippingModal" data-bs-toggle="modal">shipping</button>
                                        <button class="btn px-4" data-bs-target="#confirmModal" data-bs-toggle="modal">confim order</button>
                                    </div>
                                    <h5 class="modal-title">Payment Method</h5>
                                    <div class="d-flex flex-column">
                                        <div class="mb-1 d-flex flex-column input-group">
                                            <label for="credit-card">credit card #</label>
                                            <div class="d-flex flex-row">
                                                <span class="input-group-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                                    </svg>
                                                    <span id="credit-type"></span>
                                                </span>
                                                <input id="credit-card" type="text" class="form-control" aria-label="credit-card" placeholder="Credit Card #">
                                            </div>
                                            <p id="credit-card-error"></p>
                                        </div>
                                        <div class="d-flex flex-row">
                                            <div class="mb-1 me-2 d-flex flex-column">
                                                <label for="expire-month">Expiry month</label>
                                                <input id="expire-month" type="text" class="form-control" aria-label="expire-month" placeholder="mm">
                                                <p id="expire-error"></p>
                                            </div>
                                            <div class="mb-1 ms-2 me-2 d-flex flex-column">
                                                <label for="expire-year">Expiry year</label>
                                                <input id="expire-year" type="text" class="form-control" aria-label="expire-year" placeholder="yyyy">
                                            </div>
                                            <div class="mb-1 ms-2 d-flex flex-column">
                                                <label for="expire-num">Security Info</label>
                                                <input id="expire-num" type="text" class="form-control" aria-label="expire-num" placeholder="###">
                                                <p id="expire-num-error"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary" data-bs-target="#billingModal" data-bs-toggle="modal">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="billingModal" aria-hidden="true" aria-labelledby="billingModalLabel" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Chekout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row">
                                        <button class="btn px-4" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn btn-primary px-4" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn px-4" data-bs-target="#shippingModal" data-bs-toggle="modal">shipping</button>
                                        <button class="btn px-4" data-bs-target="#confirmModal" data-bs-toggle="modal">confim order</button>
                                    </div>
                                    <h5 class="modal-title">Billing Info</h5>
                                    <div class="d-flex flex-row">
                                        <div class="mb-1 me-2 w-50 d-flex flex-column">
                                            <label for="first-name">First Name</label>
                                            <input id="first-name" type="text" class="form-control" aria-label="first-name" placeholder="first name">
                                            <p id="first-name-error"></p>
                                        </div>
                                        <div class="mb-1 ms-2 w-50 d-flex flex-column">
                                            <label for="last-name">Last Name</label>
                                            <input id="last-name" type="text" class="form-control" aria-label="last-name" placeholder="last name">
                                            <p id="last-name-error"></p>
                                        </div>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="billing-add-1">Street Address</label>
                                        <input id="billing-add-1" type="text" class="form-control" aria-label="billing-add-1" placeholder="Street Address">
                                        <p id="billing-add-1-error"></p>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="billing-add-2">Apt, Suite, etc. (Optional)</label>
                                        <input id="billing-add-2" type="text" class="form-control" aria-label="billing-add-2" placeholder="Apt Address">
                                        <p id="billing-add-2-error"></p>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <div class="mb-1 w-50 me-2 d-flex flex-column">
                                            <label for="city">City</label>
                                            <input id="city" type="text" class="form-control" aria-label="city" placeholder="City">
                                            <p id="city-error"></p>
                                        </div>
                                        <div class="mb-1 w-50 ms-2 d-flex flex-column">
                                            <label for="porvince">Province/State</label>
                                            <input id="province" type="text" class="form-control" aria-label="province" placeholder="Province/State">
                                            <p id="province-error"></p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <div class="mb-1 w-50 me-2 d-flex flex-column">
                                            <label for="country">Country</label>
                                            <input id="country" type="text" class="form-control" aria-label="country" placeholder="Country">
                                            <p id="country-error"></p>
                                        </div>
                                        <div class="mb-1 w-50 ms-2 d-flex flex-column">
                                            <label for="postal-code">Postal Code</label>
                                            <input id="postal-code" type="text" class="form-control" aria-label="postal-code" placeholder="Postal Code/Zip">
                                            <p id="postal-error"></p>
                                        </div>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="email">Email Address</label>
                                        <input id="email" type="text" class="form-control" aria-label="email" placeholder="Email Address">
                                        <p id="email-error"></p>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="phone">Phone Number</label>
                                        <input id="phone" type="text" class="form-control" aria-label="phone" placeholder="Phone Number">
                                        <p id="phone-error"></p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary" data-bs-target="#shippingModal" data-bs-toggle="modal">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="shippingModal" aria-hidden="true" aria-labelledby="shippingModalLabel" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Chekout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row">
                                        <button class="btn px-4" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn px-4" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn btn-primary px-4" data-bs-target="#shippingModal" data-bs-toggle="modal">shipping</button>
                                        <button class="btn px-4" data-bs-target="#confirmModal" data-bs-toggle="modal">confim order</button>
                                    </div>
                                    <h5 class="modal-title">Shipping Info</h5>
                                    <input type="checkbox" id="same-as-billing" name="shipping-info" value="metagross">
                                    <label for="same-as-billing">Same as Billing</label>
                                    <div class="d-flex flex-row">
                                        <div class="mb-1 me-2 w-50 d-flex flex-column">
                                            <label for="shipping-first-name">First Name</label>
                                            <input id="shipping-first-name" type="text" class="form-control" aria-label="shipping-first-name" placeholder="first name">
                                            <p id="shipping-first-name-error"></p>
                                        </div>
                                        <div class="mb-1 ms-2 w-50 d-flex flex-column">
                                            <label for="shipping-last-name">Last Name</label>
                                            <input id="shipping-last-name" type="text" class="form-control" aria-label="shipping-last-name" placeholder="last name">
                                            <p id="shipping-last-name-error"></p>
                                        </div>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="shipping-add-1">Street Address</label>
                                        <input id="shipping-add-1" type="text" class="form-control" aria-label="shipping-add-1" placeholder="Street Address">
                                        <p id="shipping-add-1-error"></p>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="shipping-add-2">Apt, Suite, etc. (Optional)</label>
                                        <input id="shipping-add-2" type="text" class="form-control" aria-label="shipping-add-2" placeholder="Apt Address">
                                        <p id="shipping-add-2-error"></p>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <div class="mb-1 w-50 me-2 d-flex flex-column">
                                            <label for="shipping-city">City</label>
                                            <input id="shipping-city" type="text" class="form-control" aria-label="shipping-city" placeholder="City">
                                            <p id="shipping-city-error"></p>
                                        </div>
                                        <div class="mb-1 w-50 ms-2 d-flex flex-column">
                                            <label for="shipping-porvince">Province/State</label>
                                            <input id="shipping-province" type="text" class="form-control" aria-label="shipping-province" placeholder="Province/State">
                                            <p id="shipping-province-error"></p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row">
                                        <div class="mb-1 w-50 me-2 d-flex flex-column">
                                            <label for="shipping-country">Country</label>
                                            <input id="shipping-country" type="text" class="form-control" aria-label="shipping-country" placeholder="Country">
                                            <p id="shipping-country-error"></p>
                                        </div>
                                        <div class="mb-1 w-50 ms-2 d-flex flex-column">
                                            <label for="shipping-postal-code">Postal Code</label>
                                            <input id="shipping-postal-code" type="text" class="form-control" aria-label="shipping-postal-code" placeholder="Postal Code/Zip">
                                            <p id="shipping-postal-error"></p>
                                        </div>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="shipping-email">Email Address</label>
                                        <input id="shipping-email" type="text" class="form-control" aria-label="email" placeholder="Email Address">
                                        <p id="shipping-email-error"></p>
                                    </div>
                                    <div class="mb-1 d-flex flex-column">
                                        <label for="shipping-phone">Phone Number</label>
                                        <input id="shipping-phone" type="text" class="form-control" aria-label="phone" placeholder="Phone Number">
                                        <p id="shipping-phone-error"></p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary" data-bs-target="#confirmModal" data-bs-toggle="modal">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="confirmModal" aria-hidden="true" aria-labelledby="confirmModalLabel" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Chekout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row">
                                        <button class="btn px-4" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn px-4" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn px-4" data-bs-target="#shippingModal" data-bs-toggle="modal">shipping</button>
                                        <button class="btn btn-primary px-4" data-bs-target="#confirmModal" data-bs-toggle="modal">confim order</button>
                                    </div>
                                    Confirm Order
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary" data-bs-target="#" data-bs-toggle="modal">Confirm</button>
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
                `<div class="cart-div card col-10 ms-1 me-1 mt-2 mb-2">
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
        let totalPrice = 0;
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
            cell4.innerHTML = parseFloat(cart_list[i].price * exchange).toFixed(2);
            cell5.innerHTML = parseFloat(cart_list[i].price * cart[cart_list[i].id] * exchange).toFixed(2);
            totalPrice += parseFloat(cart_list[i].price * cart[cart_list[i].id] * exchange);
        }
        let subTotal = table.insertRow(-1);
        subTotal.setAttribute('id', 'subtotal');
        let text = subTotal.insertCell(0);
        let amount = subTotal.insertCell(1);
        text.innerHTML = "Subtotal";
        text.colSpan = 3;
        if($('#currency-type').val() == 'gbp'){ amount.innerHTML = `&#163; ${parseFloat(totalPrice).toFixed(2)}`; } 
        else {amount.innerHTML = `$ ${parseFloat(totalPrice).toFixed(2)}`;}
        amount.colSpan = 2;
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
        let totalPrice = 0;
        $('tr td:nth-child(4)').each(function(){
            let this_id = $(this).parent().attr('id').split("-");
            for(let i = 0; i < items.length; i++){
                if(this_id[0] == items[i].id){
                    $(this).empty().append(parseFloat(items[i].price * exchange).toFixed(2));
                    let price_cell = parseFloat($(this).text());
                    let quantity_cell = parseFloat($(this).prev().text());
                    $(this).next().empty().append(parseFloat(price_cell * quantity_cell).toFixed(2));
                    totalPrice += parseFloat(price_cell * quantity_cell);
                }
            }
        });
        $('#subtotal')[0].cells[1].innerHTML = `$ ${parseFloat(totalPrice).toFixed(2)}`;
        if($('#currency-type').val() == 'gbp'){ 
            $('#subtotal')[0].cells[1].innerHTML = `&#163; ${parseFloat(totalPrice).toFixed(2)}`; 
        }
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

        $('#cart-items').show();

        setCart(cart_items);
    });

    $(document).on('click', '.rm-cart-btn', function(){
        var product_id = $(this).closest("tr").attr("id");
        let row = document.getElementById(product_id);

        row.parentNode.removeChild(row);
        updateCartPrice();

        product_id = parseInt(product_id.split("-"));
        var cart_items = get_cookie("shopping_cart_items");
        cart_items[product_id] = undefined;
        set_cookie("shopping_cart_items", cart_items);
        if($("#cart-items tr").length == 2){
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
        $('#paymentModal').modal('show').hide().fadeIn(300);
    });

    $("#currency-type").change(function () {

        updatePrice();

        if($('tr td:nth-child(4)')[0] != undefined){
            updateCartPrice();
        }

    });

    // start of validation code //


    // delete any non-numeric  to credit card info //   
    $('#credit-card, #expire-month, #expire-year, #expire-num').on('keypress change', function () {
        this.value = this.value.replace(/[^0-9\.]/g,'');  
    });

    // add spaces between 4 continous characters only for credit card number // 
    $('#credit-card').on('keypress change', function () {
        $(this).val(function (index, value) {   
            return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');   // add spaces
        });
    });

    
    // credit card number validation start //

    // globals needed for the 2 validation functions//
    let visa_pass = /^4[0-9]{12}(?:[0-9]{3})?$/
    let mc_pass = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/
    let amex_pass = /^3[47][0-9]{13}$/

    // if the input was incorrect delete the card number and make the background revert
    $('#credit-card').on('focusin', function(){
        let value = $('#credit-card').val().replace(/\s/g, '');
        if(visa_pass.test(value) | mc_pass.test(value) | amex_pass.test(value)){
            // do not delete the credit card number if it is correct
        } else {
            $('#credit-card').css('background-color','revert').val('');
        }
    });

    // validate on focus out because on change is distracting //
    $('#credit-card').on('change', function(){

        let value = $('#credit-card').val().replace(/\s/g, '');
        
        let visa_fail = /^4111111111111110$/
        let mc_fail = /^5400000000001234$/
        let amex_fail = /^375987654321001$/

        // error messages and card type change depending on what card type is used //
        if(visa_pass.test(value) || mc_pass.test(value) || amex_pass.test(value)){
            if(visa_pass.test(value)){
                
                $('#credit-card').css('background-color','rgba(152,251,152, 0.25)');
                $('#credit-card-error').html('')
                $('#credit-type').html('&nbsp;Visa');

                // test for the fail case //
                if(visa_fail.test(value)){
                    $('#credit-card-error').html('please check your visa number or enter a new credit card number').css('color','red').hide().show(200);
                    $('#credit-card').css('background-color','rgba(240,128,128, 0.25)');
                }

            } else if(mc_pass.test(value)){
            
                $('#credit-card').css('background-color','rgba(152,251,152, 0.25)');
                $('#credit-card-error').html('')
                $('#credit-type').html('&nbsp;MasterCard');

                // test for the fail case //
                if(mc_fail.test(value)){
                    $('#credit-card-error').html('please check your mastercard number or enter a new credit card number').css('color','red').hide().show(200);
                    $('#credit-card').css('background-color','rgba(240,128,128, 0.25)');
                }
            } else {
                
                $('#credit-card').css('background-color','rgba(152,251,152, 0.25)');
                $('#credit-card-error').html('')
                $('#credit-type').html('&nbsp;Amex');

                // test for the fail case //
                if(amex_fail.test(value)){
                    $('#credit-card-error').html('please check your visa number or enter a new credit card number').css('color','red').hide().show(200);
                    $('#credit-card').css('background-color','rgba(240,128,128, 0.25)');
                }
            }
        } else {
            $('#credit-card-error').html('Sorry we dont recognize that card type please check the card or try a new one').css('color','red').hide().show(200);
            $('#credit-card').css('background-color','rgba(240,128,128, 0.25)');
        }

    });

    // credit card number validatin end //


    // expiry validation start //

    // add max length to attribute to year and month // 

    $('#expire-month').attr('maxlength', '2');
    $('#expire-year').attr('maxlength', '4');

    $('#expire-month, #expire-year').on('change', function(){

        let yy_value = $('#expire-year').val();
        let mm_value = $('#expire-month').val();
        
        if(yy_value == '' || mm_value == ''){
            // do nothing if one of the inputs is blanked
        } else {
            
            let mm_pass = /^(0?[1-9]|1[0-2])$/;     // validation for month

            // validation for year
            let curDate = new Date();
            let cardDate = new Date(`${yy_value}-${mm_value}-1`);

            // check month then year and then both //
            if(mm_pass.test(mm_value)){

                $('#expire-month').css('background-color', 'rgba(152,251,152, 0.25)');
                $('#expire-error').html('');

                if(curDate.getFullYear() <= cardDate.getFullYear()){

                    $('#expire-year').css('background-color', 'rgba(152,251,152, 0.25)');
                    $('#expire-error').html('');

                    if(curDate < cardDate){
                        $('#expire-year, #expire-month').css('background-color', 'rgba(152,251,152, 0.25)');
                        $('#expire-error').html('');
                    } else {
                        $('#expire-year, #expire-month').css('background-color', 'rgba(240,128,128, 0.25)');
                        $('#expire-error').html('Please check the expiry date on your card').css('color','red').hide().show(200);
                    }
                }else {
                    $('#expire-year').css('background-color', 'rgba(240,128,128, 0.25)');
                    $('#expire-error').html('please enter a valid year').css('color','red').hide().show(200);
                }
            } else {
                $('#expire-month').css('background-color', 'rgba(240,128,128, 0.25)');
                $('#expire-error').html('please enter a valid month').css('color','red').hide().show(200);
            }
        }
    });

    // end of expiry validation //


    // start of cv number validation //

    $('#expire-num').attr('maxlength', '3');

    $('#expire-num').on('focusout', function(){

        let value = $('#expire-num').val();
        let num_pass = /^[0-9]{3}$/
        
        if(num_pass.test(value)){
            $('#expire-num').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#expire-num-error').html('');
        } else {
            $('#expire-num').val('').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#expire-num-error').html('please enter the 3 numbers on the back of your card').css('color','red');
        }
    });

    // end of cv number validation //


    // start of name validation //

    $('#first-name').on('focusout', function(){

        let value = $('#first-name').val();
        let name_check = /^[a-zA-Z]+\-?[a-zA-Z]*[^\s\W0-9]$/;

        if(name_check.test(value)){
            $('#first-name').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#first-name-error').html('');
        } else {
            $('#first-name-error').html('Please enter a vaild first name without spaces').css('color','red');
            $('#first-name').css('background-color', 'rgba(240,128,128, 0.25)');
        }
    });

    $('#last-name').on('focusout', function(){

        let value = $('#last-name').val();
        let name_check = /^[a-zA-Z]+['-]?[a-zA-Z]*[^\s\W0-9]$/;

        if(name_check.test(value)){
            $('#last-name').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#last-name-error').html('');
        } else {
            $('#last-name-error').html('Please enter a vaild last name without spaces').css('color','red');
            $('#last-name').css('background-color', 'rgba(240,128,128, 0.25)');
        }
    });

    // end of name validation //


    $('#billing-add-1').on('keypress change', function(){
        function makereq(val){
            var xmlhttp = new XMLHttpRequest();
            var url = `https://geocoder.ca/?locate=${val}&json=1`;
        
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let worked = JSON.parse(this.responseText); 
                    console.log(worked);
                }
            }
            xmlhttp.open("GET", url, true);
	        xmlhttp.send();
        }
        let value = $('#billing-add-1').val();
        makereq(value);

    });


    // start of address validation //

    $('#billing-add-1').on('change', function(){
        
        let value = $('#billing-add-1').val();
        let add_check = /\w+(\s\w+){2,}/;

        if(add_check.test(value)){
            $('#billing-add-1').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#billing-add-1-error').html('');
        } else {
            $('#billing-add-1').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#billing-add-1-error').html('Please make sure you entered a correct street number');
        }
    });

    $('#billing-add-2').on('change', function(){

        let value = $('#billing-add-2').val();
        let add2_check = /\w+(\s\w+){2,}/;

        if(add2_check.test(value)){
            $('#billing-add-2').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#billing-add-2-error').html('');
        } else {
            $('#billing-add-2').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#billing-add-2-error').html('Please make sure you entered a correct street number');
        }
    });

    $('#city').on('change', function(){

        let value = $('#city').val();
        let city_check = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

        if(city_check.test(value)){
            $('#city').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#city-error').html('');
        } else {
            $('#city').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#city-error').html('Please make sure you entered a valid city');
        }

    });

    $('#country').attr('maxlength', '2');
    $('#province').attr('maxlength', '2');

    $('#province').on('change', function(){

        let value = $('#province').val().toUpperCase();
        let state_check =  /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/;
        let prov_check = /BC|AB|SK|ON|MB|QC|N[BSLTU]|NS|NL|PE|NU|YT|NY/;

        if(prov_check.test(value) || state_check.test(value)){
            $('#province').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#province-error').html('');
        } else {
            $('#province').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#province-error').html('Please make sure you entered a valid province or state code');
        }

    });

    $('#country').on('change', function(){

        let value = $('#country').val().toUpperCase();
        let country_check = /CA|US/;

        if(country_check.test(value)){
            $('#country').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#country-error').html('');
        } else {
            $('#country').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#country-error').html('Please enter either CA or US');
        }

    });

    $('#postal').on('change', function(){

        let value = $('#postal').val();
        let postal_check = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;

        if(postal_check.test(value)){
            $('#postal-code').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#postal-error').html('');
        } else {
            $('#postal-code').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#postal-error').html('Please enter either CA or US');
        }

    });

    // end of address validation //
   
    $('#email').on('change', function(){

        let value = $('#email').val();
        let country_check = /^\w{2,256}\@\w+[/.]\w*/;

        if(country_check.test(value)){
            $('#email').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#email-error').html('');
        } else {
            $('#email').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#email-error').html('Please enter a vaild email');
        }

    });

    $('#phone').on('change', function(){

        let value = $('#phone').val();
        let country_check = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;

        if(country_check.test(value)){
            $('#phone').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#phone-error').html('');
        } else {
            $('#phone').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#phone-error').html('Please enter a valid phone number');
        }

    });



});