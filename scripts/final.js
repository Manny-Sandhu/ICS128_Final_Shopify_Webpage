
$(document).ready(function(){
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
                            </div>
                        </div>
                     </div>
                     <div id="shopping" class="bg-success">
                        <div id="products" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 d-flex flex-row justify-content-center"></div>
                     </div>`
    );

    function createCard(prod){
        for(let i = 0; i<prod.length; i++){
            $('#products').append(
                                `<div class="card ms-3 me-3 mt-2 mb-2">
                                    <img src="${prod[i].image}" class="card-img-top" alt="${prod[i].title}">
                                    <div class="card-body h-100">
                                        <h5 class="card-title">${prod[i].title}</h5>
                                        <p class="card-text">${prod[i].description}</p>
                                    </div>
                                    <div class="card-footer d-flex flex-row border-0 bg-transparent">
                                        <h5 class="card-title me-auto">${"$" + prod[i].price}</h5>
                                        <a class="cart-btn btn btn-primary ms-auto">Add to Cart</a>
                                    </div>
                                </div>`);
        }
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createCard(data);
        });
});