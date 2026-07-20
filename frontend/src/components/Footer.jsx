import { Link } from "react-router-dom";

import "../styles/Footer.css";


function Footer() {


return (

<footer className="footer">


<div className="footer-container">



<div className="footer-box">


<h2>
🛒 ShopEase
</h2>


<p>

Your One Stop Shopping Destination

</p>


<p>

Quality products at the best prices.

</p>


</div>





<div className="footer-box">


<h3>
Quick Links
</h3>


<Link to="/">
Home
</Link>


<Link to="/products">
Products
</Link>


<Link to="/cart">
Cart
</Link>


<Link to="/wishlist">
Wishlist
</Link>


</div>






<div className="footer-box">


<h3>
Customer Support
</h3>


<p>
🚚 Fast Delivery
</p>


<p>
🔒 Secure Payment
</p>


<p>
🔄 Easy Returns
</p>


</div>







<div className="footer-box">


<h3>
Contact
</h3>


<p>
📧 support@shopease.com
</p>


<p>
📞 +91 98765 43210
</p>


<p>
📍 India
</p>


</div>





</div>





<div className="footer-bottom">


<p>

© 2026 ShopEase. All Rights Reserved.

</p>


<div className="social">


<span>
🌐
</span>


<span>
📸
</span>


<span>
💼
</span>


</div>


</div>




</footer>


);


}


export default Footer;