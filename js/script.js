let openCart = document.querySelector('#cart-icon'),
    cart = document.querySelector('.cart'),
    closeCart = document.querySelector('#close-cart')


openCart.onclick = () => {
    cart.classList.add('active')
}

closeCart.onclick = () => {
    cart.classList.remove('active')
}

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartButtons = document.querySelectorAll('.cart-remove')
    // console.log(removeCartButtons);
    for(let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.querySelectorAll('.cart-quantity')
        for(let i = 0; i < quantityInputs.length; i++){
            let input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

    // Add to cart 
    let addCarts = document.querySelectorAll('.add-cart')
        for(let i = 0; i < addCarts.length; i++){
            let button = addCarts[i]

            button.addEventListener('click', addCartClicked)
        }

    // Buy button work 
    document.querySelectorAll('.btn-buy')[0].addEventListener('click', buyButtonClicked)
}

function buyButtonClicked(){
    alert('You Order is placed')
    let cartContent = document.querySelectorAll('.cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

function removeCartItem(e){
    let buttonClicked = e.target
    console.log(buttonClicked);
    buttonClicked.parentElement.remove()
    updateTotal()
}

function quantityChanged(e) {
    let input = e.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

function addCartClicked(e) {
    let button        = e.target,
        shopProducts  = button.parentElement,
        title         = shopProducts.querySelectorAll('.product-title')[0].innerText,
        price         = shopProducts.querySelectorAll('.price')[0].innerText,
        productImg    = shopProducts.querySelectorAll('.product-img')[0].src;
        
        addProductToCart(title, price, productImg);
        updateTotal()
}

function addProductToCart(title, price, productImg) {
    let cartShopBox     = document.createElement('div'),
        cartItems       = document.querySelectorAll('.cart-content')[0],
        cartItemsNames  = cartItems.querySelectorAll('.cart-product-title')

        cartShopBox.classList.add('cart-box')

        for(let i = 0; i < cartItemsNames.length; i++){
            if(cartItemsNames[i].innerText == title){
                alert('You have already add this item cart')
            return;
            }
        }

        let cartBoxContent = `<img src="${productImg}" alt="product2" class="cart-img">
                                <div class="detail-box">
                                   <div class="cart-product-title">${title}</div>
                                   <div class="cart-price">${price}</div>
                                   <input type="number" name="" value="1" id="" class="cart-quantity">
                                </div>
                                <i class="bx bxs-trash-alt cart-remove"></i>`

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.querySelectorAll('.cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.querySelectorAll('.cart-quantity')[0].addEventListener('change', quantityChanged)
}


    


function updateTotal(){
    let cartContent = document.querySelectorAll('.cart-content')[0],
        cartBoxes   = cartContent.querySelectorAll('.cart-box'),
        total = 0

    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox       = cartBoxes[i],
            priceElem     = cartBox.querySelectorAll('.cart-price')[0],
            quantityElem  = cartBox.querySelectorAll('.cart-quantity')[0],
            price         = parseFloat(priceElem.innerText.replace('$', '')),
            quantity      = quantityElem.value

            total = total + (price * quantity)
    }
            total = Math.round(total * 100) / 100

        document.querySelectorAll('.total-price')[0].innerText = '$' + total
}