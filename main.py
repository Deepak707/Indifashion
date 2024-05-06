from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://Deepak:PcfYEPT7fBTPsX3k@cluster0.rlmqi7j.mongodb.net/IndiFashion"
mongo = PyMongo(app)
CORS(app)


# @app.route('/', methods=['GET'])
# def place_order1():
#     try:
#         # print(x)
#         # print(y)
#
#         return jsonify({'message': 'Hello lauda'})
#     except Exception as e:
#         return jsonify({'message': 'Hello error',
#                         'error': str(e)})


@app.route('/cart_data', methods=['POST'])
def place_order():
    try:
        # print(x)
        # print(y)

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
    except Exception as e:
        return jsonify({'message': 'Hello error',
                        'error': str(e)})

