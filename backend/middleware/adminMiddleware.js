const adminMiddleware = (req,res,next)=>{


  if(req.user.isAdmin){

    next();

  }

  else{

    return res.status(403).json({

      message:"Admin Access Required"

    });

  }


};


export default adminMiddleware;