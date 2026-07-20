import { createContext, useState } from "react";


export const CartContext = createContext();



export function CartProvider({children}){


const [cart,setCart] = useState([]);




// Add Product

const addToCart = (product)=>{


setCart([

...cart,

{

...product,

quantity:1

}

]);


};




// Clear Cart After Order

const clearCart = ()=>{

setCart([]);

};





return(

<CartContext.Provider

value={{

cart,

addToCart,

clearCart

}}

>


{children}


</CartContext.Provider>


);


}