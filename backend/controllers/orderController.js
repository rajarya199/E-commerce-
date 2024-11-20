const OrderItem=require('../models/orderItemModel')
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
    let order =new OrderDelivery({
        orderItems:orderItemIdsResolved, //above generated id
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        totalPrice:TotalPrice, // above calc Totalprice 
        user:req.body.user

    })
    order=await order.save()
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)
}

