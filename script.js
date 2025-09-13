// Save cart in localStorage (works across pages)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseInt(localStorage.getItem("total")) || 0;

// Add item
function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total);
  alert(item + " added to cart!");
}

// Show cart
function displayCart() {
  let cartList = document.getElementById("cart-items");
  if (cartList) {
    cartList.innerHTML = "";
    cart.forEach(c => {
      let li = document.createElement("li");
      li.textContent = `${c.item} - ₹${c.price}`;
      cartList.appendChild(li);
    });
    document.getElementById("total").textContent = `Total: ₹${total}`;
  }
}

// Checkout
function checkout() {
  let name = prompt("Enter your name:");
  let roll = prompt("Enter student roll no./faculty id");
  let pickupTime = new Date();
  pickupTime.setMinutes(pickupTime.getMinutes() + 15);

  let billDetails = `
    <p><b>Name:</b> ${name}</p>
    <p><b>Roll No:</b> ${roll}</p>
    <ul>${cart.map(c => `<li>${c.item} - ₹${c.price}</li>`).join("")}</ul>
    <p><b>Total:</b> ₹${total}</p>
    <p><b>Pick-up Time:</b> ${pickupTime.toLocaleTimeString()}</p>
 
  `;

  document.getElementById("bill-details").innerHTML = billDetails;
 
  

  // clear cart
  cart = [];
  total = 0;
  localStorage.clear();

  }
function generateQR() {
      const upi = [
      "upi://pay",
      "pa=7396980486@fam",      // merchant VPA / payee address
      "pn=" + encodeURIComponent("Merchant Name"),
      "am= `{total}` ",                // amount
      "tn=" + encodeURIComponent("Order #1234"),
      "cu=INR"
    ].join("?").replace("?", "?").replace(/\?/,"?").replace(/\&/g,"&");

    // (Simpler: const upi = "upi://pay?pa=merchant-vpa@bank&pn=...&am=..."; )

    // Put actual UPI VPA in pa param. DO NOT embed sensitive keys in client-side code for production.
    new QRCode(document.getElementById("upi-qrcode"), {
      text: upi,
      width: 300,
      height: 300,
      correctLevel: QRCode.CorrectLevel.M
    });

    }



// Auto display cart when on cart.html
window.onload = displayCart;
