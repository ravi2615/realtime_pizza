
import axios from 'axios'

import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector("#cartCounter")

addToCart.forEach((btn) => {

    function updateCart(pizza) {
        axios.post('/update-cart', pizza).then(res => {
            // console.log(res)
            cartCounter.innerText = res.data.totalQty

            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Item added to cart',
                progressBar: false,
            }).show();
        }).catch(err => {
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Something went wrong',
                progressBar: false,
            }).show();
        })

    }

    btn.addEventListener('click', (e) => {
        // console.log(e)
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza)
    })
})