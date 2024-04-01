function openCart(){
    console.log("HELLO")

    const ele = JSON.parse(localStorage.getItem("MyCartData"))

    console.log(ele)

    var cartTable = document.querySelector('#cart table tbody');
    cartTable.innerHTML = ""

    let sum = 0

    for (let i = 0; i < ele.length; i++) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input class="uk-checkbox" type="checkbox"></td>
            <td><img class="uk-preserve-width uk-border-circle" src="${ele[i]?.productImage}" width="40" alt=""></td>
            <td class="uk-table-link">
                <h3 class="item-name">${ele[i]?.productName}</h3>
            </td>
            <td class="uk-text-truncate item-price"><h3>₹${ele[i]?.productPrice}</h3></td>
            <td><input type="number" class="num" value="1"></td>
            <td class="uk-text-truncate total-price"><h3>₹${ele[i]?.productPrice}</h3></td>
            <td><button class="uk-button uk-button-danger" type="button" onclick="removeFromCartItem(${i})">Remove</button></td>
        `;

        sum += ele[i]?.productPrice

        console.log(newRow)
        cartTable.appendChild(newRow)
    }

    let element = document.getElementById('grand-total-value')
    console.log(ele)
    element.innerText = ele.length.toString()

    document.getElementById('grand-total').innerText = `₹${sum}`
    document.getElementById('grand-total1').innerText = `₹${sum}`

}

let removeFromCartItem = (id) => {
    console.log(id)
    let ele = JSON.parse(localStorage.getItem("MyCartData"))
    ele.splice(id, 1)

    localStorage.setItem("MyCartData", JSON.stringify(ele))

    let element = document.getElementById('grand-total-value')
    element.innerText = ele.length.toString()
    openCart()
}

(function () {
    openCart()
})()

//

document.getElementById('placeOrderBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('Number').value;
    const paymentMethod = document.querySelector('input[name="options"]:checked').value;
    const cartData = JSON.parse(localStorage.getItem("MyCartData"));

    const orderData = {
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        paymentMethod: paymentMethod,
        cartItems: cartData
    };

    fetch('http://127.0.0.1:5001/cart_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
