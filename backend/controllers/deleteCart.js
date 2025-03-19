const Cart = require('../model/cartModel')

async function deleteCart (req, res) {

    const {id} = req.params

    await Cart.findByIdAndDelete({_id:id})
    res.send({message : 'Cart deleted successfully'})
}

module.exports = deleteCart