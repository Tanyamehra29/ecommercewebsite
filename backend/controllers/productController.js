import Product from "../models/Product.js";


// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    console.log("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id)
      .populate("reviews.user", "name");

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    res.status(200).json(product);

  } catch (error) {

    console.log("Get Single Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {

  try {

    const product = await Product.create({

      title: req.body.title,

      price: req.body.price,

      category: req.body.category,

      description: req.body.description,

      image: req.file ? req.file.path : "",

      rating: req.body.rating || 0,

      discount: req.body.discount || 0,

    });


    res.status(201).json({

      success:true,

      message:"Product Added Successfully",

      product

    });


  } catch(error){

    console.log("Create Product Error:",error);


    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",

      });

    }

    let imageUrl = product.image;

    if (req.file) {

      const uploadImage = () =>
        new Promise((resolve, reject) => {

          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "ecommerce",
            },

            (error, result) => {

              if (error) reject(error);

              else resolve(result);

            }

          );

          streamifier
            .createReadStream(req.file.buffer)
            .pipe(uploadStream);

        });

      const result = await uploadImage();

      imageUrl = result.secure_url;

    }

    product.title = req.body.title || product.title;

    product.price = req.body.price || product.price;

    product.category = req.body.category || product.category;

    product.description = req.body.description || product.description;

    product.discount =
      req.body.discount !== undefined
        ? req.body.discount
        : product.discount;

    product.rating =
      req.body.rating !== undefined
        ? req.body.rating
        : product.rating;

    product.image = imageUrl;

    await product.save();

    res.status(200).json({

      success: true,

      message: "Product Updated Successfully",

      product,

    });

  } catch (error) {

    console.log("Update Product Error:", error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",

      });

    }

    await product.deleteOne();

    res.status(200).json({

      success: true,

      message: "Product Deleted Successfully",

    });

  } catch (error) {

    console.log("Delete Product Error:", error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ================= ADD REVIEW =================
export const addReview = async (req, res) => {

  try {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",

      });

    }

    const alreadyReviewed = product.reviews.find(

      (review) => review.user.toString() === req.user.id

    );

    if (alreadyReviewed) {

      return res.status(400).json({

        success: false,

        message: "You already reviewed this product",

      });

    }

    product.reviews.push({

      user: req.user.id,

      rating,

      comment,

    });

    product.rating =
      product.reviews.reduce(

        (sum, review) => sum + review.rating,

        0

      ) / product.reviews.length;

    await product.save();

    res.status(201).json({

      success: true,

      message: "Review Added Successfully",

      product,

    });

  } catch (error) {

    console.log("Review Error:", error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};