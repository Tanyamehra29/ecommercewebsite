import { Link } from "react-router-dom";
import "../styles/Footer.css";


function Footer(){

return(

<footer className="footer">


<div className="footer-container">


<div className="footer-section">

<h2>🛒 ShopEase</h2>

<p>
Your one stop destination for quality products
at the best prices.
</p>

</div>




<div className="footer-section">

<h3>Quick Links</h3>

<Link to="/">Home</Link>

<Link to="/products">Products</Link>

<Link to="/cart">Cart</Link>

<Link to="/wishlist">Wishlist</Link>

</div>





<div className="footer-section">

<h3>Customer Support</h3>

<p>
📞 +91 9876543210
</p>

<p>
✉ support@shopease.com
</p>

<p>
🚚 Fast Delivery
</p>

</div>





<div className="footer-section">

<h3>Follow Us</h3>


<div className="social">

<span>📘</span>

<span>📸</span>

<span>🐦</span>

<span>▶️</span>

</div>


</div>



</div>



<div className="footer-bottom">

<p>
© 2026 ShopEase. All Rights Reserved.
</p>

</div>



</footer>

);

}


export default Footer;