// Script for navigation bar
const bar=document.getElementById('bar')
const close=document.getElementById('close')
const nav=document.getElementById('navbar')

let totalItems = 0
let cartTableData = []

if(bar){
    bar.addEventListener('click',() =>{
        nav.classList.add('active')
    })
}
if(close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active')
    })
}

    var cartSection = document.querySelector('#cart');
    // console.log(cartSection)
    if (cartSection) {
        var addToCartButtons = document.querySelectorAll('#product1 .pro-container .pro');
        console.log(addToCartButtons)
        addToCartButtons.forEach(function(button) {
            // console.log(button.querySelector('a'))
            let btn = button.querySelector('a')
            btn.addEventListener('click', function() {
                // Get the product details
                console.log("HII34")
                totalItems ++
                var productImage = button.querySelector('img').src;
                var productName = button.querySelector('h5').innerText;
                var productPrice = parseInt(button.querySelector('h4').innerText.slice(1));

                // Create a new row in the cart table
                // var newRow = document.createElement('tr');
                // newRow.innerHTML = `
                //     <td><input class="uk-checkbox" type="checkbox"></td>
                //     <td><img class="uk-preserve-width uk-border-circle" src="${productImage}" width="40" alt=""></td>
                //     <td class="uk-table-link">
                //         <h3 class="item-name">${productName}</h3>
                //     </td>
                //     <td class="uk-text-truncate item-price"><h3>₹${productPrice}</h3></td>
                //     <td><input type="number" class="num" value="1"></td>
                //     <td class="uk-text-truncate total-price"><h3>₹${productPrice}</h3></td>
                //     <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
                // `;

                let obj = {
                    productName,
                    productImage,
                    productPrice
                }

                // Append the new row to the cart table
                // var cartTable = document.querySelector('#cart table tbody');
                var cartTable = []
                // console.log(cartTable)
                console.log(obj)
                cartTableData.push(obj);
                console.log(cartTableData)

                // Update the grand total
                var grandTotal = 0;
                var totalPriceElements = document.querySelectorAll('.total-price h3');
                totalPriceElements.forEach(function(totalPriceElement) {
                    grandTotal += parseInt(totalPriceElement.innerText.slice(1));
                });
                console.log(grandTotal)
                console.log(totalItems)

                let element = document.getElementById('grand-total-value')
                element.innerText = cartTableData.length.toString()

                localStorage.setItem("MyCartData", JSON.stringify(cartTableData))

                // document.querySelector('.grand-total h3').innerText = '₹' + grandTotal;
            });
        });
    }


    document.querySelector("#show-proceed").addEventListener("click",function (){
        document.querySelector(".popup").classList.add("active")
    })

document.querySelector(".popup .close-btn").addEventListener("click",function (){
    document.querySelector(".popup").classList.remove("active")
})
