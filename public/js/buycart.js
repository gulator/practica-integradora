const items = JSON.parse(localStorage.getItem("Cart"));
// console.log(items)
const cartItems = items.filteredCart;
const total = [];
const list = document.getElementById("tbody-ticket");
const cartTotal = document.getElementById("tfoot-ticket");
cartItems.forEach((item) => {
  const subtotal = item.product.price * item.quantity;
  let elemento = document.createElement("tr");
  elemento.innerHTML = `<td>${item.product._id}</td>
    <td>${item.product.title}</td>
    <td class="centered">$ ${item.product.price}</td>
    <td class="centered">${item.quantity}</td>
    <td class="centered">$ ${subtotal}</td>
    `;
  total.push(subtotal);
  list.append(elemento);
});
let rowTotal = document.createElement("tr");

rowTotal.innerHTML = `<td></td>
    <td></td>
    <td></td>
    <th class="centered">Total:</th>
    <th class="centered">$ ${total.reduce((a, b) => (a = a + b))}</th>
    `;
cartTotal.insertBefore(rowTotal, cartTotal.firstChild);
// cartTotal.append(btnTotal)

const finishBtn = document.getElementById("finishCart");
finishBtn
  .addEventListener("click", (e) => {
    e.preventDefault();
    const products = [];
    const extras = [];
    cartItems.forEach((item) => {
      products.push({ product: item.product._id, quantity: item.quantity });
      extras.push({
        title: item.product.title,
        subtotal: item.product.price * item.quantity,
        quantity: item.quantity,
      });
    });
    let cid = localStorage.getItem("idCarrito");
    let amount = total.reduce((a, b) => (a = a + b));
    let spinner = document.getElementById('spinner')
    spinner.className = "spinner-border text-warning"
    fetch("/api/tickets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products, amount, extras }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          Toastify({
            text: `Su compra ${data.ticket._id} ha sido efectuada y se encuentra en preparación`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
              color: "black",
              fontWeight: "white",
              borderRadius: "8px",
            },
          }).showToast();
        } else if (data.status === 400) {
          Toastify({
            text: `${data.msg}`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
              background: "linear-gradient(147deg, #ff1b53 0%, #860000 74%)",
              color: "white",
              fontWeight: "white",
              borderRadius: "8px",
            },
          }).showToast();
        }
        //   localStorage.removeItem('idCarrito');
        setTimeout(() => {
          // let cid = localStorage.getItem("idCarrito");
          fetch(`/api/carts/closeCart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ products }),
          })
            .then((response) => response.json())
            .then((data) => {
              const cid = data.cid;
              fetch(`/api/users/cart/${cid}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  let cid = localStorage.getItem("idCarrito");
                  fetch(`/api/carts/erasecart/${cid}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      const storage = localStorage.getItem("Cart");
                      
                      fetch(`/api/carts/pending`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ pending: JSON.parse(storage) }),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          setTimeout(()=>{
                            let spinner = document.getElementById('spinner')
                            spinner.className = "spinner-border text-warning hidden"
                              localStorage.removeItem("Cart");
                              localStorage.removeItem("idCarrito");
                              localStorage.setItem("idCarrito", data.carrito);
                              window.location.href = `/products`;
                          },11000)  
                        });
                    });
                });
            }, 9001);
        });
      });
  })
  .catch((err) => {
    console.log("An error occurred:", err);
  });
