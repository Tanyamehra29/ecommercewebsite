import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(

{

  user: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true,

  },



  customer: {

    name: {

      type:String,

      required:true,

    },


    phone: {

      type:String,

      required:true,

    },


    address: {

      type:String,

      required:true,

    },

  },



  products: [

    {

      product: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Product",

        required: true,

      },


      quantity: {

        type:Number,

        default:1,

      },


    }

  ],




  totalPrice: {

    type:Number,

    required:true,

  },





  status: {

    type:String,

    enum:[

      "Pending",

      "Packed",

      "Shipped",

      "Delivered",

      "Cancelled"

    ],

    default:"Pending",

  },





  paymentStatus: {

    type:String,

    enum:[

      "Pending",

      "Paid",

      "Failed"

    ],

    default:"Pending",

  },





  paymentMethod: {

    type:String,

    enum:[

      "COD",

      "UPI",

      "Card"

    ],

    default:"COD",

  }


},

{

  timestamps:true,

}

);



const Order = mongoose.model(

  "Order",

  orderSchema

);


export default Order;