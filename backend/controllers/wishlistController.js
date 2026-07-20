import Wishlist from "../models/Wishlist.js";


// ================= GET WISHLIST =================
export const getWishlist = async (req, res) => {

  try {

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    }).populate("products");

    if (!wishlist) {

      return res.status(200).json({
        success: true,
        products: [],
      });

    }

    res.status(200).json({
      success: true,
      products: wishlist.products,
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// ================= ADD TO WISHLIST =================
export const addWishlist = async (req, res) => {

  try {

    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {

      wishlist = await Wishlist.create({

        user: req.user.id,

        products: [productId],

      });

    }

    else {

      const exists = wishlist.products.some(

        (id) => id.toString() === productId

      );

      if (!exists) {

        wishlist.products.push(productId);

        await wishlist.save();

      }

    }

    res.status(200).json({

      success: true,

      message: "Added To Wishlist ❤️",

      wishlist,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




// ================= REMOVE FROM WISHLIST =================
export const removeWishlist = async (req, res) => {

  try {

    const wishlist = await Wishlist.findOne({

      user: req.user.id,

    });

    if (!wishlist) {

      return res.status(404).json({

        success: false,

        message: "Wishlist not found",

      });

    }

    wishlist.products = wishlist.products.filter(

      (item) => item.toString() !== req.params.productId

    );

    await wishlist.save();

    res.status(200).json({

      success: true,

      message: "Removed From Wishlist ❤️",

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};