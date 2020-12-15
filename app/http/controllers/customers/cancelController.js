
const Order = require('../../../../app/models/order')
const Cancel = require('../../../../app/models/cancel')
const moment = require('moment')
const Noty = require('noty')

function cancelController () {
    return {
        async cancel (req,res) {
            
            // console.log("deletting")
            const orders = await Order.findById(req.params.id)
            // console.log(orders)
            await Order.findByIdAndDelete({_id: req.params.id})
            // orders.status="canceled"
            const order = new Cancel({
                customerId: req.user._id,
                items: orders.items,
                phone: orders.phone,
                address: orders.address,
            })
            order.save().then(result => {
                Cancel.populate(result, {path: 'customerId'}, (err, canceledOrder) => {
                    
                    req.flash('success', 'Order canceled successfully')
                    
                    return res.redirect('/customers/cancel')
                    
                })
             }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/customers/cancel')
             })
            
        },
        async index(req, res) {
            const orders = await Cancel.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } })
                res.header('Cache-Control', 'no-store')
                
            res.render('customers/cancel', {orders, moment})
            
        }
    }
}

module.exports = cancelController
