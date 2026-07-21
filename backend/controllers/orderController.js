import Order from "../models/order.js";


// ================= PLACE ORDER =================

export const placeOrder = async (req, res) => {

  try {


    const {
      products,
      totalPrice,
      customer
    } = req.body;



    if(
      !products ||
      products.length === 0 ||
      !totalPrice
    ){

      return res.status(400).json({

        success:false,

        message:"Products and Total Price required"

      });

    }





    const order = await Order.create({

      user:req.user.id,

      customer,

      products,

      totalPrice

    });





    res.status(201).json({

      success:true,

      message:"Order Placed Successfully",

      order

    });



  }

  catch(error){


    console.log("Place Order Error:",error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};







// ================= GET ALL ORDERS ADMIN =================


export const getAllOrders = async(req,res)=>{


try{


const orders = await Order.find()

.populate({

path:"user",

select:"name email"

})


.populate({

path:"products.product",

select:"title price image"

})

.sort({

createdAt:-1

});





res.status(200).json(orders);



}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};







// ================= GET USER ORDERS =================


export const getMyOrders = async(req,res)=>{


try{


const orders = await Order.find({

user:req.user.id

})

.populate({

path:"products.product",

select:"title price image"

})

.sort({

createdAt:-1

});





res.status(200).json(orders);



}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};









// ================= UPDATE ORDER STATUS =================


export const updateOrderStatus = async(req,res)=>{


try{


const {

status

}=req.body;





const order = await Order.findByIdAndUpdate(

req.params.id,

{

status

},

{

new:true

}

);





if(!order){


return res.status(404).json({

success:false,

message:"Order not found"

});


}






res.status(200).json({

success:true,

message:"Order Status Updated",

order

});





}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};