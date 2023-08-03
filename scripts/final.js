let items; // golbal used for the list of catalog objects
let cart_counter = 0;

$(document).ready(function(){
    // set up initial html for dynamic page //
    $('#page').html(
                    `<div id="cart" class="bg-warning d-flex flex-row fixed-top">
                        <h1 class="me-auto ms-4">ICS Final Project</h2>
                        <button id="viewCart" class="btn btn-primary ms-auto me-4 mt-2 mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                            </svg>
                            <span id="cart-number"></span>
                        </button>
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasCartLabel">Cart</h5>
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
                                    <button class="btn btn-dark me-auto" id="clear">Clear Cart</button>
                                    <button class="btn btn-dark ms-auto" id="checkout">Checkout</button>
                                </div>
                            </div>
                        </div>
                     </div>
                     <div id="shopping" class="bg-success pt-5">
                        <div id="products" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 d-flex flex-row justify-content-center"></div>
                     </div>
                     

                    <div class="modal modal-lg" id="paymentModal" aria-hidden="true" aria-labelledby="paymentModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-center">
                                        <button class="btn btn-primary px-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn px-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal" disabled>billing</button>
                                        <button class="btn px-4 shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>shipping</button>
                                        <button class="btn px-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>confim order</button>
                                    </div>
                                    <h5 class="modal-title">Payment Method</h5>
                                    <form id="payment-form">
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
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary bill" data-bs-target="#billingModal" data-bs-toggle="modal" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="billingModal" aria-hidden="true" aria-labelledby="billingModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-center">
                                        <button class="btn px-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn btn-primary px-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn px-4 shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>shipping</button>
                                        <button class="btn px-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>confim order</button>
                                    </div>
                                    <h5 class="modal-title">Billing Info</h5>
                                    <form id="billing-form">
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
                                                <label for="province">Province/State</label>
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
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="shippingModal" aria-hidden="true" aria-labelledby="shippingModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-center">
                                        <button class="btn px-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn px-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn btn-primary px-4 ship" data-bs-target="#shippingModal" data-bs-toggle="modal">shipping</button>
                                        <button class="btn px-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>confim order</button>
                                    </div>
                                    <h5 class="modal-title">Shipping Info</h5>
                                    <input type="checkbox" id="same-as-billing" name="shipping-info" value="yes">
                                    <label for="same-as-billing">Same as Billing</label>
                                    <form id="shipping-form">
                                        <div id="hide-if-same">
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
                                                    <label for="shipping-province">Province/State</label>
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
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="confirmModal" aria-hidden="true" aria-labelledby="confirmModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-center">
                                        <button class="btn px-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">payment</button>
                                        <button class="btn px-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal">billing</button>
                                        <button class="btn px-4 ship" data-bs-target="#shippingModal" data-bs-toggle="modal">shipping</button>
                                        <button class="btn btn-primary px-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal">confim order</button>
                                    </div>
                                    <h5 class="modal-title">Confirm Order</h5>
                                    <table id="confirm-cart" class="table border-0"></table>
                                    <div>
                                        <p id="tax-rate"></p>
                                        <p id="name"></p>
                                        <p id="shipping-add"></p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary post"  data-bs-dismiss="modal">Confirm</button>
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


    // Function for setting the cart-items div //
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

    // function for updating the cart number // 
    function updateCartNumber(){
        $('#cart-number').html(`&nbsp;${cart_counter}`);
        if(cart_counter == 0){
            $('#cart-number').hide(300);
        } else {
            $('#cart-number').hide().slideDown().show(300);
        }
    }

    // function for setting the added to cart table //
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

    function calculateTax(){
        let tax;
        let value=$('#shipping-province').val().toUpperCase();

        let state_check =  /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/;
        let prov_check = /BC|AB|SK|ON|MB|QC|N[BSLTU]|NS|NL|PE|NU|YT|NY/;
        if(state_check.test(value) || prov_check.test(value)){
            if(prov_check.test(value)){
                switch(value){
                    case "BC":
                        tax = 1.12;
                        break;
                    case "AB":
                        tax = 1.05;
                        break;
                    case "SK":
                        tax = 1.11;
                        break;
                    case "MB":
                        tax = 1.12;
                        break;  
                    case "ON":
                        tax = 1.13;
                        break;
                    case "QC":
                        tax = 1.15;
                        break;
                    case "NB":
                        tax = 1.15;
                        break;
                    case "NL":
                        tax = 1.15;
                        break;
                    case "NS":
                        tax = 1.15;
                        break;
                    case "NT":
                        tax = 1.05;
                        break;
                    case "NU":
                        tax = 1.05;
                        break;
                    case "PE":
                        tax = 1.15;
                        break;
                    case "YT":
                        tax = 1.05;
                        break;
                }
                $('#tax-rate').hide();     
            } else {
                $('#tax-rate').html('*tax rate may vary from').show();
                tax = 1.04;
            }
        }else {
            $('#tax-rate').html('*tax has not been calculated yet').show();
            tax = 1;
        }
        return tax;
    }

    function setConfirmTable(cart_list, cart, exchange){
        let table = document.querySelector("#confirm-cart");
        let tax = calculateTax();
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
            row.setAttribute("id", cart_list[i].id + "-confirm");
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            cell1.innerHTML = `<img class="confirm-img" src="${cart_list[i].image}">`
            cell2.innerHTML = cart_list[i].title;
            cell3.innerHTML = cart[cart_list[i].id];
            cell4.innerHTML = parseFloat(cart_list[i].price * exchange).toFixed(2);
            cell5.innerHTML = parseFloat(cart_list[i].price * cart[cart_list[i].id] * exchange).toFixed(2);
            totalPrice += parseFloat(cart_list[i].price * cart[cart_list[i].id] * exchange);
        }
        let subTotal = table.insertRow(-1);
        subTotal.setAttribute('id', 'confirm-subtotal');
        let text = subTotal.insertCell(0);
        let amount = subTotal.insertCell(1);
        text.innerHTML = "Subtotal";
        text.colSpan = 3;
        if($('#currency-type').val() == 'gbp'){ amount.innerHTML = `&#163; ${parseFloat(totalPrice).toFixed(2)}`; } 
        else {amount.innerHTML = `$ ${parseFloat(totalPrice).toFixed(2)}`;}
        amount.colSpan = 2;

        let shipping = table.insertRow(-1);
        shipping.setAttribute('id', 'confirm-shipping');
        let ship_text = shipping.insertCell(0);
        let ship_amount = shipping.insertCell(1);
        ship_text.innerHTML = "Shipping";
        ship_text.colSpan = 3;
        if($('#currency-type').val() == 'gbp'){ ship_amount.innerHTML = `&#163; ${15.00}`; } 
        else {ship_amount.innerHTML = `$ ${15.00}`;}
        ship_amount.colSpan = 2;

        let taxTotal = table.insertRow(-1);
        taxTotal.setAttribute('id', 'confirm-tax');
        let tax_text = taxTotal.insertCell(0);
        let tax_amount = taxTotal.insertCell(1);
        tax_text.innerHTML = "Tax";
        tax_text.colSpan = 3;
        if($('#currency-type').val() == 'gbp'){ tax_amount.innerHTML = `&#163; ${parseFloat(totalPrice * (tax - 1)).toFixed(2)}`; } 
        else {tax_amount.innerHTML = `$ ${totalPrice * (tax - 1).toFixed(2)}`;}
        tax_amount.colSpan = 2;

        let orderTotal = table.insertRow(-1);
        orderTotal.setAttribute('id', 'confirm-total');
        let order_text = orderTotal.insertCell(0);
        let order_amount = orderTotal.insertCell(1);
        order_text.innerHTML = "Order Total";
        order_text.colSpan = 3;
        if($('#currency-type').val() == 'gbp'){ order_amount.innerHTML = `&#163; ${parseFloat(totalPrice * (tax) + 15).toFixed(2)}`; } 
        else {order_amount.innerHTML = `$ ${parseFloat(totalPrice * (tax) + 15).toFixed(2)}`;}
        order_amount.colSpan = 2;
    }

    // function for updating the table in the the cart div //
    async function setCart(cart){
        let cart_list = setCartList(cart);

        let exchange = await setPrice();

        setCartTable(cart_list, cart, exchange);
        setConfirmTable(cart_list, cart, exchange);

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
        $('#cart-items tr td:nth-child(4)').each(function(){
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

    async function updateConfirmPrice(){
        let exchange = await setPrice();
        let tax = calculateTax();
        let shipping = 15;
        let totalPrice = 0;
        $('#confirm-cart tr td:nth-child(4)').each(function(){
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
        $('#confirm-subtotal')[0].cells[1].innerHTML = `$ ${parseFloat(totalPrice).toFixed(2)}`;
        if($('#currency-type').val() == 'gbp'){ 
            $('#confirm-subtotal')[0].cells[1].innerHTML = `&#163; ${parseFloat(totalPrice).toFixed(2)}`; 
        }

        $('#confirm-shipping')[0].cells[1].innerHTML = `$ ${parseFloat(shipping * exchange).toFixed(2)}`;
        if($('#currency-type').val() == 'gbp'){ 
            $('#confirm-shipping')[0].cells[1].innerHTML = `&#163; ${parseFloat(shipping * exchange).toFixed(2)}`; 
        }

        $('#confirm-tax')[0].cells[1].innerHTML = `$ ${parseFloat(totalPrice * (tax - 1)).toFixed(2)}`;
        if($('#currency-type').val() == 'gbp'){ 
            $('#confirm-tax')[0].cells[1].innerHTML = `&#163; ${parseFloat(totalPrice * (tax - 1)).toFixed(2)}`; 
        }

        $('#confirm-total')[0].cells[1].innerHTML = `$ ${parseFloat(totalPrice * (tax) + shipping).toFixed(2)}`;
        if($('#currency-type').val() == 'gbp'){ 
            $('#confirm-total')[0].cells[1].innerHTML = `&#163; ${parseFloat(totalPrice * (tax) + shipping).toFixed(2)}`; 
        }
    }
    
    // fetch call from fake store api for cards and catlog items //

    let storeURL = 'https://fakestoreapi.com/products/?limit=12';

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
            //console.log($("html").html());    // remove this at the end but keep it for validation
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

        cart_counter++;
        updateCartNumber();
        $('#cart-items').show();

        setCart(cart_items);
    });

    $(document).on('click', '.rm-cart-btn', function(){
        let product_id = $(this).closest("tr").attr("id");
        let confirm_id = product_id.split("-");
        confirm_id[0] += '-confirm';

        let cart_row = document.getElementById(product_id);
        let confirm_row = document.getElementById(confirm_id[0]);

        cart_row.parentNode.removeChild(cart_row);
        updateCartPrice();
        confirm_row.parentNode.removeChild(confirm_row);
        updateConfirmPrice();
        if(cart_counter == 0){
            // dont change cart number
        } else {
            cart_counter--;
        }
        updateCartNumber();

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

        cart_counter = 0;
        updateCartNumber();

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
            updateConfirmPrice();
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

    let creditNum_check = false
    let expiryMM_check = false
    let expiryYY_check = false
    let expiryNum_check = false;

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

    // validate on focus out instead of change because it works better for this //
    $('#credit-card').on('change', function(){

        let value = $('#credit-card').val().replace(/\s/g, '');
        
        let visa_fail = /^4111111111111110$/
        let mc_fail = /^5400000000001234$/
        let amex_fail = /^375987654321001$/

        creditNum_check = false;

        // error messages and card type change depending on what card type is used //
        if(visa_pass.test(value) || mc_pass.test(value) || amex_pass.test(value)){
            if(visa_pass.test(value)){
                
                $('#credit-card').css('background-color','rgba(152,251,152, 0.25)');
                $('#credit-card-error').html('')
                $('#credit-type').html('&nbsp;Visa');

                creditNum_check = true;

                // test for the fail case //
                if(visa_fail.test(value)){
                    $('#credit-card-error').html('please check your visa number or enter a new credit card number').css('color','red').hide().show(200);
                    $('#credit-card').css('background-color','rgba(240,128,128, 0.25)');
                }

            } else if(mc_pass.test(value)){
            
                $('#credit-card').css('background-color','rgba(152,251,152, 0.25)');
                $('#credit-card-error').html('')
                $('#credit-type').html('&nbsp;MasterCard');

                creditNum_check = true;

                // test for the fail case //
                if(mc_fail.test(value)){
                    $('#credit-card-error').html('please check your mastercard number or enter a new credit card number').css('color','red').hide().show(200);
                    $('#credit-card').css('background-color','rgba(240,128,128, 0.25)');
                }
            } else {
                
                $('#credit-card').css('background-color','rgba(152,251,152, 0.25)');
                $('#credit-card-error').html('')
                $('#credit-type').html('&nbsp;Amex');

                creditNum_check = true;

                // test for the fail case //
                if(amex_fail.test(value)){
                    $('#credit-card-error').html('please check your amex number or enter a new credit card number').css('color','red').hide().show(200);
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
        
        expiryMM_check = false;
        expiryYY_check = false;

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

                        expiryMM_check = true;
                        expiryYY_check = true;
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

    $('#expire-num').on('change', function(){

        let value = $('#expire-num').val();
        let num_pass = /^[0-9]{3}$/
        
        expiryNum_check = false;

        if(num_pass.test(value)){
            $('#expire-num').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#expire-num-error').html('');
            expiryNum_check = true;
        } else {
            $('#expire-num').val('').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#expire-num-error').html('please enter the 3 numbers on the back of your card').css('color','red').hide().show(200);
        }
    });

    // end of cv number validation //


    $('#payment-form').on('change', function(){
        if(expiryMM_check && expiryYY_check && expiryNum_check && creditNum_check){
            $('.bill').prop('disabled', false);
        } else {
            $('.bill').attr('disabled', true);
        }
    });

    // start of name validation //

    let billFirst_check = false;
    let billLast_check = false;

    $('#first-name').on('change', function(){

        let value = $('#first-name').val();
        let name_check = /^[a-zA-Z]+\-?[a-zA-Z]*[^\s\W0-9]$/;

        billFirst_check = false;

        if(name_check.test(value)){
            $('#first-name').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#first-name-error').html('');
            billFirst_check = true;
        } else {
            $('#first-name-error').html('Please enter a vaild first name without spaces').css('color','red').hide().show(200);
            $('#first-name').css('background-color', 'rgba(240,128,128, 0.25)');
        }
    });

    $('#last-name').on('change', function(){

        let value = $('#last-name').val();
        let name_check = /^[a-zA-Z]+['-]?[a-zA-Z]*[^\s\W0-9]$/;

        billLast_check = false;

        if(name_check.test(value)){
            $('#last-name').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#last-name-error').html('');
            billLast_check = true;
        } else {
            $('#last-name-error').html('Please enter a vaild last name without spaces').css('color','red').hide().show(200);
            $('#last-name').css('background-color', 'rgba(240,128,128, 0.25)');
        }
    });

    // end of name validation //


    $('#billing-add-1').on('keypress change', function(){
        function makereq(val){
            var xmlhttp = new XMLHttpRequest();
            var url = `https://geocoder.ca/?autocomplete=1&geoit=xml&auth=test&json=1&locate=${val}`;
        
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

    let billAdd_check1 = false;
    let billAdd_check2 = false;
    let billCity_check = false;
    let billCountry_check = false;
    let billProv_check = false;
    let billPostal_check = false;

    $('#billing-add-1').on('change', function(){
        
        let value = $('#billing-add-1').val();
        let add_check = /\w+(\s\w+){2,}/;

        billAdd_check1 = false;

        if(add_check.test(value)){
            $('#billing-add-1').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#billing-add-1-error').html('');
            billAdd_check1 = true;
        } else {
            $('#billing-add-1').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#billing-add-1-error').html('Please make sure you entered a correct street number').css('color','red').hide().show(200);
        }
    });

    $('#billing-add-2').on('focusout', function(){

        let value = $('#billing-add-2').val();
        let add2_check = /^[a-zA-Z0-9 -.]*$/;
        billAdd_check2 = false;

        if(add2_check.test(value)){
            $('#billing-add-2').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#billing-add-2-error').html('');
            billAdd_check2 = true;
        } else {
            $('#billing-add-2').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#billing-add-2-error').html('Please make sure you entered a correct street number').css('color','red').hide().show(200);
        }
    });

    $('#city').on('change', function(){

        let value = $('#city').val();
        let city_check = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        billCity_check = false;

        if(city_check.test(value)){
            $('#city').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#city-error').html('');
            billCity_check = true;
        } else {
            $('#city').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#city-error').html('Please make sure you entered a valid city').css('color','red').hide().show(200);
        }

    });

    $('#country').attr('maxlength', '2');
    $('#province').attr('maxlength', '2');

    $('#province').on('change', function(){

        let value = $('#province').val().toUpperCase();
        let state_check =  /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/;
        let prov_check = /BC|AB|SK|ON|MB|QC|N[BSLTU]|NS|NL|PE|NU|YT|NY/;
        billProv_check = false;

        if(prov_check.test(value) || state_check.test(value)){
            $('#province').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#province-error').html('');
            billProv_check = true;
        } else {
            $('#province').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#province-error').html('Please make sure you entered a valid province or state code').css('color','red').hide().show(200);
        }

    });

    $('#country').on('change', function(){

        let value = $('#country').val().toUpperCase();
        let country_check = /CA|US/;
        billCountry_check = false;

        if(country_check.test(value)){
            $('#country').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#country-error').html('');
            billCountry_check = true;
        } else {
            $('#country').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#country-error').html('Please enter either CA or US').css('color','red').hide().show(200);
        }

    });

    $('#postal-code').on('change', function(){

        let value = $('#postal-code').val().toUpperCase();
        let postal_check = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;
        let zip_check = /^[0-9]{5}(?:-[0-9]{4})?$/;

        billPostal_check = false;

        if(postal_check.test(value) || zip_check.test(value)){
            $('#postal-code').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#postal-error').html('');
            billPostal_check = true;
        } else {
            $('#postal-code').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#postal-error').html('Please enter a valid postal code').css('color','red').hide().show(200);
        }

    });

    // end of address validation //
   

    // start of perosonal information validation //

    let billEmail = false;
    let billPhone = false;

    $('#email').on('change', function(){

        let value = $('#email').val();
        let email_check = /^\w{2,256}\@\w+[/.]\w*/;

        billEmail = false;

        if(email_check.test(value)){
            $('#email').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#email-error').html('');
            billEmail = true;
        } else {
            $('#email').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#email-error').html('Please enter a vaild email').css('color','red').hide().show(200);
        }

    });

    $('#phone').on('change', function(){

        let value = $('#phone').val();
        let phone_check = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;

        billPhone = false;

        if(phone_check.test(value)){
            $('#phone').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#phone-error').html('');
            billPhone = true;
        } else {
            $('#phone').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#phone-error').html('Please enter a valid phone number').css('color','red').hide().show(200);
        }

    });

    // end of perosonal information validation //

    $('#billing-form').on('change', function(){

        if(billAdd_check1 && billAdd_check2 && billCity_check && billCountry_check && billProv_check && billPostal_check && billFirst_check && billLast_check && billPhone && billEmail){
            $('.shipping').prop('disabled', false);
        } else {
            $('.shipping').attr('disabled', true);
        }
        checked();
        updateConfirmPrice();
    });

    // end of billing validation //


    // start of shipping validation //

    let shipFirst_check = false;
    let shipLast_check = false;
    let shipAdd_check1 = false;
    let shipAdd_check2 = false;
    let shipCity_check = false;
    let shipCountry_check = false;
    let shipProv_check = false;
    let shipPostal_check = false;
    let shipEmail = false;
    let shipPhone = false;

    // check if the same //
    function checked(){
        let fName = $('#shipping-first-name');
        let lName = $('#shipping-last-name');
        let add1 = $('#shipping-add-1');
        let add2 = $('#shipping-add-2');
        let city = $('#shipping-city');
        let prov = $('#shipping-province');
        let country = $('#shipping-country');
        let postal = $('#shipping-postal-code');
        let email = $('#shipping-email');
        let phone = $('#shipping-phone');

        if(!$('#same-as-billing').is(':checked')){
            $('#hide-if-same').show(200);

            fName.val('').css('background-color', 'revert');
            $('#shipping-first-name-error').hide();

            lName.val('').css('background-color', 'revert');
            $('#shipping-last-name-error').hide();

            add1.val('').css('background-color', 'revert');
            $('#shipping-add-1-error').hide();

            add2.val('').css('background-color', 'revert');
            $('#shipping-add-2-error').hide();

            city.val('').css('background-color', 'revert');
            $('#shipping-city-error').hide();

            prov.val('').css('background-color', 'revert');
            $('#shipping-province-error').hide();

            country.val('').css('background-color', 'revert');
            $('#shipping-country-error').hide();

            postal.val('').css('background-color', 'revert');
            $('#shipping-postal-error').hide();

            shipFirst_check = false;
            shipLast_check = false;
            shipAdd_check1 = false;
            shipAdd_check2 = false;
            shipCity_check = false;
            shipCountry_check = false;
            shipProv_check = false;
            shipPostal_check = false;
        } else {
            $('#hide-if-same').hide();
            fName.val($('#first-name').val()).trigger('change');
            lName.val($('#last-name').val()).trigger('change');
            add1.val($('#billing-add-1').val()).trigger('change');
            add2.val($('#billing-add-2').val()).trigger('focusout');
            city.val($('#city').val()).trigger('change');
            prov.val($('#province').val()).trigger('change');
            country.val($('#country').val()).trigger('change');
            postal.val($('#postal-code').val()).trigger('change');
        }
    }

    checked();
    $('#same-as-billing').on('click', function(){
        checked();
    });
    // end check if the same //


    // start of shipping address validation //

    // shipping name validation //

    $('#shipping-first-name').on('change', function(){

        let value = $('#shipping-first-name').val();
        let name_check = /^[a-zA-Z]+\-?[a-zA-Z]*[^\s\W0-9]$/;

        shipFirst_check = false;

        if(name_check.test(value)){
            $('#shipping-first-name').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-first-name-error').html('');
            shipFirst_check = true;
        } else {
            $('#shipping-first-name-error').html('Please enter a vaild first name without spaces').css('color','red').hide().show(200);
            $('#shipping-first-name').css('background-color', 'rgba(240,128,128, 0.25)');
        }
    });

    $('#shipping-last-name').on('change', function(){

        let last_value = $('#shipping-last-name').val();
        let last_check = /^[a-zA-Z]+['-]?[a-zA-Z]*[^\s\W0-9]$/;

        shipLast_check = false;

        if(last_check.test(last_value)){
            $('#shipping-last-name').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-last-name-error').html('');
            shipLast_check = true;
            console.log(shipLast_check);
        } else {
            $('#shipping-last-name-error').html('Please enter a vaild last name without spaces').css('color','red').hide().show(200);
            $('#shipping-last-name').css('background-color', 'rgba(240,128,128, 0.25)');
            console.log(last_value);
        }
    });

    // end of shipping name validation //


    $('#shipping-add-1').on('change', function(){
        
        let value = $('#shipping-add-1').val();
        let add_check = /\w+(\s\w+){2,}/;

        shipAdd_check1 = false;

        if(add_check.test(value)){
            $('#shipping-add-1').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-add-1-error').html('');
            shipAdd_check1 = true;
        } else {
            $('#shipping-add-1').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-add-1-error').html('Please make sure you entered a correct street number').css('color','red').hide().show(200);
        }
    });

    $('#shipping-add-2').on('focusout', function(){

        let value = $('#shipping-add-2').val();
        let add2_check = /^[a-zA-Z0-9 -.]*$/;

        shipAdd_check2 = false;

        if(add2_check.test(value)){
            $('#shipping-add-2').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-add-2-error').html('');
            shipAdd_check2 = true;
        } else {
            $('#shipping-add-2').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-add-2-error').html('Please make sure you entered a correct street number').css('color','red').hide().show(200);
        }
    });

    $('#shipping-city').on('change', function(){

        let value = $('#shipping-city').val();
        let city_check = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

        shipCity_check = false;

        if(city_check.test(value)){
            $('#shipping-city').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-city-error').html('');
            shipCity_check = true;
        } else {
            $('#shipping-city').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-city-error').html('Please make sure you entered a valid city').css('color','red').hide().show(200);
        }

    });

    $('#shipping-country').attr('maxlength', '2');
    $('#shipping-province').attr('maxlength', '2');

    $('#shipping-province').on('change', function(){

        let value = $('#shipping-province').val().toUpperCase();
        let state_check =  /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/;
        let prov_check = /BC|AB|SK|ON|MB|QC|N[BSLTU]|NS|NL|PE|NU|YT|NY/;

        shipProv_check = false;

        if(prov_check.test(value) || state_check.test(value)){
            $('#shipping-province').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-province-error').html('');
            shipProv_check = true;
        } else {
            $('#shipping-province').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-province-error').html('Please make sure you entered a valid province or state code').css('color','red').hide().show(200);
        }

    });

    $('#shipping-country').on('change', function(){

        let value = $('#shipping-country').val().toUpperCase();
        let country_check = /CA|US/;

        shipCountry_check = false;

        if(country_check.test(value)){
            $('#shipping-country').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-country-error').html('');
            shipCountry_check = true;
        } else {
            $('#shipping-country').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-country-error').html('Please enter either CA or US').css('color','red').hide().show(200);
        }

    });

    $('#shipping-postal-code').on('change', function(){

        let value = $('#shipping-postal-code').val().toUpperCase();
        let postal_check = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;
        let zip_check = /^[0-9]{5}(?:-[0-9]{4})?$/;

        shipPostal_check = false;

        if(postal_check.test(value) || zip_check.test(value)){
            $('#shipping-postal-code').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-postal-error').html('');
            shipPostal_check = true;
        } else {
            $('#shipping-postal-code').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-postal-error').html('Please a valid postal or zip code').css('color','red').hide().show(200);
        }

    });

    // end of address validation //

    $('#shipping-form').on('change', function(){

        if(shipAdd_check1 && shipAdd_check2 && shipCity_check && shipCountry_check && shipProv_check && shipPostal_check && shipFirst_check && shipLast_check){
            $('.order').prop('disabled', false);
        } else {
            $('.order').attr('disabled', true);
        }
        $('#name').html(`Order by ${$('#first-name').val()} ${$('#last-name').val()}`);
        $('#shipping-add').html(`Order being sent to<br>${$('#shipping-add-1').val()}<br>${$('#shipping-add-2').val()}
                                <br>${$('#shipping-city').val().charAt(0).toUpperCase() + $('#shipping-city').val().slice(1)}, 
                                ${$('#shipping-province').val().toUpperCase()}, ${$('#shipping-country').val().toUpperCase()}
                                , ${$('#shipping-postal-code').val().toUpperCase()}`);
        updateConfirmPrice();
    });

});