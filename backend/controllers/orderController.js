const OrderItem=require('../models/order-itemModel')
const  OrderDelivery=require('../models/orderDeliverModel')

//post order
exports.postOrder=async(req,res)=>{
    const orderItemsIds=Promise.all(req.body.orderItems.map(async ordItem=>{

        // each item order is saved/post in Orderitem model and id is generated for each 
        //now pass this obtained id to orderdelevery model

        let newOrderItem= new OrderItem({
            quantity:ordItem.quantity,
            product:ordItem.product
        })
        newOrderItem=await newOrderItem.save()
        return newOrderItem._id  //return id generate when new order is placed is stored in orderItem._id
 
    }))
    
const orderItemIdsResolved=await orderItemsIds //above generated id is save in this const
    // calc total price
    const totalAmount=await Promise.all(orderItemIdsResolved.map(async orderId=>{
        const itemOrder=await OrderItem.findById(orderId).populate('product','product_price')
        const total=itemOrder.quantity * itemOrder.product.product_price 
        return total
        //[400,300,5000]
    }))
    const TotalPrice=totalAmount.reduce((a,b)=>a+b,0)
}

