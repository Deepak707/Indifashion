from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config[
    "MONGO_URI"] = "mongodb+srv://INDI_Fashion:deepak0909@cluster0.rlmqi7j.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)


@app.route('/cart_data', methods=['POST'])
def place_order():
    order_data = request.json

    email = order_data.get('email')
    address = order_data.get('address')
    phoneNumber = order_data.get('phoneNumber')
    paymentMethod = order_data.get('paymentMethod')
    cartItems = order_data.get('cartItems')

    mongo.db.orders.insert_one({
        'email': email,
        'address': address,
        'phoneNumber': phoneNumber,
        'paymentMethod': paymentMethod,
        'cartItems': cartItems
    })

    return jsonify({'message': 'Order placed successfully!'})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
