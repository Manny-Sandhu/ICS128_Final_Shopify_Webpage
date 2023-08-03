let items; // golbal used for the list of catalog objects
let cart_counter = 0;

$(document).ready(function(){
    // set up initial html for dynamic page //
    $('#page').html(
                    `<div id="cart" class="bg-success-subtle d-flex flex-row fixed-top">
                        <h1 class="me-auto ms-4">ICS Final Project</h2>
                        <button id="viewCart" class="btn btn-success ms-auto me-4 mt-2 mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                            </svg>
                            <span id="cart-number"></span>
                        </button>
                        <div class="offcanvas offcanvas-end bg-success-subtle" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
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
                     <div id="shopping" class="pt-5">
                        <div id="products" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 d-flex flex-row justify-content-center"></div>
                     </div>
                     

                    <div class="modal modal-lg" id="paymentModal" aria-hidden="true" aria-labelledby="paymentModal" tabindex="-1">
                        <div class="modal-dialog ">
                            <div class="modal-content">
                                <div class="modal-header bg-success-subtle">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-around justify-content-sm-center">
                                        <button class="btn btn-success px-1 px-sm-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">
                                            payment
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-piggy-bank" viewBox="0 0 16 16">
                                                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                                <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal" disabled>
                                            billing 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>
                                            shipping
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>
                                            confim order
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                            </svg>
                                        </button>
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
                                    <button class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-success bill" data-bs-target="#billingModal" data-bs-toggle="modal" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="billingModal" aria-hidden="true" aria-labelledby="billingModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-success-subtle">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-around justify-content-sm-center">
                                        <button class="btn px-1 px-sm-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">
                                            payment 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-piggy-bank" viewBox="0 0 16 16">
                                                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                                <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                            </svg>
                                        </button>
                                        <button class="btn btn-success px-1 px-sm-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal">
                                            billing 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>
                                            shipping
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>
                                            confim order
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                            </svg>
                                        </button>
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
                                            <input id="billing-add-1" list="bill-lookup" type="text" class="form-control" aria-label="billing-add-1" placeholder="Street Address">
                                            <datalist id="bill-lookup"></datalist>
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
                                    <button class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-success shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="shippingModal" aria-hidden="true" aria-labelledby="shippingModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-success-subtle">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-around justify-content-sm-center">
                                        <button class="btn px-1 px-sm-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">
                                            payment 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-piggy-bank" viewBox="0 0 16 16">
                                                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                                <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal" disabled>
                                            billing 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </button>
                                        <button class="btn btn-success px-1 px-sm-4 shipping" data-bs-target="#shippingModal" data-bs-toggle="modal">
                                            shipping
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>
                                            confim order
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                            </svg>
                                        </button>
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
                                                <input id="shipping-add-1" list="ship-lookup" type="text" class="form-control" aria-label="shipping-add-1" placeholder="Street Address">
                                                <datalist id="ship-lookup"></datalist>
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
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
                                    <button class="btn btn-success order" data-bs-target="#confirmModal" data-bs-toggle="modal" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal modal-lg" id="confirmModal" aria-hidden="true" aria-labelledby="confirmModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-success-subtle">
                                    <h5 class="modal-title">Checkout</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-row justify-content-around justify-content-sm-center">
                                        <button class="btn px-1 px-sm-4 payment" data-bs-target="#paymentModal" data-bs-toggle="modal">
                                            payment 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-piggy-bank" viewBox="0 0 16 16">
                                                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                                <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 bill" data-bs-target="#billingModal" data-bs-toggle="modal" disabled>
                                            billing 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </button>
                                        <button class="btn px-1 px-sm-4 shipping" data-bs-target="#shippingModal" data-bs-toggle="modal" disabled>
                                            shipping
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                                            </svg>
                                        </button>
                                        <button class="btn btn-success px-1 px-sm-4 order" data-bs-target="#confirmModal" data-bs-toggle="modal">
                                            confim order
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <h5 class="modal-title">Confirm Order</h5>
                                    <table id="confirm-cart" class="table border-0"></table>
                                    <div>
                                        <p id="tax-rate"></p>
                                        <p id="name"></p>
                                        <p id="shipping-add"></p>           
                                    </div>
                                    <div id="errors"></div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
                                    <button id="post" class="btn btn-success">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="modal modal-lg" id="confirmMessage" aria-hidden="true" aria-labelledby="confirmMessage" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-success-subtle">
                                    <h5 class="modal-title">Thank you for your order</h5>
                                </div>
                                <div class="modal-body">
                                    <p class="modal-text">
                                        Your Order has been confirmed and you will recieve a confirmation email shortly. 
                                        If there are any issues with your order please contact us as soon as you can.
                                        Thank you and enjoy the rest of your day
                                    </p> 
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
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
                `<div class="cart-div card col-10 ms-1 me-1 mt-2 mb-2 shadow-sm">
                    <img src="${prod[i].image}" class="card-img-top" alt="${prod[i].title}">
                    <div class="card-body">
                        <h5 class="card-title">${prod[i].title}</h5>
                        <p class="card-text">${prod[i].description}</p>
                    </div>
                    <div class="card-footer d-flex flex-row border-0 bg-transparent">
                        <h5 id="${prod[i].id}-price" class="card-title me-auto price">${"$" + prod[i].price}</h5>
                        <a id="${prod[i].id}" class="cart-btn btn btn-success ms-auto">Add to Cart</a>
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
            cell1.innerHTML = `<img class="confirm-img d-none d-sm-flex" src="${cart_list[i].image}" alt="img for item ${cart[cart_list[i].id]}">`
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

    async function moneyFetchCall(code){
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
                alert('Our money conversion system is currently down. We apologize for the inconvenience');
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

    function clear(){
        set_cookie("shopping_cart_items", null);

        cart_counter = 0;
        updateCartNumber();

        $('#cart-items').html('');
        $('#clear').hide(); 
        $('#checkout').hide();
    }

    $('#clear').on('click', function(){
        clear();
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
            
            let mm_pass = /^(0[1-9]|1[0-2])$/;     // validation for month

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

    function addRequest(val, inputID, outID){
        var xmlhttp = new XMLHttpRequest();
        var url = `https://geocoder.ca/?autocomplete=1&locate=${val}&geoit=xml&auth=test&json=1`;
    
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText); 
                $( inputID ).html('');
                let streetList = Object.values(data.streets.street);
                getAddress(streetList, outID); 
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function getAddress(streetList, id){
        let dataList = document.querySelector( id );
        let optionValues = streetList;

        for( let optionValue of optionValues ){
            let newOption = document.createElement( "option" );
            newOption.value = optionValue;
            dataList.appendChild(newOption);
        }
    }

    $('#billing-add-1').on('keypress change', function(){
        let value = $('#billing-add-1').val();
        addRequest(value, "#billing-add-1", "#bill-lookup");
    });

    // start of address validation //

    let billAdd_check1 = false;
    let billCity_check = false;
    let billCountry_check = false;
    let billProv_check = false;
    let billPostal_check = false;

    $('#billing-add-1').on('change', function(){
        
        let value = $('#billing-add-1').val().split(', ');
        let add_check = /\w+(\s\w+){2,}/;

        if(value.length == 4){
            $('#billing-add-1').val(value[0]);
            $('#city').val(value[1]).trigger('change');
            $('#province').val(value[2]).trigger('change');
            $('#postal-code').val(value[3]).trigger('change');
            $('#country').val('CA').trigger('change');
        }
        
        billAdd_check1 = false;

        if(add_check.test(value[0])){
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

        if(add2_check.test(value)){
            $('#billing-add-2').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#billing-add-2-error').html('');
        } else {
            $('#billing-add-2').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#billing-add-2-error').html('Please make sure you entered a correct street number').css('color','red').hide().show(200);
        }
    });

    $('#city').on('change', function(){

        let value = $('#city').val();
        let city_check = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
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

        if(billAdd_check1 && billCity_check && billCountry_check && billProv_check && billPostal_check && billFirst_check && billLast_check && billPhone && billEmail){
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
        } else {
            $('#shipping-last-name-error').html('Please enter a vaild last name without spaces').css('color','red').hide().show(200);
            $('#shipping-last-name').css('background-color', 'rgba(240,128,128, 0.25)');
        }
    });

    // end of shipping name validation //

    $('#shipping-add-1').on('keypress change', function(){
        let value = $('#shipping-add-1').val();
        addRequest(value, "#shipping-add-1", "#ship-lookup");
    });

    $('#shipping-add-1').on('change', function(){
        
        let value = $('#shipping-add-1').val().split(', ');
        let add_check = /\w+(\s\w+){2,}/;

        if(value.length == 4){
            $('#shipping-add-1').val(value[0]);
            $('#shipping-city').val(value[1]).trigger('change');
            $('#shipping-province').val(value[2]).trigger('change');
            $('#shipping-postal-code').val(value[3]).trigger('change');
            $('#shipping-country').val('CA').trigger('change');
        }

        shipAdd_check1 = false;

        if(add_check.test(value[0])){
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

        if(add2_check.test(value)){
            $('#shipping-add-2').css('background-color', 'rgba(152,251,152, 0.25)');
            $('#shipping-add-2-error').html('');
        } else {
            $('#shipping-add-2').css('background-color', 'rgba(240,128,128, 0.25)');
            $('#shipping-add-2-error').html('Please make sure you entered a correct street number').css('color','red').hide().show(200);
        }
    });

    $('#shipping-city').on('change', function(){

        let value = $('#shipping-city').val();
        let city_check = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

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

        if(shipAdd_check1 && shipCity_check && shipCountry_check && shipProv_check && shipPostal_check && shipFirst_check && shipLast_check){
            $('.order').prop('disabled', false);
        } else {
            $('.order').attr('disabled', true);
        }
        $('#name').html(`Order by: ${$('#first-name').val()} ${$('#last-name').val()}`);
        if($('#shipping-add-2').val() == ''){
        $('#shipping-add').html(`Order being sent to:<br>${$('#shipping-add-1').val()}
                                <br>${$('#shipping-city').val().charAt(0).toUpperCase() + $('#shipping-city').val().slice(1)}, 
                                ${$('#shipping-province').val().toUpperCase()}, ${$('#shipping-country').val().toUpperCase()}
                                , ${$('#shipping-postal-code').val().toUpperCase()}`);
        } else {
            $('#shipping-add').html(`Order being sent to:<br>${$('#shipping-add-1').val()}<br>${$('#shipping-add-2').val()}
                                <br>${$('#shipping-city').val().charAt(0).toUpperCase() + $('#shipping-city').val().slice(1)}, 
                                ${$('#shipping-province').val().toUpperCase()}, ${$('#shipping-country').val().toUpperCase()}
                                , ${$('#shipping-postal-code').val().toUpperCase()}`);
        }
        updateConfirmPrice();
    });

    $('#post').on('click', function(){
        let orderTotal = $('#confirm-total')[0].cells[1].innerHTML.split(' ')
        let postTotal = parseFloat(orderTotal[1]);

        let orderTax = $('#confirm-tax')[0].cells[1].innerHTML.split(' ');
        let postTax = orderTax[1];

        let submission_data = {  
            card_number: $('#credit-card').val().replace(/\s/g, ''),
            expiry_month:  $('#expire-month').val(),
            expiry_year: $('#expire-year').val(),
            security_code: $('#expire-num').val(),
            amount: postTotal,
            taxes: postTax,
            shipping_amount: 15.00,
            currency: $('#currency-type').val(),
            items: get_cookie("shopping_cart_items"),
            billing: {
                first_name: $('#first-name').val(),
                last_name: $('#last-name').val(),
                address_1: $('#billing-add-1').val(),
                address_2: $('#billing-add-2').val(),
                city: $('#city').val(),
                province: $('#province').val().toUpperCase(),
                country: $('#country').val().toUpperCase(),
                postal: $('#postal-code').val().toUpperCase(),
                phone: $('#phone').val(),
                email: $('#email').val()
            },
            shipping: {
                first_name: $('#shipping-first-name').val(),
                last_name: $('#shipping-last-name').val(),
                address_1: $('#shipping-add-1').val(),
                address_2: $('#billing-add-2').val(),
                city: $('#shipping-city').val(),
                province: $('#shipping-province').val().toUpperCase(),
                country: $('#shipping-country').val().toUpperCase(),
                postal: $('#shipping-postal-code').val().toUpperCase() 
           }
    };
        let form_data = new FormData();
        form_data.append('submission', JSON.stringify(submission_data));
            

        fetch('https://deepblue.camosun.bc.ca/~c0180354/ics128/final/', {
            method: 'Post',
            cache: 'no-cache',
            body: form_data
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('processing server issue');
        }).then(data => {
            if(data.status == "SUCCESS"){
                $('#errors').hide();
                $('#confirmModal').modal('hide');
                $('#confirmMessage').modal('show');
                clear();
                $('.offcanvas').offcanvas('hide');
                $('input').each(function(){
                    $(this).val('').css('background-color', 'revert');
                    $('.bill').attr('disabled', true);
                    $('.shipping').attr('disabled', true);
                    $('.order').attr('disabled', true);
                })
            } else {
                let errors = Object.keys(data.error);
                let values = Object.values(data.error);
                let errortext="";

                for(let i = 0; i<errors.length; i++){
                    if(errors[i] == "billing"){
                        billErrors = Object.keys(data.error.billing);
                        billValues = Object.values(data.error.billing);
                        for(let i = 0; i < billErrors.length; i++){
                            errortext += `<p>Billing Error: ${billValues[i]}</p>`
                        }
                    } else if (errors[i] == "shipping"){
                        shipErrors = Object.keys(data.error.shipping);
                        shipValues = Object.values(data.error.shipping);
                        for(let i = 0; i < billErrors.length; i++){
                            errortext += `<p>Shipping Error: ${billValues[i]}</p>`
                        }
                    } else {
                        errortext += `<p>${errors[i]}: ${values[i]}</p>`
                    }
                }
                throw new Error(errortext);
            }
        }).catch(e => {
            $('#errors').show().html(e).css('color','red').hide().show(300);
        });
    });
});