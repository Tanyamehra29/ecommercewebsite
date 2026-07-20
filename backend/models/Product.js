import mongoose from "mongoose";


const productSchema = new mongoose.Schema(

{

  title: {

    type: String,

    required: true,

  },


  price: {

    type: Number,

    required: true,

  },


  category: {

    type: String,

    required: true,

  },


  image: {

    type: String,

    required: true,

  },


  description: {

    type: String,

    default: "",

  },



  // ⭐ Average Product Rating

  rating: {

    type: Number,

    default: 0,

  },



  // 🏷 Discount Percentage

  discount: {

    type: Number,

    default: 0,

  },



  // 💬 Customer Reviews

  reviews: [

    {

      user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

      },


      name: {

        type:String,

      },


      rating: {

        type:Number,

        required:true,

        min:1,

        max:5

      },


      comment: {

        type:String,

        required:true,

      },


      createdAt:{

        type:Date,

        default:Date.now

      }


    }

  ]

},

{

  timestamps:true,

}

);





// Automatically calculate average rating

productSchema.methods.calculateRating = function(){


if(this.reviews.length === 0){

this.rating = 0;

}

else{


const total = this.reviews.reduce(

(sum,review)=>

sum + review.rating,

0

);


this.rating = Number(

(total / this.reviews.length).toFixed(1)

);


}


};





const Product = mongoose.model(

"Product",

productSchema

);


export default Product;