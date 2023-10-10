// import { response } from "express";

let vaciarCarrito = document.querySelector(".del-carrito");

vaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  let cid = localStorage.getItem("idCarrito");
  // let elemento = e.target
  // let pid = elemento.parentElement.parentElement.children[1].innerText
  // let quantity = elemento.parentElement.parentElement.children[3].children[0].value
  // console.log(quantity)
  // let pid = idProducto.slice(4)
  // console.log(pid)
  fetch(`/api/carts/${cid}`, {
    method: "DELETE",
  }).then(() => {
    location.reload(true);
  });
  //   location.reload(true)
});

// let comprarCarrito = document.getElementById("comprarCarrito");
// comprarCarrito.addEventListener("click", (e) => {
//   e.preventDefault();
//   let cid = localStorage.getItem("idCarrito");
//   fetch(`/api/users/cart/${cid}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((datos) => {
//       let cart = payCart()
//       return fetch('/api/tickets/',{
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cart)
//       })
//       .then((response) => response.json())
//       .then((data)=> {
//         console.log(data)
//         // localStorage.removeItem('idCarrito');
//         // window.location.href = '../../products';
//       })
//       .catch((err)=>{
//         console.log('An error occurred:', err)
//       })
//     });
// });

let comprarCarrito = document.getElementById("comprarCarrito");
comprarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  let cid = localStorage.getItem("idCarrito");
  let cart = payCart()

  fetch(`/api/carts/checkcart/${cid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(cart)
  })
    .then((response) => response.json())
    .then((datos) => {
      console.log(datos)
      localStorage.setItem("Cart", JSON.stringify(datos))
      window.location.href = '../../buycart';
        // .then(()=>{

        // })
      // let cart = payCart()
      // return fetch('/api/tickets/',{
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(cart)
      // })
      // .then((response) => response.json())
      // .then((data)=> {
      //   console.log(data)
      //   // localStorage.removeItem('idCarrito');
      //   // window.location.href = '../../products';
      })
      .catch((err)=>{
        console.log('An error occurred:', err)
      })
    });
// });


function payCart(){
  
const table = document.getElementById("cartTable");

const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

let amount = 0
let products = []
let date = new Date().toISOString();

for (let row of rows) {
  const productId = row.querySelector(".idProduct").textContent;
  const quantityInput = row.querySelector(".input-cart");
  const priceCell = row.querySelector(".priceCell");  
  
  const quantity = parseInt(quantityInput.value);
  const price = parseFloat(priceCell.textContent.replace("$", ""));
  
  products.push({"product":productId, "quantity":quantity, "amount":quantity*price})
  // Calculate the product of quantity and price
  // const total = quantity * price;
  // amount = amount + total  
  
}
return ({"purchase_datetime": date, "amount":amount, "products":products})
}
